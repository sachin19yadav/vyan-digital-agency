import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Star,
  Clock,
  Layers,
  Award,
  Users,
  Target,
  Flame,
  Layout,
  MapPin,
  Share2,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Social Media & Business Growth Course (₹1,999)",
  description:
    "Enroll in Vyan Digital Agency's practical 6-module course on social media growth, Facebook/Instagram ads, Google Business Profile, and client conversion. Perfect for students and business owners.",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "Practical Social Media & Business Growth Course | Vyan Digital Agency",
    description:
      "Learn to grow businesses with social media and run ads profitably. ₹1,999 one-time fee with referral earnings available.",
    url: "/courses",
  },
};

const curriculum = [
  {
    num: "01",
    title: "Setting Up High-Converting Business Pages",
    desc: "How to structure a Facebook or Instagram business profile so first-time visitors understand what you sell within 3 seconds. Bio optimization, highlights, and CTAs.",
    icon: Layout,
    tag: "Foundation",
  },
  {
    num: "02",
    title: "Content Strategy That Captures Attention",
    desc: "What to post, how often, and why 90% of local business posts get ignored. We provide 30 ready-to-use content templates and high-engagement reels frameworks.",
    icon: Flame,
    tag: "Organic Reach",
  },
  {
    num: "03",
    title: "Running Your First Profitable Ad Campaign",
    desc: "Step-by-step setup in Meta Ads Manager. Selecting the right objective, setting small testing budgets (₹200/day), audience targeting in Kanpur, and reading metrics.",
    icon: Target,
    tag: "Paid Advertising",
  },
  {
    num: "04",
    title: "Turning Followers & Inquiries Into Paid Clients",
    desc: "Exact WhatsApp and DM message scripts, objection handling, and follow-up routines that convert curious prospects into paying customers.",
    icon: Users,
    tag: "Sales Conversion",
  },
  {
    num: "05",
    title: "Google Business Profile & Local Map SEO",
    desc: "How to rank local shops, clinics, and businesses at the top of Google Maps for high-volume 'near me' searches, plus managing reviews.",
    icon: MapPin,
    tag: "Local Dominance",
  },
  {
    num: "06",
    title: "Monetizing Skills & Referral Earning",
    desc: "How to offer freelance social media services to local businesses, or earn ₹1,000 per referral by introducing others to the Earn with Us program.",
    icon: Share2,
    tag: "Monetization",
  },
];

