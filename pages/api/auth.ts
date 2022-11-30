import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";
import User from "models/User";
import Coin from "models/Coin";

const { serverRuntimeConfig } = getConfig();

interface JwtPayload {
  userId: string;
  userEmail: string;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const initState = {
    authenticated: false,
    userId: null,
    userEmail: null,
    coins: [],
  };
  console.log(req.session);

  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const decodeToken = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    const user = decodeToken;
    const { coins } = await getAllUserData(user.userId);

    res.status(200).json({
      message: "auth success",
      authenticated: true,
      userId: user.userId,
      userEmail: user.userEmail,
      coins,
    });
  } catch (error) {
    res.status(401).json({
      ...initState,
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
