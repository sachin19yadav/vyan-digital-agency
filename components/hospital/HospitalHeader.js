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
  Briefcase,
  LogOut,
  Home,
  ShieldCheck,
} from "lucide-react";

export default function HospitalHeader({
  activeTab,
  setActiveTab,
  currentRole = "Admin",
  setCurrentRole,
  currentStaff,
  setCurrentStaff,
  allStaff,
  totalPatients,
  admittedCount,
  totalBeds,
  occupiedBeds,
  syncStatus,
  onOpenSync,
  onOpenLoginModal,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");
  const receptionists = allStaff.filter((s) => s.role === "Receptionist");
  const hrStaff = allStaff.filter((s) => s.role === "HR");

  const bedPercentage = Math.round((occupiedBeds / totalBeds) * 100) || 0;

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        color: "#0f172a",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Top Utility & Emergency Bar - Light Theme */}
      <div
        style={{
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
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
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#0284c7" }}>
            <Activity size={14} className="pulse-dot" color="#0284c7" />
            <span style={{ fontWeight: 600 }}>24x7 Emergency &amp; Trauma Center Active</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b" }}>
            <Phone size={13} style={{ color: "#dc2626" }} />
            <span>Emergency Helpline: <strong style={{ color: "#dc2626" }}>+91 96548 80240</strong> / <strong>108 Ambulance</strong></span>
          </div>
        </div>

        {/* Live Census & Active Role Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Bed Occupancy Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#f0fdf4",
              color: "#15803d",
              padding: "3px 10px",
              borderRadius: "20px",
              border: "1px solid #bbf7d0",
              fontWeight: 600,
            }}
          >
            <Bed size={13} style={{ color: "#16a34a" }} />
            <span>
              Beds: <strong>{occupiedBeds}/{totalBeds}</strong> ({bedPercentage}% Occupied)
            </span>
          </div>

          {/* Google Sheet Sync (Visible for Admin / HR) */}
          {(currentRole === "Admin" || currentRole === "HR") && (
            <button
              onClick={onOpenSync}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: syncStatus?.synced ? "#ecfdf5" : "#f0f9ff",
                color: syncStatus?.synced ? "#059669" : "#0284c7",
                border: `1px solid ${syncStatus?.synced ? "#a7f3d0" : "#bae6fd"}`,
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
          )}

          {/* Role / Profile Switcher Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600 }}>Active Role:</span>
            <div style={{ position: "relative" }}>
              <select
                value={currentRole === "Guest" ? "Guest" : currentStaff?.id || "ADM-001"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "Guest") {
                    setCurrentRole("Guest");
                    setActiveTab("landing");
                    return;
                  }
                  const found = allStaff.find((s) => s.id === val);
                  if (found) {
                    setCurrentStaff(found);
                    setCurrentRole(found.role);
                    if (found.role === "Doctor") setActiveTab("doctor");
                    else if (found.role === "Nurse") setActiveTab("nurse");
                    else if (found.role === "Receptionist") setActiveTab("reception");
                    else if (found.role === "HR") setActiveTab("hr");
                    else setActiveTab("dashboard");
                  }
                }}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  padding: "4px 28px 4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <option value="Guest">🌐 Public Hospital Visitor (Landing Page)</option>
                <optgroup label="👑 Super Admin">
                  <option value="ADM-001">Super Admin (Full Master Control)</option>
                </optgroup>
                <optgroup label="🩺 Doctors">
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      👨‍⚕️ {doc.name} ({doc.department})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="👩‍⚕️ Nurses (Ward / ICU)">
                  {nurses.map((nurse) => (
                    <option key={nurse.id} value={nurse.id}>
                      👩‍⚕️ {nurse.name} ({nurse.assignedFloor || nurse.role})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="📋 Reception & Front Desk">
                  {receptionists.map((rec) => (
                    <option key={rec.id} value={rec.id}>
                      📋 {rec.name} (Front Desk)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="👥 Human Resources (HR)">
                  {hrStaff.map((hr) => (
                    <option key={hr.id} value={hr.id}>
                      👥 {hr.name} (HR &amp; Attendance)
                    </option>
                  ))}
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
                  color: "#64748b",
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
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
          onClick={() => {
            if (currentRole === "Guest") setActiveTab("landing");
            else if (currentRole === "Admin") setActiveTab("dashboard");
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284c7, #0d9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)",
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
                  color: "#0f172a",
                }}
              >
                Aarogya Care Hospital
              </h1>
              <span
                style={{
                  backgroundColor:
                    currentRole === "Doctor"
                      ? "#f0fdf4"
                      : currentRole === "Nurse"
                      ? "#fef3c7"
                      : currentRole === "Receptionist"
                      ? "#f3e8ff"
                      : currentRole === "HR"
                      ? "#fce7f3"
                      : "#e0f2fe",
                  color:
                    currentRole === "Doctor"
                      ? "#15803d"
                      : currentRole === "Nurse"
                      ? "#b45309"
                      : currentRole === "Receptionist"
                      ? "#7e22ce"
                      : currentRole === "HR"
                      ? "#be185d"
                      : "#0369a1",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                {currentRole === "Guest" ? "PUBLIC PORTAL" : `${currentRole.toUpperCase()} DESK`}
              </span>
            </div>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "0.78rem",
                color: "#64748b",
              }}
            >
              {currentRole === "Doctor"
                ? `Chamber: ${currentStaff?.room || "Chamber 101"} • ${currentStaff?.name}`
                : currentRole === "Nurse"
                ? `Ward: ${currentStaff?.assignedFloor || "Floor 3 ICU"} • ${currentStaff?.name}`
                : currentRole === "Receptionist"
                ? `Front Office • ${currentStaff?.name || "Reception Desk"}`
                : currentRole === "HR"
                ? `HR & Workforce Manager • ${currentStaff?.name || "Kavita Saxena"}`
                : "Multispeciality Medical & Trauma Center • Panki, Kanpur"}
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs based on Role */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            backgroundColor: "#f1f5f9",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            flexWrap: "wrap",
          }}
        >
          {/* GUEST ROLE TABS */}
          {currentRole === "Guest" && (
            <>
              <button
                onClick={() => setActiveTab("landing")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "landing" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "landing" ? "#ffffff" : "transparent",
                  color: activeTab === "landing" ? "#0284c7" : "#475569",
                  boxShadow: activeTab === "landing" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <Home size={15} />
                <span>Hospital Home</span>
              </button>

              <button
                onClick={onOpenLoginModal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "#0284c7",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(2, 132, 199, 0.3)",
                }}
              >
                <Users size={15} />
                <span>Staff &amp; Doctor Login</span>
              </button>
            </>
          )}

          {/* DOCTOR ROLE TABS */}
          {currentRole === "Doctor" && (
            <>
              <button
                onClick={() => setActiveTab("doctor")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: activeTab === "doctor" ? "1px solid #0d9488" : "none",
                  backgroundColor: activeTab === "doctor" ? "#0d9488" : "transparent",
                  color: activeTab === "doctor" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "doctor" ? "0 2px 6px rgba(13, 148, 136, 0.25)" : "none",
                }}
              >
                <Stethoscope size={15} />
                <span>My Doctor Chamber (IPD &amp; OPD Queue)</span>
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
                  border: activeTab === "rooms" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "rooms" ? "#ffffff" : "transparent",
                  color: activeTab === "rooms" ? "#0284c7" : "#475569",
                }}
              >
                <Bed size={15} />
                <span>Bed Census ({totalBeds - occupiedBeds} Khali)</span>
              </button>
            </>
          )}

          {/* NURSE ROLE TABS */}
          {currentRole === "Nurse" && (
            <>
              <button
                onClick={() => setActiveTab("nurse")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: activeTab === "nurse" ? "1px solid #d97706" : "none",
                  backgroundColor: activeTab === "nurse" ? "#f59e0b" : "transparent",
                  color: activeTab === "nurse" ? "#000000" : "#475569",
                  boxShadow: activeTab === "nurse" ? "0 2px 6px rgba(245, 158, 11, 0.25)" : "none",
                }}
              >
                <Pill size={15} />
                <span>Nurse Station (Scheduled Meds &amp; Vitals)</span>
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
                  border: activeTab === "duty" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "duty" ? "#ffffff" : "transparent",
                  color: activeTab === "duty" ? "#0284c7" : "#475569",
                }}
              >
                <Clock size={15} />
                <span>My Shift Roster</span>
              </button>
            </>
          )}

          {/* RECEPTIONIST ROLE TABS */}
          {currentRole === "Receptionist" && (
            <>
              <button
                onClick={() => setActiveTab("reception")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: activeTab === "reception" ? "1px solid #7c3aed" : "none",
                  backgroundColor: activeTab === "reception" ? "#7c3aed" : "transparent",
                  color: activeTab === "reception" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "reception" ? "0 2px 6px rgba(124, 58, 237, 0.25)" : "none",
                }}
              >
                <Calendar size={15} />
                <span>Reception Desk (Book OPD &amp; Bed Status)</span>
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
                  border: activeTab === "billing" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "billing" ? "#ffffff" : "transparent",
                  color: activeTab === "billing" ? "#059669" : "#475569",
                }}
              >
                <CreditCard size={15} />
                <span>Billing &amp; Collections</span>
              </button>
            </>
          )}

          {/* HR ROLE TABS */}
          {currentRole === "HR" && (
            <>
              <button
                onClick={() => setActiveTab("hr")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: activeTab === "hr" ? "1px solid #be185d" : "none",
                  backgroundColor: activeTab === "hr" ? "#db2777" : "transparent",
                  color: activeTab === "hr" ? "#ffffff" : "#475569",
                  boxShadow: activeTab === "hr" ? "0 2px 6px rgba(219, 39, 119, 0.25)" : "none",
                }}
              >
                <Briefcase size={15} />
                <span>HR &amp; Staff Attendance</span>
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
                  border: activeTab === "duty" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "duty" ? "#ffffff" : "transparent",
                  color: activeTab === "duty" ? "#0284c7" : "#475569",
                }}
              >
                <Clock size={15} />
                <span>Floor Duty Roster</span>
              </button>
            </>
          )}

          {/* SUPER ADMIN ROLE TABS (Full Control Over All Modules) */}
          {currentRole === "Admin" && (
            <>
              <button
                onClick={() => setActiveTab("dashboard")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "dashboard" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "dashboard" ? "#ffffff" : "transparent",
                  color: activeTab === "dashboard" ? "#0284c7" : "#475569",
                  boxShadow: activeTab === "dashboard" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <Activity size={14} />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("doctor")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "doctor" ? "1px solid #0d9488" : "none",
                  backgroundColor: activeTab === "doctor" ? "#0d9488" : "transparent",
                  color: activeTab === "doctor" ? "#ffffff" : "#475569",
                }}
              >
                <Stethoscope size={14} />
                <span>Doctor Chamber</span>
              </button>

              <button
                onClick={() => setActiveTab("nurse")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "nurse" ? "1px solid #d97706" : "none",
                  backgroundColor: activeTab === "nurse" ? "#f59e0b" : "transparent",
                  color: activeTab === "nurse" ? "#000000" : "#475569",
                }}
              >
                <Pill size={14} />
                <span>Nurse Station</span>
              </button>

              <button
                onClick={() => setActiveTab("reception")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "reception" ? "1px solid #7c3aed" : "none",
                  backgroundColor: activeTab === "reception" ? "#7c3aed" : "transparent",
                  color: activeTab === "reception" ? "#ffffff" : "#475569",
                }}
              >
                <Calendar size={14} />
                <span>Reception Desk</span>
              </button>

              <button
                onClick={() => setActiveTab("hr")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "hr" ? "1px solid #be185d" : "none",
                  backgroundColor: activeTab === "hr" ? "#db2777" : "transparent",
                  color: activeTab === "hr" ? "#ffffff" : "#475569",
                }}
              >
                <Briefcase size={14} />
                <span>HR &amp; Attendance</span>
              </button>

              <button
                onClick={() => setActiveTab("patients")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "patients" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "patients" ? "#ffffff" : "transparent",
                  color: activeTab === "patients" ? "#0284c7" : "#475569",
                }}
              >
                <Users size={14} />
                <span>IPD Patients</span>
              </button>

              <button
                onClick={() => setActiveTab("billing")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeTab === "billing" ? "1px solid #cbd5e1" : "none",
                  backgroundColor: activeTab === "billing" ? "#ffffff" : "transparent",
                  color: activeTab === "billing" ? "#059669" : "#475569",
                }}
              >
                <CreditCard size={14} />
                <span>Billing</span>
              </button>
            </>
          )}

          {/* Quick Return to Landing Page button */}
          {currentRole !== "Guest" && (
            <button
              onClick={() => {
                setCurrentRole("Guest");
                setActiveTab("landing");
              }}
              title="Logout & Return to Public Hospital Landing Page"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "7px 10px",
                borderRadius: "8px",
                fontSize: "0.78rem",
                cursor: "pointer",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
                color: "#64748b",
                marginLeft: 4,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
