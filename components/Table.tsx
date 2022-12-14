import React, { useState } from "react";

import { useRouter } from "next/router";
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

import useUser from "lib/useUser";
import useSWR from "swr";
import formatCurrency from "lib/formatCurrency";

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

function TableComponent({ data = [], tableHome }: TablePropsArray) {
  // console.log(data);
  const { data: coinData } = useSWR(urlCoin);

  const router = useRouter();
  const { userEmail } = useUser({});
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const priceChange24h =

  React.useEffect(() => {
    // console.log(data);
  }, [coinData, data]);

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
                ??ltimo precio
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
                    ${formatCurrency(coin?.current_price, "usd")}
                  </TableCell>
                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    {coin?.price_change_percentage_24h}
                  </TableCell>
                  <TableCell sx={{ borderBottom: borderStyle }} align="right">
                    {coin?.high_24h}
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
