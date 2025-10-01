'use client';

import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { supabase, getAuthOptions } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import FadeInSection from '@/components/FadeInSection';
import { useRouter } from 'next/navigation';

// Single review card
function ReviewItem({ review }) {
  return (
    <Box sx={{ width: '100%' }}>
      <FadeInSection>
        <Box
          sx={{
            border: '1px solid #e0e0e0',
            p: 2,
            borderRadius: 2,
            backgroundColor: 'white',
            boxShadow: 1,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={review.avatar_url}
              alt={review.name}
              sx={{ width: 48, height: 48 }}
            />
            <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
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
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
            }}
          >
            {review.content}
          </Typography>
        </Box>
      </FadeInSection>
    </Box>
  );
}

// List of reviews
function ReviewsList({ reviews, loading, error }) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      {error && <Typography color="error">{error}</Typography>}
      <Masonry
        columns={{ xs: 1, sm: 2, md: 2 }}
        spacing={2}
        defaultHeight={450}
        defaultColumns={2}
        defaultSpacing={2}
        style={{ transition: 'all 0.3s ease' }}
      >
        {reviews.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
      </Masonry>
    </Box>
  );
}

export default function ReviewsContent() {
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      setError(error.message);
      setReviews([]);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

    // Session + auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      // If just logged in, scroll to the review form
      if (session) {
        const section = document.getElementById('review-box');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push('/#review-box'); // fallback
        }
      }
    });

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (session) {
          const section = document.getElementById('review-box');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          } else {
            router.push('/#reviews');
          }
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [router]);

  useEffect(() => {
    fetchReviews();
  }, [session]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('public:reviews')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reviews' },
        (payload) => {
          setReviews((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    const user = session.user;

    const { error: insertError } = await supabase.from('reviews').insert([
      {
        user_id: user.id,
        name: user.user_metadata.full_name || user.email,
        avatar_url: user.user_metadata.avatar_url,
        stars,
        content: message,
      },
    ]);

    if (insertError) {
      console.error('Error inserting review:', insertError);
      setError(insertError.message);
      return;
    }

    // Trigger Edge Function to notify admin of new review
    try {
      const notifyUrl =
        'https://ztrwtqhhyaemqhvxcnwb.functions.supabase.co/notifyReview';

      const notifyRes = await fetch(notifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: user.user_metadata.full_name || user.email,
          content: message,
          stars: stars || 1,
        }),
      });

      if (!notifyRes.ok) {
        const errBody = await notifyRes.text();
        console.error('notifyReview error:', notifyRes.status, errBody);
      }
    } catch (err) {
      console.error('Error calling notifyReview:', err);
    }

    setMessage('');
    setStars(5);
    fetchReviews();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h3" align="center">
        What people think
      </Typography>
      <ReviewsList reviews={reviews} loading={loading} error={error} />

      {/* Auth / form */}
      {!session ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            mt: 4,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: 1,
            p: 3,
            backgroundColor: '#f9f9ff', // 👈 light bluish background
          }}
        >
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Log in to leave a review
          </Typography>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            onlyThirdPartyProviders={true}
            redirectTo={getAuthOptions().redirectTo}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            mt: 4,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            boxShadow: 1,
            p: 3,
            backgroundColor: '#f0f8ff', // 👈 slightly different background
          }}
        >
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
              />
              <Typography variant="subtitle1">
                {session.user.user_metadata.name || session.user.email}
              </Typography>
            </Stack>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Hi, {session.user.user_metadata.name || session.user.email}! Ready
            to leave your review?
          </Typography>

          <Box id="review-box" component="form" onSubmit={handleSubmit}>
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
        </Box>
      )}

      {/* Policy Notice */}
      <Box
        sx={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
          borderRadius: 1,
          padding: 2,
          mx: 'auto',
          maxWidth: 500,
          mt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: '#856404' }}>
          By submitting a review you agree to our community guidelines.
          Non-inclusive, racist or violent content will be removed by the
          administrator.
        </Typography>
      </Box>
    </Box>
  );
}
