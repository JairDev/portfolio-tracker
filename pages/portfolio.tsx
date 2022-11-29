import Router from "next/router";
import { withSessionSsr } from "lib/sessions";
import { withGetServerSideProps } from "lib/getServerSideProps";
import { useEffect, useState } from "react";
import useUser from "lib/useUser";

export const getServerSideProps = withSessionSsr(withGetServerSideProps);

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  userEmail: string;
}

export default function Porfolio({ data }: { data: PortfolioProps }) {
  const { authenticated, userEmail, coins, coinData } = data;
  const [userData, setUserData] = useState([]);

  const handleClick = () => {
    if (!authenticated) {
      Router.push("login");
    }
  };

  useEffect(() => {
    // console.log(userId);
    // async function getData() {
    //   const res = await fetch("api/getCoins", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id: userId }),
    //   });
    //   const result = await res.json();
    //   // console.log(result);
    // }
    // getData();
    console.log(data);
    const result = data.coins.map((coin, i) => {
      // console.log(coin.avgPrice * coin.holding);
      const price = coinData[i][coin.name];
      console.log(price);
      // console.log(coin);
      const newObj = { ...coin, ...price };
      // console.log(newObj[coin.name].usd);
      return newObj;
    });
    console.log(result);
    setUserData(result);
    // const price = data.dataCoinPrice.map((coinPrice) => {
    //   // console.log(coinPrice);
    // });
  }, []);

  if (!authenticated) {
    return (
      <div>
        <p>PortFolio Tracker</p>
        <p>Sign up now!</p>
        <button onClick={handleClick}>Create Portfolio</button>
      </div>
    );
  }

  return (
    <div>
      <h1>User authorized</h1>
      <p>Hola</p>
      <p>{userEmail}</p>
      {userData &&
        userData.map((coin) => (
          <div key={coin.name}>
            <div>Name</div>
            <div>{coin.name}</div>
            <div>Price</div>
            <div>{coin.usd}</div>
            <div>Avg. Price</div>
            <div>{coin.avgPrice}</div>
            <div>Holdings</div>
            <div>{coin.holding}</div>
            <div>Amount</div>
            <div>{coin.avgPrice * coin.holding}</div>
          </div>
        ))}
    </div>
  );
}
