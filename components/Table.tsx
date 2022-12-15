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

import useUser from "lib/useUser";
import useSWR from "swr";

interface CoinData {
  avgPrice: number;
  holding: number;
  name: string;
  usd: number;
  _id: string;
}

interface TablePropsArray {
  data: Array<CoinData>;
  tableHome: boolean;
}

const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function TableComponent({ data = [], tableHome }: TablePropsArray) {
  // console.log(data);
  const { data: coinData } = useSWR(urlCoin);

  const router = useRouter();
  const { userEmail } = useUser({});
  const [profit, setProfit] = React.useState<boolean>("");
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";

  const [userData, setUserData] = useState([]);

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    coinId: string
  ) => {
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

    await fetch("api/delete-user-coin", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToSend),
    });

    const resultDeleteCoin = await resDeleteCoin.json();
    // console.log(resultDeleteCoin);

    router.replace(router.asPath);
  };

  React.useEffect(() => {}, [coinData, data]);

  return (
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
              {tableHome ? "Cambio" : "Avg Precio"}
            </TableCell>
            <TableCell sx={{ borderBottom: borderStyle }} align="right">
              {tableHome ? "Mercado" : "Holding"}
            </TableCell>
            {/* //////////////// */}
            {!tableHome && (
              <>
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
              </>
            )}
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
                  ${coin?.usd || coin?.current_price}
                </TableCell>
                <TableCell sx={{ borderBottom: borderStyle }} align="right">
                  {coin?.avgPrice || coin?.price_change_percentage_24h}
                </TableCell>
                <TableCell sx={{ borderBottom: borderStyle }} align="right">
                  {coin?.holding || coin?.high_24h}
                </TableCell>

                {!tableHome && (
                  <>
                    <TableCell sx={{ borderBottom: borderStyle }} align="right">
                      {coin?.usd * coin?.holding}
                    </TableCell>
                    <TableCell sx={{ borderBottom: borderStyle }} align="right">
                      {coin?.profitResult}
                    </TableCell>
                    <TableCell sx={{ borderBottom: borderStyle }} align="right">
                      <button onClick={(e) => handleDeleteClick(e, coin?._id)}>
                        Delete
                      </button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { TableComponent as Table };
