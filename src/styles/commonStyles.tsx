// src/styles/commonStyles.tsx

import ReactMarkdown, { Components } from "react-markdown";
import { SxProps, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const cardStyle: SxProps<Theme> = {
  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f7fa 100%)",
  border: "1px solid #b2ebf2",
  borderRadius: 6,
  boxShadow: 3,
};

// Define components for ReactMarkdown to use Typography for proper styling
export const markdownComponents: Components = {
  // Top-level headers
  h2: ({ node, ...props }) => (
    <Typography
      variant="h4"
      component="h2"
      gutterBottom
      sx={{
        mt: 4,
        mb: 2,
        fontWeight: 600,
        borderBottom: "1px solid #eee",
        pb: 1,
      }}
      {...props}
    />
  ),
  // Sub-headers
  h3: ({ node, ...props }) => (
    <Typography
      variant="h5"
      component="h3"
      gutterBottom
      sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}
      {...props}
    />
  ),
  // Paragraphs
  p: ({ node, ...props }) => (
    <Typography
      variant="body1"
      component="p"
      sx={{ mb: 2, lineHeight: 1.6 }}
      {...props}
    />
  ),
  // Unordered Lists
  ul: ({ node, ...props }) => (
    <ul
      style={{
        listStyleType: "disc",
        marginLeft: "20px",
        marginBottom: "16px",
      }}
      {...props}
    />
  ),
  // List Items
  li: ({ node, ...props }) => (
    <li style={{ marginBottom: "8px" }}>
      <Typography
        variant="body1"
        component="span"
        sx={{ lineHeight: 1.6 }}
        {...props}
      />
    </li>
  ),
  // Links
  a: ({ node, ...props }) => (
    <a
      style={{ color: "#1976d2", textDecoration: "underline", fontWeight: 500 }}
      {...props}
    />
  ),
};
