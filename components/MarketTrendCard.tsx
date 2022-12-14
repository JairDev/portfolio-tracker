import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Icon from "@mui/material/Icon";
import LineChart from "./LineChart";
import useSWR from "swr";
import formatCurrency from "lib/formatCurrency";

const priceRange =
  "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1";

export default function MarketTrendCard({
  name,
  currentPrice,
  priceChange,
  image,
  priceChartData,
}) {
  const { spacing } = useTheme();
  const theme = useTheme();
  const { data: coinPriceData } = useSWR(priceRange);
  const loading = !coinPriceData;
  const priceValueClassName = priceChange < 0 ? "error.main" : "primary.main";
  const chartValueClassName = priceChange < 0 ? "#d32f2f" : "#0FAE96";

  const priceData = [
    { year: 1, count: 10 },
    { year: 2, count: 20 },
    { year: 3, count: 15 },
    { year: 4, count: 25 },
    { year: 5, count: 22 },
    { year: 6, count: 30 },
    { year: 7, count: 28 },
    { year: 8, count: 28 },
    { year: 7, count: 28 },
    { year: 9, count: 28 },
    { year: 10, count: 28 },
    { year: 11, count: 28 },
    { year: 12, count: 28 },
    { year: 13, count: 28 },
    { year: 14, count: 28 },
    { year: 15, count: 28 },
    { year: 16, count: 28 },
    { year: 17, count: 28 },
    { year: 18, count: 28 },
    { year: 19, count: 28 },
    { year: 20, count: 28 },
    { year: 21, count: 28 },
    { year: 22, count: 28 },
    { year: 23, count: 28 },
    { year: 24, count: 28 },
  ];

  const chartData = {
    labels: priceData.map((row) => row.year),
    datasets: [
      {
        label: "",
        data: priceChartData?.map((row) => row[1]),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        pointBackgroundColor: "none",
        pointRadius: 0,

        pointBorderWidth: 0,
        borderColor: chartValueClassName,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card
      sx={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <CardContent>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: spacing(3),
            }}
          >
            <Image src={image} alt={name} width={48} height={48} />

            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {name}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              sx={{ mb: spacing(1), fontSize: "18px", fontWeight: "bold" }}
            >
              ${currentPrice}
            </Typography>
            <Typography sx={{ color: priceValueClassName }}>
              {formatCurrency(priceChange, "usd")}%
            </Typography>
          </Box>
          <Box
            sx={{
              // border: "1px solid red",
              width: "120px",
            }}
          >
            {!loading && <LineChart chartData={chartData} />}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
