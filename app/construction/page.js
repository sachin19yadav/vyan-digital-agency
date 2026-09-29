"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HardHat,
  Truck,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building,
  Plus,
  Calendar,
  Layers,
  Phone,
  Search,
  CreditCard,
  Printer,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  Check,
  Compass,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { constructionData } from "@/data/businessAppsData";

export default function ConstructionApp() {
  const { companyInfo, sites: initialSites, materials: initialMaterials, labourShift: initialLabour } = constructionData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "sites", "materials", "billing", "labour", "admin"
  const [currentRole, setCurrentRole] = useState("Client"); // "Client", "SiteEngineer", "Billing", "Admin"
  const [sites, setSites] = useState(initialSites);
  const [materials, setMaterials] = useState(initialMaterials);
  const [labourList, setLabourList] = useState(initialLabour);

  // Indent Modal State
  const [showIndentModal, setShowIndentModal] = useState(false);
  const [indentMaterial, setIndentMaterial] = useState("UltraTech Super Cement (50kg Bags)");
  const [indentQty, setIndentQty] = useState(150);
  const [indentSite, setIndentSite] = useState("Civil Lines Tower Commercial Complex");
  const [indentAlert, setIndentAlert] = useState(null);

  // Material Billing POS State
  const [billVendor, setBillVendor] = useState("Vishwa Building Materials & RMC Supplier");
  const [billGstNo, setBillGstNo] = useState("09AAACV7721M1Z5");
  const [billSiteName, setBillSiteName] = useState("Civil Lines Tower Commercial Complex");
  const [billMaterialType, setBillMaterialType] = useState("UltraTech Super Cement (50kg Bags)");
  const [billUnits, setBillUnits] = useState(250);
  const [billRatePerUnit, setBillRatePerUnit] = useState(380);
  const [billFreight, setBillFreight] = useState(3500);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New Project State
  const [newSiteName, setNewSiteName] = useState("");
  const [newSiteLocation, setNewSiteLocation] = useState("");
  const [newSiteBudget, setNewSiteBudget] = useState("");
  const [newSiteStatus, setNewSiteStatus] = useState("Excavation & Piling");

  // Handle Material Indent
  const handleCreateIndent = (e) => {
    e.preventDefault();
    setMaterials((prev) =>
      prev.map((m) =>
        m.name === indentMaterial ? { ...m, inStock: m.inStock + Number(indentQty) } : m
      )
    );
    setIndentAlert(`Indent Approved: +${indentQty} units dispatched to ${indentSite}.`);
    setShowIndentModal(false);
  };

  // Handle Admin Add Project
  const handleAddSite = (e) => {
    e.preventDefault();
    if (!newSiteName || !newSiteBudget) return;

    const newProject = {
      id: `SITE-0${sites.length + 1}`,
      name: newSiteName,
      location: newSiteLocation || "Kanpur Urban Zone",
      completion: 12,
      budget: `₹${newSiteBudget} Crore`,
      spent: `₹${(parseFloat(newSiteBudget) * 0.15).toFixed(1)} Crore`,
      status: newSiteStatus,
    };

    setSites([newProject, ...sites]);
    setNewSiteName("");
    setNewSiteLocation("");
    setNewSiteBudget("");
    alert(`Project "${newProject.name}" initiated and added to live tracker!`);
  };

  // Calculations for Billing
  const billBaseAmount = billUnits * billRatePerUnit;
  const billTaxableSubtotal = billBaseAmount + Number(billFreight);
  const billGst = Math.round(billTaxableSubtotal * 0.18);
  const billGrandTotal = billTaxableSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const inv = {
      invoiceNo: `CONST-PO-${Math.floor(2000 + Math.random() * 8000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      vendor: billVendor,
      gstin: billGstNo,
      site: billSiteName,
      material: billMaterialType,
      quantity: billUnits,
      rate: billRatePerUnit,
      base: billBaseAmount,
      freight: billFreight,
      gst: billGst,
      total: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  // Labour wage total
  const totalDailyLabourWages = labourList.reduce((acc, l) => acc + l.count * l.dailyRate, 0);

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#b45309", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <HardHat size={16} color="#b45309" />
          <span>Vishwa Infra Developers • Grade-A Civil Infrastructure &amp; High-Rise Project Portal • ISO 9001:2015 &amp; RERA Registered</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Central Project Desk: <strong>{companyInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#b45309", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#d97706", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)" }}>
              <HardHat size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {companyInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {companyInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Company Overview" },
              { id: "sites", label: "Active Sites Progress" },
              { id: "materials", label: "Material Inventory" },
              { id: "billing", label: "Procurement Billing POS" },
              { id: "labour", label: "Daily Labour Roll" },
              { id: "admin", label: "Project Director Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "materials" || t.id === "labour") setCurrentRole("SiteEngineer");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("Client");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #d97706" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#fffbeb" : "transparent",
                  color: activeTab === t.id ? "#b45309" : "#475569",
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Role Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f1f5f9", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem" }}>
              <span style={{ color: "#64748b" }}>Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Billing") setActiveTab("billing");
                  else if (r === "SiteEngineer") setActiveTab("sites");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("landing");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#d97706", outline: "none", cursor: "pointer" }}
              >
                <option value="Client">Client / Investor</option>
                <option value="SiteEngineer">Site Project Engineer</option>
                <option value="Billing">Procurement Billing Desk</option>
                <option value="Admin">Chief Project Director</option>
              </select>
            </div>

            <button
              onClick={() => setShowIndentModal(true)}
              style={{
                backgroundColor: "#d97706",
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
              <Truck size={16} /> Request Material Indent
            </button>
          </div>
        </div>
      </header>

      {/* Indent Approval Alert */}
      {indentAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{indentAlert}</span>
            </div>
            <button
              onClick={() => setIndentAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: LANDING COMPANY OVERVIEW */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#fef3c7", color: "#b45309", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <HardHat size={16} /> Grade-A Civil Infrastructure &amp; Commercial Development
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Precision Civil Engineering, Live Site Tracking &amp; Material Logistics
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                From seismic-resistant commercial towers to luxury residential townships. We manage raw materials, daily labour muster rolls, and architectural compliance with zero delay tolerance.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("sites")}
                  style={{
                    backgroundColor: "#d97706",
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
                    boxShadow: "0 4px 14px rgba(217, 119, 6, 0.3)",
                  }}
                >
                  <Building size={18} /> View Live Civil Sites
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#d97706",
                    border: "1px solid #d97706",
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
                  <CreditCard size={18} /> Material Billing Desk
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#d97706" }}>₹22.7 Cr+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Projects Budget</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#d97706" }}>0.00</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Lost Time Accident Rate</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#d97706" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Fe 550D &amp; 53 Grade Cement</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1000&q=80"
                alt="High-Rise Civil Construction"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>CPWD &amp; RERA Grade-A Contractor</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Quality Tested Cube Strength: 35 N/mm²</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Construction Excellence */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                End-to-End Civil &amp; Structural Governance
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Real-time tracking from soil excavation through final RCC structural completion.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <Layers size={28} color="#d97706" />,
                  title: "Live Milestone Progress",
                  desc: "Slab pouring schedules, shuttering verification, and curing cycle tracking on a single dashboard.",
                },
                {
                  icon: <Truck size={28} color="#d97706" />,
                  title: "Real-Time Material Indents",
                  desc: "Automated low-stock alerts for cement bags, saria tonnage, and fine sand to prevent site stoppages.",
                },
                {
                  icon: <Users size={28} color="#d97706" />,
                  title: "Daily Labour Muster Roll",
                  desc: "Daily headcounts of Masons, Beldars, and Bar-benders with instant wage calculation and payout vouchers.",
                },
                {
                  icon: <ShieldCheck size={28} color="#d97706" />,
                  title: "Structural Safety & Lab Audit",
                  desc: "Strict adherence to IS 456-2000 RCC code with lab testing certificates for every steel batch.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#fffbeb", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ongoing Sites Preview */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Current Active Projects
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Live progress status and financial expenditure on ongoing construction sites.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("sites")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#d97706",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Inspect All Sites <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
              {sites.map((s) => (
                <div key={s.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>Project ID: {s.id}</div>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 0" }}>{s.name}</h3>
                    </div>
                    <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "4px 10px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                      {s.status}
                    </span>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 16px" }}>
                    📍 Location: {s.location}
                  </p>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 600, marginBottom: "6px" }}>
                      <span>Structural Completion</span>
                      <span style={{ color: "#d97706", fontWeight: 800 }}>{s.completion}%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${s.completion}%`, height: "100%", backgroundColor: "#d97706", borderRadius: "4px" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Sanctioned Budget</div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{s.budget}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Spent to Date</div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#16a34a" }}>{s.spent}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: ACTIVE SITES PROGRESS */}
      {activeTab === "sites" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Civil Engineering Sites Monitor
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Real-time milestone completion, excavation depth, and structural engineering phase
              </p>
            </div>
            <button
              onClick={() => setActiveTab("admin")}
              style={{
                backgroundColor: "#d97706",
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
              <Plus size={16} /> Add New Site Project
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
            {sites.map((s) => (
              <div key={s.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>{s.id}</span>
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>{s.name}</h2>
                  </div>
                  <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "4px 10px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                    {s.status}
                  </span>
                </div>

                <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "20px" }}>
                  📍 {s.location}
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px" }}>
                    <span>Civil Progress</span>
                    <span style={{ color: "#d97706", fontWeight: 800 }}>{s.completion}% Done</span>
                  </div>
                  <div style={{ width: "100%", height: "10px", backgroundColor: "#f1f5f9", borderRadius: "5px", overflow: "hidden" }}>
                    <div style={{ width: `${s.completion}%`, height: "100%", backgroundColor: "#d97706", borderRadius: "5px" }} />
                  </div>
                </div>

                {/* Financials */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "10px", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Sanctioned Budget</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>{s.budget}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Disbursed Amount</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>{s.spent}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => {
                      const updated = sites.map((item) =>
                        item.id === s.id ? { ...item, completion: Math.min(100, item.completion + 5) } : item
                      );
                      setSites(updated);
                      alert(`Progress recorded: ${s.name} is now at ${Math.min(100, s.completion + 5)}% completion.`);
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: "#fffbeb",
                      border: "1px solid #fde68a",
                      color: "#b45309",
                      padding: "8px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    +5% Log Slab Pouring
                  </button>
                  <button
                    onClick={() => {
                      setIndentSite(s.name);
                      setShowIndentModal(true);
                    }}
                    style={{
                      backgroundColor: "#d97706",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    Indent Materials
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: MATERIAL INVENTORY & INDENTS */}
      {activeTab === "materials" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Cement, Steel &amp; Aggregate Warehouse Inventory
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Track real-time stock balances across central godown and active site stockyards
              </p>
            </div>
            <button
              onClick={() => setShowIndentModal(true)}
              style={{
                backgroundColor: "#d97706",
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
              <Truck size={16} /> New Material Indent
            </button>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Material Description</th>
                  <th style={{ padding: "14px 20px" }}>Current Available Stock</th>
                  <th style={{ padding: "14px 20px" }}>Measurement Unit</th>
                  <th style={{ padding: "14px 20px" }}>Buffer Threshold</th>
                  <th style={{ padding: "14px 20px" }}>Inventory Status</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, idx) => (
                  <tr key={m.name} style={{ borderBottom: idx !== materials.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f172a" }}>{m.name}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, fontSize: "1rem", color: "#d97706" }}>
                      {m.inStock.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{m.unit}</td>
                    <td style={{ padding: "14px 20px", color: "#64748b" }}>{m.minAlert} {m.unit}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: m.inStock > m.minAlert ? "#f0fdf4" : "#fef2f2", color: m.inStock > m.minAlert ? "#166534" : "#991b1b", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {m.inStock > m.minAlert ? "Adequate Stock" : "Reorder Urgent"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button
                        onClick={() => {
                          setIndentMaterial(m.name);
                          setShowIndentModal(true);
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
                        + Indent Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 4: PROCUREMENT BILLING POS & TAX INVOICE */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Material Purchase &amp; Vendor Billing POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate official contractor supply slips, weighbridge records, and GST tax receipts
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Desk */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#d97706" /> Raw Material Procurement Slip
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Supplier / RMC Vendor</label>
                  <input
                    type="text"
                    value={billVendor}
                    onChange={(e) => setBillVendor(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Vendor GSTIN</label>
                  <input
                    type="text"
                    value={billGstNo}
                    onChange={(e) => setBillGstNo(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Destination Site Delivery</label>
                <select
                  value={billSiteName}
                  onChange={(e) => setBillSiteName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.location})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Material Description</label>
                <select
                  value={billMaterialType}
                  onChange={(e) => setBillMaterialType(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {materials.map((m) => (
                    <option key={m.name} value={m.name}>{m.name} (Unit: {m.unit})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Dispatched Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={billUnits}
                    onChange={(e) => setBillUnits(parseInt(e.target.value) || 1)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Rate Per Unit (₹)</label>
                  <input
                    type="number"
                    value={billRatePerUnit}
                    onChange={(e) => setBillRatePerUnit(parseInt(e.target.value) || 1)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Dumper Freight &amp; Unloading Cartage (₹)</label>
                <input
                  type="number"
                  value={billFreight}
                  onChange={(e) => setBillFreight(parseInt(e.target.value) || 0)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <button
                onClick={handleGenerateInvoice}
                style={{
                  width: "100%",
                  backgroundColor: "#d97706",
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
                <Printer size={18} /> Review &amp; Print Purchase Order Tax Invoice
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Procurement Calculation Ledger
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Supply Quantity</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{billUnits} Units</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Base Material Valuation</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billBaseAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Transit Freight &amp; Crane Unloading</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billFreight).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Value</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billTaxableSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>GST (18% for Construction Commodities)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#b45309", fontWeight: 600 }}>Total Purchase Order Obligation</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#b45309", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#92400e", marginTop: "4px" }}>
                    *Weighbridge tare weight challan attached with site supervisor sign-off
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 5: DAILY LABOUR ROLL */}
      {activeTab === "labour" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Daily Site Labour Muster Roll
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Shift muster roll, daily headcount of artisans, and daily wage payout ledger
              </p>
            </div>
            <div style={{ backgroundColor: "#fffbeb", color: "#b45309", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Today's Daily Wage Total: ₹{totalDailyLabourWages.toLocaleString()}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Artisan / Worker Skill Category</th>
                  <th style={{ padding: "14px 20px" }}>Count On Site Today</th>
                  <th style={{ padding: "14px 20px" }}>Daily Manday Rate (₹)</th>
                  <th style={{ padding: "14px 20px" }}>Total Daily Wage Cost (₹)</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {labourList.map((l) => (
                  <tr key={l.category} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f172a" }}>{l.category}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#d97706" }}>{l.count} Workers</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>₹{l.dailyRate} / day</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#0f172a" }}>
                      ₹{(l.count * l.dailyRate).toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => {
                            setLabourList((prev) =>
                              prev.map((item) =>
                                item.category === l.category ? { ...item, count: item.count + 1 } : item
                              )
                            );
                          }}
                          style={{ padding: "4px 10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}
                        >
                          +1
                        </button>
                        <button
                          onClick={() => {
                            setLabourList((prev) =>
                              prev.map((item) =>
                                item.category === l.category ? { ...item, count: Math.max(0, item.count - 1) } : item
                              )
                            );
                          }}
                          style={{ padding: "4px 10px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}
                        >
                          -1
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 6: PROJECT DIRECTOR ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Chief Project Director &amp; Executive Admin
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Master capital allocations, new project sanctioning, and compliance registers
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Civil Sites</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#d97706", marginTop: "4px" }}>
                {sites.length} Projects
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Sanctioned Budget</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                ₹22.7 Crore
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Daily Labour Force</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f766e", marginTop: "4px" }}>
                {labourList.reduce((acc, l) => acc + l.count, 0)} Masons/Crew
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Cement In Stock</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                {materials.find((m) => m.name.includes("Cement"))?.inStock || 850} Bags
              </div>
            </div>
          </div>

          {/* Add Site Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#d97706" /> Sanction &amp; Launch New Civil Construction Project
            </h2>

            <form onSubmit={handleAddSite} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ganga Expressway Flyover Pier 12"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Location / Zone</label>
                <input
                  type="text"
                  placeholder="e.g. GT Road Corridor, Kanpur"
                  value={newSiteLocation}
                  onChange={(e) => setNewSiteLocation(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Estimated Project Budget (₹ Crores)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 5.5"
                  value={newSiteBudget}
                  onChange={(e) => setNewSiteBudget(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Initial Construction Phase</label>
                <select
                  value={newSiteStatus}
                  onChange={(e) => setNewSiteStatus(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="Soil Testing &amp; Excavation">Soil Testing &amp; Excavation</option>
                  <option value="Piling &amp; Raft Foundation">Piling &amp; Raft Foundation</option>
                  <option value="Active (Framing &amp; Slab Pouring)">Active (Framing &amp; Slab Pouring)</option>
                  <option value="Brickwork &amp; Plaster">Brickwork &amp; Plaster</option>
                  <option value="Finishing, Glazing &amp; Electrical">Finishing, Glazing &amp; Electrical</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#d97706",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Sanction Project
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: MATERIAL INDENT */}
      {showIndentModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "480px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Request Material Indent
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Authorizes inventory release and delivery transit to active site yard.
            </p>

            <form onSubmit={handleCreateIndent}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Destination Site</label>
                <select
                  value={indentSite}
                  onChange={(e) => setIndentSite(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Material Needed</label>
                <select
                  value={indentMaterial}
                  onChange={(e) => setIndentMaterial(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {materials.map((m) => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Requested Indent Quantity</label>
                <input
                  type="number"
                  min="10"
                  value={indentQty}
                  onChange={(e) => setIndentQty(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowIndentModal(false)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#d97706", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Approve &amp; Dispatch Indent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE PURCHASE ORDER TAX INVOICE MODAL */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Invoice Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #d97706", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#d97706" }}>{companyInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Civil Projects &amp; Heavy Infra Division • ISO 9001:2015</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Helpline: {companyInfo.phone} • GSTIN: 09AAACV5511M1Z1</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>PROCUREMENT PO INVOICE</div>
                <div style={{ fontSize: "0.82rem", color: "#d97706", fontWeight: 700 }}>{activeInvoiceModal.invoiceNo}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Vendor & Site Info */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Vendor / Consignor</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.vendor}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>GSTIN: {activeInvoiceModal.gstin}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Delivery Site &amp; Consignee</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.site}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Site Quality Control In-Charge</div>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Item Description</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Rate (₹)</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.material}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Test Certificate IS 456-2000 Attached</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "center", fontWeight: 600 }}>{activeInvoiceModal.quantity}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>₹{activeInvoiceModal.rate.toLocaleString()}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.base.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }} colSpan={3}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>Hydraulic Dumper Freight &amp; On-Site Crane Unloading</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{Number(activeInvoiceModal.freight).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{(activeInvoiceModal.base + Number(activeInvoiceModal.freight)).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>GST (18%):</span>
                <span style={{ fontWeight: 700 }}>₹{activeInvoiceModal.gst.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Grand Total:</span>
                <span style={{ fontWeight: 900, color: "#d97706" }}>₹{activeInvoiceModal.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Signatures */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginBottom: "24px", fontSize: "0.8rem", color: "#64748b" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "30px" }}>Vendor Weighbridge Clerk</div>
                <div>Authorized Seal &amp; Sign</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: "30px" }}>For Vishwa Infra Developers</div>
                <div>Resident Site Engineer Sign-off</div>
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
                  backgroundColor: "#d97706",
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
                <Printer size={16} /> Print Official Purchase Order
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
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d97706", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <HardHat size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{companyInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Class-1 Civil Engineering &amp; Infrastructure Contractors. Specializing in commercial high-rises, institutional campuses, industrial pre-engineered buildings, and highway flyovers.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#b45309", fontWeight: 600 }}>
              🏗️ CPWD Grade-A # UP/CPWD/2021/4490 • RERA Approved Civil Builder
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Project Capabilities</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Seismic-Resistant RCC Framing</li>
              <li>Ready-Mix Concrete (RMC) Plants</li>
              <li>Steel Fabrication &amp; Pre-Engineered Warehouses</li>
              <li>Civil Earthwork &amp; Piling Foundations</li>
              <li>Turnkey EPC Project Management</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Safety &amp; Compliance</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>ISO 45001:2018 Safety Certified</li>
              <li>Daily Toolbox Safety Talks</li>
              <li>Mandatory PPE Hardhat &amp; Harness</li>
              <li>IS 456-2000 Concrete Compliance</li>
              <li>Third-Party Structural Cube Tests</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Central Project Office</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 Vishwa Infra Hub, Mall Road, Kanpur 208001</div>
              <div>📞 Helpline: <strong>{companyInfo.phone}</strong></div>
              <div>✉️ projects@vishvainfra.com</div>
              <div>⏰ Site Operations: 06:00 AM – 08:00 PM Daily</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
