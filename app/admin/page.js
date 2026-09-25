"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Users,
  DollarSign,
  TrendingUp,
  Wallet,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  RefreshCw,
  Edit2,
  Check,
  ExternalLink,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Loader2,
  Settings,
} from "lucide-react";

export default function AdminCRMPage() {
  const [pinInput, setPinInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [crmData, setCrmData] = useState(null); // { partners, referrals, metrics, config }
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Tabs: "partners" | "referrals" | "sheets" | "settings"
  const [activeTab, setActiveTab] = useState("partners");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartnerFilter, setSelectedPartnerFilter] = useState("ALL");

  // Edit / Payout Modal state
  const [actionModal, setActionModal] = useState(null); // { referral, payoutStatus, transactionRef, status }
  const [sheetUrlInput, setSheetUrlInput] = useState("");

  // Check saved session PIN on load
  useEffect(() => {
    const savedPin = sessionStorage.getItem("vyan_admin_pin");
    if (savedPin) {
      setPinInput(savedPin);
      fetchAdminData(savedPin);
    }
  }, []);

  async function fetchAdminData(pinToUse) {
    const p = pinToUse || pinInput;
    if (!p) return;
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch(`/api/crm?action=admin&pin=${encodeURIComponent(p)}`);
      const json = await res.json();

      if (res.ok && json.success) {
        setCrmData(json.data);
        setIsAuthenticated(true);
        sessionStorage.setItem("vyan_admin_pin", p);
        if (json.data.config?.googleSheetUrl) {
          setSheetUrlInput(json.data.config.googleSheetUrl);
        }
      } else {
        setIsAuthenticated(false);
        setStatusMessage({ ok: false, text: json.error || "Invalid PIN. Access denied." });
      }
    } catch (err) {
      setStatusMessage({ ok: false, text: "Error connecting to server. Please retry." });
    } finally {
      setLoading(false);
    }
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    fetchAdminData(pinInput);
  }

  function handleLogout() {
    sessionStorage.removeItem("vyan_admin_pin");
    setIsAuthenticated(false);
    setCrmData(null);
    setPinInput("");
  }

  async function handleUpdateStatus(referralId, newStatus, newPayoutStatus, txRef) {
    setLoading(true);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_status",
          pin: pinInput,
          data: {
            referralId,
            status: newStatus,
            payoutStatus: newPayoutStatus,
            transactionRef: txRef,
          },
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ ok: true, text: "Referral status updated & synced successfully!" });
        setActionModal(null);
        await fetchAdminData(pinInput);
      } else {
        setStatusMessage({ ok: false, text: json.error || "Update failed." });
      }
    } catch (err) {
      setStatusMessage({ ok: false, text: "Network error updating referral." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSheetUrl(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_config",
          pin: pinInput,
          data: { googleSheetUrl: sheetUrlInput },
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({ ok: true, text: "Google Sheet URL updated successfully!" });
        await fetchAdminData(pinInput);
      } else {
        setStatusMessage({ ok: false, text: json.error || "Failed to update config." });
      }
    } catch (err) {
      setStatusMessage({ ok: false, text: "Error saving Google Sheet URL." });
    } finally {
      setLoading(false);
    }
  }

  async function handleSyncToGoogleSheets() {
    setSyncing(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sync_sheets",
          pin: pinInput,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatusMessage({
          ok: true,
          text: "✅ Synced all partners and referrals to Google Sheet successfully!",
        });
      } else {
        setStatusMessage({ ok: false, text: json.error || "Google Sheet sync failed." });
      }
    } catch (err) {
      setStatusMessage({ ok: false, text: "Error dispatching sync to Google Sheet." });
    } finally {
      setSyncing(false);
    }
  }

  function exportCSV(type) {
    if (!crmData) return;
    let csvContent = "data:text/csv;charset=utf-8,";

    if (type === "partners") {
      csvContent += "ID,Name,Mobile,Email,City,UPI_ID,Referral_Code,Referred_By,Total_Referrals,Total_Earned,Paid_Out,Pending_Payout,Status,Joined_At\n";
      crmData.partners.forEach((p) => {
        csvContent += `"${p.id}","${p.name}","${p.mobile}","${p.email}","${p.city}","${p.upiId}","${p.referralCode}","${p.referredBy}",${p.totalReferrals},${p.totalEarned},${p.paidOut},${p.pendingPayout},"${p.status}","${p.joinedAt}"\n`;
      });
    } else {
      csvContent += "ID,Referrer_Code,Referrer_Name,Referee_Name,Referee_Mobile,Status,Reward,Payout_Status,Transaction_Ref,Joined_At\n";
      crmData.referrals.forEach((r) => {
        csvContent += `"${r.id}","${r.referrerCode}","${r.referrerName}","${r.refereeName}","${r.refereeMobile}","${r.status}",${r.reward},"${r.payoutStatus}","${r.transactionRef}","${r.joinedAt}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vyan_${type}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filter partners
  const filteredPartners = crmData?.partners.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.mobile.includes(q) ||
      p.referralCode.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.referredBy.toLowerCase().includes(q)
    );
  });

  // Filter referrals
  const filteredReferrals = crmData?.referrals.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      r.refereeName.toLowerCase().includes(q) ||
      r.refereeMobile.includes(q) ||
      r.referrerName.toLowerCase().includes(q) ||
      r.referrerCode.toLowerCase().includes(q);

    if (selectedPartnerFilter === "ALL") return matchSearch;
    return matchSearch && r.referrerCode === selectedPartnerFilter;
  });

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 36 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <ShieldCheck size={14} style={{ color: "var(--accent)" }} />
            <span>Admin Control Center</span>
          </div>
          <h1>Referral Program CRM</h1>
          <p className="lead" style={{ margin: "0 auto 16px" }}>
            Trace, track and manage all users who joined the referral program, audit referral trees,
            approve commissions, and sync with your Google Spreadsheet.
          </p>

          {isAuthenticated && (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "#4CAF7D", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <CheckCircle2 size={15} /> Authenticated as Administrator
              </span>
              <button
                type="button"
                onClick={handleLogout}
                style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--text-muted)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", cursor: "pointer" }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 1200 }}>
          {statusMessage && (
            <div
              style={{
                marginBottom: 24,
                padding: "14px 18px",
                borderRadius: "var(--radius-sm)",
                background: statusMessage.ok ? "rgba(76, 175, 125, 0.12)" : "rgba(235, 87, 87, 0.12)",
                border: `1px solid ${statusMessage.ok ? "rgba(76, 175, 125, 0.3)" : "rgba(235, 87, 87, 0.3)"}`,
                color: statusMessage.ok ? "#4CAF7D" : "#EB5757",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.92rem",
              }}
            >
              {statusMessage.ok ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* ADMIN PASSCODE LOGIN VIEW */}
          {!isAuthenticated && (
            <div className="modern-card" style={{ maxWidth: 440, margin: "0 auto", padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div className="icon-box" style={{ margin: 0 }}>
                  <Lock size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.35rem", margin: 0 }}>Admin Authentication</h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                    Enter admin passcode to manage referral CRM
                  </p>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                      Admin PIN / Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter admin passcode"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "1rem" }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 6, display: "block" }}>
                      Default passcode: <code style={{ color: "var(--accent)" }}>vyan@2026</code>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "13px" }}
                  >
                    {loading ? <Loader2 size={18} className="spin" /> : <span>Unlock Admin CRM</span>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* AUTHENTICATED ADMIN DASHBOARD VIEW */}
          {isAuthenticated && crmData && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* 5 KPI Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
                <div className="modern-card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Users size={18} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Total Partners
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>
                    {crmData.metrics.totalPartners}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Registered Users</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <TrendingUp size={18} style={{ color: "#4CAF7D" }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Total Referrals
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#4CAF7D" }}>
                    {crmData.metrics.totalReferrals}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Conversions Tracked</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <DollarSign size={18} style={{ color: "var(--text)" }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Total Commission
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>
                    ₹{crmData.metrics.totalEarned.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Value Created</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Clock size={18} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Pending Payouts
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--accent)" }}>
                    ₹{crmData.metrics.totalPending.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Ready to Disburse</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Wallet size={18} style={{ color: "#4CAF7D" }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Commission Paid
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#4CAF7D" }}>
                    ₹{crmData.metrics.totalPaidOut.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Transferred to Partners</span>
                </div>
              </div>

              {/* Action & Tab Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 8, background: "var(--bg-alt)", padding: "4px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("partners")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      background: activeTab === "partners" ? "var(--accent)" : "transparent",
                      color: activeTab === "partners" ? "#0F1320" : "var(--text-muted)",
                    }}
                  >
                    All Partners ({crmData.partners.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("referrals")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      background: activeTab === "referrals" ? "var(--accent)" : "transparent",
                      color: activeTab === "referrals" ? "#0F1320" : "var(--text-muted)",
                    }}
                  >
                    Referrals &amp; Conversions ({crmData.referrals.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("sheets")}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      background: activeTab === "sheets" ? "var(--accent)" : "transparent",
                      color: activeTab === "sheets" ? "#0F1320" : "var(--text-muted)",
                    }}
                  >
                    Google Sheet Sync
                  </button>
                </div>

                {/* Right utility buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={handleSyncToGoogleSheets}
                    disabled={syncing}
                    className="btn btn-secondary"
                    style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                  >
                    <RefreshCw size={14} className={syncing ? "spin" : ""} />
                    <span>{syncing ? "Syncing..." : "Sync Google Sheet"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => exportCSV(activeTab === "referrals" ? "referrals" : "partners")}
                    className="btn btn-secondary"
                    style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ position: "relative" }}>
                <Search size={18} style={{ position: "absolute", left: 14, top: 12, color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search by Partner Name, Mobile, Referral Code, City or Referred By..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px 10px 42px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem" }}
                />
              </div>

              {/* TAB 1: ALL PARTNERS TABLE */}
              {activeTab === "partners" && (
                <div className="modern-card" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Registered Referral Partners ({filteredPartners?.length})</h3>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Every user who has registered and generated a unique code
                    </span>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                      <thead>
                        <tr style={{ background: "rgba(15, 19, 32, 0.6)", borderBottom: "1px solid var(--line)" }}>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Partner Name</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Mobile</th>
                          <th style={{ padding: "12px 18px", color: "var(--accent)" }}>Referral Code</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Referred By</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Referrals Made</th>
                          <th style={{ padding: "12px 18px", color: "#4CAF7D" }}>Total Earned</th>
                          <th style={{ padding: "12px 18px", color: "var(--accent)" }}>Pending Payout</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>UPI ID</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPartners?.map((p) => (
                          <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
                            <td style={{ padding: "14px 18px", fontWeight: 600 }}>
                              <div>{p.name}</div>
                              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>{p.city}</span>
                            </td>
                            <td style={{ padding: "14px 18px", color: "var(--text)", fontFamily: "monospace" }}>
                              <a href={`tel:+91${p.mobile}`} style={{ color: "var(--text)", textDecoration: "none" }}>
                                +91 {p.mobile}
                              </a>
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.04em" }}>
                              {p.referralCode}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              {p.referredBy === "DIRECT" ? (
                                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Direct (Organic)</span>
                              ) : (
                                <span style={{ fontSize: "0.82rem", color: "var(--accent)", fontWeight: 600 }}>
                                  {p.referredBy}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 600, textAlign: "center" }}>
                              {p.totalReferrals || 0}
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "#4CAF7D" }}>
                              ₹{(p.totalEarned || 0).toLocaleString("en-IN")}
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: (p.pendingPayout || 0) > 0 ? "var(--accent)" : "var(--text-muted)" }}>
                              ₹{(p.pendingPayout || 0).toLocaleString("en-IN")}
                            </td>
                            <td style={{ padding: "14px 18px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                              {p.upiId || "Not provided"}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPartnerFilter(p.referralCode);
                                  setActiveTab("referrals");
                                }}
                                className="btn btn-secondary"
                                style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                              >
                                View Referrals ({p.totalReferrals || 0})
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: REFERRAL LEADS & CONVERSIONS TABLE */}
              {activeTab === "referrals" && (
                <div className="modern-card" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", margin: 0 }}>
                        Referral Conversions Audit Trail ({filteredReferrals?.length})
                      </h3>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Trace who referred whom &amp; manage payouts
                      </span>
                    </div>

                    {selectedPartnerFilter !== "ALL" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
                          Filtered by Referrer: <strong>{selectedPartnerFilter}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedPartnerFilter("ALL")}
                          style={{ background: "none", border: "1px solid var(--line)", color: "var(--text-muted)", padding: "2px 8px", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", cursor: "pointer" }}
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                      <thead>
                        <tr style={{ background: "rgba(15, 19, 32, 0.6)", borderBottom: "1px solid var(--line)" }}>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>#</th>
                          <th style={{ padding: "12px 18px", color: "var(--text)" }}>New User (Referee)</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Contact Phone</th>
                          <th style={{ padding: "12px 18px", color: "var(--accent)" }}>Referred By (Partner)</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Joined Date</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Status</th>
                          <th style={{ padding: "12px 18px", color: "#4CAF7D" }}>Reward</th>
                          <th style={{ padding: "12px 18px", color: "var(--accent)" }}>Payout Status</th>
                          <th style={{ padding: "12px 18px", color: "var(--text-muted)" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReferrals?.map((r, idx) => (
                          <tr key={r.id} style={{ borderBottom: "1px solid var(--line)" }}>
                            <td style={{ padding: "14px 18px", color: "var(--text-muted)" }}>{idx + 1}</td>
                            <td style={{ padding: "14px 18px", fontWeight: 600 }}>{r.refereeName}</td>
                            <td style={{ padding: "14px 18px", fontFamily: "monospace" }}>+91 {r.refereeMobile}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <strong style={{ color: "var(--text)" }}>{r.referrerName}</strong>
                              <div style={{ fontSize: "0.75rem", color: "var(--accent)" }}>{r.referrerCode}</div>
                            </td>
                            <td style={{ padding: "14px 18px", color: "var(--text-muted)" }}>
                              {new Date(r.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "3px 10px",
                                  borderRadius: "100px",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  background: r.status === "Enrolled" ? "rgba(76, 175, 125, 0.15)" : "rgba(217, 164, 65, 0.15)",
                                  color: r.status === "Enrolled" ? "#4CAF7D" : "var(--accent)",
                                }}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "#4CAF7D" }}>
                              ₹{r.reward}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <span
                                style={{
                                  fontWeight: 600,
                                  fontSize: "0.8rem",
                                  color: r.payoutStatus === "Paid" ? "#4CAF7D" : "var(--accent)",
                                }}
                              >
                                {r.payoutStatus}
                              </span>
                              {r.transactionRef && (
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                                  {r.transactionRef}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <button
                                type="button"
                                onClick={() =>
                                  setActionModal({
                                    referral: r,
                                    status: r.status,
                                    payoutStatus: r.payoutStatus,
                                    transactionRef: r.transactionRef || "",
                                  })
                                }
                                className="btn btn-secondary"
                                style={{ padding: "4px 10px", fontSize: "0.75rem" }}
                              >
                                Edit / Pay
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: GOOGLE SHEETS SETUP & CONFIG */}
              {activeTab === "sheets" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div className="modern-card" style={{ padding: 32 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div className="icon-box" style={{ margin: 0 }}>
                        <FileSpreadsheet size={22} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Google Sheet Integration Settings</h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                          Auto-sync registered referral partners and referral logs to your Google Spreadsheet.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveSheetUrl}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                            Google Apps Script Web App URL
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://script.google.com/macros/s/.../exec"
                            value={sheetUrlInput}
                            onChange={(e) => setSheetUrlInput(e.target.value)}
                            style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem" }}
                          />
                        </div>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ padding: "10px 20px" }}
                          >
                            Save Web App URL
                          </button>
                          <button
                            type="button"
                            onClick={handleSyncToGoogleSheets}
                            disabled={syncing}
                            className="btn btn-whatsapp"
                            style={{ padding: "10px 20px" }}
                          >
                            <RefreshCw size={15} className={syncing ? "spin" : ""} />
                            <span>{syncing ? "Syncing Now..." : "Push All Data to Google Sheet"}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Google Apps Script Code Template Card */}
                  <div className="modern-card" style={{ padding: 32, background: "rgba(15, 19, 32, 0.6)" }}>
                    <h3 style={{ fontSize: "1.15rem", marginBottom: 8, color: "var(--accent)" }}>
                      📋 All-in-One Apps Script Code for &quot;Vyan Digital - Enq&quot;
                    </h3>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 16 }}>
                      In your spreadsheet <strong>Vyan Digital - Enq</strong>, click <strong>Extensions ➔ Apps Script</strong>, paste this code, and deploy with access: <strong>Anyone</strong>.
                      It preserves your contact form leads in <code>Sheet1</code> while automatically creating and updating <code>Referral_Partners</code> and <code>Referrals_Log</code>!
                    </p>

                    <pre
                      style={{
                        background: "#080B12",
                        padding: "16px 20px",
                        borderRadius: "var(--radius-sm)",
                        overflowX: "auto",
                        fontSize: "0.82rem",
                        color: "#EDEFF5",
                        border: "1px solid var(--line)",
                        maxHeight: "360px",
                      }}
                    >
{`function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Vyan Digital Agency (Contact Form + Referral CRM) Web App is active!"
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss;
    try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (err) {}
    if (!ss) { ss = SpreadsheetApp.openById("1Un3cTHkAWHaEP-DNHbhIEsIUT1sGpizwI0TPGDmObRY"); }

    var payload = {};
    if (e && e.postData && e.postData.contents) {
      try { payload = JSON.parse(e.postData.contents); } catch (err) { payload = e.parameter || {}; }
    } else if (e && e.parameter) { payload = e.parameter; }

    // CASE 1: REFERRAL CRM DATA
    if (payload.action) {
      var action = payload.action;
      var data = payload.data || {};

      var partnersSheet = ss.getSheetByName("Referral_Partners");
      if (!partnersSheet) {
        partnersSheet = ss.insertSheet("Referral_Partners");
        partnersSheet.appendRow(["Timestamp", "Partner ID", "Name", "Mobile", "City", "UPI ID", "Referral Code", "Referred By"]);
        partnersSheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#D9A441");
      }

      var referralsSheet = ss.getSheetByName("Referrals_Log");
      if (!referralsSheet) {
        referralsSheet = ss.insertSheet("Referrals_Log");
        referralsSheet.appendRow(["Timestamp", "Referrer Code", "Referrer Name", "Referee Name", "Referee Mobile", "Status", "Reward (INR)", "Payout Status", "Transaction Ref"]);
        referralsSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#D9A441");
      }

      if (action === "REGISTER_PARTNER") {
        var p = data.partner;
        partnersSheet.appendRow([new Date(), p.id, p.name, p.mobile, p.city, p.upiId || "", p.referralCode, p.referredBy]);
        if (data.referral) {
          var r = data.referral;
          referralsSheet.appendRow([new Date(), r.referrerCode, r.referrerName, r.refereeName, r.refereeMobile, r.status, r.reward, r.payoutStatus, r.transactionRef || ""]);
        }
      } else if (action === "UPDATE_REFERRAL_STATUS") {
        var r = data.referral;
        referralsSheet.appendRow([new Date(), r.referrerCode, (data.partner ? data.partner.name : ""), r.refereeName, r.refereeMobile, r.status + " (UPDATED)", r.reward, r.payoutStatus, r.transactionRef || ""]);
      } else if (action === "SYNC_ALL") {
        if (data.partners) {
          data.partners.forEach(function(p) {
            partnersSheet.appendRow([new Date(), p.id, p.name, p.mobile, p.city, p.upiId || "", p.referralCode, p.referredBy]);
          });
        }
        if (data.referrals) {
          data.referrals.forEach(function(r) {
            referralsSheet.appendRow([new Date(), r.referrerCode, r.referrerName, r.refereeName, r.refereeMobile, r.status, r.reward, r.payoutStatus, r.transactionRef || ""]);
          });
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "crm" })).setMimeType(ContentService.MimeType.JSON);
    }

    // CASE 2: WEBSITE CONTACT FORM LEAD (Stores into Sheet1)
    var contactSheet = ss.getSheetByName("Sheet1") || ss.getSheetByName("Contact_Enquiries") || ss.getSheets()[0];
    if (contactSheet.getLastRow() === 0) {
      contactSheet.appendRow(["Timestamp", "Name", "Mobile", "Service"]);
      contactSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#D9A441");
    }

    contactSheet.appendRow([new Date(), payload.name || "", payload.mobile || "", payload.service || ""]);
    return ContentService.createTextOutput(JSON.stringify({ result: "success", type: "contact_enquiry" })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EDIT & PAYOUT MODAL */}
          {actionModal && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                padding: 16,
              }}
            >
              <div className="modern-card" style={{ maxWidth: 500, width: "100%", padding: 32 }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: 12 }}>
                  Update Referral &amp; Payout
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 18 }}>
                  Referee: <strong>{actionModal.referral.refereeName}</strong> • Referrer: <strong>{actionModal.referral.referrerName}</strong> ({actionModal.referral.referrerCode})
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>
                      Conversion Status
                    </label>
                    <select
                      value={actionModal.status}
                      onChange={(e) => setActionModal({ ...actionModal, status: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem" }}
                    >
                      <option value="Joined - Pending Course">Joined - Pending Course</option>
                      <option value="Enrolled">Enrolled (Verified Student/Client)</option>
                      <option value="Cancelled / Inactive">Cancelled / Inactive</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>
                      Payout Status
                    </label>
                    <select
                      value={actionModal.payoutStatus}
                      onChange={(e) => setActionModal({ ...actionModal, payoutStatus: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem" }}
                    >
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Approved - Unpaid">Approved - Unpaid</option>
                      <option value="Paid">Paid (Money Transferred)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 4 }}>
                      Transaction / UPI Reference ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UPI/26092048912/ROH or UTR"
                      value={actionModal.transactionRef}
                      onChange={(e) => setActionModal({ ...actionModal, transactionRef: e.target.value })}
                      style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(
                          actionModal.referral.id,
                          actionModal.status,
                          actionModal.payoutStatus,
                          actionModal.transactionRef
                        )
                      }
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      Save &amp; Update Payout
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionModal(null)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
