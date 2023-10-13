import React, { useState } from "react";

import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";

import fetchJson from "lib/fetchJson";
import useUser from "lib/useUser";
import useSWR from "swr";
import formatCurrency from "lib/formatCurrency";
import { urlCoin } from "lib/apiUrl";

import Input from "./Input";
import SelectCoin from "./Select";
import BasicTabs from "./Tabs";

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
const INTERVAL = 60000;

function ChildModal({
  coinName,
  setOpenParent,
  setValue,
  coinData,
}: ChildModalProps) {
  const router = useRouter();
  const { userId } = useUser({});
  const { spacing, shape } = useTheme();
  const [coinAvgPrice, setCoinAvgPrice] = useState("");
  const [coinHolding, setCoinHolding] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionType, setTransactionType] = useState<string | null>(null);
  const [isSell, setIsSell] = useState(false);
  const [open, setOpen] = React.useState(false);
  let total = Number(coinAvgPrice) * Number(coinHolding);
  // console.log(coinData);

  const find = coinData?.find((coin: { id: string }) => coin.id === coinName);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenParent(false);
  };

  const handleTransactionType = (value: string) => {
    // console.log(value);
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
    // const lastPrice = 2222;
    console.log(lastPrice);

    const form = {
      name: coinNameToLowerCase,
      avgPrice: coinAvgPrice,
      holding: coinHolding,
      sell: isSell,
      lastPrice,
    };

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
                Transacción
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

export default function BasicModal({
  open,
  setOpen,
  coinData,
}: BasicModalProps) {
  const { spacing } = useTheme();
  const [value, setValue] = useState("bitcoin");
  // console.log(coinData);
  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

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
                  {
                    <SelectCoin
                      data={coinData}
                      setValue={setValue}
                      selectValue={value}
                    />
                  }
                </form>
              </Box>
            </Box>
            <ChildModal
              coinName={value}
              setOpenParent={setOpen}
              setValue={setValue}
              coinData={coinData}
            />
          </Box>
        </div>
      </Modal>
    </Box>
  );
}
