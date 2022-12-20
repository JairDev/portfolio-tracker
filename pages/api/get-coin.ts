import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/sessions";
import getConfig from "next/config";
import jwt, { Jwt } from "jsonwebtoken";
import User from "models/User";
import Coin from "models/Coin";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(getCoin);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

async function getCoin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userSession = req?.session?.user;
    // console.log("usersession", userSession);

    const { coins } = await getAllUserData(userSession?.userId);

    res.status(200).json({
      coins,
      message: "Get coins",
    });
  } catch (error) {
    res.status(404).json({
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
