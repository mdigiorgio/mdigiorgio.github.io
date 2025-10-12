// src/app/terms-and-conditions/page.jsx

import {
  Container,
  Typography,
  Box,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import {
  SITE_NAME,
  WEBSITE_URL,
  LEGAL_CONTACT_EMAIL,
  JURISDICTION,
} from "@/lib/config";
import { cardStyle } from "@/styles/commonStyles";

// Helper component to render bold text within other Typography components
const BoldText = ({ children }) => (
  <Typography component="span" sx={{ fontWeight: "bold" }}>
    {children}
  </Typography>
);

export default function TermsAndConditionsPage() {
  const year = new Date().getFullYear();

  return (
    <Container sx={{ py: 6 }}>
      <Card variant="outlined" sx={{ ...cardStyle }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            Terms and Conditions for {SITE_NAME}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Effective Date: January 1, {year}
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing and using the website{" "}
            <BoldText>{WEBSITE_URL}</BoldText> (the &quot;Service&quot;), you
            agree to be bound by these Terms and Conditions (&quot;Terms&quot;).
            If you disagree with any part of the terms, then you may not access
            the Service.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            2. Content and Intellectual Property Rights
          </Typography>

          <Box sx={{ ml: 2, mb: 3 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              A. Our Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              The Service and its original content, features, and functionality
              (including all text, images, designs, and code) are and will
              remain the exclusive property of <BoldText>{SITE_NAME}</BoldText>{" "}
              and are protected by copyright and other intellectual property
              laws.
            </Typography>

            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              B. User-Submitted Review Content
            </Typography>
            <Typography variant="body1" paragraph>
              You retain all rights to the review content (text and rating) you
              submit to the Service. By submitting a review, you grant us a{" "}
              <BoldText>
                non-exclusive, worldwide, royalty-free, perpetual, and
                irrevocable license
              </BoldText>{" "}
              to use, reproduce, modify, adapt, publish, display, and distribute
              that content on and through the Service and in any promotional
              materials. You confirm that your submitted content is your own
              work and does not infringe upon the copyrights or intellectual
              property rights of any third party.
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            3. Rules of Conduct (Reviews)
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to use the Service to submit or publish any review
            content that is:
          </Typography>
          <List dense>
            <ListItem disableGutters>
              <ListItemText primary="Unlawful, harmful, threatening, defamatory, obscene, or harassing." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="Infringing on the intellectual property rights or privacy rights of any person." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="Used for spamming, commercial solicitation, or unauthorized advertising." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="Impersonating any person or entity." />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            We reserve the right to <BoldText>remove or refuse</BoldText> any
            review content that violates these Terms.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            4. Account Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We may terminate or suspend your access to the Service immediately,
            without prior notice or liability, for any reason, including,
            without limitation, if you breach the Terms.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            5. Disclaimer and Limitation of Liability
          </Typography>
          <Box sx={{ ml: 2, mb: 3 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              A. &quot;As Is&quot; Basis
            </Typography>
            <Typography variant="body1" paragraph>
              Your use of the Service is at your sole risk. The Service is
              provided on an <BoldText>&quot;AS IS&quot;</BoldText> and{" "}
              <BoldText>&quot;AS AVAILABLE&quot;</BoldText> basis. We make no
              warranties regarding the accuracy or reliability of the Service or
              its content.
            </Typography>

            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              B. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              In no event shall <BoldText>{SITE_NAME}</BoldText>, nor its owner,
              be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses,
              resulting from your access to or use of the Service.
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            6. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms shall be governed and construed in accordance with the
            laws of <BoldText>{JURISDICTION}</BoldText>, without regard to its
            conflict of law provisions.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            7. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            Questions about the Terms and Conditions should be sent to us at{" "}
            <MuiLink href={`mailto:${LEGAL_CONTACT_EMAIL}`}>
              {LEGAL_CONTACT_EMAIL}
            </MuiLink>
            .
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
