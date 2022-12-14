import { SpaceBarOutlined } from "@mui/icons-material";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormHelperText } from "@mui/material";
import { InputBase } from "@mui/material";

import { FormikTouched, FormikErrors } from "formik";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  placeHolder?: string | undefined;
  error?: any;
  helperText?: any;
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
  const { spacing, palette } = useTheme();
  // const theme= useTheme();
  // console.log(palette.error.main);
  const classError = error ? "none" : "1px solid rgba(255, 255, 255, 0.103)";
  // console.log(placeHolder);
  return (
    <Box
      sx={{
        width: "100%",
        // height: "100px",
        // marginBottom: spacing(2),
      }}
    >
      <InputLabel sx={{ color: "white", marginBottom: spacing(1) }}>
        {label}
      </InputLabel>

      <TextField
        required
        id={id}
        name={name}
        value={value}
        placeholder={placeHolder}
        sx={{
          width: "100%",
          border: "1px solid rgba(255, 255, 255, 0.103)",
          borderRadius: "8px",
          background: "#160C24",
          margin: "0px",
        }}
        onChange={onChange}
        error={error}
        type={type}
      />
      <Box
        sx={{
          // border: "1px solid red",
          // height: "24px",
          color: palette.error.main,
          marginTop: spacing(1),
        }}
      >
        {error && (
          <Typography sx={{ fontSize: "12px" }}>{helperText}</Typography>
        )}
      </Box>
    </Box>
  );
}
