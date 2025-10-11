import React from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#757575",
        color: "white",
        py: 4,
        borderTop: "1px solid #9e9e9e",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {/* Email Icon Item */}
            <Grid item>
              <IconButton
                aria-label="Email"
                href="mailto:micheleunderwater@gmail.com"
                sx={{
                  color: "inherit",
                  "&:hover": { color: "primary.light" },
                }}
                target="_blank"
              >
                <MailOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>

            {/* Instagram Icon Item */}
            <Grid item>
              <IconButton
                aria-label="Instagram link"
                href="https://www.instagram.com/michele_airdg"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#E1306C",
                }}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} Michele Di Giorgio. All rights
            reserved.
            <br />
            Stories, photos and content may not be reused without permission.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
