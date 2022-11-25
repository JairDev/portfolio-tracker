import dbConnect from "lib/mongodb";
import Coin from "models/Coin";
import User from "models/User";

export default async function coinApi(req, res) {
  await dbConnect();

  const { name, price, holdings, amount } = req.body;

  const coin = await new Coin({
    name,
    price,
    holdings,
    amount,
  });

  const result = await coin.save();
  console.log(result);
  await User.findByIdAndUpdate(
    "6373d00cd6777c8937dc643a",
    { $push: { coins: result._id } },
    { new: true, useFindAndModify: false }
  );
  res.status(200).json({ message: "Test coin api" });
}
