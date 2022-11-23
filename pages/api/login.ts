import { withSessionRoute } from "lib/sessions";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import User from "models/User";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const initState = { authenticated: false, userId: null, userEmail: null };

  const { email, password } = req.body;

  if (req.method === "POST") {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(403).send({ message: "User not found", ...initState });
    }
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res
          .status(400)
          .send({ message: "Passwords does not match", ...initState });
      }

      if (checkPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          serverRuntimeConfig.secret,
          { expiresIn: "24h" }
        );

        req.session.user = {
          token,
          userId: user._id,
          userEmail: user.email,
        };
        await req.session.save();
        res.status(200).send({
          message: "Login Successful",
          authenticated: true,
          userId: user._id,
          userEmail: user.email,
        });
      }
    }
  }
}
