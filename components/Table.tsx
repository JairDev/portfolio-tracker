import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useUser from "lib/useUser";
import { useRouter } from "next/router";

interface CoinData {
  avgPrice: number;
  holding: number;
  name: string;
  usd: number;
  _id: string;
}

interface TablePropsArray {
  data: Array<CoinData>;
}

function TableComponent({ data = [] }: TablePropsArray) {
  console.log(data);
  const router = useRouter();
  const { userEmail } = useUser({});
  const borderStyle = "1px solid rgba(255, 255, 255, 0.05)";

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
    console.log(resultDeleteCoin);

    router.replace(router.asPath);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          background: "#11011E",
          border: borderStyle,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: borderStyle }}>Name</TableCell>
            <TableCell sx={{ borderBottom: borderStyle }}>Last Price</TableCell>
            <TableCell sx={{ borderBottom: borderStyle }} align="right">
              Avg. Price
            </TableCell>
            <TableCell sx={{ borderBottom: borderStyle }} align="right">
              Holdings
            </TableCell>
            <TableCell sx={{ borderBottom: borderStyle }} align="right">
              Amount
            </TableCell>
            <TableCell
              sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coin) => (
            <TableRow
              key={coin.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ borderBottom: borderStyle }}
                component="th"
                scope="row"
              >
                {coin.name}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }}>
                {coin.usd}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                {coin.avgPrice}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                {coin.holding}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                {coin.avgPrice * coin.holding}
              </TableCell>
              <TableCell sx={{ borderBottom: borderStyle }} align="right">
                <button onClick={(e) => handleDeleteClick(e, coin._id)}>
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { TableComponent as Table };
