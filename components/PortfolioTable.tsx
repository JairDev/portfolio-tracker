import React, { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import useSWR from "swr";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import useUser from "lib/useUser";
import formatCurrency from "lib/formatCurrency";

import { Button } from "./Button";
import { urlCoin } from "lib/apiUrl";
interface CoinsLastPrice {
  _id: string;
  market_cap_rank: string;
  image: string;
  name: string;
  current_price: number;
  totalAmount: number;
  profit: number;
  avgPrice: number;
  holding: number;
  usd: number;
}

interface TablePropsArray {
  data: Array<CoinsLastPrice>;
}

export default function PortfolioTable({ data = [] }: TablePropsArray) {
  const router = useRouter();
  const { userEmail } = useUser({});
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDeleteClick = async (e, coinId: string) => {
    const objectToSend = {
      id: coinId,
      userEmail,
    };
    const resDeleteCoin = await fetch("api/delete-coin", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSend),
    });
    console.log(resDeleteCoin);

    await fetch("api/delete-user-coin", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSend),
    });

    const resultDeleteCoin = await resDeleteCoin.json();
    console.log(resultDeleteCoin);
    if (resDeleteCoin.ok) {
      setSuccessMessage(resultDeleteCoin.message);
    }
    if (!resDeleteCoin.ok) {
      setErrorMessage(resultDeleteCoin.message);
    }
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 1500);

    router.replace(router.asPath);
  };

  // React.useEffect(() => {
  //   // console.log(data);
  // }, [coinData, data]);

  return (
    <Box sx={{ position: "relative " }}>
      {errorMessage && (
        <Alert sx={{ position: "absolute", top: "-70px" }} severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert sx={{ position: "absolute", top: "-70px" }} severity="success">
          {/* <AlertTitle>Success</AlertTitle> */}
          {successMessage}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            background: "rgba(255, 255, 255, 0.02)",
            border: borderStyle,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: borderStyle }}>Rank</TableCell>
              <TableCell sx={{ borderBottom: borderStyle }}>Nombre</TableCell>
              <TableCell sx={{ borderBottom: borderStyle }}>
                Último precio
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                {"Avg Precio"}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                {"Holding"}
              </TableCell>
              {/* //////////////// */}

              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                Monto
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                Profit/Loss
              </TableCell>
              <TableCell
                sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data ? (
              <div>Cargando</div>
            ) : (
              data.map((coin) => (
                <TableRow
                  key={coin?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ borderBottom: borderStyle }}
                    component="th"
                    scope="row"
                  >
                    {coin?.market_cap_rank}
                  </TableCell>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TableCell
                      sx={{ borderBottom: borderStyle }}
                      component="th"
                      scope="row"
                    >
                      <Image src={coin?.image} alt="" width={40} height={40} />
                    </TableCell>
                    {coin?.name}
                  </Box>
                  <TableCell sx={{ borderBottom: borderStyle }}>
                    $
                    {coin?.usd
                      ? formatCurrency(coin?.usd, "usd")
                      : formatCurrency(coin?.current_price, "usd")}
                  </TableCell>
                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    {coin?.avgPrice}
                  </TableCell>
                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    {coin?.holding}
                  </TableCell>

                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    {formatCurrency(coin?.totalAmount, "usd")}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: borderStyle,
                      color: `${
                        coin?.profit < 0 ? "error.main" : "success.light"
                      }`,
                    }}
                    align="right"
                  >
                    ${formatCurrency(coin?.profit, "usd")}
                  </TableCell>
                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    <Button
                      size="small"
                      onClick={(e) => handleDeleteClick(e, coin?._id)}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
