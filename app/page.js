import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Star,
  MapPin,
  Users,
  Globe,
  Bot,
  PlayCircle,
  Search,
  Megaphone,
  PhoneCall,
  Zap,
  Check,
  Building2,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Briefcase,
  Layers,
  Clock,
  Award,
  Smartphone,
} from "lucide-react";

const faqs = [
  {
    q: "Why choose Vyan Digital Agency as your digital marketing agency in Kanpur?",
    a: "Vyan Digital Agency is a Kanpur-based digital growth and ads agency bringing your Meta Ads, Google Ads, Google Maps listing, social media accounts, custom websites, and mobile apps under one cohesive team. We deliver transparent, revenue-focused reporting with zero lock-in contracts.",
  },
  {
    q: "Which is the best ads agency in Kanpur for Meta Ads and Google Ads?",
    a: "Vyan Digital Agency is recognized as the best ads agency in Kanpur because we focus on cost-per-lead and return on ad spend (ROAS). We design high-converting video and carousel creatives, write localized Hindi-English ad copy, and continuously optimize budgets across Facebook, Instagram, Google Search, and YouTube.",
  },
  {
    q: "How does Vyan Digital Agency help local businesses and SMEs get more customer leads?",
    a: "We deploy precision Meta Ads (Facebook & Instagram) and Google Search Ads targeting high-intent customers in Kanpur and Uttar Pradesh. Combined with Google Business Profile ranking and automated WhatsApp follow-ups, your inbound enquiries convert into paying clients quickly.",
  },
  {
    q: "How does Google Maps SEO help local Kanpur businesses get customers searching 'near me'?",
    a: "Over 80% of local customers in Kanpur search Google for 'doctor near me', 'coaching near me', or 'showroom near me'. As a premier local SEO and digital agency, Vyan optimizes your Google Business Profile (GBP) categories, geo-tagged photos, local citations, and automated review systems to rank your business in the top 3 Google Maps pack.",
  },
  {
    q: "Do you offer custom mobile app development and website development for SMEs in Kanpur?",
    a: "Yes. Vyan Digital Agency builds custom Android and iOS mobile applications (using Flutter and React Native) as well as lightning-fast, SEO-optimized business websites using Next.js. We develop educational apps for coaching centers, e-commerce & quick delivery apps, healthcare appointment portals, and field staff ERP tools.",
  },
  {
    q: "What digital marketing and tech services does Vyan provide?",
    a: "We provide 8 core growth & tech services: Meta Ads management, Google Ads (Search, Display, YouTube), Google Maps business listing optimization, Facebook account handling, YouTube channel management, WhatsApp & CRM business automation agents, Custom Website Development, and Custom Mobile & Web App Development (Android & iOS).",
  },
  {
    q: "Where is Vyan Digital Agency located in Kanpur?",
    a: "Our agency is located Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, Uttar Pradesh 208020. Clients are welcome to visit our office or reach us on call or WhatsApp at +91 96548 80240 for a free strategy consultation.",
  },
  {
    q: "How much does digital marketing and advertising cost with Vyan for SMEs?",
    a: "Our pricing is transparent, modular, and built for businesses of all sizes from startups to established SMEs. Each service is billed independently without forced bundle packages. We also provide our practical Social Media Growth Course for ₹1,999 with referral earning options.",
  },
];

