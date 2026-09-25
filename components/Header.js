"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowRight, Menu, X } from "lucide-react";

import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/courses", label: "Courses" },
  { href: "/earn-with-us", label: "Earn with Us" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu when pressing Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="wrap">
        <Link
          href="/"
          className="site-logo-link"
          onClick={() => setOpen(false)}
          aria-label="Vyan Digital Agency Home"
        >
          <Logo />
        </Link>

        {open && (
          <div
            className="nav-backdrop"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav
          className={`main-nav${open ? " open" : ""}`}
          aria-label="Main Navigation"
        >
          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="tel:+919654880240"
              className="nav-phone-pill"
              aria-label="Call Vyan Digital Agency"
            >
              <Phone size={14} style={{ color: "var(--accent)" }} />
              <span>+91 96548 80240</span>
            </a>

            <Link
              href="/contact"
              className="nav-cta"
              onClick={() => setOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <span>Get Consultation</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>

        <button
          className={`nav-toggle${open ? " active" : ""}`}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>
      </div>
    </header>
  );
}
