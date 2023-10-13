import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongodb";

export const withGetServerSideProps = async function ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  await dbConnect();
  let userSession = req?.session?.user;
  if (userSession) {
    try {
      const res = await fetch(`http://${req.headers.host}/api/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession?.token}`,
        },
      });

      const userData = await res.json();
      const data = JSON.parse(JSON.stringify({ ...userData }));
      // console.log(data);
      return {
        props: {
          data,
        },
      };
    } catch (error) {
      res.status(401).send({ message: "Usuario no autorizado" });
    }
  }
  return {
    props: {},
  };
};
