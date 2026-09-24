import Link from "next/link";

export const metadata = {
  title: "Services — Meta Ads, Google Ads & Web Development",
  description:
    "Explore our 7 core digital growth services in Kanpur: Meta Ads (Facebook & Instagram), Google Ads, Google Maps Business Profile, Facebook & YouTube Account Handling, Business Automations, and Website Development.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Growth Services in Kanpur | Vyan Digital Agency",
    description:
      "Meta Ads, Google Ads, Google Maps optimization, social accounts, and custom websites for Kanpur businesses.",
    url: "/services",
  },
};

const services = [
  {
    title: "Meta Ads (Facebook & Instagram)",
    desc: "We plan, design and run ad campaigns across Facebook and Instagram — built around who actually buys from you, not a generic audience. This includes audience research, ad creative, budget management and weekly optimisation based on real results.",
  },
  {
    title: "Google Ads",
    desc: "Search ads that appear when someone types exactly what you sell, Display ads that keep your brand visible, and YouTube ads that reach people mid-video. Set up with proper keyword and conversion tracking so spend is never wasted on the wrong clicks.",
  },
  {
    title: "Google Maps Business Listing",
    desc: `We create or fix your Google Business Profile — correct category, service area, photos, business hours, and a review strategy — so your shop shows up when nearby customers search "near me."`,
  },
  {
    title: "Facebook Account Handling",
    desc: "Day-to-day management of your Facebook Page: content calendar, regular posts, message and comment replies, and page settings kept in order — so your page looks active and trustworthy to anyone who visits.",
  },
  {
    title: "YouTube Account Handling",
    desc: "Channel setup, upload scheduling, titles, descriptions and thumbnails handled end to end. Ideal for businesses that want a consistent YouTube presence without managing it themselves.",
  },
  {
    title: "Automation Agents for Business",
    desc: "We build WhatsApp and website chat automations that answer common questions instantly, qualify leads, and follow up automatically — so enquiries get a response even outside business hours.",
  },
  {
    title: "Website Development",
    desc: "A clean, fast, mobile-first website built to load quickly and turn visitors into enquiries — whether it's a business site, a landing page for a campaign, or a small online store.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h1>Seven services, one team, one story for your business.</h1>
          <p className="lead">
            Pick one service or all seven — each is priced and delivered on
            its own, but built to work together.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 32 }}>
            {services.map((s) => (
              <div className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Not sure which service you need?</h2>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Tell us about your business and we&apos;ll suggest where to start.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">Get a free consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
