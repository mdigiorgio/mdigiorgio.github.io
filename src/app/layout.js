import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: 'Michele Underwater',
  description: 'Divemaster profile and contents',
  icons: {
    icon: '/tab-icon.png',
    shortcut: '/tab-icon.png',
    apple: '/tab-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <ThemeWrapper>
          {children} {/* now children includes <main> from page components */}
        </ThemeWrapper>
        <footer className="text-center text-gray-500 text-sm p-4">
          © 2025 Michele Di Giorgio. All rights reserved. Stories, photos and content may not be reused without permission.
        </footer>
      </body>
    </html>
  );
}
