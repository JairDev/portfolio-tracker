import { createTheme, responsiveFontSizes } from "@mui/material/styles";
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
    errorColor?: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    mainBack?: string;
    primaryButton?: string;
    cardTrendBack?: string;
    mainFontColor?: string;
    labelFontColor?: string;
    errorColor?: string;
  }
}

export let theme = createTheme({
  palette: {
    // mainBack: "#11011E",
    // primaryButton: "#0FAE96",
    // cardTrendBack: "rgba(255, 255, 255, 0.02)",
    // mainFontColor: "#ECF1F0",
    // labelFontColor: "#B6B6B6",
    // errorColor: "#EF4444",
    primary: {
      main: "#0FAE96",
    },
    secondary: {
      main: "#EF4444",
    },
    background: {
      paper: "#11011E",
    },
    text: {
      primary: "#ECF1F0",
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 18,
    },
  },
});

theme = responsiveFontSizes(theme);
