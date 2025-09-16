'use client';

import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FadeInSection from './components/FadeInSection'; // your fade component
import ReviewsContent from './reviews/ReviewsContent.js';
import AboutSection from './about/AboutSection.js';

export default function LandingPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stories', label: 'Stories' },
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
        <section
          id="home"
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#e3f2fd',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <Typography variant="h3">Home</Typography>
          </FadeInSection>
        </section>

        <section
          id="about"
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fce4ec',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <AboutSection />
          </FadeInSection>
        </section>

        <section
          id="stories"
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff9c4',
            scrollMarginTop: '80px',
          }}
        >
          <FadeInSection>
            <Typography variant="h3">Stories</Typography>
          </FadeInSection>
        </section>

        <section
          id="reviews"
          style={{
            minHeight: '100vh', // ensure at least full viewport
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // start at the top
            background: '#c8e6c9',
            padding: '2rem',
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
