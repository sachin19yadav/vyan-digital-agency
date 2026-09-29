"use client";

import { useState } from "react";
import {
  Users,
  UserPlus,
  Stethoscope,
  HeartPulse,
  Phone,
  Mail,
  Clock,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Search,
  X,
  Pill,
  CreditCard,
  UserCheck,
} from "lucide-react";

export default function StaffManager({ allStaff, setAllStaff }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL"); // ALL | Doctor | Nurse | Admin | Pharmacist
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedStaffProfile, setSelectedStaffProfile] = useState(null);

  // New Staff Form
  const [staffForm, setStaffForm] = useState({
    name: "",
    role: "Doctor",
    designation: "Consultant Physician",
    department: "General Medicine",
    qualification: "MBBS, MD",
    mobile: "",
    email: "",
    opdTiming: "09:00 AM – 02:00 PM",
    shift: "Morning (08:00 AM – 04:00 PM)",
    room: "Chamber 105",
    specialty: "Inpatient & Outpatient Care",
  });

  const filteredStaff = allStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.mobile.includes(searchTerm);

    const matchesRole =
      roleFilter === "ALL" || staff.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  function handleRegisterStaff(e) {
    e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.mobile.trim()) return;

    const prefix = staffForm.role === "Doctor" ? "DOC" : staffForm.role === "Nurse" ? "NUR" : "STF";
    const newStaff = {
      id: `${prefix}-${Math.floor(100 + Math.random() * 900)}`,
      name: staffForm.name.trim(),
      role: staffForm.role,
      designation: staffForm.designation,
      department: staffForm.department,
      qualification: staffForm.qualification,
      mobile: staffForm.mobile.trim(),
      email: staffForm.email || `${staffForm.name.toLowerCase().replace(/\s+/g, ".")}@aarogyacare.org`,
      opdTiming: staffForm.opdTiming,
      shift: staffForm.shift,
      status: "On Duty",
      room: staffForm.room,
      specialty: staffForm.specialty,
      assignedFloor: staffForm.role === "Nurse" ? "Floor 1 / Floor 2" : undefined,
    };

    setAllStaff([newStaff, ...allStaff]);
    setIsRegisterModalOpen(false);

    setStaffForm({
      name: "",
      role: "Doctor",
      designation: "Consultant Physician",
      department: "General Medicine",
      qualification: "MBBS, MD",
      mobile: "",
      email: "",
      opdTiming: "09:00 AM – 02:00 PM",
      shift: "Morning (08:00 AM – 04:00 PM)",
      room: "Chamber 105",
      specialty: "Inpatient & Outpatient Care",
    });
  }

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Top Header & Action */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
            Hospital Medical &amp; Clinical Staff Directory
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Manage staff profiles, designations, qualifications, shifts, and departmental assignments.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0284C7",
            color: "#0f172a",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
          }}
        >
          <UserPlus size={16} />
          <span>+ Register New Staff Member</span>
        </button>
      </div>

      {/* Filter & Role Switcher */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "14px 20px",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            padding: "8px 14px",
            flex: "1 1 300px",
            maxWidth: 400,
          }}
        >
          <Search size={16} style={{ color: "#64748b" }} />
          <input
            type="text"
            placeholder="Search by Doctor, Nurse, Designation, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "0.88rem",
              width: "100%",
              outline: "none",
            }}
          />
        </div>

        {/* Role Filter Tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { id: "ALL", label: `All Staff (${allStaff.length})` },
            { id: "Doctor", label: `Doctors (${allStaff.filter((s) => s.role === "Doctor").length})` },
            { id: "Nurse", label: `Nurses (${allStaff.filter((s) => s.role === "Nurse").length})` },
            { id: "Pharmacist", label: `Pharmacy (${allStaff.filter((s) => s.role === "Pharmacist").length})` },
            { id: "Receptionist", label: `Reception & Billing` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              style={{
                backgroundColor: roleFilter === tab.id ? "#0284C7" : "#1E293B",
                color: roleFilter === tab.id ? "#ffffff" : "#94A3B8",
                border: "1px solid #cbd5e1",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 20,
        }}
      >
        {filteredStaff.map((staff) => {
          const isDoc = staff.role === "Doctor";
          const isNurse = staff.role === "Nurse";

          return (
            <div
              key={staff.id}
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${isDoc ? "rgba(13, 148, 136, 0.3)" : isNurse ? "rgba(2, 132, 199, 0.3)" : "#1E293B"}`,
                borderRadius: "14px",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                position: "relative",
              }}
            >
              {/* Header: Name, Designation & Role Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      backgroundColor: isDoc ? "rgba(13, 148, 136, 0.15)" : "rgba(2, 132, 199, 0.15)",
                      color: isDoc ? "#2DD4BF" : "#38BDF8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isDoc ? <Stethoscope size={24} /> : isNurse ? <HeartPulse size={24} /> : <Users size={24} />}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                      {staff.name}
                    </h3>
                    <span style={{ fontSize: "0.82rem", color: "#38BDF8", fontWeight: 600 }}>
                      {staff.designation}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: isDoc ? "rgba(13, 148, 136, 0.2)" : "rgba(56, 189, 248, 0.2)",
                    color: isDoc ? "#2DD4BF" : "#38BDF8",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {staff.role}
                </span>
              </div>

              {/* Department, Qualification & Timing Info */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "0.84rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div>
                  <span style={{ color: "#64748b" }}>Department: </span>
                  <strong style={{ color: "#0f172a" }}>{staff.department}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Qualifications: </span>
                  <strong style={{ color: "#475569" }}>{staff.qualification}</strong>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Shift Timing: </span>
                  <span style={{ color: "#FCD34D", fontWeight: 600 }}>{staff.shift}</span>
                </div>
                {staff.room && (
                  <div>
                    <span style={{ color: "#64748b" }}>Location / Chamber: </span>
                    <strong style={{ color: "#0f172a" }}>{staff.room}</strong>
                  </div>
                )}
                {staff.assignedFloor && (
                  <div>
                    <span style={{ color: "#64748b" }}>Assigned Floor: </span>
                    <strong style={{ color: "#34D399" }}>{staff.assignedFloor}</strong>
                  </div>
                )}
              </div>

              {/* Contact & Status footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.78rem",
                  color: "#64748b",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Phone size={13} style={{ color: "#38BDF8" }} />
                  <span>{staff.mobile}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#34D399" }}>
                  <CheckCircle2 size={13} />
                  <span>{staff.status || "Active Duty"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Register New Staff Member */}
      {isRegisterModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: 640,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                  Register Staff Member &amp; Profile Setup
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Assign designation, department, qualification, and shift timing
                </span>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterStaff}>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Harish Chandra or Sister Neha"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Role / Category *
                  </label>
                  <select
                    value={staffForm.role}
                    onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse (Staff/Head)</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Receptionist">Receptionist / Billing</option>
                    <option value="Admin">Administrative Desk</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Consultant / ICU Nurse"
                    value={staffForm.designation}
                    onChange={(e) => setStaffForm({ ...staffForm, designation: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiology, Orthopedics, ICU"
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Qualifications
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MD, DM or B.Sc Nursing"
                    value={staffForm.qualification}
                    onChange={(e) => setStaffForm({ ...staffForm, qualification: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={staffForm.mobile}
                    onChange={(e) => setStaffForm({ ...staffForm, mobile: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Shift Timing *
                  </label>
                  <select
                    value={staffForm.shift}
                    onChange={(e) => setStaffForm({ ...staffForm, shift: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="Morning (08:00 AM – 04:00 PM)">Morning (08:00 AM – 04:00 PM)</option>
                    <option value="Evening (04:00 PM – 12:00 AM)">Evening (04:00 PM – 12:00 AM)</option>
                    <option value="Night (12:00 AM – 08:00 AM)">Night (12:00 AM – 08:00 AM)</option>
                    <option value="General Shift (09:00 AM – 06:00 PM)">General Shift (09:00 AM – 06:00 PM)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Chamber / Assigned Floor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chamber 104 or Floor 2 Ward"
                    value={staffForm.room}
                    onChange={(e) => setStaffForm({ ...staffForm, room: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#64748b",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0284C7",
                    color: "#0f172a",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Staff Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
