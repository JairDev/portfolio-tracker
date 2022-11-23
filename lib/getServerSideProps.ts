import type { NextApiRequest, NextApiResponse } from "next";

export const withGetServerSideProps = async function ({ req }) {
  const api_server = "http://localhost:3000";
  let userSession = req?.session?.user;
  const res = await fetch(`${api_server}/api/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      Authorization: `Bearer ${userSession?.token}`,
    },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
