// src/app/reviews/ReviewsSection.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// @ts-ignore
import { supabase, getAuthOptions } from "@/lib/supabaseClient";
// @ts-ignore
import { Auth } from "@supabase/auth-ui-react";
// @ts-ignore
import { ThemeSupa } from "@supabase/auth-ui-shared";
// @ts-ignore
import { useRouter } from "next/navigation";
// @ts-ignore
import { SectionTitle } from "@/utils/index";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Define the shape of a review object for TypeScript
interface Review {
  id: string;
  inserted_at: string;
  user_id: string;
  name: string;
  avatar_url: string;
  stars: number;
  content: string;
}

const CARD_GRADIENT_START = "#e3f2fd"; // Pronounced light blue
const CARD_GRADIENT_END = "#bbdefb"; // Medium light blue end point
const BORDER_COLOR = "#4fc3f7"; // Light Blue 500

/**
 * Component to display a single review item in a nicely styled card.
 */
function ReviewItem({ review }: { review: Review }): React.ReactElement {
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
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)", // Soften shadow
        transition: "all 0.3s ease",
        position: "relative",
        zIndex: 0,
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header: Avatar, Name, and Rating */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={review.avatar_url}
          alt={review.name}
          sx={{
            width: 48,
            height: 48,
            zIndex: 2,
            border: `2px solid ${BORDER_COLOR}`, // Thematic border on avatar
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

      {/* Content */}
      <Typography
        sx={{
          mt: 2,
          whiteSpace: "pre-line",
          wordBreak: "break-word",
          color: "#000", // solid black
          lineHeight: 1.6,
        }}
      >
        {review.content}
      </Typography>
    </Box>
  );
}

/**
 * Component to display the list of reviews horizontal scroll.
 */
