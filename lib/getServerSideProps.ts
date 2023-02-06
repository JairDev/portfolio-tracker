import getApiCoinData from "./getApiCoinData";

interface CoinsLastPriceArgument {
  _id: string;
  name: string;
  avgPrice: number;
  holding: number;
  __v: number;
}
//@ts-ignore
export const withGetServerSideProps = async function ({ req }) {
  try {
    const api_server = "http://localhost:3000";
    let userSession = req?.session?.user;

    // console.log(userSession);
    const res = await fetch(`${api_server}/api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization: `Bearer ${userSession?.token}`,
      },
    });

    const userData = await res.json();
    console.log(userData);
    //@ts-ignore
    const coinsLastPrice = userData.coins.map(async (coin) => {
      const coinData = await getApiCoinData(coin.name);
      return coinData;
    });

    const resultAllCoinsData = await Promise.all(coinsLastPrice);
    // console.log(resultAllCoinsData);

    const data = JSON.parse(
      JSON.stringify({ ...userData, coinData: resultAllCoinsData })
    );

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};
