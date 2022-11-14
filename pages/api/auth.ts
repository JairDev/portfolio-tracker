import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const initState = { authenticated: false, user: null };
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;
    const decodeToken = jwt.verify(token, serverRuntimeConfig.secret);
    const user = decodeToken;
    if (!user) {
      res.status(400).json(initState);
    }
    res
      .status(200)
      .json({ message: "auth success", authenticated: true, user });
  } catch (error) {
    res.status(401).json({
      initState,
      error,
    });
  }
}
