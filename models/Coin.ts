import mongoose from "mongoose";
import dbConnect from "lib/mongodb";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  holding: {
    type: Number,
    required: true,
  },
});

const CoinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  transactions: [transactionSchema],
  profit: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Coin || mongoose.model("Coin", CoinSchema);
