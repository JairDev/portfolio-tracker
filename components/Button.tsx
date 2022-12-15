import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
interface ButtonProps {
  text: string;
  icon?: boolean;
  variant?: "text" | "outlined" | "contained";
  children?: React.ReactNode;
  onClick?: () => void | (() => Promise<void>);
}

function ButtonComponent({ text, variant, onClick, children }: ButtonProps) {
  const { spacing } = useTheme();

  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={{
        borderRadius: "8px",
        display: "flex",
        color: "text.primary",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 24px",
        fontWeight: "600",
      }}
    >
      <Box
        sx={{
          marginRight: spacing(1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        {children}
      </Box>
      {text}
    </Button>
  );
}

export { ButtonComponent as Button };
