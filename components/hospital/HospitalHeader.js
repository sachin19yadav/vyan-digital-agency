"use client";

import {
  Activity,
  HeartPulse,
  Phone,
  Bed,
  Users,
  Calendar,
  Clock,
  UserCheck,
  ShieldAlert,
  ChevronDown,
  Cloud,
  Stethoscope,
  FileText,
  CreditCard,
  Building2,
  Pill,
} from "lucide-react";

export default function HospitalHeader({
  activeTab,
  setActiveTab,
  currentStaff,
  setCurrentStaff,
  allStaff,
  totalPatients,
  admittedCount,
  totalBeds,
  occupiedBeds,
  syncStatus,
  onOpenSync,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");

  const bedPercentage = Math.round((occupiedBeds / totalBeds) * 100) || 0;

  return (
    <header
      style={{
        backgroundColor: "#0B132B",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Top Utility & Emergency Bar */}
      <div
        style={{
          backgroundColor: "#070D1F",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "6px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.82rem",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#38BDF8" }}>
            <Activity size={14} className="pulse-dot" />
            <span style={{ fontWeight: 600 }}>24x7 Emergency &amp; Trauma Center Active</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8" }}>
            <Phone size={13} style={{ color: "#EF4444" }} />
            <span>Emergency: <strong style={{ color: "#ffffff" }}>+91 96548 80240</strong></span>
          </div>
        </div>

        {/* Live Census & Active Role Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Bed Occupancy Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: "3px 10px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Bed size={13} style={{ color: "#10B981" }} />
            <span>
              Beds: <strong style={{ color: "#10B981" }}>{occupiedBeds}/{totalBeds}</strong> ({bedPercentage}% Full)
            </span>
          </div>

          {/* Google Sheet Sync Indicator */}
          <button
            onClick={onOpenSync}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: syncStatus?.synced ? "rgba(16, 185, 129, 0.15)" : "rgba(56, 189, 248, 0.12)",
              color: syncStatus?.synced ? "#34D399" : "#38BDF8",
              border: `1px solid ${syncStatus?.synced ? "rgba(16, 185, 129, 0.3)" : "rgba(56, 189, 248, 0.3)"}`,
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "0.78rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Cloud size={13} />
            <span>{syncStatus?.text || "Google Sheet Sync"}</span>
          </button>

          {/* Role / Staff Profile Switcher Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#64748B", fontSize: "0.78rem" }}>Logged In As:</span>
            <div style={{ position: "relative" }}>
              <select
                value={currentStaff?.id || ""}
                onChange={(e) => {
                  const found = allStaff.find((s) => s.id === e.target.value);
                  if (found) setCurrentStaff(found);
                }}
                style={{
                  backgroundColor: "#1E293B",
                  color: "#F8FAFC",
                  border: "1px solid #334155",
                  padding: "4px 28px 4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                }}
              >
                <optgroup label="Doctors">
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      👨‍⚕️ {doc.name} ({doc.department})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Nurses & Clinical Staff">
                  {nurses.map((nurse) => (
                    <option key={nurse.id} value={nurse.id}>
                      👩‍⚕️ {nurse.name} ({nurse.role})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Hospital Admin & Reception">
                  <option value="ADM-301">👩‍💼 Neha Gupta (Reception &amp; Billing)</option>
                  <option value="PHM-401">💊 Rahul Verma (Chief Pharmacist)</option>
                  <option value="ADM-001">🛡️ Super Administrator</option>
                </optgroup>
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#94A3B8",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Hospital Navigation Header */}
      <div
        style={{
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Brand & Hospital Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284C7, #0D9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.4)",
            }}
          >
            <HeartPulse size={26} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.3px",
                  color: "#ffffff",
                }}
              >
                Aarogya Care Hospital
              </h1>
              <span
                style={{
                  backgroundColor: "rgba(14, 165, 233, 0.2)",
                  color: "#38BDF8",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                HMS PRO
              </span>
            </div>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "0.78rem",
                color: "#94A3B8",
              }}
            >
              Multispeciality Medical &amp; Inpatient Care System • Panki, Kanpur
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "dashboard" ? "#0284C7" : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Activity size={15} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("doctor")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "doctor" ? "#0D9488" : "transparent",
              color: activeTab === "doctor" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Stethoscope size={15} />
            <span>Doctor Portal</span>
            {currentStaff?.role === "Doctor" && (
              <span
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0D9488",
                  borderRadius: "10px",
                  padding: "1px 6px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                }}
              >
                Active
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("opd")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "opd" ? "#0284C7" : "transparent",
              color: activeTab === "opd" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Calendar size={15} />
            <span>OPD Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab("patients")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "patients" ? "#0284C7" : "transparent",
              color: activeTab === "patients" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Bed size={15} />
            <span>Patients ({admittedCount} IPD)</span>
          </button>

          <button
            onClick={() => setActiveTab("duty")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "duty" ? "#0284C7" : "transparent",
              color: activeTab === "duty" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Clock size={15} />
            <span>Duty &amp; Shifts</span>
          </button>

          <button
            onClick={() => setActiveTab("staff")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "staff" ? "#0284C7" : "transparent",
              color: activeTab === "staff" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Users size={15} />
            <span>Staff ({allStaff.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pharmacy")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "pharmacy" ? "#0284C7" : "transparent",
              color: activeTab === "pharmacy" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Pill size={15} />
            <span>Prescriptions</span>
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "billing" ? "#0284C7" : "transparent",
              color: activeTab === "billing" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <CreditCard size={15} />
            <span>Billing</span>
          </button>

          <button
            onClick={() => setActiveTab("rooms")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              backgroundColor: activeTab === "rooms" ? "#0284C7" : "transparent",
              color: activeTab === "rooms" ? "#ffffff" : "#94A3B8",
              transition: "all 0.15s ease",
            }}
          >
            <Building2 size={15} />
            <span>Floors &amp; Beds</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
