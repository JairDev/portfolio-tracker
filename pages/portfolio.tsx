import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";

import { withGetServerSideProps } from "lib/getServerSideProps";
import { withSessionSsr } from "lib/sessions";

import { Button } from "components/Button";
import { Table } from "components/Table";
import BasicModal from "components/Modal";
import useSWR from "swr";
import formatCurrency from "lib/formatCurrency";
import PortfolioTable from "components/PortfolioTable";
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
  const { spacing } = useTheme();

  const router = useRouter();
  const { authenticated, userId, coins, coinData } = data;
  const [totalAmount, setTotalAmount] = useState();
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState(Array<CoinsLastPrice>);

  const handleClick = () => {
    Router.push("login");
  };

  const handleClickAddCoin = () => {
    setOpen(true);
  };

  useEffect(() => {
    const result = coins.map((coin, i) => {
      const lastPrice = coinData[i][coin.name];
      const newObject = { ...coin, ...lastPrice };
      return newObject;
    });
    const resultUserData = result.map((coinp) => {
      const buyAmount = Number.parseFloat(
        (coinp?.usd - coinp?.avgPrice).toFixed(2)
      ).toString();

      const amountCoin = coinp.usd * coinp.holding;

      const filter = coinDataApi?.filter((coin) => coin.id === coinp.name);

      const newObj = filter?.map((coin) => ({
        market_cap_rank: coin.market_cap_rank,
        image: coin.image,
        amountCoin,
        ...coinp,
      }));

      return newObj;
    });
    const flatData = resultUserData.flat();
    const reduce = result.reduce((prev, current) => {
      const amount = current.usd * current.holding;
      return prev + amount;
    }, 0);

    setTotalAmount(reduce.toFixed(2).toString());
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
        marginTop: spacing(14),
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>
              Portafolio principal
            </Typography>

            <Typography>${formatCurrency(totalAmount, "usd")}</Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: "8px" }}>
          <Typography sx={{ fontWeight: "bold" }}>Crear portafolio</Typography>
        </Box>
      </Box>

      <Box sx={{ width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            zIndex: " 50",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px" }}>Balance actual</Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              ${formatCurrency(totalAmount, "usd")}
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
          <BasicModal open={open} setOpen={setOpen} />
        </Box>
        <Box sx={{ marginTop: spacing(10) }}>
          {userData.length > 0 && (
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              Tus activos
            </Typography>
          )}

          {userData.length > 0 ? (
            <>
              {/* <Table data={userData} /> */}
              <PortfolioTable data={userData} />
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column ",
                justifyContent: "center ",
                alignItems: "center ",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                zIndex: "10",
              }}
            >
              <Box
                sx={{
                  paddingTop: spacing(10),
                  display: "flex",
                  flexDirection: "column ",
                  justifyContent: "center ",
                  alignItems: "center ",
                }}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
                  Este portafolio está vacío
                </Typography>
                <Typography sx={{ marginTop: "8px" }}>
                  Agregue cualquier moneda para comenzar
                </Typography>
                <Box sx={{ marginTop: "32px" }}>
                  <Button
                    onClick={handleClickAddCoin}
                    text="Añadir nueva moneda"
                    variant="contained"
                  >
                    <AddCircleOutlineIcon />
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          <Box sx={{ marginTop: "16px" }}></Box>
        </Box>
      </Box>
    </Box>
  );
}
