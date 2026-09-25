import Link from "next/link";
import {
  MapPin,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from "lucide-react";

import { getUPLocations, getNationalLocations } from "@/data/locations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyandigitalagency.com";

export const metadata = {
  title: "Service Locations | Top Digital Marketing & Ads Agency in Uttar Pradesh & India",
  description:
    "Explore Vyan Digital Agency's service network across Uttar Pradesh (Lucknow, Kanpur, Noida, Varanasi, Agra) and top commercial hubs in India (Delhi NCR, Mumbai, Bengaluru, Jaipur). High-ROI Meta Ads, Google Ads & custom apps.",
  keywords: [
    "Digital Marketing Agency Locations",
    "Top Marketing Agency Uttar Pradesh",
    "Best Ads Agency India",
    "Digital Marketing Agency Lucknow",
    "Digital Agency Noida",
    "Marketing Agency Varanasi",
    "Ads Agency Agra",
    "Digital Marketing Agency Kanpur",
    "Performance Marketing India"
  ],
  alternates: {
    canonical: `${siteUrl}/locations`,
  },
  openGraph: {
    title: "Service Locations | Top Digital Marketing & Ads Agency in Uttar Pradesh & India",
    description:
      "Vyan Digital delivers high-ROI Meta Ads, Google Ads, local SEO, and mobile app development across all major cities of Uttar Pradesh and commercial hubs in India.",
    url: `${siteUrl}/locations`,
    siteName: "Vyan Digital Agency",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vyan Digital Service Locations across Uttar Pradesh & India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function LocationsHubPage() {
  const upLocations = getUPLocations();
  const nationalLocations = getNationalLocations();

  return (
    <>
      {/* Header Banner */}
      <section className="hero" style={{ paddingBottom: 50 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
          <div className="badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            <span>Pan-India &amp; Uttar Pradesh Growth Network</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", lineHeight: 1.15, marginBottom: 20 }}>
            Top Digital Marketing &amp; Ads Agency Across{" "}
            <span className="text-gradient">Uttar Pradesh &amp; India</span>
          </h1>

          <p className="lead" style={{ fontSize: "1.18rem", lineHeight: 1.6, marginBottom: 30, color: "var(--text)" }}>
            Whether you operate in Lucknow, Kanpur, Noida, Varanasi, or major metros across India, Vyan Digital delivers data-driven Meta Ads, Google Ads, Google Maps SEO, and bespoke mobile apps to help you capture market dominance.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="#uttar-pradesh" className="btn btn-primary">
              <span>View Uttar Pradesh Hubs</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="#national-hubs" className="btn btn-outline">
              <span>Pan-India Metros</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "30px 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)" }}>16+</div>
              <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Uttar Pradesh Cities Served</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>4.8x</div>
              <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Average Client ROAS</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)" }}>₹38</div>
              <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Average Cost-Per-Lead</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>24 Hours</div>
              <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Fast Campaign Onboarding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Uttar Pradesh Locations Section */}
      <section id="uttar-pradesh" style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="badge" style={{ marginBottom: 10 }}>Priority Region</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Uttar Pradesh <span className="text-gradient">Commercial Hubs</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: 750 }}>
              Hyper-local performance marketing, pin-code targeted ads, and high-speed web &amp; mobile software built for businesses across Uttar Pradesh.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {upLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="modern-card"
                style={{ padding: 22, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="icon-box" style={{ width: 34, height: 34 }}>
                        <MapPin size={18} />
                      </div>
                      <h3 style={{ fontSize: "1.15rem", margin: 0, color: "var(--text)" }}>{loc.name}</h3>
                    </div>
                    <span style={{ fontSize: "0.75rem", background: "var(--card-hover)", padding: "3px 8px", borderRadius: 4, color: "var(--accent)" }}>
                      {loc.region}
                    </span>
                  </div>

                  <p className="text-muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, marginBottom: 14 }}>
                    {loc.metaDescription.slice(0, 110)}...
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {loc.commercialZones.slice(0, 3).map((zone, zIdx) => (
                      <span key={zIdx} style={{ fontSize: "0.72rem", background: "rgba(15, 19, 32, 0.7)", padding: "2px 6px", borderRadius: 3, border: "1px solid var(--border)" }}>
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontSize: "0.88rem", fontWeight: 600, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  <span>View {loc.name} Growth Services</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pan-India Metros Section */}
      <section id="national-hubs" style={{ padding: "70px 0", background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="badge" style={{ marginBottom: 10 }}>Pan-India Reach</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Major Commercial Metros &amp; <span className="text-gradient">State Capitals</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: 750 }}>
              Scalable performance advertising, custom e-commerce apps, and B2B growth engines for enterprises and high-growth brands across India.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {nationalLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="modern-card"
                style={{ padding: 22, textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="icon-box" style={{ width: 34, height: 34 }}>
                        <Building2 size={18} />
                      </div>
                      <h3 style={{ fontSize: "1.15rem", margin: 0, color: "var(--text)" }}>{loc.name}</h3>
                    </div>
                    <span style={{ fontSize: "0.75rem", background: "var(--card-hover)", padding: "3px 8px", borderRadius: 4, color: "var(--accent)" }}>
                      {loc.state}
                    </span>
                  </div>

                  <p className="text-muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, marginBottom: 14 }}>
                    {loc.metaDescription.slice(0, 110)}...
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {loc.commercialZones.slice(0, 3).map((zone, zIdx) => (
                      <span key={zIdx} style={{ fontSize: "0.72rem", background: "rgba(15, 19, 32, 0.7)", padding: "2px 6px", borderRadius: 3, border: "1px solid var(--border)" }}>
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", fontSize: "0.88rem", fontWeight: 600, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  <span>View {loc.name} Growth Services</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How Our Remote & Hybrid Delivery Works */}
      <section style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 50px" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Seamless Collaboration</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              How We Scale Businesses Anywhere in India
            </h2>
            <p className="text-muted">
              You get the dedication of an in-house team backed by elite digital marketing tools and real-time accountability.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div className="modern-card" style={{ padding: 24 }}>
              <div className="icon-box" style={{ marginBottom: 16 }}><Zap size={22} /></div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>1. 24-Hour Kickoff</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                We onboard your business, analyze your local competitors, craft initial ad creatives, and build campaign architecture within 24 hours.
              </p>
            </div>

            <div className="modern-card" style={{ padding: 24 }}>
              <div className="icon-box" style={{ marginBottom: 16 }}><ShieldCheck size={22} /></div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>2. Dedicated Growth Manager</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                A dedicated senior strategist is assigned to your account, available daily on WhatsApp and phone for immediate adjustments.
              </p>
            </div>

            <div className="modern-card" style={{ padding: 24 }}>
              <div className="icon-box" style={{ marginBottom: 16 }}><TrendingUp size={22} /></div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>3. Real-Time Live Dashboard</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                Monitor your ad spend, clicks, leads, and customer acquisition cost 24/7 on an encrypted Google Looker Studio dashboard.
              </p>
            </div>

            <div className="modern-card" style={{ padding: 24 }}>
              <div className="icon-box" style={{ marginBottom: 16 }}><CheckCircle2 size={22} /></div>
              <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>4. Continuous Optimization</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                We conduct weekly A/B tests on creatives, copy, and audience demographics to push down your CPL and expand your profit margin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
