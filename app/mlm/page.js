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
  CreditCard,
  Printer,
  ChevronRight,
  Search,
  Wallet,
  Building,
  Check,
  Sparkles,
  User,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { mlmData } from "@/data/businessAppsData";

export default function MlmApp() {
  const { networkInfo, rootUser, treeNodes: initialNodes, bonusTypes } = mlmData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "tree", "enroll", "wallet", "admin"
  const [currentRole, setCurrentRole] = useState("Leader"); // "Leader", "Finance", "Member", "Admin"
  const [modelType, setModelType] = useState("binary"); // "binary", "star"
  const [currentNodes, setCurrentNodes] = useState(initialNodes);
  const [userBalance, setUserBalance] = useState(rootUser.totalEarnings);
  const [searchTerm, setSearchTerm] = useState("");

  // New Associate Enrollment State
  const [newAssociateName, setNewAssociateName] = useState("");
  const [newAssociatePhone, setNewAssociatePhone] = useState("");
  const [newSponsorId, setNewSponsorId] = useState("STAR-001");
  const [chosenLeg, setChosenLeg] = useState("Left");
  const [starterPack, setStarterPack] = useState("Diamond Star Kit (₹10,000 - 500 BV)");
  const [enrollmentAlert, setEnrollmentAlert] = useState(null);

  // Commission Payout Billing / Advice State
  const [payoutMember, setPayoutMember] = useState(rootUser.name);
  const [payoutMemberId, setPayoutMemberId] = useState(rootUser.id);
  const [payoutGross, setPayoutGross] = useState(48500);
  const [payoutPan, setPayoutPan] = useState("ABCDE1234F");
  const [payoutBank, setPayoutBank] = useState("HDFC Bank • A/C 501002998811 • IFSC HDFC0000124");
  const [activePayoutModal, setActivePayoutModal] = useState(null);

  // Admin New Bonus Plan State
  const [newBonusName, setNewBonusName] = useState("");
  const [newBonusRate, setNewBonusRate] = useState("");

  // Filtered nodes
  const filteredNodes = currentNodes.filter((n) => {
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return n.name.toLowerCase().includes(q) || n.id.toLowerCase().includes(q) || n.rank.toLowerCase().includes(q);
    }
    return true;
  });

  // Handle Register Associate
  const handleRegisterAssociate = (e) => {
    e.preventDefault();
    if (!newAssociateName || !newAssociatePhone) return;

    const newNode = {
      id: `STAR-${Math.floor(100 + Math.random() * 900)}`,
      name: newAssociateName,
      rank: "Bronze Associate",
      leg: chosenLeg,
      level: 2,
      teamCount: 1,
      active: true,
    };

    setCurrentNodes([...currentNodes, newNode]);
    setUserBalance((prev) => prev + 1500);
    setEnrollmentAlert({
      node: newNode,
      pack: starterPack,
      bonus: 1500,
    });
    setNewAssociateName("");
    setNewAssociatePhone("");
  };

  // Calculations for Payout Tax Advice
  const tdsDeduction = Math.round(payoutGross * 0.05); // 5% TDS under 194H
  const adminHandling = Math.round(payoutGross * 0.05); // 5% System Handling
  const netBankPayout = payoutGross - tdsDeduction - adminHandling;

  const handleGeneratePayout = () => {
    const advice = {
      voucherNo: `STAR-PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      name: payoutMember,
      id: payoutMemberId,
      pan: payoutPan,
      bank: payoutBank,
      grossAmount: payoutGross,
      tds: tdsDeduction,
      adminFee: adminHandling,
      netAmount: netBankPayout,
    };
    setActivePayoutModal(advice);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f5f3ff", borderBottom: "1px solid #ede9fe", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#6d28d9", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Star size={16} color="#6d28d9" />
          <span>StarVenture Direct Selling Platform • MCA Compliant Guidelines 2021 • Automated BV Matching &amp; Instant Daily Bank IMPS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Affiliate Helpdesk: <strong>+91 96548 80240</strong></span>
          <Link href="/business-suite" style={{ color: "#6d28d9", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)" }}>
              <Network size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {networkInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {networkInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Network Overview" },
              { id: "tree", label: "Genealogy Tree Explorer" },
              { id: "enroll", label: "Enroll Downline" },
              { id: "wallet", label: "Commission Wallet POS" },
              { id: "admin", label: "Network Director Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "wallet") setCurrentRole("Finance");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("Leader");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #7c3aed" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#f5f3ff" : "transparent",
                  color: activeTab === t.id ? "#7c3aed" : "#475569",
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Role Switcher & Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#f1f5f9", padding: "4px 10px", borderRadius: "8px", fontSize: "0.8rem" }}>
              <span style={{ color: "#64748b" }}>Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Finance") setActiveTab("wallet");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("tree");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#7c3aed", outline: "none", cursor: "pointer" }}
              >
                <option value="Leader">Crown Ambassador (Leader)</option>
                <option value="Finance">Finance &amp; Payout Desk</option>
                <option value="Member">Downline Associate</option>
                <option value="Admin">Network Managing Director</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("enroll")}
              style={{
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Plus size={16} /> Enroll New Associate
            </button>
          </div>
        </div>
      </header>

      {/* Enrollment Alert */}
      {enrollmentAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>
                ✓ New Associate Enrolled! {enrollmentAlert.node.name} placed under {enrollmentAlert.node.leg} leg. Direct Referral Bonus of ₹{enrollmentAlert.bonus.toLocaleString()} credited to your active wallet!
              </span>
            </div>
            <button
              onClick={() => setEnrollmentAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: NETWORK OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f5f3ff", color: "#6d28d9", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Star size={16} /> Transparent Multi-Tier Direct Selling Platform
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Empowering Entrepreneurs With Dual-Tree &amp; Star Matrix Compensation
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Experience lightning-fast business volume calculations. Whether you build using Binary Left/Right matching or 5-Star Unilevel depth, our MCA-compliant engine guarantees real-time commissions, clear TDS deduction, and daily bank payouts.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("tree")}
                  style={{
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    padding: "12px 26px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
                  }}
                >
                  <GitFork size={18} /> Explore Downline Tree
                </button>
                <button
                  onClick={() => setActiveTab("wallet")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#7c3aed",
                    border: "1px solid #7c3aed",
                    padding: "12px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Wallet size={18} /> Payout &amp; Tax Receipt
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>₹3.42 Lakh+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Lifetime Royalties</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>148 Members</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Network Team</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Section 194H TDS Validated</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                alt="Entrepreneur Team Leadership"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#f5f3ff", color: "#7c3aed", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>Govt. Direct Selling Compliant</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>MCA Registered • Free Joining • Transparent BV</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Compensation */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Multi-Dimensional Income Streams
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Engineered for sustainable long-term affiliate growth and immediate retail liquidity.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <GitFork size={28} color="#7c3aed" />,
                  title: "Binary Pair Matching (10%)",
                  desc: "Earn 10% daily matched commission on your weaker business volume leg with zero BV flushing.",
                },
                {
                  icon: <Sparkles size={28} color="#7c3aed" />,
                  title: "Direct Sponsor Royalty (15%)",
                  desc: "Instant 15% upfront cash reward directly credited to your wallet whenever a personal downline enrols.",
                },
                {
                  icon: <Award size={28} color="#7c3aed" />,
                  title: "5-Star Matrix Generation",
                  desc: "Level 1 to 7 spillover rewards rewarding team mentorship and frontline duplicate expansion.",
                },
                {
                  icon: <ShieldCheck size={28} color="#7c3aed" />,
                  title: "Direct Bank IMPS & TDS Slip",
                  desc: "Automatic 5% Section 194H TDS withholding with official tax vouchers and IMPS bank transfer.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#f5f3ff", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Root User Dashboard Preview */}
          <section style={{ marginTop: "54px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "36px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase" }}>Your Live Leadership Account</span>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "2px 0 0" }}>{rootUser.name} ({rootUser.id})</h2>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Rank: <strong style={{ color: "#7c3aed" }}>{rootUser.rank}</strong></div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setActiveTab("tree")}
                  style={{ backgroundColor: "#7c3aed", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  View Downline Tree
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Total Wallet Earnings</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#7c3aed" }}>₹{userBalance.toLocaleString()}</div>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Left Leg Volume (BV)</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>{rootUser.leftBV.toLocaleString()} BV</div>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Right Leg Volume (BV)</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>{rootUser.rightBV.toLocaleString()} BV</div>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Direct Active Referrals</div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#16a34a" }}>{rootUser.directReferrals} Associates</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: GENEALOGY TREE EXPLORER */}
      {activeTab === "tree" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Genealogy Downline Explorer
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Interactive hierarchy tree with live business volume (BV) and active ranks
              </p>
            </div>

            {/* Model Mode Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ display: "flex", backgroundColor: "#f1f5f9", padding: "4px", borderRadius: "10px", gap: "4px" }}>
                <button
                  onClick={() => setModelType("binary")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: modelType === "binary" ? "#7c3aed" : "transparent",
                    color: modelType === "binary" ? "#ffffff" : "#475569",
                  }}
                >
                  Binary Tree (Left/Right)
                </button>
                <button
                  onClick={() => setModelType("star")}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: modelType === "star" ? "#7c3aed" : "transparent",
                    color: modelType === "star" ? "#ffffff" : "#475569",
                  }}
                >
                  5-Star Matrix View
                </button>
              </div>

              <button
                onClick={() => setActiveTab("enroll")}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Plus size={16} /> Add Placement
              </button>
            </div>
          </div>

          {/* Root Card */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", border: "2px solid #7c3aed", borderRadius: "14px", padding: "20px 32px", textAlign: "center", boxShadow: "0 4px 14px rgba(124, 58, 237, 0.15)", minWidth: "280px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#f5f3ff", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                <Star size={24} fill="#7c3aed" />
              </div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c3aed" }}>{rootUser.id}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a" }}>{rootUser.name}</div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", margin: "2px 0 8px" }}>{rootUser.rank}</div>
              <div style={{ fontSize: "0.75rem", backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "6px", color: "#334155", fontWeight: 600 }}>
                Left: {rootUser.leftBV} BV | Right: {rootUser.rightBV} BV
              </div>
            </div>
          </div>

          {/* Downline Nodes Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {filteredNodes.map((n) => (
              <div key={n.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed", backgroundColor: "#f5f3ff", padding: "2px 8px", borderRadius: "4px" }}>
                    {n.id}
                  </span>
                  <span style={{ backgroundColor: n.active ? "#f0fdf4" : "#fef2f2", color: n.active ? "#166534" : "#991b1b", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700 }}>
                    {n.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{n.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>Rank: <strong>{n.rank}</strong></div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "10px", backgroundColor: "#f8fafc", borderRadius: "8px", fontSize: "0.78rem", color: "#475569", marginTop: "auto" }}>
                  <div>
                    <div>Leg Position</div>
                    <strong style={{ color: "#7c3aed" }}>{n.leg}</strong>
                  </div>
                  <div>
                    <div>Team Count</div>
                    <strong style={{ color: "#0f172a" }}>{n.teamCount} Members</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: ENROLL DOWNLINE */}
      {activeTab === "enroll" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Enroll New Direct Seller Associate
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Sponsor registration, leg placement, and starter product package allocation
            </p>
          </div>

          <div style={{ maxWidth: "600px", backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <form onSubmit={handleRegisterAssociate}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Sponsor ID</label>
                <input
                  type="text"
                  value={newSponsorId}
                  onChange={(e) => setNewSponsorId(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem", backgroundColor: "#f8fafc" }}
                  readOnly
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Associate Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Srivastava"
                  value={newAssociateName}
                  onChange={(e) => setNewAssociateName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Aadhaar-Linked Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9839112233"
                  value={newAssociatePhone}
                  onChange={(e) => setNewAssociatePhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Tree Placement Leg</label>
                  <select
                    value={chosenLeg}
                    onChange={(e) => setChosenLeg(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="Left">Left Leg (Power Leg)</option>
                    <option value="Right">Right Leg (Profit Leg)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Starter Product Kit</label>
                  <select
                    value={starterPack}
                    onChange={(e) => setStarterPack(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="Diamond Star Kit (₹10,000 - 500 BV)">Diamond Kit (₹10,000 - 500 BV)</option>
                    <option value="Gold Starter Kit (₹5,000 - 250 BV)">Gold Kit (₹5,000 - 250 BV)</option>
                    <option value="Silver Basic Kit (₹2,500 - 100 BV)">Silver Kit (₹2,500 - 100 BV)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                Complete Enrollment &amp; Credit Direct Commission
              </button>
            </form>
          </div>
        </main>
      )}

      {/* TAB 4: COMMISSION WALLET POS & PAYOUT RECEIPT */}
      {activeTab === "wallet" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Commission Wallet &amp; Payout Advice POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Section 194H TDS deduction ledger, bank payment orders, and printable payout certificates
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#7c3aed" /> Affiliate Payout Parameters
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Member Full Name</label>
                  <input
                    type="text"
                    value={payoutMember}
                    onChange={(e) => setPayoutMember(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Affiliate ID</label>
                  <input
                    type="text"
                    value={payoutMemberId}
                    onChange={(e) => setPayoutMemberId(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Income Tax PAN</label>
                  <input
                    type="text"
                    value={payoutPan}
                    onChange={(e) => setPayoutPan(e.target.value.toUpperCase())}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Gross Royalties Disbursed (₹)</label>
                  <input
                    type="number"
                    value={payoutGross}
                    onChange={(e) => setPayoutGross(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Settlement Bank Account &amp; IFSC</label>
                <input
                  type="text"
                  value={payoutBank}
                  onChange={(e) => setPayoutBank(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <button
                onClick={handleGeneratePayout}
                style={{
                  width: "100%",
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Printer size={18} /> Review &amp; Print Commission Payout Voucher
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Tax &amp; Disbursement Calculation
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Gross Commission Balance</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{payoutGross.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#dc2626" }}>
                  <span>TDS Withholding (Section 194H 5%)</span>
                  <span style={{ fontWeight: 700 }}>-₹{tdsDeduction.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#dc2626" }}>
                  <span>System Administration Charge (5%)</span>
                  <span style={{ fontWeight: 700 }}>-₹{adminHandling.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Total Deductions</span>
                  <span style={{ fontWeight: 700, color: "#dc2626" }}>-₹{(tdsDeduction + adminHandling).toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #ede9fe", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#6d28d9", fontWeight: 600 }}>Net Disbursed to Bank Account</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed", marginTop: "4px" }}>
                    ₹{netBankPayout.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#8b5cf6", marginTop: "4px" }}>
                    *Form 16A quarterly TDS certificate will be issued to registered PAN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 5: NETWORK DIRECTOR ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Direct Selling Executive Director Admin
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Master compensation pools, legal direct selling compliance, and audit registers
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Network Associates</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed", marginTop: "4px" }}>
                {currentNodes.length + 1} Direct Sellers
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Cumulative Network BV</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                97,000 BV
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Payout Settlement SLA</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                Daily IMPS 24h
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Cumulative Commissions Paid</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed", marginTop: "4px" }}>
                ₹18.4 Lakh
              </div>
            </div>
          </div>
        </main>
      )}

      {/* PRINTABLE PAYOUT VOUCHER MODAL */}
      {activePayoutModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #7c3aed", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#7c3aed" }}>{networkInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>MCA Compliant Direct Selling Entity • CIN: U51909UP2021PTC148811</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>TAN: KNPA09981B • PAN: AABCS8899Q</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>COMMISSION ADVICE</div>
                <div style={{ fontSize: "0.82rem", color: "#7c3aed", fontWeight: 700 }}>{activePayoutModal.voucherNo}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activePayoutModal.date}</div>
              </div>
            </div>

            {/* Associate Details */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Affiliate Direct Seller</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activePayoutModal.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Associate ID: {activePayoutModal.id}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>PAN: {activePayoutModal.pan}</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Disbursement Channel</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>Direct IMPS Bank Transfer</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>{activePayoutModal.bank}</div>
              </div>
            </div>

            {/* Breakdown */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Earnings Particulars</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>Gross Affiliate Business Commission</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Binary Matching + Direct Sponsor Royalty + Star Matrix Pool</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activePayoutModal.grossAmount.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px", color: "#dc2626" }}>
                    <div style={{ fontWeight: 600 }}>TDS Withheld under Section 194H (5%)</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#dc2626" }}>-₹{activePayoutModal.tds.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px", color: "#dc2626" }}>
                    <div style={{ fontWeight: 600 }}>System Software &amp; Gateway Admin Fee (5%)</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#dc2626" }}>-₹{activePayoutModal.adminFee.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Net Bank Transfer:</span>
                <span style={{ fontWeight: 900, color: "#7c3aed" }}>₹{activePayoutModal.netAmount.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setActivePayoutModal(null)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 600, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: "#7c3aed",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Printer size={16} /> Print Official Payout Advice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0", marginTop: "60px", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "36px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Network size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{networkInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Direct Selling &amp; Affiliate Network Platform. Operating with transparent dual-engine binary and star matrix hierarchies in full compliance with Consumer Protection (Direct Selling) Rules, 2021.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#7c3aed", fontWeight: 600 }}>
              🛡️ MCA Direct Selling Registered • 100% Legal Direct Seller Network
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Compensation Models</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>10% Binary Weaker Leg Matching</li>
              <li>15% Direct Sponsor Cash Royalty</li>
              <li>7-Level 5-Star Spillover Matrix</li>
              <li>3% National Turnover Leadership Pool</li>
              <li>Car &amp; House Achievement Funds</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Statutory Compliance</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Zero Joining Fee Policy</li>
              <li>30-Day Product Buyback Guarantee</li>
              <li>Mandatory Section 194H TDS Fillings</li>
              <li>Consumer Affairs Grievance Redressal</li>
              <li>Grievance Officer Contact Available</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Corporate Desk</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 StarVenture Towers, Civil Lines, Kanpur</div>
              <div>📞 Toll-Free: <strong>+91 96548 80240</strong></div>
              <div>✉️ support@starventurenetwork.in</div>
              <div>⏰ Support Hours: 10:00 AM – 07:00 PM (Mon-Sat)</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {networkInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
