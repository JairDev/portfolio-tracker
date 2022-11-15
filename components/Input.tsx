import { TextField } from "@mui/material";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
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
  );
}
