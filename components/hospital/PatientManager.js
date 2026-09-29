"use client";

import { useState } from "react";
import {
  UserPlus,
  Bed,
  Search,
  Filter,
  Stethoscope,
  HeartPulse,
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  ChevronRight,
  X,
  Phone,
  Calendar,
  Building2,
  Trash2,
} from "lucide-react";

export default function PatientManager({
  patients,
  setPatients,
  allStaff,
  floors,
  onAdmitPatient,
  onGenerateBillForPatient,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL" | "Admitted" | "OPD Done" | "Discharged"
  const [selectedPatient, setSelectedPatient] = useState(null); // Detail view modal
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);

  // New Patient Form State
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    mobile: "",
    address: "Kanpur, UP",
    emergencyContact: "",
    bloodGroup: "B+",
    admissionType: "IPD (General Ward)",
    floor: "Floor 1",
    roomNo: "Ward 101 (Male)",
    bedNo: "Bed 101-C",
    primaryDoctorId: doctors[0]?.id || "DOC-101",
    attendingNurseId: nurses[0]?.id || "NUR-201",
    diagnosis: "",
    symptoms: "",
    roomChargePerDay: 1200,
  });

  // Filtered patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.uhid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mobile?.includes(searchTerm) ||
      p.primaryDoctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roomNo?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "Admitted" && p.status === "Admitted") ||
      (statusFilter === "OPD" && p.admissionType?.includes("OPD")) ||
      (statusFilter === "Discharged" && p.status === "Discharged");

    return matchesSearch && matchesStatus;
  });

  // Handle Register & Admit Submit
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!patientForm.name.trim() || !patientForm.mobile.trim()) return;

    const assignedDoc = doctors.find((d) => d.id === patientForm.primaryDoctorId) || doctors[0];
    const assignedNurse = nurses.find((n) => n.id === patientForm.attendingNurseId) || nurses[0];

    const isIPD = !patientForm.admissionType.includes("OPD");

    const newPatient = {
      id: `PAT-${Date.now().toString().slice(-4)}`,
      uhid: `UHID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: patientForm.name.trim(),
      age: parseInt(patientForm.age) || 30,
      gender: patientForm.gender,
      mobile: patientForm.mobile.trim(),
      address: patientForm.address,
      emergencyContact: patientForm.emergencyContact || "Relative",
      bloodGroup: patientForm.bloodGroup,
      admissionType: patientForm.admissionType,
      admissionDate: new Date().toISOString(),
      status: isIPD ? "Admitted" : "OPD Done",
      floor: isIPD ? patientForm.floor : "Ground Floor",
      roomNo: isIPD ? patientForm.roomNo : "OPD Chamber",
      bedNo: isIPD ? patientForm.bedNo : "N/A (OPD)",
      primaryDoctorId: assignedDoc.id,
      primaryDoctorName: assignedDoc.name,
      doctorDepartment: assignedDoc.department,
      attendingNurseId: assignedNurse.id,
      attendingNurseName: assignedNurse.name,
      diagnosis: patientForm.diagnosis || "Under Evaluation",
      symptoms: patientForm.symptoms || "Reported for medical examination",
      vitals: {
        bp: "120/80 mmHg",
        pulse: "72 bpm",
        spo2: "98%",
        temp: "98.6°F",
        sugar: "110 mg/dL",
        respiration: "18 /min",
        recordedAt: "At Admission",
        recordedBy: assignedNurse.name,
      },
      nurseNotes: isIPD ? "Patient admitted. Initial admission formalities completed." : "OPD consultation done.",
      roomChargePerDay: isIPD ? parseInt(patientForm.roomChargePerDay) || 1200 : 0,
    };

    setPatients([newPatient, ...patients]);
    setIsAdmitModalOpen(false);

    // Reset Form
    setPatientForm({
      name: "",
      age: "",
      gender: "Male",
      mobile: "",
      address: "Kanpur, UP",
      emergencyContact: "",
      bloodGroup: "B+",
      admissionType: "IPD (General Ward)",
      floor: "Floor 1",
      roomNo: "Ward 101 (Male)",
      bedNo: "Bed 101-C",
      primaryDoctorId: doctors[0]?.id || "DOC-101",
      attendingNurseId: nurses[0]?.id || "NUR-201",
      diagnosis: "",
      symptoms: "",
      roomChargePerDay: 1200,
    });
  }

  // Handle Discharging a Patient
  function handleDischarge(patientId) {
    if (!window.confirm("Are you sure you want to discharge this patient? This will free the allocated bed.")) return;

    const updated = patients.map((p) => {
      if (p.id === patientId) {
        return {
          ...p,
          status: "Discharged",
          dischargeDate: new Date().toISOString(),
          roomNo: "Discharged",
          bedNo: "Freed",
        };
      }
      return p;
    });

    setPatients(updated);
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
    }
  }

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Top Action Bar */}
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
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#F8FAFC" }}>
            Hospital Inpatient (IPD) &amp; Outpatient (OPD) Directory
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#94A3B8" }}>
            Total Registered Patients: <strong>{patients.length}</strong> • Currently Admitted:{" "}
            <strong style={{ color: "#34D399" }}>
              {patients.filter((p) => p.status === "Admitted").length}
            </strong>
          </p>
        </div>

        <button
          onClick={() => setIsAdmitModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0284C7",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
          }}
        >
          <UserPlus size={18} />
          <span>+ Register / Admit New Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid #1E293B",
          borderRadius: "12px",
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {/* Search Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#0F172A",
            border: "1px solid #334155",
            borderRadius: "8px",
            padding: "8px 14px",
            flex: "1 1 300px",
            maxWidth: 420,
          }}
        >
          <Search size={16} style={{ color: "#94A3B8" }} />
          <input
            type="text"
            placeholder="Search by Patient Name, UHID, Mobile, Doctor, or Room..."
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

        {/* Status Filter Buttons */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["ALL", "Admitted", "OPD", "Discharged"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                backgroundColor: statusFilter === status ? "#0284C7" : "#1E293B",
                color: statusFilter === status ? "#ffffff" : "#94A3B8",
                border: "1px solid #334155",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {status === "ALL" ? "All Patients" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Table */}
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid #1E293B",
          borderRadius: "14px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#0F172A", borderBottom: "1px solid #1E293B", color: "#94A3B8" }}>
              <th style={{ padding: "14px 18px" }}>Patient &amp; UHID</th>
              <th style={{ padding: "14px 18px" }}>Status / Type</th>
              <th style={{ padding: "14px 18px" }}>Ward / Bed Location</th>
              <th style={{ padding: "14px 18px" }}>Primary Doctor</th>
              <th style={{ padding: "14px 18px" }}>Attending Nurse</th>
              <th style={{ padding: "14px 18px" }}>Diagnosis</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                style={{
                  borderBottom: "1px solid #1E293B",
                  transition: "background-color 0.15s ease",
                }}
              >
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.94rem" }}>
                    {patient.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: 2 }}>
                    {patient.uhid} • {patient.age}y/{patient.gender} • 📞 {patient.mobile}
                  </div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      backgroundColor:
                        patient.status === "Admitted"
                          ? "rgba(16, 185, 129, 0.15)"
                          : patient.status === "Discharged"
                          ? "rgba(148, 163, 184, 0.15)"
                          : "rgba(56, 189, 248, 0.15)",
                      color:
                        patient.status === "Admitted"
                          ? "#34D399"
                          : patient.status === "Discharged"
                          ? "#94A3B8"
                          : "#38BDF8",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: `1px solid ${
                        patient.status === "Admitted"
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(56, 189, 248, 0.3)"
                      }`,
                    }}
                  >
                    {patient.status}
                  </span>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  {patient.status === "Admitted" ? (
                    <div>
                      <div style={{ fontWeight: 600, color: "#38BDF8" }}>
                        {patient.floor} • {patient.roomNo}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "#94A3B8" }}>
                        Bed: <strong>{patient.bedNo}</strong>
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "#64748B" }}>N/A ({patient.status})</span>
                  )}
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 600, color: "#F8FAFC" }}>{patient.primaryDoctorName}</div>
                  <div style={{ fontSize: "0.76rem", color: "#94A3B8" }}>{patient.doctorDepartment}</div>
                </td>

                <td style={{ padding: "14px 18px" }}>
                  <div style={{ color: "#34D399", fontWeight: 600 }}>{patient.attendingNurseName}</div>
                </td>

                <td style={{ padding: "14px 18px", maxWidth: 220 }}>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#CBD5E1",
                    }}
                  >
                    {patient.diagnosis}
                  </div>
                </td>

                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      style={{
                        backgroundColor: "#1E293B",
                        color: "#38BDF8",
                        border: "1px solid #334155",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      View File
                    </button>

                    {patient.status === "Admitted" && (
                      <button
                        onClick={() => handleDischarge(patient.id)}
                        style={{
                          backgroundColor: "rgba(239, 68, 68, 0.12)",
                          color: "#F87171",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Discharge
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Register & Admit New Patient */}
      {isAdmitModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#111C44",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: 720,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                borderBottom: "1px solid #1E293B",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                  New Patient Registration &amp; Hospital Admission
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Assign doctor, ward, room, and attending nurse
                </span>
              </div>
              <button
                onClick={() => setIsAdmitModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              {/* Patient Basic Info */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Swaroop"
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={patientForm.age}
                    onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Gender *
                  </label>
                  <select
                    value={patientForm.gender}
                    onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={patientForm.mobile}
                    onChange={(e) => setPatientForm({ ...patientForm, mobile: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Blood Group
                  </label>
                  <select
                    value={patientForm.bloodGroup}
                    onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Admission Type
                  </label>
                  <select
                    value={patientForm.admissionType}
                    onChange={(e) => setPatientForm({ ...patientForm, admissionType: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="IPD (General Ward)">IPD (General Ward)</option>
                    <option value="IPD (Private AC Room)">IPD (Private AC Room)</option>
                    <option value="IPD (ICU / Critical)">IPD (ICU / Critical Care)</option>
                    <option value="IPD (Emergency)">IPD (Emergency Triage)</option>
                    <option value="OPD Consultation">OPD Consultation Only</option>
                  </select>
                </div>
              </div>

              {/* Inpatient Bed & Floor Allocation */}
              {!patientForm.admissionType.includes("OPD") && (
                <div
                  style={{
                    backgroundColor: "#0F172A",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #334155",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#38BDF8", display: "block", marginBottom: 10 }}>
                    🛏️ Hospital Bed &amp; Floor Allocation
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#94A3B8", marginBottom: 4 }}>
                        Floor
                      </label>
                      <select
                        value={patientForm.floor}
                        onChange={(e) => setPatientForm({ ...patientForm, floor: e.target.value })}
                        style={{ width: "100%", backgroundColor: "#1E293B", color: "#fff", padding: "8px", borderRadius: "6px", border: "1px solid #475569" }}
                      >
                        <option value="Ground Floor">Ground Floor (Emergency)</option>
                        <option value="Floor 1">Floor 1 (General Ward)</option>
                        <option value="Floor 2">Floor 2 (Private Rooms)</option>
                        <option value="Floor 3">Floor 3 (ICU / CCU)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#94A3B8", marginBottom: 4 }}>
                        Room / Ward No.
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Room 204 or Ward 101"
                        value={patientForm.roomNo}
                        onChange={(e) => setPatientForm({ ...patientForm, roomNo: e.target.value })}
                        style={{ width: "100%", backgroundColor: "#1E293B", color: "#fff", padding: "8px", borderRadius: "6px", border: "1px solid #475569" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#94A3B8", marginBottom: 4 }}>
                        Bed Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bed 204-A"
                        value={patientForm.bedNo}
                        onChange={(e) => setPatientForm({ ...patientForm, bedNo: e.target.value })}
                        style={{ width: "100%", backgroundColor: "#1E293B", color: "#fff", padding: "8px", borderRadius: "6px", border: "1px solid #475569" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", color: "#94A3B8", marginBottom: 4 }}>
                        Bed Charge (₹/Day)
                      </label>
                      <input
                        type="number"
                        placeholder="1200"
                        value={patientForm.roomChargePerDay}
                        onChange={(e) => setPatientForm({ ...patientForm, roomChargePerDay: e.target.value })}
                        style={{ width: "100%", backgroundColor: "#1E293B", color: "#fff", padding: "8px", borderRadius: "6px", border: "1px solid #475569" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Staff Assignments: Doctor & Nurse */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Assign Primary Doctor *
                  </label>
                  <select
                    value={patientForm.primaryDoctorId}
                    onChange={(e) => setPatientForm({ ...patientForm, primaryDoctorId: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                    Assign Attending Nurse *
                  </label>
                  <select
                    value={patientForm.attendingNurseId}
                    onChange={(e) => setPatientForm({ ...patientForm, attendingNurseId: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {nurses.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.name} ({nurse.department} - {nurse.shift})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Diagnosis and Symptoms */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                  Initial Clinical Diagnosis *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acute Appendicitis / High Grade Viral Fever"
                  value={patientForm.diagnosis}
                  onChange={(e) => setPatientForm({ ...patientForm, diagnosis: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "#0F172A",
                    border: "1px solid #334155",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    color: "#ffffff",
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#94A3B8", marginBottom: 4 }}>
                  Presenting Symptoms &amp; History
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Abdominal pain for 24 hours, nausea, fever."
                  value={patientForm.symptoms}
                  onChange={(e) => setPatientForm({ ...patientForm, symptoms: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "#0F172A",
                    border: "1px solid #334155",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    color: "#ffffff",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsAdmitModalOpen(false)}
                  style={{
                    backgroundColor: "#1E293B",
                    color: "#94A3B8",
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
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Confirm Registration &amp; Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL DRAWER / MODAL: Patient Full Overview */}
      {selectedPatient && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#111C44",
              border: "1px solid #1E293B",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: 700,
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
                borderBottom: "1px solid #1E293B",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>
                  {selectedPatient.name} ({selectedPatient.uhid})
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
                  Status: <strong style={{ color: "#34D399" }}>{selectedPatient.status}</strong> • {selectedPatient.admissionType}
                </span>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.88rem" }}>
              <div style={{ backgroundColor: "#0F172A", padding: "16px", borderRadius: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <span style={{ color: "#94A3B8", display: "block" }}>Age &amp; Gender:</span>
                    <strong>{selectedPatient.age} yrs • {selectedPatient.gender}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8", display: "block" }}>Blood Group:</span>
                    <strong style={{ color: "#EF4444" }}>{selectedPatient.bloodGroup}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8", display: "block" }}>Contact Phone:</span>
                    <strong>{selectedPatient.mobile}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#94A3B8", display: "block" }}>Emergency Contact:</span>
                    <strong>{selectedPatient.emergencyContact}</strong>
                  </div>
                </div>
              </div>

              {selectedPatient.status === "Admitted" && (
                <div style={{ backgroundColor: "#0F172A", padding: "16px", borderRadius: "8px" }}>
                  <span style={{ color: "#38BDF8", fontWeight: 700, display: "block", marginBottom: 6 }}>
                    Inpatient Location:
                  </span>
                  <div>
                    {selectedPatient.floor} • <strong>{selectedPatient.roomNo}</strong> • Bed:{" "}
                    <strong>{selectedPatient.bedNo}</strong>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    Primary Doctor: <strong>{selectedPatient.primaryDoctorName}</strong> ({selectedPatient.doctorDepartment})
                  </div>
                  <div style={{ marginTop: 4 }}>
                    Attending Nurse: <strong style={{ color: "#34D399" }}>{selectedPatient.attendingNurseName}</strong>
                  </div>
                </div>
              )}

              <div style={{ backgroundColor: "#0F172A", padding: "16px", borderRadius: "8px" }}>
                <span style={{ color: "#FCD34D", fontWeight: 700, display: "block", marginBottom: 4 }}>
                  Diagnosis &amp; Care History:
                </span>
                <div>{selectedPatient.diagnosis}</div>
                {selectedPatient.symptoms && (
                  <p style={{ margin: "6px 0 0", color: "#94A3B8", fontSize: "0.84rem" }}>
                    {selectedPatient.symptoms}
                  </p>
                )}
                {selectedPatient.nurseNotes && (
                  <div style={{ marginTop: 10, borderTop: "1px solid #1E293B", paddingTop: 8, fontSize: "0.82rem", color: "#CBD5E1" }}>
                    <strong>Nurse / Ward Notes:</strong> {selectedPatient.nurseNotes}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              {selectedPatient.status === "Admitted" ? (
                <button
                  onClick={() => handleDischarge(selectedPatient.id)}
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    color: "#F87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Discharge Patient
                </button>
              ) : <div />}

              <button
                onClick={() => setSelectedPatient(null)}
                style={{
                  backgroundColor: "#0284C7",
                  color: "#ffffff",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
