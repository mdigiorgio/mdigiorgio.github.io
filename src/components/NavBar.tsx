// src/components/NavBar.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Define the type for the section objects
interface Section {
  id: string;
  label: string;
}

interface INavLinks {
  id: string;
  label: string;
  path: string;
}

// Only for scroll tracking logic (must match IDs in src/app/page.tsx)
const scrollableSections: Section[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
];

// All navigation links, using absolute paths for cross-page navigation
const navLinks: INavLinks[] = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/#about" },
  { id: "gallery", label: "Gallery", path: "/#gallery" },
  { id: "reviews", label: "Reviews", path: "/#reviews" },
];

const LOGO_HEIGHT: number = 50;
export const APPBAR_HEIGHT: number = 64; // Standard MUI AppBar height for scroll offset

export const NavBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // --- SCROLL CHECKER (For highlighting active link) ---
  const checkScrollPosition = useCallback((): void => {
    // Only run scroll check on the landing page
    if (typeof window === "undefined" || window.location.pathname !== "/") {
      return;
    }

    // Scroll position + Offset (to account for fixed header)
    const scrollY: number = window.scrollY + 80;

    let newActiveSection: string | null = null;

    // Check sections from the bottom up
    for (let i = scrollableSections.length - 1; i >= 0; i--) {
      const sec: Section = scrollableSections[i];
      const element: HTMLElement | null = document.getElementById(sec.id);

      if (element) {
        if (scrollY >= element.offsetTop) {
          newActiveSection = sec.id;
          break; // Found the highest visible section, break the loop
        }
      }
    }

    if (newActiveSection) {
      setActiveSection((currentActiveSection) => {
        if (newActiveSection && newActiveSection !== currentActiveSection) {
          return newActiveSection;
        }
        return currentActiveSection; // Keep the current value
      });
    } else if (window.scrollY < APPBAR_HEIGHT) {
      // Special case: if at the very top of the page
      setActiveSection("home");
    }
  }, []);

  // --- NAVIGATION HANDLER (Handles both smooth scroll and page change) ---
  const handleNavigation = (path: string, id: string) => {
    if (typeof window === "undefined") return;

    const isSectionLink: boolean = path.startsWith("/#");
    const isOnLandingPage: boolean = window.location.pathname === "/";

    // Scenario 1: Smooth Scroll (Only allowed on the landing page for hash links)
    if (isSectionLink && isOnLandingPage) {
      const element: HTMLElement | null = document.getElementById(id);
      if (element) {
        // 1. Manually set active link immediately
        setActiveSection(id);

        // 2. Perform the smooth scroll
        const offset: number = APPBAR_HEIGHT;
        const bodyRect: number = document.body.getBoundingClientRect().top;
        const elementRect: number = element.getBoundingClientRect().top;
        const elementPosition: number = elementRect - bodyRect;
        const offsetPosition: number = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // 3. Re-run the check after a delay to ensure accurate highlighting
        setTimeout(() => {
          checkScrollPosition();
        }, 500);
      }
    } else {
      // Scenario 2: Absolute Navigation (For /terms, /privacy, or when linking to a section from a subpage)
      window.location.href = path;
    }
  };

  // --- EFFECT: Attach Scroll Event Listener ---
  useEffect(() => {
    // 1. Attach the primary scroll listener
    window.addEventListener("scroll", checkScrollPosition);

    // 2. Initial check on mount
    checkScrollPosition();

    // 3. Cleanup
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return (
    <Box>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #004d70, #0096C7, #a2d2ff)",
          boxShadow: 6,
          height: { xs: 56, sm: APPBAR_HEIGHT },
        }}
      >
        <Toolbar>
          {/* 1. Logo Element - Always navigate to the root */}
          <Box
            component="img"
            src="/images/m-mask-logo.png"
            alt="Michele's Dive Logo"
            onClick={() => handleNavigation("/", "home")}
            sx={{
              height: { xs: 42, sm: LOGO_HEIGHT },
              width: "auto",
              mr: 2,
              cursor: "pointer",
            }}
          />

          {/* 2. Navigation Links */}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {navLinks.map((item: INavLinks) => (
              <Button
                key={item.id}
                // Pass both path (for navigation) and id (for smooth scroll)
                onClick={() => handleNavigation(item.path, item.id)}
                sx={{
                  // Base styles
                  color: "#fff",
                  fontSize: { xs: "0.7rem", sm: "1.1rem" },
                  fontWeight: 600,
                  px: { xs: 1, sm: 1.5 },
                  whiteSpace: "nowrap", // Prevent wrapping on small screens

                  // Highlighting state (Only highlight for scrollable sections)
                  ...(item.id === activeSection &&
                    scrollableSections.some((s) => s.id === item.id) && {
                      fontWeight: 800,
                      borderTop: "2px solid",
                      borderBottom: "2px solid",
                    }),

                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
