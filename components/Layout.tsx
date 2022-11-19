import { useTheme } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className="layout">
        <NavBar />
        {children}
      </div>
    </ThemeProvider>
  );
}
