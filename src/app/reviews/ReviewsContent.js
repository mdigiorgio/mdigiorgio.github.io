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
  Container,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { supabase, getAuthOptions } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import FadeInSection from '@/components/FadeInSection';
import { useRouter } from 'next/navigation';

function ReviewItem({ review }) {
  return (
    <FadeInSection>
      <Box
        sx={{
          p: 2.5,
          borderRadius: 2,
          background: 'linear-gradient(145deg, #e1f5fe, #f0f8ff)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 0,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
      >
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={review.avatar_url}
            alt={review.name}
            sx={{
              width: 48,
              height: 48,
              zIndex: 2,
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
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            color: '#000', // solid black
            lineHeight: 1.6,
          }}
        >
          {review.content}
        </Typography>
      </Box>
    </FadeInSection>
  );
}

function ReviewsList({ reviews, loading, error }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: '100%', px: { xs: 2, sm: 3, md: 0 } }}>
      {error && <Typography color="error">{error}</Typography>}

      <Masonry
        columns={{ xs: 1, sm: 2, md: 2 }}
        spacing={2}
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

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('inserted_at', { ascending: false });
    if (error) setError(error.message);
    else setReviews(data || []);
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        document.getElementById('review-box')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        document.getElementById('review-box')?.scrollIntoView({ behavior: 'smooth' });
      }
    });

    return () => subscription?.unsubscribe();
  }, [router]);

  useEffect(() => {
    fetchReviews();
  }, [session]);

  useEffect(() => {
    const channel = supabase
      .channel('public:reviews')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reviews' },
        (payload) => setReviews((prev) => [payload.new, ...prev])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

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

    if (insertError) return setError(insertError.message);

    try {
      await fetch('https://ztrwtqhhyaemqhvxcnwb.functions.supabase.co/notifyReview', {
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
    } catch (err) {
      console.error('notifyReview error:', err);
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
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" sx={{ mb: 6 }}>
        What people think
      </Typography>

      <ReviewsList reviews={reviews} loading={loading} error={error} />

      {/* Auth / Review Box */}
      <Box
        id="review-box"
        sx={{
          width: '100%',
          mt: 5,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          borderLeft: '6px solid #4fc3f7',
          background: session
            ? 'linear-gradient(135deg, #e1f5fe, #f0f8ff)'
            : 'linear-gradient(135deg, #f9fbff, #f3f9ff)',
          transition: 'all 0.3s ease',
          maxWidth: 520,
          mx: 'auto',
        }}
      >
        {!session ? (
          <>
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
                  sx={{ border: '2px solid #81d4fa' }}
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
              Hi, {session.user.user_metadata.name || session.user.email}! Ready to leave your review?
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
          backgroundColor: '#fff8e1',
          border: '1px solid #ffecb3',
          borderRadius: 1,
          padding: 2,
          mx: 'auto',
          maxWidth: 520,
          mt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: '#8d6e63' }}>
          By submitting a review, you agree to our community guidelines. Non-inclusive, racist, or violent
          content will be removed by the administrator.
        </Typography>
      </Box>
    </Container>
  );
}
