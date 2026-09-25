import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid" style={{ gridTemplateColumns: "1.3fr 0.9fr 0.9fr 1.1fr" }}>
          {/* Agency Brand Column */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <Link href="/" className="site-logo-link" aria-label="Vyan Digital Agency Home">
                <Logo size="normal" />
              </Link>
            </div>
            <p className="text-muted" style={{ marginBottom: 12, fontSize: "0.92rem", lineHeight: 1.55 }}>
              Premier performance marketing &amp; digital growth agency in Kanpur. We scale local businesses through high-ROI Meta Ads, Google Ads, Maps optimization, and automated customer funnels.
            </p>
            <div className="footer-badge-verified">
              <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
              <span>Google Verified Local Business Agency</span>
            </div>
            <div className="social-links-row">
              <a
                href="https://wa.me/919654880240"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:+919654880240"
                className="social-btn"
                aria-label="Call Us"
              >
                <Phone size={18} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Facebook Page"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram Profile"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Core Services Column */}
          <div>
            <h4>Growth Services</h4>
            <ul>
              <li><Link href="/services">Meta Ads (FB &amp; Insta)</Link></li>
              <li><Link href="/services">Google Search &amp; Display</Link></li>
              <li><Link href="/services">Google Maps Listing (SEO)</Link></li>
              <li><Link href="/services">Social Account Handling</Link></li>
              <li><Link href="/services">WhatsApp Automation Bots</Link></li>
              <li><Link href="/services">Custom Website Dev</Link></li>
              <li><Link href="/services">Mobile App Development</Link></li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div>
            <h4>Company &amp; Programs</h4>
            <ul>
              <li><Link href="/about">About Agency</Link></li>
              <li><Link href="/courses">Social Media Course (₹1,999)</Link></li>
              <li><Link href="/earn-with-us">Earn with Us Program</Link></li>
              <li><Link href="/contact">Free Strategy Session</Link></li>
              <li><a href="https://wa.me/919654880240" target="_blank" rel="noopener noreferrer">WhatsApp Support</a></li>
            </ul>
          </div>

          {/* Kanpur Office Details Column */}
          <div>
            <h4>Kanpur Headquarters</h4>
            <ul>
              <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <MapPin size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
                <span>Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur, UP 208020</span>
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Phone size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <a href="tel:+919654880240" style={{ fontWeight: 600, color: "var(--text)" }}>+91 96548 80240</a>
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Clock size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.88rem" }}>Mon – Sat: 9:30 AM – 7:00 PM</span>
              </li>
            </ul>
            <div style={{ marginTop: 18 }}>
              <a
                href="https://wa.me/919654880240?text=Hello%20Vyan%20Digital,%20I%20want%20to%20grow%20my%20business%20in%20Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: "10px 16px", fontSize: "0.88rem", display: "inline-flex", width: "100%", justifyContent: "center" }}
              >
                <MessageCircle size={16} />
                <span>Quick WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* State & National SEO Location Links Grid */}
        <div style={{ marginTop: 40, paddingTop: 30, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <h5 style={{ fontSize: "0.95rem", color: "var(--accent)", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Top Digital Marketing &amp; Ads Agency Service Hubs (Uttar Pradesh &amp; Pan-India)
            </h5>
            <Link href="/locations" style={{ fontSize: "0.85rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              View All Locations →
            </Link>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>UTTAR PRADESH HUBS:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", fontSize: "0.82rem" }}>
              <Link href="/locations/uttar-pradesh" style={{ color: "var(--text)" }}>Uttar Pradesh (Statewide)</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/kanpur" style={{ color: "var(--text)" }}>Kanpur</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/lucknow" style={{ color: "var(--text)" }}>Lucknow</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/noida" style={{ color: "var(--text)" }}>Noida &amp; Greater Noida</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/varanasi" style={{ color: "var(--text)" }}>Varanasi</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/prayagraj" style={{ color: "var(--text)" }}>Prayagraj</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/agra" style={{ color: "var(--text)" }}>Agra</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/ghaziabad" style={{ color: "var(--text)" }}>Ghaziabad</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/meerut" style={{ color: "var(--text)" }}>Meerut</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/gorakhpur" style={{ color: "var(--text)" }}>Gorakhpur</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/bareilly" style={{ color: "var(--text)" }}>Bareilly</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/aligarh" style={{ color: "var(--text)" }}>Aligarh</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/moradabad" style={{ color: "var(--text)" }}>Moradabad</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/ayodhya" style={{ color: "var(--text)" }}>Ayodhya</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/jhansi" style={{ color: "var(--text)" }}>Jhansi</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/mathura" style={{ color: "var(--text)" }}>Mathura &amp; Vrindavan</Link>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: 6, fontWeight: 600 }}>PAN-INDIA METROS:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 14px", fontSize: "0.82rem" }}>
              <Link href="/locations/india" style={{ color: "var(--text)" }}>India (National)</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/delhi-ncr" style={{ color: "var(--text)" }}>Delhi NCR</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/mumbai" style={{ color: "var(--text)" }}>Mumbai</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/bengaluru" style={{ color: "var(--text)" }}>Bengaluru</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/pune" style={{ color: "var(--text)" }}>Pune</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/hyderabad" style={{ color: "var(--text)" }}>Hyderabad</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/jaipur" style={{ color: "var(--text)" }}>Jaipur</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/patna" style={{ color: "var(--text)" }}>Patna</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/indore" style={{ color: "var(--text)" }}>Indore</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/ahmedabad" style={{ color: "var(--text)" }}>Ahmedabad</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/kolkata" style={{ color: "var(--text)" }}>Kolkata</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/chandigarh" style={{ color: "var(--text)" }}>Chandigarh</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/dehradun" style={{ color: "var(--text)" }}>Dehradun</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/bhopal" style={{ color: "var(--text)" }}>Bhopal</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/ranchi" style={{ color: "var(--text)" }}>Ranchi</Link>
              <span style={{ color: "var(--border)" }}>•</span>
              <Link href="/locations/surat" style={{ color: "var(--text)" }}>Surat</Link>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Vyan Digital Agency. Built for businesses across Uttar Pradesh &amp; India.</span>
          <span>Shatabdi Nagar, Panki • Kanpur, Uttar Pradesh 208020</span>
        </div>
      </div>
    </footer>
  );
}
