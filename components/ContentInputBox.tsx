import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface ContenInputBoxProps {
  children: React.ReactNode;
}

export default function ContenInputBox({ children }: ContenInputBoxProps) {
  const { spacing } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#11011E",
        border: "1px solid rgba(255, 255, 255, 0.103)",
        padding: spacing(4),
      }}
    >
      {children}
    </Box>
  );
}