const services = [
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Targeted campaigns built around who actually buys from you in Kanpur & UP — custom creative designs, high-converting copy, and weekly optimization.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    badge: "Highest ROI",
    icon: Megaphone,
    features: [
      "Kanpur & UP local audience targeting",
      "High-converting video & carousel creatives",
      "Weekly budget & ROAS scaling",
    ],
  },
  {
    title: "Google Ads (Search & Display)",
    desc: "Put your business in front of customers actively searching for your services right now. High-intent keyword bidding with zero wasted budget.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    badge: "High Purchase Intent",
    icon: Search,
    features: [
      "Exact-intent search terms targeting",
      "Negative keyword protection",
      "Call-only ads & conversion tracking",
    ],
  },
  {
    title: "Google Maps Business Listing",
    desc: "Dominate local search in Kanpur. We optimize your Google Business Profile to rank in the top 3-pack for high-volume 'near me' searches.",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=800&q=80",
    badge: "Local SEO 3-Pack",
    icon: MapPin,
    features: [
      "Top 3 Google Maps search ranking",
      "Automated customer review system",
      "Geo-tagged photos & local citation setup",
    ],
  },
  {
    title: "Facebook Account Handling",
    desc: "End-to-end management of your brand's presence: creative content calendar, engagement posts, and instant message follow-ups.",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80",
    badge: "Brand Authority",
    icon: Users,
    features: [
      "Consistent weekly branded posts",
      "Inbox & comment reply handling",
      "Community building & page trust growth",
    ],
  },
  {
    title: "YouTube Channel Handling",
    desc: "Turn YouTube into a predictable lead channel. We handle upload scheduling, high-CTR thumbnails, SEO descriptions, and channel optimization.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    badge: "Video Marketing",
    icon: PlayCircle,
    features: [
      "Eye-catching custom thumbnails",
      "Search-optimized titles & descriptions",
      "Consistent weekly publishing workflow",
    ],
  },
  {
    title: "Business Automation Agents",
    desc: "Never lose a lead again. We deploy WhatsApp auto-replies, lead capture chatbots, and automated CRM follow-up systems that run 24/7.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    badge: "24/7 Lead Capture",
    icon: Bot,
    features: [
      "Instant WhatsApp automated greeting & FAQs",
      "Live lead sync to Google Sheets & CRM",
      "Automated follow-up drip messages",
    ],
  },
  {
    title: "Custom Website Development",
    desc: "Lightning-fast, mobile-first websites designed to turn visitors into paying customers. Fully responsive, clean code, and built for SEO.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    badge: "High Conversion",
    icon: Globe,
    features: [
      "Sub-second page load speeds",
      "Direct WhatsApp & click-to-call integration",
      "100% mobile & tablet responsive layout",
    ],
  },
  {
    title: "Mobile & Web App Development",
    desc: "Custom Android, iOS, and Web applications built for your business — e-commerce stores, coaching LMS apps, doctor clinic booking apps, and custom operational ERP/CRM systems.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    badge: "Android & iOS Apps",
    icon: Smartphone,
    features: [
      "Cross-platform Flutter / React Native & Native",
      "Coaching, E-commerce, Clinic & Booking Apps",
      "Secure payment gateway, database & admin panels",
    ],
  },
];

const industries = [
  { name: "Clinics & Doctors", icon: Stethoscope },
  { name: "Coaching & Institutes", icon: GraduationCap },
  { name: "Retail & Showrooms", icon: ShoppingBag },
  { name: "Real Estate & Builders", icon: Building2 },
  { name: "B2B & Manufacturers", icon: Briefcase },
  { name: "Local Service Providers", icon: Layers },
];

const processSteps = [
  {
    num: "01",
    title: "Market & Competitor Audit",
    desc: "We analyze your ideal Kanpur customer, local competitor ad strategies, and high-converting search keywords in your niche.",
    icon: Search,
  },
  {
    num: "02",
    title: "Funnel & Creative Architecture",
    desc: "We build scroll-stopping ad creatives, irresistible local offers, and lightning-fast WhatsApp or landing page lead funnels.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Precision Multi-Channel Launch",
    desc: "We launch geo-targeted campaigns across Meta & Google, continuously refining audiences to drive high-intent inquiries.",
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "Automated Follow-ups & Reporting",
    desc: "Inbound inquiries are instantly routed to your phone with automated WhatsApp confirmations, followed by transparent weekly ROI reports.",
    icon: BarChart3,
  },
];

