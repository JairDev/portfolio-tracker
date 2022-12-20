import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectCoin({ data = [], setValue }) {
  const [coin, setCoin] = React.useState("Bitcoin");
  // console.log("data", data);
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
          value={coin}
          onChange={handleChange}
          // displayEmpty
          // placeholder="Select"
          // label="Outlined"

          // defaultValue={coin}
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
            data.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
