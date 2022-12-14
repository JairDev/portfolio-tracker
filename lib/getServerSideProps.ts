import type { NextApiRequest, NextApiResponse } from "next";
import getApiCoinData from "./getApiCoinData";
import useUser from "./useUser";

interface CoinsLastPriceArgument {
  _id: string;
  name: string;
  avgPrice: number;
  holding: number;
  __v: number;
}

export const withGetServerSideProps = async function ({ req }) {
  const api_server = "http://localhost:3000";
  let userSession = req?.session?.user;
  // console.log("getserversession", userSession);
  // console.log("server-side");
  const res = await fetch(`${api_server}/api/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      Authorization: `Bearer ${userSession?.token}`,
    },
  });

  const userData = await res.json();
  // console.log("getserver", userData);
  const coinsLastPrice = userData.coins.map(
    async (coin: CoinsLastPriceArgument) => {
      const coinData = await getApiCoinData(coin.name);
      return coinData;
    }
  );
  const resultAllCoinsData = await Promise.all(coinsLastPrice);

  const data = JSON.parse(
    JSON.stringify({ ...userData, coinData: resultAllCoinsData })
  );

  return {
    props: {
      data,
    },
  };
};
