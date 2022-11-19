import { createTheme } from "@mui/material/styles";
import { Theme, ThemeOptions, PaletteMode } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    bgApp: string;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    bgApp?: string;
  }
}

export const theme = createTheme({
  palette: {
    bgApp: "#5F4EA5",
  },
});
