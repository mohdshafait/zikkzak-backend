import express from "express";
import { getBalance, addCoins } from "../controllers/walletController";

const router = express.Router();

router.get("/:userId", getBalance);
router.post("/add", addCoins);

export default router;

