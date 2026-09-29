"use client";

import { useState } from "react";
import {
  ChefHat,
  Flame,
  Clock,
  CheckCircle2,
  Users,
  Utensils,
  Bike,
  AlertTriangle,
  Sparkles,
  Phone,
  Check,
  RefreshCw,
  Eye,
  Coffee,
} from "lucide-react";

export default function KitchenStaffDesk({
  orders,
  setOrders,
  tables,
  setTables,
  allStaff,
}) {
  const [activeTab, setActiveTab] = useState("kot"); // "kot", "tables", "staff"
  const [kotFilter, setKotFilter] = useState("ALL"); // "ALL", "Preparing", "Ready", "Delivered"

  // Update order status in KOT
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  // Update table status
  const handleUpdateTableStatus = (tableId, newStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t))
    );
  };

  // Filtered orders for kitchen KOT
  const filteredOrders = orders.filter((o) => {
    if (kotFilter === "ALL") return true;
    return o.orderStatus === kotFilter;
  });

  // KOT Statistics
  const preparingCount = orders.filter((o) => o.orderStatus === "Preparing").length;
  const readyCount = orders.filter((o) => o.orderStatus === "Ready for Pickup" || o.orderStatus === "Out for Delivery").length;
  const occupiedTablesCount = tables.filter((t) => t.status === "Occupied").length;

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "30px 20px 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header Strip */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#d97706", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase" }}>
              <ChefHat size={16} />
              <span>Kitchen Display System (KDS / KOT) &amp; Floor Desk</span>
            </div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>
              Kitchen &amp; Floor Staff Desk
            </h1>
            <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
              Live food preparation tickets, cooking timers, floor table management &amp; staff shifts.
            </p>
          </div>

          {/* Real-time Counts */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", padding: "8px 14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#c2410c", fontWeight: 700 }}>Cooking Now</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#ea580c" }}>{preparingCount} Tickets</div>
            </div>
            <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#15803d", fontWeight: 700 }}>Ready / Dispatched</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#16a34a" }}>{readyCount} Orders</div>
            </div>
            <div style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", padding: "8px 14px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", color: "#1d4ed8", fontWeight: 700 }}>Occupied Tables</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#2563eb" }}>{occupiedTablesCount} / {tables.length}</div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
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
            onClick={() => setActiveTab("kot")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              borderBottom: activeTab === "kot" ? "3px solid #ea580c" : "3px solid transparent",
              backgroundColor: activeTab === "kot" ? "#ffffff" : "transparent",
              color: activeTab === "kot" ? "#ea580c" : "#64748b",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ChefHat size={16} />
            <span>Live Kitchen KOT Tickets ({filteredOrders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tables")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              borderBottom: activeTab === "tables" ? "3px solid #ea580c" : "3px solid transparent",
              backgroundColor: activeTab === "tables" ? "#ffffff" : "transparent",
              color: activeTab === "tables" ? "#ea580c" : "#64748b",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Utensils size={16} />
            <span>Dine-In Tables Floor Plan ({tables.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("staff")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              borderBottom: activeTab === "staff" ? "3px solid #ea580c" : "3px solid transparent",
              backgroundColor: activeTab === "staff" ? "#ffffff" : "transparent",
              color: activeTab === "staff" ? "#ea580c" : "#64748b",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Users size={16} />
            <span>Staff Directory &amp; Shifts ({allStaff.length})</span>
          </button>
        </div>

        {/* 1. KITCHEN KOT TICKETS VIEW */}
        {activeTab === "kot" && (
          <div>
            {/* KOT Status Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {["ALL", "Preparing", "Ready for Pickup", "Delivered"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setKotFilter(st)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: kotFilter === st ? "1px solid #ea580c" : "1px solid #cbd5e1",
                      backgroundColor: kotFilter === st ? "#ea580c" : "#ffffff",
                      color: kotFilter === st ? "#ffffff" : "#475569",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {st === "ALL" ? "All KOT Tickets" : st}
                  </button>
                ))}
              </div>

              <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Auto-syncing every 5 seconds with online &amp; POS orders
              </span>
            </div>

            {/* KOT Cards Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredOrders.map((ord) => {
                const isDineIn = ord.orderType === "Dine-In";

                return (
                  <div
                    key={ord.id}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      border:
                        ord.orderStatus === "Preparing"
                          ? "2px solid #fdba74"
                          : ord.orderStatus === "Ready for Pickup"
                          ? "2px solid #86efac"
                          : "1px solid #e2e8f0",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* KOT Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        paddingBottom: "12px",
                        borderBottom: "1px solid #f1f5f9",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0f172a" }}>
                            {ord.id}
                          </span>
                          <span
                            style={{
                              backgroundColor: isDineIn ? "#eff6ff" : "#fff7ed",
                              color: isDineIn ? "#1d4ed8" : "#c2410c",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                            }}
                          >
                            {isDineIn ? ord.tableNo : "Home Delivery"}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                          Guest: <strong>{ord.customerName}</strong> ({ord.customerPhone})
                        </div>
                      </div>

                      {/* Status Tag */}
                      <span
                        style={{
                          backgroundColor:
                            ord.orderStatus === "Preparing"
                              ? "#fef3c7"
                              : ord.orderStatus === "Ready for Pickup"
                              ? "#dcfce7"
                              : "#f1f5f9",
                          color:
                            ord.orderStatus === "Preparing"
                              ? "#b45309"
                              : ord.orderStatus === "Ready for Pickup"
                              ? "#15803d"
                              : "#475569",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                        }}
                      >
                        {ord.orderStatus}
                      </span>
                    </div>

                    {/* Cooking Notes Alert if any */}
                    {ord.cookingNotes && ord.cookingNotes !== "Normal spice" && (
                      <div
                        style={{
                          backgroundColor: "#fef3c7",
                          border: "1px solid #fde68a",
                          borderRadius: "8px",
                          padding: "6px 10px",
                          fontSize: "0.75rem",
                          color: "#92400e",
                          fontWeight: 700,
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <AlertTriangle size={14} color="#b45309" />
                        <span>Chef Note: {ord.cookingNotes}</span>
                      </div>
                    )}

                    {/* Food Items Checklist */}
                    <div style={{ flex: 1, marginBottom: "16px" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>
                        Dishes to Cook:
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {ord.items?.map((it, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#f8fafc",
                              padding: "8px 10px",
                              borderRadius: "8px",
                            }}
                          >
                            <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f172a" }}>
                              {it.qty} × {it.name}
                            </span>
                            <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>
                              ✓ In Prep
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KOT Chef Action Buttons */}
                    <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                      {ord.orderStatus === "Preparing" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(ord.id, "Ready for Pickup")}
                          style={{
                            flex: 1,
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            border: "none",
                            padding: "9px",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                          }}
                        >
                          <Check size={14} />
                          <span>Mark Cooked &amp; Ready</span>
                        </button>
                      )}

                      {ord.orderStatus === "Ready for Pickup" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateOrderStatus(
                              ord.id,
                              isDineIn ? "Delivered" : "Out for Delivery"
                            )
                          }
                          style={{
                            flex: 1,
                            backgroundColor: "#ea580c",
                            color: "#ffffff",
                            border: "none",
                            padding: "9px",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                          }}
                        >
                          {isDineIn ? <Utensils size={14} /> : <Bike size={14} />}
                          <span>{isDineIn ? "Serve to Table" : "Dispatch to Rider"}</span>
                        </button>
                      )}

                      {ord.orderStatus === "Out for Delivery" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateOrderStatus(ord.id, "Delivered")}
                          style={{
                            flex: 1,
                            backgroundColor: "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            padding: "9px",
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          Mark as Delivered
                        </button>
                      )}

                      {ord.orderStatus === "Delivered" && (
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            padding: "6px",
                            color: "#16a34a",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                          }}
                        >
                          ✓ Order Fully Completed &amp; Served
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. DINE-IN TABLES FLOOR PLAN */}
        {activeTab === "tables" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Restaurant Dining Room &amp; Floor Tables
              </h2>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
                Click any table to quickly toggle between Vacant, Occupied, or Needs Cleaning.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {tables.map((tbl) => {
                const isOccupied = tbl.status === "Occupied";
                const isReserved = tbl.status === "Reserved";

                return (
                  <div
                    key={tbl.id}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      border: isOccupied ? "2px solid #ea580c" : isReserved ? "2px solid #f59e0b" : "1px solid #cbd5e1",
                      padding: "16px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontWeight: 900, fontSize: "1.05rem", color: "#0f172a" }}>
                          {tbl.name}
                        </span>
                        <span
                          style={{
                            backgroundColor: isOccupied ? "#fff7ed" : isReserved ? "#fef3c7" : "#f0fdf4",
                            color: isOccupied ? "#c2410c" : isReserved ? "#b45309" : "#15803d",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                          }}
                        >
                          {tbl.status}
                        </span>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>
                        Seating Capacity: <strong>{tbl.capacity} Persons</strong>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>
                        Current Guest: <strong>{tbl.currentGuest || "--"}</strong>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "12px" }}>
                        Server: <strong>{tbl.assignedWaiter || "Floor Waiter"}</strong>
                      </div>
                    </div>

                    {/* Quick Status Toggles */}
                    <div style={{ display: "flex", gap: "6px", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                      <button
                        type="button"
                        onClick={() => handleUpdateTableStatus(tbl.id, "Vacant")}
                        style={{
                          flex: 1,
                          padding: "5px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: tbl.status === "Vacant" ? "#f0fdf4" : "#ffffff",
                          color: tbl.status === "Vacant" ? "#16a34a" : "#475569",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Vacant
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateTableStatus(tbl.id, "Occupied")}
                        style={{
                          flex: 1,
                          padding: "5px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: tbl.status === "Occupied" ? "#fff7ed" : "#ffffff",
                          color: tbl.status === "Occupied" ? "#ea580c" : "#475569",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Occupied
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateTableStatus(tbl.id, "Cleaning")}
                        style={{
                          flex: 1,
                          padding: "5px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          backgroundColor: tbl.status === "Cleaning" ? "#fef3c7" : "#ffffff",
                          color: tbl.status === "Cleaning" ? "#b45309" : "#475569",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Clean
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. STAFF DIRECTORY & SHIFTS */}
        {activeTab === "staff" && (
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
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Zaika Royale Staff Members &amp; Shift Roster
              </h2>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>
                Executive chefs, tandoor khansamas, POS cashiers, captains, and delivery team.
              </p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Staff Name</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Role / Title</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Department</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Shift</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Contact Mobile</th>
                    <th style={{ padding: "12px 14px", color: "#475569", fontWeight: 800 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allStaff.map((st) => (
                    <tr key={st.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0f172a" }}>
                        {st.name}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#334155", fontWeight: 700 }}>
                        {st.role}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>
                        {st.department}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>
                        {st.shift}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#0f172a", fontWeight: 600 }}>
                        +91 {st.mobile}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          style={{
                            backgroundColor: "#f0fdf4",
                            color: "#16a34a",
                            padding: "3px 8px",
                            borderRadius: "10px",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                          }}
                        >
                          ● {st.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
