"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

// We define the uniform sizing as a flex-basis value.
// 30% allows for 3 videos per row with some spacing between them.
const FLEX_BASIS_SIZE = "30%";

export default function GallerySection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const UPLOADS_PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_UPLOADS_PLAYLIST;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${UPLOADS_PLAYLIST_ID}&key=${API_KEY}`,
        );
        const data = await res.json();

        if (data.items) {
          setVideos(data.items);
        } else {
          console.error("No videos found:", data);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [API_KEY, UPLOADS_PLAYLIST_ID]);

  return (
    <Box id="gallery">
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        Gallery 🎬
      </Typography>

      <Container maxWidth="lg">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4, // Use the 'gap' property for consistent spacing
            }}
          >
            {videos.map((video, idx) => (
              <Box
                key={idx}
                sx={{
                  // 1. Force all items to take the EXACT same width (30%)
                  flexBasis: { xs: "100%", sm: "45%", md: FLEX_BASIS_SIZE },
                  flexGrow: 0,
                  flexShrink: 0,

                  // 2. Set internal layout to vertical
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%", // Takes 100% of the calculated flex-basis width
                    // 3. Guarantee 16:9 Aspect Ratio
                    paddingBottom: "56.25%",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?rel=0`}
                    title={video.snippet.title}
                    frameBorder="0"
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
