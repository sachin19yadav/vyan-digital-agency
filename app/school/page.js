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
} from "lucide-react";
import { schoolData } from "@/data/businessAppsData";

export default function SchoolApp() {
  const { schoolInfo, classes, feeHeads, sampleStudents } = schoolData;
  const [activeTab, setActiveTab] = useState("students"); // "students", "fees", "admission"
  const [students, setStudents] = useState(sampleStudents);
  const [searchTerm, setSearchTerm] = useState("");

  // New Admission state
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [admissionSuccess, setAdmissionSuccess] = useState(null);

  // Fee receipt state
  const [activeReceipt, setActiveReceipt] = useState(null);

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
    setAdmissionSuccess(newStudent);
    setStudentName("");
    setGuardianName("");
    setGuardianPhone("");
  };

  const handleGenerateFeeReceipt = (stu) => {
    const totalFee = feeHeads.reduce((a, b) => a + b.amount, 0);
    setActiveReceipt({
      receiptNo: `FEE-${Math.floor(1000 + Math.random() * 9000)}`,
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
      {/* Top Banner */}
      <div style={{ backgroundColor: "#eef2ff", borderBottom: "1px solid #c7d2fe", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#3730a3", fontWeight: 700 }}>
        <span>🎓 {schoolInfo.name} • Admissions Open for Academic Session 2026-27 • Office: {schoolInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#3730a3", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#4338ca", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{schoolInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{schoolInfo.tagline}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setActiveTab("students")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "students" ? "1px solid #4338ca" : "1px solid #cbd5e1", backgroundColor: activeTab === "students" ? "#eef2ff" : "#ffffff", color: activeTab === "students" ? "#4338ca" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Student Directory ({students.length})
            </button>
            <button onClick={() => setActiveTab("admission")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "admission" ? "1px solid #4338ca" : "1px solid #cbd5e1", backgroundColor: activeTab === "admission" ? "#eef2ff" : "#ffffff", color: activeTab === "admission" ? "#4338ca" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              New Admission Form
            </button>
            <button onClick={() => setActiveTab("fees")} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === "fees" ? "1px solid #4338ca" : "1px solid #cbd5e1", backgroundColor: activeTab === "fees" ? "#eef2ff" : "#ffffff", color: activeTab === "fees" ? "#4338ca" : "#475569", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              Fee Collection &amp; Receipt
            </button>
          </div>
        </div>
      </header>

      {/* Admission Alert */}
      {admissionSuccess && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Student Enrolled! Roll No: {admissionSuccess.rollNo} assigned to {admissionSuccess.name} ({admissionSuccess.class})!</span>
            </div>
            <button onClick={() => setAdmissionSuccess(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        {/* Student Directory Tab */}
        {activeTab === "students" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>Enrolled Students Roster</h2>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search student or class..."
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
                    <th style={{ padding: "10px 14px" }}>Roll No</th>
                    <th style={{ padding: "10px 14px" }}>Student Name</th>
                    <th style={{ padding: "10px 14px" }}>Grade / Class</th>
                    <th style={{ padding: "10px 14px" }}>Guardian</th>
                    <th style={{ padding: "10px 14px" }}>Attendance</th>
                    <th style={{ padding: "10px 14px" }}>Fee Status</th>
                    <th style={{ padding: "10px 14px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.rollNo} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 14px", fontWeight: 800 }}>{s.rollNo}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#0f172a" }}>{s.name}</td>
                      <td style={{ padding: "12px 14px" }}>{s.class}</td>
                      <td style={{ padding: "12px 14px", color: "#64748b" }}>{s.guardian} ({s.phone})</td>
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
        )}

        {/* New Admission Form Tab */}
        {activeTab === "admission" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Student Admission Form (Session 2026-27)</h2>
            <form onSubmit={handleRegisterAdmission} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Student Full Name *</label>
                <input type="text" placeholder="e.g. Kushagra Saxena" value={studentName} onChange={(e) => setStudentName(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Applying for Class *</label>
                  <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff" }}>
                    {classes.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Parent / Guardian Phone *</label>
                  <input type="tel" placeholder="98765 43210" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} required style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>Father / Mother Name</label>
                <input type="text" placeholder="Guardian Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <button type="submit" style={{ backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 900, cursor: "pointer", marginTop: "8px" }}>
                Submit &amp; Generate Roll Number
              </button>
            </form>
          </div>
        )}

        {/* Fee Collection & Printable Receipt Tab */}
        {activeTab === "fees" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>Official School Fee Counter &amp; Receipt</h2>
            {activeReceipt ? (
              <div style={{ border: "1px dashed #4338ca", padding: "20px", borderRadius: "12px", backgroundColor: "#fafaf9", fontFamily: "monospace" }}>
                <div style={{ textAlign: "center", fontWeight: 900, fontSize: "1.1rem" }}>{schoolInfo.name}</div>
                <div style={{ textAlign: "center", fontSize: "0.75rem", color: "#64748b" }}>Fee Receipt #: {activeReceipt.receiptNo} • Date: {activeReceipt.date}</div>
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
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: "1rem", color: "#4338ca", borderTop: "1px dashed #4338ca", paddingTop: "8px", marginTop: "8px" }}>
                  <span>TOTAL FEE PAID:</span>
                  <span>₹{activeReceipt.total}</span>
                </div>
                <button onClick={() => window.print()} style={{ width: "100%", backgroundColor: "#4338ca", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: 800, cursor: "pointer", marginTop: "14px" }}>
                  Print Official Fee Receipt
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                Select a student from the "Student Directory" tab to view and print their fee receipt.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
