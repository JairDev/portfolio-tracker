import { Box, TextField } from "@mui/material";
import { FormikTouched, FormikErrors } from "formik";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  error: any;
  helperText: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  type,
}: InputProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        id={id}
        name={name}
        label={label}
        value={value}
        placeholder="jhondoe@mail.com"
        sx={{ width: "100%" }}
        onChange={onChange}
        error={error}
        helperText={helperText}
        type={type}
      />
    </Box>
  );
}
