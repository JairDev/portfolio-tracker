import Router from "next/router";
import { withSessionSsr } from "lib/sessions";
import { withGetServerSideProps } from "lib/getServerSideProps";
import { useEffect, useState } from "react";
import useUser from "lib/useUser";
import { Table } from "components/Table";

interface CoinsLastPrice {
  _id: string;
  name: string;
  avgPrice: number;
  holding: number;
  __v: number;
}
export const getServerSideProps = withSessionSsr(withGetServerSideProps);

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  userEmail: string;
  coins: Array<CoinsLastPrice>;
  // coinData: {
  //   [key: string]: {
  //     usd: string;
  //   };
  // };
}

export default function Porfolio({ data }: { data: PortfolioProps }) {
  const { authenticated, userEmail, coins, coinData } = data;
  const [userData, setUserData] = useState([]);
  // console.log(userEmail, authenticated);
  const handleClick = () => {
    if (!authenticated) {
      Router.push("login");
    }
  };

  useEffect(() => {
    // console.log(coins);
    const result = coins.map((coin, i) => {
      const lastPrice = coinData[i][coin.name];
      // console.log(lastPrice);
      const newObject = { ...coin, ...lastPrice };
      return newObject;
    });
    // console.log(result);
    setUserData(result);
  }, [coinData, coins]);

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
      {/* {userData &&
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
        ))} */}
      <Table arr={userData} />
    </div>
  );
}
