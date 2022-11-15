import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import Link from "next/link";

import { useFormik } from "formik";

import Input from "../components/Input";
import BoxAuth from "../components/BoxAuth/BoxAuth";
import { validationSchema } from "../schema/yup";

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
      <BoxAuth>
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
            />
            <Button type="submit">Sign up</Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography>Already have an account?</Typography>
            <Link href="login">Sign in</Link>
          </Box>
        </form>
      </BoxAuth>
    </Box>
  );
}
