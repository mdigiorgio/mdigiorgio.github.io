import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Michele Di Giorgio - PADI Divemaster",
  description: "Personal website of Michele Di Giorgio, PADI Divemaster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="text-center text-gray-500 text-sm p-4">
          © 2025 Michele Di Giorgio. All rights reserved. Stories, photos and
          content may not be reused without permission.
        </footer>
      </body>
    </html>
  )
}
