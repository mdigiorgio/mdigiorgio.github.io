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
import { supabase } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import FadeInSection from '../components/FadeInSection';

// Single review card
function ReviewItem({ review }) {
  const truncatedContent =
    review.content.length > 200 && !expanded
      ? review.content.slice(0, 200) + '…'
      : review.content;

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
            <Box
              sx={{
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
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
              wordBreak: 'break-word', // keep long words inside box
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 4,
          mb: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Reviews
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Masonry
        columns={{ xs: 1, sm: 2, md: 2 }} // responsive columns
        spacing={2} // gap between items
        // animate repositioning
        defaultHeight={450}
        defaultColumns={2}
        defaultSpacing={2}
        // optional CSS to smooth flicker
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
    });

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Always fetch reviews on mount and when session changes
  useEffect(() => {
    fetchReviews();
  }, [session]);

  // Realtime subscription for new reviews
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
    <>
      {/* Auth / form */}
      {!session ? (
        <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Log in to leave a review
          </Typography>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
            onlyThirdPartyProviders={true}
          />
          <ReviewsList reviews={reviews} loading={loading} error={error} />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: '#c8e6c9',
              p: 2,
              zIndex: 1,
              boxShadow: 1,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={session.user.user_metadata.avatar_url}
                  alt={
                    session.user.user_metadata.name || session.user.email
                  }
                />
                <Typography variant="subtitle1">
                  {session.user.user_metadata.name || session.user.email}
                </Typography>
              </Stack>
              <Button variant="outlined" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>

            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Hi,{' '}
              {session.user.user_metadata.name || session.user.email}! Ready
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
                  label="Write your review"
                  multiline
                  minRows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button variant="contained" type="submit">
                  Submit Review
                </Button>
              </Stack>
            </Box>
          </Box>

          <ReviewsList reviews={reviews} loading={loading} error={error} />
        </>
      )}
      {/* Policy Notice */}
      <Box
        sx={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeeba',
          borderRadius: 1,
          padding: 2,
          mx: 'auto',
          maxWidth: 1000,
        }}
      >
        <Typography variant="body2" sx={{ color: '#856404' }}>
          By submitting a review you agree to our community guidelines.
          Non-inclusive, racist or violent content will be removed by the administrator.
        </Typography>
      </Box>

    </>
  );
}
