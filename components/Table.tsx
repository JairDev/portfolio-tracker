import React, { useEffect, useState } from "react";

import Image from "next/image";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import formatCurrency from "lib/formatCurrency";
import LineChart from "./LineChart";

interface CoinData {
  avgPrice: number;
  holding: number;
  name: string;
  usd: number;
  market_cap_rank: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: string;
  high_24h: string;
  profit: number;
  amountCoin: number;
  _id: string;
}

interface TablePropsArray {
  data: Array<CoinData>;
  tableHome?: boolean;
}

const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function TableComponent({ data = [] }: TablePropsArray) {
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [priceChart, setPriceChart] = useState([]);

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
                Cambio
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                Mercado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.slice(0, 10).map((coin) => (
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
                    ${formatCurrency(coin?.current_price, "usd")}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: borderStyle,
                      color:
                        Number(coin?.price_change_percentage_24h) < 0
                          ? "error.main"
                          : "primary.main",
                    }}
                    align="right"
                  >
                    {coin?.price_change_percentage_24h}%
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: borderStyle, width: "120px" }}
                    align="right"
                  >
                    <Box sx={{ width: "120px" }}>
                      <LineChart
                        priceChartData={coin.priceChart}
                        chartValueClassName={
                          Number(coin?.price_change_percentage_24h) < 0
                            ? "#d32f2f"
                            : "#0FAE96"
                        }
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export { TableComponent as Table };
