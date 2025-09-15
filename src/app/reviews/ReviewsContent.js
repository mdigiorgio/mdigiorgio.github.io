'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Rating,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import Link from 'next/link';

export default function ReviewsContent() {
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');

  // Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    fetchReviews();
  }, []);

  // Fetch only approved reviews
  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('approved', true)
      .order('inserted_at', { ascending: false });
    setReviews(data || []);
  };

  // Submit a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    const user = session.user;

    await supabase.from('reviews').insert([
      {
        user_id: user.id,
        name: user.user_metadata.name || user.email,
        avatar_url: user.user_metadata.avatar_url,
        stars,
        content: message,
        approved: false, // requires manual approval
      },
    ]);

    setMessage('');
    setStars(5);
    alert('Review submitted! It will appear after approval.');
    fetchReviews();
  };

  // Show login if no session
  if (!session) {
    return (
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
        <Link href="/" style={{ color: '#0277bd' }}>← Back to Home</Link>
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          Sign in to leave a review
        </Typography>
        <Auth supabaseClient={supabase} providers={['apple', 'google', 'facebook']} />
      </Box>
    );
  }

  // Logged-in user view
  return (
    <Box sx={{ minHeight: '100vh', p: 4, maxWidth: 600, mx: 'auto' }}>
      <Link href="/" style={{ color: '#0277bd' }}>← Back to Home</Link>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Leave a Review</Typography>

      {/* Review Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Stack spacing={2}>
          <Rating
            name="stars"
            value={stars}
            onChange={(e, newValue) => setStars(newValue)}
          />
          <TextField
            label="Write your review"
            multiline
            minRows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">Submit Review</Button>
        </Stack>
      </Box>

      {/* Reviews List */}
      <Stack spacing={2}>
        {reviews.map((r) => (
          <Card key={r.id} sx={{ backgroundColor: '#e0f7fa' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                {r.avatar_url && <Avatar src={r.avatar_url} alt={r.name} />}
                <Typography variant="subtitle1">{r.name}</Typography>
                <Rating value={r.stars} readOnly />
              </Stack>
              <Typography variant="body1" sx={{ mt: 1 }}>{r.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

