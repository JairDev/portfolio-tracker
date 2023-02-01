import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import Input from "components/Input";
import SelectCoin from "components/Select";
import { Button } from "components/Button";
import useSWR from "swr";
import fetchJson from "lib/fetchJson";

const urlCoin =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const urlVs = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";

export default function Converter() {
  const { data: coinDataApi } = useSWR(urlCoin);
  const { data: coinDataVsCurrency } = useSWR(urlVs);
  const { spacing } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [coinValue, setCoinValue] = useState("bitcoin");
  const [fiatValue, setFiatValue] = useState("usd");
  const [result, setResult] = useState("");

  const handleChangeCoinValue = (value: string) => {
    setCoinValue(value);
  };
  const handleChangeFiatValue = (value: string) => {
    setFiatValue(value);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  useEffect(() => {
    const priceVsCurrency = `https://api.coingecko.com/api/v3/simple/price?ids=${coinValue}&vs_currencies=${fiatValue}`;
    async function getPrice() {
      const res = await fetchJson(priceVsCurrency);
      //@ts-ignore
      const price = res[coinValue][fiatValue] * quantity;
      //@ts-ignore
      setResult(price);
    }
    // getPrice();
  }, [coinValue, fiatValue, quantity]);

  return (
    <Box sx={{ paddingTop: spacing(14) }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">
          Calculadora convertidora de criptomonedas
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: spacing(5),
        }}
      >
        <Box sx={{ width: "45%" }}>
          <Input type="number" onChange={handleChangeQuantity} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: "0 1 45%" }}>
            <SelectCoin data={coinDataApi} setValue={handleChangeCoinValue} />
          </Box>
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <Button variant="contained">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  height: "40px",
                  width: "40px",
                }}
              >
                <ArrowRightAltIcon
                  sx={{
                    transform: "rotate(180deg)",
                    fontSize: "32px",
                    position: "absolute",
                    top: "-6px",
                  }}
                />
                <ArrowRightAltIcon
                  sx={{
                    fontSize: "32px",
                    position: "absolute",
                    top: "12px",
                    // border: "1px solid orange",
                  }}
                />
              </Box>
            </Button>
          </Box>
          <Box sx={{ flex: "0 1 45%" }}>
            <SelectCoin
              data={coinDataVsCurrency}
              setValue={handleChangeFiatValue}
              isFiat
            />
          </Box>
        </Box>
      </Box>
      <Box>
        {quantity} {coinValue} = {result} {fiatValue}
      </Box>
    </Box>
  );
}
