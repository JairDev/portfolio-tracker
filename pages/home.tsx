import React, { useEffect, useRef, useState } from "react";

import { default as NextLink } from "next/link";
import Head from "next/head";

import useSWR from "swr";

import {
  Box,
  Alert,
  AlertTitle,
  Link,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import MarketTrendCard from "components/MarketTrendCard";
import { Button } from "components/Button";
import StepCard from "components/StepCard";
import { Table } from "components/Table";
import CryptoNewsData from "components/CryptoNewsData";

import fetchJson from "lib/fetchJson";
import { coinId, urlCoin } from "lib/apiUrl";

type ResponseSearchCoin = {
  id?: string;
  name?: string;
  market_data?: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  image?: {
    small: string;
  };
  market_cap_rank?: number;
  error: string;
};

type InputRef = {
  value: null;
};

interface SetCoin {
  singleCoin: ResponseSearchCoin;
  // setSingleCoin: (singleCoin: ResponseSearchCoin) => void;
}

export default function Home<T>() {
  const { spacing } = useTheme();
  const { data: coinData } = useSWR(urlCoin);
  const loading = !coinData;
  const [fullData, setFullData] = useState([]);
  const [singleCoin, setSingleCoin] = useState<Array<T>>();
  const inputRef: React.RefObject<InputRef> = useRef(null);

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idCoinName = coinId(inputRef?.current?.value);
    const res: ResponseSearchCoin = await fetchJson(idCoinName);

    if (res?.error) {
      setErrorMessage("Moneda no encontrada");
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 1500);
      return;
    }
    const newObj = {
      id: res?.id,
      name: res?.name,
      current_price: res?.market_data?.current_price?.usd,
      price_change_percentage_24h:
        res?.market_data?.price_change_percentage_24h,
      image: res?.image?.small,
      market_cap_rank: res?.market_cap_rank,
    };
    //@ts-ignore
    setSingleCoin((prev) => [...prev, newObj]);
  };

  const handleClick = () => {
    setSingleCoin([]);
  };

  useEffect(() => {
    async function change() {
      if (coinData) {
        const changeObj = coinData
          .slice(0, 4)
          .map(async (coin: { id: string }) => {
            const priceRange = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`;
            const res = await fetchJson(priceRange);
            const newObj = {
              ...coin,
              //@ts-ignore
              priceChart: res.prices,
            };
            return newObj;
          });
        const result = await Promise.all(changeObj);
        //@ts-ignore

        setFullData(result);
      }
    }
    change();
  }, [coinData]);

  return (
    <div>
      <Head>
        <title>Portfolio Track</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: spacing(14),
          }}
        >
          <Typography variant="h1">
            Comience y construya su portafolio de criptomonedas
          </Typography>
          <Box maxWidth="600px" sx={{ marginTop: spacing(3) }}>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: " #B6B6B6" }}
            >
              Solo en CoinMarketApp, puede realizar un seguimiento del precio de
              sus criptomonedas favoritas y estar al tanto de las últimas
              noticias del criptomundo.
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
              href="/login"
            >
              Empezar
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            paddingTop: spacing(18),
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            Tendencia del mercado
          </Typography>

          <Grid container sx={{ paddingTop: spacing(3) }}>
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {fullData &&
                fullData
                  .slice(0, 4)
                  .map(
                    ({
                      id,
                      name,
                      current_price,
                      price_change_percentage_24h,
                      image,
                      priceChart,
                    }: {
                      id: string;
                      name: string;
                      current_price: number;
                      price_change_percentage_24h: number;
                      image: string;
                      priceChart: Array<T>;
                    }) => (
                      <Grid key={id} xs item>
                        <MarketTrendCard
                          name={name}
                          currentPrice={current_price}
                          priceChange={price_change_percentage_24h}
                          image={image}
                          priceChartData={priceChart}
                        />
                      </Grid>
                    )
                  )}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            paddingTop: spacing(18),
          }}
        >
          <Box
            id="market"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: spacing(2),
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "500" }}>
              Actualización del mercado
            </Typography>
            <Box sx={{ position: "relative" }}>
              {errorMessage && (
                <Alert
                  sx={{ position: "absolute", top: "-90px" }}
                  severity="error"
                >
                  <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  inputRef={inputRef}
                  placeholder="Buscar criptomoneda"
                  sx={{
                    width: "100%",
                    border: "1px solid rgba(255, 255, 255, 0.103)",
                    borderRadius: "8px",
                    background: "#160C24",
                    margin: "0px",
                  }}
                />
              </form>
            </Box>
          </Box>

          <Box>
            {
              //@ts-ignore
              singleCoin?.length > 0 ? (
                //@ts-ignore
                <Table data={singleCoin} />
              ) : (
                !loading && <Table data={fullData} />
              )
            }

            {
              //@ts-ignore
              singleCoin?.length > 0 && (
                <Button
                  variant="text"
                  text="Ver top 10"
                  onClick={handleClick}
                />
              )
            }
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: spacing(16),
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>
              Como empezar
            </Typography>
            <Typography
              variant="subtitle1"
              maxWidth={400}
              sx={{ marginTop: spacing(2), color: " #B6B6B6" }}
            >
              Una manera simple y fácil de comenzar a rastrear el precio de su
              criptomoneda favorita
            </Typography>
            <Box sx={{ marginTop: spacing(4) }}>
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
                Regístrate ahora
              </Link>
            </Box>
          </Box>
          <Box>
            <StepCard
              title="Crea tu cuenta"
              subTitle="Regístrate con tu correo"
            >
              <PersonAddIcon sx={{ fontSize: "32px" }} />
            </StepCard>
            <StepCard
              title="Crea tu portafolio"
              subTitle="Agregue sus criptomonedas a su portafolio"
            >
              <BusinessCenterIcon sx={{ fontSize: "32px" }} />
            </StepCard>
            <StepCard
              title="Administra tu portafolio"
              subTitle="Mantén un registro de tus criptomonedas"
            >
              <ManageAccountsIcon sx={{ fontSize: "32px" }} />
            </StepCard>
          </Box>
        </Box>

        <CryptoNewsData />
      </main>
    </div>
  );
}
