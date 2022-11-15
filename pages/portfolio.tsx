import { useEffect, useState } from "react";
import Router from "next/router";
import { withSessionSsr } from "../lib/sessions";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const api_server = "http://localhost:3000";
    let userSession = req?.session?.user;
    if (!userSession) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const res = await fetch(`${api_server}/api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization: `Bearer ${userSession?.token}`,
      },
    });

    const { user } = await res.json();
    return {
      props: {
        user,
      },
    };
  }
);

export default function Porfolio({ user }) {
  // const [user, setUser] = useState(null);
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   // console.log(token);
  //   if (!token) {
  //     Router.push("/login");
  //   }
  //   async function getUser() {
  //     try {
  //       const res = await fetch("/api/auth", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const result = await res.json();
  //       // console.log(result.user);
  //       setUser(result?.user?.userEmail);
  //       setAuthenticated(true);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getUser().catch((error) => console.log(error));
  // }, []);

  // if (!user) {
  //   return <div>Portfolio Auth Content</div>;
  // }

  return (
    <div>
      <h1>User authorized</h1>
      <p>Hola</p>
      <p>{user.userEmail}</p>
    </div>
  );
}
