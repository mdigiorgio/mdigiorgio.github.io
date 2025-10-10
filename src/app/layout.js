import "./globals.css";
import { Box } from '@mui/material';
import ThemeWrapper from "@/components/ThemeWrapper";
import Footer from '@/components/Footer';


export const metadata = {
  title: 'Michele Underwater',
  description: 'Divemaster profile and contents',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
      <body suppressHydrationWarning>
        <ThemeWrapper>
          <Box
            sx={{
              minHeight: '100vh',
              backgroundImage: 'url("/backgrounds/ocean-texture.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
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
