"use client";

import { useState, useRef } from "react";
import {
  Receipt,
  Printer,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  CreditCard,
  IndianRupee,
  Calendar,
  Clock,
  User,
  Phone,
  Utensils,
  Sparkles,
  Building,
  RotateCcw,
  Check,
  ChevronDown,
  FileText,
  DollarSign,
} from "lucide-react";
import { restaurantInfo, menuCategories } from "@/data/restaurantSeedData";

export default function BillingPOS({
  menuItems,
  tables,
  setTables,
  bills,
  setBills,
  allStaff,
}) {
  // POS Order Type & Table Selection
  const [billingType, setBillingType] = useState("Dine-In"); // "Dine-In" | "Takeaway"
  const [selectedTable, setSelectedTable] = useState(tables[0]?.id || "T-01");
  const [guestName, setGuestName] = useState("Walk-in Guest");
  const [guestPhone, setGuestPhone] = useState("9876543210");
  const [selectedCashier, setSelectedCashier] = useState("Rajesh Kashyap");

  // Current Working Ticket / Bill Items
  const [currentTicketItems, setCurrentTicketItems] = useState([
    { id: "ITEM-101", name: "Paneer Tikka Angara", qty: 2, price: 320 },
    { id: "ITEM-203", name: "Dal Makhani Bukhara", qty: 1, price: 310 },
    { id: "ITEM-402", name: "Butter Garlic Naan", qty: 3, price: 85 },
  ]);

  // Discount & Payment
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash"); // "Cash", "UPI", "Credit/Debit Card"
  const [activeMenuCategory, setActiveMenuCategory] = useState("ALL");
  const [itemSearchQuery, setItemSearchQuery] = useState("");

  // Receipt Modal State
  const [activeReceiptModal, setActiveReceiptModal] = useState(null);

  // Print Ref
  const printReceiptRef = useRef(null);

  // Filter menu items for quick POS adding
  const filteredMenuItems = menuItems.filter((item) => {
    if (activeMenuCategory !== "ALL" && item.category !== activeMenuCategory) return false;
    if (itemSearchQuery.trim() !== "") {
      const q = itemSearchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    }
    return true;
  });

  // Ticket Item Modifications
  const addItemToTicket = (dish) => {
    setCurrentTicketItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: dish.id, name: dish.name, qty: 1, price: dish.price }];
    });
  };

  const updateTicketQty = (dishId, delta) => {
    setCurrentTicketItems((prev) =>
      prev
        .map((item) => {
          if (item.id === dishId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeTicketItem = (dishId) => {
    setCurrentTicketItems((prev) => prev.filter((item) => item.id !== dishId));
  };

  const clearCurrentTicket = () => {
    setCurrentTicketItems([]);
  };

  // Calculations for current ticket
  const ticketSubtotal = currentTicketItems.reduce((acc, it) => acc + it.qty * it.price, 0);
  const discountVal = Number(((ticketSubtotal * discountPercent) / 100).toFixed(2));
  const postDiscountSubtotal = Math.max(0, ticketSubtotal - discountVal);
  const cgstAmount = Number(((postDiscountSubtotal * 2.5) / 100).toFixed(2));
  const sgstAmount = Number(((postDiscountSubtotal * 2.5) / 100).toFixed(2));
  const totalTaxAmount = Number((cgstAmount + sgstAmount).toFixed(2));
  const grandTotal = Number((postDiscountSubtotal + totalTaxAmount).toFixed(2));

  // Settle Bill & Generate Official Receipt
  const handleSettleAndGenerateBill = () => {
    if (currentTicketItems.length === 0) {
      alert("Please add at least one dish to the bill ticket.");
      return;
    }

    const billNumber = `POS-2609-${Math.floor(100 + Math.random() * 900)}`;
    const newBill = {
      id: `BILL-${Date.now()}`,
      billNumber: billNumber,
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNo: billingType === "Dine-In" ? selectedTable : "-- (Takeaway)",
      orderType: billingType,
      guestName: guestName.trim() || "Walk-in Guest",
      guestPhone: guestPhone.trim() || "9876543210",
      dateTime: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: currentTicketItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        rate: item.price,
        amount: item.qty * item.price,
      })),
      subtotal: ticketSubtotal,
      discountPercent: discountPercent,
      discountAmount: discountVal,
      cgst: cgstAmount,
      sgst: sgstAmount,
      grandTotal: grandTotal,
      paymentMode: paymentMode,
      paymentStatus: "Paid",
      cashier: selectedCashier,
    };

    // Update bills ledger
    setBills([newBill, ...bills]);

    // Show printable receipt modal
    setActiveReceiptModal(newBill);

    // If dine-in, mark table as vacant/cleaned
    if (billingType === "Dine-In") {
      setTables((prev) =>
        prev.map((t) => (t.id === selectedTable ? { ...t, status: "Vacant", currentGuest: "--" } : t))
      );
    }

    // Reset ticket
    setCurrentTicketItems([]);
    setDiscountPercent(0);
  };

  // Trigger Print Receipt
  const triggerPrintReceipt = () => {
    window.print();
  };

  // Daily POS totals
  const totalSalesToday = bills.reduce((acc, b) => acc + (b.grandTotal || 0), 0);
  const totalBillsCount = bills.length;

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "30px 20px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top Header & Metrics Bar */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#16a34a", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase" }}>
              <Receipt size={16} />
              <span>Zaika Royale Official POS Billing Software</span>
            </div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>
              Billing &amp; Cashier Desk
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
              GSTIN: {restaurantInfo.gstin} • FSSAI Lic #{restaurantInfo.fssaiLicense} • 5% Restaurant GST
            </p>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                padding: "10px 18px",
                borderRadius: "12px",
                textAlign: "right",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700 }}>
                Today's Settled Bills:
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#16a34a" }}>
                ₹{totalSalesToday.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                padding: "10px 18px",
                borderRadius: "12px",
                textAlign: "right",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#c2410c", fontWeight: 700 }}>
                Invoices Generated:
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#ea580c" }}>
                {totalBillsCount} Receipts
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column POS Layout: Left Item Selector, Right Live Ticket & Billing Desk */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Column 1: Menu Items Browser for Quick Addition */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Select Dishes for Ticket
              </h2>

              {/* Item Search Bar */}
              <div style={{ position: "relative", minWidth: "220px" }}>
                <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Quick search dish..."
                  value={itemSearchQuery}
                  onChange={(e) => setItemSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px 7px 32px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "10px",
                marginBottom: "16px",
                scrollbarWidth: "none",
              }}
            >
              {menuCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveMenuCategory(c.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: activeMenuCategory === c.id ? "1px solid #ea580c" : "1px solid #e2e8f0",
                    backgroundColor: activeMenuCategory === c.id ? "#fff7ed" : "#ffffff",
                    color: activeMenuCategory === c.id ? "#ea580c" : "#64748b",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Item Quick-Add Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "12px",
                maxHeight: "600px",
                overflowY: "auto",
                paddingRight: "4px",
              }}
            >
              {filteredMenuItems.map((dish) => {
                const inTicket = currentTicketItems.find((it) => it.id === dish.id);

                return (
                  <div
                    key={dish.id}
                    onClick={() => addItemToTicket(dish)}
                    style={{
                      border: inTicket ? "2px solid #ea580c" : "1px solid #e2e8f0",
                      backgroundColor: inTicket ? "#fff7ed" : "#f8fafc",
                      borderRadius: "12px",
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                      <img
                        src={dish.image}
                        alt={dish.name}
                        style={{ width: "46px", height: "46px", borderRadius: "8px", objectFit: "cover" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2 }}>
                          {dish.name}
                        </div>
                        <span style={{ fontSize: "0.72rem", color: dish.isVeg ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
                          {dish.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "4px", borderTop: "1px dashed #e2e8f0" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0f172a" }}>
                        ₹{dish.price}
                      </span>
                      <button
                        type="button"
                        style={{
                          backgroundColor: inTicket ? "#ea580c" : "#ffffff",
                          color: inTicket ? "#ffffff" : "#ea580c",
                          border: "1px solid #ea580c",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        {inTicket ? `In Ticket (${inTicket.qty})` : "+ Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: POS Live Bill Ticket, Table Selection & Settlement */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Ticket Header & Type Selector */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Receipt size={20} color="#ea580c" />
                <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>
                  Active Bill Ticket
                </h2>
              </div>

              {/* Dine-In vs Takeaway Toggle */}
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "8px",
                  padding: "3px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setBillingType("Dine-In")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: billingType === "Dine-In" ? "#ea580c" : "transparent",
                    color: billingType === "Dine-In" ? "#ffffff" : "#64748b",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Dine-In Table
                </button>
                <button
                  type="button"
                  onClick={() => setBillingType("Takeaway")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: billingType === "Takeaway" ? "#ea580c" : "transparent",
                    color: billingType === "Takeaway" ? "#ffffff" : "#64748b",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Takeaway / Counter
                </button>
              </div>
            </div>

            {/* Table & Guest Form */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                padding: "14px",
                border: "1px solid #e2e8f0",
                marginBottom: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {billingType === "Dine-In" ? (
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Select Table *
                  </label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "7px 10px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.82rem",
                      backgroundColor: "#ffffff",
                      fontWeight: 600,
                      outline: "none",
                    }}
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.capacity} Seats - {t.status})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                    Order Type
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Quick Counter Takeaway"
                    style={{
                      width: "100%",
                      padding: "7px 10px",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.82rem",
                      backgroundColor: "#f1f5f9",
                      fontWeight: 600,
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                  Cashier on Duty
                </label>
                <select
                  value={selectedCashier}
                  onChange={(e) => setSelectedCashier(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.82rem",
                    backgroundColor: "#ffffff",
                    fontWeight: 600,
                    outline: "none",
                  }}
                >
                  <option value="Rajesh Kashyap">Rajesh Kashyap (Cashier)</option>
                  <option value="Rohan Sharma">Rohan Sharma (Captain)</option>
                  <option value="Admin Office">Admin / Manager Desk</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                  Guest Name
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Guest Name"
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", display: "block", marginBottom: "4px" }}>
                  Guest Phone (For GST Bill SMS)
                </label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="Mobile No"
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Current Ticket Items List */}
            <div style={{ flex: 1, minHeight: "180px", maxHeight: "280px", overflowY: "auto", marginBottom: "16px" }}>
              {currentTicketItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 10px", color: "#94a3b8" }}>
                  <Utensils size={28} style={{ margin: "0 auto 8px" }} />
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>Ticket is empty. Add dishes from the left panel.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentTicketItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a" }}>
                          {item.name}
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          ₹{item.price} each
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
                          <button
                            type="button"
                            onClick={() => updateTicketQty(item.id, -1)}
                            style={{ padding: "2px 6px", border: "none", background: "none", cursor: "pointer", color: "#ea580c" }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: "0.82rem", fontWeight: 800, minWidth: "18px", textAlign: "center" }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateTicketQty(item.id, 1)}
                            style={{ padding: "2px 6px", border: "none", background: "none", cursor: "pointer", color: "#ea580c" }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f172a", minWidth: "50px", textAlign: "right" }}>
                          ₹{item.qty * item.price}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeTicketItem(item.id)}
                          style={{ border: "none", background: "none", color: "#dc2626", cursor: "pointer", padding: "4px" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div
              style={{
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#64748b" }}>
                <span>Subtotal ({currentTicketItems.reduce((a, b) => a + b.qty, 0)} Items):</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{ticketSubtotal.toFixed(2)}</span>
              </div>

              {/* Discount Selector */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                <span style={{ color: "#64748b" }}>Discount Offer:</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <select
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    style={{
                      border: "1px solid #fed7aa",
                      borderRadius: "6px",
                      padding: "2px 6px",
                      fontSize: "0.78rem",
                      backgroundColor: "#ffffff",
                      fontWeight: 700,
                      outline: "none",
                    }}
                  >
                    <option value={0}>0% Off</option>
                    <option value={5}>5% Flat Off</option>
                    <option value={10}>10% Member Off</option>
                    <option value={15}>15% VIP Offer</option>
                  </select>
                  {discountVal > 0 && <span style={{ color: "#16a34a", fontWeight: 800 }}>-₹{discountVal}</span>}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#64748b" }}>
                <span>CGST (2.5%):</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{cgstAmount.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#64748b" }}>
                <span>SGST (2.5%):</span>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{sgstAmount.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: "#ea580c",
                  borderTop: "1px dashed #fed7aa",
                  paddingTop: "8px",
                  marginTop: "4px",
                }}
              >
                <span>Grand Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Mode Selection */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a", display: "block", marginBottom: "6px" }}>
                Settlement Payment Mode:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {["Cash", "UPI", "Credit Card"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      border: paymentMode === mode ? "2px solid #16a34a" : "1px solid #cbd5e1",
                      backgroundColor: paymentMode === mode ? "#f0fdf4" : "#ffffff",
                      color: paymentMode === mode ? "#15803d" : "#475569",
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Settle Bill & Print Actions */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={clearCurrentTicket}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  padding: "12px",
                  color: "#64748b",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleSettleAndGenerateBill}
                disabled={currentTicketItems.length === 0}
                style={{
                  flex: 1,
                  backgroundColor: currentTicketItems.length === 0 ? "#cbd5e1" : "#16a34a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  cursor: currentTicketItems.length === 0 ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: currentTicketItems.length === 0 ? "none" : "0 4px 14px rgba(22, 163, 74, 0.35)",
                }}
              >
                <Printer size={18} />
                <span>SETTLE &amp; PRINT OFFICIAL GST BILL</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Settled Bills Ledger Table */}
        <div
          style={{
            marginTop: "36px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Today's Settled GST Invoices &amp; Receipts
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                Official tax invoice records stored in POS ledger for audit and reprint.
              </p>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Invoice #</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Date &amp; Time</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Guest</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Table / Order</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Items</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Payment</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Grand Total</th>
                  <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0f172a" }}>
                      {b.billNumber}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#64748b", whiteSpace: "nowrap" }}>
                      {b.dateTime}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{b.guestName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{b.guestPhone}</div>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        {b.tableNo}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: "#475569" }}>
                      {b.items?.map((it) => `${it.qty}x ${it.name}`).join(", ")}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#16a34a",
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                        }}
                      >
                        {b.paymentMode} ({b.paymentStatus})
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 900, color: "#ea580c" }}>
                      ₹{b.grandTotal}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <button
                        type="button"
                        onClick={() => setActiveReceiptModal(b)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          backgroundColor: "#fff7ed",
                          color: "#c2410c",
                          border: "1px solid #fed7aa",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <Printer size={13} />
                        <span>View / Print</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. OFFICIAL GST PRINTABLE RECEIPT MODAL */}
      {activeReceiptModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setActiveReceiptModal(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "460px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              padding: "24px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Printable Thermal Invoice Section */}
            <div ref={printReceiptRef} style={{ fontFamily: "monospace", color: "#000000" }}>
              {/* Receipt Header */}
              <div style={{ textAlign: "center", borderBottom: "1px dashed #000000", paddingBottom: "12px", marginBottom: "12px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 900, margin: "0 0 2px", textTransform: "uppercase" }}>
                  {restaurantInfo.name}
                </h2>
                <div style={{ fontSize: "0.75rem" }}>{restaurantInfo.tagline}</div>
                <div style={{ fontSize: "0.75rem" }}>{restaurantInfo.address}</div>
                <div style={{ fontSize: "0.75rem" }}>Hotline: {restaurantInfo.phone}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, marginTop: "4px" }}>
                  GSTIN: {restaurantInfo.gstin}
                </div>
                <div style={{ fontSize: "0.75rem" }}>
                  FSSAI Lic. #{restaurantInfo.fssaiLicense}
                </div>
              </div>

              {/* Bill Details */}
              <div style={{ fontSize: "0.78rem", borderBottom: "1px dashed #000000", paddingBottom: "8px", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Bill No: <strong>{activeReceiptModal.billNumber}</strong></span>
                  <span>{activeReceiptModal.dateTime}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
                  <span>Table / Order: <strong>{activeReceiptModal.tableNo}</strong></span>
                  <span>Type: {activeReceiptModal.orderType}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
                  <span>Guest: {activeReceiptModal.guestName}</span>
                  <span>Cashier: {activeReceiptModal.cashier}</span>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginBottom: "10px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px dashed #000000" }}>
                    <th style={{ textAlign: "left", padding: "4px 0" }}>ITEM</th>
                    <th style={{ textAlign: "center", padding: "4px 0" }}>QTY</th>
                    <th style={{ textAlign: "right", padding: "4px 0" }}>RATE</th>
                    <th style={{ textAlign: "right", padding: "4px 0" }}>AMT</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReceiptModal.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: "4px 0" }}>{it.name}</td>
                      <td style={{ textAlign: "center", padding: "4px 0" }}>{it.qty}</td>
                      <td style={{ textAlign: "right", padding: "4px 0" }}>₹{it.rate}</td>
                      <td style={{ textAlign: "right", padding: "4px 0" }}>₹{it.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Tax & Total Calculation */}
              <div style={{ borderTop: "1px dashed #000000", paddingTop: "8px", fontSize: "0.78rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Subtotal:</span>
                  <span>₹{activeReceiptModal.subtotal?.toFixed(2)}</span>
                </div>
                {activeReceiptModal.discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Discount:</span>
                    <span>-₹{activeReceiptModal.discountAmount?.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>CGST (2.5%):</span>
                  <span>₹{activeReceiptModal.cgst?.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>SGST (2.5%):</span>
                  <span>₹{activeReceiptModal.sgst?.toFixed(2)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 900,
                    fontSize: "1rem",
                    borderTop: "1px dashed #000000",
                    borderBottom: "1px dashed #000000",
                    padding: "6px 0",
                    margin: "6px 0",
                  }}
                >
                  <span>GRAND TOTAL:</span>
                  <span>₹{activeReceiptModal.grandTotal?.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Payment Mode:</span>
                  <span>{activeReceiptModal.paymentMode} ({activeReceiptModal.paymentStatus})</span>
                </div>
              </div>

              {/* Footer Blessing */}
              <div style={{ textAlign: "center", marginTop: "14px", fontSize: "0.75rem", borderTop: "1px dashed #000000", paddingTop: "8px" }}>
                <p style={{ margin: "0 0 2px", fontWeight: 700 }}>*** THANK YOU FOR DINING WITH US ***</p>
                <p style={{ margin: 0 }}>Please Visit Again! For Feedback: {restaurantInfo.email}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => setActiveReceiptModal(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  color: "#475569",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={triggerPrintReceipt}
                style={{
                  flex: 2,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#ea580c",
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 3px 10px rgba(234, 88, 12, 0.35)",
                }}
              >
                <Printer size={16} />
                <span>Print Thermal Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
