import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function StepCard() {
  return (
    <Card>
      <CardContent sx={{ padding: "8px 0px " }}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Icon
          </Typography>
        </Box>
        <Box>
          <Typography component="div">Create Your Account</Typography>
          <Typography component="div">Register with your email</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
