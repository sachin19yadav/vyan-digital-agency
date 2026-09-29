"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Tv,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";
import { repairServicesData } from "@/data/businessAppsData";

export default function RepairServicesApp() {
  const { serviceInfo, services } = repairServicesData;
  const [selectedService, setSelectedService] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-09-30");
  const [preferredTime, setPreferredTime] = useState("Morning (10:00 AM – 01:00 PM)");
  const [issueNotes, setIssueNotes] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const handleBookVisit = (e) => {
    e.preventDefault();
    if (!userName || !userPhone || !userAddress) {
      alert("Please provide name, phone and complete address.");
      return;
    }
    const booking = {
      jobId: `JOB-AC-${Math.floor(1000 + Math.random() * 9000)}`,
      appliance: selectedService.appliance,
      title: selectedService.title,
      userName,
      userPhone,
      userAddress,
      date: preferredDate,
      time: preferredTime,
      visitingFee: selectedService.visitingFee,
      technician: "Manoj Kushwaha (Certified UrbanTech Pro)",
      techPhone: "+91 98390 11223",
      status: "Technician Dispatched",
    };
    setBookingConfirmed(booking);
    setSelectedService(null);
  };

  return (
    <div style={{ backgroundColor: "#fafaf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#fff7ed", borderBottom: "1px solid #fed7aa", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#c2410c", fontWeight: 700 }}>
        <span>⚡ 90-Day Repair Warranty • 100% Genuine Spare Parts • Emergency Tech Helpline: {serviceInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#c2410c", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#ea580c", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wrench size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{serviceInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{serviceInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href={`tel:${serviceInfo.phone}`} style={{ backgroundColor: "#ea580c", color: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              <Phone size={14} /> Call Technician Now
            </a>
          </div>
        </div>
      </header>

      {/* Confirmation Banner */}
      {bookingConfirmed && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "16px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={24} />
              <div>
                <div style={{ fontSize: "1rem" }}>Service Job #{bookingConfirmed.jobId} Booked! (Visiting Fee: ₹{bookingConfirmed.visitingFee})</div>
                <div style={{ fontSize: "0.8rem", color: "#166534" }}>Technician {bookingConfirmed.technician} ({bookingConfirmed.techPhone}) will arrive at {bookingConfirmed.userAddress} on {bookingConfirmed.date} ({bookingConfirmed.time}).</div>
              </div>
            </div>
            <button onClick={() => setBookingConfirmed(null)} style={{ background: "none", border: "none", color: "#15803d", fontWeight: 800, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      {/* Main Services Grid */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>
            Select Home Appliance for Expert Doorstep Repair
          </h2>
          <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>
            Transparent diagnostic rates, verified background-checked engineers, and genuine parts warranty.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {services.map((s) => (
            <div key={s.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fed7aa", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(234,88,12,0.04)" }}>
              <img src={s.image} alt={s.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.75rem", backgroundColor: "#fff7ed", color: "#c2410c", padding: "2px 8px", borderRadius: "6px", fontWeight: 800 }}>
                    {s.appliance}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>
                    ✓ {s.warranty} Warranty
                  </span>
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", lineHeight: 1.3 }}>
                  {s.title}
                </h3>

                <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", fontSize: "0.8rem", color: "#475569", marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
                  <span>Inspection Fee: <strong>₹{s.visitingFee}</strong></span>
                  <span>Repairs from: <strong>₹{s.repairStart}</strong></span>
                </div>

                <button
                  onClick={() => setSelectedService(s)}
                  style={{ marginTop: "auto", width: "100%", backgroundColor: "#ea580c", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 3px 10px rgba(234,88,12,0.3)" }}
                >
                  Book Technician Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Appointment Modal */}
      {selectedService && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedService(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Book Technician Visit</h3>
            <p style={{ color: "#ea580c", fontWeight: 700, margin: "0 0 16px" }}>{selectedService.appliance} Service (Inspection: ₹{selectedService.visitingFee})</p>
            <form onSubmit={handleBookVisit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Customer Name *" value={userName} onChange={(e) => setUserName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option>Morning (10:00 AM – 01:00 PM)</option>
                  <option>Afternoon (01:00 PM – 04:00 PM)</option>
                  <option>Evening (04:00 PM – 07:00 PM)</option>
                </select>
              </div>
              <textarea rows={2} placeholder="Complete Street Address in Kanpur *" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Problem Description (e.g. AC not cooling, water leak)" value={issueNotes} onChange={(e) => setIssueNotes(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setSelectedService(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#ea580c", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
