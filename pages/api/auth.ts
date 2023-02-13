import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";

import { withSessionRoute } from "lib/sessions";

import getAllUserData from "lib/getAllUserData";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(auth);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

async function auth(req: NextApiRequest, res: NextApiResponse) {
  const initState = {
    authenticated: false,
    userId: null,
    userEmail: null,
    coins: [],
  };

  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    const decodeToken = jwt.verify(token, serverRuntimeConfig.secret);
    const user = decodeToken;
    //@ts-ignore
    const { userId } = user;
    const { coins } = await getAllUserData(userId);
    res.status(200).json({
      message: "auth success",
      authenticated: true,
      //@ts-ignore
      userId: user.userId,
      //@ts-ignore
      userEmail: user.userEmail,
      coins,
      auth: "auth",
    });
  } catch (error) {
    res.status(401).json({
      ...initState,
      error,
      other: "error",
    });
  }
}
