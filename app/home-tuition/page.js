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
  CreditCard,
  Printer,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Users,
  Check,
  ArrowRight,
  DollarSign,
  FileText,
  User,
  Sparkles,
} from "lucide-react";
import { homeTuitionData } from "@/data/businessAppsData";

export default function HomeTuitionApp() {
  const { portalInfo, classes, tutors: initialTutors } = homeTuitionData;

  // Master State
  const [activeTab, setActiveTab] = useState("landing"); // "landing", "catalog", "billing", "coordinator", "admin"
  const [currentRole, setCurrentRole] = useState("Parent"); // "Parent", "Coordinator", "Billing", "Admin"
  const [tutorList, setTutorList] = useState(initialTutors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  // Demo Booking Modal
  const [activeDemoModal, setActiveDemoModal] = useState(null);
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentGrade, setStudentGrade] = useState("Class 10 (CBSE Board)");
  const [homeAddress, setHomeAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("2026-10-02");
  const [preferredTime, setPreferredTime] = useState("05:00 PM");
  const [demoConfirmedAlert, setDemoConfirmedAlert] = useState(null);

  // Scheduled Demos Tracker
  const [demoSessions, setDemoSessions] = useState([
    {
      id: "DEMO-301",
      parent: "Mrs. Meenakshi Dixit",
      student: "Ananya Dixit",
      grade: "Class 10 (CBSE)",
      subject: "Physics & Mathematics",
      tutor: "Er. Deepak Sachan",
      date: "2026-10-01",
      time: "05:00 PM",
      address: "Swaroop Nagar, Kanpur",
      status: "Demo Scheduled",
    },
    {
      id: "DEMO-302",
      parent: "Mr. Rajiv Rastogi",
      student: "Aryan Rastogi",
      grade: "Class 12 (PCB)",
      subject: "Chemistry & Biology",
      tutor: "Dr. Shalini Awasthi",
      date: "2026-10-02",
      time: "06:30 PM",
      address: "Civil Lines, Kanpur",
      status: "Student Enrolled",
    },
  ]);

  // Monthly Tuition Billing POS State
  const [billParent, setBillParent] = useState("Mrs. Meenakshi Dixit");
  const [billPhone, setBillPhone] = useState("9839112233");
  const [billStudent, setBillStudent] = useState("Ananya Dixit");
  const [billGrade, setBillGrade] = useState("Class 10 (CBSE)");
  const [billTutorName, setBillTutorName] = useState(initialTutors[0].name);
  const [billSessions, setBillSessions] = useState(16); // 16 sessions a month
  const [billHourlyRate, setBillHourlyRate] = useState(600);
  const [billStudyMaterial, setBillStudyMaterial] = useState(800);
  const [billDiscount, setBillDiscount] = useState(500);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);

  // Tutor Register Modal
  const [showTutorRegisterModal, setShowTutorRegisterModal] = useState(false);
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [tutorQual, setTutorQual] = useState("");
  const [tutorSub, setTutorSub] = useState("");
  const [tutorFee, setTutorFee] = useState(550);

  // Admin New Faculty State
  const [adminTutorName, setAdminTutorName] = useState("");
  const [adminQual, setAdminQual] = useState("");
  const [adminSubject, setAdminSubject] = useState("");
  const [adminFee, setAdminFee] = useState("");
  const [adminExp, setAdminExp] = useState("5 Years");

  // Filtering Tutors
  const filteredTutors = tutorList.filter((t) => {
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.qualification.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle Book Demo
  const handleConfirmDemo = (e) => {
    e.preventDefault();
    if (!parentName || !parentPhone || !homeAddress) {
      alert("Please fill all contact and address fields.");
      return;
    }

    const newDemo = {
      id: `DEMO-${Math.floor(400 + Math.random() * 400)}`,
      parent: parentName,
      student: parentName.split(" ")[0] + " Jr.",
      grade: studentGrade,
      subject: activeDemoModal.subject,
      tutor: activeDemoModal.name,
      date: preferredDate,
      time: preferredTime,
      address: homeAddress,
      status: "Demo Scheduled",
    };

    setDemoSessions([newDemo, ...demoSessions]);
    setDemoConfirmedAlert(newDemo);
    setActiveDemoModal(null);
    setParentName("");
    setParentPhone("");
    setHomeAddress("");
  };

  // Handle Tutor Register Submit
  const handleTutorSubmit = (e) => {
    e.preventDefault();
    if (!tutorName || !tutorPhone) return;

    const newT = {
      id: `TUT-${Math.floor(10 + Math.random() * 90)}`,
      name: tutorName,
      qualification: tutorQual || "M.Sc / B.Ed",
      subject: tutorSub || "Mathematics & Science",
      experience: "4+ Years",
      hourlyFee: Number(tutorFee) || 550,
      rating: 5.0,
      studentsTaught: 1,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
    };

    setTutorList([newT, ...tutorList]);
    setShowTutorRegisterModal(false);
    setTutorName("");
    setTutorPhone("");
    alert("Faculty application received! Coordinator will verify degree credentials within 24 hours.");
  };

  // Handle Admin Add Faculty
  const handleAdminAddTutor = (e) => {
    e.preventDefault();
    if (!adminTutorName || !adminFee) return;

    const newT = {
      id: `TUT-${Math.floor(20 + Math.random() * 80)}`,
      name: adminTutorName,
      qualification: adminQual || "M.Tech / M.Sc",
      subject: adminSubject || "PCM Core",
      experience: adminExp,
      hourlyFee: Number(adminFee) || 600,
      rating: 5.0,
      studentsTaught: 15,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    };

    setTutorList([newT, ...tutorList]);
    setAdminTutorName("");
    setAdminQual("");
    setAdminSubject("");
    setAdminFee("");
    alert(`Faculty Mentor "${newT.name}" onboarded to active faculty roster!`);
  };

  // Billing Calculations
  const billGrossFee = billSessions * billHourlyRate;
  const billTaxableSubtotal = billGrossFee + Number(billStudyMaterial) - Number(billDiscount);
  const billGst = Math.round(billTaxableSubtotal * 0.18);
  const billGrandTotal = billTaxableSubtotal + billGst;

  const handleGenerateInvoice = () => {
    const inv = {
      receiptNo: `GURUKUL-FEE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      parent: billParent,
      phone: billPhone,
      student: billStudent,
      grade: billGrade,
      tutor: billTutorName,
      sessions: billSessions,
      hourlyRate: billHourlyRate,
      grossFee: billGrossFee,
      studyKit: billStudyMaterial,
      discount: billDiscount,
      gst: billGst,
      total: billGrandTotal,
    };
    setActiveInvoiceModal(inv);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: "#faf5ff", borderBottom: "1px solid #f3e8ff", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#7e22ce", fontWeight: 600 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <GraduationCap size={16} color="#7e22ce" />
          <span>Gurukul Verified Home Tutors • Free 1st Demo Class At Doorstep • IITian &amp; Doctor Faculty Mentors</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span>Academic Coordinator: <strong>{portalInfo.phone}</strong></span>
          <Link href="/business-suite" style={{ color: "#7e22ce", textDecoration: "underline", fontWeight: 700 }}>
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
              <BookOpen size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>
                {portalInfo.name}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 500 }}>
                {portalInfo.tagline}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "landing", label: "Gurukul Overview" },
              { id: "catalog", label: "Find Faculty Tutors" },
              { id: "billing", label: "Monthly Tuition Fee POS" },
              { id: "coordinator", label: "Demo & Batch Desk" },
              { id: "admin", label: "Academic Director Admin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  if (t.id === "billing") setCurrentRole("Billing");
                  else if (t.id === "coordinator") setCurrentRole("Coordinator");
                  else if (t.id === "admin") setCurrentRole("Admin");
                  else setCurrentRole("Parent");
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  border: activeTab === t.id ? "1px solid #7c3aed" : "1px solid transparent",
                  backgroundColor: activeTab === t.id ? "#faf5ff" : "transparent",
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
                  if (r === "Billing") setActiveTab("billing");
                  else if (r === "Coordinator") setActiveTab("coordinator");
                  else if (r === "Admin") setActiveTab("admin");
                  else setActiveTab("catalog");
                }}
                style={{ border: "none", backgroundColor: "transparent", fontWeight: 700, color: "#7c3aed", outline: "none", cursor: "pointer" }}
              >
                <option value="Parent">Parent / Student</option>
                <option value="Coordinator">Academic Coordinator</option>
                <option value="Billing">Fee Counter Desk</option>
                <option value="Admin">Academic Director</option>
              </select>
            </div>

            <button
              onClick={() => setShowTutorRegisterModal(true)}
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
              <UserCheck size={16} /> Apply As Tutor
            </button>
          </div>
        </div>
      </header>

      {/* Demo Confirmed Alert */}
      {demoConfirmedAlert && (
        <div style={{ maxWidth: "1280px", margin: "16px auto 0", padding: "0 24px" }}>
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px 20px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#166534" }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>
                ✓ Free Demo Confirmed! Mentor <strong>{demoConfirmedAlert.tutor}</strong> will visit {demoConfirmedAlert.address} on {demoConfirmedAlert.date} at {demoConfirmedAlert.time}. Ref: {demoConfirmedAlert.id}.
              </span>
            </div>
            <button
              onClick={() => setDemoConfirmedAlert(null)}
              style={{ backgroundColor: "#166534", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: GURUKUL OVERVIEW LANDING */}
      {activeTab === "landing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Hero Section */}
          <section style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "40px", alignItems: "center", backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "48px 40px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#faf5ff", color: "#7e22ce", padding: "6px 14px", borderRadius: "20px", fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px" }}>
                <Sparkles size={16} /> 1-on-1 Personalized Doorstep Tutoring
              </div>
              <h1 style={{ fontSize: "2.7rem", lineHeight: 1.15, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", margin: "0 0 16px" }}>
                Empower Your Child With Verified Top Mentors &amp; Free Trial Demo Classes
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.6, margin: "0 0 28px" }}>
                Stop struggling with crowded coaching centers. Gurukul brings gold-medalist educators, IITian physics mentors, and chartered accountants directly into the comfort and safety of your home.
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setActiveTab("catalog")}
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
                  <Search size={18} /> Find Verified Tutors
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
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
                  <CreditCard size={18} /> Fee Counter POS
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #f1f5f9" }}>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>98.4%</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Board Distinction Rate</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>1st Demo</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>100% Free Trial</div>
                </div>
                <div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#7c3aed" }}>350+</div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>Verified Faculty</div>
                </div>
              </div>
            </div>

            {/* Showcase Image */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80"
                alt="Personalized Home Tutoring Session"
                style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              />
              <div style={{ position: "absolute", bottom: "-16px", left: "20px", backgroundColor: "#ffffff", padding: "14px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ backgroundColor: "#faf5ff", color: "#7c3aed", padding: "10px", borderRadius: "8px" }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0f172a" }}>CBSE &amp; ICSE Specialized Mentors</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Weekly Chapter Tests &amp; Monthly Progress Reports</div>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Pillars of Gurukul */}
          <section style={{ marginTop: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                Why Kanpur Families Prefer Gurukul Home Tutors
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                Individual pace, customized problem sets, and total safety of home learning.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {[
                {
                  icon: <ShieldCheck size={28} color="#7c3aed" />,
                  title: "100% Background Verified",
                  desc: "Aadhaar authentication, police record checks, and original degree verification for every faculty tutor.",
                },
                {
                  icon: <Clock size={28} color="#7c3aed" />,
                  title: "Flexible Timings & Days",
                  desc: "Choose early morning, evening, or weekend sessions that perfectly sync with school homework schedules.",
                },
                {
                  icon: <Award size={28} color="#7c3aed" />,
                  title: "Free 1st Trial Demo Class",
                  desc: "Book a demo class at zero cost. Confirm tuition only if your child is completely satisfied with teaching style.",
                },
                {
                  icon: <FileText size={28} color="#7c3aed" />,
                  title: "Transparent Monthly Receipts",
                  desc: "Digital monthly fee invoices with session breakdowns, test reports, and academic coordinator tracking.",
                },
              ].map((p, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", padding: "26px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
                  <div style={{ backgroundColor: "#faf5ff", width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Top Faculty */}
          <section style={{ marginTop: "54px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                  Featured Gold-Medalist Tutors
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  High-rated faculty with proven records in Board Exams &amp; Competitive Foundation
                </p>
              </div>
              <button
                onClick={() => setActiveTab("catalog")}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#7c3aed",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Explore All Faculty <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "24px" }}>
              {tutorList.map((t) => (
                <div key={t.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ position: "relative" }}>
                    <img src={t.image} alt={t.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", gap: "4px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                      <Star size={14} fill="#eab308" color="#eab308" /> {t.rating} Rating
                    </div>
                  </div>

                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", marginBottom: "4px" }}>
                      {t.qualification}
                    </div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "6px" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600, marginBottom: "8px" }}>
                      {t.subject}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "16px" }}>
                      Experience: <strong>{t.experience}</strong> • Mentored: <strong>{t.studentsTaught}+ Students</strong>
                    </div>

                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Hourly Session Fee</div>
                        <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a" }}>₹{t.hourlyFee}/hr</div>
                      </div>
                      <button
                        onClick={() => setActiveDemoModal(t)}
                        style={{
                          backgroundColor: "#7c3aed",
                          color: "#ffffff",
                          border: "none",
                          padding: "9px 18px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          cursor: "pointer",
                        }}
                      >
                        Book Free Demo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: FIND FACULTY TUTORS */}
      {activeTab === "catalog" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Search Verified Home Tutors
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Shortlist subject experts for CBSE, ICSE, and competitive foundation
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} color="#64748b" style={{ position: "absolute", left: "12px", top: "11px" }} />
                <input
                  type="text"
                  placeholder="Search subject, tutor, degree..."
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
                onClick={() => setShowTutorRegisterModal(true)}
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
                <Plus size={16} /> Faculty Registration
              </button>
            </div>
          </div>

          {/* Classes Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["All", ...classes].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: selectedClass === cls ? "1px solid #7c3aed" : "1px solid #cbd5e1",
                  backgroundColor: selectedClass === cls ? "#7c3aed" : "#ffffff",
                  color: selectedClass === cls ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "24px" }}>
            {filteredTutors.map((t) => (
              <div key={t.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                <div style={{ position: "relative" }}>
                  <img src={t.image} alt={t.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#ffffff", padding: "4px 8px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", gap: "4px" }}>
                    <ShieldCheck size={14} color="#7c3aed" /> Degree Verified
                  </div>
                  <div style={{ position: "absolute", bottom: "10px", left: "12px", backgroundColor: "rgba(15, 23, 42, 0.8)", color: "#ffffff", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600 }}>
                    ID: {t.id}
                  </div>
                </div>

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", marginBottom: "4px" }}>
                    {t.qualification}
                  </div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "4px" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600, marginBottom: "8px" }}>
                    {t.subject}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "16px" }}>
                    Exp: <strong>{t.experience}</strong> • Mentored: <strong>{t.studentsTaught}+ Students</strong>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Hourly Session Fee</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0f172a" }}>₹{t.hourlyFee}/hr</div>
                    </div>
                    <button
                      onClick={() => setActiveDemoModal(t)}
                      style={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        border: "none",
                        padding: "9px 18px",
                        borderRadius: "8px",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Book Free Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: MONTHLY TUITION FEE POS */}
      {activeTab === "billing" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Monthly Tuition Fee &amp; Receipt Counter POS
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Generate official monthly tuition fee receipts, test kit allocations, and GST vouchers
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px" }}>
            {/* Input Form */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <CreditCard size={18} color="#7c3aed" /> Student Tuition Parameters
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={billParent}
                    onChange={(e) => setBillParent(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Phone Number</label>
                  <input
                    type="text"
                    value={billPhone}
                    onChange={(e) => setBillPhone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Student Name</label>
                  <input
                    type="text"
                    value={billStudent}
                    onChange={(e) => setBillStudent(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Class / Board</label>
                  <input
                    type="text"
                    value={billGrade}
                    onChange={(e) => setBillGrade(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Assigned Faculty Mentor</label>
                <select
                  value={billTutorName}
                  onChange={(e) => {
                    setBillTutorName(e.target.value);
                    const t = tutorList.find((item) => item.name === e.target.value);
                    if (t) setBillHourlyRate(t.hourlyFee);
                  }}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {tutorList.map((t) => (
                    <option key={t.id} value={t.name}>{t.name} ({t.subject})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Monthly Sessions Count</label>
                  <input
                    type="number"
                    min="4"
                    value={billSessions}
                    onChange={(e) => setBillSessions(parseInt(e.target.value) || 4)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={billHourlyRate}
                    onChange={(e) => setBillHourlyRate(parseInt(e.target.value) || 500)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Study Material &amp; Mock Tests (₹)</label>
                  <input
                    type="number"
                    value={billStudyMaterial}
                    onChange={(e) => setBillStudyMaterial(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Scholar / Sibling Concession (₹)</label>
                  <input
                    type="number"
                    value={billDiscount}
                    onChange={(e) => setBillDiscount(parseInt(e.target.value) || 0)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateInvoice}
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
                <Printer size={18} /> Review &amp; Print Official Tuition Fee Receipt
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>
                Tuition Fee Breakdown
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Tuition Hours ({billSessions} Sessions)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGrossFee.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Curated Question Bank &amp; Test Papers</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{Number(billStudyMaterial).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#16a34a" }}>
                  <span>Scholar / Sibling Concession</span>
                  <span style={{ fontWeight: 700 }}>-₹{Number(billDiscount).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569", paddingTop: "10px", borderTop: "1px solid #f1f5f9" }}>
                  <span>Taxable Subtotal</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billTaxableSubtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#475569" }}>
                  <span>Education Services GST (18%)</span>
                  <span style={{ fontWeight: 700, color: "#0f172a" }}>₹{billGst.toLocaleString()}</span>
                </div>

                <div style={{ backgroundColor: "#faf5ff", border: "1px solid #f3e8ff", padding: "16px", borderRadius: "10px", marginTop: "16px" }}>
                  <div style={{ fontSize: "0.85rem", color: "#7e22ce", fontWeight: 600 }}>Total Monthly Payable</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7e22ce", marginTop: "4px" }}>
                    ₹{billGrandTotal.toLocaleString()}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9333ea", marginTop: "4px" }}>
                    *Includes monthly progress report &amp; coordinator parent meeting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 4: ACADEMIC COORDINATOR DESK */}
      {activeTab === "coordinator" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                Scheduled Home Demo Classes &amp; Active Batches
              </h1>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Live dispatch coordinator desk, student trial tracking, and faculty attendance
              </p>
            </div>
            <div style={{ backgroundColor: "#faf5ff", color: "#7e22ce", padding: "8px 16px", borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700 }}>
              Active Demo Requests: {demoSessions.length} Scheduled
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontWeight: 700 }}>
                  <th style={{ padding: "14px 20px" }}>Demo Ref</th>
                  <th style={{ padding: "14px 20px" }}>Student &amp; Parent</th>
                  <th style={{ padding: "14px 20px" }}>Grade / Subject</th>
                  <th style={{ padding: "14px 20px" }}>Assigned Mentor</th>
                  <th style={{ padding: "14px 20px" }}>Demo Schedule</th>
                  <th style={{ padding: "14px 20px" }}>Address</th>
                  <th style={{ padding: "14px 20px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {demoSessions.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "#7c3aed" }}>{d.id}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{d.student}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Parent: {d.parent}</div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{d.grade}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{d.subject}</div>
                    </td>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: "#7c3aed" }}>{d.tutor}</td>
                    <td style={{ padding: "14px 20px", color: "#475569" }}>
                      <div>{d.date}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{d.time}</div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#64748b", fontSize: "0.8rem" }}>{d.address}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ backgroundColor: d.status.includes("Enrolled") ? "#f0fdf4" : "#fef3c7", color: d.status.includes("Enrolled") ? "#166534" : "#92400e", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700 }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* TAB 5: ACADEMIC DIRECTOR ADMIN */}
      {activeTab === "admin" && (
        <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
              Academic Director &amp; Master Faculty Admin
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Faculty credentials auditing, student admissions metrics, and fee ledger management
            </p>
          </div>

          {/* KPI Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Active Faculty Tutors</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed", marginTop: "4px" }}>
                {tutorList.length} Teachers
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Total Students Enrolled</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0f172a", marginTop: "4px" }}>
                540+ Students
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Trial Conversion Rate</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", marginTop: "4px" }}>
                94% Joined
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Monthly Fee Volume</div>
              <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#7c3aed", marginTop: "4px" }}>
                ₹{(tutorList.length * 16 * 600).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add Tutor Form */}
          <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: "14px", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} color="#7c3aed" /> Onboard New Faculty Educator
            </h2>

            <form onSubmit={handleAdminAddTutor} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Educator Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prof. Arvind Trivedi"
                  value={adminTutorName}
                  onChange={(e) => setAdminTutorName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Highest Qualification &amp; College</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc Mathematics (IIT Kanpur)"
                  value={adminQual}
                  onChange={(e) => setAdminQual(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Subject Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Higher Algebra &amp; Calculus"
                  value={adminSubject}
                  onChange={(e) => setAdminSubject(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Hourly Session Fee (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 700"
                  value={adminFee}
                  onChange={(e) => setAdminFee(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Teaching Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 8 Years CBSE Top Coaching"
                  value={adminExp}
                  onChange={(e) => setAdminExp(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Onboard Faculty
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* MODAL: BOOK FREE DEMO */}
      {activeDemoModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "520px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Book Free Trial Demo With {activeDemoModal.name}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Subject: <strong>{activeDemoModal.subject}</strong> • Qualification: {activeDemoModal.qualification}
            </p>

            <form onSubmit={handleConfirmDemo}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Parent / Guardian Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Alok Mehrotra"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Contact Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9839112233"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Student Grade &amp; Board</label>
                <select
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                >
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Residential Home Address</label>
                <input
                  type="text"
                  placeholder="e.g. Flat 302, Civil Lines VIP Road, Kanpur"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Demo Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Preferred Time</label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setActiveDemoModal(null)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Confirm Free Demo Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TUTOR APPLY */}
      {showTutorRegisterModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "480px", borderRadius: "16px", padding: "28px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
              Join Gurukul Verified Faculty
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "0 0 20px" }}>
              Teach in your nearby locality. Direct monthly bank payouts &amp; flexible hours.
            </p>

            <form onSubmit={handleTutorSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Er. Gaurav Pandey"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Mobile Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9812345678"
                  value={tutorPhone}
                  onChange={(e) => setTutorPhone(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Degree &amp; College</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech (HBTU) / M.Sc"
                  value={tutorQual}
                  onChange={(e) => setTutorQual(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Subject You Can Teach</label>
                <input
                  type="text"
                  placeholder="e.g. Physics &amp; Mathematics (Class 9-12)"
                  value={tutorSub}
                  onChange={(e) => setTutorSub(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Expected Hourly Fee (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={tutorFee}
                  onChange={(e) => setTutorFee(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowTutorRegisterModal(false)}
                  style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "8px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  Submit Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE TUITION FEE RECEIPT MODAL */}
      {activeInvoiceModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.7)", zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "680px", borderRadius: "16px", padding: "36px", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Invoice Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #7c3aed", paddingBottom: "20px", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#7c3aed" }}>{portalInfo.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Registered Academic Mentorship Bureau • ISO 9001:2015</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Helpline: {portalInfo.phone} • Email: accounts@gurukultutors.in</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a" }}>TUITION FEE RECEIPT</div>
                <div style={{ fontSize: "0.82rem", color: "#7c3aed", fontWeight: 700 }}>{activeInvoiceModal.receiptNo}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Student & Parent Info */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", backgroundColor: "#f8fafc", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Student Particulars</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.student}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Class: {activeInvoiceModal.grade}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Parent: {activeInvoiceModal.parent} ({activeInvoiceModal.phone})</div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Assigned Faculty Mentor</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginTop: "2px" }}>{activeInvoiceModal.tutor}</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Total Sessions: {activeInvoiceModal.sessions} Hours</div>
                <div style={{ fontSize: "0.82rem", color: "#475569" }}>Billing Cycle: Current Academic Month</div>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", marginBottom: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9", color: "#334155" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Fee Description</th>
                  <th style={{ padding: "10px", textAlign: "center" }}>Sessions</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Hourly Rate (₹)</th>
                  <th style={{ padding: "10px", textAlign: "right" }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>Doorstep Home Tuition Sessions</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>1-on-1 Personal Concept &amp; Numerical Doubt Clearing</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "center", fontWeight: 600 }}>{activeInvoiceModal.sessions}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>₹{activeInvoiceModal.hourlyRate.toLocaleString()}</td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{activeInvoiceModal.grossFee.toLocaleString()}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 10px" }} colSpan={3}>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>Curated Chapter Formula Sheets &amp; Weekly Test Question Bank</div>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700 }}>₹{Number(activeInvoiceModal.studyKit).toLocaleString()}</td>
                </tr>
                {activeInvoiceModal.discount > 0 && (
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 10px", color: "#16a34a" }} colSpan={3}>
                      <div style={{ fontWeight: 700 }}>Scholar Merit / Early Fee Concession</div>
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#16a34a" }}>-₹{Number(activeInvoiceModal.discount).toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ width: "260px", marginLeft: "auto", fontSize: "0.88rem", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>Taxable Subtotal:</span>
                <span style={{ fontWeight: 700 }}>₹{(activeInvoiceModal.grossFee + Number(activeInvoiceModal.studyKit) - Number(activeInvoiceModal.discount)).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ color: "#64748b" }}>GST (18%):</span>
                <span style={{ fontWeight: 700 }}>₹{activeInvoiceModal.gst.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f172a", marginTop: "4px", fontSize: "1.05rem" }}>
                <span style={{ fontWeight: 800, color: "#0f172a" }}>Total Fee Paid:</span>
                <span style={{ fontWeight: 900, color: "#7c3aed" }}>₹{activeInvoiceModal.total.toLocaleString()}</span>
              </div>
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
                <Printer size={16} /> Print Official Fee Receipt
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
                <BookOpen size={20} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>{portalInfo.name}</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
              Kanpur's Premier Academic Mentorship Network. Connecting dedicated parents with gold-medalist educators, IITians, and qualified doctors for personalized doorstep learning.
            </p>
            <div style={{ fontSize: "0.8rem", color: "#7e22ce", fontWeight: 600 }}>
              🎓 100% Police Verified &amp; Degree Authenticated Faculty
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Classes &amp; Curricula</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Class 1-5 (All Subjects Foundation)</li>
              <li>Class 6-8 (Maths &amp; Science Deep Dive)</li>
              <li>Class 9-10 (CBSE &amp; ICSE Boards)</li>
              <li>Class 11-12 (PCM &amp; PCB Stream)</li>
              <li>Class 11-12 (Commerce, Accounts, Eco)</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Academic Safeguards</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Free 1st Trial Demo Class</li>
              <li>Replacement Guarantee in 24 Hours</li>
              <li>Monthly Test Analysis &amp; Rank</li>
              <li>Bi-weekly Coordinator Check-ins</li>
              <li>Strict Safety &amp; Etiquette Guidelines</li>
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a", marginBottom: "14px" }}>Academic Desk</div>
            <div style={{ fontSize: "0.85rem", color: "#475569", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>🏢 Gurukul Centre, Kakadeo Coaching Hub, Kanpur</div>
              <div>📞 Helpline: <strong>{portalInfo.phone}</strong></div>
              <div>✉️ contact@gurukultutors.in</div>
              <div>⏰ Counseling Hours: 08:00 AM – 09:00 PM Daily</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", borderTop: "1px solid #f1f5f9", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
          <div>© {new Date().getFullYear()} {portalInfo.name}. All Rights Reserved.</div>
          <div>Standalone Business Web Application • Strict High-Contrast Light Theme</div>
        </div>
      </footer>
    </div>
  );
}
