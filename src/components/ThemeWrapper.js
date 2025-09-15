'use client'; // <-- marks this as a client component

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Geist } from 'next/font/google';

const geistSans = Geist({ subsets: ['latin'] });

const oceanTheme = createTheme({
  palette: {
    primary: { main: '#0277bd' },
    secondary: { main: '#80deea' },
    background: { default: '#e0f7fa' },
  },
  typography: {
    fontFamily: geistSans.style.fontFamily,
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
