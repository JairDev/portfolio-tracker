import React, { useEffect, useState } from "react";

import Router, { useRouter } from "next/router";

import { useFormik } from "formik";

import { validationSchema } from "schema/yup";

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
import getApiCoinData from "lib/getApiCoinData";
import formatCurrency from "lib/formatCurrency";

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

interface ChildModalProps {
  coinName: string;
  setOpenParent: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface BasicModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChildModal({ coinName, setOpenParent, setValue }: ChildModalProps) {
  const urlCoin =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const { data: coinDataApi } = useSWR(urlCoin);
  const router = useRouter();
  const { userId } = useUser({});
  const { spacing, shape } = useTheme();
  const [coinAvgPrice, setCoinAvgPrice] = useState("");
  const [coinHolding, setCoinHolding] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [isSell, setIsSell] = useState(false);
  const [open, setOpen] = React.useState(false);
  let total = Number(coinAvgPrice) * Number(coinHolding);

  // console.log(coinName);

  const find = coinDataApi.find((coin) => coin.id === coinName);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenParent(false);
  };

  const handleTransactionType = (value) => {
    console.log(value);
    setTransactionType(value);
    if (value === "sell") {
      setIsSell(true);
    } else {
      setIsSell(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coinNameToLowerCase = coinName.toLowerCase();
    const lastPrice = find.current_price;
    const lastProfit = Number.parseFloat(
      (lastPrice - Number(coinAvgPrice)).toFixed(2)
    ).toString();

    const profit = Number(lastProfit) * Number(coinHolding);

    const form = {
      name: coinNameToLowerCase,
      avgPrice: coinAvgPrice,
      holding: coinHolding,
      lastProfit: profit,
      sell: isSell,
      lastPrice,
    };
    console.log("profit", lastProfit);
    // console.log("price", lastPrice);

    const res = await fetch("api/coin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    if (res.ok) {
      setSuccessMessage(result.message);
    }
    if (!res.ok) {
      setErrorMessage(result.message);
    }

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
      setOpen(false);
      setOpenParent(false);
    }, 1500);

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
    setValue("");
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{ marginTop: spacing(2) }}>
        {coinName && "Siguiente"}
      </Button>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, position: "relative" }}>
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
                {successMessage}
              </Alert>
            )}
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Transacci??n
              </Typography>
            </Box>
            <Box>
              <BasicTabs handleTransactionType={handleTransactionType} />
            </Box>
            <Box>
              <Box sx={{ marginTop: spacing(1) }}>
                <form onSubmit={handleSubmit}>
                  <Typography
                    sx={{ textTransform: "capitalize", color: "primary.main" }}
                  >
                    {coinName}
                  </Typography>
                  <Box
                    sx={{
                      display: " flex",
                      justifyContent: "space-between",
                      marginTop: spacing(4),
                    }}
                  >
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="quantity"
                        name="quantity"
                        label="Cantidad"
                        value={coinHolding}
                        placeHolder="0.00"
                        onChange={(e) => setCoinHolding(e.target.value)}
                        type="text"
                      />
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="price"
                        name="price"
                        label="Precio por moneda"
                        value={coinAvgPrice}
                        placeHolder="$20.000.00"
                        onChange={(e) => setCoinAvgPrice(e.target.value)}
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
                      <Typography>${formatCurrency(total, "usd")}</Typography>
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
                    A??adir activo
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

export default function BasicModal({ open, setOpen }: BasicModalProps) {
  const { spacing } = useTheme();
  const urlCoin =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  const { data: coinData } = useSWR(urlCoin);
  const [value, setValue] = useState("");
  const handleClose = () => {
    console.log("close basic");
    setOpen(false);
    setValue("");
  };
  useEffect(() => {});
  console.log(value);
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
            <ChildModal
              coinName={value}
              setOpenParent={setOpen}
              setValue={setValue}
            />
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
