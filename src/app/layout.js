import "./globals.css";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata = {
  title: "Michele Underwater",
  description: "Divemaster profile and contents",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const SECTION_OFFSET = "64px";

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeWrapper>
          {/* Render the responsive NavBar */}
          <NavBar />

          {/* Spacer to prevent content overlap with fixed NavBar */}
          <Box sx={{ height: SECTION_OFFSET }} />

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
            {children} {/* now children includes <main> from page components */}
          </Box>
        </ThemeWrapper>

        <Footer />
      </body>
    </html>
  );
}
