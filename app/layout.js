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
    default: "Top Digital Marketing & Ads Agency in Uttar Pradesh & India — Web & App Development",
    template: "%s | Vyan Digital Agency",
  },
  description:
    "Vyan Digital Agency is the #1 digital marketing agency, ads agency, and growth partner across Uttar Pradesh and India. We specialize in Meta Ads, Google Ads, Google Maps SEO, social media marketing, WhatsApp automation, and custom web & mobile app development.",
  keywords: [
    "Marketing Agency",
    "Digital Marketing Agency",
    "Digital Agency",
    "Ads Agency",
    "Advertising Agency",
    "Top Digital Marketing Agency in Uttar Pradesh",
    "Best Digital Marketing Agency in UP",
    "Marketing Agency Uttar Pradesh",
    "Ads Agency in Uttar Pradesh",
    "Digital Agency UP",
    "Top Marketing Agency in India",
    "Best Digital Marketing Agency India",
    "Best Ads Agency India",
    "Best Digital Marketing Agency in Kanpur",
    "Top Marketing Agency in Kanpur",
    "Best Ads Agency in Kanpur",
    "Digital Marketing Agency Kanpur",
    "Digital Marketing Agency Lucknow",
    "Digital Agency Noida",
    "Digital Marketing Agency Varanasi",
    "Ads Agency Agra",
    "Digital Marketing Agency Prayagraj",
    "Digital Marketing Agency Ghaziabad",
    "Digital Marketing Agency Meerut",
    "Digital Marketing Agency Gorakhpur",
    "Digital Marketing Agency Bareilly",
    "Digital Marketing Agency Delhi NCR",
    "Digital Marketing Agency Mumbai",
    "Digital Marketing Agency Bengaluru",
    "Digital Marketing Agency Jaipur",
    "Digital Marketing Agency Patna",
    "Meta Ads Agency",
    "Facebook Ads Agency",
    "Google Ads Agency",
    "Google Business Profile Listing",
    "Google Maps SEO",
    "Local SEO Agency",
    "SME Marketing Agency",
    "WhatsApp Automation",
    "Website Development Company",
    "Mobile App Development Company",
    "Android App Development",
    "iOS App Development",
    "Performance Marketing Agency",
    "Lead Generation Agency"
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
    title: "Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description:
      "Looking for the top digital marketing agency or ads agency? Vyan Digital Agency empowers businesses and SMEs with high-ROI Meta Ads, Google Ads, Google Maps SEO, WhatsApp automations, and custom Android/iOS apps.",
    url: siteUrl,
    siteName: "Vyan Digital Agency",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vyan Digital Agency — Best Digital Marketing, Ads & App Development Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description:
      "Premier digital marketing, ads agency and app development company helping businesses scale with Meta Ads, Google Ads, local SEO, and custom apps.",
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
      "@type": ["LocalBusiness", "ProfessionalService", "AdvertisingAgency"],
      "@id": `${siteUrl}/#organization`,
      name: "Vyan Digital Agency — Top Digital Marketing, Ads & App Development Agency in Uttar Pradesh & India",
      alternateName: [
        "Vyan Digital",
        "Vyan Digital Agency",
        "Vyan Marketing Agency",
        "Vyan Ads Agency",
        "Top Marketing Agency in Uttar Pradesh",
        "Best Digital Marketing Agency in UP",
        "Top Ads Agency in Uttar Pradesh",
        "Best Digital Marketing Agency in Kanpur",
        "Top Digital Marketing Agency in India"
      ],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
        width: "200",
        height: "40",
      },
      image: `${siteUrl}/og-image.svg`,
      description:
        "Top-rated digital marketing agency, ads agency, and app development company serving Uttar Pradesh and Pan-India. Specializing in Meta Ads (Facebook & Instagram), Google Ads, Google Maps Business Profile ranking, WhatsApp lead automations, custom websites, and Android/iOS mobile applications for businesses and SMEs.",
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
        { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
        { "@type": "Country", name: "India" },
        { "@type": "City", name: "Kanpur" },
        { "@type": "City", name: "Lucknow" },
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Varanasi" },
        { "@type": "City", name: "Prayagraj" },
        { "@type": "City", name: "Agra" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "City", name: "Meerut" },
        { "@type": "City", name: "Gorakhpur" },
        { "@type": "City", name: "Bareilly" },
        { "@type": "City", name: "Aligarh" },
        { "@type": "City", name: "Moradabad" },
        { "@type": "City", name: "Ayodhya" },
        { "@type": "City", name: "Jhansi" },
        { "@type": "City", name: "Mathura" },
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Mumbai" },
        { "@type": "City", name: "Bengaluru" },
        { "@type": "City", name: "Pune" },
        { "@type": "City", name: "Hyderabad" },
        { "@type": "City", name: "Jaipur" },
        { "@type": "City", name: "Patna" },
        { "@type": "City", name: "Indore" },
        { "@type": "City", name: "Ahmedabad" },
        { "@type": "City", name: "Kolkata" },
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
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile & Web App Development",
              description: "Custom Android, iOS, and Web applications built with Flutter, React Native, and Next.js.",
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
        "Marketing Agency",
        "Digital Marketing Agency",
        "Digital Agency",
        "Ads Agency",
        "Advertising Agency",
        "Top Digital Marketing Agency in Uttar Pradesh",
        "Best Digital Marketing Agency in UP",
        "Top Marketing Agency in India",
        "Best Ads Agency in India",
        "Meta Ads (Facebook & Instagram Ads)",
        "Google Ads & PPC Management",
        "Google Business Profile & Local SEO",
        "Google Maps 3-Pack SEO",
        "Social Media Management & Video Production",
        "Business Automation Agents & WhatsApp Chatbots",
        "Custom Website Development (Next.js, React)",
        "Mobile App Development (Android & iOS)",
        "Cross-Platform App Development (Flutter, React Native)",
        "E-Commerce App Development",
        "Education LMS App Development",
        "Healthcare & Clinic Booking App Development",
        "Business ERP & Field Staff Apps",
        "Performance Marketing & High ROAS Scaling",
        "Lead Generation & Conversion Rate Optimization"
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
    <html lang="en-IN">
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
        {/* Geo Location Tags for Uttar Pradesh & Pan-India Search */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Uttar Pradesh, Kanpur, India" />
        <meta name="geo.position" content="26.4716;80.2447" />
        <meta name="ICBM" content="26.4716, 80.2447" />
        <meta name="target" content="all" />
        <meta name="coverage" content="India, Worldwide" />
        <meta name="rating" content="General" />
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
