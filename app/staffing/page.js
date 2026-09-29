"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  Clock,
  Phone,
  Search,
  Filter,
  Plus,
  Users,
  Award,
} from "lucide-react";
import { staffingData } from "@/data/businessAppsData";

export default function StaffingApp() {
  const { agencyInfo, jobCategories, candidates } = staffingData;
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeHireModal, setActiveHireModal] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [hireConfirmed, setHireConfirmed] = useState(null);
  const [candidateList, setCandidateList] = useState(candidates);

  // Hire Form
  const [employerName, setEmployerName] = useState("");
  const [employerPhone, setEmployerPhone] = useState("");
  const [dutyLocation, setDutyLocation] = useState("");
  const [shiftType, setShiftType] = useState("Day Shift (9 AM – 6 PM)");

  // Apply Form
  const [applyName, setApplyName] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyCategory, setApplyCategory] = useState("Security Guards");
  const [applyExp, setApplyExp] = useState("3 Years");

  const filteredCandidates = candidateList.filter((c) => {
    if (selectedCat !== "All" && c.category !== selectedCat) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.skills.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    }
    return true;
  });

  const handleHireSubmit = (e) => {
    e.preventDefault();
    if (!employerName || !employerPhone) return;
    setHireConfirmed({
      candidate: activeHireModal.name,
      role: activeHireModal.category,
      employer: employerName,
      phone: employerPhone,
      location: dutyLocation,
      shift: shiftType,
    });
    setActiveHireModal(null);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyName || !applyPhone) return;
    const newCand = {
      id: `STF-${Math.floor(300 + Math.random() * 500)}`,
      name: applyName,
      category: applyCategory,
      experience: applyExp,
      age: 29,
      salaryPerMonth: 15000,
      verified: true,
      skills: "Background Check in Progress • Ready to Join",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    };
    setCandidateList([newCand, ...candidateList]);
    setShowApplyModal(false);
    alert("Application submitted! Our operations team will call you within 2 hours for document verification.");
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0fdfa", borderBottom: "1px solid #ccfbf1", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#0f766e", fontWeight: 700 }}>
        <span>🛡️ 100% Police Verified &amp; Aadhaar Authenticated Staff • Instant Replacement Guarantee • Call: {agencyInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#0f766e", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#0f766e", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Briefcase size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{agencyInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{agencyInfo.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            style={{ backgroundColor: "#0f766e", color: "#ffffff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={16} /> Job Seeker? Apply Here
          </button>
        </div>
      </header>

      {/* Hire Confirmed Banner */}
      {hireConfirmed && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Hiring Request Registered! Staff "{hireConfirmed.candidate}" assigned to {hireConfirmed.employer} ({hireConfirmed.shift}). Deployment manager will contact {hireConfirmed.phone}.</span>
            </div>
            <button onClick={() => setHireConfirmed(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <section style={{ background: "linear-gradient(180deg, #f0fdfa 0%, #f8fafc 100%)", padding: "26px 20px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search staff by role or skills (e.g. Guard, Patient care, Cleaner)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
              />
            </div>
            <div style={{ display: "flex", gap: "6px", overflowX: "auto" }}>
              {jobCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: selectedCat === c ? "1px solid #0f766e" : "1px solid #cbd5e1",
                    backgroundColor: selectedCat === c ? "#0f766e" : "#ffffff",
                    color: selectedCat === c ? "#ffffff" : "#475569",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candidates Grid */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredCandidates.map((cand) => (
            <div key={cand.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
                <img src={cand.image} alt={cand.name} style={{ width: "65px", height: "65px", borderRadius: "12px", objectFit: "cover" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{cand.name}</h3>
                    <ShieldCheck size={16} color="#0f766e" title="Verified by Police & Aadhaar" />
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#0f766e", fontWeight: 700 }}>{cand.category}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Age: {cand.age} Yrs • Exp: {cand.experience}</div>
                </div>
              </div>

              <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", fontSize: "0.78rem", color: "#475569", marginBottom: "16px", flex: 1 }}>
                <strong>Key Skills:</strong> {cand.skills}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Monthly Salary:</span>
                  <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a" }}>₹{cand.salaryPerMonth.toLocaleString("en-IN")}</span>
                </div>
                <button
                  onClick={() => setActiveHireModal(cand)}
                  style={{ backgroundColor: "#0f766e", color: "#ffffff", border: "none", padding: "9px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Hire This Staff
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Hire Modal */}
      {activeHireModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveHireModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Hire Staff: {activeHireModal.name}</h3>
            <p style={{ color: "#0f766e", fontWeight: 700, margin: "0 0 16px" }}>{activeHireModal.category} • ₹{activeHireModal.salaryPerMonth}/mo</p>
            <form onSubmit={handleHireSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Employer / Company Name *" value={employerName} onChange={(e) => setEmployerName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={employerPhone} onChange={(e) => setEmployerPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Duty Location / Area (e.g. Swaroop Nagar) *" value={dutyLocation} onChange={(e) => setDutyLocation(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <select value={shiftType} onChange={(e) => setShiftType(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                <option>Day Shift (09:00 AM – 06:00 PM)</option>
                <option>Night Shift (08:00 PM – 08:00 AM)</option>
                <option>24 Hours Live-In Attendant</option>
              </select>
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setActiveHireModal(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#0f766e", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Deployment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowApplyModal(false)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Job Seeker Registration</h3>
            <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Your Full Name *" value={applyName} onChange={(e) => setApplyName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={applyPhone} onChange={(e) => setApplyPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <select value={applyCategory} onChange={(e) => setApplyCategory(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                <option value="Security Guards">Security Guards</option>
                <option value="Deep Cleaning">Deep Cleaning Staff</option>
                <option value="House Maid">House Maid &amp; Cook</option>
                <option value="Elder & Patient Care">Elder &amp; Patient Care</option>
              </select>
              <input type="text" placeholder="Total Experience (e.g. 4 Years)" value={applyExp} onChange={(e) => setApplyExp(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowApplyModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#0f766e", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