const testimonials = [
  {
    quote: "Our patient appointments from Google Maps grew by over 200% within 45 days. Vyan set up our profile, reviews, and local search properly.",
    name: "Dr. R. Verma",
    business: "Dental & Cosmetology Clinic, Kanpur",
    initials: "RV",
    metric: "+210% Inbound Calls",
  },
  {
    quote: "Meta Ads brought us 340+ verified student inquiries for our batch launch in Kakadeo. Their weekly optimization saved us thousands in wasted budget.",
    name: "Amit Sachan",
    business: "Competitive Coaching Institute, Kanpur",
    initials: "AS",
    metric: "340+ Admission Inquiries",
  },
  {
    quote: "The WhatsApp automation bot answers customer questions even at 11 PM. Our enquiry-to-sale conversion has never been this smooth.",
    name: "Priya T.",
    business: "Fashion & Retail Showroom, Panki",
    initials: "PT",
    metric: "4.8x Ad Return (ROAS)",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section with Interactive Two-Column Design */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-wrapper">
            {/* Left Column: Messaging & CTAs */}
            <div>
              <div className="live-badge">
                <span className="pulse-dot"></span>
                <span>🏆 #1 Rated Digital Marketing Agency &amp; Ads Agency in Uttar Pradesh &amp; India</span>
              </div>

              <h1>Top Digital Marketing &amp; Ads Agency in Uttar Pradesh &amp; India</h1>

              <p className="lead">
                Looking for the leading <strong>digital marketing agency</strong>, <strong>ads agency</strong>, or full-service <strong>digital agency</strong>?
                Vyan Digital Agency empowers businesses across Kanpur, Lucknow, Noida, Varanasi, and all major cities in India with high-ROI Meta Ads (Facebook &amp; Instagram),
                Google Search &amp; PPC Ads, Google Maps #1 SEO ranking, 24/7 WhatsApp automation, and custom web &amp; mobile app development.
              </p>

              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary btn-icon">
                  <span>Get Free Strategy Call</span>
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20grow%20my%20business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-icon"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Directly</span>
                </a>

                <Link href="/services" className="btn btn-secondary">
                  Explore Services
                </Link>
              </div>

              {/* Social Proof & Rating Stack */}
              <div className="social-proof-wrap">
                <div className="avatar-stack">
                  <div className="avatar-circle">AS</div>
                  <div className="avatar-circle">RV</div>
                  <div className="avatar-circle">PT</div>
                  <div className="avatar-circle">MK</div>
                </div>
                <div>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F5D076" color="#F5D076" />
                    ))}
                    <span style={{ marginLeft: 6, fontWeight: 700, color: "var(--text)" }}>4.9/5</span>
                  </div>
                  <div className="rating-label">
                    Trusted by <strong>48+ local businesses</strong> in Kanpur &amp; UP
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Agency Performance Showcase Card */}
            <div>
              <div className="hero-showcase">
                <div className="showcase-header">
                  <div className="showcase-header-title">
                    <Sparkles size={18} style={{ color: "var(--accent)" }} />
                    <span>Live Agency Performance (Kanpur)</span>
                  </div>
                  <div className="showcase-tag">
                    <span className="pulse-dot" style={{ width: 6, height: 6 }}></span>
                    <span>Campaigns Active</span>
                  </div>
                </div>

                <div className="showcase-stat-grid">
                  <div className="showcase-stat-box">
                    <div className="showcase-stat-num">+1,480</div>
                    <div className="showcase-stat-label">Qualified Leads</div>
                  </div>
                  <div className="showcase-stat-box">
                    <div className="showcase-stat-num">4.8x</div>
                    <div className="showcase-stat-label">Average ROAS</div>
                  </div>
                  <div className="showcase-stat-box">
                    <div className="showcase-stat-num">₹38</div>
                    <div className="showcase-stat-label">Avg Lead Cost</div>
                  </div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Vyan Digital Agency Campaign Analytics and Lead Performance"
                  className="showcase-preview-img"
                  width={600}
                  height={160}
                />

                <div className="showcase-alert">
                  <div className="showcase-alert-icon">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="showcase-alert-text">
                      <strong>New Lead Captured:</strong> Admission enquiry delivered via WhatsApp
                    </div>
                    <div className="showcase-alert-time">2 mins ago • Kanpur Local Campaign</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Numbers Cards */}
          <div className="stat-row">
            <div className="stat">
              <b>8</b>
              <span>Growth &amp; Tech Services</span>
            </div>
            <div className="stat">
              <b>₹1.2 Cr+</b>
              <span>Tracked Revenue Generated</span>
            </div>
            <div className="stat">
              <b>24–48h</b>
              <span>Rapid Launch &amp; Response Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served Bar */}
      <section style={{ padding: "32px 0", background: "var(--bg-alt)", borderBottom: "1px solid var(--line)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 12px", fontWeight: 600 }}>
            Specialized Digital Strategies for Kanpur Industries
          </p>
          <div className="trust-chips-row">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div className="trust-chip" key={ind.name}>
                  <Icon size={16} />
                  <span>{ind.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Services Section with Modern Cards, Images & Checklists */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Layers size={14} style={{ color: "var(--accent)" }} />
              <span>Full-Stack Growth Solutions</span>
            </div>
            <h2>Everything Your Kanpur Business Needs to Win Online</h2>
            <p className="text-muted">
              Stop hiring 5 disconnected freelancers. Every channel is managed by one unified team,
              ensuring your ads, local listing, and website work together to maximize your revenue.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 28 }}>
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div className="service-card-modern" key={s.title}>
                  <div className="card-img-wrap">
                    <img src={s.image} alt={s.title} width={400} height={180} />
                    <div className="card-img-overlay"></div>
                    <span className="card-badge-top">{s.badge}</span>
                  </div>

                  <div className="card-body">
                    <div className="icon-box">
                      <Icon size={24} />
                    </div>

                    <h3 style={{ fontSize: "1.15rem", marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: 14 }}>
                      {s.desc}
                    </p>

                    <ul className="card-checklist">
                      {s.features.map((f, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className="card-cta-link">
                      <span>Get a Proposal</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/services" className="btn btn-secondary btn-icon">
              <span>View In-Depth Deliverables on Services Page</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Proven 4-Step Process Engine */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Zap size={14} style={{ color: "var(--accent)" }} />
              <span>Predictable Growth Engine</span>
            </div>
            <h2>How We Drive Measurable Results for Kanpur Businesses</h2>
            <p className="text-muted">
              From day one, our focus is simple: turn your advertising spend into predictable customer inquiries.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div className="step-card" key={step.num}>
                  <div className="step-number">{step.num}</div>
                  <div className="icon-box" style={{ width: 42, height: 42, marginBottom: 14 }}>
                    <StepIcon size={20} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Kanpur Businesses Partner with Vyan */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>The Local Advantage</span>
            </div>
            <h2>Why Kanpur Business Owners Choose Vyan</h2>
            <p className="text-muted">
              We are not an anonymous agency sitting in another state. We understand Kanpur consumers, local buying habits, and high-conversion vernacular copy.
            </p>
          </div>

          <div className="grid-3">
            <div className="modern-card">
              <div className="icon-box">
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>One Dedicated Team</h3>
              <p>
                Your Meta Ads, Google Ads, Maps listing, and website are handled together. No finger-pointing between separate vendors when numbers need improving.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <BarChart3 size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>Plain-English Revenue Reports</h3>
              <p>
                No vanity impressions or confusing jargon. We report how many real leads you got, what each lead cost, and your overall return on ad spend.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <MapPin size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem" }}>Local &amp; Reachable in Kanpur</h3>
              <p>
                Office located in Shatabdi Nagar, Panki. You can call, WhatsApp, or meet us face-to-face for strategic discussions anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Award size={14} style={{ color: "var(--accent)" }} />
              <span>Real Client Stories</span>
            </div>
            <h2>Proven Track Record With Local Kanpur Businesses</h2>
            <p className="text-muted">
              Here is what business owners in Kanpur say about partnering with Vyan Digital Agency.
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#F5D076" color="#F5D076" />
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <p>{t.business}</p>
                    <span className="metric-pill">{t.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Kanpur Commercial Hubs & SME Coverage (SEO Engine) */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              <span>Hyper-Local Kanpur SEO &amp; SME Reach</span>
            </div>
            <h2>Dominating Search Rankings Across Every Major Kanpur Commercial Hub</h2>
            <p className="text-muted">
              Whether your customers search from coaching hubs like Kakadeo or industrial corridors in Fazalganj,
              our hyper-local SEO, Meta Ads, and Google Ads place your brand directly on top of Google.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 20 }}>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Kakadeo &amp; Geeta Nagar</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                Kanpur&apos;s premier coaching and educational center. We help NEET/JEE institutes, schools, and hostels generate hundreds of verified admission inquiries through targeted Meta Ads and local Maps SEO.
              </p>
            </div>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Swaroop Nagar &amp; Civil Lines</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                Upscale healthcare clinics, diagnostic centers, fine-dining restaurants, and premium retail showrooms scaling high-ticket clientele with Google Search Ads and Instagram marketing.
              </p>
            </div>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Gumti No. 5 &amp; Naveen Market</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                High-volume retail outlets, clothing brands, jewelers, and footwear stores capturing massive foot traffic and orders through Google Business Profile 3-Pack and WhatsApp marketing.
              </p>
            </div>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Panki &amp; Shatabdi Nagar</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                Our agency headquarters. Empowering local traders, engineering units, service contractors, and residential businesses with Google Maps dominance and professional website development.
              </p>
            </div>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Fazalganj &amp; Dada Nagar</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                Kanpur&apos;s manufacturing and industrial backbone. We engineer B2B lead generation funnels, Google Ads for industrial equipment, and custom staff/ERP applications for manufacturers.
              </p>
            </div>
            <div className="modern-card">
              <h3 style={{ fontSize: "1.1rem", color: "var(--accent)", marginBottom: 6 }}>Kidwai Nagar &amp; Govind Nagar</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                South Kanpur&apos;s vibrant trade hub. Scaling family-owned businesses, salons, hardware traders, and gyms with targeted local ads and automated WhatsApp inquiry bots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pan-India & Uttar Pradesh Growth Network Section */}
      <section className="section" style={{ background: "var(--card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap">
          <div className="section-head" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto 40px" }}>
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Globe size={14} style={{ color: "var(--accent)" }} />
              <span>Statewide &amp; Pan-India SEO Dominance</span>
            </div>
            <h2>Serving Businesses Across All Cities in <span className="text-gradient">Uttar Pradesh &amp; India</span></h2>
            <p className="text-muted">
              Whether you are in Lucknow, Noida, Varanasi, Agra, or national business capitals like Delhi NCR, Mumbai, and Bengaluru,
              our performance marketing campaigns, Google Ads, and custom mobile apps deliver guaranteed lower CPL and high ROAS.
            </p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <MapPin size={18} style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Top Uttar Pradesh Commercial Hubs</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
              {[
                { name: "Uttar Pradesh (Statewide)", slug: "uttar-pradesh" },
                { name: "Kanpur", slug: "kanpur" },
                { name: "Lucknow", slug: "lucknow" },
                { name: "Noida & Greater Noida", slug: "noida" },
                { name: "Varanasi", slug: "varanasi" },
                { name: "Prayagraj", slug: "prayagraj" },
                { name: "Agra", slug: "agra" },
                { name: "Ghaziabad", slug: "ghaziabad" },
                { name: "Meerut", slug: "meerut" },
                { name: "Gorakhpur", slug: "gorakhpur" },
                { name: "Bareilly", slug: "bareilly" },
                { name: "Aligarh", slug: "aligarh" },
                { name: "Moradabad", slug: "moradabad" },
                { name: "Ayodhya", slug: "ayodhya" },
                { name: "Jhansi", slug: "jhansi" },
                { name: "Mathura & Vrindavan", slug: "mathura" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="modern-card"
                  style={{
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{city.name}</span>
                  <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Building2 size={18} style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Major Commercial Metros &amp; State Capitals</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
              {[
                { name: "India (National Hub)", slug: "india" },
                { name: "Delhi NCR", slug: "delhi-ncr" },
                { name: "Mumbai", slug: "mumbai" },
                { name: "Bengaluru", slug: "bengaluru" },
                { name: "Pune", slug: "pune" },
                { name: "Hyderabad", slug: "hyderabad" },
                { name: "Jaipur", slug: "jaipur" },
                { name: "Patna", slug: "patna" },
                { name: "Indore", slug: "indore" },
                { name: "Ahmedabad", slug: "ahmedabad" },
                { name: "Kolkata", slug: "kolkata" },
                { name: "Chandigarh", slug: "chandigarh" },
              ].map((metro) => (
                <Link
                  key={metro.slug}
                  href={`/locations/${metro.slug}`}
                  className="modern-card"
                  style={{
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    color: "inherit",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{metro.name}</span>
                  <ArrowRight size={14} style={{ color: "var(--accent)" }} />
                </Link>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link href="/locations" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span>View All 30+ Service Locations</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8, fontWeight: 600 }}>
              Frequently Asked Questions
            </p>
            <h2>Common Questions About Digital Growth in Kanpur</h2>
            <p className="text-muted">Everything you need to know about working with Vyan Digital Agency.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question">
                  <span className="q-mark">Q.</span>
                  <span>{faq.q}</span>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual High-Converting CTA Banner */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band" style={{ background: "linear-gradient(145deg, #171E33 0%, #111524 100%)" }}>
            <div>
              <div className="showcase-tag" style={{ marginBottom: 12 }}>
                <Clock size={12} />
                <span>Free 30-Minute Strategy Session</span>
              </div>
              <h2>Ready to get more customers visiting your business?</h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "56ch" }}>
                Tell us about your business goals and we will conduct a free competitor and audit breakdown for your Kanpur location.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary btn-icon">
                <span>Book Free Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I'd%20like%20a%20free%20consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
