import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/sessions";
import getConfig from "next/config";
import jwt from "jsonwebtoken";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(user);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userSession = req?.session?.user;
    //@ts-ignore
    const { token } = userSession;
    const decodeToken = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    res.status(200).json({
      authenticated: true,
      userId: userSession?.userId,
      userEmail: userSession?.userEmail,
      message: "Inicio de sesión exitoso!",
    });
  } catch (error) {
    res.status(404).json({
      authenticated: false,
      userId: null,
      userEmail: null,
      error,
    });
  }
}
