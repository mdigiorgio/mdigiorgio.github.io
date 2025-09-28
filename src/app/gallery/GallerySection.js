import Link from 'next/link'

import {
  Box,
  Container,
  Typography
} from '@mui/material';

export default function GallerySection() {
  return (
    <Box sx={{ py: 0 }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          Gallery
        </Typography>
      </Container>
    </Box>
  )
}
