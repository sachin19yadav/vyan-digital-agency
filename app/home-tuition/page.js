"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Search,
  UserCheck,
  Plus,
  Award,
} from "lucide-react";
import { homeTuitionData } from "@/data/businessAppsData";

export default function HomeTuitionApp() {
  const { portalInfo, classes, tutors } = homeTuitionData;
  const [selectedClass, setSelectedClass] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDemoModal, setActiveDemoModal] = useState(null);
  const [showTutorRegisterModal, setShowTutorRegisterModal] = useState(false);
  const [demoConfirmed, setDemoConfirmed] = useState(null);
  const [tutorList, setTutorList] = useState(tutors);

  // Demo Booking Form
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentGrade, setStudentGrade] = useState("Class 10");
  const [homeAddress, setHomeAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-10-01");

  // Tutor Register Form
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [tutorQual, setTutorQual] = useState("");
  const [tutorSub, setTutorSub] = useState("");
  const [tutorFee, setTutorFee] = useState(500);

  const filteredTutors = tutorList.filter((t) => {
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.qualification.toLowerCase().includes(q);
    }
    return true;
  });

  const handleBookDemo = (e) => {
    e.preventDefault();
    if (!parentName || !parentPhone) return;
    setDemoConfirmed({
      tutor: activeDemoModal.name,
      parent: parentName,
      phone: parentPhone,
      grade: studentGrade,
      date: preferredDate,
    });
    setActiveDemoModal(null);
  };

  const handleRegisterTutor = (e) => {
    e.preventDefault();
    if (!tutorName || !tutorPhone) return;
    const newT = {
      id: `TUT-${Math.floor(10 + Math.random() * 90)}`,
      name: tutorName,
      qualification: tutorQual || "M.Sc / B.Ed",
      subject: tutorSub || "Mathematics & Science",
      experience: "3+ Years",
      hourlyFee: Number(tutorFee) || 500,
      rating: 5.0,
      studentsTaught: 1,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    };
    setTutorList([newT, ...tutorList]);
    setShowTutorRegisterModal(false);
    alert("Tutor Profile created! You can now receive home tuition requests in your locality.");
  };

  return (
    <div style={{ backgroundColor: "#faf5ff", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#f3e8ff", borderBottom: "1px solid #e9d5ff", padding: "6px 20px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#6b21a8", fontWeight: 700 }}>
        <span>📚 {portalInfo.name} • 100% Verified Subject Experts at Doorstep • Coordinator Hotline: {portalInfo.phone}</span>
        <Link href="/business-suite" style={{ color: "#6b21a8", textDecoration: "underline" }}>
          ← All Business Apps Hub
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 40, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0f172a", margin: 0 }}>{portalInfo.name}</h1>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{portalInfo.tagline}</p>
            </div>
          </div>

          <button
            onClick={() => setShowTutorRegisterModal(true)}
            style={{ backgroundColor: "#7c3aed", color: "#ffffff", border: "none", padding: "8px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Plus size={16} /> Register as Home Tutor
          </button>
        </div>
      </header>

      {/* Demo Confirmed Alert */}
      {demoConfirmed && (
        <div style={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #86efac", padding: "14px 20px" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803d", fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Free 1st Demo Class Booked! Teacher "{demoConfirmed.tutor}" assigned for {demoConfirmed.grade} on {demoConfirmed.date}! Tutor will call {demoConfirmed.phone}.</span>
            </div>
            <button onClick={() => setDemoConfirmed(null)} style={{ background: "none", border: "none", color: "#15803d", cursor: "pointer", fontWeight: 800 }}>✕</button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <section style={{ background: "linear-gradient(180deg, #f5f3ff 0%, #faf5ff 100%)", padding: "26px 20px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search teacher by subject or qualification (e.g. Physics, Maths, HBTU, Chemistry)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem", backgroundColor: "#ffffff" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <main style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
          {filteredTutors.map((t) => (
            <div key={t.id} style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e9d5ff", padding: "24px", boxShadow: "0 2px 10px rgba(124,58,237,0.04)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
                <img src={t.image} alt={t.name} style={{ width: "65px", height: "65px", borderRadius: "12px", objectFit: "cover" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>{t.name}</h3>
                    <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "1px 6px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 800 }}>★ {t.rating}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#7c3aed", fontWeight: 700 }}>{t.qualification}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Exp: {t.experience} • Mentored: {t.studentsTaught}+ Students</div>
                </div>
              </div>

              <div style={{ backgroundColor: "#faf5ff", border: "1px solid #f3e8ff", padding: "12px", borderRadius: "10px", fontSize: "0.82rem", color: "#475569", marginBottom: "16px", flex: 1 }}>
                <strong>Subject Expertise:</strong><br />{t.subject}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Hourly Tuition Fee:</span>
                  <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#7c3aed" }}>₹{t.hourlyFee} / hr</span>
                </div>
                <button
                  onClick={() => setActiveDemoModal(t)}
                  style={{ backgroundColor: "#7c3aed", color: "#ffffff", border: "none", padding: "9px 18px", borderRadius: "8px", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 3px 10px rgba(124,58,237,0.3)" }}
                >
                  Book Free Demo Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Book Demo Modal */}
      {activeDemoModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setActiveDemoModal(null)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Book 1st Free Demo Class</h3>
            <p style={{ color: "#7c3aed", fontWeight: 700, margin: "0 0 16px" }}>Tutor: {activeDemoModal.name} ({activeDemoModal.subject})</p>
            <form onSubmit={handleBookDemo} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Parent / Student Full Name *" value={parentName} onChange={(e) => setParentName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <select value={studentGrade} onChange={(e) => setStudentGrade(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
                  <option>Class 9 (CBSE)</option>
                  <option>Class 10 (CBSE)</option>
                  <option>Class 11 (PCM)</option>
                  <option>Class 12 (Board Prep)</option>
                  <option>JEE / NEET Foundation</option>
                </select>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>
              <textarea rows={2} placeholder="Home Address (Street, Area in Kanpur) *" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setActiveDemoModal(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Confirm Free Demo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tutor Registration Modal */}
      {showTutorRegisterModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={() => setShowTutorRegisterModal(false)}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", maxWidth: "460px", width: "100%", padding: "24px" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>Register as Home Tutor</h3>
            <form onSubmit={handleRegisterTutor} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="text" placeholder="Teacher Name *" value={tutorName} onChange={(e) => setTutorName(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="tel" placeholder="Mobile Number *" value={tutorPhone} onChange={(e) => setTutorPhone(e.target.value)} required style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Highest Degree (e.g. M.Sc, B.Tech)" value={tutorQual} onChange={(e) => setTutorQual(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Subjects Taught (e.g. Mathematics Class 9-12)" value={tutorSub} onChange={(e) => setTutorSub(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="number" placeholder="Expected Hourly Fee (₹)" value={tutorFee} onChange={(e) => setTutorFee(e.target.value)} style={{ padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowTutorRegisterModal(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 800, cursor: "pointer" }}>Create Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
