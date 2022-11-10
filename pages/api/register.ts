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
        throw Error;
        // throw new Error("The email has already been used.");
        // throw "The email has already been used.";
        // res.status(403).send({ message: "The email has already been used." });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await new User({
        email,
        password: hashPassword,
      });

      const userSave = await user.save();
      // req.session.set("user", { id: user._id, email: user.email });

      res.status(200).send({
        message: "User Created Succesfully",
      });
    } catch (error) {
      // res.status(403).json({ message: (error as Error).message });
      console.log(error);
      res.status(403).json({ message: "The email has already been used." });
      // throw error.message;
    }
  }
}
