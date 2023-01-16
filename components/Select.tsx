import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectCoin({ data = [], setValue, isFiat }) {
  const [coin, setCoin] = React.useState("");
  // console.log("data", data);

  const handleChange = (event: SelectChangeEvent) => {
    // console.log(event.target.value);
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
          displayEmpty
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.103)",
            borderRadius: "8px",
            // background: "#160C24",
            background: "grey",
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
              <MenuItem
                key={isFiat ? coin : coin.name}
                value={isFiat ? coin : coin.id}
              >
                {isFiat ? coin : coin.name}
                {/* {coin} */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
