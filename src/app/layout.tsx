// src/app/layout.tsx

import "./globals.css";
import React from "react";
import { Box } from "@mui/material";

import Footer from "@/components/Footer";
import { NavBar, APPBAR_HEIGHT } from "@/components/NavBar";
import ThemeWrapper from "@/components/ThemeWrapper";

// Define the Metadata Type (Next.js standard)
import type { Metadata } from "next";

// Define the Props Type for the Layout
interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Michele Underwater",
  description: "Divemaster profile and contents",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeWrapper>
          {/* Render the responsive NavBar */}
          <NavBar />

          {/* Landing page contents */}
          <Box
            sx={{
              minHeight: "100vh",
              backgroundImage: 'url("/backgrounds/ocean-texture.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          >
            {children}
          </Box>
        </ThemeWrapper>

        <Footer />
      </body>
    </html>
  );
}
