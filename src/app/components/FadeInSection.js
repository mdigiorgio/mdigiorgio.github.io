'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';

/**
 * Wrap any section in <FadeInSection> to make it fade in
 * when it enters the viewport.
 */
export default function FadeInSection({ children, threshold = 0.2 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {children}
    </Box>
  );
}
