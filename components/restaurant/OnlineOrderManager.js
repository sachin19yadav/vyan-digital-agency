"use client";

import { useState } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  User,
  CreditCard,
  Bike,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Receipt,
  FileText,
  AlertCircle,
} from "lucide-react";
import { restaurantInfo } from "@/data/restaurantSeedData";

export default function OnlineOrderManager({
  cart,
  addToCart,
  removeFromCart,
  updateCartQty,
  clearCart,
  isCartOpen,
  setIsCartOpen,
  orders,
  setOrders,
  activeTab,
  setActiveTab,
}) {
  // Checkout Form State
  const [orderType, setOrderType] = useState("Delivery"); // "Delivery" | "Takeaway"
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [cookingNotes, setCookingNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(null);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  const isFreeDelivery = subtotal >= restaurantInfo.freeDeliveryThreshold || orderType === "Takeaway";
  const deliveryFee = orderType === "Takeaway" ? 0 : (isFreeDelivery ? 0 : restaurantInfo.deliveryFee);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon === "ZAIKA50") {
    discountAmount = 50;
  } else if (appliedCoupon === "ROYALE100") {
    discountAmount = 100;
  }
  if (discountAmount > subtotal) discountAmount = subtotal;

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Number(((taxableAmount * restaurantInfo.taxRatePercent) / 100).toFixed(2));
  const grandTotal = Number((taxableAmount + tax + deliveryFee).toFixed(2));

  // Handle Coupon Apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const cleaned = couponCode.trim().toUpperCase();
    if (cleaned === "ZAIKA50") {
      if (subtotal < 350) {
        setCouponError("Minimum order of ₹350 required for ZAIKA50");
        return;
      }
      setAppliedCoupon("ZAIKA50");
    } else if (cleaned === "ROYALE100") {
      if (subtotal < 700) {
        setCouponError("Minimum order of ₹700 required for ROYALE100");
        return;
      }
      setAppliedCoupon("ROYALE100");
    } else {
      setCouponError("Invalid promo code. Try ZAIKA50 or ROYALE100");
    }
  };

  // Handle Checkout Submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Please enter customer name and 10-digit mobile number");
      return;
    }

    if (orderType === "Delivery" && !deliveryAddress.trim()) {
      alert("Please provide complete delivery street address");
      return;
    }

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      orderType: orderType,
      address: orderType === "Delivery" ? deliveryAddress.trim() : "Self-Pickup at Zaika Royale Desk",
      landmark: landmark.trim() || "--",
      cookingNotes: cookingNotes.trim() || "Normal spice",
      items: cart.map((c) => ({
        id: c.id,
        name: c.name,
        qty: c.qty,
        price: c.price,
      })),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      tax: tax,
      discount: discountAmount,
      grandTotal: grandTotal,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending (Pay on Delivery)" : "Paid via Digital UPI",
      orderStatus: "Preparing",
      placedAt: new Date().toISOString(),
      deliveryBoy: "Mohit Yadav",
      deliveryBoyPhone: "+91 97920 01122",
      estimatedDeliveryTime: "30-35 mins",
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setIsCartOpen(false);
    setActiveTrackingOrderId(newOrderId);
    setActiveTab("orders");
    setOrderPlacedSuccess(true);
  };

  // Currently selected order for tracking
  const currentTrackingOrder =
    orders.find((o) => o.id === activeTrackingOrderId) || orders[0];

  return (
    <>
      {/* 1. SLIDING CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            zIndex: 100,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "520px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 30px rgba(0, 0, 0, 0.15)",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #fed7aa",
                backgroundColor: "#fff7ed",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
                    Your Dining Cart
                  </h2>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    {cart.reduce((a, b) => a + b.qty, 0)} Items Selected
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #fed7aa",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Body */}
            {cart.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#fff7ed",
                    color: "#ea580c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <ShoppingBag size={34} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Your cart is hungry!
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.88rem", maxWidth: "300px", margin: "0 0 24px" }}>
                  Explore Zaika Royale's sizzling tandoori starters, aromatic dum biryanis, and royal desserts.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveTab("menu");
                  }}
                  style={{
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
                  }}
                >
                  Explore Food Menu
                </button>
              </div>
            ) : (
              <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>
                {/* Free Delivery Banner */}
                {orderType === "Delivery" && (
                  <div
                    style={{
                      backgroundColor: isFreeDelivery ? "#f0fdf4" : "#fff7ed",
                      border: `1px solid ${isFreeDelivery ? "#bbf7d0" : "#ffedd5"}`,
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Sparkles size={16} color={isFreeDelivery ? "#16a34a" : "#ea580c"} />
                    <span style={{ fontSize: "0.82rem", color: isFreeDelivery ? "#15803d" : "#c2410c", fontWeight: 600 }}>
                      {isFreeDelivery
                        ? "🎉 Yay! You have unlocked FREE Express Delivery!"
                        : `Add ₹${(restaurantInfo.freeDeliveryThreshold - subtotal).toFixed(0)} more to get FREE Delivery!`}
                    </span>
                  </div>
                )}

                {/* Items List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.3 }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            ₹{item.price} each
                          </div>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            borderRadius: "8px",
                            padding: "2px 4px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "#ea580c",
                              padding: "2px 6px",
                              cursor: "pointer",
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontWeight: 800, fontSize: "0.85rem", minWidth: "20px", textAlign: "center", color: "#0f172a" }}>
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "#ea580c",
                              padding: "2px 6px",
                              cursor: "pointer",
                            }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a", minWidth: "55px", textAlign: "right" }}>
                          ₹{item.qty * item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Coupon Form */}
                <form
                  onSubmit={handleApplyCoupon}
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "14px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <Tag size={16} color="#ea580c" />
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a" }}>
                      Have a Promo Coupon?
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="e.g. ZAIKA50 or ROYALE100"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        textTransform: "uppercase",
                        backgroundColor: "#ffffff",
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div style={{ marginTop: "6px", fontSize: "0.78rem", color: "#16a34a", fontWeight: 700 }}>
                      ✓ Coupon {appliedCoupon} applied! Saved ₹{discountAmount}
                    </div>
                  )}
                  {couponError && (
                    <div style={{ marginTop: "6px", fontSize: "0.78rem", color: "#dc2626", fontWeight: 600 }}>
                      {couponError}
                    </div>
                  )}
                </form>

                {/* Order Type Toggle: Delivery vs Takeaway */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", display: "block", marginBottom: "8px" }}>
                    Fulfillment Method:
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setOrderType("Delivery")}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: orderType === "Delivery" ? "2px solid #ea580c" : "1px solid #e2e8f0",
                        backgroundColor: orderType === "Delivery" ? "#fff7ed" : "#ffffff",
                        color: orderType === "Delivery" ? "#ea580c" : "#475569",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Bike size={16} />
                      <span>Home Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType("Takeaway")}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        border: orderType === "Takeaway" ? "2px solid #ea580c" : "1px solid #e2e8f0",
                        backgroundColor: orderType === "Takeaway" ? "#fff7ed" : "#ffffff",
                        color: orderType === "Takeaway" ? "#ea580c" : "#475569",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <ShoppingBag size={16} />
                      <span>Takeaway / Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Customer Full Name *
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="text"
                        placeholder="e.g. Vikram Malhotra"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 12px 9px 36px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.85rem",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Phone / Mobile Number *
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="tel"
                        placeholder="e.g. 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "9px 12px 9px 36px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          fontSize: "0.85rem",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                  </div>

                  {orderType === "Delivery" && (
                    <>
                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                          Complete Delivery Address *
                        </label>
                        <div style={{ position: "relative" }}>
                          <MapPin size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
                          <textarea
                            rows={2}
                            placeholder="House / Flat No., Apartment Name, Street, Area, Kanpur"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "9px 12px 9px 36px",
                              borderRadius: "8px",
                              border: "1px solid #cbd5e1",
                              fontSize: "0.85rem",
                              outline: "none",
                              fontFamily: "inherit",
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Z Square Mall, Opposite State Bank"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            fontSize: "0.85rem",
                            outline: "none",
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                      Special Cooking Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Less spicy, extra green chutney, no onions"
                      value={cookingNotes}
                      onChange={(e) => setCookingNotes(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                      Payment Method *
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {["Cash on Delivery", "UPI (Google Pay / PhonePe / Paytm)", "Credit / Debit Card"].map((mode) => (
                        <label
                          key={mode}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: paymentMethod === mode ? "1px solid #ea580c" : "1px solid #e2e8f0",
                            backgroundColor: paymentMethod === mode ? "#fff7ed" : "#ffffff",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#0f172a",
                          }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === mode}
                            onChange={() => setPaymentMethod(mode)}
                            style={{ accentColor: "#ea580c" }}
                          />
                          <span>{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Final Bill Computation */}
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                    <span>Food Subtotal:</span>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>₹{subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#16a34a", fontWeight: 700 }}>
                      <span>Discount ({appliedCoupon}):</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                    <span>GST (5% Restaurant Tax):</span>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>₹{tax.toFixed(2)}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#64748b" }}>
                    <span>Delivery Charges:</span>
                    <span style={{ fontWeight: 600, color: deliveryFee === 0 ? "#16a34a" : "#0f172a" }}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.1rem",
                      fontWeight: 900,
                      color: "#0f172a",
                      borderTop: "1px dashed #cbd5e1",
                      paddingTop: "10px",
                      marginTop: "4px",
                    }}
                  >
                    <span>To Pay:</span>
                    <span style={{ color: "#ea580c" }}>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  style={{
                    width: "100%",
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: 900,
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(234, 88, 12, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <ShieldCheck size={20} />
                  <span>CONFIRM &amp; PLACE ORDER (₹{grandTotal.toFixed(2)})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ORDER TRACKING & LIVE STATUS PAGE (Rendered when activeTab === "orders") */}
      {activeTab === "orders" && (
        <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "40px 20px 80px" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            {/* Page Header */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#c2410c", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                <Clock size={16} />
                <span>Live Kitchen &amp; Delivery Tracking</span>
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#0f172a", margin: "6px 0" }}>
                Track Your Zaika Royale Order
              </h1>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.92rem" }}>
                Real-time updates straight from our executive kitchen tandoor to your dining table or doorstep.
              </p>
            </div>

            {/* Success Alert if just placed */}
            {orderPlacedSuccess && (
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
                  <CheckCircle2 size={20} />
                  <span>Your order has been received by our kitchen! Cooking has started.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderPlacedSuccess(false)}
                  style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Grid Layout: Left Live Tracker, Right Orders History */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
                alignItems: "start",
              }}
            >
              {/* Left: Active Order Live Stepper Card */}
              {currentTrackingOrder ? (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #fed7aa",
                    boxShadow: "0 4px 20px rgba(234, 88, 12, 0.08)",
                    padding: "24px",
                  }}
                >
                  {/* Order ID & Status Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      paddingBottom: "16px",
                      borderBottom: "1px solid #f1f5f9",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Order:</span>
                      <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#0f172a" }}>
                        {currentTrackingOrder.id}
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                        {new Date(currentTrackingOrder.placedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {currentTrackingOrder.orderType}
                      </span>
                    </div>

                    <span
                      style={{
                        backgroundColor: currentTrackingOrder.orderStatus === "Delivered" ? "#dcfce7" : "#ffedd5",
                        color: currentTrackingOrder.orderStatus === "Delivered" ? "#15803d" : "#c2410c",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: 800,
                        fontSize: "0.82rem",
                        border: `1px solid ${currentTrackingOrder.orderStatus === "Delivered" ? "#86efac" : "#fdba74"}`,
                      }}
                    >
                      {currentTrackingOrder.orderStatus}
                    </span>
                  </div>

                  {/* Delivery ETA Countdown */}
                  <div
                    style={{
                      backgroundColor: "#fff7ed",
                      border: "1px solid #fed7aa",
                      borderRadius: "12px",
                      padding: "16px",
                      marginBottom: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        backgroundColor: "#ea580c",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Bike size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                        Estimated Time of Arrival:
                      </div>
                      <div style={{ fontSize: "1.2rem", fontWeight: 900, color: "#ea580c" }}>
                        {currentTrackingOrder.estimatedDeliveryTime || "25-30 Mins"}
                      </div>
                    </div>
                  </div>

                  {/* Live Progress Stepper */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
                    {/* Step 1 */}
                    <div style={{ display: "flex", gap: "14px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircle2 size={16} />
                        </div>
                        <div style={{ width: "2px", height: "40px", backgroundColor: "#16a34a" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                          Order Received &amp; Confirmed
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          Payment: {currentTrackingOrder.paymentStatus} ({currentTrackingOrder.paymentMethod})
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div style={{ display: "flex", gap: "14px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: currentTrackingOrder.orderStatus !== "Pending" ? "#ea580c" : "#cbd5e1",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Clock size={15} />
                        </div>
                        <div
                          style={{
                            width: "2px",
                            height: "40px",
                            backgroundColor:
                              currentTrackingOrder.orderStatus === "Out for Delivery" || currentTrackingOrder.orderStatus === "Delivered"
                                ? "#16a34a"
                                : "#cbd5e1",
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                          Slow-Cooking in Kitchen
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          Chef Harpal &amp; Team are preparing your authentic delicacies
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div style={{ display: "flex", gap: "14px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor:
                              currentTrackingOrder.orderStatus === "Out for Delivery" || currentTrackingOrder.orderStatus === "Delivered"
                                ? "#16a34a"
                                : "#cbd5e1",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Bike size={15} />
                        </div>
                        <div
                          style={{
                            width: "2px",
                            height: "40px",
                            backgroundColor: currentTrackingOrder.orderStatus === "Delivered" ? "#16a34a" : "#cbd5e1",
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                          Out for Express Delivery
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          Rider: <strong>{currentTrackingOrder.deliveryBoy || "Assigned Partner"}</strong> (
                          {currentTrackingOrder.deliveryBoyPhone || "+91 97920 01122"})
                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div style={{ display: "flex", gap: "14px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: currentTrackingOrder.orderStatus === "Delivered" ? "#16a34a" : "#cbd5e1",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircle2 size={16} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                          Food Delivered Fresh &amp; Steaming Hot
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          Handed over with 100% contactless tamper-proof packaging
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Location Details */}
                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: "12px",
                      padding: "14px",
                      border: "1px solid #e2e8f0",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                      Delivering To:
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#334155", fontWeight: 700 }}>
                      {currentTrackingOrder.customerName} ({currentTrackingOrder.customerPhone})
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>
                      {currentTrackingOrder.address}
                    </div>
                  </div>

                  {/* Itemized Order Breakdown */}
                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                      Ordered Delicacies:
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {currentTrackingOrder.items?.map((it, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#475569" }}>
                          <span>
                            {it.qty} × {it.name}
                          </span>
                          <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{it.qty * it.price}</span>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.95rem",
                        fontWeight: 900,
                        color: "#ea580c",
                        borderTop: "1px dashed #cbd5e1",
                        paddingTop: "8px",
                        marginTop: "8px",
                      }}
                    >
                      <span>Grand Total Paid:</span>
                      <span>₹{currentTrackingOrder.grandTotal}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "40px",
                    textAlign: "center",
                    border: "1px dashed #cbd5e1",
                  }}
                >
                  <AlertCircle size={36} color="#94a3b8" style={{ margin: "0 auto 12px" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>No Active Orders</h3>
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>You haven't placed an order recently.</p>
                </div>
              )}

              {/* Right: All Recent Orders List */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Recent Orders ({orders.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab("menu")}
                    style={{
                      backgroundColor: "#fff7ed",
                      color: "#ea580c",
                      border: "1px solid #fed7aa",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    + Order Again
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {orders.map((ord) => {
                    const isSelected = (currentTrackingOrder && currentTrackingOrder.id === ord.id);

                    return (
                      <div
                        key={ord.id}
                        onClick={() => setActiveTrackingOrderId(ord.id)}
                        style={{
                          backgroundColor: isSelected ? "#fff7ed" : "#f8fafc",
                          border: isSelected ? "2px solid #ea580c" : "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "14px",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                          <div>
                            <span style={{ fontWeight: 900, color: "#0f172a", fontSize: "0.95rem" }}>
                              {ord.id}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#64748b", marginLeft: "8px" }}>
                              {ord.orderType}
                            </span>
                          </div>
                          <span
                            style={{
                              backgroundColor: ord.orderStatus === "Delivered" ? "#dcfce7" : "#ffedd5",
                              color: ord.orderStatus === "Delivered" ? "#15803d" : "#c2410c",
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                            }}
                          >
                            {ord.orderStatus}
                          </span>
                        </div>

                        <div style={{ fontSize: "0.82rem", color: "#475569", marginBottom: "6px" }}>
                          {ord.items?.map((it) => `${it.qty}x ${it.name}`).join(", ")}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#64748b" }}>
                          <span>Total: <strong style={{ color: "#0f172a" }}>₹{ord.grandTotal}</strong></span>
                          <span style={{ color: "#ea580c", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>
                            Track Live <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
