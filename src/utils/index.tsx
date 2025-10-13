// src/utils/index.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

// Define Props for the helper components
interface BoldTextProps {
  children: React.ReactNode;
}

interface ItalicTextProps {
  children: React.ReactNode;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

// Component for consistent section title styling across the app.
// Exported as a named export (but can be default, see export default below).
export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.75)",
        // Using the gradient background from the second version of the content
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.7) 0%, rgba(220, 230, 240, 0.7) 100%)",

        borderRadius: 8,
        border: "1px solid rgba(0, 150, 199, 0.4)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        px: { xs: 3, sm: 4 },
        py: { xs: 1.5, sm: 2 },
        mb: 4,

        width: "fit-content",
        mx: "auto",
      }}
    >
      <Typography variant="h4" align="center">
        {children}
      </Typography>
    </Box>
  );
};

// Helper component to render bold text within other Typography components
export const BoldText: React.FC<BoldTextProps> = ({ children }) => (
  <Typography component="span" sx={{ fontWeight: "bold" }}>
    {children}
  </Typography>
);

export const ItalicText: React.FC<ItalicTextProps> = ({ children }) => (
  <Typography component="span" sx={{ fontStyle: "italic" }}>
    {children}
  </Typography>
);

export const processLegalText = (
  rawMarkdown: string,
  constants: Record<string, string | number>,
): string => {
  let processedText: string = rawMarkdown.trim();

  for (const [key, value] of Object.entries(constants)) {
    // Regex to match literal ${KEY}
    const regex: RegExp = new RegExp(`\\\$\\\{${key}\\\}`, "g");
    processedText = processedText.replace(regex, String(value));
  }

  return processedText;
};
