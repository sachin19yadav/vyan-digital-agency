"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar,
  Users,
  Bed,
  CheckCircle2,
  Phone,
  Printer,
  Sparkles,
  Wifi,
  Tv,
  Coffee,
  ShieldCheck,
  CreditCard,
  UtensilsCrossed,
  Clock,
  ArrowRight,
  ChevronRight,
  Plus,
  Trash2,
  Award,
} from "lucide-react";
import { hotelData } from "@/data/businessAppsData";

export default function HotelApp() {
  const { hotelInfo, rooms: initialRooms, sampleBookings } = hotelData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "rooms", "reservation", "billing", "housekeeping", "admin"
  const [currentRole, setCurrentRole] = useState("Guest"); // "Guest", "Billing", "Staff", "Admin"
  const [roomsList, setRoomsList] = useState(initialRooms);
  const [bookingsList, setBookingsList] = useState(sampleBookings);

  // Housekeeping Floor State
  const [floorRooms, setFloorRooms] = useState([
    { id: "101", type: "Deluxe King", status: "Occupied", guest: "Vikram Singhania", clean: "Clean" },
    { id: "102", type: "Deluxe King", status: "Vacant", guest: "--", clean: "Clean" },
    { id: "201", type: "Executive Suite", status: "Occupied", guest: "Meera Oberoi", clean: "Needs Service" },
    { id: "202", type: "Executive Suite", status: "Vacant", guest: "--", clean: "Under Cleaning" },
    { id: "301", type: "Presidential Suite", status: "Vacant", guest: "--", clean: "Clean" },
  ]);

  // Reservation State
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(initialRooms[0]);
  const [checkInDate, setCheckInDate] = useState("2026-10-01");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-03");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [reservationConfirmedAlert, setReservationConfirmedAlert] = useState(null);

  // Folio Billing State
  const [billingFolio, setBillingFolio] = useState(null);

  const calculateNights = () => {
    const d1 = new Date(checkInDate);
    const d2 = new Date(checkOutDate);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const handleBookRoom = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !selectedRoomForBooking) return;
    const roomTotal = selectedRoomForBooking.pricePerNight * nights;
    const tax = Math.round(roomTotal * 0.12);
    const total = roomTotal + tax;

    const newBooking = {
      id: `HTL-${Math.floor(100 + Math.random() * 900)}`,
      guestName,
      guestPhone,
      roomType: selectedRoomForBooking.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      total,
      status: "Confirmed",
    };

    setBookingsList([newBooking, ...bookingsList]);
    setReservationConfirmedAlert(newBooking);
    setGuestName("");
    setGuestPhone("");
  };

  const handleGenerateFolio = (bk) => {
    setBillingFolio({
      folioNo: `FOLIO-${bk.id}`,
      guest: bk.guestName,
      phone: bk.guestPhone || "9876543210",
      room: bk.roomType,
      dates: `${bk.checkIn} to ${bk.checkOut} (${bk.nights || 2} Nights)`,
      roomCharges: bk.total,
      miniBar: 1200,
      serviceTax: Math.round(bk.total * 0.12),
      grandTotal: Math.round(bk.total * 1.12 + 1200),
      date: new Date().toLocaleDateString(),
    });
    setActiveTab("billing");
  };

  const handleToggleRoomClean = (id, newCleanStatus) => {
    setFloorRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, clean: newCleanStatus } : r))
    );
  };

  return (
    <div style={{ backgroundColor: "#fafaf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div style={{ backgroundColor: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#1e40af", fontWeight: 700, flexWrap: "wrap", gap: "8px" }}>
        <span>🏨 The Grand Regency Palace • Free Airport Pickup &amp; Breakfast Buffet • Front Desk Hotline: {hotelInfo.phone}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Check-in: 12:00 PM • Check-out: 11:00 AM</span>
          <Link href="/business-suite" style={{ color: "#1e40af", textDecoration: "underline", fontWeight: 800 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* 2. DEDICATED HOTEL HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#1e3a8a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(30,58,138,0.3)" }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{hotelInfo.name}</h1>
                <span style={{ backgroundColor: "#eff6ff", color: "#1e3a8a", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>5-STAR LUXURY</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{hotelInfo.tagline} • Civil Lines, Kanpur</p>
            </div>
          </div>

          {/* Role Switcher & Book Room */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Guest") setActiveTab("landing");
                  else if (r === "Billing") setActiveTab("billing");
                  else if (r === "Staff") setActiveTab("housekeeping");
                  else if (r === "Admin") setActiveTab("admin");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#1e40af",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Guest">🛎️ Hotel Guest View</option>
                <option value="Billing">💳 Front Desk Folio Billing</option>
                <option value="Staff">🧹 Housekeeping Floor Desk</option>
                <option value="Admin">👑 General Manager Admin</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("reservation")}
              style={{
                backgroundColor: "#1e3a8a",
                color: "#ffffff",
                border: "none",
                padding: "9px 18px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(30,58,138,0.3)",
              }}
            >
              Book Room Online
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ backgroundColor: "#fafaf9", borderTop: "1px solid #e2e8f0", padding: "6px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {[
              { id: "landing", label: "Hotel Home" },
              { id: "rooms", label: "Rooms & Luxury Suites" },
              { id: "reservation", label: "Book Room" },
              { id: "billing", label: "Guest Folio POS Billing" },
              { id: "housekeeping", label: "Housekeeping Floor Desk" },
              { id: "admin", label: "Hotel Admin Portal" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: activeTab === tab.id ? "1px solid #1e3a8a" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#1e3a8a" : "#64748b",
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

      {/* Reservation Confirmed Alert */}
      {reservationConfirmedAlert && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Room Reserved! Booking ID #{reservationConfirmedAlert.id} confirmed for {reservationConfirmedAlert.guestName} ({reservationConfirmedAlert.roomType}, {reservationConfirmedAlert.nights} Nights, ₹{reservationConfirmedAlert.total})!</span>
            </div>
            <button onClick={() => setReservationConfirmedAlert(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT */}
      <main>
        {/* A. LANDING PAGE TAB */}
        {activeTab === "landing" && (
          <div>
            {/* Hero */}
            <section style={{ background: "linear-gradient(180deg, #eff6ff 0%, #fafaf9 100%)", padding: "50px 20px 60px", borderBottom: "1px solid #bfdbfe" }}>
              <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#dbeafe", color: "#1e40af", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "16px" }}>
                    <Sparkles size={14} />
                    <span>KANPUR'S LUXURY LANDMARK PALACE &amp; SUITES</span>
                  </div>
                  <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-1px" }}>
                    Timeless Royal Heritage, Modern Luxury &amp; World-Class Comfort
                  </h1>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                    Immerse in unparalleled luxury at The Grand Regency Palace. Offering temperature-controlled heated swimming pools, private jacuzzi suites, 24x7 in-room gourmet dining, and lavish banquet halls for royal weddings and corporate conclaves.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveTab("rooms")}
                      style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(30,58,138,0.35)" }}
                    >
                      <span>Explore Rooms &amp; Suites</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => setActiveTab("reservation")}
                      style={{ backgroundColor: "#ffffff", color: "#1e3a8a", border: "2px solid #1e3a8a", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                    >
                      Check Live Room Availability
                    </button>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Hotel Room"
                    style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 30px rgba(30,58,138,0.15)" }}
                  />
                  <div style={{ position: "absolute", bottom: "-14px", left: "20px", backgroundColor: "#ffffff", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #bfdbfe" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#eff6ff", color: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Award size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: "0.95rem", color: "#0f172a" }}>TripAdvisor Excellence Award</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Rated 4.9 Stars by 2,200+ Travelers</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hospitality Pillars */}
            <section style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {[
                  { title: "Complimentary Airport Pick", desc: "Chauffeured luxury sedan pickup from Kanpur Chakeri or Lucknow Airport.", icon: ShieldCheck },
                  { title: "24×7 In-Room Fine Dine", desc: "Slow-fire Mughlai dum curries, tandoor starters & continental breakfast on demand.", icon: UtensilsCrossed },
                  { title: "Private Jacuzzi & Spa", desc: "Hydrotherapy private jacuzzis in all Executive and Presidential suites.", icon: Sparkles },
                  { title: "High-Speed Business Wi-Fi", desc: "Dedicated 300 Mbps fiber line in every room with ergonomic executive workstation.", icon: Wifi },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#eff6ff", color: "#1e3a8a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Signature Suites */}
            <section style={{ maxWidth: "1240px", margin: "50px auto", padding: "0 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#1e3a8a", fontWeight: 800, textTransform: "uppercase" }}>Royal Accommodations</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>Featured Rooms &amp; Suites</h2>
                </div>
                <button onClick={() => setActiveTab("rooms")} style={{ backgroundColor: "transparent", border: "none", color: "#1e3a8a", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>View All Rooms</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
                {roomsList.map((rm) => (
                  <div key={rm.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <img src={rm.image} alt={rm.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                    <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{rm.name}</h3>
                        <span style={{ fontSize: "0.75rem", backgroundColor: "#eff6ff", color: "#1e40af", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>{rm.capacity}</span>
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>Bed: {rm.bed}</div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                        {rm.amenities.slice(0, 3).map((am, i) => (
                          <span key={i} style={{ fontSize: "0.72rem", backgroundColor: "#f8fafc", color: "#475569", padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                            ✓ {am}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                        <div>
                          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Tariff per night:</span>
                          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1e3a8a" }}>₹{rm.pricePerNight}</div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedRoomForBooking(rm);
                            setActiveTab("reservation");
                          }}
                          style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "9px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
                        >
                          Book Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* B. ROOMS & SUITES TAB */}
        {activeTab === "rooms" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>The Grand Regency Suites Collection</h2>
            <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "0.88rem" }}>All rooms include 24-hr butler service, high-speed Wi-Fi, and complimentary breakfast buffet.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
              {roomsList.map((rm) => (
                <div key={rm.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                  <img src={rm.image} alt={rm.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                  <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{rm.name}</h3>
                      <span style={{ fontSize: "0.75rem", backgroundColor: "#eff6ff", color: "#1e40af", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>{rm.capacity}</span>
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>Bed: {rm.bed}</div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {rm.amenities.map((am, i) => (
                        <span key={i} style={{ fontSize: "0.72rem", backgroundColor: "#f8fafc", color: "#475569", padding: "3px 8px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                          ✓ {am}
                        </span>
                      ))}
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Tariff per night:</span>
                        <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1e3a8a" }}>₹{rm.pricePerNight}</div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedRoomForBooking(rm);
                          setActiveTab("reservation");
                        }}
                        style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* C. BOOK ROOM ONLINE TAB */}
        {activeTab === "reservation" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #bfdbfe", padding: "28px", boxShadow: "0 4px 16px rgba(30,58,138,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>Hotel Room Reservation</h2>
              <p style={{ color: "#1e3a8a", fontWeight: 700, margin: "0 0 20px" }}>{selectedRoomForBooking?.name} (₹{selectedRoomForBooking?.pricePerNight} / night • {nights} Night(s) Stay)</p>

              <form onSubmit={handleBookRoom} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Select Room Type</label>
                  <select
                    value={selectedRoomForBooking?.id}
                    onChange={(e) => {
                      const found = roomsList.find((r) => r.id === e.target.value);
                      setSelectedRoomForBooking(found);
                    }}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontSize: "0.85rem" }}
                  >
                    {roomsList.map((r) => (<option key={r.id} value={r.id}>{r.name} - ₹{r.pricePerNight} / night</option>))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Primary Guest Name *</label>
                    <input type="text" placeholder="e.g. Vikram Singhania" value={guestName} onChange={(e) => setGuestName(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Mobile Number *</label>
                    <input type="tel" placeholder="98765 43210" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Check-In Date</label>
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Check-Out Date</label>
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div style={{ backgroundColor: "#eff6ff", padding: "12px", borderRadius: "8px", fontSize: "0.82rem", color: "#1e40af", fontWeight: 700, marginTop: "6px" }}>
                  Total Tariff ({nights} Nights): ₹{selectedRoomForBooking?.pricePerNight * nights} + 12% Luxury GST
                </div>

                <button type="submit" style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.95rem", cursor: "pointer", marginTop: "10px" }}>
                  Confirm Room Reservation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* D. GUEST FOLIO POS BILLING TAB */}
        {activeTab === "billing" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #bfdbfe", padding: "28px", boxShadow: "0 4px 16px rgba(30,58,138,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Front Desk Guest Folio &amp; GST Checkout</h2>

              {billingFolio ? (
                <div style={{ border: "1px dashed #1e3a8a", padding: "20px", borderRadius: "12px", backgroundColor: "#fafaf9", fontFamily: "monospace" }}>
                  <div style={{ textAlign: "center", fontWeight: 900, fontSize: "1.1rem" }}>{hotelInfo.name}</div>
                  <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>Folio #: {billingFolio.folioNo} • Date: {billingFolio.date}</div>
                  <hr style={{ margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                    <span>Guest: {billingFolio.guest}</span>
                    <span>Room: {billingFolio.room}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "8px" }}>Stay: {billingFolio.dates}</div>
                  <hr style={{ margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                    <span>Room Charges:</span>
                    <span>₹{billingFolio.roomCharges}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginTop: "4px" }}>
                    <span>Mini Bar / In-Room Dining:</span>
                    <span>₹{billingFolio.miniBar}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginTop: "4px" }}>
                    <span>Luxury Tax &amp; GST (12%):</span>
                    <span>₹{billingFolio.serviceTax}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.05rem", color: "#1e3a8a", borderTop: "1px dashed #1e3a8a", paddingTop: "8px", marginTop: "8px" }}>
                    <span>TOTAL SETTLED:</span>
                    <span>₹{billingFolio.grandTotal}</span>
                  </div>
                  <button onClick={() => window.print()} style={{ width: "100%", backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer", marginTop: "14px" }}>
                    Print Official Guest Tax Invoice
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  <p>Select a confirmed reservation below to generate invoice:</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
                    {bookingsList.map((b) => (
                      <div key={b.id} onClick={() => handleGenerateFolio(b)} style={{ padding: "10px", backgroundColor: "#eff6ff", borderRadius: "8px", cursor: "pointer", border: "1px solid #bfdbfe", display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontWeight: 800, color: "#1e3a8a" }}>{b.guestName}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{b.roomType} • {b.checkIn}</div>
                        </div>
                        <button style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700 }}>Generate</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* E. HOUSEKEEPING FLOOR DESK TAB */}
        {activeTab === "housekeeping" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Housekeeping &amp; Floor Room Management</h2>
            <div style={{ overflowX: "auto", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#eff6ff", borderBottom: "2px solid #bfdbfe", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Room #</th>
                    <th style={{ padding: "10px 14px" }}>Category</th>
                    <th style={{ padding: "10px 14px" }}>Occupancy Status</th>
                    <th style={{ padding: "10px 14px" }}>Current Guest</th>
                    <th style={{ padding: "10px 14px" }}>Housekeeping Cleanliness</th>
                    <th style={{ padding: "10px 14px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {floorRooms.map((r) => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 900, fontSize: "1.05rem" }}>{r.id}</td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>{r.type}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: r.status === "Occupied" ? "#fee2e2" : "#dcfce7", color: r.status === "Occupied" ? "#dc2626" : "#15803d", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 700 }}>{r.guest}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: r.clean === "Clean" ? "#dcfce7" : "#fef3c7", color: r.clean === "Clean" ? "#15803d" : "#b45309", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          ● {r.clean}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button onClick={() => handleToggleRoomClean(r.id, "Clean")} style={{ padding: "4px 8px", backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: "4px", fontSize: "0.72rem", cursor: "pointer", fontWeight: 700 }}>Mark Clean</button>
                          <button onClick={() => handleToggleRoomClean(r.id, "Needs Service")} style={{ padding: "4px 8px", backgroundColor: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", borderRadius: "4px", fontSize: "0.72rem", cursor: "pointer", fontWeight: 700 }}>Service</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* F. GENERAL MANAGER ADMIN TAB */}
        {activeTab === "admin" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Hotel Executive Management Desk</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Total Suites Capacity</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#1e3a8a" }}>{roomsList.length * 10} Rooms</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Current Occupancy Rate</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a" }}>78.4%</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Average Daily RevPAR</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>₹4,850</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. DEDICATED HOTEL FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "2px solid #1e3a8a", marginTop: "60px", padding: "40px 20px 20px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{hotelInfo.name}</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
              5-Star heritage luxury suites, banquet halls and gourmet dining palace in the heart of Civil Lines, Kanpur.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#1e3a8a", fontWeight: 700 }}>Concierge 24x7: {hotelInfo.phone}</div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Hotel Policies</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>
              <div>Standard Check-In: {hotelInfo.checkInTime}</div>
              <div>Standard Check-Out: {hotelInfo.checkOutTime}</div>
              <div>Early Check-In / Late Check-Out: Subject to availability</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Location &amp; Connectivity</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
              <div>Palace Enclave, Civil Lines, Kanpur, Uttar Pradesh 208001</div>
              <div style={{ marginTop: "6px", color: "#16a34a", fontWeight: 700 }}>✓ 15 Mins from Kanpur Central Railway Station</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "center", fontSize: "0.78rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} {hotelInfo.name}. All Rights Reserved. • Designed in Pure Light Mode.
        </div>
      </footer>
    </div>
  );
}
