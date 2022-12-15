import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectCoin({ data = [], setValue }) {
  const [age, setAge] = React.useState("");
  // console.log("data", data);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    setValue(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="filled" fullWidth>
        {/* <InputLabel
          // id="demo-simple-select-label"
          sx={{ color: "text.primary" }}
        >
          Busca una moneda
        </InputLabel> */}
        <Select
          id="demo-simple-select"
          name="select-coin"
          value={age}
          onChange={handleChange}
          displayEmpty
          placeholder="Select"
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
          {/* <MenuItem value="">BTC</MenuItem> */}
          {/* <MenuItem value={10}>ETH</MenuItem>
          <MenuItem value={20}>DOT</MenuItem>
          <MenuItem value={30}>BNB</MenuItem> */}
          {data &&
            data.map((coin) => (
              <MenuItem key={coin.id} value={coin.name}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
