import Box from "@mui/material/Box";

interface BoxAuthProps {
  children: React.ReactNode;
}

export default function BoxAuth({ children }: BoxAuthProps) {
  return (
    <Box
      sx={{
        padding: "1.5rem",
        maxWidth: "400px",
        width: "100%",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
