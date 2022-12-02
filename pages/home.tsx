import ArticleCard from "components/ArticleCard";
import { Table } from "components/Table";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MarketTrendCard from "components/MarketTrendCard";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Button } from "components/Button";
import Input from "components/Input";

export default function Home() {
  const { spacing } = useTheme();

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
            Start and Build Your Crypto Portfolio Here
          </Typography>
          <Box maxWidth="600px">
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              Only at CoinMarketApp, you can track the price of your favorite
              cryptos and stay on top of the latest news from the crypto world.
            </Typography>
          </Box>
          <Button text="Get Started" />
        </Box>
        <Box
          sx={{
            paddingTop: spacing(17),
          }}
        >
          <Typography variant="h5">Market Trend</Typography>
          <Grid container sx={{ paddingTop: spacing(1) }}>
            <Grid container justifyContent="space-between" spacing={8}>
              <Grid item>
                <MarketTrendCard />
              </Grid>
              <Grid item>
                <MarketTrendCard />
              </Grid>
              <Grid item>
                <MarketTrendCard />
              </Grid>
              <Grid item>
                <MarketTrendCard />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            paddingTop: spacing(17),
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Market Update</Typography>
            <Input placeHolder="Search Coin" type="text" />
          </Box>

          <Box>
            <Table />
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography variant="h4">How To Get Started</Typography>
            <Typography variant="subtitle1">
              Simple and easy way to start tracking the price of your favorite
              cryptocurrency
            </Typography>
            <Button text="Register Now" />
          </Box>
        </Box>
      </main>
    </div>
  );
}
