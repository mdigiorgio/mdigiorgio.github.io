'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';

export default function GallerySection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const UPLOADS_PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_UPLOADS_PLAYLIST;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`
        );
        const data = await res.json();

        if (data.items) {
          setVideos(data.items);
        } else {
          console.error('No videos found:', data);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [API_KEY, UPLOADS_PLAYLIST_ID]);

  return (
    <Box id="gallery" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom>
          Gallery
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {videos.map((video, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    paddingBottom: '56.25%',
                    height: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, textAlign: 'center' }}
                >
                  {video.snippet.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
