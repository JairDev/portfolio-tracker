import { useState } from "react";

import { Button, Typography, Link } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useTheme } from "@mui/material/styles";

import { default as NextLink } from "next/link";

import { useFormik } from "formik";

import Input from "components/Input";
import BoxAuth from "components/BoxAuth";

import { validationSchema } from "schema/yup";
import ContentBox from "components/ContentInputBox";

export default function Register() {
  const { spacing, shape } = useTheme();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setSuccessMessage(result.message);
      } else {
        setErrorMessage(result.message);
      }
      setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 1500);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        marginTop: spacing(14),
      }}
    >
      {/* <Box
        sx={{
          background: "rgba(255, 0, 200, 0.262)",
          filter: "blur(200px)",
          position: "absolute",
          top: "-80%",
          right: 0,
          borderRadius: "50%",
          width: "60%",
          height: "100%",
        }}
      /> */}
      <Box sx={{ marginBottom: spacing(6) }}>
        <Typography variant="h1">Reg??strate</Typography>
      </Box>
      <BoxAuth>
        {errorMessage && (
          <Alert sx={{ position: "absolute", top: "-70px" }} severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert sx={{ position: "absolute", top: "-70px" }} severity="success">
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <ContentBox>
            <Input
              id="email"
              name="email"
              label="Correo electr??nico"
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
              label="Contrase??a"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
            />
            <Button
              variant="contained"
              sx={{
                color: "white",
                width: "100%",
                padding: spacing(2, 0),
                marginTop: spacing(2),
                borderRadius: shape.borderRadius,
              }}
              type="submit"
            >
              Reg??strate
            </Button>
          </ContentBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: spacing(4),
            }}
          >
            <Typography>Ya tienes una cuenta?</Typography>
            <Link href="login" component={NextLink}>
              Inicia sesi??n
            </Link>
          </Box>
        </form>
      </BoxAuth>
    </Box>
  );
}
