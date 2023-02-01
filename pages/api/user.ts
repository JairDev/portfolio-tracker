import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/sessions";
import getConfig from "next/config";
import jwt, { Jwt } from "jsonwebtoken";
import User from "models/User";
import Coin from "models/Coin";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(user);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

async function user(req: NextApiRequest, res: NextApiResponse) {
  const userSession = req?.session?.user;

  try {
    const userSession = req?.session?.user;
    //@ts-ignore
    const { token } = userSession;
    const decodeToken = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    const user = decodeToken;

    const { coins } = await getAllUserData(user?.userId);
    res.status(200).json({
      authenticated: true,
      userId: userSession?.userId,
      userEmail: userSession?.userEmail,
      coins,
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

const getAllUserData = function (id: string) {
  const initState = {
    coins: [],
  };
  if (!id) {
    return initState;
  }
  return User.findById(id).populate({ path: "coins", model: Coin });
};
