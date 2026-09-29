"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Store,
  Barcode,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  Package,
  Layers,
  ArrowRight,
  User,
  Clock,
  Phone,
  Tag,
  Boxes,
} from "lucide-react";
import { groceryData } from "@/data/businessAppsData";

export default function GroceryApp() {
  const { storeInfo, catalog: initialCatalog } = groceryData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "catalog", "pos", "shelves", "admin"
  const [currentRole, setCurrentRole] = useState("Customer"); // "Customer", "Cashier", "Stocker", "Admin"
  const [catalogList, setCatalogList] = useState(initialCatalog);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // POS State
  const [ticketItems, setTicketItems] = useState([
    { ...initialCatalog[0], qty: 2 },
    { ...initialCatalog[2], qty: 3 },
    { ...initialCatalog[4], qty: 1 },
  ]);
  const [customerName, setCustomerName] = useState("Counter Walk-in");
  const [customerPhone, setCustomerPhone] = useState("9876543210");
  const [paymentMode, setPaymentMode] = useState("UPI / QR Scan");
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  // Admin New Product State
  const [newBarcode, setNewBarcode] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Flour & Grains");
  const [newPrice, setNewPrice] = useState("");
  const [newMrp, setNewMrp] = useState("");
  const [newStock, setNewStock] = useState("50");
  const [newUnit, setNewUnit] = useState("pack");

  // Categories list
  const categories = ["All", ...Array.from(new Set(catalogList.map((c) => c.category)))];

  // POS Add item
  const addItemToTicket = (item) => {
    setTicketItems((prev) => {
      const existing = prev.find((i) => i.barcode === item.barcode);
      if (existing) {
        return prev.map((i) => (i.barcode === item.barcode ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (barcode, delta) => {
    setTicketItems((prev) =>
      prev
        .map((i) => {
          if (i.barcode === barcode) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (barcode) => {
    setTicketItems((prev) => prev.filter((i) => i.barcode !== barcode));
  };

  // Calculations
  const subtotal = ticketItems.reduce((acc, it) => acc + it.qty * it.price, 0);
  const totalMrp = ticketItems.reduce((acc, it) => acc + it.qty * it.mrp, 0);
  const totalSavings = totalMrp - subtotal;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST on essentials
  const grandTotal = subtotal + gstAmount;

  const handleSettleBill = () => {
    if (ticketItems.length === 0) return;
    const bill = {
      billNo: `GROC-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      customer: customerName,
      phone: customerPhone,
      items: ticketItems,
      subtotal,
      savings: totalSavings,
      gst: gstAmount,
      total: grandTotal,
      paymentMode,
    };
    setActiveReceiptModal(bill);
    setTicketItems([]);
  };

  // Admin Add Product Submit
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newBarcode || !newName || !newPrice) return;

    const prod = {
      barcode: newBarcode,
      name: newName,
      category: newCategory,
      price: parseInt(newPrice) || 100,
      mrp: parseInt(newMrp) || parseInt(newPrice) + 20,
      stock: parseInt(newStock) || 50,
      unit: newUnit,
    };

    setCatalogList([...catalogList, prod]);
    setNewBarcode("");
    setNewName("");
    setNewPrice("");
    setNewMrp("");
    alert(`Product "${prod.name}" successfully added to supermart inventory!`);
  };

  // Filtered Catalog
  const filteredCatalog = catalogList.filter((c) => {
    if (selectedCat !== "All" && c.category !== selectedCat) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.barcode.includes(q) || c.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #dcfce7", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#166534", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Store size={16} color="#166534" />
          <span>🛒 {storeInfo.name} • 100% Pure Grains &amp; Spices • Barcoded Express POS • FSSAI: {storeInfo.fssai}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Free 30-Min Delivery: <strong>{storeInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#166534", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#16a34a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)" }}>
              <Store size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {storeInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {storeInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Supermart Overview" },
              { id: "catalog", label: "Grocery Aisle Catalog" },
              { id: "pos", label: "Express POS Cashier" },
              { id: "shelves", label: "Shelf Stocker Desk" },
              { id: "admin", label: "Store Manager Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "pos") setCurrentRole("Cashier");
                  else if (t.id === "shelves") setCurrentRole("Stocker");
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
                  border: activeTab === t.id ? "1px solid #16a34a" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#f0fdf4" : "transparent",
                  color: activeTab === t.id ? "#16a34a" : "#475569",
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
                  if (r === "Cashier") setActiveTab("pos");
                  else if (r === "Stocker") setActiveTab("shelves");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("catalog");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#16a34a", outline: "none", cursor: "pointer" }}
              >
                <option value="Customer">Walk-in Shopper</option>
                <option value="Cashier">Barcode Cashier</option>
                <option value="Stocker">Shelf Stocker</option>
                <option value="Admin">Supermart Owner</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("pos")}
              style={{
                backgroundColor: "#16a34a",
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
              <ShoppingBag size={16} /> Open POS Ticket ({ticketItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* TAB 1: SUPERMART OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f0fdf4", color: "#166534", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Store size={16} /> Pure Grains • Best Wholesale Daily Rates
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Quality Daily Groceries, Pure Spices &amp; Express 30-Min Delivery
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Stock your kitchen with 100% adulteration-free chakki fresh atta, royal basmati rice, farm ghee, and pure whole spices. Shop online or visit our modern barcoded supermart counter in Govind Nagar.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("catalog")}
                  style={{
                    backgroundColor: "#16a34a",
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
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.3)",
                  }}
                >
                  <Search size={18} /> Browse Supermart Catalog
                </button>
                <button
                  onClick={() => setActiveTab("pos")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#16a34a",
                    border: "1px solid #16a34a",
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
                  <Barcode size={18} /> Barcoded POS Billing
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#16a34a" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Pure &amp; Lab-Tested</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#16a34a" }}>Up to 25%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>MRP Savings Everyday</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#16a34a" }}>30 Mins</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Express Home Delivery</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80"
                alt="Well-Stocked Modern Grocery Supermart"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>FSSAI Licensed Retailer</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Govt. Certified Quality Grains &amp; Dairy</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Supermart Trust */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Why Kanpur Kitchens Rely On Apna Kirana
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Guaranteed freshness, accurate digital weighing, and instant billing receipts.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <ShieldCheck size={28} color="#16a34a" />,
                  title: "100% Pure Grains & Pulses",
                  desc: "Triple-cleaned and stone-free pulses, aromatic basmati rice, and unadulterated cold-pressed oils.",
                },
                {
                  icon: <Tag size={28} color="#16a34a" />,
                  title: "Direct Mandi Wholesale Rates",
                  desc: "We buy directly from agricultural producer cooperatives to pass substantial MRP discounts to families.",
                },
                {
                  icon: <Barcode size={28} color="#16a34a" />,
                  title: "Barcode Scanner Checkout",
                  desc: "Zero queues. Fast optical scanning counter with thermal printed tax invoices and UPI QR settlement.",
                },
                {
                  icon: <Clock size={28} color="#16a34a" />,
                  title: "30-Min Neighborhood Delivery",
                  desc: "Doorstep delivery across Govind Nagar, Kakadeo, and Civil Lines with tamper-proof carry bags.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#f0fdf4", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Best-Seller Items Showcase */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Daily Household Staples
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Top everyday pantry essentials with guaranteed savings below MRP
                </p>
              </div>
              <button
                onClick={() => setActiveTab("catalog")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#16a34a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Full Supermart Aisle <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {catalogList.slice(0, 4).map((it) => (
                <div key={it.barcode} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", backgroundColor: "#f0fdf4", padding: "2px 8px", borderRadius: "4px" }}>
                      {it.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 800 }}>
                      Save ₹{it.mrp - it.price}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 6px" }}>{it.name}</h3>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "16px" }}>Barcode: {it.barcode}</div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>₹{it.price}</span>
                    <span style={{ fontSize: "0.9rem", color: "#94a3b8", textDecoration: "line-through" }}>₹{it.mrp}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>/ {it.unit}</span>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <button
                      onClick={() => {
                        addItemToTicket(it);
                        setActiveTab("pos");
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "#16a34a",
                        color: "#ffffff",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      + Add to POS Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: GROCERY AISLE CATALOG */}
      {activeTab === "catalog" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Supermart Grocery Aisles
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Filter products by shelf category and add directly to your checkout ticket
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
                <input
                  type="text"
                  placeholder="Search item, barcode, brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setActiveTab("admin")}
                style={{
                  backgroundColor: "#16a34a",
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
                <Plus size={16} /> Add Supermart Item
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
                  border: selectedCat === cat ? "1px solid #16a34a" : "1px solid #cbd5e1",
                  backgroundColor: selectedCat === cat ? "#16a34a" : "#ffffff",
                  color: selectedCat === cat ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filteredCatalog.map((it) => (
              <div key={it.barcode} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#16a34a", backgroundColor: "#f0fdf4", padding: "2px 8px", borderRadius: "4px" }}>
                    {it.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 800 }}>
                    Save ₹{it.mrp - it.price}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "4px 0 6px" }}>{it.name}</h3>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "16px" }}>
                  Barcode: {it.barcode} • Shelf Stock: <strong>{it.stock} {it.unit}s</strong>
                </div>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>₹{it.price}</span>
                  <span style={{ fontSize: "0.9rem", color: "#94a3b8", textDecoration: "line-through" }}>₹{it.mrp}</span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>/ {it.unit}</span>
                </div>

                <div style={{ marginTop: "auto" }}>
                  <button
                    onClick={() => addItemToTicket(it)}
                    style={{
                      width: "100%",
                      backgroundColor: "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    + Add to POS Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: EXPRESS BARCODED POS CASHIER */}
      {activeTab === "pos" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Express Barcoded Cashier Counter POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Scan barcodes, adjust item weights, compute GST, and print thermal customer receipts
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "32px" }}>
            {/* Left: Active Ticket Table */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <ShoppingBag size={18} color="#16a34a" /> Live Billing Basket ({ticketItems.length} Items)
                </h2>
                {ticketItems.length > 0 && (
                  <button
                    onClick={() => setTicketItems([])}
                    style={{ backgroundColor: "transparent", border: "none", color: "#dc2626", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Items List */}
              {ticketItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
                  <Barcode size={48} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                  <div style={{ fontSize: "1rem", fontWeight: 600 }}>Billing Ticket is Empty</div>
                  <div style={{ fontSize: "0.82rem", marginTop: "4px" }}>Add items from the catalog or search below</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {ticketItems.map((item) => (
                    <div key={item.barcode} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #f1f5f9" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          Rate: ₹{item.price} <span style={{ textDecoration: "line-through", color: "#94a3b8" }}>₹{item.mrp}</span> • Barcode: {item.barcode}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "16px" }}>
                        <button
                          onClick={() => updateQty(item.barcode, -1)}
                          style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 800, cursor: "pointer" }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 800, minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.barcode, 1)}
                          style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 800, cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: "right", minWidth: "80px" }}>
                        <div style={{ fontWeight: 900, fontSize: "1rem", color: "#0f172a" }}>
                          ₹{(item.qty * item.price).toLocaleString()}
                        </div>
                        <button
                          onClick={() => removeItem(item.barcode)}
                          style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.72rem", cursor: "pointer", fontWeight: 600 }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Add Barcode Search */}
              <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>Quick Scan Barcode or Select:</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {catalogList.slice(0, 5).map((it) => (
                    <button
                      key={it.barcode}
                      onClick={() => addItemToTicket(it)}
                      style={{ padding: "6px 12px", backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", color: "#334155" }}
                    >
                      + {it.name.split(" ")[0]} ({it.barcode})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Settle & Calculations */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Customer &amp; Payment Settlement
              </h2>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Mobile Number (For E-Bill)</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="UPI / QR Scan">UPI / QR Scan (Google Pay/PhonePe)</option>
                  <option value="Cash at Counter">Cash at Counter</option>
                  <option value="Debit / Credit Card">Debit / Credit Card (POS EDC)</option>
                </select>
              </div>

              {/* Financial Calculation */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "14px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Gross Items Subtotal:</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#16a34a" }}>
                  <span>Customer MRP Savings:</span>
                  <span style={{ fontWeight: 700 }}>-₹{totalSavings.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Essential GST (5%):</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{gstAmount.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #dcfce7", padding: "16px", borderRadius: "10px", marginTop: "14px" }}>
                  <div style={{ fontSize: "0.82rem", color: "#166534", fontWeight: 600 }}>Net Payable Amount</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#166534", marginTop: "2px" }}>
                    ₹{grandTotal.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSettleBill}
                disabled={ticketItems.length === 0}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  backgroundColor: ticketItems.length === 0 ? "#cbd5e1" : "#16a34a",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: ticketItems.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Printer size={18} /> Settle &amp; Print Thermal GST Receipt
              </button>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: SHELF RESTOCKER DESK */}
      {activeTab === "shelves" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Shelf Restocking &amp; Inward Inventory Desk
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Live stock levels across supermart racks and inward replenishment buttons
              </p>
            </div>
            <div style={{ backgroundColor: "#f0fdf4", color: "#166534", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Live Catalog SKUs: {catalogList.length} Items
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Barcode</th>
                  <th style={{ padding: "14px 20px" }}>Product Name</th>
                  <th style={{ padding: "14px 20px" }}>Aisle Category</th>
                  <th style={{ padding: "14px 20px" }}>MRP</th>
                  <th style={{ padding: "14px 20px" }}>Sale Price</th>
                  <th style={{ padding: "14px 20px" }}>Available Shelf Stock</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {catalogList.map((item) => (
                  <tr key={item.barcode} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#16a34a" }}>{item.barcode}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f172a" }}>{item.name}</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{item.category}</td>
                    <td style={{ padding: "14px 20px", color: "#94a3b8" }}>₹{item.mrp}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: "#0f172a" }}>₹{item.price}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 800, color: item.stock < 50 ? "#ea580c" : "#166534" }}>
                      {item.stock} {item.unit}s
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button
                        onClick={() => {
                          const updated = catalogList.map((it) =>
                            it.barcode === item.barcode ? { ...it, stock: it.stock + 10 } : it
                          );
                          setCatalogList(updated);
                        }}
                        style={{
                          backgroundColor: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          color: "#166534",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        +10 Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 5: STORE MANAGER ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Supermart Manager &amp; Inventory Admin
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Master pricing, new barcoded item registrations, and daily revenue statistics
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Grocery SKUs</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                {catalogList.length} Items
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Shelf Units</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                {catalogList.reduce((acc, it) => acc + it.stock, 0)} Units
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Average MRP Savings</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                14.2% Discount
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Inventory Asset Value</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                ₹{catalogList.reduce((acc, it) => acc + it.stock * it.price, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add Product Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#16a34a" /> Onboard New Grocery Product to Supermart
            </h2>

            <form onSubmit={handleAddProduct} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Barcode (EAN/UPC)</label>
                <input
                  type="text"
                  placeholder="e.g. 890103009"
                  value={newBarcode}
                  onChange={(e) => setNewBarcode(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Daawat Rozzana Super Basmati (5kg)"
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
                  {categories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Supermart Selling Price (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 380"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>MRP on Pack (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 430"
                  value={newMrp}
                  onChange={(e) => setNewMrp(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Initial Stock Units</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gridColumn: "span 3" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* PRINTABLE THERMAL RECEIPT MODAL */}
      {activeReceiptModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "440px", borderRadius: "16px", padding: "30px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto", fontFamily: "monospace" }}>
            {/* Header */}
            <div style={{ textAlign: "center", borderBottom: "1px dashed #cbd5e1", paddingBottom: "16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a" }}>{storeInfo.name}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{storeInfo.address}</div>
              <div style={{ fontSize: "0.78rem", color: "#64748b" }}>GSTIN: {storeInfo.gstin} • FSSAI: {storeInfo.fssai}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, marginTop: "6px" }}>{activeReceiptModal.billNo}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Date: {activeReceiptModal.date}</div>
            </div>

            {/* Customer */}
            <div style={{ fontSize: "0.82rem", marginBottom: "16px", borderBottom: "1px dashed #cbd5e1", paddingBottom: "10px" }}>
              <div>Customer: {activeReceiptModal.customer}</div>
              <div>Phone: {activeReceiptModal.phone}</div>
              <div>Pay Mode: {activeReceiptModal.paymentMode}</div>
            </div>

            {/* Items */}
            <div style={{ fontSize: "0.82rem", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginBottom: "6px" }}>
                <span>Item [Qty]</span>
                <span>Amount</span>
              </div>
              {activeReceiptModal.items.map((it) => (
                <div key={it.barcode} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                  <div style={{ maxWidth: "240px" }}>
                    <div>{it.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{it.qty} x ₹{it.price}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>₹{it.qty * it.price}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "12px", fontSize: "0.85rem", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                <span>Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{activeReceiptModal.subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", color: "#16a34a" }}>
                <span>Total MRP Savings:</span>
                <span style={{ fontWeight: 700 }}>₹{activeReceiptModal.savings}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}>
                <span>GST (5%):</span>
                <span>₹{activeReceiptModal.gst}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: "1px solid #0f172a", marginTop: "4px", fontSize: "1.1rem" }}>
                <span style={{ fontWeight: 900 }}>GRAND TOTAL:</span>
                <span style={{ fontWeight: 900, color: "#166534" }}>₹{activeReceiptModal.total}</span>
              </div>
            </div>

            <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b", borderTop: "1px dashed #cbd5e1", paddingTop: "12px", marginBottom: "20px" }}>
              Thank You For Shopping at Apna Kirana!<br />
              Goods once sold can be exchanged within 48 hours with receipt.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setActiveReceiptModal(null)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 600, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: "#16a34a",
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
                <Printer size={16} /> Print Thermal Bill
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
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#16a34a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Store size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{storeInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Your Trusted Neighborhood Kirana &amp; Supermart. Certified 100% pure grains, stone-pressed spices, organic dairy, and express barcode cash registers.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600 }}>
              🌾 FSSAI Lic # {storeInfo.fssai} • GSTIN: {storeInfo.gstin}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Aisles &amp; Categories</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Chakki Fresh Atta &amp; Whole Flours</li>
              <li>Royal Basmati &amp; Daily Sona Masoori</li>
              <li>Cold-Pressed Mustard Oil &amp; Cow Ghee</li>
              <li>Whole &amp; Ground Agmark Spices</li>
              <li>Organic Sugars, Tea &amp; Dry Fruits</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Store Guarantees</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>100% Adulteration-Free Purity</li>
              <li>Guaranteed Below-MRP Savings</li>
              <li>Fast Optical Barcode Billing</li>
              <li>Free 30-Min Neighborhood Delivery</li>
              <li>Thermal Printed GST Cash Memos</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Store Location</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 {storeInfo.address}</div>
              <div>📞 Order Hotline: <strong>{storeInfo.phone}</strong></div>
              <div>✉️ orders@apnakirana.in</div>
              <div>⏰ Counter Timings: 07:00 AM – 10:00 PM Daily</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {storeInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
