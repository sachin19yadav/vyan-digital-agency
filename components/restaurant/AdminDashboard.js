"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Utensils,
  Plus,
  Trash2,
  Edit3,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Users,
  CheckCircle,
  XCircle,
  Search,
  Sparkles,
  Building,
  Phone,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { restaurantInfo, menuCategories } from "@/data/restaurantSeedData";

export default function AdminDashboard({
  menuItems,
  setMenuItems,
  orders,
  bills,
  tables,
  allStaff,
}) {
  const [adminTab, setAdminTab] = useState("overview"); // "overview", "menu", "orders", "settings"
  const [menuSearchQuery, setMenuSearchQuery] = useState("");
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  // New Dish Form State
  const [newDishName, setNewDishName] = useState("");
  const [newDishCategory, setNewDishCategory] = useState("Main Course");
  const [newDishPrice, setNewDishPrice] = useState("");
  const [newDishIsVeg, setNewDishIsVeg] = useState(true);
  const [newDishSpice, setNewDishSpice] = useState("Medium Spicy");
  const [newDishPrepTime, setNewDishPrepTime] = useState("20 mins");
  const [newDishImage, setNewDishImage] = useState("");
  const [newDishDesc, setNewDishDesc] = useState("");

  // Total Revenue Calculation
  const totalBillRevenue = bills.reduce((acc, b) => acc + (b.grandTotal || 0), 0);
  const totalOnlineOrderRevenue = orders
    .filter((o) => o.orderType === "Delivery")
    .reduce((acc, o) => acc + (o.grandTotal || 0), 0);

  // Toggle Dish Availability
  const handleToggleAvailability = (dishId) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, available: !item.available } : item))
    );
  };

  // Delete Dish
  const handleDeleteDish = (dishId) => {
    if (confirm("Are you sure you want to remove this dish from the menu?")) {
      setMenuItems((prev) => prev.filter((item) => item.id !== dishId));
    }
  };

  // Add Dish
  const handleAddNewDish = (e) => {
    e.preventDefault();
    if (!newDishName.trim() || !newDishPrice) {
      alert("Please enter dish name and valid price.");
      return;
    }

    const newDish = {
      id: `ITEM-${Math.floor(500 + Math.random() * 500)}`,
      name: newDishName.trim(),
      category: newDishCategory,
      isVeg: newDishIsVeg,
      price: Number(newDishPrice),
      rating: 4.8,
      reviewsCount: 1,
      prepTime: newDishPrepTime || "20 mins",
      spiceLevel: newDishSpice,
      description: newDishDesc.trim() || "Prepared fresh by Zaika Royale khansamas.",
      image:
        newDishImage.trim() ||
        (newDishIsVeg
          ? "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80"
          : "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"),
      isBestseller: false,
      available: true,
    };

    setMenuItems([newDish, ...menuItems]);
    setShowAddDishModal(false);
    // Reset form
    setNewDishName("");
    setNewDishPrice("");
    setNewDishDesc("");
    setNewDishImage("");
  };

  // Filtered menu for admin table
  const filteredAdminMenu = menuItems.filter((m) => {
    if (!menuSearchQuery.trim()) return true;
    const q = menuSearchQuery.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q);
  });

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "30px 20px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top Header */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#7c3aed", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase" }}>
              <LayoutDashboard size={16} />
              <span>Zaika Royale Executive Administration</span>
            </div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>
              Restaurant Super Admin Portal
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
              Manage culinary menu, inventory items, sales KPIs, live orders, and staff permissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddDishModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
            }}
          >
            <Plus size={18} />
            <span>Add New Dish to Menu</span>
          </button>
        </div>

        {/* Admin Section Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "24px",
            paddingBottom: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => setAdminTab("overview")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderBottom: adminTab === "overview" ? "3px solid #7c3aed" : "3px solid transparent",
              backgroundColor: adminTab === "overview" ? "#ffffff" : "transparent",
              color: adminTab === "overview" ? "#7c3aed" : "#64748b",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <TrendingUp size={15} />
            <span>Sales &amp; Business KPIs</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminTab("menu")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderBottom: adminTab === "menu" ? "3px solid #7c3aed" : "3px solid transparent",
              backgroundColor: adminTab === "menu" ? "#ffffff" : "transparent",
              color: adminTab === "menu" ? "#7c3aed" : "#64748b",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Utensils size={15} />
            <span>Menu &amp; Food Catalog ({menuItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminTab("orders")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderBottom: adminTab === "orders" ? "3px solid #7c3aed" : "3px solid transparent",
              backgroundColor: adminTab === "orders" ? "#ffffff" : "transparent",
              color: adminTab === "orders" ? "#7c3aed" : "#64748b",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ShoppingBag size={15} />
            <span>Master Orders Ledger ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminTab("settings")}
            style={{
              padding: "10px 18px",
              border: "none",
              borderBottom: adminTab === "settings" ? "3px solid #7c3aed" : "3px solid transparent",
              backgroundColor: adminTab === "settings" ? "#ffffff" : "transparent",
              color: adminTab === "settings" ? "#7c3aed" : "#64748b",
              fontWeight: 800,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Building size={15} />
            <span>FSSAI &amp; GST Profile</span>
          </button>
        </div>

        {/* 1. OVERVIEW & SALES METRICS */}
        {adminTab === "overview" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
                marginBottom: "28px",
              }}
            >
              {/* Card 1 */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>Total Settled POS Revenue</span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DollarSign size={18} />
                  </div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a" }}>
                  ₹{totalBillRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                  Includes 5% Restaurant GST collected
                </div>
              </div>

              {/* Card 2 */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>Online Delivery Volume</span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#fff7ed", color: "#ea580c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShoppingBag size={18} />
                  </div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#ea580c" }}>
                  ₹{totalOnlineOrderRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                  {orders.filter((o) => o.orderType === "Delivery").length} orders dispatched
                </div>
              </div>

              {/* Card 3 */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>Active Menu Catalog</span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Utensils size={18} />
                  </div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>
                  {menuItems.length} Dishes
                </div>
                <div style={{ fontSize: "0.75rem", color: "#16a34a", marginTop: "4px" }}>
                  {menuItems.filter((i) => i.available).length} In Stock &bull; {menuItems.filter((i) => !i.available).length} Sold Out
                </div>
              </div>

              {/* Card 4 */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>Staff Members Active</span>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#f3e8ff", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={18} />
                  </div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed" }}>
                  {allStaff.length} On Duty
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                  Kitchen, Service, Cashier &amp; Riders
                </div>
              </div>
            </div>

            {/* Quick Operational Status Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
                  Floor Table Status ({tables.length} Tables)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tables.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                        {t.name} ({t.capacity} Seater)
                      </span>
                      <span
                        style={{
                          backgroundColor: t.status === "Occupied" ? "#fff7ed" : "#f0fdf4",
                          color: t.status === "Occupied" ? "#c2410c" : "#16a34a",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                        }}
                      >
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
                  Quick Staff Directory
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allStaff.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.role}</div>
                      </div>
                      <span
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#16a34a",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                        }}
                      >
                        {s.shift}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MENU CATALOG & INVENTORY CRUD */}
        {adminTab === "menu" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Manage Dishes &amp; Pricing ({menuItems.length})
                </h2>
                <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                  Update live stock availability, remove discontinued items, or add new chef creations.
                </p>
              </div>

              {/* Search */}
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Filter by dish or category..."
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 34px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Menu Items Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Dish Name</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Category</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Diet</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Price</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Rating</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Stock Availability</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminMenu.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
                          />
                          <div>
                            <div style={{ fontWeight: 800, color: "#0f172a" }}>{item.name}</div>
                            <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>{item.id}</span>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: "12px 14px", color: "#475569" }}>{item.category}</td>

                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            color: item.isVeg ? "#16a34a" : "#dc2626",
                            backgroundColor: item.isVeg ? "#f0fdf4" : "#fef2f2",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                      </td>

                      <td style={{ padding: "12px 14px", fontWeight: 900, color: "#0f172a" }}>
                        ₹{item.price}
                      </td>

                      <td style={{ padding: "12px 14px", color: "#475569" }}>
                        ★ {item.rating} ({item.reviewsCount})
                      </td>

                      <td style={{ padding: "12px 14px" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item.id)}
                          style={{
                            backgroundColor: item.available ? "#f0fdf4" : "#fef2f2",
                            color: item.available ? "#16a34a" : "#dc2626",
                            border: `1px solid ${item.available ? "#bbf7d0" : "#fecaca"}`,
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            cursor: "pointer",
                          }}
                        >
                          {item.available ? "● In Stock" : "✕ Sold Out"}
                        </button>
                      </td>

                      <td style={{ padding: "12px 14px" }}>
                        <button
                          type="button"
                          onClick={() => handleDeleteDish(item.id)}
                          style={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            border: "1px solid #fecaca",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MASTER ORDERS LEDGER */}
        {adminTab === "orders" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                All Placed Orders Master Ledger
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                Online home deliveries, takeaway pickups, and dine-in tables.
              </p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Order ID</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Customer</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Order Type / Table</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Items</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Grand Total</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Payment</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0f172a" }}>{o.id}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ fontWeight: 700, color: "#0f172a" }}>{o.customerName}</div>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{o.customerPhone}</div>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            backgroundColor: o.orderType === "Delivery" ? "#fff7ed" : "#eff6ff",
                            color: o.orderType === "Delivery" ? "#c2410c" : "#1d4ed8",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {o.orderType} {o.tableNo ? `(${o.tableNo})` : ""}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>
                        {o.items?.map((it) => `${it.qty}x ${it.name}`).join(", ")}
                      </td>
                      <td style={{ padding: "12px 14px", fontWeight: 900, color: "#ea580c" }}>
                        ₹{o.grandTotal}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#334155" }}>
                        {o.paymentMethod} ({o.paymentStatus})
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            backgroundColor: o.orderStatus === "Delivered" ? "#dcfce7" : "#ffedd5",
                            color: o.orderStatus === "Delivered" ? "#15803d" : "#c2410c",
                            padding: "3px 8px",
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                          }}
                        >
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SETTINGS & RESTAURANT INFO */}
        {adminTab === "settings" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              maxWidth: "700px",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>
              Official Restaurant Legal &amp; Tax Profile
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Restaurant Trade Name</span>
                <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>{restaurantInfo.name}</span>
              </div>

              <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>GSTIN (Goods &amp; Services Tax Identification)</span>
                <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>{restaurantInfo.gstin}</span>
              </div>

              <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>FSSAI Food Safety License Number</span>
                <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a" }}>{restaurantInfo.fssaiLicense}</span>
              </div>

              <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Address</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#0f172a" }}>{restaurantInfo.address}</span>
              </div>

              <div style={{ padding: "10px 14px", backgroundColor: "#f8fafc", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Hotline &amp; Ordering Phone</span>
                <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#ea580c" }}>{restaurantInfo.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD NEW DISH MODAL */}
      {showAddDishModal && (
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
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddDishModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              padding: "24px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>
              Add New Dish to Menu
            </h2>

            <form onSubmit={handleAddNewDish} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                  Dish Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Nawabi Korma"
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                    Category *
                  </label>
                  <select
                    value={newDishCategory}
                    onChange={(e) => setNewDishCategory(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", backgroundColor: "#ffffff", outline: "none" }}
                  >
                    {menuCategories.filter((c) => c.id !== "ALL").map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="350"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                    Diet Type
                  </label>
                  <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#16a34a" }}>
                      <input
                        type="radio"
                        checked={newDishIsVeg}
                        onChange={() => setNewDishIsVeg(true)}
                        style={{ accentColor: "#16a34a" }}
                      />
                      Veg
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.82rem", fontWeight: 700, color: "#dc2626" }}>
                      <input
                        type="radio"
                        checked={!newDishIsVeg}
                        onChange={() => setNewDishIsVeg(false)}
                        style={{ accentColor: "#dc2626" }}
                      />
                      Non-Veg
                    </label>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                    Spice Level
                  </label>
                  <input
                    type="text"
                    placeholder="Medium Spicy"
                    value={newDishSpice}
                    onChange={(e) => setNewDishSpice(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                  Image URL (Unsplash or CDN)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newDishImage}
                  onChange={(e) => setNewDishImage(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief culinary ingredients and description"
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#ea580c", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}
                >
                  Save &amp; Publish Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
