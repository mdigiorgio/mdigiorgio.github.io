// src/components/ThemeWrapper.tsx

"use client";

import React from "react";
import { ThemeProvider, createTheme, CssBaseline, Theme } from "@mui/material";
import { Geist, Montserrat } from "next/font/google";

// Define Prop Interface
interface ThemeWrapperProps {
  children: React.ReactNode;
}

// Examples of nice pairings:
const headingFont = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});
const bodyFont = Geist({ subsets: ["latin"] });

// Use createTheme type assertion for strong typing
const oceanTheme: Theme = createTheme({
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
      fontSize: "3.75rem",
      "@media (max-width:600px)": {
        fontSize: "2.8rem",
      },
    },
    h3: {
      fontFamily: headingFont.style.fontFamily,
      fontSize: "3rem",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    },
    h4: { fontFamily: headingFont.style.fontFamily },
    h5: {
      fontFamily: headingFont.style.fontFamily,
      fontSize: "1.5rem",
      "@media (max-width:600px)": {
        fontSize: "1.3rem",
      },
    },
  },
});

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider theme={oceanTheme}>
      <CssBaseline /> {children}
    </ThemeProvider>
  );
}
