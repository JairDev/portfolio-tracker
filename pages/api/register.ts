import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const body = JSON.parse(req.body);
  if (req.method === "POST") {
    console.log(req.body);
    console.log(process.env.DB_URL);
    res.status(200).send({
      message: "Hello",
    });
  }
}
