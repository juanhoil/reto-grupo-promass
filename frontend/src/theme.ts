import { createTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
interface Palette {
  main: string;
  light?: string;
  dark?: string;
  contrastText?: string;
}
interface PaletteExtensions {
  sidebar: Palette;
  backgroundColor: Palette;
}
declare module "@mui/material/styles" {
  interface Palette extends PaletteExtensions {}
  interface PaletteOptions extends PaletteExtensions {}
}

export const theme = createTheme(
  {
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    palette: {
      primary: {
        light: "#0ea5e9",
        main: "#0284c7",
        dark: "#075985",
        contrastText: "#fff",
        "300": "#afe3fa",
      },
      sidebar: {
        main: "#e3e3e3",
        dark: "#bdbdbd",
        light: "#d6d6d6",
      },
      backgroundColor: { main: "#fafafa", dark: "#f2f2f3" },
      text: {
        primary: "#636363",
        secondary: "#b0b0b0",
      },
    },
    typography: {
      allVariants: {
        color: "#232626",
      },
    },
  },
  esES
);
