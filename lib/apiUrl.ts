export const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const priceRange =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1";

export const coinId = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false`;
