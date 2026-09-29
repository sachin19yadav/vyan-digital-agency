"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  Sparkles,
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
  Search,
  Plus,
  Trash2,
  LayoutDashboard,
  Check,
  ArrowRight,
  Camera,
} from "lucide-react";
import { beautyParlourData } from "@/data/businessAppsData";

export default function BeautyParlourApp() {
  const { salonInfo, categories, services: initialServices, stylists } = beautyParlourData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "services", "booking", "billing", "staff", "admin"
  const [currentRole, setCurrentRole] = useState("Customer"); // "Customer", "Billing", "Staff", "Admin"
  const [servicesList, setServicesList] = useState(initialServices);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Appointments State
  const [appointments, setAppointments] = useState([
    {
      id: "GLAM-801",
      clientName: "Neha Kapoor",
      clientPhone: "9839112233",
      service: "Royal HD Bridal Makeup & Draping",
      price: 12500,
      stylist: "Priya Sharma",
      date: "2026-09-30",
      time: "02:00 PM",
      status: "In Progress",
    },
    {
      id: "GLAM-802",
      clientName: "Ritu Agrawal",
      clientPhone: "9876543210",
      service: "O3+ Bridal Glow Diamond Facial",
      price: 1850,
      stylist: "Aarti Patel",
      date: "2026-09-30",
      time: "04:30 PM",
      status: "Confirmed",
    },
  ]);

  // Booking Modal State
  const [selectedServiceForModal, setSelectedServiceForModal] = useState(null);
  const [bookingClientName, setBookingClientName] = useState("");
  const [bookingClientPhone, setBookingClientPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-10-01");
  const [bookingTime, setBookingTime] = useState("11:30 AM");
  const [bookingStylist, setBookingStylist] = useState(stylists[0].name);
  const [bookingSuccessAlert, setBookingSuccessAlert] = useState(null);

  // Billing POS State
  const [billingClient, setBillingClient] = useState("Mrs. Anjali Saxena");
  const [billingPhone, setBillingPhone] = useState("9818445566");
  const [billingItems, setBillingItems] = useState([initialServices[0], initialServices[1]]);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New Service State
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState("Hair Styling");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceDuration, setNewServiceDuration] = useState("60 mins");
  const [newServiceDesc, setNewServiceDesc] = useState("");

  // Filtered Services
  const filteredServices = servicesList.filter((s) => {
    if (selectedCategory !== "All" && s.category !== selectedCategory) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Handle Book Slot
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingClientName || !bookingClientPhone) return;

    const newAppt = {
      id: `GLAM-${Math.floor(100 + Math.random() * 900)}`,
      clientName: bookingClientName,
      clientPhone: bookingClientPhone,
      service: selectedServiceForModal ? selectedServiceForModal.name : "Custom Treatment",
      price: selectedServiceForModal ? selectedServiceForModal.price : 2000,
      stylist: bookingStylist,
      date: bookingDate,
      time: bookingTime,
      status: "Confirmed",
    };

    setAppointments([newAppt, ...appointments]);
    setBookingSuccessAlert(newAppt);
    setSelectedServiceForModal(null);
    setBookingClientName("");
    setBookingClientPhone("");
  };

  // Billing POS Add / Remove Item
  const addItemToBill = (service) => {
    setBillingItems([...billingItems, service]);
  };

  const removeItemFromBill = (idx) => {
    setBillingItems(billingItems.filter((_, i) => i !== idx));
  };

  const billSubtotal = billingItems.reduce((acc, it) => acc + it.price, 0);
  const billGst = Math.round(billSubtotal * 0.18); // 18% salon GST
  const billTotal = billSubtotal + billGst;

  const handleSettleSalonBill = () => {
    const inv = {
      invoiceNo: `SALON-${Math.floor(1000 + Math.random() * 9000)}`,
      client: billingClient,
      phone: billingPhone,
      items: billingItems,
      subtotal: billSubtotal,
      gst: billGst,
      total: billTotal,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setActiveInvoiceModal(inv);
  };

  // Staff status toggle
  const handleUpdateApptStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Admin Add Service
  const handleAdminAddService = (e) => {
    e.preventDefault();
    if (!newServiceName || !newServicePrice) return;

    const newSrv = {
      id: `BP-${Math.floor(10 + Math.random() * 90)}`,
      name: newServiceName,
      category: newServiceCategory,
      duration: newServiceDuration,
      price: Number(newServicePrice),
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80",
      description: newServiceDesc || "Professional treatment using premium salon products.",
    };

    setServicesList([newSrv, ...servicesList]);
    setNewServiceName("");
    setNewServicePrice("");
    setNewServiceDesc("");
    alert("New salon treatment added to live menu!");
  };

  return (
    <div style={{ backgroundColor: "#fffafb", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div style={{ backgroundColor: "#fff1f2", borderBottom: "1px solid #fecdd3", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#be123c", fontWeight: 700, flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkles size={15} color="#e11d48" />
          <span>Festive Glow &amp; Wedding Season: Flat 20% OFF on Pre-Bridal &amp; Keratin Packages!</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Stylist Hotline: <strong>{salonInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#be123c", textDecoration: "underline", fontWeight: 800 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* 2. DEDICATED SALON HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #fecdd3", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(225,29,72,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          {/* Logo & Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#e11d48", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(225,29,72,0.3)" }}>
              <Scissors size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{salonInfo.name}</h1>
                <span style={{ backgroundColor: "#fff1f2", color: "#e11d48", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>LADIES STUDIO</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{salonInfo.tagline} • Civil Lines, Kanpur</p>
            </div>
          </div>

          {/* Role Switcher & Direct Booking */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Customer") setActiveTab("landing");
                  else if (r === "Billing") setActiveTab("billing");
                  else if (r === "Staff") setActiveTab("staff");
                  else if (r === "Admin") setActiveTab("admin");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#be123c",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Customer">👩 Client View</option>
                <option value="Billing">💳 Cashier POS Desk</option>
                <option value="Staff">✂️ Beautician Staff Desk</option>
                <option value="Admin">👑 Salon Admin</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedServiceForModal(servicesList[0]);
              }}
              style={{
                backgroundColor: "#e11d48",
                color: "#ffffff",
                border: "none",
                padding: "9px 18px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(225,29,72,0.3)",
              }}
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ backgroundColor: "#fffafb", borderTop: "1px solid #ffe4e6", padding: "6px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {[
              { id: "landing", label: "Salon Home" },
              { id: "services", label: "Treatments Menu" },
              { id: "booking", label: "Book Slot" },
              { id: "billing", label: "Salon POS Billing" },
              { id: "staff", label: "Beautician Desk" },
              { id: "admin", label: "Admin Portal" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: activeTab === tab.id ? "1px solid #e11d48" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#e11d48" : "#64748b",
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

      {/* Appointment Confirmed Alert */}
      {bookingSuccessAlert && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Appointment #{bookingSuccessAlert.id} Confirmed! Client: {bookingSuccessAlert.clientName} for "{bookingSuccessAlert.service}" on {bookingSuccessAlert.date} at {bookingSuccessAlert.time}! Stylist: {bookingSuccessAlert.stylist}</span>
            </div>
            <button onClick={() => setBookingSuccessAlert(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* 3. MAIN TAB CONTENT */}
      <main>
        {/* A. LANDING PAGE TAB */}
        {activeTab === "landing" && (
          <div>
            {/* Hero Section */}
            <section style={{ background: "linear-gradient(180deg, #fff1f2 0%, #fffafb 100%)", padding: "50px 20px 60px", borderBottom: "1px solid #fecdd3" }}>
              <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#ffe4e6", color: "#be123c", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "16px" }}>
                    <Sparkles size={14} />
                    <span>KANPUR'S PREMIER LUXURY SALON &amp; BRIDAL STUDIO</span>
                  </div>
                  <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-1px" }}>
                    Redefining Elegance, Royal Bridal Looks &amp; Hair Glamour
                  </h1>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                    Experience high-fashion hair styling, clinically approved O3+ diamond facials, French balayage highlights, and customized bridal makeovers by celebrity aesthetician Priya Sharma and master stylists.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveTab("services")}
                      style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(225,29,72,0.35)" }}
                    >
                      <span>Explore Treatments</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => setSelectedServiceForModal(servicesList[0])}
                      style={{ backgroundColor: "#ffffff", color: "#e11d48", border: "2px solid #e11d48", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                    >
                      Book Free Consultation
                    </button>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                    alt="Glamour Touch Salon"
                    style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 30px rgba(225,29,72,0.15)" }}
                  />
                  <div style={{ position: "absolute", bottom: "-14px", left: "20px", backgroundColor: "#ffffff", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #fecdd3" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#fff1f2", color: "#e11d48", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Award size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: "0.95rem", color: "#0f172a" }}>4.9 / 5.0 Star Rating</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Over 1,400+ Bridal Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quality Pillars */}
            <section style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {[
                  { title: "100% Genuine Branded Serums", desc: "Exclusively using O3+, Olaplex, L'Oreal Professional & MAC bridal cosmetics.", icon: ShieldCheck },
                  { title: "Sterilized Medical-Grade Hygiene", desc: "Single-use disposable kits, autoclaved manicure tools, and sanitized private suites.", icon: CheckCircle2 },
                  { title: "Celebrity Master Stylists", desc: "8+ years of certified bridal artistry, nail extension masters, and hair colorists.", icon: Award },
                  { title: "Transparent Fixed Pricing", desc: "No hidden charges, pre-consultation rate card, and official GST tax invoices.", icon: CreditCard },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #fecdd3", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#fff1f2", color: "#e11d48", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Signature Bestsellers */}
            <section style={{ maxWidth: "1240px", margin: "50px auto", padding: "0 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#e11d48", fontWeight: 800, textTransform: "uppercase" }}>Chef-D'œuvre of Glamour</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>Most Loved Signature Treatments</h2>
                </div>
                <button onClick={() => setActiveTab("services")} style={{ backgroundColor: "transparent", border: "none", color: "#e11d48", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>View All 15+ Services</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {servicesList.slice(0, 3).map((srv) => (
                  <div key={srv.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <img src={srv.image} alt={srv.name} style={{ width: "100%", height: "190px", objectFit: "cover" }} />
                    <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{srv.name}</h3>
                        <span style={{ backgroundColor: "#fff1f2", color: "#e11d48", padding: "2px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>★ {srv.rating}</span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 14px", flex: 1 }}>{srv.description}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                        <div>
                          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{srv.duration}</span>
                          <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#e11d48" }}>₹{srv.price}</div>
                        </div>
                        <button
                          onClick={() => setSelectedServiceForModal(srv)}
                          style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer" }}
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* B. TREATMENTS MENU TAB */}
        {activeTab === "services" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Salon Treatments &amp; Services Menu</h2>
                <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>Choose hair styling, clinical skin aesthetics, bridal makeovers, or nail art.</p>
              </div>

              {/* Search */}
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search hair spa, facial, bridal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
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

            {/* Full Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {filteredServices.map((srv) => (
                <div key={srv.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                  <img src={srv.image} alt={srv.name} style={{ width: "100%", height: "190px", objectFit: "cover" }} />
                  <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{srv.name}</h3>
                      <span style={{ backgroundColor: "#fff1f2", color: "#e11d48", padding: "2px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>★ {srv.rating}</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#e11d48", fontWeight: 700, marginBottom: "8px" }}>{srv.category}</span>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 14px", flex: 1 }}>{srv.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Duration: {srv.duration}</span>
                        <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#e11d48" }}>₹{srv.price}</div>
                      </div>
                      <button
                        onClick={() => setSelectedServiceForModal(srv)}
                        style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer" }}
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

        {/* C. BOOK SLOT TAB */}
        {activeTab === "booking" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "28px", boxShadow: "0 4px 16px rgba(225,29,72,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>Book Salon &amp; Bridal Appointment</h2>
              <p style={{ color: "#64748b", margin: "0 0 20px", fontSize: "0.85rem" }}>Select your date, preferred time slot, and specialist beautician.</p>

              <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Select Treatment *</label>
                  <select
                    value={selectedServiceForModal?.id || servicesList[0]?.id}
                    onChange={(e) => {
                      const found = servicesList.find((s) => s.id === e.target.value);
                      setSelectedServiceForModal(found);
                    }}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontSize: "0.85rem" }}
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.price} • {s.duration})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Client Full Name *</label>
                    <input type="text" placeholder="e.g. Shalini Awasthi" value={bookingClientName} onChange={(e) => setBookingClientName(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Mobile Number *</label>
                    <input type="tel" placeholder="98765 43210" value={bookingClientPhone} onChange={(e) => setBookingClientPhone(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Appointment Date</label>
                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Time Slot</label>
                    <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                      <option>10:30 AM</option>
                      <option>11:30 AM</option>
                      <option>01:30 PM</option>
                      <option>03:30 PM</option>
                      <option>05:00 PM</option>
                      <option>06:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Preferred Stylist</label>
                  <select value={bookingStylist} onChange={(e) => setBookingStylist(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                    {stylists.map((st, i) => (
                      <option key={i} value={st.name}>{st.name} ({st.role})</option>
                    ))}
                  </select>
                </div>

                <button type="submit" style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.95rem", cursor: "pointer", marginTop: "10px" }}>
                  Confirm Booking Slot
                </button>
              </form>
            </div>
          </div>
        )}

        {/* D. SALON POS BILLING TAB */}
        {activeTab === "billing" && (
          <div style={{ maxWidth: "1140px", margin: "30px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 420px", gap: "24px", alignItems: "start" }}>
            {/* Quick Treatment Selection for Bill */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Select Services for Client Invoice</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                {servicesList.map((srv) => (
                  <div key={srv.id} onClick={() => addItemToBill(srv)} style={{ padding: "10px", backgroundColor: "#fff1f2", borderRadius: "10px", border: "1px solid #fecdd3", cursor: "pointer" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.82rem", color: "#0f172a" }}>{srv.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "0.75rem", color: "#be123c", fontWeight: 700 }}>
                      <span>{srv.duration}</span>
                      <span>+ ₹{srv.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Ticket & Settlement */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Printer size={18} color="#e11d48" />
                <span>Client Salon Invoice</span>
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                <input type="text" placeholder="Client Name" value={billingClient} onChange={(e) => setBillingClient(e.target.value)} style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
                <input type="tel" placeholder="Mobile Number" value={billingPhone} onChange={(e) => setBillingPhone(e.target.value)} style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
              </div>

              {/* Items in ticket */}
              <div style={{ minHeight: "160px", maxHeight: "220px", overflowY: "auto", borderTop: "1px solid #ffe4e6", borderBottom: "1px solid #ffe4e6", padding: "10px 0", marginBottom: "12px" }}>
                {billingItems.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "0.82rem" }}>No treatments added yet.</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {billingItems.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                        <span>{item.name}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontWeight: 800 }}>₹{item.price}</span>
                          <button onClick={() => removeItemFromBill(idx)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tax & Total */}
              <div style={{ backgroundColor: "#fff1f2", padding: "12px", borderRadius: "10px", marginBottom: "14px", fontSize: "0.82rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Subtotal:</span>
                  <span>₹{billSubtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>GST (18% Beauty Care):</span>
                  <span>₹{billGst}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.05rem", color: "#e11d48", borderTop: "1px dashed #fecdd3", paddingTop: "6px", marginTop: "4px" }}>
                  <span>GRAND TOTAL:</span>
                  <span>₹{billTotal}</span>
                </div>
              </div>

              <button
                onClick={handleSettleSalonBill}
                disabled={billingItems.length === 0}
                style={{ width: "100%", backgroundColor: billingItems.length === 0 ? "#cbd5e1" : "#e11d48", color: "#ffffff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 900, fontSize: "0.9rem", cursor: billingItems.length === 0 ? "not-allowed" : "pointer" }}
              >
                Settle &amp; Print Official Salon Receipt
              </button>
            </div>
          </div>
        )}

        {/* E. BEAUTICIAN STAFF DESK TAB */}
        {activeTab === "staff" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Beautician &amp; Stylist Operations Desk</h2>
            <div style={{ overflowX: "auto", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #fecdd3", padding: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#fff1f2", borderBottom: "2px solid #fecdd3", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Booking #</th>
                    <th style={{ padding: "10px 14px" }}>Client Details</th>
                    <th style={{ padding: "10px 14px" }}>Treatment</th>
                    <th style={{ padding: "10px 14px" }}>Date &amp; Slot</th>
                    <th style={{ padding: "10px 14px" }}>Assigned Stylist</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                    <th style={{ padding: "10px 14px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{a.id}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 800, color: "#0f172a" }}>{a.clientName}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{a.clientPhone}</div>
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#e11d48" }}>{a.service}</td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>{a.date} at {a.time}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 700 }}>{a.stylist}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: a.status === "In Progress" ? "#fef3c7" : "#dcfce7", color: a.status === "In Progress" ? "#b45309" : "#15803d", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          {a.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {a.status !== "Completed" && (
                          <button onClick={() => handleUpdateApptStatus(a.id, "Completed")} style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                            Mark Finished
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* F. ADMIN PORTAL TAB */}
        {activeTab === "admin" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Salon Executive Administration</h2>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #fecdd3" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Total Service Catalog</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#e11d48" }}>{servicesList.length} Treatments</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #fecdd3" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Total Appointments</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>{appointments.length} Clients</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #fecdd3" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Active Stylists on Duty</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a" }}>{stylists.length} Specialists</div>
              </div>
            </div>

            {/* Add Service Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #fecdd3", maxWidth: "600px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Add New Salon Treatment</h3>
              <form onSubmit={handleAdminAddService} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="text" placeholder="Treatment Name (e.g. 24K Gold Facial)" value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <select value={newServiceCategory} onChange={(e) => setNewServiceCategory(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                    {categories.filter((c) => c !== "All").map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                  <input type="number" placeholder="Price (₹)" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
                <input type="text" placeholder="Duration (e.g. 75 mins)" value={newServiceDuration} onChange={(e) => setNewServiceDuration(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <textarea rows={2} placeholder="Description &amp; benefits" value={newServiceDesc} onChange={(e) => setNewServiceDesc(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <button type="submit" style={{ backgroundColor: "#e11d48", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}>Save &amp; Publish Service</button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* 4. MODALS */}
      {/* Appointment Slot Modal */}
      {selectedServiceForModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setSelectedServiceForModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Book Salon Slot</h3>
            <p style={{ color: "#e11d48", fontWeight: 700, margin: "0 0 16px" }}>{selectedServiceForModal.name} - ₹{selectedServiceForModal.price}</p>
            <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Client Name *" value={bookingClientName} onChange={(e) => setBookingClientName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={bookingClientPhone} onChange={(e) => setBookingClientPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option>10:30 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>04:30 PM</option>
                  <option>06:00 PM</option>
                </select>
              </div>
              <select value={bookingStylist} onChange={(e) => setBookingStylist(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                {stylists.map((st, i) => (<option key={i} value={st.name}>{st.name} ({st.role})</option>))}
              </select>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setSelectedServiceForModal(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#e11d48", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveInvoiceModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "420px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#000000" }}>
              <div style={{ textAlign: "center", borderBottom: "1px dashed #000000", paddingBottom: "8px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 900, margin: "0 0 2px" }}>{salonInfo.name}</h3>
                <div>{salonInfo.address} • Hotline: {salonInfo.phone}</div>
                <div>Official GST Tax Invoice #: {activeInvoiceModal.invoiceNo}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>Date: {activeInvoiceModal.date}</span>
                <span>Time: {activeInvoiceModal.time}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>Client: {activeInvoiceModal.client} ({activeInvoiceModal.phone})</div>
              <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px dashed #000000", borderBottom: "1px dashed #000000", margin: "6px 0", fontSize: "0.78rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "4px 0" }}>TREATMENT</th>
                    <th style={{ textAlign: "right", padding: "4px 0" }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvoiceModal.items.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "3px 0" }}>{it.name}</td>
                      <td style={{ textAlign: "right", padding: "3px 0" }}>₹{it.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal:</span><span>₹{activeInvoiceModal.subtotal}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>GST (18% Beauty Care):</span><span>₹{activeInvoiceModal.gst}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem", borderTop: "1px dashed #000000", paddingTop: "4px", marginTop: "4px" }}>
                <span>TOTAL PAID:</span><span>₹{activeInvoiceModal.total}</span>
              </div>
              <div style={{ textAlign: "center", marginTop: "12px", borderTop: "1px dashed #000000", paddingTop: "6px" }}>*** THANK YOU! VISIT AGAIN ***</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <button onClick={() => setActiveInvoiceModal(null)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Close</button>
              <button onClick={() => window.print()} style={{ flex: 2, padding: "8px", borderRadius: "6px", border: "none", backgroundColor: "#e11d48", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Print Receipt</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. DEDICATED SALON FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "2px solid #e11d48", marginTop: "60px", padding: "40px 20px 20px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{salonInfo.name}</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
              Premier bridal studio, skin aesthetic lounge and hair makeover destination in Kanpur.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#e11d48", fontWeight: 700 }}>
              Appointment Booking: {salonInfo.phone}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Studio Working Hours</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>
              <div>Monday – Sunday: {salonInfo.timings}</div>
              <div>Bridal Suite Bookings: Available 24×7 on prior advance</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Our Location</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
              <div>{salonInfo.address}</div>
              <div style={{ marginTop: "8px", color: "#16a34a", fontWeight: 700 }}>✓ Ample Valet Parking Available</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #fecdd3", paddingTop: "20px", textAlign: "center", fontSize: "0.78rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} {salonInfo.name}. All Rights Reserved. • Designed in Pure Light Mode.
        </div>
      </footer>
    </div>
  );
}
