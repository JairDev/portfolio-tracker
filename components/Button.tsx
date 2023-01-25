import React from "react";

import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
interface ButtonProps {
  text: string;
  icon?: boolean;
  variant?: "text" | "outlined" | "contained";
  children?: React.ReactNode;
  size?: "small" | "medium" | "large" | undefined;
  onClick?: () => void | (() => Promise<void>);
}

function ButtonComponent({
  text,
  variant,
  onClick,
  children,
  size,
}: ButtonProps) {
  const { spacing } = useTheme();

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      sx={{
        borderRadius: "8px",
        display: "flex",
        color: "text.primary",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
      {text}
    </Button>
  );
}

export { ButtonComponent as Button };
