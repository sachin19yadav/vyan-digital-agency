import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Get in touch</p>
          <h1>Tell us about your business, we&apos;ll take it from there.</h1>
          <p className="lead">
            Share your details below or reach us directly by phone or
            WhatsApp — we usually reply within 24–48 hours.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="wrap">
          <div className="grid-2 contact-grid">
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: 24 }}>Send your details</h2>
              <ContactForm />
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: 24 }}>Visit or call</h2>

              <div className="contact-info-row">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.3" />
                  </svg>
                </div>
                <div>
                  <strong>Address</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, Uttar Pradesh
                  </p>
                </div>
              </div>

              <div className="contact-info-row">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
                  </svg>
                </div>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    <a href="tel:+919654880240">+91 96548 80240</a>
                  </p>
                </div>
              </div>

              <div className="map-frame" style={{ marginTop: 28 }}>
                <iframe
                  src="https://www.google.com/maps?q=Cambridge%20School%20Shatabdi%20Nagar%20Panki%20Kanpur&output=embed"
                  loading="lazy"
                  allowFullScreen
                  title="Vyan Digital Agency location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
