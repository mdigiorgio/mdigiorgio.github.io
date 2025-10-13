// src/components/SectionTitle.jsx

import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Renders a section title inside a stylish, centered "pill" container.
 * @param {object} props
 * @param {string} props.children The text content of the title (e.g., "About Me").
 */
export default function SectionTitle({ children }) {
  return (
    <Box
      sx={{
        // 1. Soft, Semi-Transparent Background
        // Use a light, subtle color, slightly transparent to blend with the page
        background: "rgba(255, 255, 255, 0.75)",

        // 2. Subtle Gradient Overlay (Optional but stylish)
        // Helps prevent a completely flat white look
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, rgba(220, 230, 240, 0.7) 100%)",

        // 3. Shape and Definition
        borderRadius: 8, // Softly rounded corners (8px if theme default is 4px)
        border: "1px solid rgba(0, 150, 199, 0.2)", // Very light blue border
        // 4. Shadow/Lift
        // Gives it a slight "floating" or "card" appearance
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        // 5. Spacing
        px: { xs: 3, sm: 4 },
        py: { xs: 1.5, sm: 2 },
        mb: 4,

        width: "fit-content",
        mx: "auto", // Center the content horizontally
      }}
    >
      <Typography variant="h4" align="center">
        {children}
      </Typography>
    </Box>
  );
}
