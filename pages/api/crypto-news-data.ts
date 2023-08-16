import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "lib/fetchJson";

export default async function getCryptoNewsData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_CRYPTO_NEWS_DATA;
    const CRYPTO_NAME = req.query.cryptoName;
    const CRYPTO_NEWS_DATA = `https://newsapi.org/v2/everything?q=${CRYPTO_NAME}&language=es&apiKey=${API_KEY}`;
    const data: any = await fetchJson(CRYPTO_NEWS_DATA);
    res.status(200).json({
      news: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request",
    });
  }
}
