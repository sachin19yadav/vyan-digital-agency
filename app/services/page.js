import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  Search,
  MapPin,
  Users,
  PlayCircle,
  Bot,
  Globe,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Clock,
  Layers,
  Smartphone,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Cpu,
} from "lucide-react";

export const metadata = {
  title: "Digital Marketing, Ads Agency & App Development Services",
  description:
    "Explore our 8 full-stack digital marketing and tech services across Uttar Pradesh and India: Meta Ads, Google Ads PPC, Google Maps Local SEO, Social Media Handling, WhatsApp Automation, Custom Web Development, and Android/iOS App Development.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Marketing, Ads Agency & App Development Services | Vyan Digital Agency",
    description:
      "High-ROI Meta Ads, Google Ads, Google Maps 3-Pack SEO, WhatsApp business chatbots, and custom Android/iOS apps for businesses across Uttar Pradesh and India.",
    url: "/services",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vyan Digital Agency Growth & Tech Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing, Ads Agency & App Development Services | Vyan Digital Agency",
    description: "High-ROI Meta Ads, Google Ads, Maps SEO, and custom Android/iOS apps for businesses across UP and India.",
    images: ["/og-image.svg"],
  },
};

const services = [
  {
    title: "Meta Ads (Facebook & Instagram)",
    category: "Paid Social Growth",
    desc: "We plan, design and run laser-targeted ad campaigns across Facebook and Instagram — built around who actually buys from you in Kanpur, Uttar Pradesh & Pan-India. We create custom ad videos, carousels, and manage weekly budget scaling.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80",
    icon: Megaphone,
    deliverables: [
      "Kanpur & regional geo-radius demographic audience segmentation",
      "Custom ad creative design (motion graphics, carousel & reels format)",
      "A/B split testing of ad copy, hooks, and call-to-actions",
      "Weekly ROAS optimization and budget scaling",
    ],
    idealFor: "Coaching Institutes, Doctors & Clinics, Real Estate, Fashion Boutiques",
  },
  {
    title: "Google Ads (Search, Display & YouTube)",
    category: "High-Intent Lead Gen",
    desc: "Search ads that place your business in front of customers actively typing what you sell right now. Set up with exact-match keywords, negative keyword filters, and conversion tracking so no rupee is wasted.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    icon: Search,
    deliverables: [
      "High-intent keyword research for Kanpur & Uttar Pradesh",
      "Ad copywriting with extensions (call buttons, location, sitelinks)",
      "Strict negative keyword list to eliminate junk clicks",
      "Real-time lead conversion and phone call tracking",
    ],
    idealFor: "Doctors, Lawyers, Manufacturers, Contractors, Urgent Local Services",
  },
  {
    title: "Google Maps Business Profile Listing",
    category: "Local SEO & 3-Pack Ranking",
    desc: "We create, verify, or fix your Google Business Profile — correct primary categories, localized geo-tagged photos, service areas, and an automated customer review engine to make you rank #1 for 'near me' queries.",
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80",
    icon: MapPin,
    deliverables: [
      "Google Business Profile claim, verification, and category audit",
      "High-ranking geo-tagged photo uploads and weekly Google Posts",
      "Automated WhatsApp review request system to generate 5-star ratings",
      "Local citation building and Google Maps duplicate cleanup",
    ],
    idealFor: "Retail Stores, Restaurants & Cafes, Clinics, Automobile Showrooms",
  },
  {
    title: "Facebook & Instagram Account Handling",
    category: "Organic Social Presence",
    desc: "Day-to-day management of your business page: monthly content calendar, professional graphic design, and swift inbox/comment responses — keeping your brand active, trustworthy, and engaging.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80",
    icon: Users,
    deliverables: [
      "12-16 custom branded graphics & reels per month",
      "Engaging captions written in English & conversational Hindi",
      "Daily comment monitoring and message inbox management",
      "Profile banner, highlight icons, and call-to-action button setup",
    ],
    idealFor: "Local Brands, Coaching Centers, Gyms, Event Organizers",
  },
  {
    title: "YouTube Channel Handling & Video Production",
    category: "Video Authority & SEO",
    desc: "Channel setup, video upload scheduling, click-worthy custom thumbnails, and SEO descriptions handled end-to-end. Perfect for business owners wanting a powerful YouTube channel without the editing and upload headache.",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80",
    icon: PlayCircle,
    deliverables: [
      "High-CTR thumbnail design for desktop & mobile feeds",
      "Keyword-researched titles, chapters, and SEO descriptions",
      "End-screens, playlist organization, and card placement",
      "Monthly subscriber growth and audience retention reports",
    ],
    idealFor: "Educators, Doctors, Consultants, Real Estate Developers",
  },
  {
    title: "Business Automation Agents & WhatsApp Bots",
    category: "WhatsApp & AI Automations",
    desc: "We build WhatsApp and web chat automations that respond to customer inquiries within seconds, qualify lead intent, collect contact numbers, and follow up automatically while you focus on core operations.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80",
    icon: Bot,
    deliverables: [
      "Official WhatsApp Cloud API bot configuration",
      "Instant FAQ auto-replies (pricing, location, services)",
      "Direct Google Sheets & CRM lead sync with alert notifications",
      "Automated follow-up drip sequences for unclosed leads",
    ],
    idealFor: "High-volume inquiry businesses, Coaching Institutes, Clinics, Real Estate",
  },
  {
    title: "Custom Website Development",
    category: "Web & Landing Page Dev",
    desc: "A modern, lightning-fast, mobile-first website designed to turn local visitors into paying clients. Built with Next.js, clean SEO markup, and one-click WhatsApp/Call inquiry buttons.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    icon: Globe,
    deliverables: [
      "100% responsive, high-speed mobile & desktop design",
      "Direct WhatsApp and click-to-call conversion integration",
      "Complete On-Page SEO and Google Search Console setup",
      "Fast cloud hosting, SSL security, and custom domain connection",
    ],
    idealFor: "Local Businesses without modern sites, Service Providers, Startups",
  },
  {
    title: "Mobile & Web App Development",
    category: "Android & iOS Applications",
    desc: "End-to-end custom mobile and web applications engineered for performance, security, and exceptional user experience. From native Android & iOS to cross-platform Flutter and React Native apps, we build scalable solutions with integrated payments, authentication, and live admin panels.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    icon: Smartphone,
    deliverables: [
      "Cross-platform Android & iOS development (Flutter / React Native)",
      "Custom UI/UX interactive wireframing & conversion-focused app screens",
      "Payment gateway integration (UPI, Razorpay, Paytm, Credit/Debit Cards)",
      "Google Play Store & Apple App Store launch, compliance, and ongoing updates",
    ],
    idealFor: "Coaching Institutes, E-Commerce Brands, Clinics, Delivery & Booking Businesses, Startups",
  },
];

