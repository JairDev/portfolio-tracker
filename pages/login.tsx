import { useState } from "react";

import { validationSchema } from "schema/yup";

import { useFormik } from "formik";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useTheme } from "@mui/material/styles";

import useUser from "lib/useUser";
import fetchJson from "lib/fetchJson";

import BoxAuth from "components/BoxAuth";
import LoginView from "components/LoginView";

export default function Login() {
  const { spacing } = useTheme();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [startLogin, setStartLogin] = useState(false);
  const { mutateUser, loading } = useUser({
    redirectTo: "/portfolio",
    redirectIfFound: true,
    initLogIn: startLogin,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setStartLogin(true);
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
      // console.log(authenticated);

      if (authenticated) {
        setStartLogin(false);
        setSuccessMessage(message);
      } else {
        setStartLogin(false);
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
          marginTop: spacing(14),
          position: "relative",
        }}
      >
        <Box sx={{ marginBottom: spacing(6) }}>
          <Typography variant="h1">Iniciar Sesión</Typography>
        </Box>
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
          <LoginView formik={formik} startLogin={startLogin} />
        </BoxAuth>
      </Box>
    </>
  );
}
