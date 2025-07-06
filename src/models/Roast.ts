import mongoose from "mongoose";

const roastSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    roastText: { type: String, required: true }
  },
  { timestamps: true }
);

export const Roast = mongoose.model("Roast", roastSchema);
