import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { name, avgPrice, holding, sell, lastPrice } = req.body;
  const coinFind = await Coin.findOne({ name: name });

  if (coinFind) {
    if (sell) {
      const sellAmount = avgPrice * holding;
      const updateHolding = Number(coinFind.holding) - Number(holding);
      const update = await Coin.findOneAndUpdate(
        { name: name },
        { holding: updateHolding }
      );
      res.status(201).json({ message: "Activo actualizado" });
    } else {
      const updateHolding = Number(coinFind.holding) + Number(holding);
      const update = await Coin.findOneAndUpdate(
        { name: name },
        { holding: updateHolding }
      );
      res.status(201).json({ message: "Activo actualizado" });
    }
  } else {
    if (name && avgPrice && holding) {
      const coin = await new Coin({
        name,
        avgPrice,
        holding,
      });
      const result = await coin.save();
      res.status(201).json({ message: "Activo añadido", coinId: result._id });
    } else {
      res
        .status(500)
        .json({ message: " Error al añadir un activo", coinId: null });
    }
  }
}
