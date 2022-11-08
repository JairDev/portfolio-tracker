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
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;
