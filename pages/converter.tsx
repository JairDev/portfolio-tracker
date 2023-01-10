import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import Input from "components/Input";
import SelectCoin from "components/Select";
import { Button } from "components/Button";

export default function Converter() {
  const { spacing } = useTheme();
  return (
    <Box sx={{ paddingTop: spacing(14) }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">
          Calculadora convertidora de criptomonedas
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: spacing(5),
        }}
      >
        <Box sx={{ width: "45%" }}>
          <Input type="number" />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "center",
            // height: "64px",
          }}
        >
          <Box sx={{ flex: "0 1 45%" }}>
            <SelectCoin />
          </Box>
          <Box
            sx={{
              // height: "100px",
              // border: "1px solid red",
              overflow: "hidden",
            }}
          >
            <Button variant="contained">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  height: "40px",
                  width: "40px",
                  // border: "1px solid yellow",
                }}
              >
                <ArrowRightAltIcon
                  sx={{
                    transform: "rotate(180deg)",
                    fontSize: "32px",
                    position: "absolute",
                    top: "-6px",
                  }}
                />
                <ArrowRightAltIcon
                  sx={{
                    fontSize: "32px",
                    position: "absolute",
                    top: "12px",
                    // border: "1px solid orange",
                  }}
                />
              </Box>
            </Button>
          </Box>
          <Box sx={{ flex: "0 1 45%" }}>
            <SelectCoin />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
