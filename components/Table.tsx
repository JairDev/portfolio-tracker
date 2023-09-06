import React, { useRef, useState } from "react";

import { coinId } from "lib/apiUrl";
import fetchJson from "lib/fetchJson";

import { useTheme } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Typography,
  Alert,
  AlertTitle,
  Box,
} from "@mui/material";

import { Button } from "./Button";
import TableView from "./TableView";

type ResponseSearchCoin<T> = {
  id?: string;
  name?: string;
  market_data?: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    sparkline_7d: {
      price: Array<T>;
    };
  };
  image?: {
    small: string;
  };
  market_cap_rank?: number;
  error: string;
};

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

function TableComponent<T>({ data = [] }: TablePropsArray) {
  const { spacing } = useTheme();
  const [singleCoin, setSingleCoin] = useState<Array<T>>([]);
  const loading = !data;

  const inputRef: React.RefObject<InputRef> = useRef(null);

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idCoinName = coinId(inputRef?.current?.value);
    const res: ResponseSearchCoin<T> = await fetchJson(idCoinName);
    if (res?.error) {
      setErrorMessage("Moneda no encontrada");
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 1500);
      return;
    }
    const newObj = {
      id: res?.id,
      name: res?.name,
      current_price: res?.market_data?.current_price?.usd,
      price_change_percentage_24h:
        res?.market_data?.price_change_percentage_24h,
      image: res?.image?.small,
      market_cap_rank: res?.market_cap_rank,
      sparkline_in_7d: res?.market_data?.sparkline_7d,
    };
    //@ts-ignore
    setSingleCoin((prev) => [...prev, newObj]);
  };

  const handleClick = () => {
    setSingleCoin([]);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Grid
        container
        columns={{ lg: 2 }}
        id="market"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: spacing(2),
          rowGap: spacing(1),
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "500" }}>
          Actualización del mercado
        </Typography>
        <Box sx={{ position: "relative" }}>
          {errorMessage && (
            <Alert sx={{ position: "absolute", top: "-90px" }} severity="error">
              <AlertTitle>Error</AlertTitle>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={inputRef}
              placeholder="Buscar criptomoneda"
              sx={{
                width: "100%",
                border: "1px solid rgba(255, 255, 255, 0.103)",
                borderRadius: "8px",
                background: "#160C24",
                margin: "0px",
              }}
            />
          </form>
        </Box>
      </Grid>
      {
        //@ts-ignore
        singleCoin?.length > 0 ? (
          //@ts-ignore
          <TableView data={singleCoin} />
        ) : (
          !loading && <TableView data={data} />
        )
      }
      {
        //@ts-ignore
        singleCoin?.length > 0 && (
          <Button variant="text" text="Ver top 10" onClick={handleClick} />
        )
      }
    </Box>
  );
}

export { TableComponent as Table };
