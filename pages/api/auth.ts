import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";

import { withSessionRoute } from "lib/sessions";

import getAllUserData from "lib/getAllUserData";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(userAuthenticated);

interface JwtTypes {
  userId: string;
  userEmail: string;
}

async function userAuthenticated(req: NextApiRequest, res: NextApiResponse) {
  const initState = {
    authenticated: false,
    userId: null,
    userEmail: null,
    coins: [],
  };
  const token = req.headers.authorization?.split(" ")[1] as string;
  console.log("auth", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodeToken = jwt.verify(
      token,
      serverRuntimeConfig.secret
    ) as JwtTypes;
    const { userId, userEmail } = decodeToken;
    const { coins } = await getAllUserData(userId);
    res.status(200).json({
      authenticated: true,
      userId: userId,
      userEmail: userEmail,
      coins,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ...initState,
      error,
    });
  }
}
