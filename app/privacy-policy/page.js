import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vyandigitalagency.com";

export const metadata = {
  title: "Privacy Policy — Data Protection & Privacy Commitment",
  description:
    "Read the Privacy Policy of Vyan Digital Agency. Learn how we collect, use, protect, and handle your data and privacy across our digital marketing and development services.",
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Vyan Digital Agency",
    description: "Learn how Vyan Digital Agency respects, handles, and protects your personal and business data.",
    url: `${siteUrl}/privacy-policy`,
    siteName: "Vyan Digital Agency",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Vyan Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Vyan Digital Agency",
    description: "Learn how Vyan Digital Agency respects, handles, and protects your personal and business data.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Privacy Policy | Vyan Digital Agency",
      description: "Learn how Vyan Digital Agency respects, handles, and protects your personal and business data.",
      url: `${siteUrl}/privacy-policy`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: `${siteUrl}/privacy-policy`,
        },
      ],
    },
  ],
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 25, 2026";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      {/* Header Banner */}
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
          <div className="live-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
            <span>Legal &amp; Data Transparency</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: 16 }}>
            Privacy <span className="text-gradient">Policy</span>
          </h1>

          <p className="lead" style={{ fontSize: "1.08rem", color: "var(--text-muted)", maxWidth: 650, margin: "0 auto 16px" }}>
            At Vyan Digital Agency, we respect your privacy and are committed to protecting any personal and business data you share with us.
          </p>

          <div style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600 }}>
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Introduction Card */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <Eye size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>1. Introduction</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 12 }}>
                Welcome to <strong>Vyan Digital Agency</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This Privacy Policy explains our practices regarding the collection, use, and disclosure of information that we receive when you visit our website (<strong>vyandigitalagency.com</strong>), submit consultation forms, enroll in our courses, or engage our digital marketing, advertising, and custom application development services.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>
                By accessing our website or utilizing our services, you acknowledge and agree to the practices described in this Privacy Policy.
              </p>
            </div>

            {/* Information We Collect Card */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <FileText size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>2. Information We Collect</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 14 }}>
                We collect information directly from you when you interact with our website or submit inquiry funnels:
              </p>
              <ul style={{ paddingLeft: 20, color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 16 }}>
                <li><strong style={{ color: "var(--text)" }}>Personal &amp; Contact Identifiers:</strong> Your full name, telephone / WhatsApp phone number, email address, city, and business or brand name.</li>
                <li><strong style={{ color: "var(--text)" }}>Service Inquiries:</strong> The specific marketing or software services you are interested in (e.g., Meta Ads, Google Ads, Local SEO, Mobile App Development, Website Development).</li>
                <li><strong style={{ color: "var(--text)" }}>Course &amp; Partnership Information:</strong> Details submitted when enrolling in our Social Media Course or applying for our Referral / Earn With Us program.</li>
                <li><strong style={{ color: "var(--text)" }}>Automated Technical Data:</strong> Browser user-agent, operating system, IP address, general geographic location, and website page visit behavior collected via server logs and analytics cookies.</li>
              </ul>
            </div>

            {/* How We Use Your Data Card */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <ShieldCheck size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>3. How We Use Your Information</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 14 }}>
                We utilize your personal and business information solely for legitimate commercial purposes:
              </p>
              <ul style={{ paddingLeft: 20, color: "var(--text-muted)", lineHeight: 1.75, fontSize: "0.92rem", margin: 0 }}>
                <li>To contact you regarding free strategy audits, ad account reviews, and service quotations requested by you.</li>
                <li>To execute, monitor, and deliver custom digital marketing campaigns, Google Ads, Meta Ads, and software development projects.</li>
                <li>To send transactional updates, project milestones, invoices, and campaign reporting via phone, email, or WhatsApp.</li>
                <li>To process student enrollments and course access credentials for our digital courses.</li>
                <li>To continuously analyze website performance, prevent fraud, and optimize our user experience.</li>
              </ul>
            </div>

            {/* Meta, Google Ads & Cookie Tracking */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <Lock size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>4. Cookies, Analytics &amp; Advertising Pixels</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 12 }}>
                Our website may utilize standard cookies, Google Analytics, and the Meta Pixel to evaluate website traffic, track user interactions, and deliver relevant advertisements across Google and Meta (Facebook/Instagram) networks.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", marginBottom: 12 }}>
                These technologies do not collect sensitive passwords or financial credentials. You can disable or clear cookies in your web browser settings at any time without impacting your ability to browse the core content of our website.
              </p>
            </div>

            {/* WhatsApp Communication */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <MessageCircle size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>5. WhatsApp &amp; SMS Communication Policy</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 12 }}>
                When you submit an inquiry form or initiate a chat via our WhatsApp button, you consent to receive direct business communication from our authorized growth team.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>
                We strictly oppose spam. We do not sell your telephone number to external telemarketers. If you ever wish to discontinue receiving WhatsApp notifications or updates from us, you can simply reply with &ldquo;STOP&rdquo; at any time, and we will honor your request immediately.
              </p>
            </div>

            {/* Data Protection & Confidentiality */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <Lock size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>6. Data Protection &amp; Confidentiality</h2>
              </div>
              <p style={{ color: "var(--text)", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 12 }}>
                We implement industry-standard technical measures, including Secure Socket Layer (SSL) 256-bit encryption, access-controlled cloud infrastructure, and restricted administrative permissions to protect your personal and business data.
              </p>
              <p style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.95rem", margin: 0 }}>
                We do not sell, rent, trade, or monetize your contact or business data with third parties under any circumstances.
              </p>
            </div>

            {/* Third-Party Service Providers */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <ShieldCheck size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>7. Third-Party Service Providers</h2>
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>
                We may share minimal data with trusted third-party infrastructure partners necessary to operate our website and services (such as Google Cloud, Google Sheets Apps Script for lead routing, and hosting servers). These providers are bound by strict confidentiality and data protection obligations and may only process information in accordance with our instructions.
              </p>
            </div>

            {/* Your Rights */}
            <div className="modern-card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="icon-box" style={{ width: 40, height: 40, margin: 0 }}>
                  <FileText size={20} />
                </div>
                <h2 style={{ fontSize: "1.35rem", margin: 0 }}>8. Your Data Rights</h2>
              </div>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", marginBottom: 12 }}>
                You have the right to request access to the personal data we hold about you, request corrections to inaccurate information, or request the permanent deletion of your contact records from our databases.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>
                To exercise any of these rights, please contact our support desk via email or phone as listed below.
              </p>
            </div>

            {/* Contact Information Card */}
            <div className="modern-card" style={{ padding: 32, background: "linear-gradient(145deg, #171E33 0%, #111524 100%)", border: "1px solid rgba(217, 164, 65, 0.3)" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: 12, color: "var(--accent)" }}>9. Contact &amp; Grievance Officer</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.65, fontSize: "0.92rem", marginBottom: 20 }}>
                If you have questions, feedback, or concerns regarding this Privacy Policy or how your data is handled, please reach out to us:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MapPin size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.9rem", color: "var(--text)" }}>Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, UP 208020</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Phone size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <a href="tel:+919654880240" style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 600 }}>+91 96548 80240</a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MessageCircle size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <a href="https://wa.me/919654880240" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9rem", color: "var(--accent)", fontWeight: 600 }}>WhatsApp Us (+91 96548 80240)</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
