import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectCoinProps {
  data: Array<{
    id: string;
    name: string;
    fiatSymbol: string;
    fiatName: string;
    current_price: number;
  }>;
  selectValue: string;
  // setValue: React.Dispatch<React.SetStateAction<string>>;
  setValue: (value: string) => void;
  isFiat?: boolean;
}

type DataTypes = {
  name: string;
  id: string;
  fiatSymbol: string;
  fiatName: string;
};
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

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="filled" fullWidth>
        <Select
          id="demo-simple-select"
          name="select-coin"
          value={data.length > 0 ? selectValue : ""}
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
            data.map((coin: DataTypes) => (
              <MenuItem
                key={isFiat ? coin.fiatSymbol : coin.name}
                value={isFiat ? coin.fiatSymbol : coin.id}
              >
                {isFiat ? `${coin.fiatSymbol} - ${coin.fiatName}` : coin.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
