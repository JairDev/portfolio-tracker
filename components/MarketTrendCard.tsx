import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

export default function MarketTrendCard({
  name,
  currentPrice,
  priceChange,
  image,
}) {
  const { spacing } = useTheme();
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
            <Typography>{priceChange}%</Typography>
          </Box>
          <Typography>Graphic</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
