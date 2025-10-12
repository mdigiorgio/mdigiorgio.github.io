// src/app/privacy-policy/page.jsx

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
import { SITE_NAME, WEBSITE_URL, LEGAL_CONTACT_EMAIL } from "@/lib/config";
import { cardStyle } from "@/styles/commonStyles";

// Helper component to render bold text within other Typography components
const BoldText = ({ children }) => (
  <Typography component="span" sx={{ fontWeight: "bold" }}>
    {children}
  </Typography>
);

export default function PrivacyPolicyPage() {
  const year = new Date().getFullYear();

  return (
    <Container sx={{ py: 4 }}>
      <Card variant="outlined" sx={{ ...cardStyle }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
            Privacy Policy for {SITE_NAME}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Effective Date: January 1, {year}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" paragraph>
              This Privacy Policy describes how <BoldText>{SITE_NAME}</BoldText>{" "}
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, and protects the personal information of visitors and users
              (&quot;you&quot;) of the website{" "}
              <BoldText>{WEBSITE_URL}</BoldText> (the &quot;Service&quot;). By
              using our Service, you agree to the collection and use of
              information in accordance with this policy.
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            1. Information We Collect
          </Typography>

          <Box sx={{ ml: 2, mb: 3 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              A. Data Provided by Third-Party Authentication (Supabase/Google)
            </Typography>
            <Typography variant="body1" paragraph>
              When you log in to submit a review, we collect the following data
              from your chosen third-party provider (e.g., Google) via our
              authentication service (Supabase):
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <>
                      <BoldText>Identity Data</BoldText>: Your name (or user
                      display name).
                    </>
                  }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <>
                      <BoldText>Contact Data</BoldText>: Your email address.
                    </>
                  }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <>
                      <BoldText>Profile Data</BoldText>: Your profile picture or
                      avatar URL.
                    </>
                  }
                />
              </ListItem>
            </List>

            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              B. Content Data
            </Typography>
            <Typography variant="body1" paragraph>
              We directly collect the content you submit to the site:
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <>
                      <BoldText>Review Content</BoldText>: The text and star
                      rating of the review you post.
                    </>
                  }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <>
                      <BoldText>Associated Metadata</BoldText>: The date and
                      time the review was submitted.
                    </>
                  }
                />
              </ListItem>
            </List>

            <Typography
              variant="h6"
              component="h3"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              C. Technical and Usage Data
            </Typography>
            <Typography variant="body1" paragraph>
              When you visit the site, we automatically collect information
              about your device and usage, including IP addresses, browser type,
              and interaction with the Service. We use{" "}
              <BoldText>Google Analytics</BoldText> to track anonymous usage
              data and use cookies for session management and website analytics.
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom>
            2. How We Use Your Information
          </Typography>
          <List dense>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    To <BoldText>Provide Services</BoldText>: To manage your
                    account, authenticate you for review submission, and publish
                    your reviews on the website.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Review Attribution</BoldText>: To publicly
                    attribute the review content (using your name and avatar) to
                    ensure authenticity.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Improvement</BoldText>: To analyze usage patterns
                    and site performance to improve website design and user
                    experience.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Security</BoldText>: To monitor and prevent
                    fraudulent activity and unauthorized access.
                  </>
                }
              />
            </ListItem>
          </List>
          <Box sx={{ mb: 2 }} />

          <Typography variant="h5" component="h2" gutterBottom>
            3. Data Sharing & Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            We share your data only in the following circumstances:
          </Typography>
          <List dense>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Public Display</BoldText>: Your name, avatar,
                    review content, and star rating are shared publicly on the
                    review page of the website.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Service Providers</BoldText>: We use third-party
                    services that process data on our behalf, including Supabase
                    (for authentication and database hosting) and Google
                    Analytics (for traffic analysis).
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Legal Obligation</BoldText>: If required to do so
                    by law or in response to valid requests by public
                    authorities.
                  </>
                }
              />
            </ListItem>
          </List>
          <Box sx={{ mb: 2 }} />

          <Typography variant="h5" component="h2" gutterBottom>
            4. Data Retention and Security
          </Typography>
          <Typography variant="body1" paragraph>
            We retain your personal data only for as long as necessary to
            fulfill the purposes for which it was collected, or until you
            request its deletion. We implement reasonable security measures to
            protect against unauthorized access, alteration, disclosure, or
            destruction of your personal data.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            5. Your Data Rights (GDPR Compliance)
          </Typography>
          <Typography variant="body1" paragraph>
            As you are accessing a service governed by the laws of Italy, and by
            extension, the European Union’s GDPR, you have the following rights:
          </Typography>
          <List dense>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Right to Access</BoldText>: You have the right to
                    request a copy of the personal data we hold about you.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Right to Erasure</BoldText> (Right to be
                    Forgotten): You have the right to request that we delete
                    your personal data, including your account and all
                    associated reviews.
                  </>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <>
                    <BoldText>Right to Rectification</BoldText>: You have the
                    right to request that any inaccurate or incomplete data be
                    corrected.
                  </>
                }
              />
            </ListItem>
          </List>
          <Typography variant="body1" paragraph>
            To exercise these rights, please contact us at{" "}
            <BoldText>{LEGAL_CONTACT_EMAIL}</BoldText>.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            6. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            7. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact
            us by email:{" "}
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
