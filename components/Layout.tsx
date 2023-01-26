import React from "react";
import NavBar from "./NavBar";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <Box
        sx={{
          background: "rgba(255, 0, 200, 0.5)",
          borderRadius: "50%",
          position: "fixed",
          top: "0%",
          right: "0%",
          width: "55%",
          height: "55%",
          filter: "blur(200px)",
          zIndex: "0",
        }}
      ></Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          zIndex: "10",
          paddingLeft: 0,
          paddingRight: 0,
          minHeight: "100vh",
        }}
        maxWidth="lg"
      >
        <NavBar />
        {children}
        <Footer />
      </Container>
    </div>
  );
}
