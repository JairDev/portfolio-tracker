import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

interface BoxAuthProps {
  children: React.ReactNode;
}

export default function BoxAuth({ children }: BoxAuthProps) {
  const { spacing } = useTheme();

  return (
    <Box
      sx={{
        // padding: spacing(2),

        maxWidth: "400px",
        width: "100%",
        position: "relative",
        // border: "2px solid red",
      }}
    >
      {children}
    </Box>
  );
}
