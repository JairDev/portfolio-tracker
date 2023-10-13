import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "lib/mongodb";

import Coin from "models/Coin";

export default async function coinApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { name, avgPrice, holding, sell, lastPrice } = req.body;
    const coinFind = await Coin.findOne({ name });

    const avgPriceNumber = Number(avgPrice);
    const profit =
      (sell ? avgPrice - lastPrice : lastPrice - avgPrice) * holding;

    if (coinFind) {
      const updateHolding =
        Number(coinFind.holding) + (sell ? Number(-holding) : Number(holding));
      const updatedProfit = coinFind.profit + profit;

      const update = await Coin.findOneAndUpdate(
        { name },
        {
          transactions: [
            {
              type: sell ? "sell" : "buy",
              price: avgPriceNumber,
              holding,
            },
          ],
          profit: updatedProfit,
        },
        { returnDocument: "after" }
      );

      res.status(201).json({ message: "Activo actualizado" });
    } else {
      if (!(name && avgPrice && holding)) {
        throw new Error("Invalid input data");
      }

      const coin = new Coin({
        name,
        transactions: [
          {
            type: sell ? "sell" : "buy",
            price: avgPriceNumber,
            holding,
          },
        ],
        profit: profit,
      });
      // console.log(coin);
      const result = await coin.save();

      res.status(201).json({ message: "Activo añadido", coinId: result._id });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al procesar la solicitud", error });
  }
}
