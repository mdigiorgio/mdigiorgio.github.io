'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Sections
import AboutSection from './about/AboutSection.js';
import GallerySection from './gallery/GallerySection.js';
import FadeInSection from '@/components/FadeInSection'; // your fade component
import ReviewsContent from './reviews/ReviewsContent.js';

export default function LandingPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    handleClose();
  };

  return (
    <Box>
      {/* Fixed burger button with toggle */}
      <IconButton
        onClick={(e) => (open ? handleClose() : handleMenuClick(e))}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1500,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: 3,
          '&:hover': { backgroundColor: 'grey.100' },
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Menu under the button */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { mt: 1, boxShadow: 3 },
        }}
      >
        {sections.map((sec) => (
          <MenuItem key={sec.id} onClick={() => handleScroll(sec.id)}>
            {sec.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Sections */}
      <Box component="main">
        {/* Hero/Home stays full viewport */}
        <section
          id="home"
          style={{
            position: 'relative',
            height: '100vh', // full screen hero
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src="/videos/diving.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay with your text */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.3)', // subtle overlay
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
            minHeight: '100vh', // at least full viewport but can grow
            padding: '4rem 0',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <AboutSection />
          </FadeInSection>
        </section>

        {/* Gallery: auto height */}
        <section
          id="gallery"
          style={{
            minHeight: '100vh',
            padding: '4rem 0',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <GallerySection />
          </FadeInSection>
        </section>

        {/* Reviews: auto height */}
        <section
          id="reviews"
          style={{
            minHeight: '100vh', // at least full viewport
            padding: '4rem 0',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <ReviewsContent />
          </FadeInSection>
        </section>
      </Box>
    </Box>
  );
}
