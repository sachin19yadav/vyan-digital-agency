import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div style={{ marginBottom: 14 }}>
              <Link href="/" className="site-logo-link" aria-label="Vyan Digital Agency Home">
                <Logo size="normal" />
              </Link>
            </div>
            <p className="text-muted" style={{ marginBottom: 0 }}>
              A digital growth agency in Kanpur helping local businesses get
              found, get leads and get systems that run without them.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/earn-with-us">Earn with Us</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reach us</h4>
            <ul>
              <li><a href="tel:+919654880240">+91 96548 80240</a></li>
              <li>Behind Cambridge School, Shatabdi Nagar, Panki, Kanpur</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Vyan Digital Agency. All rights reserved.</span>
          <span>Kanpur, Uttar Pradesh</span>
        </div>
      </div>
    </footer>
  );
}
