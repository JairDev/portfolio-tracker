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
import Container from "@mui/material/Container";

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
import { coinId, testData, urlCoin } from "lib/apiUrl";

type ResponseSearchCoin<T> = {
  id?: string;
  name?: string;
  market_data?: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    sparkline_7d: {
      price: Array<T>;
    };
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

const INTERVAL = 60000;

export default function Home() {
  const { spacing } = useTheme();
  const { data: coinData, error } = useSWR(urlCoin, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: INTERVAL,
  });
  // const coinData = testData;
  const loading = !coinData;
  return (
    <div>
      <Head>
        <title>CoinMarket Track</title>
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
          <Box maxWidth="800px" sx={{ marginTop: spacing(3) }}>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: " #B6B6B6" }}
            >
              Solo en CoinMarketApp, puede realizar un seguimiento de sus
              ganancias y pérdidas y estar al tanto de las últimas noticias del
              criptomundo.
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
              {/* {coinData &&
                coinData.slice(0, 3).map(
                  //@ts-ignore
                  ({
                    id,
                    name,
                    current_price,
                    price_change_percentage_24h,
                    image,
                    sparkline_in_7d,
                  }: {
                    id: string;
                    name: string;
                    current_price: number;
                    price_change_percentage_24h: number;
                    image: string;
                    //@ts-ignore
                    sparkline_in_7d: Array;
                  }) => (
                    <Grid key={id} xs item>
                      <MarketTrendCard
                        name={name}
                        currentPrice={current_price}
                        priceChange={price_change_percentage_24h}
                        image={image}
                        price7d={sparkline_in_7d}
                      />
                    </Grid>
                  )
                )} */}
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { sm: "center" },
            marginTop: spacing(12),
            padding: { xs: `${spacing(3)} ${spacing(2)}`, sm: 2, md: 3 },
            position: "relative",
          }}
        >
          <Box
            sx={{
              background: "#60FFE7",
              borderRadius: "50%",
              position: "absolute",
              top: "0%",
              right: "0%",
              width: "55%",
              height: "100%",
              filter: "blur(200px)",
              opacity: "0.5",
              zIndex: "0",
            }}
          ></Box>

          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Conoces sobre criptomonedas?
            </Typography>
            <Typography sx={{ marginTop: spacing(1) }}>
              Aprende acerca de criptomonedas ahora mismo.{" "}
            </Typography>
          </Box>
          <Box sx={{ marginTop: { xs: spacing(4), sm: spacing(0) } }}>
            <Link
              underline="none"
              color="text.primary"
              sx={{
                bgcolor: "primary.main",
                padding: spacing(2, 5),
                borderRadius: "8px",
                fontWeight: "600",
              }}
              href="#learn"
            >
              Aprender
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            paddingTop: spacing(18),
          }}
        >
          <Box>{!loading && <Table data={coinData} />}</Box>
        </Box>
        <Grid
          container
          columns={{ lg: 2 }}
          sx={{
            marginTop: spacing(16),
            justifyContent: "space-between",
            rowGap: spacing(4),
            position: "relative",
          }}
        >
          <Box
            sx={{
              background: "#FF00C7",
              borderRadius: "50%",
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "55%",
              height: "15%",
              filter: "blur(200px)",
              opacity: "0.5",
              zIndex: "0",
            }}
          ></Box>
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
        </Grid>

        <CryptoNewsData />
      </main>
    </div>
  );
}
