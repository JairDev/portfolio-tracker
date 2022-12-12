import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Icon from "@mui/material/Icon";

interface StepCardProps {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}

export default function StepCard({ title, subTitle, children }: StepCardProps) {
  const { spacing } = useTheme();
  return (
    <Card
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.103)",
        borderRadius: "18px",
        background: "#160622",
        padding: spacing(3, 2, 0, 2),
        marginTop: spacing(2),
      }}
    >
      <CardContent
        sx={{ padding: "0px", display: "flex", alignItems: "center" }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: spacing(3),
            background: "#2C223B",
            width: "60px",
            height: "60px",
          }}
        >
          <Icon sx={{ width: "32px", height: "32px" }}>{children}</Icon>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: " 600" }}>
            {title}
          </Typography>
          <Typography
            sx={{ fontSize: "16px", marginTop: spacing(0), color: " #B6B6B6" }}
          >
            {subTitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
