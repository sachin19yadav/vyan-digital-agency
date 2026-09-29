"use client";

import {
  Bed,
  Users,
  Stethoscope,
  HeartPulse,
  CreditCard,
  Building2,
  Activity,
  AlertCircle,
  Plus,
  ArrowRight,
  Clock,
  Phone,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function HospitalDashboard({
  hospitalData,
  setActiveTab,
  onAdmitClick,
}) {
  const { patients, staff, floors, bills, dutyRoster } = hospitalData;

  const admittedPatients = patients.filter((p) => p.status === "Admitted");
  const totalBeds = floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const occupiedBeds = admittedPatients.length;
  const freeBeds = Math.max(0, totalBeds - occupiedBeds);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100) || 0;

  const doctorsOnDuty = staff.filter((s) => s.role === "Doctor" && s.status === "On Duty");
  const nursesOnDuty = staff.filter((s) => s.role === "Nurse" && (s.status === "On Duty" || s.shift.includes("Morning")));

  const totalBilled = bills.reduce((acc, b) => acc + (b.total || 0), 0);
  const pendingBills = bills.reduce((acc, b) => acc + (b.balance || 0), 0);

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Emergency Alert Banner */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.6))",
          border: "1px solid rgba(239, 68, 68, 0.35)",
          borderRadius: "12px",
          padding: "14px 20px",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Activity size={20} className="pulse-dot" />
          </div>
          <div>
            <strong style={{ color: "#FCA5A5", fontSize: "0.95rem" }}>
              Level-1 Trauma &amp; Emergency Command Center Online
            </strong>
            <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "#475569" }}>
              ICU telemetry active • 24x7 Ambulance &amp; surgical theatre on standby:{" "}
              <strong style={{ color: "#ffffff" }}>+91 96548 80240</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onAdmitClick}
          style={{
            backgroundColor: "#EF4444",
            color: "#0f172a",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
          }}
        >
          Emergency Patient Admission
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Metric 1: Admitted IPD */}
        <div
          onClick={() => setActiveTab("patients")}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
              Admitted Inpatients (IPD)
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                backgroundColor: "rgba(2, 132, 199, 0.15)",
                color: "#38BDF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bed size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
            {admittedPatients.length}{" "}
            <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#64748b" }}>
              / {patients.length} Total Registered
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#38BDF8", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <span>Manage Inpatient Directory</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Metric 2: Bed Occupancy */}
        <div
          onClick={() => setActiveTab("rooms")}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
              Bed Occupancy
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#34D399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Building2 size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
            {occupancyRate}%{" "}
            <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#34D399" }}>
              ({freeBeds} Beds Free)
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 4 }}>
            {occupiedBeds} of {totalBeds} total beds occupied
          </div>
        </div>

        {/* Metric 3: Active Staff on Duty */}
        <div
          onClick={() => setActiveTab("duty")}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
              Clinical Staff On Duty
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                backgroundColor: "rgba(13, 148, 136, 0.15)",
                color: "#2DD4BF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stethoscope size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
            {doctorsOnDuty.length + nursesOnDuty.length}{" "}
            <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "#64748b" }}>
              ({doctorsOnDuty.length} Docs • {nursesOnDuty.length} Nurses)
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#2DD4BF", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <span>View Shift &amp; Room Roster</span>
            <ArrowRight size={12} />
          </div>
        </div>

        {/* Metric 4: Billing & Financials */}
        <div
          onClick={() => setActiveTab("billing")}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
              Hospital Inpatient Billing
            </span>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "8px",
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                color: "#FBBF24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={18} />
            </div>
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
            ₹{totalBilled.toLocaleString("en-IN")}{" "}
            <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#F87171" }}>
              (₹{pendingBills.toLocaleString("en-IN")} Due)
            </span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "#FBBF24", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
            <span>View &amp; Print Invoices</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>

      {/* 2-Column Overview Section: Floor Live Status + Recent Admissions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 24,
        }}
      >
        {/* Left Column: Recent Admitted Inpatients */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: 12,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
                Active Inpatients Under Care
              </h3>
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                Real-time ward location, vitals, and assigned doctor
              </span>
            </div>
            <button
              onClick={() => setActiveTab("patients")}
              style={{
                background: "none",
                border: "none",
                color: "#38BDF8",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View All Patients &rarr;
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {admittedPatients.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      ({p.age}y • {p.gender})
                    </span>
                    <span
                      style={{
                        backgroundColor: "rgba(16, 185, 129, 0.15)",
                        color: "#34D399",
                        padding: "1px 6px",
                        borderRadius: "8px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                      }}
                    >
                      {p.bedNo}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
                    Doctor: <strong style={{ color: "#0f172a" }}>{p.primaryDoctorName}</strong> • Nurse:{" "}
                    <strong style={{ color: "#34D399" }}>{p.attendingNurseName}</strong>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#FCD34D", marginTop: 2 }}>
                    Diagnosis: {p.diagnosis}
                  </div>
                </div>

                {p.vitals && (
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      textAlign: "right",
                    }}
                  >
                    <div>BP: <strong>{p.vitals.bp}</strong></div>
                    <div>SpO2: <strong style={{ color: "#34D399" }}>{p.vitals.spo2}</strong></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Floor & Ward Occupancy Summary */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "22px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
              Floor-Wise Ward Occupancy
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
              Live census breakdown per floor
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {floors.map((floor) => {
              const floorPatients = admittedPatients.filter((p) =>
                floor.name.toLowerCase().includes(p.floor?.toLowerCase().split(" ")[0] || "")
              );
              const occ = Math.round((floorPatients.length / floor.totalBeds) * 100) || 0;

              return (
                <div key={floor.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>{floor.name}</span>
                    <span style={{ color: "#64748b" }}>
                      {floorPatients.length} / {floor.totalBeds} Beds ({occ}%)
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: 8,
                      backgroundColor: "#ffffff",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(100, occ)}%`,
                        backgroundColor: occ > 80 ? "#EF4444" : occ > 50 ? "#0284C7" : "#10B981",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Doctor Profile Shortcuts */}
          <div
            style={{
              marginTop: "auto",
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#38BDF8", display: "block", marginBottom: 8 }}>
              Doctor Quick Access:
            </span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {staff
                .filter((s) => s.role === "Doctor")
                .slice(0, 3)
                .map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setActiveTab("doctor")}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#475569",
                      border: "1px solid #cbd5e1",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                    }}
                  >
                    👨‍⚕️ {doc.name}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
