import Link from "next/link";

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
    title: "Setting up a business page that converts",
    desc: "How to structure a Facebook or Instagram business page so visitors understand what you sell within seconds.",
  },
  {
    title: "Content that gets seen",
    desc: "What to post, how often, and why most business pages get ignored — fixed with a simple content routine.",
  },
  {
    title: "Running your first ad",
    desc: "Setting a budget, picking an audience, and reading results — without wasting money on the wrong clicks.",
  },
  {
    title: "Turning followers into customers",
    desc: "Message scripts and follow-up habits that move someone from \"interested\" to \"paid.\"",
  },
  {
    title: "Getting found on Google",
    desc: "Setting up and improving a Google Business Profile so local customers find you first.",
  },
  {
    title: "Earning through referrals",
    desc: "How to use the Earn with Us program to earn while helping others learn the same system.",
  },
];

const audience = [
  {
    title: "Students",
    desc: "Learn a real, practical skill — running social media and ads for a business — that you can offer as a service or use to earn through referrals.",
  },
  {
    title: "Business owners",
    desc: "Learn to run your own page, ads and listing yourself, or understand enough to manage someone doing it for you.",
  },
];

export default function CoursesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Learn with Vyan</p>
          <h1>A practical course on growing a business with social media.</h1>
          <p className="lead">
            Built for students and business owners who want to understand —
            and actually run — social media growth and ads themselves.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="course-header">
            <div>
              <h2 style={{ fontSize: "1.6rem", marginBottom: 8 }}>
                Social Media &amp; Business Growth Course
              </h2>
              <p className="text-muted" style={{ marginBottom: 0, maxWidth: "50ch" }}>
                A single course covering everything from setting up a business
                page to running your first ad and earning through referrals.
              </p>
            </div>
            <div>
              <div className="price-tag">₹1,999 <span>one-time</span></div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: 24, marginBottom: 56 }}>
            {audience.map((a) => (
              <div className="card" key={a.title}>
                <h3>Made for {a.title.toLowerCase()}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-head">
            <h2>What&apos;s covered</h2>
            <p className="text-muted">Six modules, taught in plain language with real examples from local businesses.</p>
          </div>
          <div>
            {curriculum.map((c, i) => (
              <div className="curriculum-item" key={c.title}>
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", marginBottom: 4 }}>{c.title}</h3>
                  <p className="text-muted" style={{ marginBottom: 0 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Enroll, or earn by referring someone else</h2>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Join for ₹1,999, or refer someone and earn ₹1,000 per referral through{" "}
                <Link href="/earn-with-us" style={{ color: "var(--accent)" }}>Earn with Us</Link>.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">Enroll now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
