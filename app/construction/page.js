"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HardHat,
  Truck,
  Users,
  CheckCircle2,
  AlertTriangle,
  Building,
  Plus,
  Calendar,
  Layers,
  Phone,
} from "lucide-react";
import { constructionData } from "@/data/businessAppsData";

export default function ConstructionApp() {
  const { companyInfo, sites, materials, labourShift } = constructionData;
  const [activeTab, setActiveTab] = useState("sites"); // "sites", "materials", "labour"
  const [materialStock, setMaterialStock] = useState(materials);
  const [showIndentModal, setShowIndentModal] = useState(false);
  const [indentItem, setIndentItem] = useState("UltraTech Super Cement (50kg Bags)");
  const [indentQty, setIndentQty] = useState(100);
  const [indentSuccess, setIndentSuccess] = useState(null);

  const handleCreateIndent = (e) => {
    e.preventDefault();
    setMaterialStock((prev) =>
      prev.map((m) => (m.name.includes(indentItem.split(" ")[0]) ? { ...m, inStock: m.inStock + Number(indentQty) } : m))
    );
    setIndentSuccess(`Material Indent Approved: +${indentQty} units added to site inventory.`);
    setShowIndentModal(false);
  };

  const totalLabourWages = labourShift.reduce((acc, l) => acc + l.count * l.dailyRate, 0);

  return (
    <div style={{ backgroundColor: "#fafaf9", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#fef3c7", borderBottom: "1px solid #fde68a", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#92400e", fontWeight: 700 }}>
        <span>🏗️ {companyInfo.name} • Live Civil Site Monitoring &amp; Material Logistics • Central Site Desk: {companyInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#92400e", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#d97706", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HardHat size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{companyInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{companyInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("sites")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "sites" ? "1px solid #d97706" : "1px solid #cbd5e1", backgroundColor: activeTab === "sites" ? "#fffbeb" : "#ffffff", color: activeTab === "sites" ? "#d97706" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Active Civil Sites ({sites.length})
            </button>
            <button onClick={() => setActiveTab("materials")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "materials" ? "1px solid #d97706" : "1px solid #cbd5e1", backgroundColor: activeTab === "materials" ? "#fffbeb" : "#ffffff", color: activeTab === "materials" ? "#d97706" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Cement &amp; Steel Inventory
            </button>
            <button onClick={() => setActiveTab("labour")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "labour" ? "1px solid #d97706" : "1px solid #cbd5e1", backgroundColor: activeTab === "labour" ? "#fffbeb" : "#ffffff", color: activeTab === "labour" ? "#d97706" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Daily Labour Muster Roll
            </button>
          </div>
        </div>
      </header>

      {/* Indent Success Alert */}
      {indentSuccess && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{indentSuccess}</span>
            </div>
            <button onClick={() => setIndentSuccess(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        {/* Sites Tab */}
        {activeTab === "sites" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
            {sites.map((st) => (
              <div key={st.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{st.name}</h3>
                  <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                    {st.status}
                  </span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "16px" }}>Location: {st.location}</div>

                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 800, marginBottom: "4px" }}>
                    <span>Project Progress</span>
                    <span style={{ color: "#d97706" }}>{st.completion}%</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${st.completion}%`, height: "100%", backgroundColor: "#d97706" }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "14px", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Budget Sanctioned</span>
                    <span style={{ fontWeight: 800 }}>{st.budget}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Utilized to Date</span>
                    <span style={{ fontWeight: 800, color: "#16a34a" }}>{st.spent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Materials Inventory Tab */}
        {activeTab === "materials" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Site Raw Material Stock Ledger</h2>
                <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>Track cement bags, TMT steel rebars, sand, and bricks on site.</p>
              </div>
              <button
                onClick={() => setShowIndentModal(true)}
                style={{ backgroundColor: "#d97706", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Plus size={16} /> Request Material Indent
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Material Description</th>
                    <th style={{ padding: "10px 14px" }}>Current Stock on Site</th>
                    <th style={{ padding: "10px 14px" }}>Unit of Measurement</th>
                    <th style={{ padding: "10px 14px" }}>Min Threshold</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materialStock.map((m, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{m.name}</td>
                      <td style={{ padding: "12px 14px", fontSize: "1.05rem", fontWeight: 900, color: "#d97706" }}>{m.inStock.toLocaleString("en-IN")}</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{m.unit}</td>
                      <td style={{ padding: "12px 14px", color: "#94a3b8" }}>{m.minAlert} {m.unit}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span style={{ backgroundColor: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                          ✓ {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Labour Muster Roll Tab */}
        {activeTab === "labour" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Daily Labour Deployment &amp; Wages</h2>
                <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#64748b" }}>Masons, helpers, steel fixers, and MEP contractors on duty.</p>
              </div>
              <div style={{ backgroundColor: "#fef3c7", padding: "8px 16px", borderRadius: "8px", fontWeight: 900, color: "#92400e", fontSize: "0.95rem" }}>
                Today's Labour Payout: ₹{totalLabourWages.toLocaleString("en-IN")}
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                    <th style={{ padding: "10px 14px" }}>Labour Category</th>
                    <th style={{ padding: "10px 14px" }}>Workers Present</th>
                    <th style={{ padding: "10px 14px" }}>Daily Wage Rate</th>
                    <th style={{ padding: "10px 14px" }}>Total Daily Wage Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {labourShift.map((l, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{l.category}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0f172a" }}>{l.count} Workers</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>₹{l.dailyRate} / day</td>
                      <td style={{ padding: "12px 14px", fontWeight: 900, color: "#d97706" }}>₹{(l.count * l.dailyRate).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Material Indent Modal */}
      {showIndentModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowIndentModal(false)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Request Material Indent</h3>
            <form onSubmit={handleCreateIndent} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <select value={indentItem} onChange={(e) => setIndentItem(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                {materials.map((m, i) => (<option key={i} value={m.name}>{m.name}</option>))}
              </select>
              <input type="number" placeholder="Quantity to Order" value={indentQty} onChange={(e) => setIndentQty(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowIndentModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#d97706", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Authorize Indent</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
