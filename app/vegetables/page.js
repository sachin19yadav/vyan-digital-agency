"use client";

import { useState } from "react";
import Link from "next/link";
import {
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
  Leaf,
} from "lucide-react";
import { vegetablesData } from "@/data/businessAppsData";

export default function VegetablesApp() {
  const { mandiInfo, categories, items } = vegetablesData;
  const [selectedCat, setSelectedCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Morning Express (07:00 AM – 09:30 AM)");

  const filteredItems = selectedCat === "All"
    ? items
    : items.filter((it) => it.category === selectedCat);

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
      alert("Please enter customer name, phone number, and delivery address.");
      return;
    }
    const order = {
      orderId: `SABZI-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      deliveryAddress,
      deliverySlot,
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee,
      total: grandTotal,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setOrderPlaced(order);
    setCart([]);
  };

  return (
    <div style={{ backgroundColor: "#f9fcf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Ticker */}
      <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#166534", fontWeight: 700 }}>
        <span>🌿 Daily Mandi Update: Tomatoes @ ₹35/kg • Potatoes @ ₹28/kg • FREE Delivery on ₹299+</span>
        <Link href="/business-suite" style={{ color: "#166534", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(22,163,74,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#16a34a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                {mandiInfo.name}
              </h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{mandiInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ fontSize: "0.85rem", color: "#475569" }}>
              Hotline: <strong style={{ color: "#16a34a" }}>{mandiInfo.phone}</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f0fdf4", padding: "8px 14px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
              <ShoppingBag size={18} color="#16a34a" />
              <span style={{ fontWeight: 800, color: "#15803d", fontSize: "0.9rem" }}>
                {cart.reduce((a, b) => a + b.qty, 0)} kg in Cart (₹{cartSubtotal})
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Order Placed Success Banner */}
      {orderPlaced && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "16px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={24} />
              <div>
                <div style={{ fontSize: "1rem" }}>Order #{orderPlaced.orderId} Placed Successfully! (₹{orderPlaced.total})</div>
                <div style={{ fontSize: "0.8rem", color: "#166534" }}>Will be delivered to {orderPlaced.customerName} during {orderPlaced.deliverySlot}.</div>
              </div>
            </div>
            <button onClick={() => setOrderPlaced(null)} style={{ background: "none", border: "none", color: "#15803d", fontWeight: 800, cursor: "pointer" }}>✕</button>
          </div>
        </div>
      )}

      {/* Layout Grid: Catalog & Live Cart */}
      <main style={{ maxWidth: "1240px", margin: "24px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
        {/* Left Column: Category Pills & Vegetables Grid */}
        <div>
          {/* Category Filter */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "16px" }}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                style={{
                  padding: "7px 16px",
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

          {/* Items Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
            {filteredItems.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);

              return (
                <div key={item.id} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700 }}>{item.freshness}</span>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 6px" }}>{item.name}</h3>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a" }}>₹{item.pricePerKg}</span>
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
                          <Plus size={14} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Checkout & Cart Desk */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <ShoppingBag size={18} color="#16a34a" />
            <span>Basket Checkout</span>
          </h2>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px 10px", color: "#94a3b8" }}>
              <p style={{ margin: 0, fontSize: "0.85rem" }}>Your mandi basket is empty.<br />Add fresh veggies from the left.</p>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px", maxHeight: "200px", overflowY: "auto" }}>
                {cart.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <span>{c.name} ({c.qty} kg)</span>
                    <span style={{ fontWeight: 800 }}>₹{c.qty * c.pricePerKg}</span>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "10px", marginBottom: "16px", fontSize: "0.82rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>Delivery:</span>
                  <span style={{ color: deliveryFee === 0 ? "#16a34a" : "#0f172a" }}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem", color: "#16a34a", borderTop: "1px dashed #cbd5e1", paddingTop: "6px", marginTop: "4px" }}>
                  <span>Grand Total:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <input type="text" placeholder="Name *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
                <input type="tel" placeholder="Mobile Number *" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
                <textarea rows={2} placeholder="Delivery Address *" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
                <select value={deliverySlot} onChange={(e) => setDeliverySlot(e.target.value)} style={{ padding: "8px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }}>
                  <option>Morning Express (07:00 AM – 09:30 AM)</option>
                  <option>Evening Harvest (05:00 PM – 07:30 PM)</option>
                </select>
                <button type="submit" style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 900, fontSize: "0.9rem", cursor: "pointer", marginTop: "6px" }}>
                  Place Mandi Order (COD)
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
