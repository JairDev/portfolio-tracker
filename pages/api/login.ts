import { withSessionRoute } from "lib/sessions";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getConfig from "next/config";
import User from "models/User";

const { serverRuntimeConfig } = getConfig();

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const initState = { authenticated: false, userId: null, userEmail: null };
  const { email, password } = req.body;
  console.log("login api");
  if (req.method === "POST") {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(403).send({ message: "Usuario no encontrado", ...initState });
    }
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        res
          .status(400)
          .send({ message: "Las contraseñas no coinciden ", ...initState });
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
          ...user,
          token,
          userId: user._id,
          userEmail: user.email,
          stamp: "login",
        };
        await req.session.save();
        res.status(200).send({
          message: "Inicio de sesión exitoso",
          authenticated: true,
          userId: user._id,
          userEmail: user.email,
        });
      }
    }
  }
}

export default withSessionRoute(loginRoute);
