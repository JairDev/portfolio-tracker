import React from "react";
import NavBar from "./NavBar";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { theme } from "../styles/theme";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { palette, spacing, shape } = useTheme();

  return (
    <Container maxWidth={false} sx={{ bgcolor: "background.paper" }}>
      <Container>
        <NavBar />
        {children}
      </Container>
    </Container>
  );
}
