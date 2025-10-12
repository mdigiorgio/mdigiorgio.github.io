"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Geist, Montserrat } from "next/font/google";

// Examples of nice pairings:
const headingFont = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
const bodyFont = Geist({ subsets: ["latin"] });

const oceanTheme = createTheme({
  palette: {
    primary: { main: "#0277bd" },
    secondary: { main: "#80deea" },
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: bodyFont.style.fontFamily,
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    h1: { fontFamily: headingFont.style.fontFamily },
    h2: {
      fontFamily: headingFont.style.fontFamily,
      fontSize: "3.75rem", // Default MUI size for h2
      "@media (max-width:600px)": {
        fontSize: "2.8rem", // Smaller size for xs screens
      },
    },
    h3: {
      fontFamily: headingFont.style.fontFamily,
      fontSize: "3rem", // Default size (sm and up)
      "@media (max-width:600px)": {
        fontSize: "2.5rem", // Smaller size for xs screens
      },
    },
    h4: { fontFamily: headingFont.style.fontFamily },
    h5: {
      fontFamily: headingFont.style.fontFamily,
      fontSize: "1.5rem", // Default MUI size for h5
      "@media (max-width:600px)": {
        fontSize: "1.3rem", // Smaller size for xs screens
      },
    },
  },
});

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider theme={oceanTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
