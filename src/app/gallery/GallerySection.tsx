// src/app/gallery/GallerySection.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
// Assuming this import exists in your project structure
import { SectionTitle } from "@/utils/index";

// -------------------------------------------------
// 1. Data Interface
// -------------------------------------------------

/**
 * Interface for the minimal structure of a YouTube playlist item required
 * by this component to display the video iframe.
 */
interface YouTubeVideo {
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    }; // Add other properties here if needed later (e.g., publishedAt, description)
  };
}

// We define the uniform sizing as a flex-basis value.
// 30% allows for 3 videos per row with some spacing between them.
const FLEX_BASIS_SIZE = "30%";

export default function GallerySection(): React.ReactElement {
  // Explicitly type the state for videos
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // API keys and IDs are typically read from environment variables

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const UPLOADS_PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_UPLOADS_PLAYLIST;

  useEffect(() => {
    if (!API_KEY || !UPLOADS_PLAYLIST_ID) {
      console.error("YouTube API Key or Playlist ID is missing.");
      setLoading(false);
      return;
    }

    async function fetchVideos() {
      try {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.items) {
          // Type assertion for the fetched items
          setVideos(data.items as YouTubeVideo[]);
        } else {
          console.error("No videos found or API error:", data);
          setVideos([]); // Set to empty array on failure
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [API_KEY, UPLOADS_PLAYLIST_ID]);

  return (
    <Box id="gallery" sx={{ py: 8 }}>
            {/* @ts-ignore: Assuming SectionTitle is a valid component */}
      <SectionTitle>Gallery 🎬</SectionTitle>
      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress />
          </Box>
        ) : videos.length === 0 ? (
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ py: 6 }}
          >
                        No recent videos available. Please check the API key and
            playlist ID.          
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4, // Use the 'gap' property for consistent spacing
            }}
          >
            {videos.map((video: YouTubeVideo, idx: number) => (
              <Box
                key={idx}
                sx={{
                  // 1. Force items to take calculated width
                  flexBasis: { xs: "100%", sm: "45%", md: FLEX_BASIS_SIZE },
                  flexGrow: 0,
                  flexShrink: 0, // 2. Set internal layout to vertical

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%", // Takes 100% of the calculated flex-basis width
                    // 3. Guarantee 16:9 Aspect Ratio (56.25% height relative to width)
                    paddingBottom: "56.25%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3, // Increased shadow for better separation
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?rel=0`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
