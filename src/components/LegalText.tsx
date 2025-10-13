// src/components/LegalText.tsx

"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cardStyle, markdownComponents } from "@/styles/commonStyles";
import { SectionTitle } from "@/utils/index";
import { Container, Card, CardContent, Typography } from "@mui/material";

import {
  SITE_NAME,
  WEBSITE_URL,
  LEGAL_CONTACT_EMAIL,
  JURISDICTION,
} from "@/lib/config";

// Component interface
interface LegalTextProps {
  title: string;
  markdownText: string;
}

const processLegalText = (
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

export const LegalText: React.FC<LegalTextProps> = ({
  title,
  markdownText,
}) => {
  const currentYear: number = new Date().getFullYear();

  // Process the Markdown text using the constants, memoized for performance
  const processedMarkdown: string = useMemo(() => {
    // Prepare all constants for substitution
    const allConstants: Record<string, string | number> = {
      SITE_NAME,
      WEBSITE_URL,
      LEGAL_CONTACT_EMAIL,
      JURISDICTION,
      YEAR: currentYear,
    };

    return processLegalText(markdownText, allConstants);
  }, [currentYear, markdownText]);

  return (
    <Container sx={{ py: 6, maxWidth: "md" }}>
      <SectionTitle>{title}</SectionTitle>

      <Card variant="outlined" sx={cardStyle}>
        <CardContent>
          {/* Display the effective date separately */}
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Effective Date: October 20, {currentYear}
          </Typography>

          <ReactMarkdown
            components={markdownComponents}
            remarkPlugins={[remarkGfm]}
          >
            {processedMarkdown}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </Container>
  );
};
