import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import getConfig from "next/config";

import { withSessionRoute } from "lib/sessions";

import getAllUserData from "lib/getAllUserData";

const { serverRuntimeConfig } = getConfig();

// export default withSessionRoute(auth);

interface JwtPayload {
  userId: string;
  userEmail: string;
}

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1] as string;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, serverRuntimeConfig.secret);
      // console.log(decoded);
      //@ts-ignore
      const userData = await getAllUserData(decoded.userId);
      return res.status(200).json({ ...userData, authenticated: true });
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
);

// async function auth(req: NextApiRequest, res: NextApiResponse) {
//   const initState = {
//     authenticated: false,
//     userId: null,
//     userEmail: null,
//     coins: [],
//   };

//   try {
//     if (!req.headers.authorization) {
//       return null;
//     }
//     const token = req.headers.authorization?.split(" ")[1] as string;
//     const decodeToken = jwt.verify(token, serverRuntimeConfig.secret);
//     const user = decodeToken;
//     //@ts-ignore
//     const { userId } = user;
//     const { coins } = await getAllUserData(userId);
//     res.status(200).json({
//       message: "auth success",
//       authenticated: true,
//       //@ts-ignore
//       userId: user.userId,
//       //@ts-ignore
//       userEmail: user.userEmail,
//       coins,
//       auth: "auth",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       ...initState,
//       error,
//       other: "error",
//     });
//   }
// }
