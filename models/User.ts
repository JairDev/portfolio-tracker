import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please provide an Email!"],
    unique: [true, "Email exist"],
  },
  password: {
    type: String,
    require: [true, "Please provide a Password!"],
    unique: false,
  },
  coins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coin",
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
