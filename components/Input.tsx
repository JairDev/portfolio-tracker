import { Box, TextField } from "@mui/material";
import { FormikTouched, FormikErrors } from "formik";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  placeHolder?: string | undefined;
  error: any;
  helperText: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  name,
  label,
  value,
  placeHolder,
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
        placeholder={placeHolder}
        sx={{ width: "100%" }}
        onChange={onChange}
        error={error}
        helperText={helperText}
        type={type}
      />
    </Box>
  );
}
