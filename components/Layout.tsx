import { useTheme } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <NavBar />
      {children}
    </div>
  );
}
