import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Digital growth agency — Kanpur, Uttar Pradesh</p>
          <h1>We run the ads, pages and systems your business doesn&apos;t have time to run.</h1>
          <p className="lead">
            Vyan Digital Agency handles Meta Ads, Google Ads, your Google Maps
            listing, social accounts, automation and your website — so leads
            keep arriving while you run the business.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary">Talk to us</Link>
            <Link href="/services" className="btn btn-secondary">See what we do</Link>
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
            <h2>Why businesses work with Vyan</h2>
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
              <h3>Local, reachable</h3>
              <p>Based in Kanpur — call, WhatsApp or visit the office. No support ticket queues.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
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
