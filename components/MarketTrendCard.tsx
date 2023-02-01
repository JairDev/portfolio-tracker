import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LineChart from "./LineChart";
import formatCurrency from "lib/formatCurrency";

interface MarketTrendCardProps<T> {
  name: string;
  currentPrice: number;
  priceChange: number;
  image: string;
  priceChartData: Array<T>;
}

export default function MarketTrendCard<T>({
  name,
  currentPrice,
  priceChange,
  image,
  priceChartData,
}: MarketTrendCardProps<T>) {
  const { spacing } = useTheme();
  const priceValueClassName = priceChange < 0 ? "error.main" : "primary.main";
  const chartValueClassName = priceChange < 0 ? "#d32f2f" : "#0FAE96";

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
              {formatCurrency(Number(priceChange.toFixed(2)), "usd")}%
            </Typography>
          </Box>
          <Box
            sx={{
              width: "120px",
            }}
          >
            <LineChart
              priceChartData={priceChartData}
              chartValueClassName={chartValueClassName}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
