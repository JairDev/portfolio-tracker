import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { name, avgPrice, holding } = req.body;

  if (name && avgPrice && holding) {
    const coin = await new Coin({
      name,
      avgPrice,
      holding,
    });
    console.log("coin", coin);
    const result = await coin.save();
    res.status(201).json({ message: "Activo añadido", coinId: result._id });
  } else {
    res
      .status(500)
      .json({ message: " Error al añadir un activo", coinId: null });
  }

  // try {
  //   const coin = await new Coin({
  //     name,
  //     avgPrice,
  //     holding,
  //   });
  //   console.log("coin", coin);
  //   const result = await coin.save();
  //   res.status(201).json({ message: "Activo añadido", coinId: result._id });
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
}
