"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Scissors,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Heart,
  User,
  CreditCard,
  Printer,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { beautyParlourData } from "@/data/businessAppsData";

export default function BeautyParlourApp() {
  const { salonInfo, categories, services, stylists } = beautyParlourData;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("2026-09-30");
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const [selectedStylist, setSelectedStylist] = useState(stylists[0].name);
  const [appointmentBooked, setAppointmentBooked] = useState(null);
  const [activeTab, setActiveTab] = useState("services"); // "services", "billing", "stylists"

  // Quick POS Billing state for salon
  const [billingServices, setBillingServices] = useState([services[0], services[1]]);
  const [billGenerated, setBillGenerated] = useState(null);

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert("Please fill client name and phone number");
      return;
    }
    const newBooking = {
      bookingId: `GLAM-${Math.floor(1000 + Math.random() * 9000)}`,
      service: selectedService?.name || "Bridal / Hair Package",
      price: selectedService?.price || 2499,
      clientName,
      clientPhone,
      date: selectedDate,
      time: selectedTime,
      stylist: selectedStylist,
    };
    setAppointmentBooked(newBooking);
    setSelectedService(null);
  };

  const handleGenerateBill = () => {
    const subtotal = billingServices.reduce((acc, s) => acc + s.price, 0);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    setBillGenerated({
      billNo: `INV-SALON-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString(),
      client: clientName || "Mrs. Pooja Agrawal",
      items: billingServices,
      subtotal,
      gst,
      total,
    });
  };

  return (
    <div style={{ backgroundColor: "#fffafb", color: "#1e293b", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #fecdd3", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(225,29,72,0.06)" }}>
        <div style={{ backgroundColor: "#fff1f2", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#be123c", fontWeight: 600 }}>
          <span>🌸 Festive Special: Flat 20% OFF on All Bridal Packages • Call: {salonInfo.phone}</span>
          <Link href="/business-suite" style={{ color: "#be123c", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#e11d48", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Scissors size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                {salonInfo.name}
              </h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{salonInfo.tagline} • Kanpur</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setActiveTab("services")}
              style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "services" ? "1px solid #e11d48" : "1px solid #cbd5e1", backgroundColor: activeTab === "services" ? "#fff1f2" : "#ffffff", color: activeTab === "services" ? "#e11d48" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
            >
              Services &amp; Booking
            </button>
            <button
              onClick={() => setActiveTab("stylists")}
              style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "stylists" ? "1px solid #e11d48" : "1px solid #cbd5e1", backgroundColor: activeTab === "stylists" ? "#fff1f2" : "#ffffff", color: activeTab === "stylists" ? "#e11d48" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
            >
              Master Stylists
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "billing" ? "1px solid #e11d48" : "1px solid #cbd5e1", backgroundColor: activeTab === "billing" ? "#fff1f2" : "#ffffff", color: activeTab === "billing" ? "#e11d48" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
            >
              Salon POS Billing
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Banner */}
      {appointmentBooked && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Appointment #{appointmentBooked.bookingId} Confirmed for {appointmentBooked.clientName} on {appointmentBooked.date} at {appointmentBooked.time}! Stylist: {appointmentBooked.stylist}</span>
            </div>
            <button onClick={() => setAppointmentBooked(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        {activeTab === "services" && (
          <div>
            {/* Category Filter Pills */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "14px", marginBottom: "20px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "20px",
                    border: selectedCategory === cat ? "1px solid #e11d48" : "1px solid #e2e8f0",
                    backgroundColor: selectedCategory === cat ? "#e11d48" : "#ffffff",
                    color: selectedCategory === cat ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
              {filteredServices.map((srv) => (
                <div key={srv.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", overflow: "hidden", boxShadow: "0 3px 12px rgba(225,29,72,0.05)", display: "flex", flexDirection: "column" }}>
                  <img src={srv.image} alt={srv.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{srv.name}</h3>
                      <span style={{ backgroundColor: "#fff1f2", color: "#e11d48", padding: "2px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>★ {srv.rating}</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 14px", flex: 1 }}>{srv.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #fecdd3", paddingTop: "12px" }}>
                      <div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>{srv.duration}</span>
                        <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#e11d48" }}>₹{srv.price}</span>
                      </div>
                      <button
                        onClick={() => setSelectedService(srv)}
                        style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 3px 10px rgba(225,29,72,0.3)" }}
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stylists Tab */}
        {activeTab === "stylists" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {stylists.map((st, i) => (
              <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "24px", textAlign: "center" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#fff1f2", color: "#e11d48", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "1.5rem", fontWeight: 900 }}>
                  {st.name[0]}
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{st.name}</h3>
                <div style={{ color: "#e11d48", fontWeight: 700, fontSize: "0.85rem", marginBottom: "8px" }}>{st.role}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Experience: {st.exp} • Client Rating: ★ {st.rating}</div>
              </div>
            ))}
          </div>
        )}

        {/* Salon POS Billing Tab */}
        {activeTab === "billing" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Salon Cashier &amp; POS Billing Desk</h2>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Client Name</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="e.g. Mrs. Sharma" style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px" }}>Selected Treatments:</div>
              {billingServices.map((s, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#fff1f2", borderRadius: "8px", marginBottom: "6px" }}>
                  <span>{s.name} ({s.duration})</span>
                  <span style={{ fontWeight: 800 }}>₹{s.price}</span>
                </div>
              ))}
            </div>

            <button onClick={handleGenerateBill} style={{ width: "100%", backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Printer size={18} />
              <span>Generate Official GST Salon Invoice</span>
            </button>

            {billGenerated && (
              <div style={{ marginTop: "20px", border: "1px dashed #e11d48", borderRadius: "12px", padding: "16px", backgroundColor: "#fffafb", fontFamily: "monospace" }}>
                <div style={{ textAlign: "center", fontWeight: 900, fontSize: "1.1rem" }}>{salonInfo.name}</div>
                <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>Tax Invoice #: {billGenerated.billNo} • Date: {billGenerated.date}</div>
                <hr style={{ margin: "10px 0", borderColor: "#fecdd3" }} />
                {billGenerated.items.map((it, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                    <span>{it.name}</span>
                    <span>₹{it.price}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginTop: "6px" }}>
                  <span>GST (18%):</span>
                  <span>₹{billGenerated.gst}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1rem", color: "#e11d48", borderTop: "1px dashed #e11d48", paddingTop: "6px", marginTop: "6px" }}>
                  <span>TOTAL PAID:</span>
                  <span>₹{billGenerated.total}</span>
                </div>
                <button onClick={() => window.print()} style={{ marginTop: "12px", width: "100%", padding: "8px", backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Print Receipt</button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedService && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedService(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Book Salon Slot</h3>
            <p style={{ color: "#e11d48", fontWeight: 700, margin: "0 0 16px" }}>{selectedService.name} - ₹{selectedService.price}</p>
            <form onSubmit={handleBookAppointment} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Client Name *" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option>10:30 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>04:30 PM</option>
                  <option>06:00 PM</option>
                </select>
              </div>
              <select value={selectedStylist} onChange={(e) => setSelectedStylist(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                {stylists.map((st, i) => (<option key={i} value={st.name}>{st.name} ({st.role})</option>))}
              </select>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setSelectedService(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#e11d48", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
