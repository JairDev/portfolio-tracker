// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDataBase } from "../../lib/mongodb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { db } = await connectToDataBase();

  const users = await db?.collection("users").find().toArray();

  if (req.method === "GET") {
    res.status(200).json({ users });
  }
}
