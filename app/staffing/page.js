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
  CreditCard,
  Printer,
  ChevronRight,
  MapPin,
  FileText,
  Star,
  Building,
  User,
  AlertCircle,
  Calendar,
  Layers,
  ArrowRight,
  Check,
  CheckSquare,
} from "lucide-react";
import { staffingData } from "@/data/businessAppsData";

export default function StaffingApp() {
  const { agencyInfo, jobCategories, candidates: initialCandidates } = staffingData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "catalog", "billing", "operations", "admin"
  const [currentRole, setCurrentRole] = useState("Employer"); // "Employer", "Billing", "Operations", "Admin"
  const [candidateList, setCandidateList] = useState(initialCandidates);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Hire Deployment Modal
  const [activeHireModal, setActiveHireModal] = useState(null);
  const [employerName, setEmployerName] = useState("");
  const [employerPhone, setEmployerPhone] = useState("");
  const [dutyLocation, setDutyLocation] = useState("");
  const [shiftType, setShiftType] = useState("Day Shift (9 AM – 6 PM)");
  const [hireConfirmedAlert, setHireConfirmedAlert] = useState(null);

  // Deployments / Operations Tracker
  const [deployments, setDeployments] = useState([
    {
      id: "DEP-401",
      staffName: "Rameshwar Yadav",
      category: "Security Guards",
      client: "Emerald Heights High-Rise Society",
      location: "VIP Road, Kanpur",
      shift: "Night Shift (8 PM - 8 AM)",
      status: "On Duty",
      contact: "9839112233",
    },
    {
      id: "DEP-402",
      staffName: "Sunita Devi",
      category: "Elder & Patient Care",
      client: "Dr. A. K. Kapoor Residence",
      location: "Swaroop Nagar, Kanpur",
      shift: "24-Hr Live-in Care",
      status: "Active Assisting",
      contact: "9876543210",
    },
    {
      id: "DEP-403",
      staffName: "Santosh Kumar",
      category: "Deep Cleaning",
      client: "Blue Horizon Corporate Park",
      location: "Mall Road IT Wing",
      shift: "Morning Shift (7 AM - 4 PM)",
      status: "On Duty",
      contact: "9818445566",
    },
  ]);

  // Billing POS / Contract Invoice State
  const [billClient, setBillClient] = useState("Emerald Heights Residents Welfare Association");
  const [billPhone, setBillPhone] = useState("9839112233");
  const [billAddress, setBillAddress] = useState("Tower B, VIP Road, Kanpur");
  const [billStaffCount, setBillStaffCount] = useState(4);
  const [billRatePerHead, setBillRatePerHead] = useState(16500);
  const [billServiceType, setBillServiceType] = useState("Trained Security Guard Services");
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Admin New Candidate State
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Security Guards");
  const [newExp, setNewExp] = useState("4 Years");
  const [newSalary, setNewSalary] = useState("16000");
  const [newSkills, setNewSkills] = useState("");
  const [newPhone, setNewPhone] = useState("");

  // Quick Apply Modal for Job Seekers
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyName, setApplyName] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyCategory, setApplyCategory] = useState("Security Guards");
  const [applyExp, setApplyExp] = useState("3 Years");

  // Filtering candidates
  const filteredCandidates = candidateList.filter((c) => {
    if (selectedCat !== "All" && c.category !== selectedCat) return false;
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.skills.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle Deploy Candidate
  const handleHireSubmit = (e) => {
    e.preventDefault();
    if (!employerName || !employerPhone || !dutyLocation) {
      alert("Please fill all deployment details.");
      return;
    }

    const newDep = {
      id: `DEP-${Math.floor(500 + Math.random() * 400)}`,
      staffName: activeHireModal.name,
      category: activeHireModal.category,
      client: employerName,
      location: dutyLocation,
      shift: shiftType,
      status: "Deployment Assigned",
      contact: employerPhone,
    };

    setDeployments([newDep, ...deployments]);
    setHireConfirmedAlert(newDep);
    setActiveHireModal(null);
    setEmployerName("");
    setEmployerPhone("");
    setDutyLocation("");
  };

  // Handle Job Seeker Apply
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyName || !applyPhone) return;

    const newCand = {
      id: `STF-${Math.floor(300 + Math.random() * 500)}`,
      name: applyName,
      category: applyCategory,
      experience: applyExp,
      age: 28,
      salaryPerMonth: 15500,
      verified: true,
      skills: "Police Verification Verified • Ready for Immediate Deployment",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    };

    setCandidateList([newCand, ...candidateList]);
    setShowApplyModal(false);
    setApplyName("");
    setApplyPhone("");
    alert("Application submitted! Our operations officer will schedule biometric verification.");
  };

  // Handle Admin Add Candidate
  const handleAdminAdd = (e) => {
    e.preventDefault();
    if (!newName || !newSalary) return;

    const cand = {
      id: `STF-${Math.floor(600 + Math.random() * 300)}`,
      name: newName,
      category: newCategory,
      experience: newExp,
      age: 30,
      salaryPerMonth: parseInt(newSalary) || 16000,
      verified: true,
      skills: newSkills || "Trained & Document Verified",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    };

    setCandidateList([cand, ...candidateList]);
    setNewName("");
    setNewSalary("");
    setNewSkills("");
    alert(`Candidate ${cand.name} added to live roster!`);
  };

  // Billing calculations
  const billGross = billStaffCount * billRatePerHead;
  const billMgmtFee = Math.round(billGross * 0.08); // 8% Agency Supervision & Replacement Insurance
  const billSubtotal = billGross + billMgmtFee;
  const billGst = Math.round(billSubtotal * 0.18); // 18% GST
  const billGrandTotal = billSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const inv = {
      invoiceNo: `PRATHAM-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      client: billClient,
      phone: billPhone,
      address: billAddress,
      serviceType: billServiceType,
      staffCount: billStaffCount,
      ratePerHead: billRatePerHead,
      grossAmount: billGross,
      mgmtFee: billMgmtFee,
      gst: billGst,
      totalAmount: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f0fdfa", borderBottom: "1px solid #ccfbf1", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ShieldCheck size={16} color="#0f766e" />
          <span>PSARA Registered Manpower Agency • 100% Police Verification &amp; Biometric Aadhaar Checked • 24/7 Replacement Guarantee</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Direct Helpline: <strong>{agencyInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#0f766e", textDecoration: "underline", fontWeight: 700 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          {/* Logo & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#0f766e", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(15, 118, 110, 0.2)" }}>
              <Briefcase size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {agencyInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {agencyInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Agency Overview" },
              { id: "catalog", label: "Find Staff" },
              { id: "billing", label: "Client Billing POS" },
              { id: "operations", label: "Deployment Desk" },
              { id: "admin", label: "Admin Portal" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "operations") setCurrentRole("Operations");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("Employer");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #0f766e" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#f0fdfa" : "transparent",
                  color: activeTab === t.id ? "#0f766e" : "#475569",
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
                  if (r === "Billing") setActiveTab("billing");
                  else if (r === "Operations") setActiveTab("operations");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("catalog");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#0f766e", outline: "none", cursor: "pointer" }}
              >
                <option value="Employer">Employer / Client</option>
                <option value="Billing">Billing Officer</option>
                <option value="Operations">Operations Supervisor</option>
                <option value="Admin">Agency Director</option>
              </select>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              style={{
                backgroundColor: "#0f766e",
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
              <UserCheck size={16} /> Job Seeker Apply
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Alert */}
      {hireConfirmedAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, color: "#166534", fontSize: "0.95rem" }}>
                ✓ Deployment Assigned Successfully!
              </div>
              <div style={{ fontSize: "0.85rem", color: "#15803d", marginTop: "4px" }}>
                Candidate <strong>{hireConfirmedAlert.staffName}</strong> ({hireConfirmedAlert.category}) has been dispatched to <strong>{hireConfirmedAlert.client}</strong> at {hireConfirmedAlert.location}. Ref: {hireConfirmedAlert.id}.
              </div>
            </div>
            <button
              onClick={() => setHireConfirmedAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: LANDING OVERVIEW */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#ccfbf1", color: "#0f766e", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <ShieldCheck size={16} /> Licensed &amp; Verified Manpower Bureau
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Verified Security Guards, Cleaners &amp; Patient Care For Your Home &amp; Enterprise
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Eliminate staffing headaches. Every guard, caregiver, and housekeeper undergoes strict police verification, biometric Aadhaar registration, and rigorous professional etiquette training before deployment.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("catalog")}
                  style={{
                    backgroundColor: "#0f766e",
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
                    boxShadow: "0 4px 12px rgba(15, 118, 110, 0.25)",
                  }}
                >
                  <Search size={18} /> Browse Available Staff
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#0f766e",
                    border: "1px solid #0f766e",
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
                  <CreditCard size={18} /> Generate Contract Bill
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0f766e" }}>1,200+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Active Deployments</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0f766e" }}>100%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Police Checked</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0f766e" }}>24 Hrs</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Replacement SLA</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1000&q=80"
                alt="Professional Uniformed Workforce"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>PSARA Licensed Agency</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Fully Compliant with Labour &amp; ESI/PF Acts</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Trust */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Enterprise Quality &amp; Domestic Peace of Mind
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Why residential towers, hospitals, factories, and homeowners trust Pratham Staffing.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <ShieldCheck size={28} color="#0f766e" />,
                  title: "100% Police & Biometric Check",
                  desc: "Criminal record verification, permanent address authentication, and Aadhaar linkage before placement.",
                },
                {
                  icon: <Clock size={28} color="#0f766e" />,
                  title: "24-Hour Immediate Replacement",
                  desc: "If any staff member takes unscheduled leave or is unsatisfactory, a trained replacement is sent within 24 hours.",
                },
                {
                  icon: <UserCheck size={28} color="#0f766e" />,
                  title: "Dedicated Field Supervisors",
                  desc: "Surprise midnight checks for guards and weekly quality inspections for facility maintenance teams.",
                },
                {
                  icon: <FileText size={28} color="#0f766e" />,
                  title: "Transparent GST Billing & ESI/PF",
                  desc: "Zero liability for employers. We handle payroll, provident funds, health insurance, and monthly tax invoicing.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#f0fdfa", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Ready-to-Deploy Staff */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Ready-to-Deploy Verified Profiles
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  Pre-interviewed candidates ready to join your premises immediately.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("catalog")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#0f766e",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View All {candidateList.length} Candidates <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {candidateList.slice(0, 4).map((c) => (
                <div key={c.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                  <div style={{ position: "relative" }}>
                    <img src={c.image} alt={c.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#0f766e", display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                      <CheckCircle2 size={14} color="#0f766e" /> Verified
                    </div>
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                      {c.category}
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>
                      Experience: <strong>{c.experience}</strong> • Age: <strong>{c.age} yrs</strong>
                    </div>
                    <div style={{ backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px", fontSize: "0.8rem", color: "#475569", marginBottom: "16px", minHeight: "44px" }}>
                      {c.skills}
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Monthly CTC</div>
                        <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a" }}>₹{c.salaryPerMonth.toLocaleString()}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveHireModal(c);
                        }}
                        style={{
                          backgroundColor: "#0f766e",
                          color: "#ffffff",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        Deploy Candidate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section style={{ marginTop: "54px", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "36px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                What Our Clients Say
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Trusted by 45+ Residential RWAs and 30+ Corporate Facilities
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", gap: "4px", color: "#eab308", marginBottom: "10px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                </div>
                <p style={{ fontSize: "0.88rem", color: "#334155", fontStyle: "italic", margin: "0 0 12px" }}>
                  "We outsourced our entire society security (12 guards) to Pratham. Their punctuality, biometric night checks, and smart uniform standards are truly commendable."
                </p>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>Col. R. K. Singhal (Retd.)</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>President, Emerald Heights RWA</div>
              </div>
              <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", gap: "4px", color: "#eab308", marginBottom: "10px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" />)}
                </div>
                <p style={{ fontSize: "0.88rem", color: "#334155", fontStyle: "italic", margin: "0 0 12px" }}>
                  "We needed a dedicated 24-hr patient caregiver for my elderly mother. Sunita ji was courteous, punctual, and well-trained in medical assistance. Superb peace of mind!"
                </p>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>Dr. Vandana Saxena</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Resident, Swaroop Nagar</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: FIND STAFF CATALOG */}
      {activeTab === "catalog" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Header & Search */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Available Verified Personnel
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Select category or search by skills to shortlist candidate profiles
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
                <input
                  type="text"
                  placeholder="Search name, skills, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 36px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.88rem",
                    backgroundColor: "#ffffff",
                    outline: "none",
                  }}
                />
              </div>

              <button
                onClick={() => setShowApplyModal(true)}
                style={{
                  backgroundColor: "#0f766e",
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
                <Plus size={16} /> Register New Worker
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {jobCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: selectedCat === cat ? "1px solid #0f766e" : "1px solid #cbd5e1",
                  backgroundColor: selectedCat === cat ? "#0f766e" : "#ffffff",
                  color: selectedCat === cat ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Candidates Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "24px" }}>
            {filteredCandidates.map((c) => (
              <div key={c.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ position: "relative" }}>
                  <img src={c.image} alt={c.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#0f766e", display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                    <ShieldCheck size={14} color="#0f766e" /> Police Verified
                  </div>
                  <div style={{ position: "absolute", bottom: "10px", left: "12px", backgroundColor: "rgba(15, 23, 42, 0.8)", color: "#ffffff", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600 }}>
                    ID: {c.id}
                  </div>
                </div>

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f766e", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                    {c.category}
                  </div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>
                    Exp: <strong>{c.experience}</strong> • Age: <strong>{c.age} Yrs</strong>
                  </div>

                  <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "0.82rem", color: "#475569", marginBottom: "16px", minHeight: "48px", border: "1px solid #f1f5f9" }}>
                    <strong>Specialization:</strong> {c.skills}
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Monthly CTC / Salary</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a" }}>₹{c.salaryPerMonth.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => setActiveHireModal(c)}
                      style={{
                        backgroundColor: "#0f766e",
                        color: "#ffffff",
                        border: "none",
                        padding: "9px 18px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Deploy Candidate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: CLIENT BILLING POS & CONTRACT INVOICE */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Manpower Billing &amp; GST Invoicing Desk
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate official monthly staffing billing slips, tax calculations, and printable contracts.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#0f766e" /> Client &amp; Manpower Contract Parameters
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Client / Society Name</label>
                  <input
                    type="text"
                    value={billClient}
                    onChange={(e) => setBillClient(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Phone / Contact Person</label>
                  <input
                    type="text"
                    value={billPhone}
                    onChange={(e) => setBillPhone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Deployment Site / Office Address</label>
                <input
                  type="text"
                  value={billAddress}
                  onChange={(e) => setBillAddress(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Service Category</label>
                  <select
                    value={billServiceType}
                    onChange={(e) => setBillServiceType(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  >
                    <option value="Trained Security Guard Services">Trained Security Guard Services</option>
                    <option value="Facility Deep Cleaning & Sanitation Crew">Facility Deep Cleaning & Sanitation Crew</option>
                    <option value="Elder & Bedridden Patient Caretaker">Elder & Bedridden Patient Caretaker</option>
                    <option value="Domestic Housemaid & Cooking Staff">Domestic Housemaid & Cooking Staff</option>
                    <option value="Office Support Peon & Pantry Boys">Office Support Peon & Pantry Boys</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Total Deployed Personnel</label>
                  <input
                    type="number"
                    min="1"
                    value={billStaffCount}
                    onChange={(e) => setBillStaffCount(parseInt(e.target.value) || 1)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Monthly Salary CTC per Head (₹)</label>
                <input
                  type="number"
                  step="500"
                  value={billRatePerHead}
                  onChange={(e) => setBillRatePerHead(parseInt(e.target.value) || 15000)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <button
                onClick={handleGenerateInvoice}
                style={{
                  width: "100%",
                  backgroundColor: "#0f766e",
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
                <Printer size={18} /> Review &amp; Generate Printable GST Tax Invoice
              </button>
            </div>

            {/* Live Calculation Preview */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Monthly Billing Summary
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Personnel Deployed</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>{billStaffCount} Persons ({billServiceType})</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Gross Staff Remuneration</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGross.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Agency Supervision &amp; Reliever Pool (8%)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billMgmtFee.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Goods &amp; Service Tax (18% GST)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#f0fdfa", border: "1px solid #ccfbf1", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#0f766e", fontWeight: 600 }}>Total Monthly Payable</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f766e", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#0d9488", marginTop: "4px" }}>
                    *Includes full ESI, PF, uniform allocation &amp; 24-hr replacement guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: OPERATIONS & DEPLOYMENT DESK */}
      {activeTab === "operations" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Active Deployments &amp; Muster Roll
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Real-time shift tracker, duty stations, and client site relief operations
              </p>
            </div>
            <div style={{ backgroundColor: "#f0fdfa", color: "#0f766e", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700 }}>
              Live Field Strength: {deployments.length} Active Posts
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Ref ID</th>
                  <th style={{ padding: "14px 20px" }}>Staff Member</th>
                  <th style={{ padding: "14px 20px" }}>Service Category</th>
                  <th style={{ padding: "14px 20px" }}>Deployment Client &amp; Location</th>
                  <th style={{ padding: "14px 20px" }}>Shift Timings</th>
                  <th style={{ padding: "14px 20px" }}>Duty Status</th>
                  <th style={{ padding: "14px 20px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d, idx) => (
                  <tr key={d.id} style={{ borderBottom: idx !== deployments.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f766e" }}>{d.id}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#0f172a" }}>{d.staffName}</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{d.category}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{d.client}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{d.location}</div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>{d.shift}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: d.status === "On Duty" ? "#f0fdf4" : "#fef3c7", color: d.status === "On Duty" ? "#166534" : "#92400e", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {d.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <button
                        onClick={() => {
                          const updated = deployments.map((item) =>
                            item.id === d.id
                              ? { ...item, status: item.status === "On Duty" ? "Relieved (Shift End)" : "On Duty" }
                              : item
                          );
                          setDeployments(updated);
                        }}
                        style={{
                          backgroundColor: "#f1f5f9",
                          border: "1px solid #cbd5e1",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          color: "#334155",
                        }}
                      >
                        Toggle Shift
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 5: ADMIN MANAGEMENT PORTAL */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Staffing Agency Master Control
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Workforce repository, candidate onboardings, and compliance auditing
            </p>
          </div>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Registered Staff</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f766e", marginTop: "4px" }}>
                {candidateList.length} Personnel
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Deployments</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                {deployments.length} Sites
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Police Verification Rate</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                100% Passed
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Est. Monthly Billing</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f766e", marginTop: "4px" }}>
                ₹{(deployments.length * 16500 * 1.08 * 1.18).toFixed(0)}
              </div>
            </div>
          </div>

          {/* Add Candidate Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#0f766e" /> Onboard New Worker to Roster
            </h2>

            <form onSubmit={handleAdminAdd} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Candidate Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Balram Singh"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Work Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {jobCategories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Monthly Expected Salary (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 16500"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Years Ex-Paramilitary"
                  value={newExp}
                  onChange={(e) => setNewExp(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Skills &amp; Special Equipment Experience</label>
                <input
                  type="text"
                  placeholder="e.g. Night Gate Monitoring, Biometric Scanners, Fire Extinguisher Trained"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ gridColumn: "span 3", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0f766e",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Save to Verified Database
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: DIRECT HIRE DEPLOYMENT */}
      {activeHireModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "520px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Deploy Candidate: {activeHireModal.name}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Role: <strong>{activeHireModal.category}</strong> • Base CTC: ₹{activeHireModal.salaryPerMonth.toLocaleString()}/mo
            </p>

            <form onSubmit={handleHireSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Employer / Establishment Name</label>
                <input
                  type="text"
                  placeholder="e.g. Horizon Towers RWA or Rohit Verma"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Contact Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9839112233"
                  value={employerPhone}
                  onChange={(e) => setEmployerPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Duty Location / Premise Address</label>
                <input
                  type="text"
                  placeholder="e.g. Civil Lines, Kanpur"
                  value={dutyLocation}
                  onChange={(e) => setDutyLocation(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Shift Preference</label>
                <select
                  value={shiftType}
                  onChange={(e) => setShiftType(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="Day Shift (9 AM – 6 PM)">Day Shift (9 AM – 6 PM)</option>
                  <option value="Night Shift (8 PM – 8 AM)">Night Shift (8 PM – 8 AM)</option>
                  <option value="24-Hr Live-In Support">24-Hr Live-In Support</option>
                  <option value="Rotational Shift (8 Hrs)">Rotational Shift (8 Hrs)</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setActiveHireModal(null)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#0f766e", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Confirm &amp; Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: JOB SEEKER APPLY */}
      {showApplyModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "480px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Join Pratham Workforce Network
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Free registration. Direct monthly salary into your bank account + ESI/PF coverage.
            </p>

            <form onSubmit={handleApplySubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Munna Lal"
                  value={applyName}
                  onChange={(e) => setApplyName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Mobile Number (Aadhaar Linked)</label>
                <input
                  type="tel"
                  placeholder="e.g. 9812345678"
                  value={applyPhone}
                  onChange={(e) => setApplyPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Job Category</label>
                <select
                  value={applyCategory}
                  onChange={(e) => setApplyCategory(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  <option value="Security Guards">Security Guards</option>
                  <option value="Deep Cleaning">Deep Cleaning</option>
                  <option value="House Maid">House Maid</option>
                  <option value="Elder & Patient Care">Elder & Patient Care</option>
                  <option value="Office Boy & Peon">Office Boy & Peon</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Years of Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Years"
                  value={applyExp}
                  onChange={(e) => setApplyExp(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#0f766e", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Invoice Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f766e", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f766e" }}>{agencyInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>PSARA Reg: PSARA/UP/KN/2022/8821 • GSTIN: 09AAACP9012M1Z8</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Helpline: {agencyInfo.phone} • Email: billing@prathamstaffing.com</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>TAX INVOICE</div>
                <div style={{ fontSize: "0.82rem", color: "#0f766e", fontWeight: 700 }}>{activeInvoiceModal.invoiceNo}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Billed To</div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.client}</div>
              <div style={{ fontSize: "0.85rem", color: "#475569" }}>Contact: {activeInvoiceModal.phone}</div>
              <div style={{ fontSize: "0.85rem", color: "#475569" }}>Site: {activeInvoiceModal.address}</div>
            </div>

            {/* Line Items */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Description</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Headcount</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Monthly Rate</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{activeInvoiceModal.serviceType}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Includes Police Verification &amp; Uniforms</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "center", fontWeight: 600 }}>{activeInvoiceModal.staffCount}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>₹{activeInvoiceModal.ratePerHead.toLocaleString()}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.grossAmount.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }} colSpan={3}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>Field Supervision, PF/ESI Administration &amp; Reliever Pool (8%)</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.mgmtFee.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            {/* Calculation Breakdown */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{(activeInvoiceModal.grossAmount + activeInvoiceModal.mgmtFee).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>GST (18%):</span>
                <span style={{ fontWeight: 700 }}>₹{activeInvoiceModal.gst.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Invoice Total:</span>
                <span style={{ fontWeight: 900, color: "#0f766e" }}>₹{activeInvoiceModal.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Terms & Actions */}
            <div style={{ fontSize: "0.75rem", color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: "12px", marginBottom: "24px" }}>
              *Payment due within 7 days of invoice submission. Cheques / NEFT in favour of "Pratham Staffing Services Private Limited".
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={() => setActiveInvoiceModal(null)}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", fontWeight: 600, cursor: "pointer" }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: "#0f766e",
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
                <Printer size={16} /> Print Official Invoice
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
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#0f766e", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={18} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{agencyInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              PSARA Registered Manpower solutions. Providing vetted, insured, and trained professionals for security, home care, deep cleaning, and administrative support.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#0f766e", fontWeight: 600 }}>
              🛡️ PSARA License # UP/KN/2022/8821 • ISO 9001:2015 Certified
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Workforce Categories</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Security Guards &amp; Gunmen</li>
              <li>Deep House &amp; Office Cleaning</li>
              <li>Bedridden &amp; Elderly Patient Care</li>
              <li>Housemaids &amp; Cooks</li>
              <li>Office Peons &amp; Messengers</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Legal &amp; Compliance</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Police Character Verification</li>
              <li>Biometric Aadhaar Records</li>
              <li>EPFO &amp; ESIC Statutory Fillings</li>
              <li>Minimum Wages Act Guarantee</li>
              <li>Third-Party Fidelity Insurance</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>24/7 Operations Hub</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 Pratham Tower, Civil Lines, Kanpur 208001</div>
              <div>📞 Helpline: <strong>{agencyInfo.phone}</strong></div>
              <div>✉️ ops@prathamstaffing.com</div>
              <div>⏰ 24/7 Operations &amp; Reliever Desk</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {agencyInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
