import Router from "next/router";
import { withSessionSsr } from "../lib/sessions";
import { withGetServerSideProps } from "../lib/getServerSideProps";

export const getServerSideProps = withSessionSsr(withGetServerSideProps);

interface PortfolioProps {
  message: string;
  authenticated: boolean;
  user: {
    userId: string;
    userEmail: string;
    iat: number;
    exp: number;
  };
}

export default function Porfolio({ data }: { data: PortfolioProps }) {
  const { authenticated, user } = data;

  const handleClick = () => {
    if (!authenticated) {
      Router.push("login");
    }
  };

  if (authenticated) {
    return (
      <div>
        <h1>User authorized</h1>
        <p>Hola</p>
        <p>{user.userEmail}</p>
      </div>
    );
  }

  return (
    <div>
      <p>PortFolio Tracker</p>
      <p>Sign up now!</p>
      <button onClick={handleClick}>Create Portfolio</button>
    </div>
  );
}
