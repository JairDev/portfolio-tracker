import React, { useEffect, useState } from "react";

import { default as NextLink } from "next/link";
import Head from "next/head";

import useSWR from "swr";

import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";
import MarketTrendCard from "components/MarketTrendCard";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Grid2 from "@mui/material/Unstable_Grid2";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Icon from "@mui/material/Icon";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Chart from "chart.js/auto";

import { Button } from "components/Button";
import Input from "components/Input";
import StepCard from "components/StepCard";
import { Table } from "components/Table";
import ArticleCard from "components/ArticleCard";

import fetchJson from "lib/fetchJson";
import LineChart from "components/LineChart";
import { coinId, priceRange, urlCoin } from "lib/apiUrl";

export default function Home() {
  const { palette, spacing } = useTheme();
  const { data: coinData } = useSWR(urlCoin);
  const loading = !coinData;
  // const apiKeyNews = "69927d6b98c03af209c1e8961b1ff94e";
  // const urlNews = `https://gnews.io/api/v4/search?q=${"bitcoin"}&lang=en&max=10&token=${apiKeyNews}`;
  // const { data } = useSWR(urlNews);
  const [inputCoinName, setInputCoinName] = useState("");
  const [singleCoin, setSingleCoin] = useState([]);

  const handleChange = (e) => {
    setInputCoinName(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idCoinName = coinId(inputCoinName.trim());

    const res = await fetchJson(idCoinName);
    console.log(res);
    if (res.error) {
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

    setInputCoinName("");
  };

  const handleClick = (e: React.BaseSyntheticEvent) => {
    setSingleCoin([]);
    // console.log(e);
  };

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

        <Box>
          {/* <div>
            <canvas id="price"></canvas>
          </div> */}
          {/* {<LineChart chartData={chartData} />} */}
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
              {coinData &&
                coinData
                  .slice(0, 4)
                  .map(
                    ({
                      id,
                      name,
                      current_price,
                      price_change_percentage_24h,
                      image,
                    }) => (
                      <Grid key={id} xs item>
                        <MarketTrendCard
                          name={name}
                          currentPrice={current_price}
                          priceChange={price_change_percentage_24h}
                          image={image}
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
            <Box>
              <form onSubmit={handleSubmit}>
                <Input
                  onChange={handleChange}
                  placeHolder="Buscar criptomoneda"
                  value={inputCoinName}
                  type="text"
                />
              </form>
            </Box>
          </Box>

          <Box>
            {singleCoin?.length > 0 ? (
              <Table data={singleCoin} tableHome />
            ) : (
              !loading && (
                <Table data={coinData && coinData.slice(0, 10)} tableHome />
              )
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
              {/* <Button variant="contained" text="Regístrate ahora" /> */}
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

        <Box
          sx={{
            marginTop: spacing(16),
          }}
        >
          <Box
            id="news"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4">Noticias sobre criptomonedas</Typography>
            <Box>
              <Input placeHolder="Buscar noticia" type="text" />
            </Box>
          </Box>

          <Grid container sx={{ paddingTop: spacing(2) }}>
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* {loading ? (
                <div>Cargando</div>
              ) : (
                newsData?.articles.map((article, i) => (
                  <Grid
                    key={article.title}
                    xs={i === 0 ? 8 : 4}
                    sx={{ heigth: "100%" }}
                    item
                  >
                    <ArticleCard
                      title={article.title}
                      subTitle={article.description}
                      image={article.image}
                    />
                  </Grid>
                ))
              )} */}
            </Grid>
          </Grid>
        </Box>

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
