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

const vsC = "https://api.apilayer.com/currency_data/list";

export default function Converter() {
  // const { data: coinDataApi } = useSWR(urlCoin);
  const coinDataApi = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image:
        "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      current_price: 28894,
      market_cap: 561604519431,
      market_cap_rank: 1,
      fully_diluted_valuation: 606335880726,
      total_volume: 7926107905,
      high_24h: 29174,
      low_24h: 28755,
      price_change_24h: -135.60531808351516,
      price_change_percentage_24h: -0.46712,
      market_cap_change_24h: -2860989048.408081,
      market_cap_change_percentage_24h: -0.50685,
      circulating_supply: 19450762,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -58.18819,
      ath_date: "2021-11-10T14:24:11.849Z",
      atl: 67.81,
      atl_change_percentage: 42473.79546,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2023-08-07T17:46:26.083Z",
    },
  ];
  // const { data: coinDataVsCurrency } = useSWR(urlVs);
  const { data: simpleVs } = useSWR(
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
  );
  // const simpleVs = {};
  const [coinDataVsCurrency, setCoinDataVsCurrency] = useState([]);
  const { spacing } = useTheme();
  const [quantity, setQuantity] = useState(100);
  const [coinValue, setCoinValue] = useState("bitcoin");
  const [fiatValue, setFiatValue] = useState("USD");
  const [result, setResult] = useState("");

  const [isCryptoData, setIsCryptoData] = useState(true);
  const [isFiatData, setIsFiatData] = useState(true);

  const [isCryptoSelect, setIsCryptoSelect] = useState(false);
  const [isFiatSelect, setIsFiatSelect] = useState(true);

  const handleChangeCoinValue = (value: string) => {
    setCoinValue(value);
  };
  const handleChangeFiatValue = (value: string) => {
    setFiatValue(value.toLowerCase());
    // console.log(value);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleSwitchData = (e) => {
    // console.log(e);
    setIsFiatData(!isFiatData);
    setIsCryptoData(!isCryptoData);
    setIsCryptoSelect(!isCryptoSelect);
    setIsFiatSelect(!isFiatSelect);
  };

  const currencySymbol = (obj, array) => {
    console.log(array);
    const newObject = {};
    for (const key in obj) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (key === element.toUpperCase()) {
          Object.assign(newObject, { [key]: obj[key] });
        }
      }
    }
    return newObject;
  };

  // {
  //   "bitcoin": {
  //     "usd": 28805
  //   }
  // }
  // res[coinValue][fiatValue] * quantity; => 1bt = 28805 usd

  // quantity / res[coinValue][fiatValue] => 100usd = 0,00347162 btc

  useEffect(() => {
    const priceVsCurrency = `https://api.coingecko.com/api/v3/simple/price?ids=${coinValue}&vs_currencies=${fiatValue}`;
    async function getPrice() {
      // const res = await fetchJson(priceVsCurrency);
      const res = {
        bitcoin: {
          usd: 29058,
        },
      };
      //@ts-ignore
      const multiply = res[coinValue][fiatValue.toLowerCase()] * quantity;
      const divide = quantity / res[coinValue][fiatValue.toLowerCase()];
      // console.log(res[coinValue][fiatValue]);
      // console.log(fiatValue);
      // console.log(multiply);
      // console.log(divide);
      const price = isCryptoData ? multiply : divide;
      console.log(price.toFixed(8));
      //@ts-ignore
      setResult(price.toFixed(8));
    }
    getPrice();

    async function vs() {
      // const res = await fetchJson(vsC, {
      //   headers: { apikey: "zuVtLmSuWMrzgIREtR8w0bARe5cpw3NN" },
      // });
      // const result = currencySymbol(res.currencies, simpleVs);
      // console.log(result);
      // setCoinDataVsCurrency(Object.entries(result));
      setCoinDataVsCurrency(
        Object.entries({
          AED: "United Arab Emirates Dirham",
          AFN: "Afghan Afghani",
          ALL: "Albanian Lek",
          AMD: "Armenian Dram",
          USD: "DOllar",
        })
      );
    }
    vs();
  }, [coinValue, fiatValue, isCryptoData, quantity, simpleVs]);

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
            value={quantity}
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
            {/* <SelectCoin data={coinDataApi} setValue={handleChangeCoinValue} /> */}
            <SelectCoin
              data={isCryptoData ? coinDataApi : coinDataVsCurrency}
              setValue={
                isCryptoData ? handleChangeCoinValue : handleChangeFiatValue
              }
              isFiat={isCryptoData ? false : true}
              selectValue={isCryptoData ? coinValue : fiatValue}
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
                    // border: "1px solid orange",
                  }}
                />
              </Box>
            </Button>
          </Box>
          <Box sx={{ flex: "0 1 45%" }}>
            {/* <SelectCoin
              data={coinDataVsCurrency}
              setValue={handleChangeFiatValue}
              isFiat={dataSelectFiat}
            /> */}
            <SelectCoin
              // data={isFiatData ? fiatData : cryptoData}
              data={isFiatData ? coinDataVsCurrency : coinDataApi}
              setValue={
                isFiatData ? handleChangeFiatValue : handleChangeCoinValue
              }
              isFiat={isFiatData ? true : false}
              selectValue={isFiatData ? fiatValue : coinValue}
            />
            {isFiatData ? "fiat" : "crypto"}
            {isFiatData ? "fiatselect" : "cryptoselect"}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // border: "1px solid red",
          marginTop: spacing(2),
          display: "flex",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        <Box>
          {quantity} {isCryptoData ? coinValue : fiatValue}
        </Box>
        <Box sx={{ margin: "0px 8px 0px 8px" }}>{/* ... */}=</Box>
        <Box>
          {result} {isFiatData ? fiatValue : coinValue}
        </Box>
      </Box>
    </Box>
  );
}
