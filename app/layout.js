import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyandigitalagency.com";

export const viewport = {
  themeColor: "#0F1320",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vyan Digital Agency — Meta Ads, Google Ads & Growth, Kanpur",
    template: "%s | Vyan Digital Agency",
  },
  description:
    "Vyan Digital Agency in Kanpur — Leading digital growth and marketing agency. We specialize in Meta Ads (Facebook & Instagram), Google Ads, Google Business Profile (Maps) optimization, social media handling, business automation, website development, and practical growth courses.",
  keywords: [
    "Vyan Digital Agency",
    "Vyan Digital",
    "Vyan Agency",
    "Digital Marketing Agency Kanpur",
    "Best Digital Marketing Agency in Kanpur",
    "Meta Ads Kanpur",
    "Facebook Ads Agency Kanpur",
    "Google Ads Expert Kanpur",
    "Google Business Profile Listing Kanpur",
    "Google Maps SEO Kanpur",
    "Social Media Management Kanpur",
    "WhatsApp Automation Kanpur",
    "Website Development Kanpur",
    "Panki Kanpur Digital Marketing",
    "Earn with Us Kanpur",
    "Digital Marketing Courses Kanpur"
  ],
  authors: [{ name: "Vyan Digital Agency", url: siteUrl }],
  creator: "Vyan Digital Agency",
  publisher: "Vyan Digital Agency",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vyan Digital Agency — Meta Ads, Google Ads & Growth, Kanpur",
    description:
      "Vyan Digital Agency helps local businesses in Kanpur get found, generate qualified leads, and scale with Meta Ads, Google Ads, Google Maps optimization, and business automations.",
    url: siteUrl,
    siteName: "Vyan Digital Agency",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vyan Digital Agency Kanpur — Meta Ads, Google Ads & Growth",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyan Digital Agency — Meta Ads, Google Ads & Growth, Kanpur",
    description:
      "Digital growth agency in Kanpur helping businesses scale with Meta Ads, Google Ads, and automation systems.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "01QA1dYBxrIYgqVyFygvhJsItrB9Z9gI-ryWpk_rKbE",
  },
  category: "Digital Marketing Agency",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Vyan Digital Agency",
      alternateName: ["Vyan Digital", "Vyan"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
        width: "200",
        height: "40",
      },
      image: `${siteUrl}/og-image.svg`,
      description:
        "Digital growth and performance marketing agency in Kanpur. We manage Meta Ads, Google Ads, Google Maps business listing, Facebook & YouTube account management, business automations, website development, and social media growth courses.",
      telephone: "+91-9654880240",
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Behind Cambridge School, Shatabdi Nagar, Panki",
        addressLocality: "Kanpur",
        addressRegion: "Uttar Pradesh",
        postalCode: "208020",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.4716",
        longitude: "80.2447",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:30",
          closes: "19:00",
        },
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Kanpur",
        },
        {
          "@type": "AdministrativeArea",
          name: "Uttar Pradesh",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Marketing & Growth Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Meta Ads (Facebook & Instagram Advertising)",
              description: "Audience targeting, creative management and weekly ad optimization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Google Ads (Search, Display & YouTube)",
              description: "High-intent search and conversion campaigns.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Google Maps Business Listing Optimization",
              description: "Local SEO, Google Business Profile ranking and review management.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Facebook & YouTube Account Handling",
              description: "Content scheduling, community management, and profile growth.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Business Automation Agents",
              description: "WhatsApp auto-replies, lead capture, and CRM automations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Development",
              description: "Fast, mobile-responsive business websites and landing pages.",
            },
          },
        ],
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9654880240",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://wa.me/919654880240"
      ],
      knowsAbout: [
        "Digital Marketing",
        "Meta Ads (Facebook & Instagram Ads)",
        "Google Ads & PPC Management",
        "Google Business Profile & Local SEO",
        "Social Media Management",
        "Business Process Automation",
        "WhatsApp Marketing Automation",
        "Custom Website Development",
        "Lead Generation"
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "48",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Vyan Digital Agency",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="01QA1dYBxrIYgqVyFygvhJsItrB9Z9gI-ryWpk_rKbE"
        />
        {/* Geo Location Tags for Kanpur Local Search */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Kanpur" />
        <meta name="geo.position" content="26.4716;80.2447" />
        <meta name="ICBM" content="26.4716, 80.2447" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
