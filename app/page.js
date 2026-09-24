import Link from "next/link";

const faqs = [
  {
    q: "Why choose Vyan Digital Agency as your digital marketing agency in Kanpur?",
    a: "Vyan Digital Agency is a Kanpur-based digital growth agency bringing your Meta Ads, Google Ads, Google Maps listing, social accounts, and website under one cohesive team. We deliver transparent, revenue-focused reporting with zero lock-in contracts.",
  },
  {
    q: "How does Vyan Digital Agency help local businesses get more customer leads?",
    a: "We deploy precision Meta Ads (Facebook & Instagram) and Google Search Ads targeting high-intent customers in Kanpur and Uttar Pradesh. Combined with Google Business Profile ranking and automated WhatsApp follow-ups, your inbound enquiries convert into paying clients quickly.",
  },
  {
    q: "What digital marketing services does Vyan provide?",
    a: "We provide 7 core growth services: Meta Ads management, Google Ads (Search, Display, YouTube), Google Maps business listing optimization, Facebook account handling, YouTube channel management, WhatsApp & CRM business automation agents, and custom website development.",
  },
  {
    q: "Where is Vyan Digital Agency located in Kanpur?",
    a: "Our agency is located Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, Uttar Pradesh 208020. Clients are welcome to visit our office or reach us on call or WhatsApp at +91 96548 80240 for a free strategy consultation.",
  },
  {
    q: "How much does digital marketing and advertising cost with Vyan?",
    a: "Our pricing is transparent, modular, and built for businesses of all sizes. Each service is billed independently without forced bundle packages. We also provide our practical Social Media Growth Course for ₹1,999 with referral earning options.",
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

      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Top-Rated Digital Marketing &amp; Growth Agency — Kanpur, Uttar Pradesh</p>
          <h1>Vyan Digital Agency — Digital Marketing, Ads &amp; Growth in Kanpur</h1>
          <p className="lead">
            We run high-ROI Meta Ads, Google Ads, Google Maps business ranking,
            social accounts, automation and high-converting websites — so qualified
            leads keep arriving while you run your business.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Talk to us</Link>
            <Link href="/services" className="btn btn-secondary">Explore all services</Link>
          </div>
          <div className="stat-row">
            <div className="stat"><b>7</b><span>services under one roof</span></div>
            <div className="stat"><b>1</b><span>point of contact, always</span></div>
            <div className="stat"><b>24–48h</b><span>typical response time</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Everything a growing business needs online</h2>
            <p className="text-muted">
              Each service is run by the same team, so your ads, your listing
              and your website all point to the same story instead of working
              against each other.
            </p>
          </div>
          <div className="service-list">
            {services.map((s) => (
              <div className="service-row" key={s.title}>
                <div className="icon" dangerouslySetInnerHTML={{ __html: s.icon }} />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>Why Kanpur businesses partner with Vyan</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <h3>One team, every channel</h3>
              <p>Your ads, listing, pages and website are managed by one team that talks to each other — nothing gets lost between vendors.</p>
            </div>
            <div className="card">
              <h3>Plain reporting</h3>
              <p>You get told what&apos;s working and what isn&apos;t, in plain language — no jargon-filled reports you have to decode.</p>
            </div>
            <div className="card">
              <h3>Local, reachable in Kanpur</h3>
              <p>Based in Panki, Kanpur — call, WhatsApp or visit our office. No endless support ticket queues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow" style={{ color: "var(--accent)", marginBottom: 8, fontWeight: 600 }}>Frequently Asked Questions</p>
            <h2>Common questions about digital growth in Kanpur</h2>
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

      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Also want to earn alongside us?</h2>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Refer our course to students and business owners, or partner
                with us using your Jio SIM, and earn on every referral.
              </p>
            </div>
            <Link href="/earn-with-us" className="btn btn-primary">See Earn with Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const services = [
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "Campaigns built around your actual customers — targeting, creatives and budgets managed weekly, not set-and-forget.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 4v5"/></svg>`,
  },
  {
    title: "Google Ads",
    desc: "Search, Display and YouTube campaigns that put you in front of people already looking for what you sell.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  },
  {
    title: "Google Maps Business Listing",
    desc: `Get your shop or office onto Google Maps and Search — correct category, photos, timings and reviews set up properly.`,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
  },
  {
    title: "Facebook Account Handling",
    desc: "Regular posting, inbox replies and page upkeep, so your Facebook presence stays active without you logging in daily.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2.5"/><path d="M15 10.5h3M15 13.5h3"/></svg>`,
  },
  {
    title: "YouTube Account Handling",
    desc: "Upload scheduling, thumbnails, descriptions and channel setup, handled so your channel looks and performs consistently.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5l5 2.5-5 2.5z"/></svg>`,
  },
  {
    title: "Business Automation Agents",
    desc: "WhatsApp auto-replies, lead follow-up and booking flows built to answer customers and capture leads while you're offline.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="4.5"/></svg>`,
  },
  {
    title: "Website Development",
    desc: "Fast, mobile-first websites for your business — built to load quickly and convert visitors into enquiries.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/></svg>`,
  },
];
