// src/app/terms-and-conditions/page.tsx

import React from "react";
import { LegalText } from "@/components/LegalText";

const termsMarkdownSource: string = `
## 1. Acceptance of Terms

By accessing and using the website **\${WEBSITE_URL}** (the "Service"), you
agree to be bound by these Terms and Conditions ("Terms"). If you disagree with
any part of the terms, then you may not access the Service.

## 2. Content and Intellectual Property Rights

### 2.1 Our Intellectual Property

The Service and its original content, features, and functionality (including
all text, images, designs, and code) are and will remain the exclusive property
of **\${SITE_NAME}** and are protected by copyright and other intellectual
property laws.

### 2.2 User-Submitted Review Content

You retain all rights to the review content (text and rating) you submit to the
Service. By submitting a review, you grant us a **non-exclusive, worldwide,
royalty-free, perpetual, and irrevocable license** to use, reproduce, modify,
adapt, publish, display, and distribute that content on and through the Service
and in any promotional materials. You confirm that your submitted content is
your own work and does not infringe upon the copyrights or intellectual
property rights of any third party.

## 3. Rules of Conduct (Reviews)

You agree not to use the Service to submit or publish any review content that
is:

* Unlawful, harmful, threatening, defamatory, obscene, or harassing.
* Infringing on the intellectual property rights or privacy rights of any person.
* Used for spamming, commercial solicitation, or unauthorized advertising.
* Impersonating any person or entity.

We reserve the right to **remove or refuse** any review content that violates
these Terms.

## 4. Account Termination

We may terminate or suspend your access to the Service immediately, without
prior notice or liability, for any reason, including, without limitation, if
you breach the Terms.

## 5. Disclaimer and Limitation of Liability

### 5.1 "As Is" Basis

Your use of the Service is at your sole risk. The Service is provided on an
**"AS IS"** and **"AS AVAILABLE"** basis. We make no warranties regarding the
accuracy or reliability of the Service or its content.

### 5.2 Limitation of Liability

In no event shall **\${SITE_NAME}**, nor its owner, be liable for any direct,
indirect, incidental, special, consequential, or punitive damages, including
without limitation, loss of profits, data, use, goodwill, or other intangible
losses, resulting from your access to or use of the Service.

## 6. Governing Law

These Terms shall be governed and construed in accordance with the laws of
**\${JURISDICTION}**, without regard to its conflict of law provisions.

## 7. Contact Information

Questions about the Terms and Conditions should be sent to us at
**\${LEGAL_CONTACT_EMAIL}**.  `;

export default function TermsAndConditionsPage(): React.ReactElement {
  return (
    <LegalText
      title="Terms And Conditions"
      markdownText={termsMarkdownSource}
    />
  );
}
