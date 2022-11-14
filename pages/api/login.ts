import { withIronSessionApiRoute } from "iron-session/next";
import { withSessionRoute } from "../../lib/sessions";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import User from "../../models/User";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { email, password } = req.body;

  if (req.method === "POST") {
    try {
      const isUser = await User.findOne({ email: email });
      if (!isUser) {
        throw Error;
      }
      const checkPassword = await bcrypt.compare(password, isUser.password);
      if (!checkPassword) {
        res.status(400).send({ message: "Passwords does not match" });
      }
      const token = jwt.sign(
        {
          userId: isUser._id,
          userEmail: isUser.email,
        },
        serverRuntimeConfig.secret,
        { expiresIn: "24h" }
      );
      req.session.user = {
        token,
      };
      await req.session.save();
      res
        .status(200)
        .send({ message: "Login Successful", email: isUser.email, token });
    } catch (error) {
      console.log(error);
      res.status(403).send({ message: "User not found" });
    }
  }
}
