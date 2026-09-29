"use client";

import {
  Utensils,
  Phone,
  ShoppingBag,
  Clock,
  MapPin,
  Search,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Award,
  Users,
  CreditCard,
  ChefHat,
  Receipt,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { restaurantInfo } from "@/data/restaurantSeedData";

export default function RestaurantHeader({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  cart,
  setIsCartOpen,
  searchTerm,
  setSearchTerm,
  allStaff,
}) {
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #fed7aa",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 10px rgba(234, 88, 12, 0.06)",
      }}
    >
      {/* Top Notification & Delivery Hotline Strip */}
      <div
        style={{
          backgroundColor: "#fff7ed",
          borderBottom: "1px solid #ffedd5",
          padding: "6px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.82rem",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#c2410c", fontWeight: 700 }}>
            <Sparkles size={14} color="#ea580c" />
            <span>🔥 Flat 10% OFF on Orders Above ₹499 • Use Coupon: <strong>ZAIKA50</strong></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b" }}>
            <Clock size={13} color="#ea580c" />
            <span>Hours: {restaurantInfo.openingHours}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href={`tel:${restaurantInfo.phone}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#ea580c",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            <Phone size={13} />
            <span>Order / Table Hotline: {restaurantInfo.phone}</span>
          </a>

          {/* Active Workspace / Role Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Role:</span>
            <div style={{ position: "relative" }}>
              <select
                value={currentRole}
                onChange={(e) => {
                  const role = e.target.value;
                  setCurrentRole(role);
                  if (role === "Guest") setActiveTab("landing");
                  else if (role === "Kitchen") setActiveTab("kitchen");
                  else if (role === "Billing") setActiveTab("billing");
                  else if (role === "Admin") setActiveTab("admin");
                  else setActiveTab("menu");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #fdba74",
                  padding: "4px 26px 4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  outline: "none",
                  appearance: "none",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <option value="Guest">🍽️ Customer View (Landing &amp; Menu)</option>
                <option value="Billing">💳 Cashier &amp; POS Billing Desk</option>
                <option value="Kitchen">👨‍🍳 Kitchen Staff &amp; KOT Desk</option>
                <option value="Admin">👑 Super Admin (Full Control)</option>
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: "6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#ea580c",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Restaurant Brand Bar */}
      <div
        style={{
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Brand Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={() => setActiveTab("landing")}
        >
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ea580c, #c2410c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(234, 88, 12, 0.3)",
            }}
          >
            <Utensils size={26} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  letterSpacing: "-0.5px",
                  color: "#0f172a",
                }}
              >
                {restaurantInfo.name}
              </h1>
              <span
                style={{
                  backgroundColor: "#ffedd5",
                  color: "#c2410c",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  border: "1px solid #fed7aa",
                }}
              >
                FINE DINE &amp; CLOUD KITCHEN
              </span>
            </div>
            <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "#64748b" }}>
              {restaurantInfo.tagline} • Kanpur
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "8px 14px",
            minWidth: "260px",
            flex: 1,
            maxWidth: "380px",
          }}
        >
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search Biryani, Butter Chicken, Naan..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (activeTab === "landing") setActiveTab("menu");
            }}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "0.85rem",
              color: "#0f172a",
              width: "100%",
            }}
          />
        </div>

        {/* Right Navigation & Cart Trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(234, 88, 12, 0.3)",
              transition: "transform 0.15s",
            }}
          >
            <ShoppingBag size={18} />
            <span>My Cart</span>
            {totalCartCount > 0 && (
              <span
                style={{
                  backgroundColor: "#ffffff",
                  color: "#ea580c",
                  borderRadius: "12px",
                  padding: "1px 7px",
                  fontSize: "0.75rem",
                  fontWeight: 900,
                }}
              >
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div
        style={{
          backgroundColor: "#fcfaf7",
          borderTop: "1px solid #f3ebe1",
          padding: "6px 24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("landing")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "landing" ? "1px solid #fdba74" : "1px solid transparent",
            backgroundColor: activeTab === "landing" ? "#ffffff" : "transparent",
            color: activeTab === "landing" ? "#ea580c" : "#475569",
            fontWeight: activeTab === "landing" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Restaurant Home
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("menu")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "menu" ? "1px solid #fdba74" : "1px solid transparent",
            backgroundColor: activeTab === "menu" ? "#ffffff" : "transparent",
            color: activeTab === "menu" ? "#ea580c" : "#475569",
            fontWeight: activeTab === "menu" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Food Menu &amp; Order
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "orders" ? "1px solid #fdba74" : "1px solid transparent",
            backgroundColor: activeTab === "orders" ? "#ffffff" : "transparent",
            color: activeTab === "orders" ? "#ea580c" : "#475569",
            fontWeight: activeTab === "orders" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Track Orders &amp; Delivery
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("billing")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "billing" ? "1px solid #16a34a" : "1px solid transparent",
            backgroundColor: activeTab === "billing" ? "#f0fdf4" : "transparent",
            color: activeTab === "billing" ? "#15803d" : "#475569",
            fontWeight: activeTab === "billing" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Receipt size={14} color="#16a34a" />
          <span>Billing Software (POS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("kitchen")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "kitchen" ? "1px solid #f59e0b" : "1px solid transparent",
            backgroundColor: activeTab === "kitchen" ? "#fef3c7" : "transparent",
            color: activeTab === "kitchen" ? "#b45309" : "#475569",
            fontWeight: activeTab === "kitchen" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ChefHat size={14} color="#d97706" />
          <span>Kitchen KOT &amp; Staff Desk</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("admin")}
          style={{
            padding: "7px 14px",
            borderRadius: "8px",
            border: activeTab === "admin" ? "1px solid #7c3aed" : "1px solid transparent",
            backgroundColor: activeTab === "admin" ? "#f3e8ff" : "transparent",
            color: activeTab === "admin" ? "#7e22ce" : "#475569",
            fontWeight: activeTab === "admin" ? 700 : 500,
            fontSize: "0.85rem",
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <LayoutDashboard size={14} color="#7c3aed" />
          <span>Admin Portal</span>
        </button>
      </div>
    </header>
  );
}
