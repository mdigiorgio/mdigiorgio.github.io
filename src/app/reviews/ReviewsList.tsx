"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Review {
  id: string;
  inserted_at: string;
  user_id: string;
  name: string;
  avatar_url: string;
  stars: number;
  content: string;
}

const CARD_GRADIENT_START = "#e3f2fd"; // light blue
const CARD_GRADIENT_END = "#bbdefb"; // medium blue
const BORDER_COLOR = "#4fc3f7"; // accent border blue

function ReviewItem({ review }: { review: Review }) {
  return (
    <Box
      className="review-item-card"
      sx={{
        flexShrink: 0,
        scrollSnapAlign: "start",
        width: { xs: 320, sm: 380, md: 450 },
        marginRight: { xs: 3, sm: 4, md: 5 },
        p: 2.5,
        borderRadius: 2,
        background: `linear-gradient(145deg, ${CARD_GRADIENT_START}, ${CARD_GRADIENT_END})`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={review.avatar_url}
          alt={review.name}
          sx={{
            width: 48,
            height: 48,
            border: `2px solid ${BORDER_COLOR}`,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {review.name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={review.stars} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(review.inserted_at).toLocaleDateString()}
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Typography
        sx={{
          mt: 2,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          color: "#000",
          lineHeight: 1.6,
        }}
      >
        {review.content}
      </Typography>
    </Box>
  );
}

export default function ReviewsList({
  reviews,
  loading,
  error,
}: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtonState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const tolerance = 2;

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  const scrollToStep = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const itemElement = slider.querySelector(
      ".review-item-card",
    ) as HTMLElement;
    if (!itemElement) return;

    const MARGIN_SIZE_PX = 40;
    const distance = itemElement.offsetWidth + MARGIN_SIZE_PX;

    slider.scrollBy({
      left: distance * direction,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const checkTimeout = setTimeout(updateButtonState, 100);

    if (slider) {
      slider.addEventListener("scroll", updateButtonState);
    }

    window.addEventListener("resize", updateButtonState);

    return () => {
      clearTimeout(checkTimeout);
      if (slider) slider.removeEventListener("scroll", updateButtonState);
      window.removeEventListener("resize", updateButtonState);
    };
  }, [updateButtonState]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2, width: "100%", px: { xs: 2, sm: 3, md: 0 } }}>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => scrollToStep(-1)}
          disabled={!canScrollLeft}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            bgcolor: "white",
            boxShadow: 3,
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "grey.50" },
            opacity: canScrollLeft ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
          aria-label="previous review"
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={() => scrollToStep(1)}
          disabled={!canScrollRight}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(50%, -50%)",
            zIndex: 10,
            bgcolor: "white",
            boxShadow: 3,
            display: { xs: "none", md: "flex" },
            "&:hover": { bgcolor: "grey.50" },
            opacity: canScrollRight ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
          aria-label="next review"
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Scrollable slider */}
        <Box
          ref={sliderRef}
          sx={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            px: { xs: 2, sm: 0 },
            py: 1,
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {reviews.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
