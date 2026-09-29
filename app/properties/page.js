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
} from "lucide-react";
import { propertiesData } from "@/data/businessAppsData";

export default function PropertiesApp() {
  const { agencyInfo, types, listings } = propertiesData;
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSiteVisitModal, setActiveSiteVisitModal] = useState(null);
  const [showPostPropertyModal, setShowPostPropertyModal] = useState(false);
  const [visitConfirmed, setVisitConfirmed] = useState(null);
  const [customListings, setCustomListings] = useState(listings);

  // Form states
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitDate, setVisitDate] = useState("2026-10-02");
  const [needPickup, setNeedPickup] = useState(true);

  // Post Property form
  const [postTitle, setPostTitle] = useState("");
  const [postType, setPostType] = useState("Buy");
  const [postPrice, setPostPrice] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postArea, setPostArea] = useState("");

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
    setVisitConfirmed({
      property: activeSiteVisitModal.title,
      name: visitorName,
      phone: visitorPhone,
      date: visitDate,
      pickup: needPickup ? "Free AC Cab Pickup Included" : "Self Visit",
    });
    setActiveSiteVisitModal(null);
  };

  const handlePostProperty = (e) => {
    e.preventDefault();
    if (!postTitle || !postPrice) return;
    const newProp = {
      id: `PROP-${Date.now()}`,
      title: postTitle,
      type: postType,
      propertyType: "Residential Flat",
      price: Number(postPrice),
      priceLabel: `₹${Number(postPrice).toLocaleString("en-IN")}`,
      location: postLocation || "Civil Lines, Kanpur",
      carpetArea: postArea ? `${postArea} Sq.Ft.` : "1200 Sq.Ft.",
      bedrooms: 3,
      bathrooms: 2,
      furnishing: "Semi-Furnished",
      reraStatus: "Owner Direct Verified",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      featured: false,
    };
    setCustomListings([newProp, ...customListings]);
    setShowPostPropertyModal(false);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0f9ff", borderBottom: "1px solid #bae6fd", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#0369a1", fontWeight: 700 }}>
        <span>🏡 Verified RERA Approved Properties • Zero Brokerage on Direct Owner Listings • Call: {agencyInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#0369a1", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Home size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                {agencyInfo.name}
              </h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{agencyInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setShowPostPropertyModal(true)}
              style={{ backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Plus size={16} /> Post Free Property
            </button>
          </div>
        </div>
      </header>

      {/* Visit Confirmed Notification */}
      {visitConfirmed && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Site Visit Scheduled for "{visitConfirmed.property}" on {visitConfirmed.date}! Client: {visitConfirmed.name} ({visitConfirmed.phone}) • {visitConfirmed.pickup}</span>
            </div>
            <button onClick={() => setVisitConfirmed(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Hero Search Bar */}
      <section style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)", padding: "30px 20px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by area, landmark or BHK (e.g. Swaroop Nagar, 3 BHK)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: "10px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", outline: "none", fontSize: "0.88rem" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "8px",
                    border: selectedType === t ? "1px solid #0284c7" : "1px solid #cbd5e1",
                    backgroundColor: selectedType === t ? "#0284c7" : "#ffffff",
                    color: selectedType === t ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
          {filteredProperties.map((prop) => (
            <div key={prop.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative" }}>
                <img src={prop.image} alt={prop.title} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#0284c7", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                  For {prop.type}
                </span>
                <span style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(15,23,42,0.8)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.88rem", fontWeight: 900 }}>
                  {prop.priceLabel}
                </span>
              </div>

              <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{prop.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#64748b", fontSize: "0.82rem", marginBottom: "12px" }}>
                  <MapPin size={14} color="#0284c7" />
                  <span>{prop.location}</span>
                </div>

                <div style={{ display: "flex", gap: "14px", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "10px 0", marginBottom: "14px", fontSize: "0.8rem", color: "#475569" }}>
                  {prop.bedrooms > 0 && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Bed size={14} /> {prop.bedrooms} Beds</span>}
                  {prop.bathrooms > 0 && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Bath size={14} /> {prop.bathrooms} Baths</span>}
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Maximize2 size={14} /> {prop.carpetArea}</span>
                </div>

                <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, marginBottom: "16px" }}>
                  ✓ {prop.reraStatus} • {prop.furnishing}
                </div>

                <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => setActiveSiteVisitModal(prop)}
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
      </main>

      {/* Schedule Visit Modal */}
      {activeSiteVisitModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveSiteVisitModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Schedule Free Site Visit</h3>
            <p style={{ color: "#0284c7", fontWeight: 700, margin: "0 0 16px" }}>{activeSiteVisitModal.title}</p>
            <form onSubmit={handleBookSiteVisit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Full Name *" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#475569" }}>
                <input type="checkbox" checked={needPickup} onChange={(e) => setNeedPickup(e.target.checked)} />
                <span>Provide free AC cab pickup &amp; drop from home/office</span>
              </label>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setActiveSiteVisitModal(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#0284c7", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Visit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Free Property Modal */}
      {showPostPropertyModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowPostPropertyModal(false)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Post Free Property Listing</h3>
            <form onSubmit={handlePostProperty} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Title (e.g. 3 BHK Duplex Flat) *" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <select value={postType} onChange={(e) => setPostType(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option value="Buy">For Sale (Buy)</option>
                  <option value="Rent">For Rent</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <input type="number" placeholder="Expected Price (₹) *" value={postPrice} onChange={(e) => setPostPrice(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <input type="text" placeholder="Location / Locality (e.g. Kakadeo, Kanpur)" value={postLocation} onChange={(e) => setPostLocation(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="number" placeholder="Carpet Area in Sq.Ft. (e.g. 1450)" value={postArea} onChange={(e) => setPostArea(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowPostPropertyModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#0284c7", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
