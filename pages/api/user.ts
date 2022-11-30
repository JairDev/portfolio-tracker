import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/sessions";
import getConfig from "next/config";
import jwt, { Jwt } from "jsonwebtoken";

const { serverRuntimeConfig } = getConfig();

export default withSessionRoute(user);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

async function user(req: NextApiRequest, res: NextApiResponse) {
  const userSession = req?.session?.user;
  try {
    const decodeToken = jwt.verify(
      userSession.token,
      serverRuntimeConfig.secret
    );

    res.status(200).json({
      authenticated: true,
      userId: userSession.userId,
      userEmail: userSession.userEmail,
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
