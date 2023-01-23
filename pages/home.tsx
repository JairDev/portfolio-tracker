import React, { useEffect, useRef, useState } from "react";

import { default as NextLink } from "next/link";
import Head from "next/head";

import useSWR from "swr";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link, Typography, TextField } from "@mui/material";
import MarketTrendCard from "components/MarketTrendCard";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Icon from "@mui/material/Icon";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuItem from "@mui/material/MenuItem";

import { Button } from "components/Button";
import Input from "components/Input";
import StepCard from "components/StepCard";
import { Table } from "components/Table";
import ArticleCard from "components/ArticleCard";

import fetchJson from "lib/fetchJson";
import { coinId, urlCoin } from "lib/apiUrl";
import CryptoNewsData from "components/CryptoNewsData";

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

export default function Home() {
  const { palette, spacing } = useTheme();
  const { data: coinData } = useSWR(urlCoin);
  // const { data: cryptoNewsData } = useSWR(
  //   `https://newsapi.org/v2/everything?q=${"ethereum"}&apiKey=28d89ba563644bf397ab0a8e7b46fa4d`
  // );
  const loading = !coinData;
  const [fullData, setFullData] = useState([]);
  const [singleCoin, setSingleCoin] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // console.log(cryptoNewsData);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "53f82f7b35msh3121d6a07e0a16bp16e3d8jsnac367b155a33",
        "X-RapidAPI-Host": "crypto-news-live3.p.rapidapi.com",
      },
    };

    async function getCoin() {
      // const res = await fetch(
      //   "https://newsapi.org/v2/everything?q=ethereum&apiKey=28d89ba563644bf397ab0a8e7b46fa4d"
      // );
      // const result = await res.json();
      // console.log(res);
      // console.log(result);
    }
    // getCoin();

    // fetch("https://crypto-news-live3.p.rapidapi.com/news", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
    // console.log(" hi");
  }, []);

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coinName = inputRef?.current?.value;
    const idCoinName = coinId(coinName.trim());
    const res: ResponseSearchCoin = await fetchJson(idCoinName);

    if (res?.error) {
      setErrorMessage("Moneda no encontrada");
      setTimeout(() => {
        setSuccessMessage(undefined);
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

    setSingleCoin((prev) => [...prev, newObj]);
  };

  const handleClick = () => {
    setSingleCoin([]);
  };

  useEffect(() => {
    async function change() {
      if (coinData) {
        const changeObj = coinData.slice(0, 10).map(async (coin) => {
          const priceRange = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=1`;
          const res = await fetchJson(priceRange);
          const newObj = {
            ...coin,
            priceChart: res.prices,
          };
          return newObj;
        });
        const result = await Promise.all(changeObj);
        setFullData(result);
      }
    }
    // change();
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
            {singleCoin?.length > 0 ? (
              <Table data={singleCoin} />
            ) : (
              !loading && <Table data={fullData} />
            )}

            {singleCoin?.length > 0 && (
              <Button variant="text" text="Ver top 10" onClick={handleClick} />
            )}
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

        <Box
          sx={{
            display: "flex",
            height: "200px",
            marginTop: "180px",
            paddingBottom: "40px",
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              // width: "40%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // border: "1px solid yellow",
            }}
          >
            <Box
              sx={{
                // border: "1px solid red",
                width: "100%",
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontSize: "24px",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: palette.text.primary,
                  textDecoration: "none",
                }}
              >
                CoinMarket
              </Typography>
              <Typography
                component="span"
                sx={{ color: palette.primary.main, fontWeight: "700" }}
              >
                App
              </Typography>
            </Box>
            <Box>
              <Icon>
                <InstagramIcon />
              </Icon>
              <Icon sx={{ marginLeft: "8px" }}>
                <TwitterIcon />
              </Icon>
              <Icon sx={{ marginLeft: "8px" }}>
                <LinkedInIcon />
              </Icon>
            </Box>
            <Box>
              <Typography>Diseñado por: @Bdyhm</Typography>
              <Typography sx={{ marginTop: "8px" }}>
                Desarrollado por: Alfredo Moscoso
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              marginLeft: "48px",
              height: "100%",
            }}
          >
            <Box sx={{ paddingLeft: "16px" }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                Aprender
              </Typography>
            </Box>
            <Box>
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Link
                  sx={{ marginTop: "16px", color: palette.text.primary }}
                  href="https://academy.binance.com/es/start-here"
                  underline="hover"
                >
                  Que es una criptomoneda?
                </Link>
                <Link
                  sx={{ marginTop: "16px", color: palette.text.primary }}
                  href="https://academy.binance.com/es/articles/what-is-a-cryptocurrency-whitepaper"
                  underline="hover"
                >
                  Que es un whitepaper?
                </Link>
                <Link
                  sx={{ marginTop: "16px", color: palette.text.primary }}
                  href="https://academy.binance.com/es/articles/what-is-a-decentralized-exchange-dex"
                  underline="hover"
                >
                  Que es un exchange descentralizado?
                </Link>
              </MenuItem>
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
}
