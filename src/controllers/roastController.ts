import { Request, Response } from 'express';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

export const generateRoast = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const prompt = `Roast this person in a funny, clever one-liner: ${name}`;
    const { data } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 50
    });

    const roast =
      data.choices[0].text?.trim() || 'Could not generate roast, try again.';
    res.json({ roast });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI failed' });
  }
};
