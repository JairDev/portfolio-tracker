import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import Input from "../components/Input";

export default function Login() {
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
          sx={{
            "& .MuiTextField-root": { my: 1 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Input label="Email" />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Input label="Password" />
          </Box>
          <Button>Login</Button>

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
