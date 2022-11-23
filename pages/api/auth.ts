import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

interface JwtPayload {
  userId: string;
  userEmail: string;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const initState = { authenticated: false, userId: null, userEmail: null };
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    const decodeToken = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtPayload;

    const user = decodeToken;

    res.status(200).json({
      message: "auth success",
      authenticated: true,
      userId: user.userId,
      userEmail: user.userEmail,
    });
  } catch (error) {
    res.status(401).json({
      ...initState,
      error,
    });
  }
}
