export default async function getApiCoinData(id: string) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  );
  return res.json();
}
