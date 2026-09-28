import LeadForm from "@/components/LeadForm";
import {
  Sparkles,
  Smartphone,
  Wallet,
  Clock,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Earn ₹10K – ₹15K Monthly from Mobile — Vyan Digital Agency",
  description:
    "Learn how to earn ₹10,000 to ₹15,000 every month using your smartphone with zero investment. Register now for free training.",
  // Private / personal route (not indexed by search engines, just like /admin)
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LeadPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "24px" }}>
        <div className="wrap">
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Sparkles size={14} style={{ color: "var(--accent)" }} />
            <span>Exclusive Mobile Earning Opportunity</span>
          </div>
          <h1 style={{ maxWidth: 820, margin: "0 auto 16px", fontSize: "clamp(1.9rem, 4vw, 2.7rem)" }}>
            आप अपने मोबाइल से महीने का{" "}
            <span style={{ color: "var(--accent)" }}>₹10,000 – ₹15,000</span> आसानी से कमा सकते हैं
          </h1>
          <p className="lead" style={{ maxWidth: 660, margin: "0 auto" }}>
            घर बैठे रोज़ाना सिर्फ 1–2 घंटे अपने स्मार्टफोन से काम करें। कोई इनवेस्टमेंट नहीं — 
            पूरी ट्रेनिंग और सपोर्ट Vyan Digital Agency द्वारा फ्री में दी जाएगी।
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10, paddingBottom: 60 }}>
        <div className="wrap" style={{ maxWidth: 1060 }}>
          <div
            className="grid-2"
            style={{
              alignItems: "flex-start",
              gap: 36,
            }}
          >
            {/* Left Column: Work Details & Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* How It Works Card */}
              <div className="modern-card" style={{ padding: "30px 26px" }}>
                <h2 style={{ fontSize: "1.25rem", margin: "0 0 18px", color: "var(--text)" }}>
                  यह कैसे काम करता है? (Simple 3 Steps)
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-soft)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--accent)",
                        fontWeight: 700,
                      }}
                    >
                      1
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "0.98rem", color: "var(--text)" }}>
                        फ़ॉर्म में बेसिक जानकारी भरें
                      </strong>
                      <p style={{ margin: "3px 0 0", fontSize: "0.86rem", color: "var(--text-muted)" }}>
                        अपना नाम, WhatsApp मोबाइल नंबर और Gmail दर्ज करके सबमिट करें।
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-soft)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--accent)",
                        fontWeight: 700,
                      }}
                    >
                      2
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "0.98rem", color: "var(--text)" }}>
                        WhatsApp पर फ्री ट्रेनिंग प्राप्त करें
                      </strong>
                      <p style={{ margin: "3px 0 0", fontSize: "0.86rem", color: "var(--text-muted)" }}>
                        हमारी टीम आपको आसान स्टेप-बाय-स्टेप वीडियो गाइड और टास्क लिस्ट शेयर करेगी।
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-soft)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--accent)",
                        fontWeight: 700,
                      }}
                    >
                      3
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: "0.98rem", color: "var(--text)" }}>
                        रोज़ 1-2 घंटे काम और सीधा पेआउट
                      </strong>
                      <p style={{ margin: "3px 0 0", fontSize: "0.86rem", color: "var(--text-muted)" }}>
                        टास्क पूरे करें और अपनी कमाई सीधे अपने UPI / बैंक अकाउंट में पाएं।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights 3 Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: 12,
                }}
              >
                <div
                  className="modern-card"
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid rgba(217, 164, 65, 0.25)",
                  }}
                >
                  <Wallet size={20} style={{ color: "var(--accent)", margin: "0 auto 6px" }} />
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent)", display: "block" }}>
                    ₹10K – ₹15K
                  </span>
                  <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>महीने की कमाई</span>
                </div>

                <div
                  className="modern-card"
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid rgba(217, 164, 65, 0.25)",
                  }}
                >
                  <Smartphone size={20} style={{ color: "var(--accent)", margin: "0 auto 6px" }} />
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent)", display: "block" }}>
                    सिर्फ मोबाइल
                  </span>
                  <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>लैपटॉप की ज़रूरत नहीं</span>
                </div>

                <div
                  className="modern-card"
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid rgba(217, 164, 65, 0.25)",
                  }}
                >
                  <Clock size={20} style={{ color: "var(--accent)", margin: "0 auto 6px" }} />
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent)", display: "block" }}>
                    1–2 घंटे
                  </span>
                  <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>रोज़ाना समय</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--radius)",
                  border: "1px dashed var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <MessageCircle size={18} style={{ color: "#25D366", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    कोई सवाल या जानकारी चाहिए?
                  </span>
                </div>
                <a
                  href="https://wa.me/919654880240?text=Hello%20Vyan%20Digital,%20I%20want%20to%20know%20more%20about%20mobile%20earning%20work"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    textDecoration: "underline",
                  }}
                >
                  WhatsApp पर पूछें &rarr;
                </a>
              </div>
            </div>

            {/* Right Column: Lead Form Card with Prominent Heading Above */}
            <div
              className="modern-card"
              style={{
                padding: "32px 26px",
                border: "1px solid var(--accent)",
                boxShadow: "0 12px 36px rgba(0, 0, 0, 0.35)",
                background: "linear-gradient(180deg, rgba(22, 27, 46, 0.95), rgba(15, 19, 32, 0.98))",
              }}
            >
              {/* Eye-catching Banner Added Above The Form */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(217, 164, 65, 0.22), rgba(217, 164, 65, 0.08))",
                  border: "1px solid var(--accent)",
                  borderRadius: "var(--radius)",
                  padding: "18px 20px",
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--accent)",
                    fontWeight: 700,
                    fontSize: "0.84rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "6px",
                  }}
                >
                  <Sparkles size={16} />
                  <span>Work From Home Opportunity</span>
                </div>
                <h3
                  style={{
                    margin: "4px 0 8px",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.35,
                  }}
                >
                  आप अपने मोबाइल से महीने का{" "}
                  <span style={{ color: "var(--accent)" }}>₹10,000 – ₹15,000</span> आसानी से कमा सकते हैं
                </h3>
                <p style={{ margin: 0, fontSize: "0.84rem", color: "rgba(255, 255, 255, 0.78)" }}>
                  फ्री ट्रेनिंग और टास्क डिटेल्स पाने के लिए नीचे अपना सही विवरण भरें:
                </p>
              </div>

              {/* Form Title */}
              <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>
                    रजिस्ट्रेशन फॉर्म (Free)
                  </span>
                  <span className="showcase-tag">100% Free Training</span>
                </div>
              </div>

              {/* 3-Field Lead Form */}
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
