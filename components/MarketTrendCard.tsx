import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MarketTrendCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Bitcoin BTC
          </Typography>
          <Typography component="div">Label</Typography>
          <Typography component="div">Icon</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography sx={{ mb: 1.5 }}>$234234</Typography>
            <Typography variant="body2">1.44%</Typography>
          </Box>
          <Typography variant="body2">Graphic</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}