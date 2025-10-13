// src/components/Footer.tsx

import React from "react";
import Link from "next/link";
// Import MuiLink as Link for styling, Box, Container, Grid, etc.
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#757575",
        color: "white",
      }}
    >
      <Container>
        {/* Primary Grid Container for all footer content */}
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* 1. Icon Buttons Row (First Row) */}
          <Grid container justifyContent="center">
            {/* Email Icon Item */}
            <IconButton
              aria-label="Email"
              href="mailto:micheleunderwater@gmail.com"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#cccccc",
                },
              }}
              target="_blank"
            >
              <MailOutlineIcon fontSize="large" />
            </IconButton>

            {/* Instagram Icon Item */}
            <IconButton
              aria-label="Instagram link"
              href="https://www.instagram.com/michele_airdg"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#cccccc",
                },
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Grid>

          {/* 2. Copyright and Disclaimer Row (Second Row) */}
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            © {currentYear} Michele Di Giorgio. All rights reserved.
            <br />
            Stories, photos and content may not be reused without permission.
          </Typography>

          {/* 3. Privacy and T&Cs Links Row (Third Row) */}
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            {/* Privacy Policy Link - Styled with MuiLink, Routed with Next/Link */}
            <MuiLink
              component={Link}
              href="/privacy-policy"
              color="inherit"
              underline="hover"
              sx={{
                // Add margin to the right using the MUI spacing unit (16px)
                mr: 2,
                textDecoration: "underline",
              }}
            >
              Privacy Policy
            </MuiLink>

            {/* Separator or slight spacing if needed */}

            {/* Terms & Conditions Link */}
            <MuiLink
              component={Link}
              href="/terms-and-conditions"
              color="inherit"
              underline="hover"
              sx={{
                textDecoration: "underline",
              }}
            >
              Terms & Conditions
            </MuiLink>
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
}
