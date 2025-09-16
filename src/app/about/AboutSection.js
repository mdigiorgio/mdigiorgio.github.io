'use client';

import {
  Avatar,
  Box,
  Divider,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { Star } from '@mui/icons-material';

function EducationGroup({ logo, href, name, location, courses }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Avatar src={logo} alt={name} sx={{ width: 56, height: 56 }} />
        <Box>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            variant="h6"
          >
            {name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
      </Stack>
      <List dense sx={{ pl: 8 }}>
        {courses.map((course, idx) => (
          <ListItem
            key={idx}
            sx={{
              py: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Star fontSize="small" color="primary" />
            <Typography variant="body2">
              {course.title} ({course.date})
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function AboutSection() {
  return (
    <Box id="about" sx={{ py: 6, maxWidth: 900, mx: 'auto', px: 2 }}>
      <Typography variant="h3" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        PADI-certified Divemaster with 150+ dives across 7 countries.
        Strong in dive planning, safety, and guest engagement, with
        specialties in Deep, Nitrox, Self-reliant and Peak Performance Buoyancy.
        Originally trained as a software engineer, I bring a detail-oriented mindset,
        strong communication skills, and a passion for adventure and marine conservation.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box flex={1}>
          <Typography variant="h5" gutterBottom>
            Languages
          </Typography>
          <List dense>
            <ListItem>Italian (Native)</ListItem>
            <ListItem>English (Fluent)</ListItem>
            <ListItem>Spanish (Fluent)</ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" gutterBottom>
            Education & Certifications
          </Typography>

          <EducationGroup
            logo="/logos/logo_islatortuga.jpg"
            href="https://islatortugadivers.com"
            name="Isla Tortuga"
            location="Koh Tao, Thailand"
            courses={[
              { title: 'Self-reliant Diver', date: 'Aug 2025' },
              { title: 'Divemaster', date: 'Jul 2025' },
              { title: 'Rescue Diver', date: 'Dec 2024' },
            ]}
          />
          <EducationGroup
            logo="/logos/logo_sierramadre.png"
            href="https://sierramadredivers.com"
            name="https://www.smdiversbohol.com/"
            location="Bohol, Philippines"
            courses={[
              { title: 'Deep Diver', date: 'Feb 2024' },
              { title: 'Enriched Air (Nitrox) Diver', date: 'Feb 2024' },
            ]}
          />
          <EducationGroup
            logo="/logos/logo_efr.png"
            href="https://www.australiawidefirstaid.com.au/"
            name="Australia Wide First Aid"
            location="Australia"
            courses={[{ title: 'Emergency First Aid/EFR', date: 'Dec 2023' }]}
          />
          <EducationGroup
            logo="/logos/logo_coral_point.jpg"
            href="https://coralpointdiving.com"
            name="Coral Point Diving"
            location="Dominican Republic"
            courses={[{ title: 'Peak Performance Buoyancy', date: 'Nov 2022' }]}
          />
          <EducationGroup
            logo="/logos/logo_evasioni_blu.jpg"
            href="https://www.evasionibludiving.com"
            name="Evasioni Blu Diving"
            location="Italy"
            courses={[{ title: 'Advanced Open Water Diver', date: 'Aug 2021' }]}
          />
          <EducationGroup
            logo="/logos/logo_crystal_dive.jpeg"
            href="https://www.crystaldive.com"
            name="Crystal Dive"
            location="Koh Tao, Thailand"
            courses={[{ title: 'Open Water Diver', date: 'Jul 2018' }]}
          />
        </Box>

        <Box flex={1}>
          <Typography variant="h5" gutterBottom>
            Work Experience
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Freelance Divemaster, Koh Tao (THA)
          </Typography>
          <List dense>
            <ListItem>Worked as freelance Divemaster in various dive centres in Koh Tao</ListItem>
            <ListItem>Guided recreational dives in reef, wreck, and deep settings</ListItem>
            <ListItem>Conducted scuba refresher/review courses for certified divers</ListItem>
            <ListItem>Assisted instructors with Open Water, Advanced and Rescue courses</ListItem>
            <ListItem>Delivered dive briefings and conducted equipment checks</ListItem>
            <ListItem>Performed basic equipment maintenance and customer support</ListItem>
          </List>
        </Box>
      </Stack>

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
