import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/sessions";

export default withSessionRoute(user);

async function user(req: NextApiRequest, res: NextApiResponse) {
  const userSession = req?.session?.user;
  console.log(userSession);
  if (userSession) {
    res
      .status(200)
      .json({
        authenticated: true,
        id: userSession.id,
        email: userSession.email,
      });
  }
  res.status(404).json({ authenticated: false, user: null });
}
