import { NextApiRequest, NextApiResponse } from "next";
import Coin from "models/Coin";
import User from "models/User";

export default async function deleteCoin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  Coin.deleteOne({ _id: id }, function (data, error) {
    // console.log(data);
    // console.log(error);
  });
  res.status(200).json({
    message: "Delete-coin",
  });
}
