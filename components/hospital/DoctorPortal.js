"use client";

import { useState } from "react";
import {
  Stethoscope,
  UserPlus,
  Pill,
  ClipboardList,
  Activity,
  HeartPulse,
  Bed,
  CheckCircle2,
  Clock,
  Plus,
  X,
  Send,
  Calendar,
  AlertCircle,
  FileText,
  UserCheck,
  Search,
} from "lucide-react";

export default function DoctorPortal({
  currentStaff,
  allStaff,
  patients,
  setPatients,
  prescriptions,
  setPrescriptions,
  appointments = [],
  setAppointments,
  floors,
  onAdmitPatientClick,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    currentStaff?.role === "Doctor" ? currentStaff.id : doctors[0]?.id || "DOC-101"
  );

  const selectedDoctor =
    doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // OPD Appointment calculations for this doctor
  const todayDateStr = "2026-09-29";
  const [opdDateFilter, setOpdDateFilter] = useState(todayDateStr);

  const doctorAppointments = appointments.filter((a) => a.doctorId === selectedDoctor?.id);
  const todayDoctorApts = doctorAppointments.filter((a) => a.appointmentDate === todayDateStr);
  const myWaitingCount = todayDoctorApts.filter((a) => a.status === "Waiting").length;
  const myInConsultCount = todayDoctorApts.filter((a) => a.status === "In Consultation").length;
  const myCompletedCount = todayDoctorApts.filter((a) => a.status === "Completed").length;

  const filteredDoctorApts = doctorAppointments.filter((a) =>
    opdDateFilter === "ALL" ? true : a.appointmentDate === opdDateFilter
  );

  // Inpatients assigned to this doctor
  const myPatients = patients.filter(
    (p) => p.primaryDoctorId === selectedDoctor?.id
  );

  const [activePatientModal, setActivePatientModal] = useState(null); // Patient clinical view modal
  const [rxModalPatient, setRxModalPatient] = useState(null); // Write prescription modal
  const [traceMedPatient, setTraceMedPatient] = useState(null); // Trace suggested medicines modal
  const [vitalsModalPatient, setVitalsModalPatient] = useState(null); // Update vitals modal

  // Write Prescription Form state
  const [newRx, setNewRx] = useState({
    medicineName: "",
    type: "Tablet",
    dosage: "1 Tab",
    frequency: "1-0-1 (After Food)",
    duration: "5 Days",
    instructions: "Take with plain water after meals",
  });

  // Clinical Visit Note state
  const [newClinicalNote, setNewClinicalNote] = useState("");

  // Vitals form state
  const [vitalsForm, setVitalsForm] = useState({
    bp: "120/80 mmHg",
    pulse: "72 bpm",
    spo2: "98%",
    temp: "98.4°F",
    sugar: "110 mg/dL",
    respiration: "18 /min",
    nurseNotes: "",
  });

  // Handle writing prescription
  function handleAddPrescription(e) {
    e.preventDefault();
    if (!rxModalPatient || !newRx.medicineName.trim()) return;

    const newMedItem = {
      id: `MED-${Date.now()}`,
      name: newRx.medicineName.trim(),
      type: newRx.type,
      dosage: newRx.dosage,
      frequency: newRx.frequency,
      duration: newRx.duration,
      instructions: newRx.instructions,
      status: "Scheduled",
      lastGivenAt: "Prescribed just now",
      lastGivenBy: selectedDoctor.name,
    };

    // Check if an existing prescription for today exists or create new one
    const existingRxIndex = prescriptions.findIndex(
      (r) => r.patientId === rxModalPatient.id
    );

    if (existingRxIndex >= 0) {
      const updatedList = [...prescriptions];
      updatedList[existingRxIndex].medicines = [
        newMedItem,
        ...updatedList[existingRxIndex].medicines,
      ];
      setPrescriptions(updatedList);
    } else {
      const createdRx = {
        id: `RX-${Date.now().toString().slice(-4)}`,
        patientId: rxModalPatient.id,
        patientName: rxModalPatient.name,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date: new Date().toISOString(),
        diagnosis: rxModalPatient.diagnosis || "Under Observation",
        medicines: [newMedItem],
      };
      setPrescriptions([createdRx, ...prescriptions]);
    }

    setRxModalPatient(null);
    setNewRx({
      medicineName: "",
      type: "Tablet",
      dosage: "1 Tab",
      frequency: "1-0-1 (After Food)",
      duration: "5 Days",
      instructions: "Take with plain water after meals",
    });
  }

  // Handle updating vitals and clinical rounds note
  function handleSaveVitals(e) {
    e.preventDefault();
    if (!vitalsModalPatient) return;

    const updatedPatients = patients.map((p) => {
      if (p.id === vitalsModalPatient.id) {
        return {
          ...p,
          vitals: {
            bp: vitalsForm.bp,
            pulse: vitalsForm.pulse,
            spo2: vitalsForm.spo2,
            temp: vitalsForm.temp,
            sugar: vitalsForm.sugar,
            respiration: vitalsForm.respiration,
            recordedAt: "Just now (Doctor Round)",
            recordedBy: selectedDoctor.name,
          },
          nurseNotes: vitalsForm.nurseNotes
            ? `${selectedDoctor.name} Round Note: ${vitalsForm.nurseNotes}`
            : p.nurseNotes,
        };
      }
      return p;
    });

    setPatients(updatedPatients);
    setVitalsModalPatient(null);
  }

  // Get medicines prescribed to a patient
  function getPatientPrescriptions(patientId) {
    const rx = prescriptions.filter((r) => r.patientId === patientId);
    let allMeds = [];
    rx.forEach((r) => {
      if (r.medicines) {
        allMeds = [...allMeds, ...r.medicines];
      }
    });
    return allMeds;
  }

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Doctor Header & Selector Bar */}
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid #1E293B",
          borderRadius: "14px",
          padding: "20px 24px",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0D9488, #0284C7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(13, 148, 136, 0.4)",
            }}
          >
            <Stethoscope size={28} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#F8FAFC" }}>
                {selectedDoctor?.name}
              </h2>
              <span
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#34D399",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                ● On Inpatient Rounds
              </span>
            </div>
            <p style={{ margin: "3px 0 0", fontSize: "0.85rem", color: "#94A3B8" }}>
              {selectedDoctor?.designation} • <strong>{selectedDoctor?.department}</strong> • Chamber:{" "}
              {selectedDoctor?.room}
            </p>
          </div>
        </div>

        {/* Doctor Switcher & New Patient Action */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 600 }}>
              Switch Doctor Profile:
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              style={{
                backgroundColor: "#1E293B",
                color: "#ffffff",
                border: "1px solid #334155",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.department})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onAdmitPatientClick(selectedDoctor)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#0D9488",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontSize: "0.88rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(13, 148, 136, 0.35)",
              alignSelf: "flex-end",
            }}
          >
            <UserPlus size={16} />
            <span>+ Admit / Register Patient Under Me</span>
          </button>
        </div>
      </div>

      {/* Quick Stats for this Doctor */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            backgroundColor: "#111C44",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              backgroundColor: "rgba(2, 132, 199, 0.15)",
              color: "#38BDF8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bed size={22} />
          </div>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>
              Admitted Inpatients (IPD)
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F8FAFC" }}>
              {myPatients.filter((p) => p.status === "Admitted").length} Patients
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#111C44",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              backgroundColor: "rgba(13, 148, 136, 0.15)",
              color: "#2DD4BF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pill size={22} />
          </div>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>
              Total Prescriptions Active
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F8FAFC" }}>
              {prescriptions.filter((r) => r.doctorId === selectedDoctor?.id).length} Active Rx
            </div>
          </div>
        </div>

        {/* Card 3: Today's OPD Queue */}
        <div
          style={{
            backgroundColor: "#111C44",
            border: "1px solid rgba(13, 148, 136, 0.35)",
            borderRadius: "12px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              backgroundColor: "rgba(13, 148, 136, 0.2)",
              color: "#2DD4BF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>
              Today&apos;s OPD Patients
            </span>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#2DD4BF" }}>
              {todayDoctorApts.length} Patients
            </div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 2 }}>
              <span style={{ color: "#FCD34D" }}>{myWaitingCount} Waiting</span> •{" "}
              <span style={{ color: "#38BDF8" }}>{myInConsultCount} In Chamber</span> •{" "}
              <span style={{ color: "#34D399" }}>{myCompletedCount} Done</span>
            </div>
          </div>
        </div>

        {/* Card 4: OPD Timings */}
        <div
          style={{
            backgroundColor: "#111C44",
            border: "1px solid #1E293B",
            borderRadius: "12px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#34D399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Activity size={22} />
          </div>
          <div>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>
              OPD Timings Today
            </span>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#F8FAFC", marginTop: 2 }}>
              {selectedDoctor?.opdTiming || "Morning Session"}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 2 }}>
              Chamber: {selectedDoctor?.room}
            </div>
          </div>
        </div>
      </div>

      {/* OPD TODAY QUEUE SECTION FOR THIS DOCTOR */}
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid rgba(13, 148, 136, 0.3)",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            borderBottom: "1px solid #1E293B",
            paddingBottom: 14,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} style={{ color: "#2DD4BF" }} />
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                OPD Outpatient Token Queue for {selectedDoctor?.name}
              </h3>
            </div>
            <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
              Live queue booked by reception desk. Call patients into chamber and write digital prescriptions.
            </p>
          </div>

          {/* Date Selector for Doctor OPD View */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setOpdDateFilter("2026-09-29")}
              style={{
                backgroundColor: opdDateFilter === "2026-09-29" ? "#0D9488" : "#0F172A",
                color: opdDateFilter === "2026-09-29" ? "#ffffff" : "#94A3B8",
                border: "1px solid #334155",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📅 Today ({todayDoctorApts.length})
            </button>
            <button
              onClick={() => setOpdDateFilter("2026-09-30")}
              style={{
                backgroundColor: opdDateFilter === "2026-09-30" ? "#0D9488" : "#0F172A",
                color: opdDateFilter === "2026-09-30" ? "#ffffff" : "#94A3B8",
                border: "1px solid #334155",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📅 Tomorrow ({doctorAppointments.filter((a) => a.appointmentDate === "2026-09-30").length})
            </button>
            <button
              onClick={() => setOpdDateFilter("ALL")}
              style={{
                backgroundColor: opdDateFilter === "ALL" ? "#0D9488" : "#0F172A",
                color: opdDateFilter === "ALL" ? "#ffffff" : "#94A3B8",
                border: "1px solid #334155",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              All Dates Log
            </button>
          </div>
        </div>

        {filteredDoctorApts.length === 0 ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "#94A3B8",
              backgroundColor: "#0F172A",
              borderRadius: "8px",
              fontSize: "0.86rem",
            }}
          >
            No OPD appointments scheduled for {selectedDoctor?.name} on this date.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredDoctorApts.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: "#0F172A",
                  border: `1px solid ${
                    apt.status === "In Consultation"
                      ? "#38BDF8"
                      : apt.status === "Completed"
                      ? "#1E293B"
                      : "rgba(234, 179, 8, 0.4)"
                  }`,
                  borderRadius: "10px",
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {/* Token & Patient Name */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor:
                        apt.status === "In Consultation"
                          ? "rgba(56, 189, 248, 0.2)"
                          : apt.status === "Completed"
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(234, 179, 8, 0.2)",
                      color:
                        apt.status === "In Consultation"
                          ? "#38BDF8"
                          : apt.status === "Completed"
                          ? "#34D399"
                          : "#FCD34D",
                      border: "2px solid currentColor",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                    }}
                  >
                    #{apt.tokenNumber}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.98rem" }}>
                        {apt.patientName}
                      </span>
                      <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                        ({apt.age}y/{apt.gender} • 📞 {apt.mobile})
                      </span>
                      <span
                        style={{
                          backgroundColor:
                            apt.status === "In Consultation"
                              ? "rgba(56, 189, 248, 0.2)"
                              : apt.status === "Completed"
                              ? "rgba(16, 185, 129, 0.2)"
                              : "rgba(234, 179, 8, 0.2)",
                          color:
                            apt.status === "In Consultation"
                              ? "#38BDF8"
                              : apt.status === "Completed"
                              ? "#34D399"
                              : "#FCD34D",
                          padding: "2px 8px",
                          borderRadius: "8px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#CBD5E1", marginTop: 2 }}>
                      Problem: <strong style={{ color: "#FCD34D" }}>{apt.chiefComplaint}</strong> • Slot:{" "}
                      <span style={{ color: "#94A3B8" }}>{apt.timeSlot} ({apt.appointmentDate})</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Actions */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {apt.status === "Waiting" && (
                    <button
                      onClick={() => {
                        const updated = appointments.map((a) =>
                          a.id === apt.id ? { ...a, status: "In Consultation" } : a
                        );
                        setAppointments(updated);
                      }}
                      style={{
                        backgroundColor: "#0284C7",
                        color: "#ffffff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Call In Chamber
                    </button>
                  )}

                  {apt.status === "In Consultation" && (
                    <button
                      onClick={() => {
                        const updated = appointments.map((a) =>
                          a.id === apt.id ? { ...a, status: "Completed" } : a
                        );
                        setAppointments(updated);
                        setRxModalPatient({
                          id: apt.id,
                          name: apt.patientName,
                          diagnosis: apt.chiefComplaint,
                        });
                      }}
                      style={{
                        backgroundColor: "#10B981",
                        color: "#ffffff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ✓ Complete &amp; Prescribe
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setRxModalPatient({
                        id: apt.id,
                        name: apt.patientName,
                        diagnosis: apt.chiefComplaint,
                      });
                    }}
                    style={{
                      backgroundColor: "#1E293B",
                      color: "#38BDF8",
                      border: "1px solid #334155",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Pill size={12} />
                    <span>Prescribe</span>
                  </button>

                  <button
                    onClick={() => onAdmitPatientClick(selectedDoctor)}
                    style={{
                      backgroundColor: "#1E293B",
                      color: "#FCD34D",
                      border: "1px solid rgba(234, 179, 8, 0.3)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Bed size={12} />
                    <span>Admit to IPD</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor's Inpatient Care Table */}
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid #1E293B",
          borderRadius: "14px",
          padding: "24px",
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
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#F8FAFC" }}>
              Patients Under {selectedDoctor?.name}&apos;s Care ({myPatients.length})
            </h3>
            <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
              Manage clinical diagnosis, prescribe medications, trace dosage administration, and review vitals.
            </p>
          </div>

          <span
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              color: "#38BDF8",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 600,
              border: "1px solid rgba(56, 189, 248, 0.25)",
            }}
          >
            Filtered by Doctor: {selectedDoctor?.id}
          </span>
        </div>

        {myPatients.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#94A3B8",
              backgroundColor: "#0B132B",
              borderRadius: "10px",
              border: "1px dashed #334155",
            }}
          >
            <Stethoscope size={36} style={{ color: "#64748B", margin: "0 auto 10px" }} />
            <h4 style={{ margin: "0 0 6px", color: "#F8FAFC", fontSize: "1rem" }}>
              No Patients Currently Registered Under This Doctor
            </h4>
            <p style={{ margin: "0 0 16px", fontSize: "0.85rem" }}>
              Click below to admit or register a patient directly under {selectedDoctor?.name}.
            </p>
            <button
              onClick={() => onAdmitPatientClick(selectedDoctor)}
              style={{
                backgroundColor: "#0D9488",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + Admit Patient Now
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {myPatients.map((patient) => {
              const meds = getPatientPrescriptions(patient.id);

              return (
                <div
                  key={patient.id}
                  style={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    padding: "20px",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  {/* Top Row: Patient Info & Bed Location */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 12,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                      paddingBottom: 14,
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 800,
                            color: "#ffffff",
                          }}
                        >
                          {patient.name}
                        </span>
                        <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                          ({patient.age} yrs • {patient.gender} • Blood Group:{" "}
                          <strong style={{ color: "#EF4444" }}>{patient.bloodGroup || "O+"}</strong>)
                        </span>
                        <span
                          style={{
                            backgroundColor:
                              patient.status === "Admitted"
                                ? "rgba(16, 185, 129, 0.15)"
                                : "rgba(56, 189, 248, 0.15)",
                            color: patient.status === "Admitted" ? "#34D399" : "#38BDF8",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            border: `1px solid ${
                              patient.status === "Admitted"
                                ? "rgba(16, 185, 129, 0.3)"
                                : "rgba(56, 189, 248, 0.3)"
                            }`,
                          }}
                        >
                          {patient.admissionType || patient.status}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#94A3B8",
                          marginTop: 4,
                          display: "flex",
                          gap: 14,
                          flexWrap: "wrap",
                        }}
                      >
                        <span>
                          UHID: <strong style={{ color: "#F8FAFC" }}>{patient.uhid}</strong>
                        </span>
                        <span>
                          Phone: <strong style={{ color: "#F8FAFC" }}>{patient.mobile}</strong>
                        </span>
                        <span>
                          Admitted:{" "}
                          <strong style={{ color: "#F8FAFC" }}>
                            {new Date(patient.admissionDate).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Room & Bed Pill */}
                    <div
                      style={{
                        backgroundColor: "#1E293B",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #334155",
                        textAlign: "right",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#38BDF8" }}>
                        <Bed size={15} />
                        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                          {patient.floor} • {patient.roomNo}
                        </span>
                      </div>
                      <span style={{ fontSize: "0.76rem", color: "#94A3B8" }}>
                        Bed: <strong style={{ color: "#ffffff" }}>{patient.bedNo}</strong> • Attending Nurse:{" "}
                        <strong style={{ color: "#34D399" }}>{patient.attendingNurseName}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis & Clinical Symptoms */}
                  <div
                    style={{
                      backgroundColor: "rgba(30, 41, 59, 0.5)",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      marginBottom: 14,
                      fontSize: "0.85rem",
                    }}
                  >
                    <div style={{ color: "#94A3B8", marginBottom: 3 }}>
                      <strong style={{ color: "#F8FAFC" }}>Primary Diagnosis:</strong>{" "}
                      <span style={{ color: "#FCD34D", fontWeight: 600 }}>{patient.diagnosis}</span>
                    </div>
                    {patient.symptoms && (
                      <div style={{ color: "#94A3B8", fontSize: "0.82rem" }}>
                        <strong style={{ color: "#CBD5E1" }}>Symptoms:</strong> {patient.symptoms}
                      </div>
                    )}
                  </div>

                  {/* Live Vitals Strip (Recorded by Nurse / Doctor) */}
                  {patient.vitals && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 14px",
                        backgroundColor: "rgba(13, 148, 136, 0.08)",
                        borderRadius: "8px",
                        border: "1px solid rgba(13, 148, 136, 0.2)",
                        marginBottom: 14,
                        fontSize: "0.82rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#2DD4BF" }}>
                        <HeartPulse size={15} />
                        <strong>Latest Vitals ({patient.vitals.recordedAt}):</strong>
                      </div>
                      <span>
                        BP: <strong style={{ color: "#F8FAFC" }}>{patient.vitals.bp}</strong>
                      </span>
                      <span>
                        Pulse: <strong style={{ color: "#F8FAFC" }}>{patient.vitals.pulse}</strong>
                      </span>
                      <span>
                        SpO2: <strong style={{ color: "#34D399" }}>{patient.vitals.spo2}</strong>
                      </span>
                      <span>
                        Temp: <strong style={{ color: "#F8FAFC" }}>{patient.vitals.temp}</strong>
                      </span>
                      <span>
                        Sugar: <strong style={{ color: "#F8FAFC" }}>{patient.vitals.sugar}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setVitalsForm({
                            bp: patient.vitals.bp || "120/80 mmHg",
                            pulse: patient.vitals.pulse || "72 bpm",
                            spo2: patient.vitals.spo2 || "98%",
                            temp: patient.vitals.temp || "98.4°F",
                            sugar: patient.vitals.sugar || "110 mg/dL",
                            respiration: patient.vitals.respiration || "18 /min",
                            nurseNotes: "",
                          });
                          setVitalsModalPatient(patient);
                        }}
                        style={{
                          marginLeft: "auto",
                          backgroundColor: "transparent",
                          border: "1px solid #0D9488",
                          color: "#2DD4BF",
                          padding: "3px 10px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Update Vitals
                      </button>
                    </div>
                  )}

                  {/* Medicines Summary Preview */}
                  <div style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#CBD5E1" }}>
                        💊 Prescribed Medicines ({meds.length})
                      </span>
                      <button
                        onClick={() => setTraceMedPatient(patient)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#38BDF8",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Trace All Medicines History &rarr;
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {meds.slice(0, 4).map((med, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: "#1E293B",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.78rem",
                            border: "1px solid #334155",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Pill size={12} style={{ color: "#38BDF8" }} />
                          <span style={{ color: "#F8FAFC", fontWeight: 600 }}>{med.name}</span>
                          <span style={{ color: "#94A3B8" }}>({med.frequency})</span>
                        </div>
                      ))}
                      {meds.length > 4 && (
                        <span style={{ fontSize: "0.78rem", color: "#94A3B8", alignSelf: "center" }}>
                          +{meds.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons for this Patient */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                      paddingTop: 12,
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <button
                      onClick={() => setRxModalPatient(patient)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "#0D9488",
                        color: "#ffffff",
                        border: "none",
                        padding: "7px 14px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={14} />
                      <span>Write / Add Prescription</span>
                    </button>

                    <button
                      onClick={() => setTraceMedPatient(patient)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "rgba(56, 189, 248, 0.15)",
                        color: "#38BDF8",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        padding: "7px 14px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Pill size={14} />
                      <span>Trace Prescribed Medicines</span>
                    </button>

                    <button
                      onClick={() => setActivePatientModal(patient)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: "#1E293B",
                        color: "#F8FAFC",
                        border: "1px solid #334155",
                        padding: "7px 14px",
                        borderRadius: "6px",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <FileText size={14} />
                      <span>Full Clinical File</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL 1: Write New Prescription */}
      {rxModalPatient && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              maxWidth: 580,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
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
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                  Write Prescription — {rxModalPatient.name}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Doctor: {selectedDoctor.name} ({selectedDoctor.department})
                </span>
              </div>
              <button
                onClick={() => setRxModalPatient(null)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPrescription}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                  Medicine Name &amp; Strength *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tab Sorbitrate 5mg or Inj Pantop 40mg"
                  value={newRx.medicineName}
                  onChange={(e) => setNewRx({ ...newRx, medicineName: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "#0F172A",
                    border: "1px solid #334155",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                    Form / Type
                  </label>
                  <select
                    value={newRx.type}
                    onChange={(e) => setNewRx({ ...newRx, type: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Injection">Injection (IV / IM)</option>
                    <option value="IV Infusion">IV Infusion / Drip</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Ointment">Ointment / Cream</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Tab / 1 Ampoule"
                    value={newRx.dosage}
                    onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                    Frequency
                  </label>
                  <select
                    value={newRx.frequency}
                    onChange={(e) => setNewRx({ ...newRx, frequency: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  >
                    <option value="1-0-1 (After Meals)">1-0-1 (Morning &amp; Night)</option>
                    <option value="1-0-0 (Morning)">1-0-0 (Morning Only)</option>
                    <option value="0-0-1 (Night)">0-0-1 (Night Only)</option>
                    <option value="1-1-1 (Thrice Daily)">1-1-1 (Thrice Daily)</option>
                    <option value="SOS (As Needed)">SOS (When Pain / Fever Occurs)</option>
                    <option value="Continuous IV Infusion">Continuous IV Infusion</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Days / During Inpatient Stay"
                    value={newRx.duration}
                    onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#0F172A",
                      border: "1px solid #334155",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 6 }}>
                  Doctor&apos;s Specific Instructions for Nurse / Patient
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Keep under tongue on chest pain, or check blood pressure prior to administration"
                  value={newRx.instructions}
                  onChange={(e) => setNewRx({ ...newRx, instructions: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "#0F172A",
                    border: "1px solid #334155",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setRxModalPatient(null)}
                  style={{
                    backgroundColor: "#1E293B",
                    color: "#94A3B8",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0D9488",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Trace All Medicines Suggested to Patient (Trace Tracker) */}
      {traceMedPatient && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Pill size={20} style={{ color: "#0D9488" }} />
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                    Trace Suggested Medicines — {traceMedPatient.name}
                  </h3>
                </div>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Bed: {traceMedPatient.roomNo} ({traceMedPatient.bedNo}) • Diagnosis: {traceMedPatient.diagnosis}
                </span>
              </div>
              <button
                onClick={() => setTraceMedPatient(null)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* List of all medicines */}
            {getPatientPrescriptions(traceMedPatient.id).length === 0 ? (
              <p style={{ color: "#94A3B8", textAlign: "center", padding: "30px" }}>
                No medicines have been prescribed yet for this patient.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {getPatientPrescriptions(traceMedPatient.id).map((med, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#0F172A",
                      border: "1px solid #1E293B",
                      borderRadius: "10px",
                      padding: "16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: "0.98rem", color: "#F8FAFC" }}>
                          {med.name}
                        </span>
                        <span
                          style={{
                            backgroundColor: "rgba(56, 189, 248, 0.15)",
                            color: "#38BDF8",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                          }}
                        >
                          {med.type} • {med.dosage}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#94A3B8", marginTop: 4 }}>
                        Schedule: <strong style={{ color: "#ffffff" }}>{med.frequency}</strong> • Duration:{" "}
                        <strong style={{ color: "#ffffff" }}>{med.duration}</strong>
                      </div>
                      {med.instructions && (
                        <div style={{ fontSize: "0.78rem", color: "#FCD34D", marginTop: 3 }}>
                          Instructions: {med.instructions}
                        </div>
                      )}
                    </div>

                    {/* Nurse Administration Tracker Status */}
                    <div
                      style={{
                        backgroundColor:
                          med.status === "Administered"
                            ? "rgba(16, 185, 129, 0.12)"
                            : "rgba(234, 179, 8, 0.12)",
                        border: `1px solid ${
                          med.status === "Administered" ? "rgba(16, 185, 129, 0.3)" : "rgba(234, 179, 8, 0.3)"
                        }`,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        textAlign: "right",
                        minWidth: 160,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                          color: med.status === "Administered" ? "#34D399" : "#FBBF24",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                        }}
                      >
                        {med.status === "Administered" ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                        <span>{med.status}</span>
                      </div>
                      <span style={{ fontSize: "0.74rem", color: "#94A3B8", display: "block", marginTop: 2 }}>
                        {med.lastGivenBy || "Scheduled"} • {med.lastGivenAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button
                onClick={() => {
                  setTraceMedPatient(null);
                  setRxModalPatient(traceMedPatient);
                }}
                style={{
                  backgroundColor: "#0D9488",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Add Another Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Update Vitals & Clinical Round */}
      {vitalsModalPatient && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              maxWidth: 540,
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
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
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                Record Round Vitals — {vitalsModalPatient.name}
              </h3>
              <button
                onClick={() => setVitalsModalPatient(null)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveVitals}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 4 }}>
                    Blood Pressure (BP)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.bp}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bp: e.target.value })}
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
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 4 }}>
                    Pulse Rate (bpm)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.pulse}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, pulse: e.target.value })}
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
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 4 }}>
                    Oxygen Saturation (SpO2)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.spo2}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, spo2: e.target.value })}
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
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 4 }}>
                    Temperature (°F)
                  </label>
                  <input
                    type="text"
                    value={vitalsForm.temp}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, temp: e.target.value })}
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
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#94A3B8", marginBottom: 4 }}>
                  Doctor Visit / Round Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Patient comfortable. Lungs clear bilaterally. Continue same medication."
                  value={vitalsForm.nurseNotes}
                  onChange={(e) => setVitalsForm({ ...vitalsForm, nurseNotes: e.target.value })}
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setVitalsModalPatient(null)}
                  style={{
                    backgroundColor: "#1E293B",
                    color: "#94A3B8",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#0D9488",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Full Patient Clinical File */}
      {activePatientModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
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
              maxWidth: 680,
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
                <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#ffffff" }}>
                  Clinical File: {activePatientModal.name}
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  UHID: {activePatientModal.uhid} • Phone: {activePatientModal.mobile}
                </span>
              </div>
              <button
                onClick={() => setActivePatientModal(null)}
                style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.88rem" }}>
              <div style={{ backgroundColor: "#0F172A", padding: "14px", borderRadius: "8px" }}>
                <strong style={{ color: "#38BDF8", display: "block", marginBottom: 4 }}>
                  Inpatient Location &amp; Duty Team:
                </strong>
                <div>
                  Floor: <strong>{activePatientModal.floor}</strong> | Room:{" "}
                  <strong>{activePatientModal.roomNo}</strong> | Bed:{" "}
                  <strong>{activePatientModal.bedNo}</strong>
                </div>
                <div style={{ marginTop: 4 }}>
                  Attending Nurse:{" "}
                  <strong style={{ color: "#34D399" }}>{activePatientModal.attendingNurseName}</strong>
                </div>
              </div>

              <div style={{ backgroundColor: "#0F172A", padding: "14px", borderRadius: "8px" }}>
                <strong style={{ color: "#FCD34D", display: "block", marginBottom: 4 }}>
                  Diagnosis &amp; Clinical Symptoms:
                </strong>
                <div>{activePatientModal.diagnosis}</div>
                {activePatientModal.symptoms && (
                  <p style={{ margin: "6px 0 0", color: "#94A3B8", fontSize: "0.84rem" }}>
                    {activePatientModal.symptoms}
                  </p>
                )}
              </div>

              {activePatientModal.nurseNotes && (
                <div style={{ backgroundColor: "#0F172A", padding: "14px", borderRadius: "8px" }}>
                  <strong style={{ color: "#34D399", display: "block", marginBottom: 4 }}>
                    Nurse Rounds &amp; Care Notes:
                  </strong>
                  <p style={{ margin: 0, color: "#CBD5E1" }}>{activePatientModal.nurseNotes}</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: 24, textAlign: "right" }}>
              <button
                onClick={() => setActivePatientModal(null)}
                style={{
                  backgroundColor: "#0284C7",
                  color: "#ffffff",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