const perks = [
  {
    title: "Lifetime Access & Updates",
    desc: "Learn at your own pace with continuous updates as social ad algorithms evolve.",
    icon: Clock,
  },
  {
    title: "Private WhatsApp Mastermind",
    desc: "Get direct support from agency instructors and connect with fellow students in Kanpur.",
    icon: Users,
  },
  {
    title: "1-on-1 Ad Review Call",
    desc: "We review your first live ad campaign before you spend significant money.",
    icon: Target,
  },
  {
    title: "Certificate of Completion",
    desc: "Recognized credential from Vyan Digital Agency verifying practical ad skills.",
    icon: Award,
  },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Social Media & Business Growth Course",
  description:
    "A practical 6-module course covering social media marketing, Meta and Google ads, Google Business Profile optimization, and client acquisition in Kanpur.",
  provider: {
    "@type": "Organization",
    name: "Vyan Digital Agency",
    sameAs: "https://vyandigitalagency.com",
  },
  offers: {
    "@type": "Offer",
    price: "1999",
    priceCurrency: "INR",
    category: "Paid",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Blended",
    location: "Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, Uttar Pradesh 208020",
  },
};

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <GraduationCap size={14} style={{ color: "var(--accent)" }} />
            <span>Practical Agency Masterclass</span>
          </div>
          <h1>Social Media &amp; Business Growth Masterclass</h1>
          <p className="lead">
            No fluff or textbook theory. Built for students and business owners who want to master
            real-world lead generation, Meta Ads, and earning through digital channels.
          </p>
        </div>
      </section>

      {/* Main Course Showcase with 2-Column Overview & Floating Pricing Card */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 40, alignItems: "start" }}>
            {/* Left Column: Who it is for & Key Focus */}
            <div>
              <div className="section-head" style={{ marginBottom: 28 }}>
                <h2>Designed for Real-World Execution</h2>
                <p className="text-muted">
                  Whether you want to acquire paying clients for your own shop or start a high-income freelance career in Kanpur, this course gives you the direct blueprint.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
                <div className="modern-card">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div className="icon-box" style={{ marginBottom: 0 }}>
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.15rem", marginBottom: 6 }}>For College &amp; School Students</h3>
                      <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", margin: 0 }}>
                        Learn a high-income digital skill you can immediately monetize. Offer local social media handling, run ads for Kanpur businesses, or earn ₹1,000 per referral by recommending peers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="modern-card">
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div className="icon-box" style={{ marginBottom: 0 }}>
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.15rem", marginBottom: 6 }}>For Local Business Owners</h3>
                      <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", margin: 0 }}>
                        Stop wasting money on generic flyers. Learn how to run your own Facebook, Instagram, and Google Ads profitably, optimize your Google Maps listing, and automate customer replies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What You Get Perks */}
              <h3 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Everything Included With Enrollment:</h3>
              <div className="grid-2" style={{ gap: 16 }}>
                {perks.map((p, idx) => {
                  const PerkIcon = p.icon;
                  return (
                    <div key={idx} style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <PerkIcon size={18} style={{ color: "var(--accent)" }} />
                        <strong style={{ fontSize: "0.9rem", color: "var(--text)" }}>{p.title}</strong>
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Floating Enrollment Card */}
            <div>
              <div className="course-card-featured">
                <div style={{ position: "relative", height: 200, borderRadius: "var(--radius-sm)", overflow: "hidden", marginBottom: 20 }}>
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                    alt="Social Media and Business Growth Course Online"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="card-img-overlay"></div>
                  <span className="card-badge-top">Practical 6 Modules</span>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "line-through", marginRight: 8 }}>₹4,999</span>
                    <span className="price-tag" style={{ fontSize: "2.2rem" }}>₹1,999</span>
                  </div>
                  <span className="metric-pill" style={{ fontSize: "0.8rem", padding: "4px 10px" }}>60% OFF Launch Deal</span>
                </div>

                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.5 }}>
                  One-time fee with lifetime access, practical homework reviews, and direct agency instructor access.
                </p>

                <ul className="card-checklist" style={{ marginBottom: 24 }}>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Complete 6-module curriculum + Hindi &amp; English examples</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Direct access to VIP student WhatsApp community</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>1-on-1 ad campaign audit with senior media buyer</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Instant eligibility for ₹1,000 Earn with Us referral payouts</span>
                  </li>
                </ul>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a
                    href="https://wa.me/919654880240?text=Hello%20Vyan%20Digital,%20I%20want%20to%20enroll%20in%20the%20Social%20Media%20Growth%20Course%20(₹1,999)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-icon"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <MessageCircle size={18} />
                    <span>Enroll Now via WhatsApp</span>
                  </a>

                  <Link
                    href="/contact"
                    className="btn btn-secondary btn-icon"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <span>Request Course Brochure</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown: 6 Detailed Module Cards */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <Layers size={14} style={{ color: "var(--accent)" }} />
              <span>Syllabus Breakdown</span>
            </div>
            <h2>6 Comprehensive Practical Modules</h2>
            <p className="text-muted">
              Step-by-step video training taught in clear, conversational language with real Kanpur case studies.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {curriculum.map((mod) => {
              const ModIcon = mod.icon;
              return (
                <div className="modern-card" key={mod.num}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div className="step-number" style={{ fontSize: "1.5rem", margin: 0 }}>
                      MODULE {mod.num}
                    </div>
                    <span className="card-badge-top" style={{ position: "static" }}>{mod.tag}</span>
                  </div>

                  <div className="icon-box" style={{ width: 42, height: 42, marginBottom: 12 }}>
                    <ModIcon size={20} />
                  </div>

                  <h3 style={{ fontSize: "1.1rem", marginBottom: 8 }}>{mod.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.55 }}>
                    {mod.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Referral Program Callout Banner */}
      <section className="section">
        <div className="wrap">
          <div className="cta-band" style={{ background: "linear-gradient(145deg, #171E33 0%, #111524 100%)" }}>
            <div>
              <div className="showcase-tag" style={{ marginBottom: 12 }}>
                <Share2 size={12} />
                <span>Earn ₹1,000 Per Referral</span>
              </div>
              <h2>Want to earn while helping others learn?</h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "56ch" }}>
                When you recommend this ₹1,999 course to students, friends, or business owners,
                you receive a fixed payout of ₹1,000 for each successful enrollment.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/earn-with-us" className="btn btn-primary btn-icon">
                <span>See Earn With Us Details</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20become%20a%20Course%20Referral%20Partner"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
              >
                <MessageCircle size={16} />
                <span>Join Referral Partner</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
