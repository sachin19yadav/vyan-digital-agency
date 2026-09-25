"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Users,
  Wallet,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Gift,
  QrCode,
  DollarSign,
  TrendingUp,
  UserCheck,
  ExternalLink,
  ChevronRight,
  LogOut,
  AlertCircle,
  Loader2,
} from "lucide-react";

function PortalContent() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") || "";

  // View mode: "dashboard" | "register" | "login"
  const [activeTab, setActiveTab] = useState(refParam ? "register" : "register");
  const [partnerData, setPartnerData] = useState(null); // { partner, referrals, stats }
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Forms
  const [registerForm, setRegisterForm] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "Kanpur",
    upiId: "",
    referredBy: refParam.toUpperCase(),
  });

  const [loginQuery, setLoginQuery] = useState("");

  // Update referredBy if refParam changes
  useEffect(() => {
    if (refParam) {
      setRegisterForm((f) => ({ ...f, referredBy: refParam.toUpperCase() }));
      setActiveTab("register");
    }
  }, [refParam]);

  // Check localStorage for saved session on load
  useEffect(() => {
    const savedCode = localStorage.getItem("vyan_partner_code");
    if (savedCode) {
      fetchPartnerProfile(savedCode, false);
    }
  }, []);

  async function fetchPartnerProfile(query, showToast = true) {
    if (!query) return;
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch(`/api/crm?action=partner&query=${encodeURIComponent(query.trim())}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setPartnerData(json.data);
        localStorage.setItem("vyan_partner_code", json.data.partner.referralCode);
        setActiveTab("dashboard");
        if (showToast) {
          setStatusMessage({ ok: true, text: `Welcome back, ${json.data.partner.name}!` });
        }
      } else {
        if (showToast) {
          setStatusMessage({ ok: false, text: json.error || "Partner not found. Please register." });
        }
      }
    } catch (err) {
      if (showToast) {
        setStatusMessage({ ok: false, text: "Network error fetching profile. Please retry." });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!registerForm.name.trim() || registerForm.mobile.replace(/\D/g, "").length !== 10) {
      setStatusMessage({ ok: false, text: "Please provide a valid Name and 10-digit Mobile number." });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          data: registerForm,
        }),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        localStorage.setItem("vyan_partner_code", json.partner.referralCode);
        // Refresh partner view
        await fetchPartnerProfile(json.partner.referralCode, false);
        if (json.isNew && typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "CompleteRegistration", {
            content_name: "Referral Partner",
          });
        }
        setActiveTab("dashboard");
        setStatusMessage({
          ok: true,
          text: json.isNew
            ? `🎉 Registered successfully! Your referral code is ${json.partner.referralCode}.`
            : "Welcome back! Retrieved your existing account.",
        });
      } else {
        setStatusMessage({ ok: false, text: json.error || "Registration failed. Try again." });
      }
    } catch (err) {
      setStatusMessage({ ok: false, text: "Connection error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!loginQuery.trim()) {
      setStatusMessage({ ok: false, text: "Please enter your Mobile number or Referral Code." });
      return;
    }
    await fetchPartnerProfile(loginQuery, true);
  }

  function handleLogout() {
    localStorage.removeItem("vyan_partner_code");
    setPartnerData(null);
    setActiveTab("login");
    setStatusMessage({ ok: true, text: "Logged out successfully." });
  }

  function copyToClipboard(text, isLink = false) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (isLink) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    }
  }

  const referralLink =
    typeof window !== "undefined" && partnerData?.partner
      ? `${window.location.origin}/portal?ref=${partnerData.partner.referralCode}`
      : `https://www.vyandigitalagency.com/portal?ref=${partnerData?.partner?.referralCode || ""}`;

  const whatsappShareText = encodeURIComponent(
    `Namaste! Join Vyan Digital Agency's Social Media & Business Growth Program. Use my referral link to get started and earn ₹1,000 for every referral:\n👉 ${referralLink}`
  );

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 40 }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 840, margin: "0 auto" }}>
          <div className="live-badge" style={{ marginBottom: 12 }}>
            <Gift size={14} style={{ color: "var(--accent)" }} />
            <span>Earn ₹1,000 Per Enrolled Referral</span>
          </div>
          <h1>Referral Partner Portal</h1>
          <p className="lead" style={{ margin: "0 auto 20px" }}>
            Get your unique referral link, invite friends or business owners to Vyan Digital Agency,
            and track your self-referred contacts and live payouts in real time.
          </p>

          {/* Navigation Pill Switcher */}
          {!partnerData && (
            <div style={{ display: "inline-flex", background: "var(--bg-alt)", padding: "4px", borderRadius: "100px", border: "1px solid var(--line)" }}>
              <button
                type="button"
                onClick={() => { setActiveTab("register"); setStatusMessage(null); }}
                style={{
                  padding: "8px 22px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: activeTab === "register" ? "var(--accent)" : "transparent",
                  color: activeTab === "register" ? "#0F1320" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Join as New Partner
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("login"); setStatusMessage(null); }}
                style={{
                  padding: "8px 22px",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: activeTab === "login" ? "var(--accent)" : "transparent",
                  color: activeTab === "login" ? "#0F1320" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                Sign In to Dashboard
              </button>
            </div>
          )}

          {partnerData && (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Signed in as: <strong style={{ color: "var(--accent)" }}>{partnerData.partner.name}</strong> ({partnerData.partner.referralCode})
              </span>
              <button
                type="button"
                onClick={handleLogout}
                style={{ background: "transparent", border: "1px solid var(--line)", color: "var(--text-muted)", padding: "4px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
              >
                <LogOut size={13} />
                <span>Switch Account</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 1000 }}>
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
              {statusMessage.ok ? <Check size={18} /> : <AlertCircle size={18} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* VIEW 1: REGISTRATION TAB */}
          {!partnerData && activeTab === "register" && (
            <div className="modern-card" style={{ maxWidth: 640, margin: "0 auto", padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div className="icon-box" style={{ margin: 0 }}>
                  <Gift size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.35rem", margin: 0 }}>Register as Referral Partner</h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                    Instant code generation • No fees • Earn ₹1,000 per referral
                  </p>
                </div>
              </div>

              <form onSubmit={handleRegister}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.95rem" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit number"
                        value={registerForm.mobile}
                        onChange={(e) => setRegisterForm({ ...registerForm, mobile: e.target.value })}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.95rem" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Kanpur / Lucknow"
                        value={registerForm.city}
                        onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.95rem" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                      UPI ID for Payouts (Optional, can add later)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@paytm or name@okaxis"
                      value={registerForm.upiId}
                      onChange={(e) => setRegisterForm({ ...registerForm, upiId: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.95rem" }}
                    />
                  </div>

                  <div style={{ background: "rgba(217, 164, 65, 0.08)", border: "1px dashed rgba(217, 164, 65, 0.35)", borderRadius: "var(--radius-sm)", padding: "14px 16px" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)", marginBottom: 4 }}>
                      Referred by (Referral Code)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. VYAN-R7K9 (leave blank if direct)"
                      value={registerForm.referredBy}
                      onChange={(e) => setRegisterForm({ ...registerForm, referredBy: e.target.value.toUpperCase() })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.9rem", textTransform: "uppercase" }}
                    />
                    {registerForm.referredBy && (
                      <span style={{ fontSize: "0.78rem", color: "#4CAF7D", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                        <Check size={12} /> Connected to Referrer: {registerForm.referredBy}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1rem", marginTop: 8 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="spin" />
                        <span>Generating Code &amp; Registering...</span>
                      </>
                    ) : (
                      <>
                        <span>Get My Unique Referral Code</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 2: LOGIN TAB */}
          {!partnerData && activeTab === "login" && (
            <div className="modern-card" style={{ maxWidth: 520, margin: "0 auto", padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div className="icon-box" style={{ margin: 0 }}>
                  <UserCheck size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.35rem", margin: 0 }}>Partner Portal Login</h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                    Access your referral link, earnings &amp; referred users
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>
                      Enter Registered Mobile Number or Referral Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 9876543210 or VYAN-R7K9"
                      value={loginQuery}
                      onChange={(e) => setLoginQuery(e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg)", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.95rem" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "13px" }}
                  >
                    {loading ? <Loader2 size={18} className="spin" /> : <span>Open Partner Dashboard</span>}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    Not a partner yet?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      style={{ background: "none", border: "none", color: "var(--accent)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
                    >
                      Register here in 30 seconds
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 3: PARTNER LIVE DASHBOARD */}
          {partnerData && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Partner Card: Referral Code & Link Box */}
              <div
                className="modern-card"
                style={{
                  padding: 32,
                  background: "linear-gradient(145deg, #171E33 0%, #111524 100%)",
                  border: "1px solid rgba(217, 164, 65, 0.4)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: 600 }}>
                      Official Referral Partner
                    </span>
                    <h2 style={{ fontSize: "1.6rem", margin: "4px 0 6px" }}>{partnerData.partner.name}</h2>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", margin: 0 }}>
                      City: {partnerData.partner.city} • Mobile: +91 {partnerData.partner.mobile} • Payout UPI: {partnerData.partner.upiId || "Not set yet"}
                    </p>
                  </div>

                  {/* Share on WhatsApp Direct CTA */}
                  <a
                    href={`https://wa.me/?text=${whatsappShareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-icon"
                    style={{ padding: "12px 20px", fontSize: "0.95rem" }}
                  >
                    <MessageCircle size={18} />
                    <span>Share on WhatsApp</span>
                  </a>
                </div>

                {/* Referral Code & Share Link Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 24 }}>
                  {/* Code Box */}
                  <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "16px" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 6 }}>
                      Your Unique Referral Code
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.05em" }}>
                        {partnerData.partner.referralCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(partnerData.partner.referralCode, false)}
                        className="btn btn-secondary"
                        style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                      >
                        {copiedCode ? <Check size={14} style={{ color: "#4CAF7D" }} /> : <Copy size={14} />}
                        <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Link Box */}
                  <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: "16px" }}>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 6 }}>
                      Your Direct Invitation Link
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input
                        type="text"
                        readOnly
                        value={referralLink}
                        style={{ flex: 1, padding: "8px 10px", borderRadius: "var(--radius-sm)", background: "transparent", border: "1px solid var(--line)", color: "var(--text)", fontSize: "0.82rem", textOverflow: "ellipsis" }}
                      />
                      <button
                        type="button"
                        onClick={() => copyToClipboard(referralLink, true)}
                        className="btn btn-primary"
                        style={{ padding: "8px 14px", fontSize: "0.82rem", flexShrink: 0 }}
                      >
                        {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Financial & Conversion Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
                <div className="modern-card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Users size={18} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      People Referred
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>
                    {partnerData.stats.totalReferrals}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Joined via your link</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <DollarSign size={18} style={{ color: "#4CAF7D" }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Total Earned
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "#4CAF7D" }}>
                    ₹{partnerData.stats.totalEarned.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>₹1,000 per enrollment</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Clock size={18} style={{ color: "var(--accent)" }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Pending Payout
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--accent)" }}>
                    ₹{partnerData.stats.pendingPayout.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Awaiting bank/UPI transfer</span>
                </div>

                <div className="modern-card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <Wallet size={18} style={{ color: "var(--text)" }} />
                    <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                      Received / Paid Out
                    </span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>
                    ₹{partnerData.stats.paidOut.toLocaleString("en-IN")}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Deposited to your UPI</span>
                </div>
              </div>

              {/* TABLE: Self-Referred Persons Only */}
              <div className="modern-card" style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", margin: "0 0 4px" }}>My Referred Persons</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                      Trace and track only people who registered using your referral code ({partnerData.partner.referralCode}).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchPartnerProfile(partnerData.partner.referralCode, true)}
                    className="btn btn-secondary"
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                  >
                    Refresh List
                  </button>
                </div>

                {partnerData.referrals.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px", background: "var(--bg)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--line)" }}>
                    <Users size={36} style={{ color: "var(--text-muted)", marginBottom: 12 }} />
                    <h4 style={{ fontSize: "1.1rem", marginBottom: 6 }}>No Referrals Recorded Yet</h4>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", maxWidth: 440, margin: "0 auto 16px" }}>
                      Share your referral link on WhatsApp or social media. When someone joins with your code, they will immediately appear here.
                    </p>
                    <a
                      href={`https://wa.me/?text=${whatsappShareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ padding: "10px 18px", fontSize: "0.9rem" }}
                    >
                      <MessageCircle size={16} />
                      <span>Invite on WhatsApp Now</span>
                    </a>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--line)", background: "rgba(15, 19, 32, 0.4)" }}>
                          <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.82rem" }}>#</th>
                          <th style={{ padding: "12px 16px", color: "var(--text)", fontSize: "0.85rem" }}>Referred Person</th>
                          <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem" }}>Phone (Masked)</th>
                          <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem" }}>Joined Date</th>
                          <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem" }}>Status</th>
                          <th style={{ padding: "12px 16px", color: "var(--text)", fontSize: "0.85rem" }}>Reward</th>
                          <th style={{ padding: "12px 16px", color: "var(--accent)", fontSize: "0.85rem" }}>Payout</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partnerData.referrals.map((ref, idx) => (
                          <tr key={ref.id} style={{ borderBottom: "1px solid var(--line)" }}>
                            <td style={{ padding: "14px 16px", color: "var(--text-muted)" }}>{idx + 1}</td>
                            <td style={{ padding: "14px 16px", fontWeight: 600 }}>{ref.refereeName}</td>
                            <td style={{ padding: "14px 16px", color: "var(--text-muted)", fontFamily: "monospace" }}>
                              {ref.refereeMobileMasked}
                            </td>
                            <td style={{ padding: "14px 16px", color: "var(--text-muted)" }}>
                              {new Date(ref.joinedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "3px 10px",
                                  borderRadius: "100px",
                                  fontSize: "0.78rem",
                                  fontWeight: 600,
                                  background: ref.status.includes("Enrolled") ? "rgba(76, 175, 125, 0.15)" : "rgba(217, 164, 65, 0.15)",
                                  color: ref.status.includes("Enrolled") ? "#4CAF7D" : "var(--accent)",
                                }}
                              >
                                {ref.status}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px", fontWeight: 700, color: "#4CAF7D" }}>
                              ₹{ref.reward}
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span
                                style={{
                                  fontWeight: 600,
                                  fontSize: "0.82rem",
                                  color: ref.payoutStatus === "Paid" ? "#4CAF7D" : "var(--accent)",
                                }}
                              >
                                {ref.payoutStatus}
                              </span>
                              {ref.transactionRef && (
                                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                                  Ref: {ref.transactionRef}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Instructions and Help Box */}
              <div className="modern-card" style={{ padding: 24, background: "rgba(15, 19, 32, 0.5)" }}>
                <h4 style={{ fontSize: "1rem", marginBottom: 8, color: "var(--accent)" }}>
                  💡 How Does the Referral Payout Work?
                </h4>
                <ul style={{ paddingLeft: 20, color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                  <li>Share your unique code or link with students, creators, or local business owners.</li>
                  <li>When they enroll in our ₹1,999 Social Media &amp; Growth Course or digital services using your code, ₹1,000 reward is credited to your balance.</li>
                  <li>Our team verifies the enrollment and transfers your commission directly via UPI / Bank within 24 hours.</li>
                  <li>For payout queries, chat directly with admin on WhatsApp: <a href="https://wa.me/919654880240" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", fontWeight: 600 }}>+91 96548 80240</a>.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <Loader2 size={32} className="spin" style={{ color: "var(--accent)", margin: "0 auto 16px" }} />
          <p style={{ color: "var(--text-muted)" }}>Loading Partner Portal...</p>
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
