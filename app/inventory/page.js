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
} from "lucide-react";
import { inventoryData } from "@/data/businessAppsData";

export default function InventoryApp() {
  const { warehouseInfo, items } = inventoryData;
  const [stockItems, setStockItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddSkuModal, setShowAddSkuModal] = useState(false);
  const [skuSuccess, setSkuSuccess] = useState(null);

  // New SKU form
  const [newSku, setNewSku] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Tools");
  const [newQty, setNewQty] = useState(50);
  const [newCost, setNewCost] = useState("");
  const [newSale, setNewSale] = useState("");
  const [newSupplier, setNewSupplier] = useState("");

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
    setSkuSuccess(`New SKU "${item.sku} - ${item.name}" registered into warehouse inventory.`);
  };

  const totalInventoryValue = stockItems.reduce((acc, it) => acc + it.qty * it.costPrice, 0);
  const lowStockCount = stockItems.filter((it) => it.qty <= it.minAlert).length;

  const filteredItems = stockItems.filter((it) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return it.name.toLowerCase().includes(q) || it.sku.toLowerCase().includes(q) || it.category.toLowerCase().includes(q);
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#1d4ed8", fontWeight: 700 }}>
        <span>📦 {warehouseInfo.name} • Live Central Warehouse Inventory &amp; Stock Ledgers</span>
        <Link href="/business-suite" style={{ color: "#1d4ed8", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Boxes size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{warehouseInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{warehouseInfo.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddSkuModal(true)}
            style={{ backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={16} /> Add New SKU Item
          </button>
        </div>
      </header>

      {/* Feedback Banner */}
      {skuSuccess && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{skuSuccess}</span>
            </div>
            <button onClick={() => setSkuSuccess(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* KPI Cards Strip */}
      <section style={{ maxWidth: "1240px", margin: "24px auto 0", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Total Warehouse Valuation</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#2563eb" }}>₹{totalInventoryValue.toLocaleString("en-IN")}</div>
            <div style={{ fontSize: "0.75rem", color: "#16a34a", marginTop: "4px" }}>Computed at landed unit cost price</div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Total Active SKUs</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>{stockItems.length} Products</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>Across multiple operational categories</div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Critical Low Stock Warnings</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: lowStockCount > 0 ? "#dc2626" : "#16a34a" }}>{lowStockCount} Items</div>
            <div style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "4px" }}>Below automated re-order thresholds</div>
          </div>
        </div>
      </section>

      {/* Main Stock Items Table */}
      <main style={{ maxWidth: "1240px", margin: "24px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Warehouse Inventory Master Register</h2>
            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search by SKU or item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.82rem" }}
              />
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "10px 14px" }}>SKU Code</th>
                  <th style={{ padding: "10px 14px" }}>Product Name</th>
                  <th style={{ padding: "10px 14px" }}>Category</th>
                  <th style={{ padding: "10px 14px" }}>Stock Level</th>
                  <th style={{ padding: "10px 14px" }}>Cost Price</th>
                  <th style={{ padding: "10px 14px" }}>Selling Price</th>
                  <th style={{ padding: "10px 14px" }}>Supplier</th>
                  <th style={{ padding: "10px 14px" }}>Quick Inward / Outward</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const isLow = item.qty <= item.minAlert;

                  return (
                    <tr key={item.sku} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800, color: "#2563eb" }}>{item.sku}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0f172a" }}>{item.name}</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{item.category}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ fontWeight: 900, color: isLow ? "#dc2626" : "#0f172a", fontSize: "0.95rem" }}>
                          {item.qty} units
                        </span>
                        {isLow && <span style={{ marginLeft: "6px", backgroundColor: "#fee2e2", color: "#dc2626", fontSize: "0.7rem", padding: "1px 6px", borderRadius: "4px", fontWeight: 800 }}>LOW</span>}
                      </td>
                      <td style={{ padding: "12px 14px", color: "#475569" }}>₹{item.costPrice}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 800, color: "#16a34a" }}>₹{item.salePrice}</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{item.supplier}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button
                            onClick={() => handleStockAdjust(item.sku, 10)}
                            style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}
                          >
                            <Plus size={12} /> Inward (+10)
                          </button>
                          <button
                            onClick={() => handleStockAdjust(item.sku, -5)}
                            style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}
                          >
                            <Minus size={12} /> Dispatch (-5)
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add SKU Modal */}
      {showAddSkuModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowAddSkuModal(false)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "480px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Add New Inventory SKU</h3>
            <form onSubmit={handleAddNewSku} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input type="text" placeholder="SKU Code (e.g. SKU-9015) *" value={newSku} onChange={(e) => setNewSku(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="text" placeholder="Category *" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <input type="text" placeholder="Product Title *" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <input type="number" placeholder="Initial Qty" value={newQty} onChange={(e) => setNewQty(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="number" placeholder="Cost Price (₹)" value={newCost} onChange={(e) => setNewCost(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                <input type="number" placeholder="Sale Price (₹)" value={newSale} onChange={(e) => setNewSale(e.target.value)} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <input type="text" placeholder="Supplier / Vendor Name" value={newSupplier} onChange={(e) => setNewSupplier(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowAddSkuModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Register SKU</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
