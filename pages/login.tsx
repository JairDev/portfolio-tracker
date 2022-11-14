import Input from "../components/Input";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
    // console.log(password);
    const loginUser = async () => {
      console.log(email);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await res.json();
      // console.log(result);
      // localStorage.setItem("token", result.token);
      Router.push("/portfolio");
    };
    loginUser().catch((error) => console.log(error));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box sx={{ padding: "1.5rem", minWidth: "320px" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { my: 1 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Input
              label="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button type="submit">Login</Button>

          <Typography>Forgot password?</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography>Don have an account?</Typography>
          <Link href="register">Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
}
