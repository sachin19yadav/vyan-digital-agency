"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Network,
  Users,
  TrendingUp,
  DollarSign,
  Award,
  GitFork,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShieldCheck,
  Star,
  Layers,
} from "lucide-react";
import { mlmData } from "@/data/businessAppsData";

export default function MlmApp() {
  const { networkInfo, rootUser, treeNodes, bonusTypes } = mlmData;
  const [modelType, setModelType] = useState("binary"); // "binary", "star"
  const [activeTab, setActiveTab] = useState("tree"); // "tree", "wallet", "register"
  const [currentNodes, setCurrentNodes] = useState(treeNodes);
  const [userBalance, setUserBalance] = useState(rootUser.totalEarnings);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(null);

  // New Associate Registration
  const [newAssociateName, setNewAssociateName] = useState("");
  const [newAssociatePhone, setNewAssociatePhone] = useState("");
  const [chosenLeg, setChosenLeg] = useState("Left");
  const [placementSuccess, setPlacementSuccess] = useState(null);

  const handleRegisterAssociate = (e) => {
    e.preventDefault();
    if (!newAssociateName || !newAssociatePhone) return;
    const newNode = {
      id: `STAR-${Math.floor(100 + Math.random() * 900)}`,
      name: newAssociateName,
      rank: "Bronze Associate",
      leg: chosenLeg,
      level: 3,
      teamCount: 1,
      active: true,
    };
    setCurrentNodes([...currentNodes, newNode]);
    setUserBalance((prev) => prev + 1500); // Direct referral bonus
    setPlacementSuccess(`Associate ${newNode.name} enrolled under ${chosenLeg} leg! Direct commission of ₹1,500 credited to wallet.`);
    setNewAssociateName("");
    setNewAssociatePhone("");
  };

  const handleWithdraw = () => {
    if (userBalance < 1000) {
      alert("Minimum withdrawal threshold is ₹1,000");
      return;
    }
    setWithdrawalSuccess(`Payout Request for ₹${userBalance.toLocaleString("en-IN")} submitted to Bank Account (IMPS/NEFT).`);
    setUserBalance(0);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f5f3ff", borderBottom: "1px solid #ddd6fe", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#6d28d9", fontWeight: 700 }}>
        <span>🌟 {networkInfo.name} • Dual Star &amp; Binary Compensation Engine • Instant Daily Payouts</span>
        <Link href="/business-suite" style={{ color: "#6d28d9", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Network size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{networkInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{networkInfo.tagline}</p>
            </div>
          </div>

          {/* Model Switcher: Binary vs Star */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ display: "inline-flex", backgroundColor: "#f1f5f9", padding: "3px", borderRadius: "8px" }}>
              <button
                onClick={() => setModelType("binary")}
                style={{ padding: "6px 14px", borderRadius: "6px", border: "none", backgroundColor: modelType === "binary" ? "#7c3aed" : "transparent", color: modelType === "binary" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
              >
                Binary Tree Model
              </button>
              <button
                onClick={() => setModelType("star")}
                style={{ padding: "6px 14px", borderRadius: "6px", border: "none", backgroundColor: modelType === "star" ? "#7c3aed" : "transparent", color: modelType === "star" ? "#ffffff" : "#475569", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
              >
                5-Star Matrix Model
              </button>
            </div>

            <button onClick={() => setActiveTab("register")} style={{ backgroundColor: "#059669", color: "#ffffff", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: 800, fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
              <Plus size={14} /> Sponsor New
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Alerts */}
      {placementSuccess && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{placementSuccess}</span>
            </div>
            <button onClick={() => setPlacementSuccess(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {withdrawalSuccess && (
        <div style={{ backgroundColor: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1d4ed8", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>{withdrawalSuccess}</span>
            </div>
            <button onClick={() => setWithdrawalSuccess(null)} style={{ background: "none", border: "none", color: "#1d4ed8", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* KPI Overview Strip */}
      <section style={{ maxWidth: "1240px", margin: "24px auto 0", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>My Available Wallet Balance</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#059669" }}>₹{userBalance.toLocaleString("en-IN")}</div>
            <button onClick={handleWithdraw} style={{ marginTop: "10px", padding: "6px 14px", backgroundColor: "#059669", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: 800, fontSize: "0.75rem", cursor: "pointer" }}>
              Request Bank Payout
            </button>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>My Current Rank</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#7c3aed" }}>{rootUser.rank}</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>Direct Referrals: {rootUser.directReferrals} • Team: {rootUser.teamSize + currentNodes.length - treeNodes.length} Members</div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700, marginBottom: "4px" }}>Binary Business Volume (BV)</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Left Leg:</span>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#2563eb" }}>{rootUser.leftBV.toLocaleString("en-IN")} BV</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Right Leg:</span>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#d97706" }}>{rootUser.rightBV.toLocaleString("en-IN")} BV</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Structure Visualizer */}
      <main style={{ maxWidth: "1240px", margin: "24px auto", padding: "0 20px" }}>
        {modelType === "binary" ? (
          /* Binary Tree Visualizer */
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "30px 20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Interactive Binary Downline Tree</h2>
            <p style={{ color: "#64748b", margin: "0 0 24px", fontSize: "0.85rem" }}>Dual-leg balance matching ensures high pair commission payouts.</p>

            {/* Root Node */}
            <div style={{ display: "inline-block", backgroundColor: "#f5f3ff", border: "2px solid #7c3aed", borderRadius: "12px", padding: "12px 24px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(124,58,237,0.15)" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", fontWeight: 900 }}>
                👑
              </div>
              <div style={{ fontWeight: 900, fontSize: "1rem", color: "#0f172a" }}>{rootUser.name}</div>
              <span style={{ backgroundColor: "#7c3aed", color: "#ffffff", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>{rootUser.rank}</span>
            </div>

            {/* Level 1 Dual Legs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "800px", margin: "0 auto" }}>
              {currentNodes.filter((n) => n.level === 1).map((node) => (
                <div key={node.id} style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                  <span style={{ fontSize: "0.72rem", backgroundColor: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", fontWeight: 800, color: "#475569" }}>{node.leg} Leg</span>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0f172a", marginTop: "6px" }}>{node.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 700 }}>{node.rank}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>Downline: {node.teamCount} Associates</div>
                </div>
              ))}
            </div>

            {/* Level 2 Sub Legs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", maxWidth: "900px", margin: "20px auto 0" }}>
              {currentNodes.filter((n) => n.level >= 2).map((node) => (
                <div key={node.id} style={{ backgroundColor: "#ffffff", border: "1px dashed #cbd5e1", borderRadius: "8px", padding: "10px", fontSize: "0.78rem" }}>
                  <div style={{ fontWeight: 800, color: "#0f172a" }}>{node.name}</div>
                  <div style={{ color: "#64748b" }}>{node.rank}</div>
                  <div style={{ color: "#059669", fontWeight: 700 }}>Active ({node.leg})</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Star Base Matrix Model */
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "30px 20px" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>5-Star Direct Affiliate Matrix</h2>
            <p style={{ color: "#64748b", margin: "0 0 20px", fontSize: "0.85rem" }}>Earn flat 15% direct royalties across 5 star levels with depth infinity pools.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: "12px", padding: "18px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "2px", color: "#d97706", marginBottom: "8px" }}>
                    {Array.from({ length: star }).map((_, i) => (<Star key={i} size={16} fill="#d97706" />))}
                  </div>
                  <div style={{ fontWeight: 900, fontSize: "1rem", color: "#92400e" }}>Star Level {star}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>Royalty: {18 - star * 2}% Direct Payout</div>
                  <div style={{ marginTop: "10px", fontSize: "0.75rem", backgroundColor: "#ffffff", padding: "4px", borderRadius: "6px", fontWeight: 700, color: "#16a34a" }}>
                    ✓ Qualified Active Tier
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sponsor Associate Modal */}
      {activeTab === "register" && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveTab("tree")}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Sponsor New Associate</h3>
            <p style={{ color: "#7c3aed", fontWeight: 700, margin: "0 0 16px" }}>Direct Sponsor: Anand Singhal (Crown Diamond)</p>
            <form onSubmit={handleRegisterAssociate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Associate Full Name *" value={newAssociateName} onChange={(e) => setNewAssociateName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={newAssociatePhone} onChange={(e) => setNewAssociatePhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Binary Placement Leg</label>
                <select value={chosenLeg} onChange={(e) => setChosenLeg(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option value="Left">Left Leg (Power Leg)</option>
                  <option value="Right">Right Leg (Profit Leg)</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setActiveTab("tree")} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Place in Downline</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
