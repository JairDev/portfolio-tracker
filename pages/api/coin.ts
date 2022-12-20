import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { name, avgPrice, holding, lastProfit } = req.body;
  const coinFind = await Coin.findOne({ name: name });
  console.log("lastProfit", lastProfit);
  console.log("find", coinFind);

  if (coinFind) {
    const profit = Number(
      Number.parseFloat(coinFind.profit + Number(lastProfit)).toFixed(2)
    );
    const updateHolding = Number(coinFind.holding) + Number(holding);
    console.log("updateHold", updateHolding);
    const update = await Coin.findOneAndUpdate(
      { name: name },
      { profit, holding: updateHolding }
    );
    console.log("profit", profit);
    console.log("update", update);
    res.status(201).json({ message: "Activo actualizado" });
  } else {
    if (name && avgPrice && holding && lastProfit) {
      console.log("NAME", name);
      const coin = await new Coin({
        name,
        avgPrice,
        holding,
        profit: lastProfit,
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
