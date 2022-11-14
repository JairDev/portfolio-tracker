import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import session from "../../lib/sessions";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

export default async function withSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { email, password } = req.body;
  console.log("email", email);
  if (req.method === "POST") {
    try {
      const isEmail = await User.findOne({ email: email });

      if (isEmail?.email === email) {
        res.status(403).json({ message: "The email has already been used." });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        email,
        password: hashPassword,
      });

      await user.save();

      res.status(200).send({
        message: "User Created Succesfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
}
