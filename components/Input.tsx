import { TextField } from "@mui/material";

export default function Input({ label }) {
  return (
    <TextField
      id="outlined-required"
      label={label}
      // defaultValue="jhondoe@mail.com"
      placeholder="jhondoe@mail.com"
      sx={{ width: "100%" }}
    />
  );
}
