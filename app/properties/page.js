"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Phone,
  Search,
  CheckCircle2,
  Plus,
  ShieldCheck,
  Tag,
  Printer,
  ChevronRight,
  ArrowRight,
  Award,
  Users,
  CreditCard,
} from "lucide-react";
import { propertiesData } from "@/data/businessAppsData";

export default function PropertiesApp() {
  const { agencyInfo, types, listings: initialListings } = propertiesData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "listings", "visit", "billing", "agents", "admin"
  const [currentRole, setCurrentRole] = useState("Buyer"); // "Buyer", "Billing", "Agent", "Admin"
  const [customListings, setCustomListings] = useState(initialListings);
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Site Visits State
  const [scheduledVisits, setScheduledVisits] = useState([
    {
      id: "VISIT-701",
      property: "3 BHK Ultra Luxury Park-Facing Flat",
      clientName: "Rahul Tandon",
      clientPhone: "9839001122",
      date: "2026-10-02",
      pickup: "Free AC Cab Pickup Included",
      status: "Confirmed",
      agent: "Vikram Malhotra (+91 98380 99001)",
    },
    {
      id: "VISIT-702",
      property: "4 BHK Royal Duplex Independent Villa",
      clientName: "Sunita Agrawal",
      clientPhone: "9818445566",
      date: "2026-10-03",
      pickup: "Self Visit at Site",
      status: "Confirmed",
      agent: "Anil Saxena (+91 98380 99002)",
    },
  ]);

  // Modal / Form States
  const [activeVisitModal, setActiveVisitModal] = useState(null);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitDate, setVisitDate] = useState("2026-10-02");
  const [needPickup, setNeedPickup] = useState(true);
  const [visitConfirmedAlert, setVisitConfirmedAlert] = useState(null);

  // Billing / Token Slip State
  const [tokenClient, setTokenClient] = useState("Rahul Tandon");
  const [tokenPhone, setTokenPhone] = useState("9839001122");
  const [tokenProperty, setTokenProperty] = useState(initialListings[0].title);
  const [tokenAmount, setTokenAmount] = useState("100000"); // ₹1 Lakh
  const [activeTokenReceipt, setActiveTokenReceipt] = useState(null);

  // Admin New Property Form
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Buy");
  const [newPrice, setNewPrice] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newArea, setNewArea] = useState("");

  const filteredProperties = customListings.filter((prop) => {
    if (selectedType !== "All" && prop.type !== selectedType) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return prop.title.toLowerCase().includes(q) || prop.location.toLowerCase().includes(q);
    }
    return true;
  });

  const handleBookSiteVisit = (e) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) return;

    const newVisit = {
      id: `VISIT-${Math.floor(100 + Math.random() * 900)}`,
      property: activeVisitModal ? activeVisitModal.title : "Custom Site Inspection",
      clientName: visitorName,
      clientPhone: visitorPhone,
      date: visitDate,
      pickup: needPickup ? "Free AC Cab Pickup Included" : "Self Visit at Site",
      status: "Confirmed",
      agent: "Pradeep Shukla (Field Manager)",
    };

    setScheduledVisits([newVisit, ...scheduledVisits]);
    setVisitConfirmedAlert(newVisit);
    setActiveVisitModal(null);
    setVisitorName("");
    setVisitorPhone("");
  };

  const handleGenerateTokenSlip = () => {
    const slip = {
      receiptNo: `TOKEN-${Math.floor(1000 + Math.random() * 9000)}`,
      client: tokenClient,
      phone: tokenPhone,
      property: tokenProperty,
      amount: Number(tokenAmount),
      date: new Date().toLocaleDateString(),
    };
    setActiveTokenReceipt(slip);
  };

  const handleAdminPostProperty = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    const prop = {
      id: `PROP-${Date.now()}`,
      title: newTitle,
      type: newType,
      propertyType: "Luxury Home",
      price: Number(newPrice),
      priceLabel: `₹${Number(newPrice).toLocaleString("en-IN")}`,
      location: newLoc || "Civil Lines, Kanpur",
      carpetArea: newArea ? `${newArea} Sq.Ft.` : "1650 Sq.Ft.",
      bedrooms: 3,
      bathrooms: 3,
      furnishing: "Semi-Furnished",
      reraStatus: "RERA Approved (UPRERA2026)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      featured: true,
    };
    setCustomListings([prop, ...customListings]);
    setNewTitle("");
    setNewPrice("");
    alert("New property successfully listed on portal!");
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div style={{ backgroundColor: "#f0f9ff", borderBottom: "1px solid #bae6fd", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#0369a1", fontWeight: 700, flexWrap: "wrap", gap: "8px" }}>
        <span>🏡 Verified RERA Approved Residential &amp; Commercial Properties • Free AC Cab Site Visit • Call: {agencyInfo.phone}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>UP RERA Lic: <strong>UPRERA99812</strong></span>
          <Link href="/business-suite" style={{ color: "#0369a1", textDecoration: "underline", fontWeight: 800 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* 2. DEDICATED REALTY HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(2,132,199,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(2,132,199,0.3)" }}>
              <Home size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{agencyInfo.name}</h1>
                <span style={{ backgroundColor: "#f0f9ff", color: "#0284c7", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>RERA VERIFIED</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{agencyInfo.tagline}</p>
            </div>
          </div>

          {/* Role Switcher & Post Property */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Buyer") setActiveTab("landing");
                  else if (r === "Billing") setActiveTab("billing");
                  else if (r === "Agent") setActiveTab("agents");
                  else if (r === "Admin") setActiveTab("admin");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bae6fd",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#0369a1",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Buyer">🏡 Property Seeker</option>
                <option value="Billing">💳 Token Advance Desk</option>
                <option value="Agent">📋 Field Agent Visits Desk</option>
                <option value="Admin">👑 Realty Master Admin</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("visit")}
              style={{
                backgroundColor: "#0284c7",
                color: "#ffffff",
                border: "none",
                padding: "9px 18px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(2,132,199,0.3)",
              }}
            >
              Schedule Free Site Visit
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "6px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {[
              { id: "landing", label: "Portal Home" },
              { id: "listings", label: "Browse Properties" },
              { id: "visit", label: "Book Free Site Visit" },
              { id: "billing", label: "Token Booking Slip" },
              { id: "agents", label: "Field Agent Visits Desk" },
              { id: "admin", label: "Post & Manage Properties" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: activeTab === tab.id ? "1px solid #0284c7" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#0284c7" : "#64748b",
                  fontWeight: activeTab === tab.id ? 800 : 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Visit Confirmed Alert */}
      {visitConfirmedAlert && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Site Visit #{visitConfirmedAlert.id} Scheduled! Property: "{visitConfirmedAlert.property}" on {visitConfirmedAlert.date}! Client: {visitConfirmedAlert.clientName} • {visitConfirmedAlert.pickup}</span>
            </div>
            <button onClick={() => setVisitConfirmedAlert(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT */}
      <main>
        {/* A. LANDING PAGE TAB */}
        {activeTab === "landing" && (
          <div>
            {/* Hero */}
            <section style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)", padding: "50px 20px 60px", borderBottom: "1px solid #bae6fd" }}>
              <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "16px" }}>
                    <Building size={14} />
                    <span>KANPUR &amp; LUCKNOW'S MOST TRUSTED REAL ESTATE NETWORK</span>
                  </div>
                  <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-1px" }}>
                    Find Your Dream Luxury Home, Villa or High-Return Commercial Space
                  </h1>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                    Browse 100% verified RERA approved flats, penthouses, independent duplex villas and prime commercial showrooms in Swaroop Nagar, Civil Lines, Kakadeo, and Gomti Nagar with zero hidden brokerage.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveTab("listings")}
                      style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(2,132,199,0.35)" }}
                    >
                      <span>Browse 100+ Properties</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => setActiveTab("visit")}
                      style={{ backgroundColor: "#ffffff", color: "#0284c7", border: "2px solid #0284c7", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                    >
                      Book Free AC Cab Visit
                    </button>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Real Estate Apartment"
                    style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 30px rgba(2,132,199,0.15)" }}
                  />
                  <div style={{ position: "absolute", bottom: "-14px", left: "20px", backgroundColor: "#ffffff", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #bae6fd" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f0f9ff", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: "0.95rem", color: "#0f172a" }}>Zero Legal Dispute Guarantee</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>100% Clear Title Registry Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quality Pillars */}
            <section style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {[
                  { title: "RERA Certified Registry", desc: "Every project strictly vetted for environmental, town planning, and occupancy approvals.", icon: ShieldCheck },
                  { title: "Complimentary Site Visits", desc: "Free air-conditioned chauffeured cab picks you up from your doorstep for property tour.", icon: Home },
                  { title: "Instant Bank Home Loans", desc: "Pre-approved loan sanction letters from SBI, HDFC, and ICICI at lowest interest rates.", icon: Award },
                  { title: "Direct Owner Connect", desc: "Save lakhs on brokerage by connecting directly with verified owners and reputed builders.", icon: Users },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#f0f9ff", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Featured Listings */}
            <section style={{ maxWidth: "1240px", margin: "50px auto", padding: "0 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#0284c7", fontWeight: 800, textTransform: "uppercase" }}>Prime Realty Portfolio</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>Featured Homes &amp; Commercial Spaces</h2>
                </div>
                <button onClick={() => setActiveTab("listings")} style={{ backgroundColor: "transparent", border: "none", color: "#0284c7", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>View Full Catalog</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
                {customListings.slice(0, 3).map((prop) => (
                  <div key={prop.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <div style={{ position: "relative" }}>
                      <img src={prop.image} alt={prop.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#0284c7", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>For {prop.type}</span>
                      <span style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(15,23,42,0.85)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 900 }}>{prop.priceLabel}</span>
                    </div>

                    <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{prop.title}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#64748b", fontSize: "0.82rem", marginBottom: "12px" }}>
                        <MapPin size={14} color="#0284c7" />
                        <span>{prop.location}</span>
                      </div>
                      <div style={{ display: "flex", gap: "14px", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "10px 0", marginBottom: "14px", fontSize: "0.8rem", color: "#475569" }}>
                        {prop.bedrooms > 0 && <span>{prop.bedrooms} BHK</span>}
                        <span>{prop.carpetArea}</span>
                        <span>{prop.furnishing}</span>
                      </div>
                      <div style={{ marginTop: "auto" }}>
                        <button
                          onClick={() => {
                            setActiveVisitModal(prop);
                            setActiveTab("visit");
                          }}
                          style={{ width: "100%", backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
                        >
                          Schedule Free Site Visit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* B. BROWSE PROPERTIES TAB */}
        {activeTab === "listings" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Active Verified Property Listings</h2>
                <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>Filter residential flats, duplex villas, commercial spaces, and plots.</p>
              </div>

              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search by area or BHK..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                />
              </div>
            </div>

            {/* Type Filters */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "20px",
                    border: selectedType === t ? "1px solid #0284c7" : "1px solid #cbd5e1",
                    backgroundColor: selectedType === t ? "#0284c7" : "#ffffff",
                    color: selectedType === t ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
              {filteredProperties.map((prop) => (
                <div key={prop.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                  <div style={{ position: "relative" }}>
                    <img src={prop.image} alt={prop.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#0284c7", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>For {prop.type}</span>
                    <span style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(15,23,42,0.85)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 900 }}>{prop.priceLabel}</span>
                  </div>

                  <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{prop.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#64748b", fontSize: "0.82rem", marginBottom: "12px" }}>
                      <MapPin size={14} color="#0284c7" />
                      <span>{prop.location}</span>
                    </div>

                    <div style={{ display: "flex", gap: "14px", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "10px 0", marginBottom: "12px", fontSize: "0.8rem", color: "#475569" }}>
                      {prop.bedrooms > 0 && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Bed size={14} /> {prop.bedrooms} Beds</span>}
                      {prop.bathrooms > 0 && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Bath size={14} /> {prop.bathrooms} Baths</span>}
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Maximize2 size={14} /> {prop.carpetArea}</span>
                    </div>

                    <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, marginBottom: "16px" }}>
                      ✓ {prop.reraStatus} • {prop.furnishing}
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => {
                          setActiveVisitModal(prop);
                          setActiveTab("visit");
                        }}
                        style={{ flex: 1, backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
                      >
                        Schedule Site Visit
                      </button>
                      <a
                        href={`tel:${agencyInfo.phone}`}
                        style={{ backgroundColor: "#f0f9ff", color: "#0284c7", border: "1px solid #bae6fd", padding: "10px 14px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center" }}
                      >
                        <Phone size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* C. BOOK FREE SITE VISIT TAB */}
        {activeTab === "visit" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #bae6fd", padding: "28px", boxShadow: "0 4px 16px rgba(2,132,199,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>Book Free Property Site Visit</h2>
              <p style={{ color: "#64748b", margin: "0 0 20px", fontSize: "0.85rem" }}>Complimentary AC cab will pick you and your family up from home or office.</p>

              <form onSubmit={handleBookSiteVisit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Select Property to Inspect *</label>
                  <select
                    value={activeVisitModal?.title || customListings[0]?.title}
                    onChange={(e) => {
                      const found = customListings.find((p) => p.title === e.target.value);
                      setActiveVisitModal(found);
                    }}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontSize: "0.85rem" }}
                  >
                    {customListings.map((p) => (
                      <option key={p.id} value={p.title}>{p.title} ({p.location} - {p.priceLabel})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Visitor Full Name *</label>
                    <input type="text" placeholder="e.g. Rahul Tandon" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Mobile Number *</label>
                    <input type="tel" placeholder="98765 43210" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Visit Date</label>
                  <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#475569", cursor: "pointer" }}>
                  <input type="checkbox" checked={needPickup} onChange={(e) => setNeedPickup(e.target.checked)} style={{ accentColor: "#0284c7" }} />
                  <span>Provide complimentary AC cab pickup &amp; drop from home/office</span>
                </label>

                <button type="submit" style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.95rem", cursor: "pointer", marginTop: "10px" }}>
                  Confirm Site Visit Schedule
                </button>
              </form>
            </div>
          </div>
        )}

        {/* D. TOKEN ADVANCE BILLING SLIP TAB */}
        {activeTab === "billing" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #bae6fd", padding: "28px", boxShadow: "0 4px 16px rgba(2,132,199,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Generate Booking Token Advance Slip</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                <input type="text" placeholder="Buyer / Client Name" value={tokenClient} onChange={(e) => setTokenClient(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="tel" placeholder="Mobile Number" value={tokenPhone} onChange={(e) => setTokenPhone(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="text" placeholder="Property Details" value={tokenProperty} onChange={(e) => setTokenProperty(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="number" placeholder="Token Advance Amount (₹)" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <button onClick={handleGenerateTokenSlip} style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, cursor: "pointer" }}>
                  Generate Official Token Slip
                </button>
              </div>

              {activeTokenReceipt && (
                <div style={{ border: "1px dashed #0284c7", padding: "18px", borderRadius: "12px", backgroundColor: "#f0f9ff", fontFamily: "monospace", fontSize: "0.82rem" }}>
                  <div style={{ textAlign: "center", fontWeight: 900, fontSize: "1.1rem" }}>{agencyInfo.name}</div>
                  <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>Official Booking Token Receipt #: {activeTokenReceipt.receiptNo} • Date: {activeTokenReceipt.date}</div>
                  <hr style={{ margin: "10px 0" }} />
                  <div>Buyer Name: <strong>{activeTokenReceipt.client}</strong> ({activeTokenReceipt.phone})</div>
                  <div>Property: <strong>{activeTokenReceipt.property}</strong></div>
                  <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0284c7", marginTop: "10px", borderTop: "1px dashed #0284c7", paddingTop: "8px" }}>
                    TOKEN ADVANCE RECEIVED: ₹{activeTokenReceipt.amount.toLocaleString("en-IN")}
                  </div>
                  <div style={{ textAlign: "center", marginTop: "12px" }}>*** SUBJECT TO REGISTRATION &amp; CLEAR TITLE ***</div>
                  <button onClick={() => window.print()} style={{ marginTop: "12px", width: "100%", padding: "8px", backgroundColor: "#0284c7", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 800 }}>
                    Print Token Receipt
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* E. FIELD AGENT VISITS DESK TAB */}
        {activeTab === "agents" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Field Agent Operations &amp; Site Visit Schedule</h2>
            <div style={{ overflowX: "auto", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f0f9ff", borderBottom: "2px solid #bae6fd", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Visit ID</th>
                    <th style={{ padding: "10px 14px" }}>Buyer Details</th>
                    <th style={{ padding: "10px 14px" }}>Inspecting Property</th>
                    <th style={{ padding: "10px 14px" }}>Scheduled Date</th>
                    <th style={{ padding: "10px 14px" }}>Pickup Option</th>
                    <th style={{ padding: "10px 14px" }}>Assigned Agent</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledVisits.map((v) => (
                    <tr key={v.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{v.id}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 800 }}>{v.clientName}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{v.clientPhone}</div>
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0284c7" }}>{v.property}</td>
                      <td style={{ padding: "12px 14px" }}>{v.date}</td>
                      <td style={{ padding: "12px 14px", fontSize: "0.8rem", color: "#16a34a" }}>{v.pickup}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 700 }}>{v.agent}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* F. POST & MANAGE ADMIN TAB */}
        {activeTab === "admin" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Real Estate Master Admin Portal</h2>
            <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "600px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Post New Property Listing</h3>
              <form onSubmit={handleAdminPostProperty} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="text" placeholder="Title (e.g. 3 BHK Duplex Flat)" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                    <option value="Buy">For Sale (Buy)</option>
                    <option value="Rent">For Rent</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                  <input type="number" placeholder="Expected Price (₹)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
                <input type="text" placeholder="Location / Locality (e.g. Kakadeo, Kanpur)" value={newLoc} onChange={(e) => setNewLoc(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="number" placeholder="Carpet Area in Sq.Ft. (e.g. 1450)" value={newArea} onChange={(e) => setNewArea(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <button type="submit" style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}>Publish to Live Portal</button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* 4. DEDICATED REALTY FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "2px solid #0284c7", marginTop: "60px", padding: "40px 20px 20px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{agencyInfo.name}</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
              RERA certified property marketplace for premium residential apartments, independent villas and commercial retail spaces across Kanpur &amp; Lucknow.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#0284c7", fontWeight: 700 }}>Inquiry Hotline: {agencyInfo.phone}</div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Corporate Office</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>
              <div>Awadh Tower, Level 4, Civil Lines, Kanpur, UP 208001</div>
              <div>Branch: Cyber Heights, Vibhuti Khand, Gomti Nagar, Lucknow</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Legal &amp; Regulatory</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
              <div>UP RERA Registration #: <strong>UPRERA99812</strong></div>
              <div style={{ marginTop: "6px", color: "#16a34a", fontWeight: 700 }}>✓ Title Search &amp; Encumbrance Certificate Verified</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "center", fontSize: "0.78rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} {agencyInfo.name}. All Rights Reserved. • Designed in Pure Light Mode.
        </div>
      </footer>
    </div>
  );
}
