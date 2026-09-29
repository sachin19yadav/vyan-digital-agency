"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingDown,
  Sparkles,
  Phone,
  ShieldCheck,
  Truck,
  Search,
  Printer,
  ChevronRight,
  ArrowRight,
  Award,
} from "lucide-react";
import { vegetablesData } from "@/data/businessAppsData";

export default function VegetablesApp() {
  const { mandiInfo, categories, items: initialItems } = vegetablesData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "catalog", "cart", "billing", "delivery", "admin"
  const [currentRole, setCurrentRole] = useState("Customer"); // "Customer", "Billing", "Staff", "Admin"
  const [itemsList, setItemsList] = useState(initialItems);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Checkout State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Morning Express (07:00 AM – 09:30 AM)");
  const [orderPlacedAlert, setOrderPlacedAlert] = useState(null);

  // Delivery Staff Desk State
  const [orders, setOrders] = useState([
    {
      id: "MANDI-101",
      customerName: "Sanjay Singhania",
      customerPhone: "9818445566",
      items: [
        { name: "Desi Lal Tamatar", qty: 2, price: 35 },
        { name: "Pahadi Aloo", qty: 3, price: 28 },
      ],
      total: 154,
      slot: "Morning Express (07:00 AM – 09:30 AM)",
      status: "Packing in Progress",
      rider: "Ramesh Rider (+91 97920 11001)",
    },
    {
      id: "MANDI-102",
      customerName: "Meera Gupta",
      customerPhone: "9876543210",
      items: [
        { name: "Desi Palak", qty: 2, price: 25 },
        { name: "Shimla Apple", qty: 1, price: 140 },
      ],
      total: 190,
      slot: "Evening Harvest (05:00 PM – 07:30 PM)",
      status: "Dispatched",
      rider: "Mohit Kumar (+91 97920 11002)",
    },
  ]);

  // POS Billing Desk State
  const [posTicket, setPosTicket] = useState([
    { ...initialItems[0], qty: 2 },
    { ...initialItems[1], qty: 3 },
  ]);
  const [posCustomer, setPosCustomer] = useState("Counter Walk-in");
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  // Admin New Item State
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Daily Veggies");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemMandi, setNewItemMandi] = useState("");

  // Cart Operations
  const addToCart = (item, qtyKg = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + qtyKg } : c));
      }
      return [...prev, { ...item, qty: qtyKg }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.qty <= 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
    });
  };

  const cartSubtotal = cart.reduce((acc, c) => acc + c.qty * c.pricePerKg, 0);
  const deliveryFee = cartSubtotal >= mandiInfo.freeDeliveryAbove || cartSubtotal === 0 ? 0 : 25;
  const grandTotal = cartSubtotal + deliveryFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert("Please fill name, phone, and delivery address.");
      return;
    }

    const newOrder = {
      id: `MANDI-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      customerPhone,
      deliveryAddress,
      items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.pricePerKg })),
      total: grandTotal,
      slot: deliverySlot,
      status: "Packing in Progress",
      rider: "Suraj Express Partner (+91 97920 11003)",
    };

    setOrders([newOrder, ...orders]);
    setOrderPlacedAlert(newOrder);
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setDeliveryAddress("");
  };

  // POS Billing
  const posSubtotal = posTicket.reduce((acc, it) => acc + it.qty * it.pricePerKg, 0);

  const handleSettleMandiBill = () => {
    const inv = {
      billNo: `K-MANDI-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: posCustomer,
      items: posTicket,
      subtotal: posSubtotal,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setActiveReceiptModal(inv);
    setPosTicket([]);
  };

  // Admin New Item
  const handleAdminAddItem = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice) return;
    const item = {
      id: `VEG-${Math.floor(10 + Math.random() * 90)}`,
      name: newItemName,
      category: newItemCategory,
      pricePerKg: Number(newItemPrice),
      mandiRate: Number(newItemMandi) || Number(newItemPrice) - 5,
      unit: "kg",
      freshness: "Farm Fresh Direct",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    };
    setItemsList([item, ...itemsList]);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemMandi("");
    alert("New mandi item added!");
  };

  const filteredItems = itemsList.filter((it) => {
    if (selectedCat !== "All" && it.category !== selectedCat) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: "#f9fcf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* 1. TOP TICKER */}
      <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#166534", fontWeight: 700, flexWrap: "wrap", gap: "8px" }}>
        <span>🌿 Kisan Fresh Mandi: Today's Tomatoes @ ₹35/kg • Potatoes @ ₹28/kg • FREE Delivery on Orders Above ₹299!</span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Morning Harvest Hotline: <strong>{mandiInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#166534", textDecoration: "underline", fontWeight: 800 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* 2. DEDICATED MANDI HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(22,163,74,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#16a34a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(22,163,74,0.3)" }}>
              <Leaf size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{mandiInfo.name}</h1>
                <span style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>100% ORGANIC</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{mandiInfo.tagline} • Kalyanpur Mandi, Kanpur</p>
            </div>
          </div>

          {/* Role Switcher & Basket Count */}
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
                  else if (r === "Staff") setActiveTab("delivery");
                  else if (r === "Admin") setActiveTab("admin");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#166534",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Customer">🛒 Shopper View</option>
                <option value="Billing">💳 Mandi Cashier POS</option>
                <option value="Staff">🛵 Packing &amp; Rider Desk</option>
                <option value="Admin">👑 Mandi Supervisor Admin</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("cart")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(22,163,74,0.3)",
              }}
            >
              <ShoppingBag size={16} />
              <span>Basket ({cart.reduce((a, b) => a + b.qty, 0)} kg • ₹{cartSubtotal})</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ backgroundColor: "#f9fcf9", borderTop: "1px solid #e2e8f0", padding: "6px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {[
              { id: "landing", label: "Mandi Home" },
              { id: "catalog", label: "Sabzi & Fruits Catalog" },
              { id: "cart", label: "Basket Checkout" },
              { id: "billing", label: "Cashier POS Counter" },
              { id: "delivery", label: "Delivery Tracking Desk" },
              { id: "admin", label: "Mandi Rates Admin" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: activeTab === tab.id ? "1px solid #16a34a" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#16a34a" : "#64748b",
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

      {/* Success Alert */}
      {orderPlacedAlert && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Order #{orderPlacedAlert.id} Placed! Fresh harvest will be delivered to {orderPlacedAlert.customerName} during {orderPlacedAlert.slot}! (Total: ₹{orderPlacedAlert.total})</span>
            </div>
            <button onClick={() => setOrderPlacedAlert(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT */}
      <main>
        {/* A. LANDING PAGE TAB */}
        {activeTab === "landing" && (
          <div>
            {/* Hero */}
            <section style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #f9fcf9 100%)", padding: "50px 20px 60px", borderBottom: "1px solid #bbf7d0" }}>
              <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#dcfce7", color: "#15803d", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "16px" }}>
                    <Leaf size={14} />
                    <span>PLUCKED FRESH FROM FARM EVERY MORNING AT 05:00 AM</span>
                  </div>
                  <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-1px" }}>
                    Crisp, Organic &amp; Farm-Fresh Vegetables at Mandi Wholesale Rates
                  </h1>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                    Say goodbye to stale refrigerator vegetables. Kisan Fresh delivers pesticide-free desi tamatar, pahadi aloo, hydroponic palak, and crisp Shimla apples directly from local UP farmers to your kitchen doorstep in 30 minutes.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveTab("catalog")}
                      style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(22,163,74,0.35)" }}
                    >
                      <span>Explore Daily Mandi Catalog</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => setActiveTab("cart")}
                      style={{ backgroundColor: "#ffffff", color: "#16a34a", border: "2px solid #16a34a", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                    >
                      View Shopping Basket
                    </button>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh Tomatoes and Vegetables"
                    style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 30px rgba(22,163,74,0.15)" }}
                  />
                  <div style={{ position: "absolute", bottom: "-14px", left: "20px", backgroundColor: "#ffffff", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #bbf7d0" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Truck size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: "0.95rem", color: "#0f172a" }}>30-Minute Express Delivery</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Kalyanpur, Civil Lines, Swaroop Nagar</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quality Pillars */}
            <section style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {[
                  { title: "Direct Farm Procurement", desc: "No middleman markups. Farmers get fair rates and you get wholesale mandi prices.", icon: ShieldCheck },
                  { title: "05:00 AM Morning Harvest", desc: "Vegetables plucked at sunrise and sorted with zero cold storage delays.", icon: Clock },
                  { title: "Chemical-Free Washing", desc: "Cleaned using ozonated water rinse to remove surface dust and farm soil.", icon: CheckCircle2 },
                  { title: "Weight Accuracy Guarantee", desc: "Digital electronic scale weighed. If weight is even 10g less, get instant refund.", icon: Award },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Bestseller Items Showcase */}
            <section style={{ maxWidth: "1240px", margin: "50px auto", padding: "0 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 800, textTransform: "uppercase" }}>Today's Best Picks</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>Daily Kitchen Essentials</h2>
                </div>
                <button onClick={() => setActiveTab("catalog")} style={{ backgroundColor: "transparent", border: "none", color: "#16a34a", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>View Full Catalog</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                {itemsList.slice(0, 4).map((item) => (
                  <div key={item.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700 }}>{item.freshness}</span>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 8px" }}>{item.name}</h3>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "14px" }}>
                        <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a" }}>₹{item.pricePerKg}</span>
                        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>/ {item.unit}</span>
                      </div>
                      <button
                        onClick={() => addToCart(item, 1)}
                        style={{ marginTop: "auto", width: "100%", backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "8px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <Plus size={15} />
                        <span>Add 1 {item.unit}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* B. SABZI & FRUITS CATALOG TAB */}
        {activeTab === "catalog" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Kisan Fresh Morning Catalog</h2>
                <p style={{ color: "#64748b", margin: 0, fontSize: "0.88rem" }}>Daily mandi wholesale rates updated at 6:00 AM.</p>
              </div>

              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search tamatar, aloo, apple..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "20px",
                    border: selectedCat === c ? "1px solid #16a34a" : "1px solid #cbd5e1",
                    backgroundColor: selectedCat === c ? "#16a34a" : "#ffffff",
                    color: selectedCat === c ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "20px" }}>
              {filteredItems.map((item) => {
                const inCart = cart.find((c) => c.id === item.id);

                return (
                  <div key={item.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700 }}>{item.freshness}</span>
                      <h3 style={{ fontSize: "0.98rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 6px" }}>{item.name}</h3>

                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a" }}>₹{item.pricePerKg}</span>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>/ {item.unit}</span>
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8", textDecoration: "line-through" }}>Mandi: ₹{item.mandiRate}</span>
                      </div>

                      <div style={{ marginTop: "auto" }}>
                        {inCart ? (
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f0fdf4", border: "1px solid #16a34a", borderRadius: "8px", padding: "4px 8px" }}>
                            <button onClick={() => removeFromCart(item.id)} style={{ border: "none", background: "none", color: "#16a34a", cursor: "pointer", fontWeight: 800 }}><Minus size={14} /></button>
                            <span style={{ fontWeight: 800, color: "#16a34a" }}>{inCart.qty} kg</span>
                            <button onClick={() => addToCart(item, 1)} style={{ border: "none", background: "none", color: "#16a34a", cursor: "pointer", fontWeight: 800 }}><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item, 1)}
                            style={{ width: "100%", backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "8px", borderRadius: "8px", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}
                          >
                            <Plus size={14} /> Add to Basket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* C. BASKET CHECKOUT TAB */}
        {activeTab === "cart" && (
          <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #bbf7d0", padding: "28px", boxShadow: "0 4px 16px rgba(22,163,74,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Your Fresh Mandi Basket ({cart.length} Items)</h2>

              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 10px", color: "#94a3b8" }}>
                  <ShoppingBag size={36} color="#16a34a" style={{ margin: "0 auto 8px" }} />
                  <p>Basket is empty. Add farm fresh vegetables from the catalog!</p>
                  <button onClick={() => setActiveTab("catalog")} style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "8px 20px", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>Explore Catalog</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    {cart.map((c) => (
                      <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#f9fcf9", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: "0.95rem" }}>{c.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>₹{c.pricePerKg} per {c.unit}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 800 }}>{c.qty} kg</span>
                          <span style={{ fontWeight: 900, minWidth: "60px", textAlign: "right" }}>₹{c.qty * c.pricePerKg}</span>
                          <button onClick={() => removeFromCart(c.id)} style={{ border: "none", background: "none", color: "#dc2626", cursor: "pointer" }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: "#f0fdf4", padding: "16px", borderRadius: "12px", marginBottom: "20px", fontSize: "0.88rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span>Vegetables Subtotal:</span>
                      <span>₹{cartSubtotal}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span>Delivery Fee:</span>
                      <span style={{ color: deliveryFee === 0 ? "#16a34a" : "#0f172a" }}>{deliveryFee === 0 ? "FREE (Above ₹299)" : `₹${deliveryFee}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.2rem", color: "#16a34a", borderTop: "1px dashed #bbf7d0", paddingTop: "8px", marginTop: "6px" }}>
                      <span>Grand Total:</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <input type="text" placeholder="Customer Name *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                      <input type="tel" placeholder="Mobile Number *" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                    </div>
                    <textarea rows={2} placeholder="Complete Delivery Address in Kanpur *" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                    <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}>
                      <option>Morning Express (07:00 AM – 09:30 AM)</option>
                      <option>Evening Harvest (05:00 PM – 07:30 PM)</option>
                    </select>
                    <button type="submit" style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.95rem", cursor: "pointer", marginTop: "10px" }}>
                      Place Mandi Order (Cash on Delivery / UPI)
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* D. CASHIER POS DESK */}
        {activeTab === "billing" && (
          <div style={{ maxWidth: "1140px", margin: "30px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 400px", gap: "24px", alignItems: "start" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Mandi Physical Counter POS Weighing Desk</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
                {itemsList.map((item) => (
                  <div key={item.id} onClick={() => setPosTicket([...posTicket, { ...item, qty: 1 }])} style={{ padding: "10px", backgroundColor: "#f0fdf4", borderRadius: "10px", border: "1px solid #bbf7d0", cursor: "pointer" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f172a" }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 800, marginTop: "4px" }}>₹{item.pricePerKg} / {item.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Printer size={18} color="#16a34a" />
                <span>Counter Cash Slip</span>
              </h2>

              <input type="text" placeholder="Walk-in Customer Name" value={posCustomer} onChange={(e) => setPosCustomer(e.target.value)} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem", marginBottom: "12px" }} />

              <div style={{ minHeight: "160px", maxHeight: "220px", overflowY: "auto", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "10px 0", marginBottom: "12px" }}>
                {posTicket.map((it, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", marginBottom: "6px" }}>
                    <span>{it.name} ({it.qty} kg)</span>
                    <span style={{ fontWeight: 800 }}>₹{it.qty * it.pricePerKg}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.1rem", color: "#16a34a", marginBottom: "14px" }}>
                <span>Subtotal:</span>
                <span>₹{posSubtotal}</span>
              </div>

              <button
                onClick={handleSettleMandiBill}
                disabled={posTicket.length === 0}
                style={{ width: "100%", backgroundColor: posTicket.length === 0 ? "#cbd5e1" : "#16a34a", color: "#ffffff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 900, cursor: posTicket.length === 0 ? "not-allowed" : "pointer" }}
              >
                Print Mandi Receipt
              </button>
            </div>
          </div>
        )}

        {/* E. DELIVERY STAFF DESK */}
        {activeTab === "delivery" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Mandi Packing &amp; Express Rider Desk</h2>
            <div style={{ overflowX: "auto", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f0fdf4", borderBottom: "2px solid #bbf7d0", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Order #</th>
                    <th style={{ padding: "10px 14px" }}>Customer Details</th>
                    <th style={{ padding: "10px 14px" }}>Items Basket</th>
                    <th style={{ padding: "10px 14px" }}>Total</th>
                    <th style={{ padding: "10px 14px" }}>Assigned Rider</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                    <th style={{ padding: "10px 14px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{o.id}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 800 }}>{o.customerName}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{o.customerPhone}</div>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>
                        {o.items?.map((it) => `${it.qty}kg ${it.name}`).join(", ")}
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 900, color: "#16a34a" }}>₹{o.total}</td>
                      <td style={{ padding: "12px 14px", fontSize: "0.8rem", color: "#475569" }}>{o.rider}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: o.status === "Dispatched" ? "#dcfce7" : "#fef3c7", color: o.status === "Dispatched" ? "#15803d" : "#b45309", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {o.status !== "Delivered" && (
                          <button
                            onClick={() => {
                              setOrders(orders.map((x) => (x.id === o.id ? { ...x, status: "Delivered" } : x)));
                            }}
                            style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
                          >
                            Mark Delivered
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

        {/* F. MANDI RATES ADMIN */}
        {activeTab === "admin" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Daily Mandi Wholesale Rates &amp; Catalog Management</h2>

            <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "600px", marginBottom: "30px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Add New Harvest Vegetable / Fruit</h3>
              <form onSubmit={handleAdminAddItem} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="text" placeholder="Item Name (e.g. Desi Gajar / Carrot)" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <select value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                    {categories.filter((c) => c !== "All").map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                  <input type="number" placeholder="Retail Price / kg (₹)" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
                <input type="number" placeholder="Mandi Wholesale Benchmark Rate (₹)" value={newItemMandi} onChange={(e) => setNewItemMandi(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <button type="submit" style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}>Save to Mandi Catalog</button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* POS Receipt Modal */}
      {activeReceiptModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveReceiptModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "400px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#000000" }}>
              <div style={{ textAlign: "center", borderBottom: "1px dashed #000000", paddingBottom: "8px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 900, margin: "0 0 2px" }}>{mandiInfo.name}</h3>
                <div>Kalyanpur Mandi • Call: {mandiInfo.phone}</div>
                <div>Receipt #: {activeReceiptModal.billNo} • Date: {activeReceiptModal.date}</div>
              </div>
              <div>Customer: {activeReceiptModal.customer}</div>
              <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px dashed #000000", borderBottom: "1px dashed #000000", margin: "6px 0" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "3px 0" }}>ITEM</th>
                    <th style={{ textAlign: "right", padding: "3px 0" }}>AMT</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReceiptModal.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>{it.name} ({it.qty} kg)</td>
                      <td style={{ textAlign: "right" }}>₹{it.qty * it.pricePerKg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem" }}>
                <span>TOTAL PAID:</span>
                <span>₹{activeReceiptModal.subtotal}</span>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>*** FARM FRESH GUARANTEED ***</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
              <button onClick={() => setActiveReceiptModal(null)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Close</button>
              <button onClick={() => window.print()} style={{ flex: 2, padding: "8px", borderRadius: "6px", border: "none", backgroundColor: "#16a34a", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Print Receipt</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DEDICATED MANDI FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "2px solid #16a34a", marginTop: "60px", padding: "40px 20px 20px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{mandiInfo.name}</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
              Daily organic vegetables, farm harvest green leaves, and sweet fruits delivered directly to homes across Kanpur.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 700 }}>Order Helpline: {mandiInfo.phone}</div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Delivery Timings</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>
              <div>Morning Slot: 07:00 AM – 09:30 AM</div>
              <div>Evening Slot: 05:00 PM – 07:30 PM</div>
              <div>Express 30-Min: Available across 5 km radius</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Farmer Mandi Hub</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
              <div>Main Mandi Yard, Kalyanpur Bypass Road, Kanpur, UP 208017</div>
              <div style={{ marginTop: "6px", color: "#16a34a", fontWeight: 700 }}>✓ Direct UP Agriculture Farmer Network</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "center", fontSize: "0.78rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} {mandiInfo.name}. All Rights Reserved. • Designed in Pure Light Mode.
        </div>
      </footer>
    </div>
  );
}
