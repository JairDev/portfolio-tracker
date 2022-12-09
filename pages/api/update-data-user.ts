import { NextApiRequest, NextApiResponse } from "next";
import Coin from "models/Coin";
import User from "models/User";

export default async function updataDataUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, id } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { coins: id } },
    { new: true, useFindAndModify: false }
  );
  console.log("u", user);
  // console.log("u", id);
  // console.log("user", userId);

  res.status(200).json({
    message: "Update data user",
  });
}
