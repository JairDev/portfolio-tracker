import { createTheme } from "@mui/material/styles";
import { Theme, ThemeOptions, PaletteMode } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    mainBack?: string;
    primaryButton?: string;
    cardTrendBack?: string;
    mainFontColor?: string;
    labelFontColor?: string;
    erroColor?: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    mainBack?: string;
    primaryButton?: string;
    cardTrendBack?: string;
    mainFontColor?: string;
    labelFontColor?: string;
    erroColor?: string;
  }
}

export const theme = createTheme({
  palette: {
    mainBack: "#11011E",
    primaryButton: "#0FAE96",
    cardTrendBack: "rgba(255, 255, 255, 0.02)",
    mainFontColor: "#ECF1F0",
    labelFontColor: "#B6B6B6",
    erroColor: "#EF4444",
  },
});
