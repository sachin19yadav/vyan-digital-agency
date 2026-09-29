"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  Sparkles,
  Calendar,
  Clock,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Droplets,
} from "lucide-react";
import { carCleaningData } from "@/data/businessAppsData";

export default function CarCleaningApp() {
  const { studioInfo, packages } = carCleaningData;
  const [vehicleType, setVehicleType] = useState("Hatchback"); // "Hatchback", "Sedan", "SUV"
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [slotDate, setSlotDate] = useState("2026-10-01");
  const [slotTime, setSlotTime] = useState("10:00 AM – 11:30 AM");
  const [serviceLocation, setServiceLocation] = useState("Doorstep at My Home / Office");
  const [slotConfirmed, setSlotConfirmed] = useState(null);

  const getPackagePrice = (pkg) => {
    if (vehicleType === "Sedan") return pkg.priceSedan;
    if (vehicleType === "SUV") return pkg.priceSUV;
    return pkg.priceHatchback;
  };

  const handleBookSlot = (e) => {
    e.preventDefault();
    if (!ownerName || !ownerPhone || !carNumber) {
      alert("Please enter owner name, phone, and car number");
      return;
    }
    const booking = {
      bookingId: `WASH-${Math.floor(100 + Math.random() * 900)}`,
      packageName: selectedPkg.name,
      vehicleType,
      carNumber: carNumber.toUpperCase(),
      carModel: carModel || "Car",
      ownerName,
      ownerPhone,
      date: slotDate,
      time: slotTime,
      location: serviceLocation,
      price: getPackagePrice(selectedPkg),
    };
    setSlotConfirmed(booking);
    setSelectedPkg(null);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0f9ff", borderBottom: "1px solid #bae6fd", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#0284c7", fontWeight: 700 }}>
        <span>🚗 {studioInfo.name} • Scratch-Free Microfiber Foam Wash • Doorstep Express Slot: {studioInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#0284c7", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{studioInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{studioInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a href={`tel:${studioInfo.phone}`} style={{ backgroundColor: "#0284c7", color: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", textDecoration: "none" }}>
              Instant Booking: {studioInfo.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Booking Confirmed Notification */}
      {slotConfirmed && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "16px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={24} />
              <div>
                <div style={{ fontSize: "1rem" }}>Bay Slot #{slotConfirmed.bookingId} Confirmed for {slotConfirmed.carNumber} ({slotConfirmed.carModel})! Total: ₹{slotConfirmed.price}</div>
                <div style={{ fontSize: "0.8rem", color: "#166534" }}>{slotConfirmed.packageName} scheduled on {slotConfirmed.date} ({slotConfirmed.time}) at {slotConfirmed.location}.</div>
              </div>
            </div>
            <button onClick={() => setSlotConfirmed(null)} style={{ background: "none", border: "none", color: "#15803d", fontWeight: 800, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      {/* Vehicle Type Switcher Bar */}
      <section style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)", padding: "30px 20px 24px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>Select Your Car Segment</h2>
          <p style={{ color: "#64748b", margin: "0 0 16px", fontSize: "0.85rem" }}>Prices adjust automatically based on body size and detailing requirement.</p>

          <div style={{ display: "inline-flex", backgroundColor: "#ffffff", padding: "4px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
            {["Hatchback", "Sedan", "SUV"].map((type) => (
              <button
                key={type}
                onClick={() => setVehicleType(type)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: vehicleType === type ? "#0284c7" : "transparent",
                  color: vehicleType === type ? "#ffffff" : "#475569",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Packages Grid */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
          {packages.map((pkg) => {
            const price = getPackagePrice(pkg);

            return (
              <div key={pkg.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{pkg.name}</h3>
                  <span style={{ fontSize: "0.75rem", backgroundColor: "#f0f9ff", color: "#0284c7", padding: "3px 8px", borderRadius: "6px", fontWeight: 800 }}>
                    {pkg.duration}
                  </span>
                </div>

                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7", marginBottom: "16px" }}>
                  ₹{price} <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>for {vehicleType}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", flex: 1 }}>
                  {pkg.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#475569" }}>
                      <CheckCircle2 size={15} color="#0284c7" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPkg(pkg)}
                  style={{ width: "100%", backgroundColor: "#0284c7", color: "#ffffff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 3px 10px rgba(2,132,199,0.3)" }}
                >
                  Book Wash Slot
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Slot Booking Modal */}
      {selectedPkg && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedPkg(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Schedule Car Wash Appointment</h3>
            <p style={{ color: "#0284c7", fontWeight: 700, margin: "0 0 16px" }}>{selectedPkg.name} ({vehicleType} - ₹{getPackagePrice(selectedPkg)})</p>
            <form onSubmit={handleBookSlot} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Car Owner Full Name *" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="text" placeholder="Car Reg No. (e.g. UP 78 AB 1234) *" value={carNumber} onChange={(e) => setCarNumber(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="text" placeholder="Car Model (e.g. Creta)" value={carModel} onChange={(e) => setCarModel(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <select value={slotTime} onChange={(e) => setSlotTime(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option>09:00 AM – 10:30 AM</option>
                  <option>11:00 AM – 12:30 PM</option>
                  <option>02:00 PM – 03:30 PM</option>
                  <option>04:30 PM – 06:00 PM</option>
                </select>
              </div>
              <select value={serviceLocation} onChange={(e) => setServiceLocation(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                <option>Doorstep at My Home / Office</option>
                <option>Drop Car at AutoShine Studio Bay</option>
              </select>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setSelectedPkg(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#0284c7", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
