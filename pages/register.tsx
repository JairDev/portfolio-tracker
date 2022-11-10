import { useState } from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(password);
    const registerUser = async () => {
      console.log(email);
      const res = await fetch("/api/register", {
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
      console.log(result);
    };
    registerUser().catch((error) => console.log(error));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              label="Email"
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Password"
            />
          </Box>
          <Button type="submit">Sign up</Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography>Already have an account?</Typography>
          <Link href="register">Sign in</Link>
        </Box>
      </Box>
    </Box>
  );
}
