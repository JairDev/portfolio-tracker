import dbConnect from "lib/mongodb";
import Coin from "models/Coin";
import User from "models/User";

export default async function getCoins(req, res) {
  await dbConnect();
  const { id } = req.body;
  // console.log(id);
  const result = await getAllInfo(id);
  // console.log("result", result);
  const { email, coins } = result;

  res.status(200).json({ message: "Sucess", email, coins });
}

const getAllInfo = function (id) {
  // return User.findById(id).populate({path: "coins", model: User});
  return User.findById(id).populate({ path: "coins", model: Coin });
};
