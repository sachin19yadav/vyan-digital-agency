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
  CreditCard,
  Printer,
  ChevronRight,
  Search,
  Plus,
  Award,
  AlertCircle,
  Check,
  ArrowRight,
  User,
  Tool,
  Boxes,
  DollarSign,
} from "lucide-react";
import { repairServicesData } from "@/data/businessAppsData";

export default function RepairServicesApp() {
  const { serviceInfo, services: initialServices } = repairServicesData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "services", "billing", "technicians", "admin"
  const [currentRole, setCurrentRole] = useState("Customer"); // "Customer", "FieldTech", "Billing", "Admin"
  const [servicesList, setServicesList] = useState(initialServices);
  const [selectedAppliance, setSelectedAppliance] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Booking Modal State
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [serviceDate, setServiceDate] = useState("2026-10-01");
  const [serviceTimeSlot, setServiceTimeSlot] = useState("Morning (10:00 AM – 01:00 PM)");
  const [problemNotes, setProblemNotes] = useState("");
  const [bookingConfirmedAlert, setBookingConfirmedAlert] = useState(null);

  // Field Jobs Dispatch State
  const [jobOrders, setJobOrders] = useState([
    {
      id: "JOB-401",
      customer: "Amitabh Tandon",
      phone: "9839112233",
      address: "Flat 204, Swaroop Nagar, Kanpur",
      appliance: "Split / Window AC",
      issue: "AC Jet Pump Service & Gas Top-up",
      technician: "Manoj Kushwaha",
      status: "In Progress",
      slot: "Today 11:30 AM",
      totalEstimate: 1499,
    },
    {
      id: "JOB-402",
      customer: "Sunil Agnihotri",
      phone: "9876543210",
      address: "Civil Lines VIP Road, Kanpur",
      appliance: "Washing Machine",
      issue: "Drum Bearing Noise & Drain Pump Replacement",
      technician: "Raju Shrivastav",
      status: "Completed & Tested",
      slot: "Today 02:00 PM",
      totalEstimate: 1850,
    },
    {
      id: "JOB-403",
      customer: "Dr. Preeti Verma",
      phone: "9818445566",
      address: "Kakadeo Coaching Road, Kanpur",
      appliance: "Refrigerator / Fridge",
      issue: "Cooling Coil Frost Build-up & Defrost Timer",
      technician: "Anil Saxena",
      status: "Dispatched",
      slot: "Today 04:30 PM",
      totalEstimate: 850,
    },
  ]);

  // Billing POS / Job-Sheet State
  const [billCustomer, setBillCustomer] = useState("Amitabh Tandon");
  const [billPhone, setBillPhone] = useState("9839112233");
  const [billAddress, setBillAddress] = useState("Flat 204, Swaroop Nagar, Kanpur");
  const [billAppliance, setBillAppliance] = useState("Split / Window AC");
  const [billVisitingFee, setBillVisitingFee] = useState(299);
  const [billLabourFee, setBillLabourFee] = useState(499);
  const [billSparePartName, setBillSparePartName] = useState("R-32 Eco Cooling Refrigerant Gas Refill (1kg)");
  const [billSparePartCost, setBillSparePartCost] = useState(1200);
  const [billWarrantyDays, setBillWarrantyDays] = useState("60 Days");
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New Service Rate Card State
  const [newAppliance, setNewAppliance] = useState("Microwave");
  const [newTitle, setNewTitle] = useState("");
  const [newVisiting, setNewVisiting] = useState("199");
  const [newRepairStart, setNewRepairStart] = useState("399");
  const [newWarranty, setNewWarranty] = useState("30 Days");

  // Appliance types
  const applianceTypes = ["All", "Split / Window AC", "Washing Machine", "Refrigerator / Fridge", "LED / Smart TV", "Mixer / Grinder / Microwave"];

  // Filtered Services
  const filteredServices = servicesList.filter((s) => {
    if (selectedAppliance !== "All" && s.appliance !== selectedAppliance) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return s.title.toLowerCase().includes(q) || s.appliance.toLowerCase().includes(q);
    }
    return true;
  });

  // Handle Booking Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please enter customer name, phone, and complete address.");
      return;
    }

    const newJob = {
      id: `JOB-${Math.floor(500 + Math.random() * 400)}`,
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      appliance: selectedServiceForModal ? selectedServiceForModal.appliance : "Home Appliance",
      issue: selectedServiceForModal ? selectedServiceForModal.title : problemNotes || "General Inspection",
      technician: "Manoj Kushwaha (Certified UrbanTech Pro)",
      status: "Technician Dispatched",
      slot: `${serviceDate} (${serviceTimeSlot})`,
      totalEstimate: selectedServiceForModal ? selectedServiceForModal.visitingFee + selectedServiceForModal.repairStart : 499,
    };

    setJobOrders([newJob, ...jobOrders]);
    setBookingConfirmedAlert(newJob);
    setSelectedServiceForModal(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
  };

  // Handle Admin Add Service
  const handleAdminAddService = (e) => {
    e.preventDefault();
    if (!newTitle || !newVisiting) return;

    const s = {
      id: `REP-${Math.floor(10 + Math.random() * 90)}`,
      appliance: newAppliance,
      title: newTitle,
      visitingFee: parseInt(newVisiting) || 199,
      repairStart: parseInt(newRepairStart) || 399,
      warranty: newWarranty,
      icon: "Wrench",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    };

    setServicesList([...servicesList, s]);
    setNewTitle("");
    alert(`Service "${s.title}" registered in rate card!`);
  };

  // Calculations for Billing
  const billTaxableSubtotal = Number(billVisitingFee) + Number(billLabourFee) + Number(billSparePartCost);
  const billGst = Math.round(billTaxableSubtotal * 0.18);
  const billGrandTotal = billTaxableSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const inv = {
      jobId: `UT-BILL-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      customer: billCustomer,
      phone: billPhone,
      address: billAddress,
      appliance: billAppliance,
      visitingFee: Number(billVisitingFee),
      labourFee: Number(billLabourFee),
      sparePartName: billSparePartName,
      sparePartCost: Number(billSparePartCost),
      warrantyDays: billWarrantyDays,
      gst: billGst,
      total: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#fff7ed", borderBottom: "1px solid #ffedd5", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#c2410c", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Zap size={16} color="#c2410c" />
          <span>⚡ UrbanTech Doorstep Appliances Care • Up to 90-Day Post-Service Warranty • 100% Genuine Spare Parts</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Emergency Tech Hotline: <strong>{serviceInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#c2410c", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#ea580c", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(234, 88, 12, 0.25)" }}>
              <Wrench size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {serviceInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {serviceInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Service Overview" },
              { id: "services", label: "Rate Card & Booking" },
              { id: "billing", label: "Job-Sheet & Invoice POS" },
              { id: "technicians", label: "Field Technician Desk" },
              { id: "admin", label: "Workshop Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "technicians") setCurrentRole("FieldTech");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("Customer");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #ea580c" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#fff7ed" : "transparent",
                  color: activeTab === t.id ? "#ea580c" : "#475569",
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
                  else if (r === "FieldTech") setActiveTab("technicians");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("services");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#ea580c", outline: "none", cursor: "pointer" }}
              >
                <option value="Customer">Customer</option>
                <option value="FieldTech">Field Technician</option>
                <option value="Billing">Billing Cashier</option>
                <option value="Admin">Workshop Manager</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedServiceForModal(servicesList[0]);
              }}
              style={{
                backgroundColor: "#ea580c",
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
              <Calendar size={16} /> Book Repair Now
            </button>
          </div>
        </div>
      </header>

      {/* Booking Confirmed Alert */}
      {bookingConfirmedAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>
                ✓ Service Booking Confirmed! Job <strong>{bookingConfirmedAlert.id}</strong>: Technician {bookingConfirmedAlert.technician} dispatched to {bookingConfirmedAlert.address} for {bookingConfirmedAlert.appliance}. Time: {bookingConfirmedAlert.slot}.
              </span>
            </div>
            <button
              onClick={() => setBookingConfirmedAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: SERVICE OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#fff7ed", color: "#ea580c", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Zap size={16} /> Certified Doorstep Appliance Engineers
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Professional AC, Washing Machine, Fridge &amp; TV Repair with 90-Day Warranty
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Don't let broken appliances halt your daily routine. Certified technicians with high-pressure jet pumps, digital multimeter analyzers, and 100% genuine manufacturer spares arrive at your doorstep in 60 minutes.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("services")}
                  style={{
                    backgroundColor: "#ea580c",
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
                    boxShadow: "0 4px 14px rgba(234, 88, 12, 0.3)",
                  }}
                >
                  <Wrench size={18} /> View Transparent Rate Card
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#ea580c",
                    border: "1px solid #ea580c",
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
                  <CreditCard size={18} /> Job-Sheet &amp; Invoice POS
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#ea580c" }}>90 Days</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Post-Repair Warranty</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#ea580c" }}>60 Mins</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Doorstep Arrival SLA</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#ea580c" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Genuine OEM Parts</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
                alt="Expert Appliance Repair Technician"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#fff7ed", color: "#ea580c", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>Multi-Brand Certified Engineers</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Daikin, Voltas, LG, Samsung, Whirlpool &amp; Sony</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Repair Confidence */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Guaranteed Quality &amp; Transparent Standards
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                No hidden costs. Fixed visiting rates and computerized tax invoices.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <ShieldCheck size={28} color="#ea580c" />,
                  title: "Up to 90 Days Warranty",
                  desc: "Every repaired component and gas top-up is protected with an official warranty card.",
                },
                {
                  icon: <CreditCard size={28} color="#ea580c" />,
                  title: "Transparent Rate Card",
                  desc: "Standard inspection starting at ₹149. You approve the spare part price before work begins.",
                },
                {
                  icon: <Sparkles size={28} color="#ea580c" />,
                  title: "Trained & Police Checked",
                  desc: "Technicians carry identity cards, brand-authorized toolkits, and protective floor covers.",
                },
                {
                  icon: <Printer size={28} color="#ea580c" />,
                  title: "Instant Digital GST Invoices",
                  desc: "Receive computerized job-sheets with itemized spare part serial numbers and GST breakdown.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#fff7ed", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Repair Services Grid */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Most Requested Appliance Services
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Select an appliance repair package for immediate doorstep booking
                </p>
              </div>
              <button
                onClick={() => setActiveTab("services")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#ea580c",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Complete Rate Card <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {servicesList.slice(0, 4).map((s) => (
                <div key={s.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ position: "relative" }}>
                    <img src={s.image} alt={s.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#ea580c", display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                      <ShieldCheck size={14} color="#ea580c" /> {s.warranty} Warranty
                    </div>
                  </div>

                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", marginBottom: "4px" }}>
                      {s.appliance}
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                      {s.title}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Visiting Fee</div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>₹{s.visitingFee}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Repair Starts At</div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#16a34a" }}>₹{s.repairStart}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: "auto" }}>
                      <button
                        onClick={() => setSelectedServiceForModal(s)}
                        style={{
                          width: "100%",
                          backgroundColor: "#ea580c",
                          color: "#ffffff",
                          border: "none",
                          padding: "10px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: RATE CARD & BOOKING */}
      {activeTab === "services" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Transparent Rate Card &amp; Online Booking
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Filter by appliance and schedule a certified doorstep technician
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
                <input
                  type="text"
                  placeholder="Search appliance, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 36px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.88rem",
                    backgroundColor: "#ffffff",
                    outline: "none",
                  }}
                />
              </div>

              <button
                onClick={() => setSelectedServiceForModal(servicesList[0])}
                style={{
                  backgroundColor: "#ea580c",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Calendar size={16} /> Book Express Slot
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {applianceTypes.map((app) => (
              <button
                key={app}
                onClick={() => setSelectedAppliance(app)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: selectedAppliance === app ? "1px solid #ea580c" : "1px solid #cbd5e1",
                  backgroundColor: selectedAppliance === app ? "#ea580c" : "#ffffff",
                  color: selectedAppliance === app ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {app}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "24px" }}>
            {filteredServices.map((s) => (
              <div key={s.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ position: "relative" }}>
                  <img src={s.image} alt={s.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#ea580c", display: "flex", alignItems: "center", gap: "4px" }}>
                    <ShieldCheck size={14} color="#ea580c" /> {s.warranty} Warranty
                  </div>
                </div>

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ea580c", textTransform: "uppercase", marginBottom: "4px" }}>
                    {s.appliance}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                    {s.title}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Visiting Fee</div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>₹{s.visitingFee}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Labor Starts At</div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#16a34a" }}>₹{s.repairStart}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <button
                      onClick={() => setSelectedServiceForModal(s)}
                      style={{
                        width: "100%",
                        backgroundColor: "#ea580c",
                        color: "#ffffff",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Book Doorstep Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: JOB-SHEET & INVOICE POS */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Appliance Repair Job-Sheet &amp; Invoicing POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate official repair job-sheets, warranty certificates, and GST tax bills
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#ea580c" /> Repair Service Particulars
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Customer Name</label>
                  <input
                    type="text"
                    value={billCustomer}
                    onChange={(e) => setBillCustomer(e.target.value)}
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

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Service Address</label>
                <input
                  type="text"
                  value={billAddress}
                  onChange={(e) => setBillAddress(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Appliance Serviced</label>
                  <select
                    value={billAppliance}
                    onChange={(e) => setBillAppliance(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    {applianceTypes.filter((a) => a !== "All").map((app) => (
                      <option key={app} value={app}>{app}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Warranty Certificate</label>
                  <select
                    value={billWarrantyDays}
                    onChange={(e) => setBillWarrantyDays(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="30 Days">30 Days Service Warranty</option>
                    <option value="60 Days">60 Days Service Warranty</option>
                    <option value="90 Days">90 Days Extended Warranty</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Visiting &amp; Inspection Charge (₹)</label>
                  <input
                    type="number"
                    value={billVisitingFee}
                    onChange={(e) => setBillVisitingFee(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Technician Labor Charge (₹)</label>
                  <input
                    type="number"
                    value={billLabourFee}
                    onChange={(e) => setBillLabourFee(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Spare Part Description</label>
                  <input
                    type="text"
                    value={billSparePartName}
                    onChange={(e) => setBillSparePartName(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Spare Part Cost (₹)</label>
                  <input
                    type="number"
                    value={billSparePartCost}
                    onChange={(e) => setBillSparePartCost(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateInvoice}
                style={{
                  width: "100%",
                  backgroundColor: "#ea580c",
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
                <Printer size={18} /> Review &amp; Print Repair Job-Sheet Invoice
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Job-Sheet Cost Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Doorstep Visiting / Inspection</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billVisitingFee).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Technician Labor Charge</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billLabourFee).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>OEM Genuine Spare Part</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billSparePartCost).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billTaxableSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>GST (18% Service &amp; Spares)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#fff7ed", border: "1px solid #ffedd5", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#ea580c", fontWeight: 600 }}>Total Final Amount</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ea580c", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#c2410c", marginTop: "4px" }}>
                    *Protected under {billWarrantyDays} UrbanTech Service Guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: FIELD TECHNICIAN DESK */}
      {activeTab === "technicians" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Field Technician Dispatch &amp; Job Board
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Real-time job queue, route locations, and live service status toggles
              </p>
            </div>
            <div style={{ backgroundColor: "#fff7ed", color: "#ea580c", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Active Field Jobs: {jobOrders.length} Calls
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Job ID</th>
                  <th style={{ padding: "14px 20px" }}>Customer &amp; Location</th>
                  <th style={{ padding: "14px 20px" }}>Appliance &amp; Fault</th>
                  <th style={{ padding: "14px 20px" }}>Technician</th>
                  <th style={{ padding: "14px 20px" }}>Scheduled Time</th>
                  <th style={{ padding: "14px 20px" }}>Status</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobOrders.map((j) => (
                  <tr key={j.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#ea580c" }}>{j.id}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{j.customer}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{j.address}</div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{j.appliance}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{j.issue}</div>
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: 600 }}>{j.technician}</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{j.slot}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: j.status.includes("Completed") ? "#f0fdf4" : "#fef3c7", color: j.status.includes("Completed") ? "#166534" : "#92400e", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {j.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button
                        onClick={() => {
                          const updated = jobOrders.map((item) =>
                            item.id === j.id
                              ? { ...item, status: item.status === "In Progress" ? "Completed & Tested" : "In Progress" }
                              : item
                          );
                          setJobOrders(updated);
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

      {/* TAB 5: WORKSHOP ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Workshop Manager &amp; Service Control
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Live revenue metrics, rate card management, and warranty claims supervision
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Service Jobs</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ea580c", marginTop: "4px" }}>
                {jobOrders.length} Bookings
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Technicians</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                12 Field Pros
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>First-Visit Fix Rate</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                96.2%
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Daily Service Revenue</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ea580c", marginTop: "4px" }}>
                ₹{(jobOrders.length * 1550).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add Service Rate Card Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#ea580c" /> Register New Repair Service to Rate Card
            </h2>

            <form onSubmit={handleAdminAddService} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Appliance Category</label>
                <select
                  value={newAppliance}
                  onChange={(e) => setNewAppliance(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {applianceTypes.filter((a) => a !== "All").map((app) => (
                    <option key={app} value={app}>{app}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Service / Fault Title</label>
                <input
                  type="text"
                  placeholder="e.g. Inverter AC PCB Board Repair"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Doorstep Visiting Fee (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 249"
                  value={newVisiting}
                  onChange={(e) => setNewVisiting(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Base Labor Charge (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 450"
                  value={newRepairStart}
                  onChange={(e) => setNewRepairStart(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Warranty Coverage</label>
                <select
                  value={newWarranty}
                  onChange={(e) => setNewWarranty(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Add to Rate Card
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: BOOK APPOINTMENT */}
      {selectedServiceForModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "520px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Book Doorstep Technician
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              {selectedServiceForModal.appliance}: <strong>{selectedServiceForModal.title}</strong> (Visiting: ₹{selectedServiceForModal.visitingFee})
            </p>

            <form onSubmit={handleBookingSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rohit Mehra"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Mobile Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9839112233"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Doorstep Complete Address</label>
                <input
                  type="text"
                  placeholder="e.g. 14/82, Swaroop Nagar, Near Motijheel, Kanpur"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Preferred Date</label>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Time Window</label>
                  <select
                    value={serviceTimeSlot}
                    onChange={(e) => setServiceTimeSlot(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                    <option value="Afternoon (01:00 PM – 04:00 PM)">Afternoon (01:00 PM – 04:00 PM)</option>
                    <option value="Evening (04:00 PM – 08:00 PM)">Evening (04:00 PM – 08:00 PM)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setSelectedServiceForModal(null)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#ea580c", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Confirm Technician Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE REPAIR JOB-SHEET INVOICE MODAL */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Invoice Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #ea580c", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ea580c" }}>{serviceInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Doorstep Appliance Care • Authorized Workshop Services</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Helpline: {serviceInfo.phone} • GSTIN: 09AAACU6644M1Z2</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>REPAIR JOB-SHEET</div>
                <div style={{ fontSize: "0.82rem", color: "#ea580c", fontWeight: 700 }}>{activeInvoiceModal.jobId}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Customer & Appliance Details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Customer Details</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.customer}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Contact: {activeInvoiceModal.phone}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Location: {activeInvoiceModal.address}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Appliance Repaired</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.appliance}</div>
                <div style={{ fontSize: "0.82rem", color: "#ea580c", fontWeight: 700 }}>Warranty: {activeInvoiceModal.warrantyDays} Warranty Card Issued</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Attended by: Certified UrbanTech Engineer</div>
              </div>
            </div>

            {/* Line Items */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Service / Component Description</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Cost (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>Doorstep Visiting &amp; Diagnostic Check</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Digital Fault Detection &amp; Safety Earthing Inspection</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.visitingFee.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>Technician Mechanical / Electrical Labor</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Dismantling, Soldering, Jet Flush &amp; Re-assembly</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.labourFee.toLocaleString()}</td>
                </tr>
                {activeInvoiceModal.sparePartCost > 0 && (
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 10px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.sparePartName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>100% Genuine Sealed Spare Part with QR Code Authentication</div>
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.sparePartCost.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{(activeInvoiceModal.visitingFee + activeInvoiceModal.labourFee + activeInvoiceModal.sparePartCost).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>GST (18%):</span>
                <span style={{ fontWeight: 700 }}>₹{activeInvoiceModal.gst.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Total Paid:</span>
                <span style={{ fontWeight: 900, color: "#ea580c" }}>₹{activeInvoiceModal.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Warranty Certificate Seal */}
            <div style={{ backgroundColor: "#fff7ed", border: "1px dashed #fdba74", padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", fontSize: "0.8rem", color: "#c2410c" }}>
              🛡️ <strong>Official Warranty Seal:</strong> This invoice serves as proof of {activeInvoiceModal.warrantyDays} warranty. Any recurring defect during this period will be resolved free of cost.
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
                  backgroundColor: "#ea580c",
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
                <Printer size={16} /> Print Official Job-Sheet
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
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#ea580c", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Wrench size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{serviceInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Kanpur's Leading On-Demand Home Appliance Care. Delivering prompt doorstep diagnostic, genuine spare part replacements, and up to 90 days warranty on all repairs.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#ea580c", fontWeight: 600 }}>
              ⚡ 100% Background-Checked Technicians • Fixed Transparent Pricing
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Appliances We Service</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Split &amp; Window Air Conditioners</li>
              <li>Front &amp; Top Load Washing Machines</li>
              <li>Single &amp; Double Door Refrigerators</li>
              <li>LED, QLED &amp; Smart 4K Televisions</li>
              <li>Microwave Ovens &amp; Mixer Grinders</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Our Guarantees</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>30 to 90 Days Service Warranty</li>
              <li>60 Minutes Quick Response Time</li>
              <li>100% Original Brand Spare Parts</li>
              <li>Post-Service Testing Sign-Off</li>
              <li>Itemized Tax Invoice With GST</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Service Center</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 UrbanTech Workshop, Govind Nagar, Kanpur 208006</div>
              <div>📞 Emergency Tech: <strong>{serviceInfo.phone}</strong></div>
              <div>✉️ service@urbantechrepairs.in</div>
              <div>⏰ Operating Hours: 08:00 AM – 09:00 PM Daily</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {serviceInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
