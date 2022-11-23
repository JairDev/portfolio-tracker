import Router from "next/router";
import { withSessionSsr } from "lib/sessions";
import { withGetServerSideProps } from "lib/getServerSideProps";
import { useEffect, useState } from "react";
import useUser from "lib/useUser";

export const getServerSideProps = withSessionSsr(withGetServerSideProps);

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  userEmail: string;
}

export default function Porfolio({ data }: { data: PortfolioProps }) {
  const { authenticated, userEmail } = data;

  const handleClick = () => {
    if (!authenticated) {
      Router.push("login");
    }
  };

  if (!authenticated) {
    return (
      <div>
        <p>PortFolio Tracker</p>
        <p>Sign up now!</p>
        <button onClick={handleClick}>Create Portfolio</button>
      </div>
    );
  }

  return (
    <div>
      <h1>User authorized</h1>
      <p>Hola</p>
      <p>{userEmail}</p>
    </div>
  );
}
