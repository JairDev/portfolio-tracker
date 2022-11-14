import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../lib/sessions";

export default withSessionRoute(signOut);

function signOut(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(200).json({ ok: true });
}
