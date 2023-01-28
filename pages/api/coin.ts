import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { name, avgPrice, holding, lastProfit, sell, lastPrice } = req.body;
  const coinFind = await Coin.findOne({ name: name });
  console.log("find", coinFind);
  console.log("lastprice", lastPrice);
  // console.log(lastPrice)

  if (coinFind) {
    if (sell) {
      const sellAmount = avgPrice * holding;
      const updateHolding = Number(coinFind.holding) - Number(holding);
      console.log("updateHolding", updateHolding);
      console.log("lastPrice", lastPrice);
      console.log(sellAmount);

      const update = await Coin.findOneAndUpdate(
        { name: name },
        { holding: updateHolding }
      );
      console.log("update", update);
      res.status(201).json({ message: "Activo actualizado" });
    } else {
      const updateHolding = Number(coinFind.holding) + Number(holding);
      console.log("updateHold", updateHolding);
      const update = await Coin.findOneAndUpdate(
        { name: name },
        { holding: updateHolding }
      );
      console.log("update", update);
      res.status(201).json({ message: "Activo actualizado" });
    }
  } else {
    if (name && avgPrice && holding) {
      console.log("NAME", name);
      const coin = await new Coin({
        name,
        avgPrice,
        holding,
      });
      // console.log("coin", coin);
      const result = await coin.save();
      res.status(201).json({ message: "Activo añadido", coinId: result._id });
    } else {
      res
        .status(500)
        .json({ message: " Error al añadir un activo", coinId: null });
    }
  }
}
