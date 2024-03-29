import { useEffect, useState } from "react";

import { default as NextLink } from "next/link";

import useSWR from "swr";

import { Box, Typography, Link } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { withGetServerSideProps } from "lib/getServerSideProps";
import { withSessionSsr } from "lib/sessions";
import { testData } from "lib/apiUrl";

import { Button } from "components/Button";
import BasicModal from "components/Modal";
import formatCurrency from "lib/formatCurrency";
import PortfolioTable from "components/PortfolioTable";
import Image from "next/image";

import screenApp from "../public/screen-app.png";
import { coinId, coinSinglePrice, urlCoin } from "lib/apiUrl";
import getApiCoinData from "lib/getApiCoinData";
import fetchJson from "lib/fetchJson";
import calculateProfit from "lib/calculateProfit";
import holdingAmount from "lib/holdingAmount";
import calculateAvgPrice from "lib/calculateAvgPrice";
import { Transactions } from "lib/types";
interface UserDataTypes {
  transactions: Array<Transactions>;
  _id: string;
  name: string;
  avgPrice: number;
  holding: number;
  usd: number;
  profit: number;
  __v: number;
}

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  userEmail: string;
  coins: Array<UserDataTypes>;
  userId: string;
  coinData: Array<{
    [key: string]: {
      [key: string]: number;
    };
  }>;
}

interface CoinFilter {
  id?: string;
  market_cap_rank?: number;
  image?: string;
  usd?: number;
}

const INTERVAL = 60000;

//@ts-ignore
export default function Porfolio({ data = [] }: { data: PortfolioProps }) {
  const { data: coinDataApi } = useSWR(urlCoin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: INTERVAL,
  });
  // const coinDataApi = testData;
  const [mounted, setMounted] = useState(false);
  const { spacing } = useTheme();
  const { authenticated, coins } = data;
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(authenticated);
  const handleClickAddCoin = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (coins) {
      const getLastPrice = async () => {
        const resultUserData = coins.map(async (userDatadb) => {
          const lastPrice: any = coinDataApi?.find(
            (coin: { id: string }) => coin.id === userDatadb.name
          );

          const profit = calculateProfit(
            userDatadb?.transactions,
            lastPrice?.current_price
          );
          const totalHolding = holdingAmount(userDatadb?.transactions);
          const { avgPrice } = calculateAvgPrice(userDatadb?.transactions);
          const totalAmount = lastPrice?.current_price * totalHolding;
          const filter = coinDataApi?.filter(
            (coin: CoinFilter) => coin?.id === userDatadb?.name
          );

          const resultNewUserDataObject = filter?.map((coin: CoinFilter) => ({
            ...userDatadb,
            market_cap_rank: coin?.market_cap_rank,
            image: coin?.image,
            totalAmount,
            current_price: lastPrice?.current_price,
            profit,
            avgPrice,
            holding: totalHolding,
          }));
          return resultNewUserDataObject;
        });

        const resultData = await Promise.all(resultUserData);
        const resultFlatUserData = resultData.flat();

        if (resultFlatUserData.length > 0) {
          const currentAmount = resultFlatUserData?.reduce((prev, current) => {
            return prev + current?.totalAmount;
          }, 0);
          setTotalAmount(currentAmount);
        }
        //@ts-ignore
        setUserData(resultFlatUserData);
      };
      getLastPrice();
    }
  }, [coinDataApi, coins]);

  if (!mounted) {
    return null;
  }
  if (!authenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          paddingTop: spacing(14),
          marginBottom: spacing(8),
        }}
      >
        <Box
          sx={{
            // width: "40%",
            zIndex: 10,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: "700", color: "primary.main" }}
          >
            Regístrese hoy
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Rastreador de cartera criptográfica
          </Typography>
          <Box maxWidth="600px" sx={{ marginTop: spacing(3) }}>
            <Typography variant="subtitle1" sx={{ color: " #B6B6B6" }}>
              Realice un seguimiento de sus ganancias y pérdidas con nuestra
              plataforma fácil de usar.
            </Typography>
          </Box>
          <Box sx={{ marginTop: spacing(8) }}>
            <Link
              component={NextLink}
              underline="none"
              color="text.primary"
              sx={{
                bgcolor: "primary.main",
                padding: spacing(2, 5),
                borderRadius: "8px",
                fontWeight: "600",
              }}
              href="/register"
            >
              Crea tu portafolio
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "1px solid red",
            position: "absolute",
            // marginTop: spacing(10),
            // transform: "translateX(20%)",
            right: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              // border: "1px solid red",
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(to right, black, transparent)",
            }}
          ></Box>
          <Image
            src={screenApp}
            alt="Imagen de un portafolio de criptomonedas"
          />
        </Box>
      </Box>
    );
  }

  if (authenticated && userData.length <= 0) {
    return (
      <Box
        sx={{
          flexDirection: "column ",
          justifyContent: "center ",
          alignItems: "center ",
          top: 0,
          left: 0,
          width: "100%",
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
          <BasicModal open={open} setOpen={setOpen} coinData={coinDataApi} />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: spacing(14),
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            zIndex: " 50",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
              Balance actual
            </Typography>
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
          <BasicModal open={open} setOpen={setOpen} coinData={coinDataApi} />
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

          {!userData[0] ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: spacing(2),
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <PortfolioTable data={userData} />
            </>
          )}

          <Box sx={{ marginTop: "16px" }}></Box>
        </Box>
        <BasicModal open={open} setOpen={setOpen} coinData={coinDataApi} />
      </Box>
    </Box>
  );
}
//@ts-ignore
export const getServerSideProps = withSessionSsr(withGetServerSideProps);
