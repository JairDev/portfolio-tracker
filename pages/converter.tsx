import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import Input from "components/Input";
import SelectCoin from "components/Select";
import { Button } from "components/Button";
import useSWR from "swr";
import fetchJson from "lib/fetchJson";
import formatCurrency from "lib/formatCurrency";
import { useCryptoData } from "lib/useCryptoData";
import { CURRENCY_FIAT_DATA } from "lib/apiUrl";

export default function Converter() {
  const cryptoData = useCryptoData();
  const { data: supportedCurrencyData } = useSWR(
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  );
  const [fiatData, setfiatData] = useState<
    Array<{ fiatSymbol: string; fiatName: string }>
  >([]);
  const [currencyQuantity, setCurrencyQuantity] = useState<number>(100);
  const [cryptoName, setcryptoName] = useState<string>("bitcoin");
  const [fiatName, setFiatName] = useState<string>("USD");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [isCryptoData, setIsCryptoData] = useState<boolean>(true);
  const [isFiatData, setIsFiatData] = useState<boolean>(true);
  const [isCryptoSelect, setIsCryptoSelect] = useState<boolean>(false);
  const [isFiatSelect, setIsFiatSelect] = useState<boolean>(true);

  const { spacing } = useTheme();

  const handleChangecryptoName = (value: string) => {
    setcryptoName(value);
  };
  const handleChangeFiatName = (value: string) => {
    setFiatName(value.toLowerCase());
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyQuantity(Number(e.target.value));
  };

  const handleSwitchData = () => {
    setIsFiatData(!isFiatData);
    setIsCryptoData(!isCryptoData);
    setIsCryptoSelect(!isCryptoSelect);
    setIsFiatSelect(!isFiatSelect);
  };

  const currencySymbol = (fiatSymbolObject: any, currencySupported: any) => {
    const newObject = {};
    if (currencySupported) {
      for (const key in fiatSymbolObject) {
        for (let i = 0; i < currencySupported.length; i++) {
          const element = currencySupported[i];
          if (key === element.toUpperCase()) {
            Object.assign(newObject, { [key]: fiatSymbolObject[key] });
          }
        }
      }
    }
    // console.log(newObject);
    const result = Object.entries(newObject).map((item) => {
      return { fiatSymbol: item[0], fiatName: item[1] as string };
    });
    return result;
  };

  useEffect(() => {
    const cryptoPriceVsCurrency = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=${fiatName}`;
    async function getTotalAmount() {
      const response: any = await fetchJson(cryptoPriceVsCurrency);
      const priceFiatCurrency =
        response[cryptoName][fiatName.toLowerCase()] * currencyQuantity;
      const priceCryptoCurrency =
        currencyQuantity / response[cryptoName][fiatName.toLowerCase()];
      const price = isCryptoData
        ? formatCurrency(priceFiatCurrency, "usd")
        : priceCryptoCurrency.toFixed(8);

      setTotalAmount(price);
    }
    getTotalAmount();

    async function getFiatData() {
      const { currencies }: any = await fetchJson("/api/fiat-currency");
      const result = currencySymbol(currencies, supportedCurrencyData);
      setfiatData(result);
    }
    getFiatData();
  }, [
    cryptoName,
    fiatName,
    isCryptoData,
    currencyQuantity,
    supportedCurrencyData,
  ]);

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
          <Input
            type="number"
            onChange={handleChangeQuantity}
            value={currencyQuantity}
          />
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
            <SelectCoin
              data={isCryptoData ? cryptoData : fiatData}
              setValue={
                isCryptoData ? handleChangecryptoName : handleChangeFiatName
              }
              isFiat={isCryptoData ? false : true}
              selectValue={isCryptoData ? cryptoName : fiatName}
            />
            {isCryptoData ? "crypto" : "fiat"}
            {isCryptoData ? "cryptoselect" : "fiatselect"}
          </Box>
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <Button variant="contained" onClick={handleSwitchData}>
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
                  }}
                />
              </Box>
            </Button>
          </Box>
          <Box sx={{ flex: "0 1 45%" }}>
            <SelectCoin
              data={isFiatData ? fiatData : cryptoData}
              setValue={
                isFiatData ? handleChangeFiatName : handleChangecryptoName
              }
              isFiat={isFiatData ? true : false}
              selectValue={isFiatData ? fiatName : cryptoName}
            />
            {isFiatData ? "fiat" : "crypto"}
            {isFiatData ? "fiatselect" : "cryptoselect"}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: spacing(2),
          display: "flex",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        <Box>
          {currencyQuantity} {isCryptoData ? cryptoName : fiatName}
        </Box>
        <Box sx={{ margin: "0px 8px 0px 8px" }}>{/* ... */}=</Box>
        <Box>
          {totalAmount} {isFiatData ? fiatName : cryptoName}
        </Box>
      </Box>
    </Box>
  );
}
