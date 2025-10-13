// src/app/reviews/ReviewsSection.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Rating,
  Stack,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { Masonry } from "@mui/lab";
// Ensure these imports are correctly configured in your project
// You'll need to define 'supabase' and 'getAuthOptions' in a separate file like '@/lib/supabaseClient'
// and the 'router' needs to be provided by 'next/navigation'
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
      sx={{
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
 * Component to display the list of reviews using Masonry layout.
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

      <Masonry
        columns={{ xs: 1, sm: 2, md: 2 }}
        spacing={2}
        style={{ transition: "all 0.3s ease" }}
      >
        {reviews.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
      </Masonry>
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

  // FIX FOR RESIZE OBSERVER ERROR: State to ensure client-side rendering
  const [isClient, setIsClient] = useState(false);

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

  // 1. Isolated Effect to signal client-side mounting (most reliable fix for Masonry/ResizeObserver)
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* @ts-ignore */}
      <SectionTitle>What My Divers Are Saying 💬</SectionTitle>

      {/* This component containing Masonry is now only rendered on the client */}
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