function ReviewsList({
  reviews,
  loading,
  error,
}: {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}): React.ReactElement {
  const sliderRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const updateButtonState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;

    // Use a small tolerance for checking the end to account for floating-point inaccuracies
    const tolerance = 2;

    // Check if we can scroll left (i.e., we are not at the very start)
    setCanScrollLeft(scrollLeft > tolerance);

    // Check if we can scroll right (i.e., scrollLeft is less than max possible scroll)
    // Max Scroll is: scrollWidth - clientWidth
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  // --- 2. Programmatic Scrolling (Buttons) ---
  const scrollToStep = (direction: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Find the width of a single item including margin
    const itemElement = slider.querySelector(".review-item-card");
    if (!itemElement) return;

    const htmlItemElement = itemElement as HTMLElement;
    const MARGIN_SIZE_PX: number = 40;
    // Item width (including its padding) + margin/gap
    const distance = htmlItemElement.offsetWidth + MARGIN_SIZE_PX;

    slider.scrollBy({
      left: distance * direction,
      behavior: "smooth",
    });
  };

  // --- 3. Effects (Mount, Scroll, and Resize) ---
  useEffect(() => {
    const slider = sliderRef.current;

    // Initial state update on mount
    // Run this inside a timeout to ensure all DOM elements are rendered and sized correctly
    const checkTimeout = setTimeout(updateButtonState, 100);

    if (slider) {
      // Attach listener for user scrolling
      slider.addEventListener("scroll", updateButtonState);
    }

    // Attach listener for window resize (as widths change)
    window.addEventListener("resize", updateButtonState);

    // Cleanup
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

  return (
    <Box sx={{ mt: 2, width: "100%", px: { xs: 2, sm: 3, md: 0 } }}>
      {error && <Typography color="error">{error}</Typography>}

      <Box sx={{ position: "relative" }}>
        {/* Navigation Buttons */}
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
            display: { xs: "none", md: "flex" }, // Hide on smallest screen
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
            display: { xs: "none", md: "flex" }, // Hide on smallest screen
            "&:hover": { bgcolor: "grey.50" },
            opacity: canScrollRight ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
          aria-label="next review"
        >
          <ChevronRightIcon />
        </IconButton>

        {/* SLIDER TRACK */}
        <Box
          ref={sliderRef}
          // Custom CSS for Scroll Snapping and overflow control
          sx={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            // Ensure padding so the first/last item isn't flush with the container edge
            px: { xs: 2, sm: 0 },
            py: 1,
            // Hide scrollbar
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

/**
 * Main component handling state, data fetching, submission, and auth.
 */
export default function ReviewsContent(): React.ReactElement {
  // Explicitly type the session state
  const [session, setSession] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stars, setStars] = useState<number | null>(5); // Rating can be null during onChange
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isClient, setIsClient] = useState<boolean>(false);

  // @ts-ignore
  const router = useRouter();

  // Function to fetch all reviews
  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("inserted_at", { ascending: false });
    if (error) setError(error.message);
    else setReviews(data || []);
    setLoading(false);
  };

  // 1. Isolated Effect to signal client-side mounting
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Effect for initial session check and state change listener
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }: { data: { session: any } }) => {
        setSession(session);
        // Scroll to the review box if already logged in
        if (session) {
          document
            .getElementById("review-box")
            ?.scrollIntoView({ behavior: "smooth" });
        }
      });

    // Setup Auth State Change Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        document
          .getElementById("review-box")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  // Effect to fetch reviews whenever the session changes (login/logout)
  useEffect(() => {
    fetchReviews();
  }, [session]);

  // Effect for real-time updates using Supabase Realtime
  useEffect(() => {
    // Only subscribe if we are on the client
    if (!isClient) return;

    const channel = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => setReviews((prev) => [payload.new as Review, ...prev]),
      )
      .subscribe();

    return () => {
      // Clean up the channel on unmount
      supabase.removeChannel(channel);
    };
  }, [isClient]); // Depend on isClient

  // Handler for submitting a new review
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session || !stars || message.trim() === "") return;

    const user = session.user;

    // 1. Insert review into the database
    const { error: insertError } = await supabase.from("reviews").insert([
      {
        user_id: user.id,
        name: user.user_metadata.full_name || user.email,
        avatar_url: user.user_metadata.avatar_url,
        stars,
        content: message,
      },
    ]);

    if (insertError) return setError(insertError.message);

    // 2. Optionally notify an external service (e.g., Slack/Discord via a Supabase Function)
    try {
      await fetch(
        "https://ztrwtqhhyaemqhvxcnwb.functions.supabase.co/notifyReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: user.user_metadata.full_name || user.email,
            content: message,
            stars: stars || 1,
          }),
        },
      );
    } catch (err) {
      console.error("notifyReview error:", err);
    }

    // 3. Reset form state (realtime subscription handles displaying the new review)
    setMessage("");
    setStars(5);
    setError(null);
  };

  // Handler for user logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Early return if not mounted on client yet, preventing hydration/layout errors
  if (!isClient) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading reviews...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* @ts-ignore */}
      <SectionTitle>What My Divers Are Saying 💬</SectionTitle>

      <ReviewsList reviews={reviews} loading={loading} error={error} />

      {/* Auth / Review Box */}
      <Box
        id="review-box"
        sx={{
          width: "100%",
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          borderLeft: "6px solid #4fc3f7",
          background: session
            ? "linear-gradient(135deg, #e1f5fe, #f0f8ff)"
            : "linear-gradient(135deg, #f9fbff, #f3f9ff)",
          transition: "all 0.3s ease",
          maxWidth: 520,
          mx: "auto",
        }}
      >
        {!session ? (
          <>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Log in to leave a review
            </Typography>
            {/* @ts-ignore */}
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              onlyThirdPartyProviders={true}
              redirectTo={getAuthOptions().redirectTo}
            />
          </>
        ) : (
          <>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={session.user.user_metadata.avatar_url}
                  alt={session.user.user_metadata.name || session.user.email}
                  sx={{ border: "2px solid #81d4fa" }}
                />
                <Typography variant="subtitle1">
                  {session.user.user_metadata.name || session.user.email}
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Stack>

            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Hi, {session.user.user_metadata.name || session.user.email}! Ready
              to leave your review?
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Rating
                  name="stars"
                  value={stars}
                  onChange={(e, newValue) => setStars(newValue || 1)}
                />
                <TextField
                  label="Leave a review"
                  multiline
                  minRows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button variant="contained" type="submit" fullWidth>
                  Submit Review
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Box>

      {/* Policy Notice */}
      <Box
        sx={{
          backgroundColor: "#fff8e1",
          border: "1px solid #ffecb3",
          borderRadius: 1,
          padding: 2,
          mx: "auto",
          maxWidth: 520,
          mt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "#8d6e63" }}>
          By submitting a review, you agree to our community guidelines.
          Non-inclusive, racist, or violent content will be removed by the
          administrator.
        </Typography>
      </Box>
    </Container>
  );
}
