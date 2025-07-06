import { Request, Response } from "express";
import { Wallet } from "../models/Wallet";

export const getBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) wallet = await Wallet.create({ userId, coins: 0 });
    res.json({ success: true, coins: wallet.coins });
  } catch {
    res.status(500).json({ success: false, message: "Cannot fetch balance" });
  }
};

export const addCoins = async (req: Request, res: Response) => {
  const { userId, coins } = req.body; // coins = number to add
  try {
    let wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { coins } },
      { new: true, upsert: true }
    );
    res.json({ success: true, coins: wallet!.coins });
  } catch {
    res.status(500).json({ success: false, message: "Cannot add coins" });
  }
};
