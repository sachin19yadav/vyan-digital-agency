import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  TrendingUp,
  Smartphone,
  CheckCircle2,
  Target,
  ShieldCheck,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  Star,
  Award,
  Zap,
  Building2,
  Users,
  BarChart3,
  Layers,
  ChevronRight
} from "lucide-react";

import { getAllLocations, getLocationBySlug, getUPLocations, getNationalLocations } from "@/data/locations";
import ContactForm from "@/components/ContactForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyandigitalagency.com";

export async function generateStaticParams() {
  const allLocations = getAllLocations();
  return allLocations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }) {
  const loc = getLocationBySlug(params.slug);
  if (!loc) return {};

  const pageUrl = `${siteUrl}/locations/${loc.slug}`;

  return {
    title: `${loc.title}`,
    description: loc.metaDescription,
    keywords: [
      ...loc.keywords,
      "Marketing Agency",
      "Digital Marketing Agency",
      "Digital Agency",
      "Ads Agency",
      "Top Marketing Agency",
      "Best Ads Agency",
      "Performance Marketing Agency",
      "Mobile App Development",
      `Digital Marketing ${loc.name}`,
      `Ads Agency ${loc.name}`
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${loc.metaTitle} | Vyan Digital`,
      description: loc.metaDescription,
      url: pageUrl,
      siteName: "Vyan Digital Agency",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${loc.name} Top Digital Marketing Agency & Ads Agency`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${loc.metaTitle} | Vyan Digital`,
      description: loc.metaDescription,
      images: ["/og-image.svg"],
    },
  };
}

export default function LocationPage({ params }) {
  const loc = getLocationBySlug(params.slug);
  if (!loc) {
    notFound();
  }

  const upLocations = getUPLocations().filter((item) => item.slug !== loc.slug).slice(0, 8);
  const otherLocations = getNationalLocations().filter((item) => item.slug !== loc.slug).slice(0, 8);

  const localJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService", "AdvertisingAgency"],
        "@id": `${siteUrl}/locations/${loc.slug}#agency`,
        name: `Vyan Digital Agency — Top Digital Marketing & Ads Agency in ${loc.name}`,
        url: `${siteUrl}/locations/${loc.slug}`,
        logo: `${siteUrl}/logo.svg`,
        image: `${siteUrl}/og-image.svg`,
        description: loc.metaDescription,
        telephone: "+91-9654880240",
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Credit Card, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          addressLocality: loc.name,
          addressRegion: loc.state,
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.geo.latitude,
          longitude: loc.geo.longitude,
        },
        areaServed: [
          { "@type": "City", name: loc.name },
          { "@type": "AdministrativeArea", name: loc.state },
          { "@type": "Country", name: "India" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Digital Marketing, Ads & App Development Services in ${loc.name}`,
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads (Facebook & Instagram)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Search, Display & YouTube Ads" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: `Google Maps SEO & Local Optimization in ${loc.name}` } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation Funnels" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Website Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile & Web App Development (Android & iOS)" } },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "58",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: loc.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link href="/locations" style={{ color: "var(--muted)", textDecoration: "none" }}>Locations</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>{loc.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ paddingBottom: 60 }}>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                <Sparkles size={14} style={{ color: "var(--accent)" }} />
                <span>#1 Rated Marketing &amp; Ads Agency in {loc.name}, {loc.state}</span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.15, marginBottom: 20 }}>
                Top Digital Marketing &amp; Ads Agency in{" "}
                <span className="text-gradient">{loc.name}</span>
              </h1>

              <p className="lead" style={{ fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 24, color: "var(--text)" }}>
                {loc.tagline} We combine high-ROI Meta Ads, Google Ads, Google Maps SEO, and custom Android &amp; iOS mobile apps to help businesses in {loc.name} dominate their competitors.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 30 }}>
                <Link href="#contact-section" className="btn btn-primary">
                  <span>Get Free {loc.name} Strategy Audit</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={`https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20grow%20my%20business%20in%20${encodeURIComponent(loc.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Consultation</span>
                </a>
              </div>

              {/* Key Trust Signals */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, paddingTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem" }}>
                  <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
                  <span>Google &amp; Meta Verified</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem" }}>
                  <TrendingUp size={18} style={{ color: "#22c55e" }} />
                  <span>4.8x Average Client ROAS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem" }}>
                  <Zap size={18} style={{ color: "var(--accent)" }} />
                  <span>24-Hour Fast Launch</span>
                </div>
              </div>
            </div>

            {/* Live Agency Performance Card */}
            <div>
              <div className="hero-live-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={18} style={{ color: "var(--accent)" }} />
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{loc.name} Growth Hub</span>
                  </div>
                  <div className="live-badge">
                    <span className="pulse-dot"></span>
                    <span>ACTIVE CAMPAIGNS</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: "rgba(15, 19, 32, 0.7)", padding: 14, borderRadius: 10, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 4 }}>AVG. COST PER LEAD</div>
                    <div style={{ fontSize: "1.45rem", fontWeight: 700, color: "#22c55e" }}>₹38 – ₹72</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--accent)", marginTop: 2 }}>↓ 48% vs Industry Avg</div>
                  </div>
                  <div style={{ background: "rgba(15, 19, 32, 0.7)", padding: 14, borderRadius: 10, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginBottom: 4 }}>TARGET ROAS</div>
                    <div style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--accent)" }}>4.8x</div>
                    <div style={{ fontSize: "0.72rem", color: "#22c55e", marginTop: 2 }}>Verified E-Com &amp; Leads</div>
                  </div>
                </div>

                <div style={{ background: "rgba(15, 19, 32, 0.7)", padding: 16, borderRadius: 10, border: "1px solid var(--border)", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.85rem" }}>
                    <span style={{ color: "var(--muted)" }}>Target Commercial Reach</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{loc.name} &amp; {loc.state}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {loc.commercialZones.map((zone, idx) => (
                      <span key={idx} style={{ background: "var(--card-hover)", padding: "4px 8px", borderRadius: 4, fontSize: "0.75rem", border: "1px solid var(--border)" }}>
                        {zone}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--muted)" }}>
                  <span>Dedicated {loc.name} Growth Manager</span>
                  <a href="tel:+919654880240" style={{ color: "var(--accent)", fontWeight: 600 }}>+91 96548 80240</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Commercial Analysis Section */}
      <section style={{ padding: "60px 0", background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-header" style={{ maxWidth: 840, margin: "0 auto 40px", textAlign: "center" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Market Intelligence</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Why Businesses in <span className="text-gradient">{loc.name}</span> Are Switching to Vyan Digital
            </h2>
            <p className="text-muted" style={{ marginTop: 12 }}>
              {loc.marketInsight}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {/* Commercial Hubs Card */}
            <div className="modern-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div className="icon-box" style={{ width: 40, height: 40 }}>
                  <MapPin size={20} />
                </div>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>High-Demand Hubs in {loc.name}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 14 }}>
                We run geo-fenced Meta and Google Ads specifically targeting shoppers, parents, and decision-makers in:
              </p>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.9rem", color: "var(--text)" }}>
                {loc.commercialZones.map((zone, i) => (
                  <li key={i} style={{ marginBottom: 6 }}><strong>{zone}</strong></li>
                ))}
              </ul>
            </div>

            {/* Industries Served Card */}
            <div className="modern-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div className="icon-box" style={{ width: 40, height: 40 }}>
                  <Building2 size={20} />
                </div>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Top Industries Scaled</h3>
              </div>
              <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 14 }}>
                Proven growth playbooks with documented lower CPL and higher sales volume across:
              </p>
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: "0.9rem", color: "var(--text)" }}>
                {loc.primaryIndustries.map((ind, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{ind}</li>
                ))}
              </ul>
            </div>

            {/* The Vyan Advantage Card */}
            <div className="modern-card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div className="icon-box" style={{ width: 40, height: 40 }}>
                  <Award size={20} />
                </div>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>The Vyan Advantage</h3>
              </div>
              <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: 14 }}>
                Unlike distant metro agencies that overcharge, or inexperienced freelancers who fail to deliver:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.88rem" }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                  <span><strong>Zero vanity metrics</strong> — we optimize for sales, booked appointments, and real phone calls.</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                  <span><strong>Bilingual ad creatives</strong> in Hindi &amp; English tailored to regional psychology.</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                  <span><strong>WhatsApp lead bots</strong> that contact prospects within 30 seconds of form fill.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Services Tailored for Location */}
      <section style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 50px" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Complete Growth Suite</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Full-Stack Digital Growth &amp; Tech Services in <span className="text-gradient">{loc.name}</span>
            </h2>
            <p className="text-muted">
              Everything your {loc.name} business needs to acquire customers, automate sales, and scale seamlessly.
            </p>
          </div>

          <div className="service-cards-grid">
            {/* Service 1: Meta Ads */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=700&q=80"
                  alt={`Meta Ads Agency in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><TrendingUp size={22} /></div>
                <h3>Meta Ads (Facebook &amp; Instagram) in {loc.name}</h3>
                <p>Pinpoint audience targeting across {loc.name}, thumb-stopping reels creatives, and continuous split testing to drive leads under ₹50.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Hyper-local {loc.name} pin-code targeting</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> High-converting video reels &amp; image carousels</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Instant WhatsApp &amp; Lead Form integration</li>
                </ul>
              </div>
            </div>

            {/* Service 2: Google Ads */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80"
                  alt={`Google Ads Agency in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><Target size={22} /></div>
                <h3>Google Search &amp; Display Ads</h3>
                <p>Capture high-intent buyers in {loc.name} right when they search for your products and services with negative-keyword scrubbed PPC campaigns.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Buyer-intent search keyword bidding</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Google Call-Only Ads for immediate phone rings</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Retargeting banners across YouTube &amp; websites</li>
                </ul>
              </div>
            </div>

            {/* Service 3: Google Maps SEO */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=700&q=80"
                  alt={`Google Maps SEO in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><MapPin size={22} /></div>
                <h3>Google Maps (GBP) Local SEO in {loc.name}</h3>
                <p>Dominate the Google 3-Pack in {loc.name}. Get ranked #1 for searches like &quot;best store near me&quot; and &quot;top clinic in {loc.name}&quot;.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Complete Google Business Profile optimization</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> 5-star customer review generation system</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Local citation building across Indian directories</li>
                </ul>
              </div>
            </div>

            {/* Service 4: Mobile & Web App Development */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80"
                  alt={`Mobile App Development Company in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><Smartphone size={22} /></div>
                <h3>Mobile &amp; Web App Development</h3>
                <p>Custom Android &amp; iOS applications, e-commerce stores, coaching LMS, and field operations ERP built with Flutter, React Native, and Next.js.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Android &amp; iOS Apps on Play Store / App Store</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> UPI, Razorpay &amp; Payment Gateway integrations</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Real-time push notifications &amp; live tracking</li>
                </ul>
              </div>
            </div>

            {/* Service 5: WhatsApp Automation */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=700&q=80"
                  alt={`WhatsApp Automation in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><MessageCircle size={22} /></div>
                <h3>WhatsApp CRM &amp; Lead Bots</h3>
                <p>Engage every customer within 30 seconds. Automated catalogs, brochure delivery, instant quote calculators, and automated payment links.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Official WhatsApp Cloud API integration</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Automated lead qualification questionnaires</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Google Sheets &amp; CRM live sync</li>
                </ul>
              </div>
            </div>

            {/* Service 6: High-Speed Web Development */}
            <div className="service-card-modern">
              <div className="card-img-wrap">
                <Image
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80"
                  alt={`Website Development in ${loc.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="service-card-content">
                <div className="icon-box"><Layers size={22} /></div>
                <h3>High-Speed Websites &amp; Landing Pages</h3>
                <p>Sub-second load times engineered with Next.js. Optimized for maximum mobile conversions, organic SEO, and lead capture.</p>
                <ul className="service-deliverables">
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> 100/100 Google PageSpeed score</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> Conversion copywriting tailored to {loc.name} buyers</li>
                  <li><CheckCircle2 size={15} style={{ color: "#22c55e" }} /> SSL security, responsive mobile-first design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Development Showcase */}
      <section style={{ padding: "60px 0", background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 40px" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Enterprise Tech Solutions</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Types of Mobile &amp; Web Applications We Build in <span className="text-gradient">{loc.name}</span>
            </h2>
            <p className="text-muted">
              From local retail and clinic booking systems to enterprise field-sales ERPs and high-traffic e-commerce platforms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>E-Commerce &amp; Retail Apps</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                Custom shopping apps with 1-click UPI checkout, cart abandonment push notifications, and live inventory sync for {loc.name} retailers.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: React Native, Flutter, Node.js, Razorpay</div>
            </div>

            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Coaching &amp; Institute LMS Apps</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                Secure online class streaming with screen-recording prevention, chapter tests, attendance records, and student fee payment gateway.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: Flutter, AWS CloudFront, Next.js, Firebase</div>
            </div>

            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Clinic &amp; Hospital Booking Apps</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                Doctor appointment scheduling, digital prescription storage, tele-consultation video calls, and automated WhatsApp reminders.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: Next.js, React Native, Twilio, PostgreSQL</div>
            </div>

            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Field Sales &amp; Business ERP Apps</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                GPS sales team tracking, digital billing and receipt generation, distributor orders, and offline-first mobile sync for {loc.name} distributors.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: Flutter, Node.js, Google Maps API, SQLite</div>
            </div>

            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>On-Demand Services &amp; Delivery</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                Customer app, delivery partner app, and central admin portal with live GPS map tracking and instant notifications.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: React Native, Socket.io, Firebase, Razorpay</div>
            </div>

            <div className="modern-card" style={{ padding: 22 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Custom SaaS &amp; Business Portals</div>
              <p className="text-muted" style={{ fontSize: "0.88rem", marginBottom: 10 }}>
                Cloud dashboards, multi-user role management, subscription billing, and automated customer communication workflows.
              </p>
              <div style={{ fontSize: "0.78rem", color: "var(--text)" }}>Stack: Next.js, Tailwind, Supabase, Stripe / Razorpay</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 40px" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Performance Comparison</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Why {loc.name} Brands Choose Vyan Digital
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr style={{ background: "var(--card)", borderBottom: "2px solid var(--border)" }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "0.95rem" }}>Growth Factor</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "0.95rem", color: "var(--accent)" }}>Vyan Digital Agency</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "0.95rem", color: "var(--muted)" }}>Inexperienced Freelancers</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "0.95rem", color: "var(--muted)" }}>Expensive Metro Agencies</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>Commercial Insight in {loc.name}</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "#22c55e", fontWeight: 600 }}>Deep Local Expertise</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Limited or Surface-Level</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Zero Local Knowledge</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>Lead Qualification System</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "#22c55e", fontWeight: 600 }}>2-Step Filter + WhatsApp CRM</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Basic Forms (Lots of Spam)</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Complex Enterprise Tools</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>Bilingual Creatives (Hindi + Eng)</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "#22c55e", fontWeight: 600 }}>Yes — High Conversion Copy</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Generic Canva Templates</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>English Only (Low Tier 2 ROI)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>Web &amp; Mobile App Engineering</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "#22c55e", fontWeight: 600 }}>In-House Full-Stack Team</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Outsourced / None</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Exorbitant Additional Fees</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px 20px", fontWeight: 600 }}>Reporting &amp; Support</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "#22c55e", fontWeight: 600 }}>Daily WhatsApp + Live Dashboard</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Irregular &amp; Unreliable</td>
                  <td style={{ padding: "16px 20px", textAlign: "center", color: "var(--muted)" }}>Monthly PDF Reports Only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Localized FAQ Accordion */}
      <section style={{ padding: "60px 0", background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-header" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 40px" }}>
            <div className="badge" style={{ marginBottom: 10 }}>Got Questions?</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
              Frequently Asked Questions About Marketing in <span className="text-gradient">{loc.name}</span>
            </h2>
          </div>

          <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
            {loc.faqs.map((faq, index) => (
              <details key={index} className="faq-item" style={{ background: "var(--bg)", padding: "18px 20px", borderRadius: 8, border: "1px solid var(--border)" }}>
                <summary style={{ fontWeight: 600, fontSize: "1.05rem", cursor: "pointer", color: "var(--text)" }}>
                  {faq.q}
                </summary>
                <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {faq.a}
                </p>
              </details>
            ))}

            <details className="faq-item" style={{ background: "var(--bg)", padding: "18px 20px", borderRadius: 8, border: "1px solid var(--border)" }}>
              <summary style={{ fontWeight: 600, fontSize: "1.05rem", cursor: "pointer", color: "var(--text)" }}>
                How do we track and measure ROI from our campaigns?
              </summary>
              <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.6, fontSize: "0.95rem" }}>
                You get a 24/7 real-time Google Looker Studio dashboard tracking ad impressions, clicks, lead submissions, cost-per-lead, and sales conversions. Plus, our growth team provides daily updates via a dedicated WhatsApp group.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Direct Contact & Strategy Audit Section */}
      <section id="contact-section" style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="badge" style={{ marginBottom: 12 }}>Claim Your Market</div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)", marginBottom: 16 }}>
                Ready to Dominate <span className="text-gradient">{loc.name}</span>?
              </h2>
              <p className="text-muted" style={{ lineHeight: 1.65, marginBottom: 24 }}>
                Schedule a 100% free growth audit. We will analyze your current Google ranking, inspect your competitor ad campaigns in {loc.name}, and deliver a custom 90-day scale roadmap.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 30 }}>
                <div className="quick-contact-card">
                  <div className="icon-box"><Phone size={20} /></div>
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Direct Phone Support</div>
                    <a href="tel:+919654880240" style={{ fontWeight: 700, fontSize: "1.1rem" }}>+91 96548 80240</a>
                  </div>
                </div>

                <div className="quick-contact-card">
                  <div className="icon-box"><MessageCircle size={20} /></div>
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Instant WhatsApp Chat</div>
                    <a
                      href={`https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20grow%20my%20business%20in%20${encodeURIComponent(loc.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--accent)" }}
                    >
                      Chat with Growth Director
                    </a>
                  </div>
                </div>

                <div className="quick-contact-card">
                  <div className="icon-box"><MapPin size={20} /></div>
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>Agency Headquarters</div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>Shatabdi Nagar, Panki, Kanpur, UP 208020</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Serving {loc.name}, {loc.state} &amp; Pan-India</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="modern-card" style={{ padding: 28 }}>
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: 6 }}>Book Free Strategy Audit for {loc.name}</h3>
                  <p className="text-muted" style={{ fontSize: "0.88rem" }}>
                    Fill out the form below. We will review your business and reply in 15 minutes.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links to Other Cities */}
      <section style={{ padding: "50px 0", background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: 6 }}>Explore More Growth Hubs Across {loc.state}</h3>
            <p className="text-muted" style={{ fontSize: "0.88rem" }}>
              See how Vyan Digital helps brands dominate neighboring commercial markets:
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 30 }}>
            {upLocations.map((item) => (
              <Link
                key={item.slug}
                href={`/locations/${item.slug}`}
                style={{
                  padding: "8px 14px",
                  borderRadius: 6,
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <MapPin size={12} style={{ color: "var(--accent)" }} />
                <span>Digital Agency in {item.name}</span>
              </Link>
            ))}
          </div>

          {otherLocations.length > 0 && (
            <>
              <div style={{ marginBottom: 14 }}>
                <h4 style={{ fontSize: "1.05rem", color: "var(--muted)" }}>National Commercial Hubs in India</h4>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {otherLocations.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/locations/${item.slug}`}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 6,
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6
                    }}
                  >
                    <Building2 size={12} style={{ color: "var(--accent)" }} />
                    <span>Marketing Agency in {item.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
