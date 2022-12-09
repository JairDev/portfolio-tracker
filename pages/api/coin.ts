import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { name, avgPrice, holding } = req.body;

  const coin = await new Coin({
    name,
    avgPrice,
    holding,
  });

  try {
    const result = await coin.save();
    res.status(201).json({ message: "Currency added", coinId: result._id });
  } catch (error) {
    res.status(500).json({ error });
  }
}
