import Box from "@mui/material/Box";

export default function BoxAuth({ children }) {
  return (
    <Box sx={{ padding: "1.5rem", maxWidth: "400px", width: "100%" }}>
      {children}
    </Box>
  );
}
