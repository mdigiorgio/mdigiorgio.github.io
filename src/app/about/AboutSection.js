"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { Star } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { cardStyle } from "@/styles/commonStyles";
import SectionTitle from "@/components/SectionTitle";

// Define the data array for languages outside the component for cleaner JSX
const languages = [
  { flag: "🇮🇹", name: "Italian", level: "Native" },
  { flag: "🇬🇧", name: "English", level: "Fluent" },
  { flag: "🇪🇸", name: "Spanish", level: "Fluent" },
];

function EducationCard({ logo, href, name, location, courses }) {
  return (
    <Card variant="outlined" sx={{ ...cardStyle }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Avatar src={logo} alt={name} sx={{ width: 56, height: 56 }} />
          <Box>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              variant="subtitle1"
            >
              {name}
            </Link>
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>
        </Stack>
        {courses.map((course, idx) => (
          <Stack key={idx} direction="row" spacing={1} alignItems="center">
            <Star fontSize="small" color="primary" />
            <Typography variant="body2">
              {course.title} ({course.date})
            </Typography>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}

function WorkCard({ title, bullets }) {
  return (
    <Card variant="outlined" sx={{ ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Work Experience
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        {bullets.map((b, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <FiberManualRecordIcon sx={{ fontSize: 8 }} /> {b}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

function StoryCard() {
  return (
    <Card variant="outlined" sx={{ mb: 6, ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="700">
          My Story
        </Typography>

        <Box
          component="img"
          src="/images/michele-diving.jpg"
          alt="Michele diving underwater"
          sx={{
            width: { xs: 180, md: 240 },
            height: "auto",
            borderRadius: 4,
            boxShadow: 3,
            float: "right",
            ml: 2,
            mb: 1,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.15rem" },
            textAlign: "left",
          }}
        >
          Hi, I am <strong>Michele</strong>, I am an Italian Divemaster with
          200+ dives across 7 countries.
          <br />
          <br />
          Since I was a small kid, I have always had a great feeling with the
          water. 🌊 While on holiday with my family by the seaside, I would
          spend <strong>hours and hours in the water</strong>, refusing floats
          and swimming for as long as possible.
          <br />
          <br />
          Growing up in a small Sicilian village in the Parco dei Nebrodi, while
          competitive swimming was not accssible, my innate love for the ocean
          only grew.
          <br />
          <br />
          In 2018, during a trip to Indonesia with my dear friend Angelo, we
          tried <strong>scuba diving for the first time</strong>. On our first
          dive we saw turtles, an octopus, a white-banded sea snake and vibrant
          marine life. 🐢🐙 That day we promised ourselves to get certified.
          <br />
          <br />
          Months later in Koh Tao, Thailand, we became{" "}
          <strong>Open Water Divers</strong>. A few years later, together with
          Angelo and Melania, we travelled to Ustica and earned our{" "}
          <strong>Advanced certifications</strong>. By then, I knew I wanted to
          reach a professional level.
          <br />
          <br />
          In December 2024, I returned to Koh Tao to become a{" "}
          <strong>Rescue Diver</strong>. Six months later I started my{" "}
          <strong>Divemaster internship</strong> and finally became a Pro.
          <br />
          <br />
          These experiences grew my passion for{" "}
          <strong>marine life and conservation</strong>. I am now devoted to
          guiding divers, teaching respect for the ocean, and preserving it for
          future generations.
          <br />
          <br />
          🤿 <em>Come dive with me and get inspired!</em>
        </Typography>
      </CardContent>
    </Card>
  );
}

function LanguagesCard() {
  return (
    <Card variant="outlined" sx={{ mb: 4, ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Languages
        </Typography>
        <Stack spacing={1}>
          {languages.map((lang) => (
            <Box
              key={lang.name}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography>
                <Box component="span" sx={{ fontSize: "1.2rem", mr: 1 }}>
                  {lang.flag} {lang.name} ({lang.level})
                </Box>
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function AboutSection() {
  const education = [
    {
      logo: "/logos/logo_islatortuga.jpg",
      href: "https://islatortugadivers.com",
      name: "Isla Tortuga",
      location: "Koh Tao, Thailand",
      courses: [
        { title: "Self-reliant Diver", date: "Aug 2025" },
        { title: "Divemaster", date: "Jul 2025" },
        { title: "Rescue Diver", date: "Dec 2024" },
      ],
    },
    {
      logo: "/logos/logo_sierramadre.png",
      href: "https://www.smdiversbohol.com/",
      name: "Sierra Madre Divers",
      location: "Bohol, Philippines",
      courses: [
        { title: "Deep Diver", date: "Feb 2024" },
        { title: "Nitrox Diver", date: "Feb 2024" },
      ],
    },
    {
      logo: "/logos/logo_efr.png",
      href: "https://www.australiawidefirstaid.com.au/",
      name: "Australia Wide First Aid",
      location: "Australia",
      courses: [{ title: "Emergency First Aid/EFR", date: "Dec 2023" }],
    },
    {
      logo: "/logos/logo_coral_point.jpg",
      href: "https://coralpointdiving.com",
      name: "Coral Point Diving",
      location: "Bayahibe, Dominican Republic",
      courses: [{ title: "Peak Performance Buoyancy", date: "Nov 2022" }],
    },
    {
      logo: "/logos/logo_evasioni_blu.jpg",
      href: "https://www.evasionibludiving.com",
      name: "Evasioni Blu Diving",
      location: "Ustica, Italy",
      courses: [{ title: "Advanced Open Water Diver", date: "Aug 2021" }],
    },
    {
      logo: "/logos/logo_crystal_dive.jpeg",
      href: "https://www.crystaldive.com",
      name: "Crystal Dive",
      location: "Koh Tao, Thailand",
      courses: [{ title: "Open Water Diver", date: "Jul 2018" }],
    },
  ];

  const work = [
    {
      title: "Freelance Divemaster – Koh Tao, Thailand",
      bullets: [
        "Guided recreational dives in reef, wreck, and deep settings",
        "Assisted instructors with Open Water, Advanced and Rescue courses",
        "Conducted scuba refresher/review courses for certified divers",
        "Delivered dive briefings and conducted equipment checks",
        "Performed basic equipment maintenance and customer support",
      ],
    },
  ];

  return (
    <Box id="about">
      <SectionTitle>About Me</SectionTitle>

      <Container maxWidth="lg">
        <StoryCard />

        {/* Education & Certifications */}
        <Card variant="outlined" sx={{ mb: 6, ...cardStyle }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Education & Certifications
            </Typography>
            <Masonry columns={{ xs: 1, sm: 2, md: 2 }} spacing={2}>
              {education.map((e, idx) => (
                <EducationCard key={idx} {...e} />
              ))}
            </Masonry>
          </CardContent>
        </Card>

        {/* Work + Languages Row */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box flex={1}>
            {work.map((w, idx) => (
              <WorkCard key={idx} {...w} />
            ))}
          </Box>

          <Box flex={1}>
            <LanguagesCard />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
