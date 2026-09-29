"use client";

import { useState } from "react";
import {
  HeartPulse,
  Phone,
  ShieldCheck,
  Activity,
  Bed,
  Users,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Stethoscope,
  Building,
  CheckCircle2,
  AlertCircle,
  LogIn,
  Sparkles,
  ChevronRight,
  Award,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospitalSeedData";

export default function HospitalLandingPage({
  onSelectRole,
  allStaff,
  doctorSchedules,
  floors,
  patients,
  onBookAppointmentClick,
}) {
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Statistics
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");
  const totalBeds = floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const admittedCount = patients.filter((p) => p.status === "Admitted").length;
  const vacantBeds = Math.max(0, totalBeds - admittedCount);

  const departments = [
    { id: "Cardiology", name: "Cardiology & Cath Lab", icon: HeartPulse, desc: "24x7 Interventional Cardiology, ECG, Echo & Emergency Angioplasty" },
    { id: "Orthopedics", name: "Orthopedics & Trauma", icon: Activity, desc: "Polytrauma, Fracture management, Arthroscopy & Joint Replacement" },
    { id: "General Medicine", name: "General Medicine & Diabetology", icon: Stethoscope, desc: "Adult medicine, Hypertension, Critical infections & Chronic disease care" },
    { id: "Gynecology & Obstetrics", name: "Gynecology & Maternity", icon: Users, desc: "Normal delivery, High-risk pregnancy, C-Section & NICU backup" },
    { id: "ICU & Emergency", name: "Trauma & Critical Care ICU", icon: AlertCircle, desc: "Level-1 Trauma resuscitation, Mechanical ventilators & 24x7 Monitoring" },
  ];

  const filteredDoctors = selectedDept === "ALL"
    ? doctorSchedules
    : doctorSchedules.filter((d) => d.department === selectedDept);

  return (
    <div style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Hero Section - Light Mode */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "60px 20px 80px",
          background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Top 24x7 Emergency Alert Ribbon */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "50px",
              marginBottom: "24px",
              fontSize: "0.86rem",
              color: "#991b1b",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#dc2626",
                boxShadow: "0 0 8px rgba(220, 38, 38, 0.5)",
              }}
            />
            <strong style={{ color: "#991b1b" }}>24x7 EMERGENCY &amp; TRAUMA HOTLINE:</strong>
            <a href="tel:+919654880240" style={{ color: "#0284c7", textDecoration: "none", fontWeight: 700 }}>
              +91 96548 80240
            </a>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <span>Ambulance: <strong style={{ color: "#dc2626" }}>108</strong></span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Hero Text */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#0284c7",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                <Award size={16} />
                <span>NABH Accredited &amp; ISO 9001:2015 Super-Speciality Hospital</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: "0 0 18px",
                  color: "#0f172a",
                }}
              >
                Advanced Multispeciality Healthcare &amp; Trauma Center
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "#475569",
                  marginBottom: "28px",
                  maxWidth: "600px",
                }}
              >
                Equipped with modern Intensive Care Units (ICU), advanced Cath Lab, 
                super-specialist doctors, 24x7 digital pathology, and compassionate patient-first medical technology in Kanpur.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#0284c7",
                    color: "#ffffff",
                    border: "none",
                    padding: "14px 28px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(2, 132, 199, 0.3)",
                    transition: "all 0.2s",
                  }}
                >
                  <LogIn size={18} />
                  <span>Hospital Staff &amp; Doctor Portal Login</span>
                </button>

                <button
                  type="button"
                  onClick={onBookAppointmentClick}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    border: "1px solid #cbd5e1",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Calendar size={18} color="#0284c7" />
                  <span>Reception Desk &amp; OPD Booking</span>
                </button>
              </div>

              {/* Badges */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "0.85rem", color: "#475569" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} color="#16a34a" /> 24x7 Emergency &amp; Trauma
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} color="#16a34a" /> In-House ICU &amp; Oxygen Beds
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Cashless Mediclaim Ready
                </span>
              </div>
            </div>

            {/* Hospital Live Snapshot Card - Light Mode */}
            <div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #0284c7, #0d9488)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                      }}
                    >
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                        Live Hospital Census
                      </h3>
                      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Real-time facility status</span>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      backgroundColor: "#f0fdf4",
                      color: "#16a34a",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                    Active Online
                  </span>
                </div>

                {/* 4 Stat Boxes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#f0f9ff",
                      border: "1px solid #bae6fd",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0284c7", marginBottom: "6px" }}>
                      <Bed size={16} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>Available Beds</span>
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>
                      {vacantBeds} <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 400 }}>/ {totalBeds} total</span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>Ready for Admission</span>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#16a34a", marginBottom: "6px" }}>
                      <Stethoscope size={16} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>Doctors On Duty</span>
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>
                      {doctors.length}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Super-Specialists Active</span>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#fef3c7",
                      border: "1px solid #fde68a",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#b45309", marginBottom: "6px" }}>
                      <Users size={16} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>Nursing Staff</span>
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>
                      {nurses.length}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Floor &amp; ICU Duty</span>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#dc2626", marginBottom: "6px" }}>
                      <AlertCircle size={16} />
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>Emergency / ICU</span>
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#991b1b", marginTop: "4px" }}>
                      24x7 OPEN
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>Level-1 Trauma Ready</span>
                  </div>
                </div>

                {/* Quick Staff Login Trigger */}
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px dashed #cbd5e1",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "10px", fontWeight: 500 }}>
                    Are you a Hospital Staff member, Doctor, Nurse, or Admin?
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    style={{
                      width: "100%",
                      backgroundColor: "#0284c7",
                      color: "#ffffff",
                      border: "none",
                      padding: "11px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 2px 6px rgba(2, 132, 199, 0.25)",
                    }}
                  >
                    <LogIn size={16} />
                    <span>Select Profile &amp; Enter Hospital Workspace</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Daily Schedule Board (Kaun Doctor Kab Aata Hai) - Light Mode */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#0284c7", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              <Clock size={16} /> Daily OPD &amp; Rounds Schedule
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
              Doctor Visiting &amp; OPD Consultation Hours
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "6px 0 0" }}>
              Check which doctor is available in OPD, IPD rounds timings, and current chamber status.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setSelectedDept("ALL")}
              style={{
                backgroundColor: selectedDept === "ALL" ? "#0284c7" : "#ffffff",
                color: selectedDept === "ALL" ? "#ffffff" : "#475569",
                border: "1px solid #cbd5e1",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              All Specialties ({doctorSchedules.length})
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDept(dept.id)}
                style={{
                  backgroundColor: selectedDept === dept.id ? "#0284c7" : "#ffffff",
                  color: selectedDept === dept.id ? "#ffffff" : "#475569",
                  border: "1px solid #cbd5e1",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {dept.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Schedules Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                      {doc.doctorName}
                    </h3>
                    <div style={{ fontSize: "0.8rem", color: "#0284c7", fontWeight: 600 }}>
                      {doc.qualification}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      backgroundColor:
                        doc.currentStatus.includes("Chamber")
                          ? "#f0fdf4"
                          : doc.currentStatus.includes("OT")
                          ? "#fef2f2"
                          : "#fef3c7",
                      color:
                        doc.currentStatus.includes("Chamber")
                          ? "#15803d"
                          : doc.currentStatus.includes("OT")
                          ? "#b91c1c"
                          : "#b45309",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    ● {doc.currentStatus}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    borderRadius: "10px",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "0.82rem",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Chamber / Location:</span>
                    <strong style={{ color: "#0f172a" }}>{doc.room}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>OPD Hours:</span>
                    <strong style={{ color: "#0284c7" }}>{doc.opdTimings}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>IPD Rounds Time:</span>
                    <strong style={{ color: "#334155" }}>{doc.ipdRoundsTimings}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>OPD Days:</span>
                    <strong style={{ color: "#475569" }}>
                      {doc.availableDays.length === 6 ? "Mon – Sat" : doc.availableDays.length === 7 ? "All 7 Days" : doc.availableDays.join(", ")}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "6px" }}>
                    <span style={{ color: "#64748b" }}>Consultation Fee:</span>
                    <strong style={{ color: "#16a34a" }}>₹{doc.consultationFee}</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onBookAppointmentClick}
                style={{
                  backgroundColor: "#f0f9ff",
                  color: "#0284c7",
                  border: "1px solid #bae6fd",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span>Book OPD Token with {doc.doctorName.split(" ")[1]}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bed Vacancy Status Board (Floor-wise & Ward-wise) */}
      <section
        style={{
          backgroundColor: "#f1f5f9",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#16a34a", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              <Bed size={16} /> Transparent Bed Census
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>
              Live Bed Availability &amp; Inpatient Capacity
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "6px 0 0" }}>
              Real-time vacancy tracking for Emergency admissions, General Wards, Private Deluxe, and ICU.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {floors.map((floor) => {
              const floorVacant = Math.max(0, floor.totalBeds - floor.occupiedBeds);
              const occPct = Math.round((floor.occupiedBeds / floor.totalBeds) * 100) || 0;

              return (
                <div
                  key={floor.id}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "22px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                        {floor.name}
                      </h4>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b", lineHeight: 1.4 }}>
                        {floor.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                      <span style={{ color: "#64748b" }}>Bed Occupancy</span>
                      <strong style={{ color: "#0f172a" }}>{floor.occupiedBeds} / {floor.totalBeds} ({occPct}%)</strong>
                    </div>
                    <div style={{ height: "8px", borderRadius: "4px", backgroundColor: "#e2e8f0", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${occPct}%`,
                          backgroundColor: occPct > 80 ? "#dc2626" : occPct > 50 ? "#f59e0b" : "#16a34a",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      backgroundColor: floorVacant > 0 ? "#f0fdf4" : "#fef2f2",
                      border: `1px solid ${floorVacant > 0 ? "#bbf7d0" : "#fecaca"}`,
                    }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 500 }}>Available (Khali) Beds:</span>
                    <strong style={{ fontSize: "1rem", color: floorVacant > 0 ? "#15803d" : "#b91c1c" }}>
                      {floorVacant} Available
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-Based Portal Selection Modal - Light Mode */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "800px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h3 style={{ margin: "0 0 6px", fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
                  Select Hospital Workspace &amp; Profile
                </h3>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.88rem" }}>
                  Choose your role to open your dedicated module with role-based clinical permissions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                style={{
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  border: "1px solid #cbd5e1",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              {/* Option 1: Admin */}
              <div
                onClick={() => {
                  onSelectRole("Admin", allStaff.find((s) => s.role === "Admin") || allStaff[0]);
                  setShowLoginModal(false);
                }}
                style={{
                  backgroundColor: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: "14px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#0284c7", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.98rem" }}>Super Admin</strong>
                    <div style={{ fontSize: "0.74rem", color: "#0284c7", fontWeight: 600 }}>Medical Superintendent</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>
                  Full master access: All modules, Doctors, Nurses, Patients, OPD, Roster, Pharmacy, Billing &amp; Google Sheet Sync.
                </p>
                <div style={{ color: "#0284c7", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Enter as Super Admin</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Option 2: Doctor */}
              <div
                onClick={() => {
                  const doc = allStaff.find((s) => s.role === "Doctor") || allStaff[0];
                  onSelectRole("Doctor", doc);
                  setShowLoginModal(false);
                }}
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "14px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#16a34a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.98rem" }}>Doctor Chamber</strong>
                    <div style={{ fontSize: "0.74rem", color: "#16a34a", fontWeight: 600 }}>Dr. Rajesh Sharma</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>
                  Doctor workspace: My IPD Inpatients, Write Prescriptions, Today's Live OPD Queue, Trace suggested medicines.
                </p>
                <div style={{ color: "#16a34a", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Login to Doctor Chamber</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Option 3: Nurse */}
              <div
                onClick={() => {
                  const nurse = allStaff.find((s) => s.role === "Nurse") || allStaff[0];
                  onSelectRole("Nurse", nurse);
                  setShowLoginModal(false);
                }}
                style={{
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fde68a",
                  borderRadius: "14px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#d97706", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.98rem" }}>Nurse Station</strong>
                    <div style={{ fontSize: "0.74rem", color: "#b45309", fontWeight: 600 }}>Sister Preeti Mishra (ICU)</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>
                  Nurse workspace: Floor patients, Scheduled medicine administration with "Mark Given", vitals recording &amp; notes.
                </p>
                <div style={{ color: "#b45309", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Login to Nurse Station</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Option 4: Receptionist */}
              <div
                onClick={() => {
                  const rec = allStaff.find((s) => s.role === "Receptionist") || allStaff[0];
                  onSelectRole("Receptionist", rec);
                  setShowLoginModal(false);
                }}
                style={{
                  backgroundColor: "#f3e8ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: "14px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#7c3aed", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.98rem" }}>Receptionist Desk</strong>
                    <div style={{ fontSize: "0.74rem", color: "#7c3aed", fontWeight: 600 }}>Neha Gupta (Front Office)</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>
                  Front Desk: Book OPD appointments, Bed availability (khali beds), Doctor arrival timings &amp; Payment collection.
                </p>
                <div style={{ color: "#7c3aed", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Login to Reception Desk</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Option 5: HR */}
              <div
                onClick={() => {
                  const hr = allStaff.find((s) => s.role === "HR") || allStaff[0];
                  onSelectRole("HR", hr);
                  setShowLoginModal(false);
                }}
                style={{
                  backgroundColor: "#fce7f3",
                  border: "1px solid #fbcfe8",
                  borderRadius: "14px",
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#db2777", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ color: "#0f172a", fontSize: "0.98rem" }}>HR &amp; Duty Desk</strong>
                    <div style={{ fontSize: "0.74rem", color: "#be185d", fontWeight: 600 }}>Kavita Saxena</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#475569", margin: 0, lineHeight: 1.4 }}>
                  HR Management: Daily staff attendance (Present, Absent, Leave, In/Out times) &amp; Duty Roster assignment.
                </p>
                <div style={{ color: "#be185d", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>Login to HR Workspace</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
