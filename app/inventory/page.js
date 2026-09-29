"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Plus,
  Minus,
  AlertTriangle,
  Search,
  CheckCircle2,
  TrendingUp,
  Package,
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  CreditCard,
  Printer,
  ShieldCheck,
  Award,
  ChevronRight,
  Truck,
  FileText,
  Clock,
  Check,
  Layers,
  ArrowRight,
  DollarSign,
  BarChart2,
  Database,
} from "lucide-react";
import { inventoryData } from "@/data/businessAppsData";

export default function InventoryApp() {
  const { warehouseInfo, items: initialItems } = inventoryData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "catalog", "dispatch", "billing", "staff", "admin"
  const [currentRole, setCurrentRole] = useState("WarehouseClerk"); // "WarehouseClerk", "DispatchStaff", "Billing", "Admin"
  const [stockItems, setStockItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  // Inbound/Outbound Dispatch Logs
  const [dispatchLogs, setDispatchLogs] = useState([
    {
      id: "DSP-701",
      sku: "SKU-9011",
      item: "Industrial Safety Helmets (Yellow)",
      qty: 60,
      type: "Outbound Dispatch",
      destination: "Metro Rail Construction Site Pier 14",
      date: "2026-09-30 10:15 AM",
      status: "Dispatched",
    },
    {
      id: "RCV-802",
      sku: "SKU-9013",
      item: "Lithium Cordless Drill Kit (18V)",
      qty: 25,
      type: "Inbound Delivery",
      destination: "Godown Bay 3 (From Bosch Tools)",
      date: "2026-09-30 08:45 AM",
      status: "Inspected & Shelved",
    },
    {
      id: "DSP-703",
      sku: "SKU-9012",
      item: "Heavy Duty Extension Cord (10m)",
      qty: 15,
      type: "Outbound Dispatch",
      destination: "Apex Tech Campus Facility Team",
      date: "2026-09-29 04:30 PM",
      status: "Delivered",
    },
  ]);

  // Purchase Order & Billing POS State
  const [billVendor, setBillVendor] = useState("Karam Safety Solutions Private Ltd");
  const [billGstNo, setBillGstNo] = useState("09AAACK4412B1ZX");
  const [billSku, setBillSku] = useState("SKU-9011");
  const [billQty, setBillQty] = useState(100);
  const [billUnitCost, setBillUnitCost] = useState(180);
  const [billFreight, setBillFreight] = useState(1200);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New SKU State
  const [showAddSkuModal, setShowAddSkuModal] = useState(false);
  const [newSku, setNewSku] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Power Tools");
  const [newQty, setNewQty] = useState(50);
  const [newCost, setNewCost] = useState("");
  const [newSale, setNewSale] = useState("");
  const [newSupplier, setNewSupplier] = useState("");
  const [skuSuccess, setSkuSuccess] = useState(null);

  // Categories
  const categories = ["All", ...Array.from(new Set(stockItems.map((i) => i.category)))];

  // Stock Adjuster
  const handleStockAdjust = (sku, delta) => {
    setStockItems((prev) =>
      prev.map((item) => {
        if (item.sku === sku) {
          const updated = item.qty + delta;
          return { ...item, qty: updated >= 0 ? updated : 0 };
        }
        return item;
      })
    );
  };

  // Add SKU Submit
  const handleAddNewSku = (e) => {
    e.preventDefault();
    if (!newSku || !newName) return;
    const item = {
      sku: newSku,
      name: newName,
      category: newCategory,
      qty: Number(newQty),
      minAlert: 20,
      costPrice: Number(newCost) || 500,
      salePrice: Number(newSale) || 800,
      supplier: newSupplier || "Direct Manufacturer",
    };
    setStockItems([item, ...stockItems]);
    setShowAddSkuModal(false);
    setNewSku("");
    setNewName("");
    setNewCost("");
    setNewSale("");
    setSkuSuccess(`New SKU "${item.sku} - ${item.name}" registered into warehouse inventory.`);
  };

  // Billing Calculation
  const billBaseAmount = billQty * billUnitCost;
  const billTaxableSubtotal = billBaseAmount + Number(billFreight);
  const billGst = Math.round(billTaxableSubtotal * 0.18);
  const billGrandTotal = billTaxableSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const matchedItem = stockItems.find((s) => s.sku === billSku) || stockItems[0];
    const inv = {
      poNumber: `PO-APEX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      vendor: billVendor,
      gstin: billGstNo,
      sku: billSku,
      itemName: matchedItem.name,
      qty: billQty,
      rate: billUnitCost,
      base: billBaseAmount,
      freight: billFreight,
      gst: billGst,
      total: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  const totalInventoryValue = stockItems.reduce((acc, it) => acc + it.qty * it.costPrice, 0);
  const totalSaleValue = stockItems.reduce((acc, it) => acc + it.qty * it.salePrice, 0);
  const lowStockCount = stockItems.filter((it) => it.qty <= it.minAlert).length;

  const filteredItems = stockItems.filter((it) => {
    if (selectedCat !== "All" && it.category !== selectedCat) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return it.name.toLowerCase().includes(q) || it.sku.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Boxes size={16} color="#1d4ed8" />
          <span>Apex Cloud Logistics ERP • Real-Time Barcode &amp; SKU Master Ledger • ISO 27001 Warehouse Management</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Inventory Central Desk: <strong>+91 96548 80240</strong></span>
          <Link href="/business-suite" style={{ color: "#1d4ed8", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)" }}>
              <Boxes size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {warehouseInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {warehouseInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "ERP Overview" },
              { id: "catalog", label: "SKU Master Register" },
              { id: "dispatch", label: "In/Out Dispatch Desk" },
              { id: "billing", label: "Purchase Order POS" },
              { id: "staff", label: "Warehouse Staff Board" },
              { id: "admin", label: "Inventory Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "dispatch" || t.id === "staff") setCurrentRole("DispatchStaff");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("WarehouseClerk");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #2563eb" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#eff6ff" : "transparent",
                  color: activeTab === t.id ? "#2563eb" : "#475569",
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
                  else if (r === "DispatchStaff") setActiveTab("dispatch");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("catalog");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#2563eb", outline: "none", cursor: "pointer" }}
              >
                <option value="WarehouseClerk">Inventory Clerk</option>
                <option value="DispatchStaff">Dispatch Supervisor</option>
                <option value="Billing">Procurement Billing Desk</option>
                <option value="Admin">Warehouse Director</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddSkuModal(true)}
              style={{
                backgroundColor: "#2563eb",
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
              <Plus size={16} /> New SKU
            </button>
          </div>
        </div>
      </header>

      {/* SKU Success Alert */}
      {skuSuccess && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{skuSuccess}</span>
            </div>
            <button
              onClick={() => setSkuSuccess(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: ERP OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Boxes size={16} /> Cloud ERP Warehouse &amp; Supply Chain Engine
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Eliminate Stockouts with Intelligent SKU Tracking &amp; Automated Invoicing
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                From high-velocity pallet staging to bin-level component traceability. Apex Inventory gives your enterprise real-time visibility across inward goods, quality quarantines, and outward dispatch challans.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("catalog")}
                  style={{
                    backgroundColor: "#2563eb",
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
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                  }}
                >
                  <Search size={18} /> Inspect SKU Master Register
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#2563eb",
                    border: "1px solid #2563eb",
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
                  <CreditCard size={18} /> Purchase Order POS Desk
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#2563eb" }}>₹{(totalInventoryValue / 100000).toFixed(1)} Lakh+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Asset Stock Value</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#2563eb" }}>99.8%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Order Picking Accuracy</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#2563eb" }}>&lt; 4 Hours</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Inward Dock-to-Stock SLA</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="Automated High-Bay Logistics Warehouse"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#eff6ff", color: "#2563eb", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>GS1 Barcode &amp; RFID Compliant</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>FIFO &amp; Batch Expiry Traceability Ready</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Warehouse Precision */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Enterprise Inventory Control &amp; Optimization
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Built to handle high-turnover SKUs, supplier MOQs, and multi-bay stock movements.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <AlertTriangle size={28} color="#2563eb" />,
                  title: "Dynamic Buffer Thresholds",
                  desc: "Automated trigger points flag re-orders when quantity drops below safety stock minimums.",
                },
                {
                  icon: <Truck size={28} color="#2563eb" />,
                  title: "Inward &amp; Outward Logs",
                  desc: "Full audit trail of goods receipts, quality inspection clearances, and client dispatch challans.",
                },
                {
                  icon: <FileText size={28} color="#2563eb" />,
                  title: "Instant Purchase Order POS",
                  desc: "Generate vendor purchase orders with freight cartage, HS codes, and 18% GST tax computations.",
                },
                {
                  icon: <BarChart2 size={28} color="#2563eb" />,
                  title: "Asset Valuation Ledgers",
                  desc: "Real-time cost price vs retail margin metrics to monitor capital locked in warehouse inventory.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#eff6ff", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick SKU Stock Highlights */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  High-Priority Stock Items
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Current inventory status across key fast-moving items in central warehouse.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("catalog")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#2563eb",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Full SKU Master ({stockItems.length}) <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {stockItems.map((it) => (
                <div key={it.sku} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", backgroundColor: "#eff6ff", padding: "3px 8px", borderRadius: "4px" }}>
                      {it.sku}
                    </span>
                    <span style={{ backgroundColor: it.qty <= it.minAlert ? "#fef2f2" : "#f0fdf4", color: it.qty <= it.minAlert ? "#991b1b" : "#166534", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700 }}>
                      {it.qty <= it.minAlert ? "Low Stock" : "Normal Stock"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{it.name}</h3>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "16px" }}>Category: <strong>{it.category}</strong></div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "16px" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Available Qty</div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 900, color: it.qty <= it.minAlert ? "#dc2626" : "#2563eb" }}>
                        {it.qty} Units
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Cost / Unit</div>
                      <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>₹{it.costPrice}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleStockAdjust(it.sku, 5)}
                      style={{ flex: 1, padding: "8px", backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", color: "#334155" }}
                    >
                      +5 Quick Inward
                    </button>
                    <button
                      onClick={() => {
                        setBillSku(it.sku);
                        setBillUnitCost(it.costPrice);
                        setActiveTab("billing");
                      }}
                      style={{ padding: "8px 12px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                    >
                      Create PO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: SKU MASTER REGISTER */}
      {activeTab === "catalog" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                SKU Master Stock Register
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Live warehouse ledger with instant bin adjustment and supplier details
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
                <input
                  type="text"
                  placeholder="Search SKU code, item name..."
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
                onClick={() => setShowAddSkuModal(true)}
                style={{
                  backgroundColor: "#2563eb",
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
                <Plus size={16} /> Add SKU
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: selectedCat === cat ? "1px solid #2563eb" : "1px solid #cbd5e1",
                  backgroundColor: selectedCat === cat ? "#2563eb" : "#ffffff",
                  color: selectedCat === cat ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Master Table */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>SKU Code</th>
                  <th style={{ padding: "14px 20px" }}>Item Description</th>
                  <th style={{ padding: "14px 20px" }}>Category</th>
                  <th style={{ padding: "14px 20px" }}>Cost Price</th>
                  <th style={{ padding: "14px 20px" }}>Retail Price</th>
                  <th style={{ padding: "14px 20px" }}>Current On-Hand Qty</th>
                  <th style={{ padding: "14px 20px" }}>Inventory Status</th>
                  <th style={{ padding: "14px 20px" }}>Quick Adjust</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((it) => (
                  <tr key={it.sku} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#2563eb" }}>{it.sku}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{it.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Vendor: {it.supplier}</div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{it.category}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 600 }}>₹{it.costPrice}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: "#16a34a" }}>₹{it.salePrice}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 900, fontSize: "1.05rem", color: it.qty <= it.minAlert ? "#dc2626" : "#0f172a" }}>
                      {it.qty} Units
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: it.qty <= it.minAlert ? "#fef2f2" : "#f0fdf4", color: it.qty <= it.minAlert ? "#991b1b" : "#166534", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700 }}>
                        {it.qty <= it.minAlert ? "⚠️ Low Stock" : "✓ In Stock"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => handleStockAdjust(it.sku, 1)}
                          style={{ padding: "4px 10px", backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "6px", color: "#1d4ed8", fontWeight: 800, cursor: "pointer" }}
                        >
                          +1
                        </button>
                        <button
                          onClick={() => handleStockAdjust(it.sku, -1)}
                          style={{ padding: "4px 10px", backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", color: "#991b1b", fontWeight: 800, cursor: "pointer" }}
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

      {/* TAB 3: IN/OUT DISPATCH DESK */}
      {activeTab === "dispatch" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Inbound Receiving &amp; Outbound Dispatch Desk
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Live gate pass ledger, delivery challans, and carrier handover tracking
              </p>
            </div>
            <div style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Live Dispatch Records: {dispatchLogs.length} Transactions
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Challan #</th>
                  <th style={{ padding: "14px 20px" }}>Item &amp; SKU</th>
                  <th style={{ padding: "14px 20px" }}>Movement Type</th>
                  <th style={{ padding: "14px 20px" }}>Quantity</th>
                  <th style={{ padding: "14px 20px" }}>Destination / Vendor</th>
                  <th style={{ padding: "14px 20px" }}>Timestamp</th>
                  <th style={{ padding: "14px 20px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {dispatchLogs.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#2563eb" }}>{d.id}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{d.item}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>SKU: {d.sku}</div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: d.type.includes("Outbound") ? "#fff7ed" : "#eff6ff", color: d.type.includes("Outbound") ? "#c2410c" : "#1d4ed8", padding: "3px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {d.type}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: 800 }}>{d.qty} Units</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{d.destination}</td>
                    <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "0.8rem" }}>{d.date}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: "#f0fdf4", color: "#166534", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 4: PURCHASE ORDER BILLING POS */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Supplier Purchase Order &amp; Invoicing POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate purchase order slips, freight cartage calculations, and supplier tax receipts
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Desk */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#2563eb" /> Purchase Order Parameters
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Supplier / Manufacturer Name</label>
                  <input
                    type="text"
                    value={billVendor}
                    onChange={(e) => setBillVendor(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Supplier GSTIN</label>
                  <input
                    type="text"
                    value={billGstNo}
                    onChange={(e) => setBillGstNo(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Select Stock SKU Item</label>
                <select
                  value={billSku}
                  onChange={(e) => {
                    setBillSku(e.target.value);
                    const it = stockItems.find((s) => s.sku === e.target.value);
                    if (it) setBillUnitCost(it.costPrice);
                  }}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {stockItems.map((s) => (
                    <option key={s.sku} value={s.sku}>{s.sku} - {s.name} (Cost: ₹{s.costPrice})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Order Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={billQty}
                    onChange={(e) => setBillQty(parseInt(e.target.value) || 1)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Unit Cost Price (₹)</label>
                  <input
                    type="number"
                    value={billUnitCost}
                    onChange={(e) => setBillUnitCost(parseInt(e.target.value) || 1)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Logistics Freight &amp; Handling (₹)</label>
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
                  backgroundColor: "#2563eb",
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
                Procurement Cost Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Order Quantity</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{billQty} Units</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Base Goods Value</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billBaseAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Express Road Freight &amp; Handling</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billFreight).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billTaxableSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Goods &amp; Service Tax (18% GST)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 600 }}>Total Purchase Obligation</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#1d4ed8", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#2563eb", marginTop: "4px" }}>
                    *Authorizes godown manager to receive and barcode upon delivery arrival
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 5: WAREHOUSE STAFF BOARD */}
      {activeTab === "staff" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Warehouse Operations &amp; Picking Board
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Real-time bin picking assignments, forklift handling, and pallet staging
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {[
              {
                task: "Bin 14A Re-stocking",
                item: "Safety Helmets (Yellow)",
                assignee: "Satish Kumar (Forklift Op)",
                priority: "High",
                status: "In Progress",
              },
              {
                task: "Barcode Tagging & Staging",
                item: "Lithium Cordless Drill Kits",
                assignee: "Deepak Rawat (QA Inspector)",
                priority: "Normal",
                status: "Pending QA",
              },
              {
                task: "Outbound Pallet Wrapping",
                item: "Heavy Duty Extension Cords",
                assignee: "Manoj Singh (Packer)",
                priority: "Urgent",
                status: "Ready for Dispatch",
              },
            ].map((t, idx) => (
              <div key={idx} style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: t.priority === "Urgent" ? "#dc2626" : "#2563eb" }}>
                    {t.priority} Priority
                  </span>
                  <span style={{ backgroundColor: "#f1f5f9", padding: "3px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>
                    {t.status}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{t.task}</h3>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>Item: {t.item}</div>
                <div style={{ fontSize: "0.8rem", color: "#475569", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                  Assigned to: <strong>{t.assignee}</strong>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 6: INVENTORY ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Central Inventory Master Admin
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Master inventory valuation, catalog onboarding, and supplier performance
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total SKUs Managed</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#2563eb", marginTop: "4px" }}>
                {stockItems.length} Products
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Asset Inventory Cost</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                ₹{totalInventoryValue.toLocaleString()}
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Est. Retail Valuation</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                ₹{totalSaleValue.toLocaleString()}
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Critical Stock Items</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: lowStockCount > 0 ? "#dc2626" : "#16a34a", marginTop: "4px" }}>
                {lowStockCount} Items
              </div>
            </div>
          </div>

          {/* Add SKU Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#2563eb" /> Register New SKU to Master Catalog
            </h2>

            <form onSubmit={handleAddNewSku} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>SKU Code (Unique Barcode)</label>
                <input
                  type="text"
                  placeholder="e.g. SKU-9015"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Item Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Safety Goggles Anti-Fog"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="Safety">Safety</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Power Tools">Power Tools</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Initial Inward Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Cost Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Sale Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 280"
                  value={newSale}
                  onChange={(e) => setNewSale(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Supplier / OEM Manufacturer</label>
                <input
                  type="text"
                  placeholder="e.g. 3M India Limited"
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Save &amp; Generate Barcode
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: ADD SKU */}
      {showAddSkuModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "500px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Register New Inventory SKU
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Assign SKU code and initial stock allocation in warehouse bins.
            </p>

            <form onSubmit={handleAddNewSku}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>SKU Code</label>
                <input
                  type="text"
                  placeholder="e.g. SKU-9018"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Safety Harness Belt"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Cost (₹)</label>
                  <input
                    type="number"
                    placeholder="450"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Sale (₹)</label>
                  <input
                    type="number"
                    placeholder="750"
                    value={newSale}
                    onChange={(e) => setNewSale(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowAddSkuModal(false)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Save to Inventory
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #2563eb", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#2563eb" }}>{warehouseInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Supply Chain ERP Logistics Desk • ISO 27001 Certified</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>GSTIN: 09AAACA9922M1ZQ • Email: po@apexlogistics.com</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>PURCHASE ORDER</div>
                <div style={{ fontSize: "0.82rem", color: "#2563eb", fontWeight: 700 }}>{activeInvoiceModal.poNumber}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Vendor Info */}
            <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Vendor / Consignor</div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.vendor}</div>
              <div style={{ fontSize: "0.85rem", color: "#475569" }}>GSTIN: {activeInvoiceModal.gstin}</div>
              <div style={{ fontSize: "0.85rem", color: "#475569" }}>Deliver To: Apex Central Warehouse Dock 3, Transport Nagar</div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>SKU &amp; Description</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Qty</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Cost Rate (₹)</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.itemName}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>SKU Code: {activeInvoiceModal.sku} • Quality Inspection Required</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "center", fontWeight: 600 }}>{activeInvoiceModal.qty}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>₹{activeInvoiceModal.rate.toLocaleString()}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.base.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }} colSpan={3}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>Direct Express Freight &amp; Pallet Handling Charges</div>
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
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Total PO Value:</span>
                <span style={{ fontWeight: 900, color: "#2563eb" }}>₹{activeInvoiceModal.total.toLocaleString()}</span>
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
                  backgroundColor: "#2563eb",
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
                <Printer size={16} /> Print Purchase Order Invoice
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
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Boxes size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{warehouseInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Enterprise Cloud Inventory &amp; Supply Chain ERP. Managing high-throughput multi-bay fulfillment centers with real-time barcode tracking and automated replenishment.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#1d4ed8", fontWeight: 600 }}>
              📦 GS1 India Certified Barcode System • ISO 27001 Data Security
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>ERP Modules</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Real-time SKU Master Register</li>
              <li>Batch Expiry &amp; FIFO Tracking</li>
              <li>Purchase Order &amp; GST POS Billing</li>
              <li>Inbound Receiving Dock Passes</li>
              <li>Outbound Dispatch Challans</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Warehouse Standards</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Cycle Count Reconciliation</li>
              <li>Automated Reorder Alerts</li>
              <li>Forklift &amp; Pallet Safety Audits</li>
              <li>Supplier Lead-Time Analytics</li>
              <li>Zero-Damage Transit Protocol</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Logistics Hub</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 Apex Logistics Park, Transport Nagar, Kanpur</div>
              <div>📞 Helpline: <strong>+91 96548 80240</strong></div>
              <div>✉️ support@apexlogistics.com</div>
              <div>⏰ Dock Operations: 24/7 Receiving &amp; Dispatch</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {warehouseInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
