import React, { useState } from "react";

import Router, { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";

import Input from "./Input";
import SelectCoin from "./Select";
import BasicTabs from "./Tabs";
import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import useSWR from "swr";
import useCoin from "lib/useCoin";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#160C24",
  border: "1px solid rgba(255, 255, 255, 0.103)",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface ModalProps {}

function ChildModal({ coinName, setOpenParent }) {
  const router = useRouter();
  const { userId, userEmail, authenticated, loading, mutateUser } = useUser({});
  // const { mutateUserCoin } = useCoin();
  const { spacing, shape } = useTheme();
  const [coinAvgPrice, setCoinAvgPrice] = useState("");
  const [coinHolding, setCoinHolding] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenParent(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(" hola");
    const lower = coinName.toLowerCase();
    // console.log(lower);
    const form = {
      name: lower,
      avgPrice: coinAvgPrice,
      holding: coinHolding,
    };

    // const res = mutateUserCoin(
    //   await fetchJson("api/coin", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(form),
    //   })
    // );

    const res = await fetch("api/coin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    // console.log(res);
    // console.log(result);
    // if (res.ok) {
    //   setSuccessMessage(result.message);
    // }

    const newID = { id: result.coinId, userId: userId };
    // console.log(newID);
    await fetchJson("api/update-data-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newID),
    });
    router.replace(router.asPath);
    setOpen(false);
    setOpenParent(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{ marginTop: spacing(2) }}>
        Siguiente
      </Button>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          // sx={{ border: "1px solid red" }}
        >
          <Box sx={style}>
            {errorMessage && (
              <Alert
                sx={{ position: "absolute", top: "-70px" }}
                severity="error"
              >
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
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Transacción
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {successMessage}
              </Typography>
            </Box>
            <Box>
              <BasicTabs />
            </Box>
            <Box>
              <Box sx={{ marginTop: spacing(1) }}>
                <form onSubmit={handleSubmit}>
                  {/* <form> */}
                  {/* <SelectCoin /> */}
                  <Typography>{coinName}</Typography>
                  <Box
                    sx={{
                      display: " flex",
                      justifyContent: "space-between",
                      marginTop: spacing(4),
                    }}
                  >
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="email"
                        name="email"
                        label="Cantidad"
                        // value={formik.values.email}
                        placeHolder="0.00"
                        onChange={(e) => setCoinHolding(e.target.value)}
                        // onChange={formik.handleChange}
                        // error={formik.touched.email && Boolean(formik.errors.email)}
                        // helperText={formik.touched.email && formik.errors.email}
                        type="text"
                      />
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="password"
                        // name="Precio por moneda"
                        label="Precio por moneda"
                        // value={formik.values.password}
                        placeHolder="$20.000.00"
                        onChange={(e) => setCoinAvgPrice(e.target.value)}
                        // error={
                        //   formik.touched.password && Boolean(formik.errors.password)
                        // }
                        // helperText={formik.touched.password && formik.errors.password}
                        type="number"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.103)",
                        borderRadius: "8px",
                        background: "#160C24",
                        width: "100%",
                        padding: spacing(2),
                        marginTop: spacing(1),
                      }}
                    >
                      <Typography>Total</Typography>
                      <Typography>$20.000.000</Typography>
                    </Box>
                  </Box>

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
                    Añadir activo
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </React.Fragment>
  );
}

export default function BasicModal({ open, handleClose, setOpen }) {
  const { spacing } = useTheme();
  const urlCoin =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const { data: coinData } = useSWR(urlCoin);
  const [value, setValue] = useState("");

  // console.log(coinData);
  // console.log(value);
  return (
    <Box sx={{ position: "absolute" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Box sx={style}>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Seleccionar moneda
              </Typography>
            </Box>
            <Box>
              <Box sx={{ marginTop: spacing(1) }}>
                <form>
                  <SelectCoin data={coinData} setValue={setValue} />
                </form>
              </Box>
            </Box>
            <ChildModal coinName={value} setOpenParent={setOpen} />
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
