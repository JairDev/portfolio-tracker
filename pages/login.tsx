import { useContext, useEffect, useState } from "react";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Link from "next/link";

import { useFormik } from "formik";

import Input from "../components/Input";
import BoxAuth from "../components/BoxAuth/BoxAuth";

import { validationSchema } from "../schema/yup";
import useUser from "../lib/useUser";
import fetchJson from "../lib/fetchJson";

export default function Login() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { mutateUser } = useUser({
    redirectTo: "/portfolio",
    redirectIfFound: true,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = mutateUser(
        await fetchJson("api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }),
        false
      );
      const { authenticated, message } = await res;
      if (authenticated) {
        setSuccessMessage(message);
      } else {
        setErrorMessage(message);
      }

      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 1500);
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <BoxAuth>
          {errorMessage && (
            <Alert sx={{ position: "absolute", top: "-70px" }} severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert
              sx={{ position: "absolute", top: "-70px" }}
              severity="success"
            >
              <AlertTitle>Success</AlertTitle>
              {successMessage}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                "& .MuiTextField-root": { my: 1 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                placeHolder="jhondoe@example.com"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                type="text"
              />
              <Input
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type="password"
              />
              <Button type="submit">Sign in</Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Typography>{"Don't have an account?"}</Typography>
              <Link href="register">Sign up</Link>
            </Box>
          </form>
        </BoxAuth>
      </Box>
    </>
  );
}
