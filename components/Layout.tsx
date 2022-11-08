import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <div className="layout">{children}</div>;
}
