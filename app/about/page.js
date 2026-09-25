import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Users,
  MapPin,
  TrendingUp,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Building,
  CheckCircle2,
  Clock,
  HeartHandshake,
  BarChart3,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About Us — Top Digital Marketing & Ads Agency in UP & India",
  description:
    "Learn about Vyan Digital Agency, the leading performance marketing, ads, and app development company in Uttar Pradesh and India. Headquartered in Panki, Kanpur with statewide and national reach.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description:
      "Premier digital marketing, ads agency and app development company serving Uttar Pradesh and Pan-India. Discover our mission, proven metrics, and client success stories.",
    url: "/about",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "About Vyan Digital Agency — Top Marketing & Ads Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vyan Digital Agency — Top Digital Marketing & Ads Agency",
    description:
      "Premier digital marketing, ads agency and app development company serving Uttar Pradesh and Pan-India.",
    images: ["/og-image.svg"],
  },
};

const values = [
  {
    title: "We Manage, You Don't Monitor",
    desc: "Once a campaign launches, you shouldn't need to chase for status. We send weekly proactive updates detailing your exact spend and leads.",
    icon: Target,
  },
  {
    title: "Zero Locked-In Contracts",
    desc: "Every service is billed on its own month-to-month. Scale what delivers positive ROI, adjust what needs tuning — no forced retainers.",
    icon: ShieldCheck,
  },
  {
    title: "Rooted in Kanpur & UP",
    desc: "We understand local buying triggers, Hindi/English ad hooks, and regional search patterns that out-of-state agencies consistently miss.",
    icon: MapPin,
  },
  {
    title: "Plain-English Lead Metrics",
    desc: "Every report answers one core question: did this ad campaign generate profitable revenue for your business. No vanity impressions.",
    icon: BarChart3,
  },
];

const milestones = [
  { num: "48+", label: "Kanpur Businesses Scaled" },
  { num: "₹1.2 Cr+", label: "Tracked Client Revenue" },
  { num: "4.9/5", label: "Average Client Rating" },
  { num: "24–48h", label: "Typical Campaign Launch" },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "About Vyan Digital Agency Kanpur",
      description:
        "Learn about Vyan Digital Agency based in Panki, Kanpur. Founded to give local businesses consistent digital marketing advantages.",
      url: "https://vyandigitalagency.com/about",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://vyandigitalagency.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://vyandigitalagency.com/about",
        },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Building size={14} style={{ color: "var(--accent)" }} />
            <span>Panki, Kanpur Headquarters</span>
          </div>
          <h1>Empowering Businesses in Uttar Pradesh &amp; India With Modern Digital Growth</h1>
          <p className="lead">
            Vyan Digital Agency was founded with one clear purpose: bring enterprise-level advertising precision, high-converting Meta &amp; Google Ads, Google Maps local SEO dominance, and custom web &amp; mobile app development to businesses that want aggressive, predictable revenue growth without maintaining a bloated in-house department.
          </p>
        </div>
      </section>

      {/* Agency Story Section with High Quality Image */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 44, alignItems: "center" }}>
            <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Vyan Digital Agency Team Strategy Session"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="card-img-overlay"></div>
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(15, 19, 32, 0.9)", backdropFilter: "blur(10px)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Award size={20} style={{ color: "var(--accent)" }} />
                  <div>
                    <strong style={{ fontSize: "0.92rem", display: "block", color: "var(--text)" }}>Headquartered in Kanpur</strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Behind Cambridge School, Shatabdi Nagar, Panki</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-head" style={{ marginBottom: 20 }}>
                <h2>Why We Exist</h2>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.65, marginBottom: 16 }}>
                Most local businesses in Kanpur don&apos;t need a bloated 20-person corporate agency.
                They need someone to set up high-converting Meta Ads, keep their Google Maps listing ranking #1,
                and ensure their incoming phone calls and WhatsApp messages convert into paying clients.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.65, marginBottom: 24 }}>
                That&apos;s the exact gap Vyan fills. Instead of bouncing between 5 different unvetted freelancers
                for web design, ad management, and graphic design, our cohesive team manages all digital touchpoints together.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 24 }}>
                {milestones.map((m, idx) => (
                  <div key={idx} style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: "16px", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)" }}>
                      {m.num}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Core Values Grid */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>Core Principles</span>
            </div>
            <h2>How We Operate Every Campaign</h2>
            <p className="text-muted">
              Built on transparency, local accountability, and measurable return on investment.
            </p>
          </div>

          <div className="grid-4">
            {values.map((v) => {
              const ValueIcon = v.icon;
              return (
                <div className="modern-card" key={v.title}>
                  <div className="icon-box">
                    <ValueIcon size={22} />
                  </div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Local Kanpur Advantage */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              <span>Geographic Edge</span>
            </div>
            <h2>The Local Kanpur Advantage</h2>
            <p className="text-muted">
              Why partnering with a local agency outperforms hiring distant metro agencies.
            </p>
          </div>

          <div className="grid-3">
            <div className="modern-card">
              <div className="icon-box">
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>Face-to-Face Meetings</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                You can visit our office behind Cambridge School in Shatabdi Nagar, Panki or request in-person strategy reviews. Real humans, real accountability.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>UP Consumer Nuances</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                We understand the local price points, colloquial Hindi phrases, and festival seasons that trigger high conversions in Kanpur, Lucknow, and surrounding districts.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>Immediate WhatsApp Responses</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                No submitting support tickets or waiting 72 hours for an offshore rep. Reach out directly on call or WhatsApp and get immediate answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Visit & Consultation Banner */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band" style={{ background: "linear-gradient(145deg, #171E33 0%, #111524 100%)" }}>
            <div>
              <div className="showcase-tag" style={{ marginBottom: 12 }}>
                <Clock size={12} />
                <span>Visit Us in Panki</span>
              </div>
              <h2>Want to meet in person or discuss your business?</h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "56ch" }}>
                Our office is located Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur.
                Call us at +91 96548 80240 or book a free discovery meeting.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-icon">
                <span>Book In-Person Meeting</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I'd%20like%20to%20visit%20your%20office%20in%20Panki"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
              >
                <MessageCircle size={16} />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
