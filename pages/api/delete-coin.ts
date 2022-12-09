import { NextApiRequest, NextApiResponse } from "next";
import Coin from "models/Coin";

export default async function deleteCoin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    await Coin.deleteOne({ _id: id });
    res.status(200).json({
      message: "Activo eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo un problema al borrar el activo",
    });
  }
}
