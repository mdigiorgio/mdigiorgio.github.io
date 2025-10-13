// src/app/privacy-policy/page.tsx

import React from "react";
import { LegalText } from "@/components/LegalText";

const privacyMarkdownSource: string = `
This Privacy Policy describes how **\${SITE_NAME}** ("we," "us," or "our")
collects, uses, and protects the personal information of visitors and users
("you") of the website **\${WEBSITE_URL}** (the "Service"). By using our
Service, you agree to the collection and use of information in accordance
with this policy.      

## 1. Information We Collect

### 1.1. Data Provided by Third-Party Authentication (Supabase/Google)

When you log in to submit a review, we collect the following data from your
chosen third-party provider (e.g., Google) via our authentication service
(Supabase):

* **Identity Data**: Your name (or user display name).  
* **Contact Data**: Your email address.
* **Profile Data**: Your profile picture or avatar URL.

### 1.2. Content Data

We directly collect the content you submit to the site:

* **Review Content**: The text and star rating of the review you post.
* **Associated Metadata**: The date and time the review was submitted.

C. Technical and Usage Data

When you visit the site, we automatically collect information about your device
and usage, including IP addresses, browser type, and interaction with the
Service. We use **Google Analytics** to track anonymous usage data and use
cookies for session management and website analytics.

## 2. How We Use Your Information

* To **Provide Services**: To manage your account, authenticate you for review
  submission, and publish your reviews on the website.
* **Review Attribution**: To publicly attribute the review content (using your
  name and avatar) to ensure authenticity.
* **Improvement**: To analyze usage patterns and site performance to improve
  website design and user experience.
* **Security**: To monitor and prevent fraudulent activity and unauthorized
  access.

## 3. Data Sharing & Disclosure

We share your data only in the following circumstances:

* **Public Display**: Your name, avatar, review content, and star rating are
  shared publicly on the review page of the website.
* **Service Providers**: We use third-party services that process data on our
  behalf, including Supabase (for authentication and database hosting) and
  Google Analytics (for traffic analysis).              
* **Legal Obligation**: If required to do so by law or in response to valid
  requests by public authorities.

## 4. Data Retention and Security

We retain your personal data only for as long as necessary to fulfill the
purposes for which it was collected, or until you request its deletion. We
implement reasonable security measures to protect against unauthorized
access, alteration, disclosure, or destruction of your personal data.

## 5. Your Data Rights (GDPR Compliance)

As you are accessing a service governed by the laws of Italy, and by extension,
the European Union’s GDPR, you have the following rights:

* **Right to Access**: You have the right to request a copy of the personal
  data we hold about you.
* **Right to Erasure** (Right to be Forgotten): You have the right to request
  that we delete your personal data, including your account and all associated
  reviews.
* **Right to Rectification**: You have the right to request that any inaccurate
  or incomplete data be corrected.

To exercise these rights, please contact us at **\${LEGAL_CONTACT_EMAIL}**.

## 6. Changes to This Policy

We may update our Privacy Policy from time to time. We will notify you of any
changes by posting the new Privacy Policy on this page.

## 7. Contact Information

Questions about the Privacy Policy should be sent to us at
**\${LEGAL_CONTACT_EMAIL}**.  `;

export default function PrivacyPolicyPage() {
  return (
    <LegalText title="Privacy Policy" markdownText={privacyMarkdownSource} />
  );
}
