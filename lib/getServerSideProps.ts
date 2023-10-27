import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/mongodb";

export const withGetServerSideProps = async function ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  await dbConnect();
  let userSession = req?.session?.user;
  console.log(userSession);
  if (userSession) {
    const protocol = req?.headers?.referer?.split("://")[0];
    try {
      const res = await fetch(`${protocol}://${req.headers.host}/api/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession?.token}`,
        },
      });
      const userData = await res.json();
      const data = JSON.parse(JSON.stringify({ ...userData }));
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
