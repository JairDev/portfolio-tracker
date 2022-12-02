import Button from "@mui/material/Button";
import React from "react";

interface ButtonProps {
  text: string;
  icon?: boolean;
  iconType?: React.ReactNode;
  onClick?: () => Promise<void>;
}

function ButtonComponent({ text, icon, iconType, onClick }: ButtonProps) {
  if (icon) {
    return (
      <Button onClick={onClick}>
        <span>{iconType}</span>
        {text}
      </Button>
    );
  }
  return <Button onClick={onClick}>{text}</Button>;
}

export { ButtonComponent as Button };
