import { Request, Response, NextFunction } from "express";
import { Roast } from "../models/Roast";
import { Wallet } from "../models/Wallet";

const COIN_COST = 100;

export const generateRoast = async (
  req: Request,
  res: Response,
  next: NextFunction   // ✅ add kiya
) => {
  try {
    const { userId, name } = req.body;

    let wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.coins < COIN_COST) {
      return res
        .status(402)
        .json({ success: false, message: "Insufficient coins" });
    }

    wallet.coins -= COIN_COST;
    await wallet.save();

    const roastText = `🔥 ${name} looks like they still update apps via floppy disk.`;
    await Roast.create({ userId, name, roastText });

    res.json({ success: true, roastText, remainingCoins: wallet.coins });
  } catch (err) {
    next(err);            // ✅ pass error forward (good practice)
  }
};
