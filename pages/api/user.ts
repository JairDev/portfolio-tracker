import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "lib/sessions";

export default withSessionRoute(user);

async function user(req: NextApiRequest, res: NextApiResponse) {
  const userSession = req?.session?.user;
  if (userSession) {
    res.status(200).json({
      authenticated: true,
      userId: userSession.userId,
      userEmail: userSession.userEmail,
    });
  } else {
    res
      .status(404)
      .json({ authenticated: false, userId: null, userEmail: null });
  }
}
