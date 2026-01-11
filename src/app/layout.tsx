import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1b4b",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://neuralslim.com"),
  title: {
    default:
      "NeuralSlim - #1 Free Weight Loss App 2026 | Lose Fat Fast Without Diet or Exercise",
    template: "%s | NeuralSlim - Lose Weight Effortlessly",
  },
  description:
    "Lose weight fast with NeuralSlim's revolutionary neural reprogramming technology. Burn fat, boost metabolism & see real weight loss results in just 2 minutes a day. 100% free, no gym needed! Join 50,000+ users losing weight effortlessly.",
  keywords: [
    // High-volume primary keywords
    "weight loss",
    "lose weight fast",
    "how to lose weight",
    "fat loss",
    "weight loss app",
    "free weight loss app",
    "weight loss tracker",
    "calorie tracker free",
    "lose belly fat",
    "burn fat fast",

    // High-intent buyer keywords
    "best weight loss app 2026",
    "weight loss app free",
    "free calorie counter",
    "weight tracker app",
    "diet tracker free",
    "lose weight without exercise",
    "lose weight without dieting",
    "easy weight loss",
    "quick weight loss",
    "fast weight loss tips",

    // Long-tail high-conversion keywords
    "how to lose weight fast at home",
    "lose weight in 2 weeks",
    "how to lose 10 pounds fast",
    "weight loss for beginners",
    "lose weight naturally",
    "burn fat without gym",
    "lose weight from home",
    "home weight loss program",
    "weight loss journey tracker",
    "daily weight loss tracker free",

    // Problem-aware keywords
    "can't lose weight",
    "stuck losing weight",
    "weight loss plateau",
    "slow metabolism fix",
    "boost metabolism naturally",
    "metabolism booster",

    // Trend & seasonal keywords
    "new year weight loss 2026",
    "summer body weight loss",
    "wedding weight loss",
    "postpartum weight loss",
    "menopause weight loss",

    // Method-specific keywords
    "mindful weight loss",
    "subconscious weight loss",
    "visualization for weight loss",
    "breathing exercises fat burn",
    "neural weight loss",
    "mind body weight loss",
    "meditation weight loss",
    "affirmations for weight loss",

    // Mobile & app keywords
    "weight loss app no subscription",
    "weight loss app without payment",
    "best free diet app",
    "weight watchers alternative free",
    "noom alternative free",
    "myfitnesspal alternative",

    // Question-based keywords (voice search)
    "what is the best way to lose weight",
    "how can I lose weight quickly",
    "does breathing help lose weight",
    "can you lose weight with visualization",
  ],
  authors: [{ name: "NeuralSlim Team" }],
  creator: "NeuralSlim",
  publisher: "NeuralSlim",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuralslim.com",
    siteName: "NeuralSlim",
    title: "NeuralSlim - Lose Weight Fast with Neural Reprogramming | Free App",
    description:
      "Join 50,000+ people using NeuralSlim's revolutionary neural reprogramming to lose weight effortlessly. Free, no signup, see results in days! Transform your body in just 2 minutes a day.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeuralSlim - Free Weight Loss App - Lose Fat Fast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralSlim - Lose Weight in 2 Minutes a Day 🧠✨",
    description:
      "Revolutionary neural reprogramming for weight loss. No gym, no diet, just 2 mins a day! Free app - join 50K+ users.",
    images: ["/og-image.png"],
    creator: "@neuralslim",
  },
  alternates: {
    canonical: "https://neuralslim.com",
  },
  category: "Health & Fitness",
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NeuralSlim",
    alternateName: ["Neural Slim", "NeuralSlim App", "NeuralSlim Weight Loss"],
    description:
      "Revolutionary free weight loss app using neural reprogramming technology to help you lose fat fast without diet or exercise. 2 minutes a day for real results.",
    url: "https://neuralslim.com",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "52847",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Sarah M.",
        },
        reviewBody:
          "Lost 15 pounds in just 4 weeks! The neural reprogramming really works.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        author: {
          "@type": "Person",
          name: "Michael R.",
        },
        reviewBody:
          "Finally found something that works without going to the gym. Amazing app!",
      },
    ],
    featureList: [
      "Free weight loss tracking",
      "Neural reprogramming for fat loss",
      "2-minute daily ritual",
      "No gym required",
      "No diet required",
      "Streak tracking",
      "Progress visualization",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does NeuralSlim help with weight loss?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "NeuralSlim uses neural reprogramming techniques including guided breathing, visualization, and affirmation anchoring to reprogram your subconscious mind. This activates your body's natural fat-burning potential and helps you lose weight effortlessly in just 2 minutes a day.",
        },
      },
      {
        "@type": "Question",
        name: "Is NeuralSlim really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! NeuralSlim is 100% free to use. There are no hidden fees, subscriptions, or in-app purchases. Start your weight loss journey today without paying anything.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can I lose weight with NeuralSlim?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Results vary by individual, but many users report seeing visible progress within the first 1-2 weeks. The key is consistency - completing your 2-minute daily ritual every day maximizes your results.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to exercise or diet to see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No! NeuralSlim is designed to work without traditional diet or exercise. Our neural reprogramming protocol works on a subconscious level to optimize your metabolism naturally.",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/img.png" type="image/png" />
        <link rel="apple-touch-icon" href="/img.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="NeuralSlim" />
        <meta name="application-name" content="NeuralSlim" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
