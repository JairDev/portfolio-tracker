import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectCoinProps {
  data: Array<{ id: string; name: string }>;
  // setValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: (value: string) => void;
  isFiat?: boolean;
}
//@ts-ignore
export default function SelectCoin({
  data = [],
  setValue,
  isFiat,
  selectValue,
}: SelectCoinProps) {
  const [coin, setCoin] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
    setValue(event.target.value as string);
  };
  // useEffect(() => {
  //   setCoin("");
  // }, [isFiat]);

  // console.log(data);
  // console.log(coin);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="filled" fullWidth>
        <Select
          id="demo-simple-select"
          name="select-coin"
          value={selectValue}
          onChange={handleChange}
          displayEmpty
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.103)",
            borderRadius: "8px",
            background: "#160C24",
            "&  > div": {
              padding: "16px",
            },
            svg: {
              color: "white",
            },
          }}
        >
          {data &&
            isFiat &&
            data.map((coin) => (
              //@ts-ignore
              <MenuItem key={coin} value={coin[0]}>
                {coin[0]} - {coin[1]}
              </MenuItem>
            ))}

          {data &&
            data.map((coin: { name: string; id: string }) => (
              <MenuItem key={coin.name} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
