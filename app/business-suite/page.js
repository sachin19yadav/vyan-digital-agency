"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Scissors,
  Leaf,
  Home,
  Building2,
  GraduationCap,
  Briefcase,
  HardHat,
  Boxes,
  BookOpen,
  Wrench,
  Car,
  Network,
  Store,
  Hospital,
  Utensils,
  Search,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

export default function BusinessSuiteHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedRoute, setCopiedRoute] = useState(null);

  const businessApps = [
    {
      id: "beauty-parlour",
      title: "Beauty Parlour & Salon",
      route: "/beauty-parlour",
      category: "Beauty & Wellness",
      icon: Scissors,
      color: "#e11d48",
      bgColor: "#fff1f2",
      badge: "Stylists & POS Billing",
      description: "Hair styling, skin facials, bridal packages, master beauticians selection, online appointment slot booking, and salon GST billing.",
    },
    {
      id: "vegetables",
      title: "Fresh Vegetables & Fruits",
      route: "/vegetables",
      category: "E-Commerce & Mandi",
      icon: Leaf,
      color: "#16a34a",
      bgColor: "#f0fdf4",
      badge: "Mandi Rates & Cart",
      description: "Daily wholesale mandi rate ticker, fresh farm harvest vegetables & fruits catalog, kg/half-kg basket cart, and 30-minute delivery checkout.",
    },
    {
      id: "properties",
      title: "Real Estate & Properties",
      route: "/properties",
      category: "Real Estate",
      icon: Home,
      color: "#0284c7",
      bgColor: "#f0f9ff",
      badge: "Buy, Sell & Rent",
      description: "RERA approved residential flats, duplex villas, commercial shops, free site visit AC cab scheduler, and direct owner property posting form.",
    },
    {
      id: "hotel",
      title: "Hotel Management & Folios",
      route: "/hotel",
      category: "Hospitality",
      icon: Building2,
      color: "#1e3a8a",
      bgColor: "#eff6ff",
      badge: "Room Folio & POS",
      description: "Deluxe & executive suites, instant night stay reservations, guest check-in/out registers, room service ordering, and printable folio tax billing.",
    },
    {
      id: "school",
      title: "School Management System",
      route: "/school",
      category: "Education",
      icon: GraduationCap,
      color: "#4338ca",
      bgColor: "#eef2ff",
      badge: "Student Roster & Fees",
      description: "Student admission enrollment, CBSE class grade directories, attendance tracking, teacher rosters, and printable official school fee receipts.",
    },
    {
      id: "staffing",
      title: "Staffing & Job Portal",
      route: "/staffing",
      category: "Manpower & Security",
      icon: Briefcase,
      color: "#0f766e",
      bgColor: "#f0fdfa",
      badge: "Verified Staff Hire",
      description: "Verified cleaners, security guards, house maids, patient care attendants, employer direct hire deployment, and job seeker application desk.",
    },
    {
      id: "construction",
      title: "Construction Sites Management",
      route: "/construction",
      category: "Civil Engineering",
      icon: HardHat,
      color: "#d97706",
      bgColor: "#fffbeb",
      badge: "Civil Sites & Labour",
      description: "Live civil project progress meters, cement bags & TMT steel inventory tracking, material indent request forms, and daily labour muster roll wages.",
    },
    {
      id: "inventory",
      title: "Inventory & Warehouse ERP",
      route: "/inventory",
      category: "Logistics & Supply",
      icon: Boxes,
      color: "#2563eb",
      bgColor: "#eff6ff",
      badge: "SKU Ledger & Alerts",
      description: "Warehouse inventory valuation, SKU code master register, Stock-in (GRN) & Stock-out dispatches, and automated low stock triggers.",
    },
    {
      id: "home-tuition",
      title: "Home Tuition & Tutor Finder",
      route: "/home-tuition",
      category: "Tutoring & Academics",
      icon: BookOpen,
      color: "#7c3aed",
      bgColor: "#f5f3ff",
      badge: "Free 1st Demo Class",
      description: "Verified B.Tech, Ph.D and CA home tutors for Classes 1-12 & JEE/NEET, one-on-one free demo class booking, and new tutor registration.",
    },
    {
      id: "repair-services",
      title: "Home Appliances Care & Repair",
      route: "/repair-services",
      category: "Doorstep Maintenance",
      icon: Wrench,
      color: "#ea580c",
      bgColor: "#fff7ed",
      badge: "AC, Washing Machine, TV",
      description: "AC service, washing machine, refrigerator, TV, and mixer grinder repair with transparent rate card, 90-day warranty, and technician slot booking.",
    },
    {
      id: "car-cleaning",
      title: "Car Cleaning & Detailing Studio",
      route: "/car-cleaning",
      category: "Automotive Services",
      icon: Car,
      color: "#0284c7",
      bgColor: "#f0f9ff",
      badge: "Bay Booking & Wash",
      description: "Hatchback, Sedan & SUV segment pricing, snow foam wash, interior steam cleaning, 9H ceramic coating, and online bay slot scheduler.",
    },
    {
      id: "mlm",
      title: "MLM (Network Marketing)",
      route: "/mlm",
      category: "Fintech & Network",
      icon: Network,
      color: "#7c3aed",
      bgColor: "#f5f3ff",
      badge: "Binary & Star Tree",
      description: "Interactive Binary tree & 5-Star matrix visualizers, Left/Right BV leg balance matching, commission wallet, downline enrollment, and instant payouts.",
    },
    {
      id: "grocery",
      title: "Grocery Store & POS Billing",
      route: "/grocery",
      category: "Retail Supermarket",
      icon: Store,
      color: "#059669",
      bgColor: "#ecfdf5",
      badge: "Barcode POS Counter",
      description: "Barcode scan & search, instant ticket builder, 5% retail GST computation, savings breakdown, and official printable thermal receipts.",
    },
    {
      id: "restaurant",
      title: "Restaurant & Cloud Kitchen",
      route: "/resturent",
      category: "Food & Beverage",
      icon: Utensils,
      color: "#ea580c",
      bgColor: "#fff7ed",
      badge: "KOT, Dine-In & Delivery",
      description: "Landing page, Slow-fire dum menu, Online cart with 4-step delivery tracking, POS cashier GST billing, and live Chef Kitchen Order Tickets (KOT).",
    },
    {
      id: "hospital",
      title: "Hospital Management System",
      route: "/hospital",
      category: "Healthcare & OPD",
      icon: Hospital,
      color: "#0284c7",
      bgColor: "#f0f9ff",
      badge: "Doctor, Nurse & HR",
      description: "Doctor consultation desk, nurse medication schedule, receptionist OPD appointment bookings, bed occupancy map, and Google Sheet sync.",
    },
  ];

  const filteredApps = businessApps.filter((app) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.title.toLowerCase().includes(q) ||
      app.category.toLowerCase().includes(q) ||
      app.badge.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.route.toLowerCase().includes(q)
    );
  });

  const handleCopy = (route) => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${route}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedRoute(route);
      setTimeout(() => setCopiedRoute(null), 2500);
    }
  };

  return (
    <div style={{ backgroundColor: "#faf8f5", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #fed7aa", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#64748b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ea580c", fontWeight: 700 }}>
          <Sparkles size={15} />
          <span>Vyan Business Software Suite • 15+ Enterprise Web Applications</span>
        </div>
        <Link href="/" style={{ color: "#0f172a", fontWeight: 700, textDecoration: "none" }}>
          ← Main Agency Website
        </Link>
      </div>

      {/* Hero Section */}
      <section style={{ background: "linear-gradient(180deg, #fff7ed 0%, #faf8f5 100%)", padding: "40px 24px 30px", borderBottom: "1px solid #fed7aa" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#ffedd5", color: "#c2410c", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "12px", border: "1px solid #fed7aa" }}>
            <Sparkles size={14} />
            <span>STANDALONE BUSINESS APPLICATIONS SUITE</span>
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
            Explore All Business Applications &amp; Endpoints
          </h1>
          <p style={{ color: "#64748b", margin: "0 auto 24px", fontSize: "1rem", maxWidth: "700px" }}>
            Har business vertical ke liye dedicated high-performance web app with interactive bookings, live cart, POS billing software, and management portals. Pure light mode me designed.
          </p>

          {/* Quick Search */}
          <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
            <Search size={18} color="#94a3b8" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by business (e.g. billing, salon, vegetables, school, car)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 46px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                fontSize: "0.92rem",
                color: "#0f172a",
                outline: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Grid of Business Apps */}
      <main style={{ maxWidth: "1240px", margin: "36px auto", padding: "0 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "0.95rem", color: "#64748b", fontWeight: 700 }}>
            Showing <strong>{filteredApps.length}</strong> Business Web Applications
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
          {filteredApps.map((app) => {
            const IconComp = app.icon;
            const isCopied = copiedRoute === app.route;

            return (
              <div
                key={app.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: app.bgColor, color: app.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconComp size={24} />
                  </div>
                  <span style={{ backgroundColor: app.bgColor, color: app.color, padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 800 }}>
                    {app.badge}
                  </span>
                </div>

                <div style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {app.category}
                </div>

                <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", margin: "4px 0 8px" }}>
                  {app.title}
                </h2>

                <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 20px", flex: 1 }}>
                  {app.description}
                </p>

                {/* Route Pill & Direct Actions */}
                <div style={{ backgroundColor: "#f8fafc", padding: "10px 14px", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 800, color: app.color }}>
                    {app.route}
                  </div>
                  <button
                    onClick={() => handleCopy(app.route)}
                    style={{ backgroundColor: "transparent", border: "none", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Copy Link to Clipboard"
                  >
                    {isCopied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                    <span>{isCopied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>

                <Link
                  href={app.route}
                  style={{
                    backgroundColor: app.color,
                    color: "#ffffff",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: `0 4px 12px ${app.color}35`,
                  }}
                >
                  <span>Launch Application</span>
                  <ExternalLink size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      {/* Suite Footer */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "24px 20px", textAlign: "center", fontSize: "0.85rem", color: "#64748b" }}>
        <div>Built for Vyan Digital Agency Client Businesses • 100% Pure Light Mode Suite</div>
      </footer>
    </div>
  );
}
