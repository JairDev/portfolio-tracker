import { TextField } from "@mui/material";

interface InputProps {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, type, onChange }: InputProps) {
  return (
    <TextField
      label={label}
      placeholder="jhondoe@mail.com"
      sx={{ width: "100%" }}
      onChange={onChange}
      type={type}
    />
  );
}
