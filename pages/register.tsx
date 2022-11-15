import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Link from "next/link";

import { useFormik } from "formik";

import * as yup from "yup";

import Input from "../components/Input";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      }}
    >
      <Box sx={{ padding: "1.5rem", maxWidth: "400px", width: "100%" }}>
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
            <Box sx={{ width: "100%" }}>
              <Input
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                type="text"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
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
            </Box>
            <Button type="submit">Sign up</Button>
          </Box>
        </form>

        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography>Already have an account?</Typography>
          <Link href="register">Sign in</Link>
        </Box>
      </Box>
    </Box>
  );
}
