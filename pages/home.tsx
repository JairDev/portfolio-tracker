import { default as NextLink } from "next/link";
import Head from "next/head";

import useSWR from "swr";

import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";
import MarketTrendCard from "components/MarketTrendCard";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { Button } from "components/Button";
import Input from "components/Input";
import StepCard from "components/StepCard";
import { Table } from "components/Table";

const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export default function Home() {
  const { palette, spacing, shape } = useTheme();
  const { data } = useSWR(urlCoin);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: spacing(11),
          }}
        >
          <Typography variant="h1">
            Comience y construya su cartera de criptomonedas
          </Typography>
          <Box maxWidth="600px" sx={{ marginTop: spacing(2) }}>
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
                padding: spacing(1, 3),
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
          <Typography variant="h6">Tendencia del mercado</Typography>
          <Grid container sx={{ paddingTop: spacing(2) }}>
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {data &&
                data
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Actualización del mercado</Typography>
            <Box>
              <Input placeHolder="Search Coin" type="text" />
            </Box>
          </Box>

          <Box>
            <Table
              data={data && data.slice(0, 10)}
              cellValue={[
                "Rank",
                "Nombre",
                "Último precio",
                "Cambio",
                // "Mercado",
              ]}
              tableHome
            />
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
              <Button variant="contained" text="Regístrate ahora" />
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Noticias sobre criptomonedas</Typography>
            <Box>
              <Input placeHolder="Buscar noticia" type="text" />
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
}
