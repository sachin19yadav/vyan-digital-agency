import Link from "next/link";

export const metadata = {
  title: "Earn with Us — Referral Program & Jio SIM Partnership",
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
      item: "https://vyandigitalagency.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Earn with Us",
      item: "https://vyandigitalagency.com/earn-with-us",
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
          <p className="eyebrow">Earn with Vyan</p>
          <h1>Two ways to earn alongside Vyan Digital Agency.</h1>
          <p className="lead">
            Choose the program that fits you — refer our course to students
            and business owners, or partner with us using your Jio SIM.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 32, alignItems: "stretch" }}>
            <div className="program">
              <p className="eyebrow" style={{ marginBottom: 10 }}>Program 1</p>
              <h3>Refer our course, earn per referral</h3>
              <p className="text-muted">
                We teach students and business owners how to build and grow a
                business using social media. The course is priced at ₹1,999.
                When you refer someone and they join through you, you earn a
                fixed payout.
              </p>
              <div className="amount">₹1,000 <span>per successful referral</span></div>
              <ol>
                <li>You refer a student or business owner to our ₹1,999 social media course.</li>
                <li>They join the course through your reference.</li>
                <li>You receive ₹1,000 as your referral payout — for every person you bring in.</li>
              </ol>
              <p className="text-muted" style={{ marginTop: 18, marginBottom: 0 }}>
                Open to anyone — students, business owners, or anyone with an
                audience willing to learn how to earn through social media.
              </p>
              <div style={{ marginTop: 20 }}>
                <Link href="/courses" className="btn btn-secondary">See course details</Link>
              </div>
            </div>

            <div className="program">
              <p className="eyebrow" style={{ marginBottom: 10 }}>Program 2</p>
              <h3>Earn with your Jio SIM</h3>
              <p className="text-muted">
                If you have a Jio SIM connection, you can connect with us
                directly to start earning. Reach out on WhatsApp or call and
                we&apos;ll walk you through how this program works and what
                you need to get started.
              </p>
              <div style={{ margin: "24px 0" }}>
                <a href="https://wa.me/919654880240" className="btn btn-primary">
                  Message us on WhatsApp
                </a>
              </div>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Eligibility: an active Jio SIM in your name.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>Ready to start earning?</h2>
              <p className="text-muted" style={{ marginBottom: 0 }}>
                Call, WhatsApp, or fill our contact form and mention &quot;Earn with Us.&quot;
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
