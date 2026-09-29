"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Printer,
  DollarSign,
  Phone,
  Search,
  Plus,
  Award,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  ChevronRight,
  BookMarked,
} from "lucide-react";
import { schoolData } from "@/data/businessAppsData";

export default function SchoolApp() {
  const { schoolInfo, classes, feeHeads, sampleStudents } = schoolData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "students", "admission", "fees", "teachers", "admin"
  const [currentRole, setCurrentRole] = useState("Parent"); // "Parent", "Accounts", "Teacher", "Principal"
  const [students, setStudents] = useState(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");

  // New Admission State
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [admissionSuccessAlert, setAdmissionSuccessAlert] = useState(null);

  // Fee Receipt State
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Teachers State
  const [teachersList] = useState([
    { name: "Dr. Anamika Bajpai", subject: "Senior Physics (Class 11-12)", exp: "12 Yrs", status: "In Physics Lab" },
    { name: "Prof. R.K. Trivedi", subject: "Mathematics (Class 9-10)", exp: "15 Yrs", status: "Class 10-A" },
    { name: "Mrs. Sneha Sen", subject: "English Literature", exp: "9 Yrs", status: "Library" },
    { name: "Er. Deepak Sharma", subject: "Computer Science & AI", exp: "7 Yrs", status: "STEM Robotics Lab" },
  ]);

  const filteredStudents = students.filter((s) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.class.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q);
  });

  const handleRegisterAdmission = (e) => {
    e.preventDefault();
    if (!studentName || !guardianPhone) return;

    const newStudent = {
      rollNo: `STU-2026-${Math.floor(10 + Math.random() * 90)}`,
      name: studentName,
      class: selectedClass,
      guardian: guardianName || "Parent",
      phone: guardianPhone,
      feeStatus: "Paid (Admission)",
      attendance: "100%",
    };

    setStudents([newStudent, ...students]);
    setAdmissionSuccessAlert(newStudent);
    setStudentName("");
    setGuardianName("");
    setGuardianPhone("");
  };

  const handleGenerateFeeReceipt = (stu) => {
    const totalFee = feeHeads.reduce((a, b) => a + b.amount, 0);
    setActiveReceipt({
      receiptNo: `FEE-2609-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString(),
      student: stu.name,
      rollNo: stu.rollNo,
      grade: stu.class,
      guardian: stu.guardian,
      heads: feeHeads,
      total: totalFee,
    });
    setActiveTab("fees");
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div style={{ backgroundColor: "#eef2ff", borderBottom: "1px solid #c7d2fe", padding: "6px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#3730a3", fontWeight: 700, flexWrap: "wrap", gap: "8px" }}>
        <span>🎓 CBSE Affiliated Senior Secondary School (#2130894) • Admissions Open Session 2026-27!</span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Admissions Cell: <strong>{schoolInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#3730a3", textDecoration: "underline", fontWeight: 800 }}>
            ← All Business Apps Hub
          </Link>
        </div>
      </div>

      {/* 2. DEDICATED SCHOOL HEADER */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(67,56,202,0.06)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => setActiveTab("landing")}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "#4338ca", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(67,56,202,0.3)" }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{schoolInfo.name}</h1>
                <span style={{ backgroundColor: "#eef2ff", color: "#4338ca", padding: "2px 8px", borderRadius: "10px", fontSize: "0.7rem", fontWeight: 800 }}>CBSE ACCREDITED</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{schoolInfo.tagline} • Kalyanpur, Kanpur</p>
            </div>
          </div>

          {/* Role Switcher & Admission CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Active Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  const r = e.target.value;
                  setCurrentRole(r);
                  if (r === "Parent") setActiveTab("landing");
                  else if (r === "Accounts") setActiveTab("fees");
                  else if (r === "Teacher") setActiveTab("teachers");
                  else if (r === "Principal") setActiveTab("admin");
                }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #c7d2fe",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#4338ca",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Parent">👨‍👩‍👧 Parent &amp; Student Portal</option>
                <option value="Accounts">💳 Fee Accounts &amp; Billing Counter</option>
                <option value="Teacher">👩‍🏫 Teacher &amp; Timetable Desk</option>
                <option value="Principal">👑 Principal &amp; School Admin</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab("admission")}
              style={{
                backgroundColor: "#4338ca",
                color: "#ffffff",
                border: "none",
                padding: "9px 18px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "0.85rem",
                cursor: "pointer",
                boxShadow: "0 3px 12px rgba(67,56,202,0.3)",
              }}
            >
              Apply for Admission
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "6px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", gap: "8px", overflowX: "auto" }}>
            {[
              { id: "landing", label: "Academy Home" },
              { id: "students", label: "Student Roster" },
              { id: "admission", label: "New Admission Form" },
              { id: "fees", label: "Fee Counter & Receipt" },
              { id: "teachers", label: "Teacher & Class Desk" },
              { id: "admin", label: "Principal Admin Portal" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: activeTab === tab.id ? "1px solid #4338ca" : "1px solid transparent",
                  backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
                  color: activeTab === tab.id ? "#4338ca" : "#64748b",
                  fontWeight: activeTab === tab.id ? 800 : 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Admission Success Alert */}
      {admissionSuccessAlert && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Student Enrolled Successfully! Roll Number #{admissionSuccessAlert.rollNo} allocated to {admissionSuccessAlert.name} ({admissionSuccessAlert.class})!</span>
            </div>
            <button onClick={() => setAdmissionSuccessAlert(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* 3. TABS CONTENT */}
      <main>
        {/* A. LANDING PAGE TAB */}
        {activeTab === "landing" && (
          <div>
            {/* Hero */}
            <section style={{ background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)", padding: "50px 20px 60px", borderBottom: "1px solid #c7d2fe" }}>
              <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#e0e7ff", color: "#3730a3", padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 800, marginBottom: "16px" }}>
                    <BookOpen size={14} />
                    <span>NURTURING GLOBAL LEADERS &amp; ETHICAL CITIZENS</span>
                  </div>
                  <h1 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-1px" }}>
                    Academic Excellence, STEM Innovation &amp; Holistic Character Building
                  </h1>
                  <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                    Affiliated to CBSE, Delhi Public Global Academy offers experiential education from Pre-Nursery to Grade 12 with state-of-the-art AI robotics labs, interactive digital smart classes, national-level athletics tracks, and individualized mentor guidance.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveTab("admission")}
                      style={{ backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "12px 26px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(67,56,202,0.35)" }}
                    >
                      <span>Online Admission 2026-27</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      onClick={() => setActiveTab("students")}
                      style={{ backgroundColor: "#ffffff", color: "#4338ca", border: "2px solid #4338ca", padding: "12px 24px", borderRadius: "10px", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
                    >
                      View Student Portal
                    </button>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                    alt="School Students in Library"
                    style={{ width: "100%", height: "380px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 10px 30px rgba(67,56,202,0.15)" }}
                  />
                  <div style={{ position: "absolute", bottom: "-14px", left: "20px", backgroundColor: "#ffffff", padding: "12px 20px", borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: "12px", border: "1px solid #c7d2fe" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#eef2ff", color: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Award size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: "0.95rem", color: "#0f172a" }}>100% CBSE Board Pass Rate</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Ranked #1 Senior Academy in Region</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quality Pillars */}
            <section style={{ maxWidth: "1240px", margin: "40px auto", padding: "0 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {[
                  { title: "STEM Robotics & AI Lab", desc: "Hands-on coding, 3D printing and astronomical telescope labs for young innovators.", icon: Sparkles },
                  { title: "Olympic Sports Complex", desc: "Cricket academy, semi-Olympic swimming pool, tennis and synthetic athletic tracks.", icon: Award },
                  { title: "Smart GPS Bus Fleet", desc: "Live parent app tracking, CCTV on-board and verified lady attendants in every bus.", icon: ShieldCheck },
                  { title: "1:20 Teacher-Student Ratio", desc: "Personalized attention ensuring no student is left behind in conceptual clarity.", icon: Users },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#eef2ff", color: "#4338ca", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                        <Icon size={20} />
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{p.title}</h3>
                      <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Academic Programs */}
            <section style={{ maxWidth: "1240px", margin: "50px auto", padding: "0 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "#4338ca", fontWeight: 800, textTransform: "uppercase" }}>Curriculum Pathways</span>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", margin: "4px 0" }}>Academic Wings &amp; Classes</h2>
                </div>
                <button onClick={() => setActiveTab("admission")} style={{ backgroundColor: "transparent", border: "none", color: "#4338ca", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Admission Guidelines</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {[
                  { wing: "Early Childhood (Pre-Nur to KG)", age: "Age 2.5 - 5 Yrs", focus: "Montessori sensory learning, phonics, motor skills and playful exploration." },
                  { wing: "Primary Wing (Class 1 to 5)", age: "Age 6 - 10 Yrs", focus: "Foundational numeracy, bilingual literacy, environmental sciences and arts." },
                  { wing: "Middle Wing (Class 6 to 8)", age: "Age 11 - 13 Yrs", focus: "Conceptual STEM integration, logic olympiads, foreign languages and sports." },
                  { wing: "Senior Wing (Class 9 to 12)", age: "Age 14 - 18 Yrs", focus: "CBSE Board preparation, Medical (NEET), Engineering (JEE) and Commerce career labs." },
                ].map((w, idx) => (
                  <div key={idx} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#eef2ff", color: "#4338ca", padding: "2px 8px", borderRadius: "6px", fontWeight: 800, alignSelf: "flex-start", marginBottom: "8px" }}>{w.age}</span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>{w.wing}</h3>
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 16px", flex: 1, lineHeight: 1.5 }}>{w.focus}</p>
                    <button onClick={() => setActiveTab("admission")} style={{ backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "8px", borderRadius: "6px", fontWeight: 800, fontSize: "0.8rem", cursor: "pointer" }}>Enroll Student</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* B. STUDENT ROSTER TAB */}
        {activeTab === "students" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Enrolled Student Master Directory</h2>
                  <p style={{ color: "#64748b", margin: 0, fontSize: "0.85rem" }}>View roll numbers, class sections, parent contact, and live attendance.</p>
                </div>
                <div style={{ position: "relative", minWidth: "260px" }}>
                  <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    placeholder="Search by student name or roll..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#eef2ff", borderBottom: "2px solid #c7d2fe", textAlign: "left" }}>
                      <th style={{ padding: "10px 14px" }}>Roll Number</th>
                      <th style={{ padding: "10px 14px" }}>Student Full Name</th>
                      <th style={{ padding: "10px 14px" }}>Grade / Class</th>
                      <th style={{ padding: "10px 14px" }}>Guardian Details</th>
                      <th style={{ padding: "10px 14px" }}>Attendance</th>
                      <th style={{ padding: "10px 14px" }}>Quarter Fee Status</th>
                      <th style={{ padding: "10px 14px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.rollNo} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "12px 14px", fontWeight: 900, color: "#4338ca" }}>{s.rollNo}</td>
                        <td style={{ padding: "12px 14px", fontWeight: 800, color: "#0f172a" }}>{s.name}</td>
                        <td style={{ padding: "12px 14px", color: "#475569" }}>{s.class}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <div>{s.guardian}</div>
                          <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.phone}</div>
                        </td>
                        <td style={{ padding: "12px 14px", color: "#16a34a", fontWeight: 800 }}>{s.attendance}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ backgroundColor: s.feeStatus.includes("Paid") ? "#dcfce7" : "#fee2e2", color: s.feeStatus.includes("Paid") ? "#15803d" : "#dc2626", padding: "3px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 800 }}>
                            {s.feeStatus}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <button onClick={() => handleGenerateFeeReceipt(s)} style={{ backgroundColor: "#eef2ff", color: "#4338ca", border: "1px solid #c7d2fe", padding: "5px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                            Fee Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* C. NEW ADMISSION FORM TAB */}
        {activeTab === "admission" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #c7d2fe", padding: "28px", boxShadow: "0 4px 16px rgba(67,56,202,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 6px" }}>Student Admission Form (Session 2026-27)</h2>
              <p style={{ color: "#64748b", margin: "0 0 20px", fontSize: "0.85rem" }}>Fill the details below to complete online registration and generate roll number.</p>

              <form onSubmit={handleRegisterAdmission} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Student Full Name *</label>
                  <input type="text" placeholder="e.g. Kushagra Saxena" value={studentName} onChange={(e) => setStudentName(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Grade Applying For *</label>
                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}>
                      {classes.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Parent Mobile *</label>
                    <input type="tel" placeholder="98765 43210" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: "4px" }}>Father / Mother Full Name</label>
                  <input type="text" placeholder="Guardian Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>

                <button type="submit" style={{ backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: 900, fontSize: "0.95rem", cursor: "pointer", marginTop: "10px" }}>
                  Submit Admission &amp; Allocate Roll Number
                </button>
              </form>
            </div>
          </div>
        )}

        {/* D. FEE COUNTER & RECEIPT TAB */}
        {activeTab === "fees" && (
          <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #c7d2fe", padding: "28px", boxShadow: "0 4px 16px rgba(67,56,202,0.06)" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Official School Fee Counter &amp; Receipt</h2>

              {activeReceipt ? (
                <div style={{ border: "1px dashed #4338ca", padding: "20px", borderRadius: "12px", backgroundColor: "#fafaf9", fontFamily: "monospace" }}>
                  <div style={{ textAlign: "center", fontWeight: 900, fontSize: "1.1rem" }}>{schoolInfo.name}</div>
                  <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>CBSE Affiliation #2130894 • Receipt #: {activeReceipt.receiptNo} • Date: {activeReceipt.date}</div>
                  <hr style={{ margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                    <span>Student: <strong>{activeReceipt.student}</strong></span>
                    <span>Roll: {activeReceipt.rollNo}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>Class: {activeReceipt.grade} • Guardian: {activeReceipt.guardian}</div>
                  <hr style={{ margin: "10px 0" }} />
                  {activeReceipt.heads.map((h, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                      <span>{h.name}</span>
                      <span>₹{h.amount}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1.05rem", color: "#4338ca", borderTop: "1px dashed #4338ca", paddingTop: "8px", marginTop: "8px" }}>
                    <span>TOTAL QUARTER FEE PAID:</span>
                    <span>₹{activeReceipt.total}</span>
                  </div>
                  <button onClick={() => window.print()} style={{ width: "100%", backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer", marginTop: "14px" }}>
                    Print Official School Receipt
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  <p>Select a student from the Student Roster to generate official quarterly receipt.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* E. TEACHER & CLASS DESK TAB */}
        {activeTab === "teachers" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Faculty Department &amp; Class Schedule Desk</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {teachersList.map((t, idx) => (
                <div key={idx} style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0f172a" }}>{t.name}</div>
                  <div style={{ color: "#4338ca", fontWeight: 700, fontSize: "0.85rem", marginTop: "2px" }}>{t.subject}</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", margin: "8px 0" }}>Experience: {t.exp}</div>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                    <span style={{ fontSize: "0.75rem", backgroundColor: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "6px", fontWeight: 800 }}>● {t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* F. PRINCIPAL ADMIN PORTAL TAB */}
        {activeTab === "admin" && (
          <div style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", margin: "0 0 20px" }}>Principal Executive Administration Desk</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Total Enrolled Students</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#4338ca" }}>1,480 Students</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Overall Student Attendance</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a" }}>94.2%</div>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>Quarter Fee Realization</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a" }}>91.8%</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. DEDICATED SCHOOL FOOTER */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "2px solid #4338ca", marginTop: "60px", padding: "40px 20px 20px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px", marginBottom: "30px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0f172a", margin: "0 0 10px" }}>{schoolInfo.name}</h3>
            <p style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, margin: "0 0 12px" }}>
              CBSE Affiliated Senior Secondary School preparing students with intellectual rigor, STEM robotics and moral uprightness.
            </p>
            <div style={{ fontSize: "0.82rem", color: "#4338ca", fontWeight: 700 }}>Office Hotline: {schoolInfo.phone}</div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>School Hours</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>
              <div>Summer Timings: 07:30 AM – 01:30 PM</div>
              <div>Winter Timings: 08:30 AM – 02:30 PM</div>
              <div>Parent-Teacher Interaction: Every Saturday 09:00 AM – 12:00 PM</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>Campus Address</h4>
            <div style={{ fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5 }}>
              <div>{schoolInfo.address}</div>
              <div style={{ marginTop: "6px", color: "#16a34a", fontWeight: 700 }}>✓ CBSE Affiliation Number: 2130894</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", textAlign: "center", fontSize: "0.78rem", color: "#94a3b8" }}>
          © {new Date().getFullYear()} {schoolInfo.name}. All Rights Reserved. • Designed in Pure Light Mode.
        </div>
      </footer>
    </div>
  );
}
