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
} from "lucide-react";
import { groceryData } from "@/data/businessAppsData";

export default function GroceryApp() {
  const { storeInfo, catalog } = groceryData;
  const [ticketItems, setTicketItems] = useState([
    { ...catalog[0], qty: 2 },
    { ...catalog[2], qty: 3 },
    { ...catalog[4], qty: 1 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] = useState("Counter Walk-in");
  const [customerPhone, setCustomerPhone] = useState("9876543210");
  const [paymentMode, setPaymentMode] = useState("UPI / QR Scan");
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

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

  const subtotal = ticketItems.reduce((acc, it) => acc + it.qty * it.price, 0);
  const totalMrp = ticketItems.reduce((acc, it) => acc + it.qty * it.mrp, 0);
  const totalSavings = totalMrp - subtotal;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gstAmount;

  const handleSettleBill = () => {
    if (ticketItems.length === 0) return;
    const bill = {
      billNo: `GROC-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
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

  const filteredCatalog = catalog.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.barcode.includes(q) || c.category.toLowerCase().includes(q);
  });

  return (
    <div style={{ backgroundColor: "#f9fafb", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Ticker */}
      <div style={{ backgroundColor: "#ecfdf5", borderBottom: "1px solid #a7f3d0", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#047857", fontWeight: 700 }}>
        <span>🛒 {storeInfo.name} • Barcoded POS Counter • GSTIN: {storeInfo.gstin} • FSSAI: {storeInfo.fssai}</span>
        <Link href="/business-suite" style={{ color: "#047857", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#059669", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Store size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{storeInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{storeInfo.tagline} • Govind Nagar, Kanpur</p>
            </div>
          </div>

          <div style={{ fontSize: "0.85rem", color: "#475569" }}>
            Counter Support: <strong style={{ color: "#059669" }}>{storeInfo.phone}</strong>
          </div>
        </div>
      </header>

      {/* 2-Column POS Layout */}
      <main style={{ maxWidth: "1240px", margin: "24px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "start" }}>
        {/* Left Column: Product Search & Quick Add */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Supermart Items Catalog</h2>
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Scan Barcode or Search product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
            {filteredCatalog.map((item) => {
              const inTicket = ticketItems.find((t) => t.barcode === item.barcode);

              return (
                <div key={item.barcode} onClick={() => addItemToTicket(item)} style={{ backgroundColor: inTicket ? "#ecfdf5" : "#f8fafc", border: inTicket ? "2px solid #059669" : "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Code: {item.barcode}</span>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 6px", lineHeight: 1.25 }}>{item.name}</h3>
                    <span style={{ fontSize: "0.72rem", backgroundColor: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", color: "#475569" }}>{item.category}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #cbd5e1", paddingTop: "8px", marginTop: "10px" }}>
                    <div>
                      <span style={{ fontSize: "1rem", fontWeight: 900, color: "#059669" }}>₹{item.price}</span>
                      <span style={{ fontSize: "0.72rem", color: "#94a3b8", textDecoration: "line-through", marginLeft: "4px" }}>₹{item.mrp}</span>
                    </div>
                    <button style={{ backgroundColor: inTicket ? "#059669" : "#ffffff", color: inTicket ? "#ffffff" : "#059669", border: "1px solid #059669", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                      {inTicket ? `In Cart (${inTicket.qty})` : "+ Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: POS Cashier Billing Counter */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Printer size={18} color="#059669" />
            <span>Active POS Billing Desk</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
            <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
            <input type="text" placeholder="Mobile Number (for SMS Bill)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }} />
          </div>

          {/* Ticket Items */}
          <div style={{ minHeight: "180px", maxHeight: "240px", overflowY: "auto", borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "10px 0", marginBottom: "14px" }}>
            {ticketItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 10px", color: "#94a3b8", fontSize: "0.82rem" }}>
                Bill ticket is empty.<br />Click items on left to add.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {ticketItems.map((it) => (
                  <div key={it.barcode} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, color: "#0f172a" }}>{it.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>₹{it.price} each</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button onClick={() => updateQty(it.barcode, -1)} style={{ border: "none", background: "none", color: "#059669", cursor: "pointer", fontWeight: 800 }}><Minus size={12} /></button>
                      <span style={{ fontWeight: 800 }}>{it.qty}</span>
                      <button onClick={() => updateQty(it.barcode, 1)} style={{ border: "none", background: "none", color: "#059669", cursor: "pointer", fontWeight: 800 }}><Plus size={12} /></button>
                      <span style={{ fontWeight: 800, minWidth: "48px", textAlign: "right" }}>₹{it.qty * it.price}</span>
                      <button onClick={() => removeItem(it.barcode)} style={{ border: "none", background: "none", color: "#dc2626", cursor: "pointer" }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Calculations */}
          <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "10px", marginBottom: "14px", fontSize: "0.82rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            {totalSavings > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", color: "#16a34a", fontWeight: 700 }}>
                <span>Customer Savings:</span>
                <span>-₹{totalSavings}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>GST (5% Retail):</span>
              <span>₹{gstAmount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.1rem", color: "#059669", borderTop: "1px dashed #cbd5e1", paddingTop: "6px", marginTop: "4px" }}>
              <span>To Pay:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} style={{ width: "100%", padding: "7px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.82rem" }}>
              <option>UPI / QR Scan (PhonePe / GPay)</option>
              <option>Cash at Counter</option>
              <option>Debit / Credit Card</option>
            </select>
          </div>

          <button
            onClick={handleSettleBill}
            disabled={ticketItems.length === 0}
            style={{ width: "100%", backgroundColor: ticketItems.length === 0 ? "#cbd5e1" : "#059669", color: "#ffffff", border: "none", padding: "11px", borderRadius: "8px", fontWeight: 900, fontSize: "0.9rem", cursor: ticketItems.length === 0 ? "not-allowed" : "pointer" }}
          >
            Settle &amp; Print Thermal Bill
          </button>
        </div>
      </main>

      {/* Official Thermal Bill Modal */}
      {activeReceiptModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveReceiptModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "420px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#000000" }}>
              <div style={{ textAlign: "center", borderBottom: "1px dashed #000000", paddingBottom: "8px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 900, margin: "0 0 2px" }}>{storeInfo.name}</h3>
                <div>{storeInfo.address} • Hotline: {storeInfo.phone}</div>
                <div>GSTIN: {storeInfo.gstin} • FSSAI: {storeInfo.fssai}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span>Invoice: {activeReceiptModal.billNo}</span>
                <span>{activeReceiptModal.date}</span>
              </div>
              <div style={{ marginBottom: "8px" }}>Customer: {activeReceiptModal.customer} ({activeReceiptModal.phone})</div>
              <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "1px dashed #000000", borderBottom: "1px dashed #000000", margin: "6px 0", fontSize: "0.78rem" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "4px 0" }}>ITEM</th>
                    <th style={{ textAlign: "center", padding: "4px 0" }}>QTY</th>
                    <th style={{ textAlign: "right", padding: "4px 0" }}>AMT</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReceiptModal.items.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "3px 0" }}>{it.name}</td>
                      <td style={{ textAlign: "center", padding: "3px 0" }}>{it.qty}</td>
                      <td style={{ textAlign: "right", padding: "3px 0" }}>₹{it.qty * it.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal:</span><span>₹{activeReceiptModal.subtotal}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>GST (5%):</span><span>₹{activeReceiptModal.gst}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "0.95rem", borderTop: "1px dashed #000000", paddingTop: "4px", marginTop: "4px" }}>
                <span>TOTAL PAID:</span><span>₹{activeReceiptModal.total}</span>
              </div>
              <div style={{ marginTop: "4px" }}>Payment: {activeReceiptModal.paymentMode} (Paid)</div>
              <div style={{ textAlign: "center", marginTop: "12px", borderTop: "1px dashed #000000", paddingTop: "6px" }}>*** THANK YOU! VISIT AGAIN ***</div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <button onClick={() => setActiveReceiptModal(null)} style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Close</button>
              <button onClick={() => window.print()} style={{ flex: 2, padding: "8px", borderRadius: "6px", border: "none", backgroundColor: "#059669", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Print Bill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
