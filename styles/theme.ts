import { createTheme } from "@mui/system";
import { Theme, ThemeOptions, PaletteMode } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Theme {
    bodyBg: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    bodyBg?: string;
  }
}

// declare module "@mui/material/styles" {
//   interface Theme {
//     bodyBg: string;
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     bodyBg?: string;
//   }
// }

export const theme = createTheme({
  palette: {
    primary: "#5F4EA5",
    secondary: "#5F4EA5",
  },
});
