'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

const LOGO_HEIGHT   = 50;
const APPBAR_HEIGHT = 64; // Standard MUI AppBar height for scroll offset

export default function NavBar() {

  const [activeSection, setActiveSection] = useState('home');

  const checkScrollPosition = useCallback(() => {
      // Scroll position + Offset (to account for fixed header)
      const scrollY = window.scrollY + 80;

      let newActiveSection = null;

      // Check sections from the bottom up
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

      // Only update state if the active section has truly changed
      // This logic no longer compares against activeSection,
      // which allows it to be removed from the dependency array,
      // but still requires a proper update function to avoid stale closure issues.
      if (newActiveSection) {
         // Use the function form of state update to avoid dependency on activeSection
         setActiveSection(currentActiveSection => {
            if (newActiveSection && newActiveSection !== currentActiveSection) {
                return newActiveSection;
            }
            return currentActiveSection; // Keep the current value
         });
      } else if (window.scrollY < APPBAR_HEIGHT) {
        // Special case: if at the very top of the page
        setActiveSection('home');
      }

  }, [setActiveSection]);

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

        // 3. Re-run the check after a delay to ensure accurate highlighting
        setTimeout(() => {
            checkScrollPosition();
        }, 500);
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
  }, [checkScrollPosition]);

  return (
    <Box>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: 'linear-gradient(135deg, #004d70, #0096C7, #a2d2ff)',
          boxShadow: 6,
          height: { xs: 56, sm: APPBAR_HEIGHT }
        }}
      >
        <Toolbar>
          {/* 1. Logo Element */}
          <Box
              component="img"
              src="/images/m-mask-logo.png"
              alt="Michele's Dive Logo"
              sx={{
                  height: { xs: 42, sm: LOGO_HEIGHT },
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
                  fontSize: { xs: '0.7rem', sm: '1.1rem' },
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
