import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import fetchJson from "lib/fetchJson";
import { withGetServerSideProps } from "lib/getServerSideProps";
import { withSessionSsr } from "lib/sessions";

import { Button } from "components/Button";
import { Table } from "components/Table";
import BasicModal from "components/Modal";
import NestedModal from "components/Modal";
import useSWR from "swr";
interface CoinsLastPrice {
  _id: string;
  name: string;
  avgPrice: number;
  holding: number;
  usd: number;
  __v: number;
}
export const getServerSideProps = withSessionSsr(withGetServerSideProps);

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  userEmail: string;
  coins: Array<CoinsLastPrice>;
  userId: string;
  coinData: Array<{
    [key: string]: {
      [key: string]: number;
    };
  }>;
}

const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export default function Porfolio({ data }: { data: PortfolioProps }) {
  const { data: coinDataApi } = useSWR(urlCoin);

  const router = useRouter();
  const { authenticated, userId, coins, coinData } = data;
  const [coinName, setCoinName] = useState("");
  const [coinAvgPrice, setCoinAvgPrice] = useState("");
  const [coinHolding, setCoinHolding] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userData, setUserData] = useState(Array<CoinsLastPrice>);

  const handleClick = () => {
    Router.push("login");
  };

  const handleClickAddCoin = () => {
    console.log("w");
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = {
      name: coinName,
      avgPrice: coinAvgPrice,
      holding: coinHolding,
    };

    const res = await fetch("api/coin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();

    const newID = { id: result.coinId, userId: userId };

    await fetchJson("api/update-data-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newID),
    });
    router.replace(router.asPath);
  };

  useEffect(() => {
    const result = coins.map((coin, i) => {
      const lastPrice = coinData[i][coin.name];
      const newObject = { ...coin, ...lastPrice };
      return newObject;
    });

    const resultUserData = result.map((coinp) => {
      console.log(coinp);
      const profit = coinp?.avgPrice * coinp?.holding;
      const profitResult = Number.parseFloat(coinp?.usd - profit).toFixed(2);
      const filter = coinDataApi?.filter((coin) => coin.id === coinp.name);

      const newObj = filter?.map((coin) => ({
        market_cap_rank: coin.market_cap_rank,
        image: coin.image,
        profitResult,
        ...coinp,
      }));
      filter?.map((coin) => {
        if (coin) {
          console.log(coin);
        }
      });

      return newObj;
    });
    const flatData = resultUserData.flat();
    const reduce = result.reduce((prev, current) => {
      const amount = current.usd * current.holding;
      return prev + amount;
    }, 0);

    setTotalAmount(reduce.toString());
    setUserData(flatData);
  }, [coinData, coinDataApi, coins]);

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
    <Box
      sx={{
        display: "flex",
        marginTop: "32px",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              Portafolio principal
            </Typography>

            <Typography>${totalAmount}</Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: "8px" }}>
          <Typography sx={{ fontWeight: "bold" }}>Crear portafolio</Typography>
        </Box>
      </Box>

      <Box sx={{ width: "80%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: "14px" }}>Balance actual</Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              ${totalAmount}
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={handleClickAddCoin}
              text="Añadir nueva moneda"
              variant="contained"
            >
              <AddCircleOutlineIcon />
            </Button>
          </Box>
          <BasicModal
            open={open}
            handleClose={handleClose}
            userId={userId}
            setOpen={setOpen}
          />
          {/* <NestedModal /> */}
        </Box>
        <Box sx={{ marginTop: "80px" }}>
          {userData.length > 0 && (
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              Tus activos
            </Typography>
          )}

          {userData.length > 0 ? (
            <Table data={userData} coinData={coinData} />
          ) : (
            <Typography>Este portafolio está vació</Typography>
          )}

          <Box sx={{ marginTop: "16px" }}>
            {/* <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  maxWidth: "350px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label>Name</label>
                <input onChange={(e) => setCoinName(e.target.value)}></input>
                <label>Avg Price</label>
                <input
                  onChange={(e) => setCoinAvgPrice(e.target.value)}
                ></input>
                <label>Holding</label>
                <input onChange={(e) => setCoinHolding(e.target.value)}></input>
                <Box sx={{ marginTop: "16px" }}>
                  <button>Crear portafolio</button>
                </Box>
              </Box>
            </form> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
