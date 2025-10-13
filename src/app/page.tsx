// src/app/page.tsx

"use client";

import React, { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { APPBAR_HEIGHT } from "@/components/NavBar";

// Sections
import AboutSection from "./about/AboutSection";
import GallerySection from "./gallery/GallerySection";
import ReviewsContent from "./reviews/ReviewsContent";

export default function LandingPage() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open: boolean = Boolean(anchorEl);

  return (
    <Box>
      {/* Sections */}
      <Box component="main">
        {/* Hero/Home stays full viewport */}
        <section
          id="home"
          style={{
            position: "relative",
            height: "100vh", // full screen hero
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src="/videos/diving.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay with your text */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.3)", // subtle overlay
              px: 2,
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              Michele Di Giorgio
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, maxWidth: 600 }}>
              Divemaster | Profile & Contents
            </Typography>
          </Box>
        </section>

        {/* About: auto height, will grow */}
        <section
          id="about"
          style={{
            padding: "2rem 0",
            scrollMarginTop: APPBAR_HEIGHT,
          }}
        >
          <AboutSection />
        </section>

        {/* Gallery: auto height */}
        <section
          id="gallery"
          style={{
            padding: "2rem 0",
            scrollMarginTop: APPBAR_HEIGHT,
          }}
        >
          <GallerySection />
        </section>

        {/* Reviews: auto height */}
        <section
          id="reviews"
          style={{
            padding: "2rem 0",
            scrollMarginTop: APPBAR_HEIGHT,
          }}
        >
          <ReviewsContent />
        </section>
      </Box>
    </Box>
  );
}
