import React from "react";
import NavBar from "./NavBar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <Box
        sx={{
          background: "rgba(255, 0, 200, 0.253)",
          borderRadius: "50%",
          position: "fixed",
          top: "0%",
          right: "0%",
          width: "60%",
          height: "60%",
          filter: "blur(200px)",
          zIndex: "0",
        }}
      ></Box>
      <Container
        sx={{
          position: "relative",
          zIndex: "10",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <NavBar />
        {children}
      </Container>
    </div>
  );
}
