const API_NEWS = process.env.NEXT_PUBLIC_API_NEWS;

export const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

export const priceRange =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1";

export const coinId = (id: string | null | undefined) =>
  `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false`;

export const cryptoNews = (name: string | undefined) =>
  `https://newsapi.org/v2/everything?q=${name}&apiKey=${API_NEWS}`;

export const coinSinglePrice = (name: string) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`;

export const CURRENCY_FIAT_DATA = "https://api.apilayer.com/currency_data/list";
