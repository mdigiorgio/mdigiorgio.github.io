'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';

// Navigation items
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'reviews', label: 'Reviews' },
];

const LOGO_HEIGHT   = 50;
const APPBAR_HEIGHT = 64; // Standard MUI AppBar height for scroll offset

export default function NavBar() {

  const [activeSection, setActiveSection] = useState('home');

  // Ref to store positions of all sections (offsetTop, height)
  const sectionRefs = React.useRef({});

  // --- SCROLL LOGIC ---
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
        // 1. Manually set active link immediately
        setActiveSection(id);

        // 2. Perform the smooth scroll
        const offset = APPBAR_HEIGHT;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // 3. (Optional) Re-trigger the scroll check after a delay
        // to ensure accurate highlighting once scrolling is finished
        setTimeout(() => {
            // Re-runs the check manually
            checkScrollPosition();
        }, 500);
    }
  };

  const checkScrollPosition = () => {
      // Scroll position + Offset (to account for fixed header)
      // The +80 is a safe margin, matching your scroll-margin-top
      const scrollY = window.scrollY + 80;

      let newActiveSection = null;

      // Check sections from the bottom up (or top down, as long as it's consistent)
      // Iterating through all sections to find which one is currently at the top of the viewport
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        const element = document.getElementById(sec.id);

        if (element) {
          // If the scroll position is past the top of this section
          if (scrollY >= element.offsetTop) {
            newActiveSection = sec.id;
            break; // Found the highest visible section, break the loop
          }
        }
      }

      // If no section is found, it must be the home section (at the very top)
      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      } else if (!newActiveSection && window.scrollY < APPBAR_HEIGHT) {
        // Special case: if at the very top of the page
        setActiveSection('home');
      }
  };

  // --- EFFECT: Attach Scroll Event Listener ---
  useEffect(() => {
    // 1. Attach the primary scroll listener
    window.addEventListener('scroll', checkScrollPosition);

    // 2. Initial check on mount
    checkScrollPosition();

    // 3. Cleanup
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [activeSection]); // Depend on activeSection to ensure function has current state

  // --- RENDER ---
  return (
    <Box>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, #004d70, #0096C7, #a2d2ff)',
          boxShadow: 6,
        }}
      >
        <Toolbar>
          {/* 1. Logo Element */}
          <Box
              component="img"
              src="/images/m-mask-logo.png"
              alt="Michele's Dive Logo"
              sx={{
                  height: LOGO_HEIGHT,
                  width: 'auto',
                  mr: 2,
              }}
          />

          {/* 2. Navigation Links */}
          <Box sx={{ display: 'flex' }}>
            {sections.map((sec) => (
              <Button
                key={sec.id}
                onClick={() => handleScroll(sec.id)}
                sx={{
                  // Base styles
                  color: '#fff',
                  fontSize: { xs: '0.75rem', sm: '1.1rem' },
                  fontWeight: 600,
                  px: { xs: 1, sm: 1.5 },

                  // Highlighting state
                  ...(sec.id === activeSection && {
                    fontWeight: 800,
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                  }),

                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
                }}
              >
                {sec.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
