import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "lib/fetchJson";

export default async function getfiatCurrency(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const CURRENCY_FIAT_DATA = "https://api.apilayer.com/currency_data/list";
    const data: any = await fetchJson(CURRENCY_FIAT_DATA, {
      //@ts-ignore
      headers: { apikey: process.env.NEXT_PUBLIC_API_FIAT_CURRENCY },
    });
    res.status(200).json({
      currencies: data.currencies,
    });
  } catch (error) {
    res.status(404).json({
      message: "Api not found",
    });
  }
}
