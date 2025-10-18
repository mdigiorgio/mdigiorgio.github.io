// src/app/layout.tsx

import "./globals.css";
import React from "react";
import { Box } from "@mui/material";

import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import ThemeWrapper from "@/components/ThemeWrapper";
import { UserProvider } from "@auth0/nextjs-auth0/client"; // Works in Next.js 13-15 App Router

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michele Underwater",
  description: "Divemaster profile and contents",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <UserProvider>
          <ThemeWrapper>
            <NavBar />
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
            <Footer />
          </ThemeWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
