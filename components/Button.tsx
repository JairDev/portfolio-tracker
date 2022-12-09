import Button from "@mui/material/Button";
import React from "react";

interface ButtonProps {
  text: string;
  icon?: boolean;
  variant?: string;
  iconType?: React.ReactNode;
  onClick?: () => Promise<void>;
}

function ButtonComponent({
  text,
  icon,
  variant,
  iconType,
  onClick,
}: ButtonProps) {
  if (icon) {
    return (
      <Button
        onClick={onClick}
        variant={variant}
        sx={{ color: "text.primary" }}
      >
        <span>{iconType}</span>
        {text}
      </Button>
    );
  }
  return (
    <Button onClick={onClick} variant={variant} sx={{ color: "text.primary" }}>
      {text}
    </Button>
  );
}

export { ButtonComponent as Button };
