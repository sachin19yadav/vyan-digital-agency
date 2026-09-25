import Link from "next/link";
import {
  Share2,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  DollarSign,
  Gift,
  Clock,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Earn with Us — Referral Partner & Jio SIM Programs",
  description:
    "Partner with Vyan Digital Agency: Earn ₹1,000 per referral on our social media growth course, or earn directly through our Jio SIM partnership program. Contact us on WhatsApp to get started.",
  alternates: {
    canonical: "/earn-with-us",
  },
  openGraph: {
    title: "Earn with Vyan Digital Agency — Referral & Partnership Programs",
    description:
      "Refer students or business owners to earn ₹1,000 per referral, or partner with your Jio SIM.",
    url: "/earn-with-us",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Earn with Vyan Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn with Vyan Digital Agency — Referral & Partnership Programs",
    description: "Refer students or business owners to earn ₹1,000 per referral, or partner with your Jio SIM.",
    images: ["/og-image.svg"],
  },
};

const earnSchema = {
  "@context": "https://schema.org",
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
      name: "Earn with Us",
      item: "https://www.vyandigitalagency.com/earn-with-us",
    },
  ],
};

export default function EarnWithUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(earnSchema) }}
      />

      <section className="page-hero">
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Gift size={14} style={{ color: "var(--accent)" }} />
            <span>Monetize With Vyan</span>
          </div>
          <h1>Two Direct Ways to Earn Alongside Vyan Digital Agency</h1>
          <p className="lead">
            Whether you are a student, local creator, or business owner, choose the partnership program
            that fits your profile — earn ₹1,000 per course referral or partner with your active Jio SIM.
          </p>
        </div>
      </section>

      {/* Main Programs Grid as 2 Large Modern Feature Cards with Images */}
      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 36, alignItems: "stretch" }}>
            {/* Program 1: Course Referral Partner */}
            <div className="modern-card" style={{ padding: 0 }}>
              <div className="card-img-wrap" style={{ height: 210 }}>
                <img
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80"
                  alt="Course Referral Program and Direct Earnings"
                />
                <div className="card-img-overlay"></div>
                <span className="card-badge-top">Program 01 • High Payout</span>
              </div>

              <div style={{ padding: 28, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div className="icon-box" style={{ marginBottom: 0 }}>
                    <Share2 size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Course Referral Partner</h2>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Open to Students &amp; Creators</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  Recommend our practical ₹1,999 Social Media &amp; Business Growth Course. For every single student or business owner who enrolls through you, you get an immediate fixed payout.
                </p>

                <div style={{ background: "rgba(15, 19, 32, 0.7)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "16px 20px", margin: "16px 0 20px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Your Guaranteed Payout:
                  </div>
                  <div className="price-tag" style={{ fontSize: "2.4rem", margin: "4px 0" }}>
                    ₹1,000 <span style={{ fontSize: "0.9rem" }}>per successful referral</span>
                  </div>
                </div>

                {/* Earnings Calculator Projection */}
                <div style={{ marginBottom: 20 }}>
                  <strong style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text)", display: "block", marginBottom: 10 }}>
                    Earnings Potential:
                  </strong>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, textAlign: "center" }}>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                      <b style={{ color: "var(--accent)", fontSize: "1.1rem" }}>₹3,000</b>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>3 Referrals</div>
                    </div>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                      <b style={{ color: "var(--accent)", fontSize: "1.1rem" }}>₹10,000</b>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>10 Referrals</div>
                    </div>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--line)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                      <b style={{ color: "var(--accent)", fontSize: "1.1rem" }}>₹25,000</b>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>25 Referrals</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <strong style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text)", display: "block", marginBottom: 10 }}>
                    How It Works:
                  </strong>
                  <ul className="card-checklist" style={{ margin: 0 }}>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Message us on WhatsApp to register your referral code</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Share your reference with classmates, friends or clients</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Receive ₹1,000 directly into your UPI/Bank account per student</span>
                    </li>
                  </ul>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: "auto", flexWrap: "wrap" }}>
                  <a
                    href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20register%20as%20a%20Course%20Referral%20Partner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-icon"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    <MessageCircle size={16} />
                    <span>Get Referral Code</span>
                  </a>
                  <Link href="/courses" className="btn btn-secondary">
                    View Course
                  </Link>
                </div>
              </div>
            </div>

            {/* Program 2: Jio SIM Partner Program */}
            <div className="modern-card" style={{ padding: 0 }}>
              <div className="card-img-wrap" style={{ height: 210 }}>
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                  alt="Jio SIM Partnership Program"
                />
                <div className="card-img-overlay"></div>
                <span className="card-badge-top">Program 02 • Telecom Partner</span>
              </div>

              <div style={{ padding: 28, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div className="icon-box" style={{ marginBottom: 0 }}>
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: "1.3rem", margin: 0 }}>Earn with Your Jio SIM</h2>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Passive Telecom Partnership</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                  If you hold an active Jio SIM connection, you can partner with our agency network to start earning. We coordinate directly with you to set up your account.
                </p>

                <div style={{ background: "rgba(15, 19, 32, 0.7)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "16px 20px", margin: "16px 0 20px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Eligibility Requirement:
                  </div>
                  <div style={{ color: "#4CAF7D", fontSize: "1.2rem", fontWeight: 700, margin: "6px 0" }}>
                    Active Jio SIM in Your Name
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>
                    Must be registered with valid ID proof and active cellular connectivity.
                  </p>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <strong style={{ fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text)", display: "block", marginBottom: 10 }}>
                    Program Highlights:
                  </strong>
                  <ul className="card-checklist" style={{ margin: 0 }}>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Zero initial investment or registration fee required</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Direct 1-on-1 verification and onboarding call</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Transparent weekly payouts via UPI or Bank Transfer</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      <span>Assistance available directly at our Kanpur office</span>
                    </li>
                  </ul>
                </div>

                <div style={{ marginTop: "auto" }}>
                  <a
                    href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20have%20an%20active%20Jio%20SIM%20and%20want%20details%20on%20Program%202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-icon"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <MessageCircle size={18} />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Payout Transparency Cards */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <div className="live-badge" style={{ marginBottom: 12 }}>
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>Partner Guarantees</span>
            </div>
            <h2>Why Partners Trust Vyan for Reliable Payouts</h2>
            <p className="text-muted">
              We maintain absolute transparency so our community can recommend our brand with confidence.
            </p>
          </div>

          <div className="grid-3">
            <div className="modern-card">
              <div className="icon-box">
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem" }}>Instant UPI Transfers</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                As soon as your referral confirms enrollment, your ₹1,000 payout is credited to your Google Pay, PhonePe, or Paytm within 24 hours.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem" }}>Zero Upfront Joining Cost</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                You never pay a single rupee to become an affiliate or partner. The program is 100% free to join and start earning.
              </p>
            </div>

            <div className="modern-card">
              <div className="icon-box">
                <Clock size={22} />
              </div>
              <h3 style={{ fontSize: "1.1rem" }}>Local Support in Kanpur</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Have questions or need help tracking referrals? Our team is available on WhatsApp and at our office in Shatabdi Nagar, Panki.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section">
        <div className="wrap">
          <div className="cta-band" style={{ background: "linear-gradient(145deg, #171E33 0%, #111524 100%)" }}>
            <div>
              <div className="showcase-tag" style={{ marginBottom: 12 }}>
                <Sparkles size={12} />
                <span>Start Earning Today</span>
              </div>
              <h2>Ready to partner with Vyan Digital Agency?</h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "56ch" }}>
                Send us a message mentioning &ldquo;Earn with Us&rdquo; and we will issue your partner link or guide your Jio SIM onboarding immediately.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/919654880240?text=Hi%20Vyan%20Digital,%20I%20want%20to%20start%20with%20Earn%20With%20Us"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-icon"
              >
                <MessageCircle size={16} />
                <span>Message on WhatsApp</span>
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Submit Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
