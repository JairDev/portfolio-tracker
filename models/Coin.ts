import mongoose from "mongoose";
import dbConnect from "lib/mongodb";

const CoinSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avgPrice: {
    type: Number,
  },
  holding: {
    type: Number,
  },
});

export default mongoose.models.Coin || mongoose.model("Coin", CoinSchema);
