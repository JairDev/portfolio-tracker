import { default as NextLink } from "next/link";

import ContentBox from "components/ContentInputBox";

import Box from "@mui/material/Box";
import { Button, Link, Typography, CircularProgress } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import Input from "./Input";

interface LoginViewProps {}

export default function LoginView({ formik, call }: { formik: any }) {
  const { spacing, shape } = useTheme();
  // console.log("call ->", call);
  return (
    <form onSubmit={formik.handleSubmit}>
      <ContentBox>
        <Input
          id="email"
          name="email"
          label="Correo electrónico"
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
          label="Contraseña"
          value={formik.values.password}
          placeHolder="password"
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
            height: "56px",
            padding: spacing(2, 0),
            marginTop: spacing(2),
            borderRadius: shape.borderRadius,
          }}
          type="submit"
        >
          {call ? (
            <CircularProgress sx={{ color: "#ffffff", position: "absolute" }} />
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </ContentBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: spacing(4),
        }}
      >
        <Typography>No tienes una cuenta?</Typography>

        <Link href="register" component={NextLink}>
          Regístrate
        </Link>
      </Box>
    </form>
  );
}