const appTypes = [
  {
    title: "E-Commerce & Quick Delivery Apps",
    desc: "Feature-packed online shopping apps with product catalogs, smart search, one-click UPI checkout, and live order tracking.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    icon: ShoppingBag,
    features: ["Cart & Multi-payment Gateway", "Delivery Partner Real-time GPS", "Customer Push Notifications"],
  },
  {
    title: "Coaching, LMS & Educational Apps",
    desc: "Custom learning apps for coaching institutes with encrypted video lecture streaming, mock test series, and student analytics.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    icon: GraduationCap,
    features: ["DRM Video Protection (Anti-piracy)", "Interactive Tests & Scorecards", "PDF Notes & Doubt Chat"],
  },
  {
    title: "Healthcare & Clinic Booking Apps",
    desc: "Dedicated patient apps for doctors and multi-speciality hospitals to automate appointment slots and digital prescriptions.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    icon: Stethoscope,
    features: ["Doctor Slot Scheduling", "Prescription & Report Uploads", "Automated WhatsApp Reminders"],
  },
  {
    title: "Business ERP & Field Staff Apps",
    desc: "Internal mobile tools for Kanpur manufacturers, traders, and service teams to monitor staff, generate bills, and track stock.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    icon: Briefcase,
    features: ["GPS Geofenced Attendance", "Instant PDF Invoicing & GST", "Live Inventory & Lead CRM"],
  },
  {
    title: "On-Demand Services & Booking Apps",
    desc: "Service marketplace apps for salons, repairs, cleaning, or home maintenance with instant booking and verified provider profiles.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80",
    icon: Layers,
    features: ["Service Scheduling & Rescheduling", "OTP Service Verification", "Customer Reviews & Tips"],
  },
  {
    title: "Custom SaaS & Cloud Web Portals",
    desc: "Responsive web portals and SaaS platforms that work seamlessly across desktop browsers and mobile devices with role-based access.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    icon: Globe,
    features: ["Multi-tenant Cloud Architecture", "Role-based Admin Permissions", "Automated Analytics & Export"],
  },
];

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
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
          name: "Services",
          item: "https://www.vyandigitalagency.com/services",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Digital Marketing & App Development Services",
      description: "Complete growth marketing, advertising, and custom mobile application development services by Vyan Digital Agency.",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "Meta Ads (Facebook & Instagram Advertising)",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Social Media Advertising",
          description: "Audience targeting, creative management and weekly ad optimization across Kanpur & UP.",
        },
        {
          "@type": "Service",
          position: 2,
          name: "Google Ads (Search, Display & YouTube)",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "PPC Advertising",
          description: "High-intent search and conversion campaigns targeting buyers actively looking for your services.",
        },
        {
          "@type": "Service",
          position: 3,
          name: "Google Maps Business Listing Optimization",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Local SEO",
          description: "Google Business Profile verification, 3-Pack ranking, and 5-star review management.",
        },
        {
          "@type": "Service",
          position: 4,
          name: "Social Media Account Handling (Facebook & Instagram)",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Social Media Management",
          description: "Monthly content calendar, bilingual graphics and reels, and daily community management.",
        },
        {
          "@type": "Service",
          position: 5,
          name: "YouTube Channel Handling & Video Production",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Video Marketing",
          description: "Studio recording setup, high-CTR thumbnails, and search-optimized video titles and descriptions.",
        },
        {
          "@type": "Service",
          position: 6,
          name: "Business Automation Agents & WhatsApp Bots",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "WhatsApp Automation",
          description: "WhatsApp auto-replies, lead qualification chatbots, and instant CRM sync.",
        },
        {
          "@type": "Service",
          position: 7,
          name: "Custom Website Development",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Website Development",
          description: "Fast, mobile-responsive business websites and landing pages built with Next.js.",
        },
        {
          "@type": "Service",
          position: 8,
          name: "Mobile & Web App Development",
          provider: { "@type": "LocalBusiness", name: "Vyan Digital Agency" },
          serviceType: "Mobile Application Development",
          description: "Custom Android, iOS, and Web applications built with Flutter, React Native, and Next.js.",
        },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Layers size={14} style={{ color: "var(--accent)" }} />
            <span>Full-Stack Growth &amp; Technology Solutions</span>
          </div>
          <h1>Top Digital Marketing, Ads Agency &amp; App Development Services in UP &amp; India</h1>
          <p className="lead">
            Empowering businesses across Kanpur, Lucknow, Noida, Varanasi, and all across India with high-ROI Meta Ads, Google Ads (PPC), Google Maps local SEO, WhatsApp automation bots, and custom Android/iOS mobile application development. Pick one modular service or deploy all eight — each is engineered for measurable revenue and transparent growth.
          </p>
        </div>
      </section>

      {/* Services List as Deep Feature Cards */}
      <section className="section">
        <div className="wrap">
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {services.map((s, index) => {
              const Icon = s.icon;
              return (
                <div className="service-full-card" key={s.title}>
                  <div className="service-full-img">
                    <img src={s.image} alt={s.title} width={600} height={360} />
                    <div className="card-img-overlay"></div>
                    <span className="card-badge-top">{s.category}</span>
                  </div>

                  <div className="service-full-content">
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                      <div className="icon-box" style={{ marginBottom: 0 }}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Service 0{index + 1}
                        </span>
                        <h2 style={{ fontSize: "1.35rem", margin: 0 }}>{s.title}</h2>
                      </div>
                    </div>

                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 20 }}>
                      {s.desc}
                    </p>

                    <div style={{ marginBottom: 20 }}>
                      <strong style={{ fontSize: "0.88rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 10 }}>
                        What We Deliver:
                      </strong>
                      <ul className="card-checklist" style={{ margin: 0 }}>
                        {s.deliverables.map((item, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={16} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ padding: "10px 14px", background: "var(--bg)", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", marginBottom: 24 }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        <strong>Best Suited For:</strong> {s.idealFor}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 14, marginTop: "auto", flexWrap: "wrap" }}>
                      <Link href="/contact" className="btn btn-primary btn-icon">
                        <span>Get Started with This Service</span>
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href={`https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20am%20interested%20in%20${encodeURIComponent(s.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp btn-icon"
                      >
                        <MessageCircle size={16} />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEDICATED TYPES OF APPLICATIONS SECTION */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Smartphone size={14} style={{ color: "var(--accent)" }} />
              <span>Tailored Application Architecture</span>
            </div>
            <h2>Types of Applications We Design &amp; Develop</h2>
            <p className="text-muted">
              Whether you need a consumer-facing mobile app or an internal company workflow tool,
              we build high-performance applications built for speed, security, and seamless user adoption.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {appTypes.map((app, idx) => {
              const AppIcon = app.icon;
              return (
                <div className="service-card-modern" key={idx} style={{ display: "flex", flexDirection: "column" }}>
                  <div className="card-img-wrap" style={{ height: 180 }}>
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="service-card-content" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div className="icon-box" style={{ width: 38, height: 38, margin: 0 }}>
                        <AppIcon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.15rem", margin: 0 }}>{app.title}</h3>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 16 }}>
                      {app.desc}
                    </p>

                    <ul className="service-deliverables" style={{ marginTop: "auto", marginBottom: 20 }}>
                      {app.features.map((f, i) => (
                        <li key={i}>
                          <CheckCircle2 size={15} style={{ color: "var(--accent)" }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20am%20interested%20in%20building%20a%20${encodeURIComponent(app.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-cta-link"
                    >
                      <span>Discuss This App Architecture</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Vyan vs Generic Freelancers */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>Agency Standard</span>
            </div>
            <h2>Why Vyan Beats Fragmented Freelancers &amp; Big Distant Agencies</h2>
            <p className="text-muted">
              Here is how we protect your advertising and development budget with unified accountability.
            </p>
          </div>

          <div className="modern-card" style={{ padding: 0, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(15, 19, 32, 0.6)", borderBottom: "1px solid var(--line)" }}>
                  <th style={{ padding: "18px 24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>Growth &amp; Tech Capability</th>
                  <th style={{ padding: "18px 24px", color: "var(--accent)", fontSize: "0.95rem" }}>Vyan Digital Agency</th>
                  <th style={{ padding: "18px 24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>Disjointed Freelancers</th>
                  <th style={{ padding: "18px 24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>Distant Metro Agencies</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "0.9rem" }}>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 600 }}>Local Kanpur Presence</td>
                  <td style={{ padding: "16px 24px", color: "#4CAF7D" }}>
                    <CheckCircle2 size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                    Based in Panki, Kanpur
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Rarely local</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Zero local Kanpur context</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 600 }}>Marketing &amp; Tech Synergy</td>
                  <td style={{ padding: "16px 24px", color: "#4CAF7D" }}>
                    <CheckCircle2 size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                    All 8 services align
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Separate silos, blamestorming</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Junior account managers</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 600 }}>Direct WhatsApp &amp; Call</td>
                  <td style={{ padding: "16px 24px", color: "#4CAF7D" }}>
                    <CheckCircle2 size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                    Direct mobile / WhatsApp
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Irregular availability</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Ticketing queues, 3-day delays</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px 24px", fontWeight: 600 }}>Production Code &amp; ROI Reports</td>
                  <td style={{ padding: "16px 24px", color: "#4CAF7D" }}>
                    <CheckCircle2 size={18} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                    Full code ownership &amp; clean CPL
                  </td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>Messy code, no documentation</td>
                  <td style={{ padding: "16px 24px", color: "var(--text-muted)" }}>High hourly lock-in charges</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band" style={{ background: "linear-gradient(145deg, #171E33 0%, #111524 100%)" }}>
            <div>
              <div className="showcase-tag" style={{ marginBottom: 12 }}>
                <Clock size={12} />
                <span>Free 30-Min Strategy &amp; App Scoping Session</span>
              </div>
              <h2>Have an app or marketing project in mind?</h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "56ch" }}>
                Tell us about your business vision. We will outline the technical architecture, ad strategy, and estimated timeline within 24 hours.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-icon">
                <span>Request Project Proposal</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20consult%20about%20an%20App%20or%20Marketing%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
