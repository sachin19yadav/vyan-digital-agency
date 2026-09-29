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
  CreditCard,
  Printer,
  ChevronRight,
  Search,
  Plus,
  Award,
  Star,
  Check,
  ArrowRight,
  User,
  Settings,
  Flame,
  Zap,
} from "lucide-react";
import { carCleaningData } from "@/data/businessAppsData";

export default function CarCleaningApp() {
  const { studioInfo, packages: initialPackages } = carCleaningData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "packages", "billing", "bays", "admin"
  const [currentRole, setCurrentRole] = useState("CarOwner"); // "CarOwner", "DetailerStaff", "Billing", "Admin"
  const [packagesList, setPackagesList] = useState(initialPackages);
  const [vehicleType, setVehicleType] = useState("Sedan"); // "Hatchback", "Sedan", "SUV"

  // Booking Modal State
  const [selectedPkgForModal, setSelectedPkgForModal] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [slotDate, setSlotDate] = useState("2026-10-01");
  const [slotTime, setSlotTime] = useState("10:00 AM – 11:30 AM");
  const [serviceLocation, setServiceLocation] = useState("Doorstep at My Home / Office");
  const [slotConfirmedAlert, setSlotConfirmedAlert] = useState(null);

  // Active Detailing Bays State
  const [bayOrders, setBayOrders] = useState([
    {
      id: "BAY-101",
      bay: "Bay 1 (High-Pressure Foam)",
      customer: "Vikramaditya Singhal",
      car: "UP78 EQ 9900 (Hyundai Creta)",
      package: "Complete 360 Full Detailing & Teflon Glaze",
      status: "In Progress (3-Step Cut & Buff)",
      slot: "Today 10:30 AM",
      bill: 3199,
    },
    {
      id: "BAY-102",
      bay: "Bay 2 (Steam Extraction Lab)",
      customer: "Rohan Malhotra",
      car: "UP78 DF 4411 (Honda City)",
      package: "Deep Interior Shampoo & Steam Sanitization",
      status: "Under Infrared Drying",
      slot: "Today 11:45 AM",
      bill: 1399,
    },
    {
      id: "BAY-103",
      bay: "Bay 3 (Express Wash Lane)",
      customer: "Dr. Shalini Gupta",
      car: "UP78 BZ 1205 (Maruti Swift)",
      package: "Quick High-Pressure Foam Exterior Wash",
      status: "Completed & Gloss Inspected",
      slot: "Today 01:15 PM",
      bill: 349,
    },
  ]);

  // Billing POS State
  const [billOwner, setBillOwner] = useState("Vikramaditya Singhal");
  const [billPhone, setBillPhone] = useState("9839112233");
  const [billCarReg, setBillCarReg] = useState("UP78 EQ 9900");
  const [billCarModel, setBillCarModel] = useState("Hyundai Creta SX (O)");
  const [billPackageName, setBillPackageName] = useState("Complete 360 Full Detailing & Teflon Glaze");
  const [billPackagePrice, setBillPackagePrice] = useState(3199);
  const [billAddonName, setBillAddonName] = useState("Windshield Hydrophobic Rain-Repellent Coating");
  const [billAddonPrice, setBillAddonPrice] = useState(499);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New Package State
  const [newPkgName, setNewPkgName] = useState("");
  const [newPkgDuration, setNewPkgDuration] = useState("60 mins");
  const [newPriceHatch, setNewPriceHatch] = useState("499");
  const [newPriceSedan, setNewPriceSedan] = useState("599");
  const [newPriceSUV, setNewPriceSUV] = useState("699");

  // Price helper based on vehicle type
  const getPackagePrice = (pkg, vType = vehicleType) => {
    if (vType === "Sedan") return pkg.priceSedan;
    if (vType === "SUV") return pkg.priceSUV;
    return pkg.priceHatchback;
  };

  // Handle Book Slot Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!ownerName || !ownerPhone || !carNumber) {
      alert("Please enter customer name, phone, and car number.");
      return;
    }

    const price = selectedPkgForModal ? getPackagePrice(selectedPkgForModal) : 499;

    const newBay = {
      id: `BAY-${Math.floor(200 + Math.random() * 300)}`,
      bay: serviceLocation.includes("Doorstep") ? "Mobile Doorstep Van 02" : "Studio Bay 01",
      customer: ownerName,
      car: `${carNumber.toUpperCase()} (${carModel || "Car"})`,
      package: selectedPkgForModal ? selectedPkgForModal.name : "Custom Car Spa",
      status: "Scheduled & Bay Reserved",
      slot: `${slotDate} (${slotTime})`,
      bill: price,
    };

    setBayOrders([newBay, ...bayOrders]);
    setSlotConfirmedAlert(newBay);
    setSelectedPkgForModal(null);
    setOwnerName("");
    setOwnerPhone("");
    setCarNumber("");
    setCarModel("");
  };

  // Handle Admin Add Package
  const handleAdminAddPkg = (e) => {
    e.preventDefault();
    if (!newPkgName || !newPriceHatch) return;

    const pkg = {
      id: `CAR-0${packagesList.length + 1}`,
      name: newPkgName,
      duration: newPkgDuration,
      priceHatchback: parseInt(newPriceHatch) || 499,
      priceSedan: parseInt(newPriceSedan) || 599,
      priceSUV: parseInt(newPriceSUV) || 699,
      features: ["pH-Neutral Snow Foam", "Underbody Rinse", "Tire Shine Dressing", "Interior Vacuum"],
    };

    setPackagesList([...packagesList, pkg]);
    setNewPkgName("");
    alert(`Detailing Package "${pkg.name}" added to live studio catalog!`);
  };

  // Calculations for Billing POS
  const billTaxableSubtotal = Number(billPackagePrice) + Number(billAddonPrice);
  const billGst = Math.round(billTaxableSubtotal * 0.18);
  const billGrandTotal = billTaxableSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const inv = {
      invoiceNo: `AUTOSHINE-POS-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      customer: billOwner,
      phone: billPhone,
      carReg: billCarReg,
      carModel: billCarModel,
      package: billPackageName,
      packagePrice: Number(billPackagePrice),
      addonName: billAddonName,
      addonPrice: Number(billAddonPrice),
      gst: billGst,
      total: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0f9ff", borderBottom: "1px solid #e0f2fe", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#0369a1", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Sparkles size={16} color="#0369a1" />
          <span>AutoShine Car Detailing Studio &amp; Doorstep Van • pH-Neutral Snow Foam • 9H Ceramic Shield Certified</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Studio Hotline: <strong>{studioInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#0369a1", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)" }}>
              <Car size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {studioInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {studioInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Studio Overview" },
              { id: "packages", label: "Spa Packages & Slots" },
              { id: "billing", label: "Studio POS Tax Invoice" },
              { id: "bays", label: "Detailing Bay Operations" },
              { id: "admin", label: "Studio GM Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "bays") setCurrentRole("DetailerStaff");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("CarOwner");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #0284c7" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#f0f9ff" : "transparent",
                  color: activeTab === t.id ? "#0284c7" : "#475569",
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Role Switcher & Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f1f5f9", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem" }}>
              <span style={{ color: "#64748b" }}>Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Billing") setActiveTab("billing");
                  else if (r === "DetailerStaff") setActiveTab("bays");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("packages");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#0284c7", outline: "none", cursor: "pointer" }}
              >
                <option value="CarOwner">Car Owner</option>
                <option value="DetailerStaff">Bay Detailer / Supervisor</option>
                <option value="Billing">Studio POS Cashier</option>
                <option value="Admin">Studio General Manager</option>
              </select>
            </div>

            <button
              onClick={() => setSelectedPkgForModal(packagesList[0])}
              style={{
                backgroundColor: "#0284c7",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Calendar size={16} /> Book Bay Slot
            </button>
          </div>
        </div>
      </header>

      {/* Slot Confirmed Alert */}
      {slotConfirmedAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>
                ✓ Slot Confirmed! Booking <strong>{slotConfirmedAlert.id}</strong>: Reserved at {slotConfirmedAlert.bay} for {slotConfirmedAlert.car} ({slotConfirmedAlert.package}). Total: ₹{slotConfirmedAlert.bill.toLocaleString()}.
              </span>
            </div>
            <button
              onClick={() => setSlotConfirmedAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: STUDIO OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f0f9ff", color: "#0284c7", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Sparkles size={16} /> World-Class Automated &amp; Hand-Detailed Car Spa
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Showroom Gloss, pH-Neutral Snow Wash &amp; 9H Ceramic Paint Protection
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Protect your vehicle from micro-scratches and hard water stains. We utilize two-bucket grit guard techniques, 120 PSI heated steam extractors, and German Meguiar's polishing compounds for supreme swirl-free gloss.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("packages")}
                  style={{
                    backgroundColor: "#0284c7",
                    color: "#ffffff",
                    padding: "12px 26px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
                  }}
                >
                  <Car size={18} /> View Detailing Packages
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0284c7",
                    border: "1px solid #0284c7",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CreditCard size={18} /> Studio POS Invoice
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0284c7" }}>4,500+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Cars Detailed</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0284c7" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Scratch-Free Microfiber</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0284c7" }}>3 Years</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Ceramic Glass Warranty</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1000&q=80"
                alt="Automated Snow Foam Car Detailing"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#f0f9ff", color: "#0284c7", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>Meguiar's &amp; 3M Certified Studio</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Dual-Action Polishing with Zero Swirl Marks</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of AutoShine */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                The Ultimate Automotive Spa Experience
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Precision treatments for exterior paint protection and deep interior sanitization.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <Droplets size={28} color="#0284c7" />,
                  title: "Thick Snow Foam Wash",
                  desc: "pH-neutral Italian shampoo encapsulates surface grit, gently lifting dirt without touching paint.",
                },
                {
                  icon: <Sparkles size={28} color="#0284c7" />,
                  title: "9H Nano Ceramic Coating",
                  desc: "Multi-layered quartz crystal barrier shields against UV rays, acid rain, and bird droppings.",
                },
                {
                  icon: <ShieldCheck size={28} color="#0284c7" />,
                  title: "Hot Steam Extraction",
                  desc: "140°C steam eradicates bacteria, dust mites, and odors from seat fabric, roof liner, and AC ducts.",
                },
                {
                  icon: <CreditCard size={28} color="#0284c7" />,
                  title: "Computerized POS Receipts",
                  desc: "Clear tax invoices with vehicle registration number, treatment warranties, and maintenance advice.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#f0f9ff", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Spa Packages */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Signature Car Spa Packages
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Select your vehicle segment to view exact customized pricing
                </p>
              </div>

              {/* Segment Toggle */}
              <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "10px", gap: "4px" }}>
                {["Hatchback", "Sedan", "SUV"].map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setVehicleType(seg)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: vehicleType === seg ? "#0284c7" : "transparent",
                      color: vehicleType === seg ? "#ffffff" : "#475569",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {seg}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {packagesList.map((pkg) => (
                <div key={pkg.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>{pkg.id} • {pkg.duration}</span>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>{pkg.name}</h3>
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Pricing for {vehicleType}</div>
                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7" }}>
                      ₹{getPackagePrice(pkg).toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px", flex: 1 }}>
                    {pkg.features.map((f, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155" }}>
                        <Check size={16} color="#0284c7" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPkgForModal(pkg)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0284c7",
                      color: "#ffffff",
                      border: "none",
                      padding: "12px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                  >
                    Reserve Bay Slot
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: PACKAGES & SLOTS */}
      {activeTab === "packages" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                AutoShine Detailing Menu
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Select vehicle segment and book an express washing bay slot
              </p>
            </div>

            <div style={{ display: "flex", backgroundColor: "#e2e8f0", padding: "4px", borderRadius: "10px", gap: "4px" }}>
              {["Hatchback", "Sedan", "SUV"].map((seg) => (
                <button
                  key={seg}
                  onClick={() => setVehicleType(seg)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: vehicleType === seg ? "#0284c7" : "transparent",
                    color: vehicleType === seg ? "#ffffff" : "#475569",
                  }}
                >
                  {seg}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {packagesList.map((pkg) => (
              <div key={pkg.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0284c7", textTransform: "uppercase" }}>{pkg.id} • {pkg.duration}</span>
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>{pkg.name}</h2>
                  </div>
                </div>

                <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Rate for {vehicleType}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7" }}>
                    ₹{getPackagePrice(pkg).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px", flex: 1 }}>
                  {pkg.features.map((f, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155" }}>
                      <Check size={16} color="#0284c7" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPkgForModal(pkg)}
                  style={{
                    width: "100%",
                    backgroundColor: "#0284c7",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Book Bay Slot
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: STUDIO POS TAX INVOICE */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Studio POS Billing &amp; Tax Invoice Desk
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate official car spa tax receipts, treatment warranties, and add-on coatings
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#0284c7" /> Vehicle Service Particulars
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Vehicle Owner Name</label>
                  <input
                    type="text"
                    value={billOwner}
                    onChange={(e) => setBillOwner(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Phone Number</label>
                  <input
                    type="text"
                    value={billPhone}
                    onChange={(e) => setBillPhone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Vehicle Registration No.</label>
                  <input
                    type="text"
                    value={billCarReg}
                    onChange={(e) => setBillCarReg(e.target.value.toUpperCase())}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Car Make &amp; Model</label>
                  <input
                    type="text"
                    value={billCarModel}
                    onChange={(e) => setBillCarModel(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Primary Spa Treatment</label>
                  <select
                    value={billPackageName}
                    onChange={(e) => {
                      setBillPackageName(e.target.value);
                      const pkg = packagesList.find((p) => p.name === e.target.value);
                      if (pkg) setBillPackagePrice(pkg.priceSedan);
                    }}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    {packagesList.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Package Price (₹)</label>
                  <input
                    type="number"
                    value={billPackagePrice}
                    onChange={(e) => setBillPackagePrice(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Add-on Treatment (Optional)</label>
                  <input
                    type="text"
                    value={billAddonName}
                    onChange={(e) => setBillAddonName(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Add-on Price (₹)</label>
                  <input
                    type="number"
                    value={billAddonPrice}
                    onChange={(e) => setBillAddonPrice(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateInvoice}
                style={{
                  width: "100%",
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Printer size={18} /> Review &amp; Print Detailing Tax Invoice
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Service Charge Ledger
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Base Package</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billPackagePrice).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Add-on Coating Treatment</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billAddonPrice).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billTaxableSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Automotive Services GST (18%)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#f0f9ff", border: "1px solid #e0f2fe", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#0284c7", fontWeight: 600 }}>Total Final Bill</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#0369a1", marginTop: "4px" }}>
                    *Includes scratch-free micro-fiber wipe down and tire gloss treatment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: DETAILING BAY OPERATIONS */}
      {activeTab === "bays" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Live Washing Bays &amp; Detailing Board
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Bay allocation, steam extraction status, and infrared paint curing monitor
              </p>
            </div>
            <div style={{ backgroundColor: "#f0f9ff", color: "#0284c7", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Live Bays Occupied: {bayOrders.length} Cars
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Bay Allocation</th>
                  <th style={{ padding: "14px 20px" }}>Vehicle &amp; Customer</th>
                  <th style={{ padding: "14px 20px" }}>Selected Spa Treatment</th>
                  <th style={{ padding: "14px 20px" }}>Slot Time</th>
                  <th style={{ padding: "14px 20px" }}>Amount</th>
                  <th style={{ padding: "14px 20px" }}>Bay Status</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {bayOrders.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#0284c7" }}>{b.bay}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{b.car}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Owner: {b.customer}</div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#334155", fontWeight: 600 }}>{b.package}</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{b.slot}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#0f172a" }}>₹{b.bill.toLocaleString()}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: b.status.includes("Completed") ? "#f0fdf4" : "#fef3c7", color: b.status.includes("Completed") ? "#166534" : "#92400e", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button
                        onClick={() => {
                          const updated = bayOrders.map((item) =>
                            item.id === b.id
                              ? { ...item, status: item.status.includes("Completed") ? "In Progress" : "Completed & Gloss Inspected" }
                              : item
                          );
                          setBayOrders(updated);
                        }}
                        style={{
                          backgroundColor: "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          color: "#334155",
                        }}
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 5: STUDIO GM ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Studio General Manager Dashboard
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Master bay turnover rates, revenue analytics, and treatment package configuration
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Cars Detailed Today</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7", marginTop: "4px" }}>
                {bayOrders.length} Cars
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Detailing Bays</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                4 Fully Equipped
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Customer Rating</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                4.9 / 5.0
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Daily Gross Billing</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0284c7", marginTop: "4px" }}>
                ₹{bayOrders.reduce((acc, it) => acc + it.bill, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add Package Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#0284c7" /> Configure New Spa Package
            </h2>

            <form onSubmit={handleAdminAddPkg} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Package Name</label>
                <input
                  type="text"
                  placeholder="e.g. 5-Layer Graphene Shield"
                  value={newPkgName}
                  onChange={(e) => setNewPkgName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Estimated Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 120 mins"
                  value={newPkgDuration}
                  onChange={(e) => setNewPkgDuration(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Hatchback Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 1499"
                  value={newPriceHatch}
                  onChange={(e) => setNewPriceHatch(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Sedan Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 1799"
                  value={newPriceSedan}
                  onChange={(e) => setNewPriceSedan(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>SUV Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 2199"
                  value={newPriceSUV}
                  onChange={(e) => setNewPriceSUV(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#0284c7",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Save Package to Catalog
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: BOOK BAY SLOT */}
      {selectedPkgForModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "520px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Book Detailing Bay Slot
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              {selectedPkgForModal.name} • <strong>{vehicleType} Rate: ₹{getPackagePrice(selectedPkgForModal).toLocaleString()}</strong>
            </p>

            <form onSubmit={handleBookingSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Vehicle Owner Name</label>
                <input
                  type="text"
                  placeholder="e.g. Yash Vardhan"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9839112233"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Car Registration No.</label>
                  <input
                    type="text"
                    placeholder="e.g. UP78 BC 9010"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Car Make &amp; Model</label>
                <input
                  type="text"
                  placeholder="e.g. Toyota Fortuner / Honda City"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Service Location</label>
                <select
                  value={serviceLocation}
                  onChange={(e) => setServiceLocation(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="Doorstep at My Home / Office">Doorstep at My Home / Office (Van Visit)</option>
                  <option value="AutoShine Studio Bay (Mall Road)">AutoShine Studio Bay (Mall Road Hub)</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Preferred Date</label>
                  <input
                    type="date"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Time Slot</label>
                  <select
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="09:00 AM – 10:30 AM">09:00 AM – 10:30 AM</option>
                    <option value="11:00 AM – 12:30 PM">11:00 AM – 12:30 PM</option>
                    <option value="02:00 PM – 03:30 PM">02:00 PM – 03:30 PM</option>
                    <option value="04:30 PM – 06:00 PM">04:30 PM – 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSelectedPkgForModal(null)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#0284c7", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Confirm Bay Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE STUDIO TAX INVOICE MODAL */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Invoice Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0284c7", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0284c7" }}>{studioInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Automated Car Spa &amp; Ceramic Studio • ISO 9001:2015</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Helpline: {studioInfo.phone} • GSTIN: 09AAACA8899M1Z9</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>TAX INVOICE</div>
                <div style={{ fontSize: "0.82rem", color: "#0284c7", fontWeight: 700 }}>{activeInvoiceModal.invoiceNo}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Customer & Vehicle Info */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Customer Details</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.customer}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Contact: {activeInvoiceModal.phone}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Vehicle Particulars</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.carReg}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Model: {activeInvoiceModal.carModel}</div>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Service Description</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.package}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Includes Microfiber Wash, Interior Vacuum &amp; Tyre Dressing</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.packagePrice.toLocaleString()}</td>
                </tr>
                {activeInvoiceModal.addonPrice > 0 && (
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 10px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.addonName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Premium Hydrophobic Sealant Layer</div>
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.addonPrice.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{(activeInvoiceModal.packagePrice + activeInvoiceModal.addonPrice).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>GST (18%):</span>
                <span style={{ fontWeight: 700 }}>₹{activeInvoiceModal.gst.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Total Amount:</span>
                <span style={{ fontWeight: 900, color: "#0284c7" }}>₹{activeInvoiceModal.total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setActiveInvoiceModal(null)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 600, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Printer size={16} /> Print Official Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", marginTop: "60px", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "36px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Car size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{studioInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Kanpur's Ultra-Modern Automotive Spa &amp; Detailing Studio. Specializing in high-pressure foam wash, 9H ceramic glass coating, interior anti-bacterial steam cleaning, and doorstep service vans.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#0284c7", fontWeight: 600 }}>
              🛡️ Meguiar's USA Authorized Detailing Studio
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Treatments &amp; Spas</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Scratch-Free Snow Foam Wash</li>
              <li>Dual Action Paint Correction</li>
              <li>3-Year 9H Ceramic Glass Coating</li>
              <li>Hot Steam Extraction Interior Spa</li>
              <li>Engine Bay Degreasing &amp; Dressing</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Studio Standards</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>100% pH-Neutral Imported Shampoos</li>
              <li>Clean Grit-Guard Buckets Only</li>
              <li>600 GSM Edged Microfiber Towels</li>
              <li>Underbody Hydraulic Ramp Wash</li>
              <li>Express Doorstep Van Dispatch</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Studio Hub</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 AutoShine Studio, Mall Road VIP Bypass, Kanpur</div>
              <div>📞 Helpline: <strong>{studioInfo.phone}</strong></div>
              <div>✉️ booking@autoshinespa.in</div>
              <div>⏰ Studio Hours: 08:00 AM – 08:30 PM Daily</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {studioInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
