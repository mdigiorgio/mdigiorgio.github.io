// src/app/about/AboutSection.tsx

"use client";

import React, { useState, useEffect } from "react"; // Added useState, useEffect
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Link,
  Stack,
  Typography,
  CircularProgress, // Added CircularProgress
} from "@mui/material";
// @ts-ignore: Masonry component from @mui/lab typically doesn't need explicit type imports
import { Masonry } from "@mui/lab";
import { Star } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// Assuming these imports exist in your project structure
// @ts-ignore
import { cardStyle } from "@/styles/commonStyles";
// @ts-ignore
import { BoldText, ItalicText, SectionTitle } from "@/utils/index";

// -------------------------------------------------
// 1. Data Interfaces
// -------------------------------------------------

interface Language {
  flag: string;
  name: string;
  level: string;
}

interface Course {
  title: string;
  date: string;
}

interface EducationItem {
  logo: string;
  href: string;
  name: string;
  location: string;
  courses: Course[];
}

interface WorkItem {
  title: string;
  bullets: string[];
}

// -------------------------------------------------
// 2. Data Definitions (Typed)
// -------------------------------------------------

const languages: Language[] = [
  { flag: "🇮🇹", name: "Italian", level: "Native" },
  { flag: "🇬🇧", name: "English", level: "Fluent" },
  { flag: "🇪🇸", name: "Spanish", level: "Fluent" },
];

// -------------------------------------------------
// 3. Components (Typed)
// -------------------------------------------------

type EducationCardProps = EducationItem;

const EducationCard: React.FC<EducationCardProps> = ({
  logo,
  href,
  name,
  location,
  courses,
}) => {
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
        {courses.map((course: Course, idx: number) => (
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
};

type WorkCardProps = WorkItem;

const WorkCard: React.FC<WorkCardProps> = ({ title, bullets }) => {
  return (
    <Card variant="outlined" sx={{ ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Work Experience
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        {bullets.map((b: string, idx: number) => (
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
};

const StoryCard: React.FC = () => {
  return (
    <Card variant="outlined" sx={{ mb: 4, ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="700">
          My Story
        </Typography>

        {/* NOTE: In a real-world TS environment, you might need NgOptimizedImage
            or similar for image optimization, but we'll leave it as a Box for now. */}
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
          Hi, I am <BoldText>Michele</BoldText>, I am an Italian Divemaster with
          200+ dives across 7 countries.
          <br />
          <br />
          Since I was a small kid, I have always had a great feeling with the
          water. 🌊 While on holiday with my family by the seaside, I would
          spend <BoldText>hours and hours in the water</BoldText>, refusing
          floats and swimming for as long as possible.
          <br />
          <br />
          Growing up in a small Sicilian village in the Parco dei Nebrodi, while
          competitive swimming was not accessible, my innate love for the ocean
          only grew.
          <br />
          <br />
          In 2018, during a trip to Indonesia with my dear friend Angelo, we
          tried <BoldText>scuba diving for the first time</BoldText>. On our
          first dive we saw turtles, an octopus, a white-banded sea snake and
          vibrant marine life. 🐢🐙 That day we promised ourselves to get
          certified.
          <br />
          <br />
          Months later in Koh Tao, Thailand, we became{" "}
          <BoldText>Open Water Divers</BoldText>. A few years later, together
          with Angelo and Melania, we travelled to Ustica and earned our{" "}
          <BoldText>Advanced certifications</BoldText>. By then, I knew I wanted
          to reach a professional level.
          <br />
          <br />
          In December 2024, I returned to Koh Tao to become a{" "}
          <BoldText>Rescue Diver</BoldText>. Six months later I started my{" "}
          <BoldText>Divemaster internship</BoldText> and finally became a Pro.
          <br />
          <br />
          These experiences grew my passion for{" "}
          <BoldText>marine life and conservation</BoldText>. I am now devoted to
          guiding divers, teaching respect for the ocean, and preserving it for
          future generations.
          <br />
          <br />
          🤿 <ItalicText>Come dive with me and get inspired!</ItalicText>
        </Typography>
      </CardContent>
    </Card>
  );
};

const LanguagesCard: React.FC = () => {
  return (
    <Card variant="outlined" sx={{ mb: 4, ...cardStyle }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Languages
        </Typography>
        <Stack spacing={1}>
          {languages.map((lang: Language) => (
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
};

// -------------------------------------------------
// 4. Main Component
// -------------------------------------------------

export default function AboutSection(): React.ReactElement {
  // Add client-side check to prevent ResizeObserver errors with Masonry
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const education: EducationItem[] = [
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

  const work: WorkItem[] = [
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

  // Show a loading spinner during server render/hydration
  if (!isClient) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box id="about">
      {/* @ts-ignore: Assuming SectionTitle is a valid component */}
      <SectionTitle>About Me</SectionTitle>

      <Container maxWidth="lg">
        {/* @ts-ignore: Assuming StoryCard is a valid component */}
        <StoryCard />

        {/* Education & Certifications */}
        <Card variant="outlined" sx={{ mb: 6, ...cardStyle }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Education & Certifications
            </Typography>
            {/* Masonry is wrapped under the isClient check */}
            <Masonry columns={{ xs: 1, sm: 2, md: 2 }} spacing={2}>
              {education.map((e: EducationItem, idx: number) => (
                <EducationCard key={idx} {...e} />
              ))}
            </Masonry>
          </CardContent>
        </Card>

        {/* Work + Languages Row */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Box flex={1}>
            {work.map((w: WorkItem, idx: number) => (
              <WorkCard key={idx} {...w} />
            ))}
          </Box>

          <Box flex={1}>
            {/* @ts-ignore: Assuming LanguagesCard is a valid component */}
            <LanguagesCard />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
