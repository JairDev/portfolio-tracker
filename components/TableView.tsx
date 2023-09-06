import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useTheme } from "@mui/material/styles";
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
import Input from "./Input";
import { coinId } from "lib/apiUrl";
import fetchJson from "lib/fetchJson";
import { Grid, TextField, Typography } from "@mui/material";
import { Button } from "./Button";

interface CoinData {
  priceChart: unknown[];
  avgPrice: number;
  name: string;
  usd: number;
  market_cap_rank: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: string;
  _id: string;
  sparkline_in_7d: [];
}

interface TablePropsArray {
  data: Array<CoinData>;
  tableHome?: boolean;
}

type InputRef = {
  value: null;
};

function TableView({ data = [] }: TablePropsArray) {
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";
  const { spacing } = useTheme();

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
            <TableCell sx={{ borderBottom: borderStyle }} align="center">
              Cambio/24h
            </TableCell>
            <TableCell sx={{ borderBottom: borderStyle }} align="center">
              7d
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

                <TableCell
                  sx={{ borderBottom: borderStyle }}
                  component="th"
                  scope="row"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image src={coin?.image} alt="" width={40} height={40} />
                    <Box sx={{ marginLeft: spacing(1) }}>{coin?.name}</Box>
                  </Box>
                </TableCell>
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
                  align="center"
                >
                  {formatCurrency(
                    Number(coin?.price_change_percentage_24h.toFixed(2)),
                    "usd"
                  )}
                  %
                </TableCell>
                <TableCell
                  sx={{ borderBottom: borderStyle, width: "120px" }}
                  align="right"
                >
                  <Box sx={{ width: "120px" }}>
                    <LineChart
                      price7d={coin?.sparkline_in_7d}
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
  );
}

export default TableView;
