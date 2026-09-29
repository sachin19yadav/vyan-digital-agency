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
} from "lucide-react";
import { hotelData } from "@/data/businessAppsData";

export default function HotelApp() {
  const { hotelInfo, rooms, sampleBookings } = hotelData;
  const [activeTab, setActiveTab] = useState("rooms"); // "rooms", "bookings", "billing"
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState("2026-10-01");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-03");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingsList, setBookingsList] = useState(sampleBookings);

  // Billing state
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
    if (!guestName || !guestPhone || !selectedRoom) return;
    const roomTotal = selectedRoom.pricePerNight * nights;
    const tax = Math.round(roomTotal * 0.12);
    const total = roomTotal + tax;

    const newBooking = {
      id: `HTL-${Math.floor(100 + Math.random() * 900)}`,
      guestName,
      guestPhone,
      roomType: selectedRoom.name,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      total,
      status: "Confirmed",
    };

    setBookingsList([newBooking, ...bookingsList]);
    setConfirmedBooking(newBooking);
    setSelectedRoom(null);
  };

  const handleGenerateFolio = (bk) => {
    setBillingFolio({
      folioNo: `FOLIO-${bk.id}`,
      guest: bk.guestName,
      room: bk.roomType,
      dates: `${bk.checkIn} to ${bk.checkOut} (${bk.nights || 2} Nights)`,
      roomCharges: bk.total,
      serviceTax: Math.round(bk.total * 0.12),
      grandTotal: Math.round(bk.total * 1.12),
      date: new Date().toLocaleDateString(),
    });
    setActiveTab("billing");
  };

  return (
    <div style={{ backgroundColor: "#fafaf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#1e40af", fontWeight: 700 }}>
        <span>🏨 The Grand Regency Palace • Free Airport Pickup &amp; Breakfast Included • Front Desk: {hotelInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#1e40af", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#1e3a8a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{hotelInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{hotelInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("rooms")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "rooms" ? "1px solid #1e3a8a" : "1px solid #cbd5e1", backgroundColor: activeTab === "rooms" ? "#eff6ff" : "#ffffff", color: activeTab === "rooms" ? "#1e3a8a" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Rooms &amp; Suites
            </button>
            <button onClick={() => setActiveTab("bookings")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "bookings" ? "1px solid #1e3a8a" : "1px solid #cbd5e1", backgroundColor: activeTab === "bookings" ? "#eff6ff" : "#ffffff", color: activeTab === "bookings" ? "#1e3a8a" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Guest Folios ({bookingsList.length})
            </button>
            <button onClick={() => setActiveTab("billing")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "billing" ? "1px solid #1e3a8a" : "1px solid #cbd5e1", backgroundColor: activeTab === "billing" ? "#eff6ff" : "#ffffff", color: activeTab === "billing" ? "#1e3a8a" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Hotel POS Checkout
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Alert */}
      {confirmedBooking && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Room Reserved! Booking ID #{confirmedBooking.id} confirmed for {confirmedBooking.guestName} ({confirmedBooking.roomType}, {confirmedBooking.nights} Nights, ₹{confirmedBooking.total})</span>
            </div>
            <button onClick={() => setConfirmedBooking(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        {activeTab === "rooms" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
            {rooms.map((rm) => (
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
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Tariff per night:</span>
                      <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1e3a8a" }}>₹{rm.pricePerNight}</span>
                    </div>
                    <button
                      onClick={() => setSelectedRoom(rm)}
                      style={{ backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 3px 10px rgba(30,58,138,0.25)" }}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings & Folios */}
        {activeTab === "bookings" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Hotel Guest Folios &amp; Reservation Register</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Booking ID</th>
                    <th style={{ padding: "10px 14px" }}>Guest Name</th>
                    <th style={{ padding: "10px 14px" }}>Room Category</th>
                    <th style={{ padding: "10px 14px" }}>Dates</th>
                    <th style={{ padding: "10px 14px" }}>Total Amount</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                    <th style={{ padding: "10px 14px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingsList.map((b) => (
                    <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{b.id}</td>
                      <td style={{ padding: "12px 14px" }}>{b.guestName}</td>
                      <td style={{ padding: "12px 14px" }}>{b.roomType}</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{b.checkIn} to {b.checkOut}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 900, color: "#1e3a8a" }}>₹{b.total}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "6px", fontWeight: 800, fontSize: "0.75rem" }}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <button onClick={() => handleGenerateFolio(b)} style={{ backgroundColor: "#eff6ff", color: "#1e40af", border: "1px solid #bfdbfe", padding: "5px 10px", borderRadius: "6px", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer" }}>
                          Generate Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hotel Billing Checkout Tab */}
        {activeTab === "billing" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Hotel Guest Folio &amp; GST Checkout</h2>
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
                  <span>Luxury Tax &amp; GST (12%):</span>
                  <span>₹{billingFolio.serviceTax}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1rem", color: "#1e3a8a", borderTop: "1px dashed #1e3a8a", paddingTop: "8px", marginTop: "8px" }}>
                  <span>TOTAL SETTLED:</span>
                  <span>₹{billingFolio.grandTotal}</span>
                </div>
                <button onClick={() => window.print()} style={{ width: "100%", backgroundColor: "#1e3a8a", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer", marginTop: "14px" }}>
                  Print Guest Tax Invoice
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                Select a guest from the "Guest Folios" tab to generate and print official room invoice.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Reservation Modal */}
      {selectedRoom && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedRoom(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Reserve {selectedRoom.name}</h3>
            <p style={{ color: "#1e3a8a", fontWeight: 700, margin: "0 0 16px" }}>₹{selectedRoom.pricePerNight} / night • {nights} Night(s) Stay</p>
            <form onSubmit={handleBookRoom} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Primary Guest Name *" value={guestName} onChange={(e) => setGuestName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div>
                  <label style={{ fontSize: "0.72rem", color: "#64748b" }}>Check-In</label>
                  <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ fontSize: "0.72rem", color: "#64748b" }}>Check-Out</label>
                  <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setSelectedRoom(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#1e3a8a", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
