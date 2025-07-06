import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "./config/db";
import walletRoutes from "./routes/walletRoutes";
import roastRoutes from "./routes/roastRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/wallet", walletRoutes);
app.use("/api/roast", roastRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ZikkZak Backend running on port ${PORT}`);
});
