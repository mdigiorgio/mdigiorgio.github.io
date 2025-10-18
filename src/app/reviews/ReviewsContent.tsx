// src/app/reviews/ReviewsContent.tsx

"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { supabase } from "@/lib/supabaseClient";
// @ts-ignore
import { SectionTitle } from "@/utils/index";
import ReviewsList from "./ReviewsList";

interface Review {
  id: string;
  inserted_at: string;
  user_id: string;
  name: string;
  avatar_url: string;
  stars: number;
  content: string;
}

export default function ReviewsContent(): React.ReactElement {
  const router = useRouter();
  const { user, isLoading: authLoading } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stars, setStars] = useState<number | null>(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Scroll to #reviews if returning from login/logout ---
  useEffect(() => {
    if (window.location.hash === "#reviews") {
      const el = document.querySelector("#reviews");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // --- Fetch reviews from Supabase ---
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (error) setError(error.message);
    else setReviews(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // --- Realtime subscription for new reviews ---
  useEffect(() => {
    const channel = supabase
      .channel("public:reviews")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => {
          setReviews((prev) => [payload.new as Review, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Submit new review ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit a review.");
      return;
    }
    if (!stars || !message.trim()) {
      setError("Please select a rating and write your message.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from("reviews").insert([
      {
        user_id: user.sub,
        name: user.name || user.email,
        avatar_url: user.picture,
        stars,
        content: message,
      },
    ]);

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setMessage("");
    setStars(5);
    setLoading(false);
  };

  // --- Auth redirect helpers ---
  const handleLogin = () => {
    const returnTo = encodeURIComponent("/#reviews");
    router.push(`/api/auth/login?returnTo=${returnTo}`);
  };

  const handleLogout = () => {
    const returnTo = encodeURIComponent("/#reviews");
    router.push(`/api/auth/logout?returnTo=${returnTo}`);
  };

  return (
    <Container maxWidth="lg">
      <SectionTitle>What My Divers Are Saying 💬</SectionTitle>

      {/* Reviews List */}
      <ReviewsList reviews={reviews} loading={loading} error={error} />

      {/* Show global error if present */}
      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}

      {/* Review Submission Box */}
      <Box
        id="review-box"
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          borderLeft: "6px solid #4fc3f7",
          background: "#f0f8ff",
          maxWidth: 520,
          mx: "auto",
        }}
      >
        {authLoading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        ) : !user ? (
          <>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Log in to leave a review
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Log in
              </Button>
            </Box>
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
                <Avatar src={user.picture || ""} />
                <Typography variant="subtitle1">
                  {user.name || user.email}
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
              Hi {user.name || user.email}, ready to leave your review?
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Rating
                  name="stars"
                  value={stars}
                  onChange={(_, newValue) => setStars(newValue || 1)}
                />
                <TextField
                  label="Leave a review"
                  multiline
                  minRows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Review"}
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
          Non-inclusive, racist, or violent content will be removed.
        </Typography>
      </Box>
    </Container>
  );
}
