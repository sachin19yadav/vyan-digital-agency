import Link from "next/link";

export const metadata = { title: "About Us" };

const values = [
  {
    title: "We manage, you don't monitor",
    desc: "Once a service starts, you shouldn't need to check on it daily. We report on our own schedule, not just when you ask.",
  },
  {
    title: "No locked-in contracts",
    desc: "Every service is billed on its own. Keep what's working, drop what isn't — you're never bundled into something you don't need.",
  },
  {
    title: "Local first",
    desc: "We're based in Kanpur and work mostly with businesses we can actually visit — that keeps the work grounded in reality, not templates.",
  },
  {
    title: "Plain numbers",
    desc: "Every report answers one question: is this making you money or not. No vanity metrics dressed up as wins.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About Vyan Digital Agency</p>
          <h1>Built for local businesses that don&apos;t have an in-house marketing team.</h1>
          <p className="lead">
            Vyan Digital Agency started in Kanpur with one goal — give small
            and mid-sized businesses the same digital advantage that only
            large companies used to afford: consistent ads, a proper online
            presence, and systems that keep running when the owner is busy
            with the actual business.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2 two-col-layout">
            <div>
              <h2 style={{ fontSize: "1.5rem" }}>Why we exist</h2>
              <p className="text-muted">
                Most local businesses in Kanpur don&apos;t need a big marketing
                department — they need someone to run their ads properly,
                keep their Google listing accurate, and make sure their
                website and social pages don&apos;t sit untouched for months.
              </p>
              <p className="text-muted">
                That&apos;s the gap Vyan fills. Instead of sending clients to five
                different freelancers for ads, listing, website and social
                accounts, we run it all from one place, so nothing
                contradicts anything else.
              </p>
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem" }}>Who we work with</h2>
              <p className="text-muted">
                Shops, clinics, coaching institutes, manufacturers, restaurants
                and service businesses across Kanpur and nearby — anyone who
                wants more customers finding them online without having to
                learn how ad platforms work themselves.
              </p>
              <p className="text-muted">
                We also run a course and referral program under{" "}
                <Link href="/earn-with-us" style={{ color: "var(--accent)" }}>
                  Earn with Us
                </Link>{" "}
                for students and business owners who want to learn — and
                earn — from social media themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>How we work</h2>
          </div>
          <div className="grid-4">
            {values.map((v) => (
              <div className="card" key={v.title}>
                <h3 style={{ fontSize: "1rem" }}>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Based in Kanpur, working across UP</h2>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur — visit us or send your details.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
