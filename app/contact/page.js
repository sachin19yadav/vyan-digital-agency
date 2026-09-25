import ContactForm from "@/components/ContactForm";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Headphones,
} from "lucide-react";

export const metadata = {
  title: "Contact Us — Consult with Top Digital Marketing & Ads Experts",
  description:
    "Get in touch with Vyan Digital Agency in Kanpur, Uttar Pradesh. Call or WhatsApp +91 96548 80240, visit our office behind Cambridge School, or submit an enquiry for high-ROI ads, SEO, and web/app development.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description:
      "Talk to our team about Meta Ads, Google Ads, Google Maps SEO, and custom app development. Fast response within 24-48 hours.",
    url: "/contact",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Contact Vyan Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description: "Connect with our growth team on WhatsApp or phone for a free marketing and ad strategy audit.",
    images: ["/og-image.svg"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Contact Vyan Digital Agency Kanpur",
      description:
        "Get in touch with Vyan Digital Agency in Panki, Kanpur. Free 1-on-1 digital marketing and growth consultation.",
      url: "https://www.vyandigitalagency.com/contact",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.vyandigitalagency.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://www.vyandigitalagency.com/contact",
        },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Headphones size={14} style={{ color: "var(--accent)" }} />
            <span>Direct Client Support &amp; Consultations</span>
          </div>
          <h1>Tell Us About Your Business. We&apos;ll Architect Your Growth Plan.</h1>
          <p className="lead">
            Submit your inquiry below or connect directly via WhatsApp or phone.
            Our team responds within 24–48 hours with a customized strategy breakdown.
          </p>
        </div>
      </section>

      {/* 3 Quick Contact Channel Cards */}
      <section className="section" style={{ paddingBottom: 20 }}>
        <div className="wrap">
          <div className="contact-cards-grid">
            {/* Quick WhatsApp Card */}
            <div className="quick-contact-card">
              <div className="icon-box" style={{ background: "rgba(37, 211, 102, 0.15)", borderColor: "rgba(37, 211, 102, 0.35)", color: "#25D366" }}>
                <MessageCircle size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 4 }}>WhatsApp Direct</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16 }}>
                Fastest way to get answers. Real humans reply directly to your questions.
              </p>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I'd%20like%20to%20consult%20about%20marketing%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
                style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
              >
                <MessageCircle size={16} />
                <span>+91 96548 80240</span>
              </a>
            </div>

            {/* Quick Phone Call Card */}
            <div className="quick-contact-card">
              <div className="icon-box">
                <Phone size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 4 }}>Call Our Office</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16 }}>
                Available Monday to Saturday from 9:30 AM to 7:00 PM IST.
              </p>
              <a
                href="tel:+919654880240"
                className="btn btn-secondary btn-icon"
                style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
              >
                <Phone size={16} />
                <span>Call +91 96548 80240</span>
              </a>
            </div>

            {/* Office Location Card */}
            <div className="quick-contact-card">
              <div className="icon-box">
                <MapPin size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: 4 }}>Kanpur Headquarters</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 16 }}>
                Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur 208020.
              </p>
              <a
                href="https://maps.google.com/?q=Cambridge+School+Shatabdi+Nagar+Panki+Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-icon"
                style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
              >
                <MapPin size={16} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Google Maps Section */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="grid-2 contact-grid" style={{ alignItems: "stretch" }}>
            {/* Left Column: Form Card */}
            <div className="modern-card" style={{ padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Send Business Details</h2>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Free Competitor &amp; ROI Analysis</span>
                </div>
                <span className="showcase-tag">24h Response</span>
              </div>
              <ContactForm />
            </div>

            {/* Right Column: Office Location & Map */}
            <div className="modern-card" style={{ padding: "32px 28px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
                <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Visit Our Kanpur Office</h2>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Shatabdi Nagar, Panki • Open Mon–Sat</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MapPin size={20} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", display: "block", color: "var(--text)" }}>Physical Address</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                      Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, Uttar Pradesh 208020
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Clock size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", display: "block", color: "var(--text)" }}>Office Working Hours</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Monday – Saturday: 9:30 AM – 7:00 PM</span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Phone size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", display: "block", color: "var(--text)" }}>Direct Phone &amp; WhatsApp</strong>
                    <a href="tel:+919654880240" style={{ fontSize: "0.88rem", color: "var(--accent)", fontWeight: 600 }}>
                      +91 96548 80240
                    </a>
                  </div>
                </div>
              </div>

              <div className="map-frame" style={{ marginTop: "auto", minHeight: 250 }}>
                <iframe
                  src="https://www.google.com/maps?q=Cambridge%20School%20Shatabdi%20Nagar%20Panki%20Kanpur&output=embed"
                  loading="lazy"
                  allowFullScreen
                  title="Vyan Digital Agency office location map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
