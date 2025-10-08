'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Navigation items
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
];

export default function NavBar() {
  const theme = useTheme();
  // Determine if the screen is desktop (use the sm breakpoint)
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle smooth scrolling with an offset for the fixed bar
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
        // Use a consistent offset for the fixed top bar (approx. 64px)
        const offset = 64;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    // Close the menu after navigation (only needed for mobile Menu)
    handleClose();
  };

  // Case 1) Desktop fixed Sidebar
  const DesktopTopBar = (
    <AppBar
      component="nav"
      position="fixed"
      sx={{
        background: 'linear-gradient(135deg, #004d70, #0096C7, #a2d2ff)',
        boxShadow: 6,
      }}
    >
      <Toolbar>
        {/* 1. Logo Element - Scaled and Positioned */}
        <Box
            component="img"
            src="/images/m-mask-logo.png"
            alt="Michele's Dive Logo"
            sx={{
                height: 50,
                width: 'auto',
                mr: 2,
            }}
        />

        {/* Navigation Links */}
        <Box sx={{ display: 'flex' }}>
          {sections.map((sec) => (
            <Button
              key={sec.id}
              onClick={() => handleScroll(sec.id)}
              sx={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
              }}
            >
              {sec.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );

  const MobileBurgerMenu = (
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
    </Box>
  );

  return (
    <Box>
      {isDesktop ? DesktopTopBar : MobileBurgerMenu}
    </Box>
  );
}
