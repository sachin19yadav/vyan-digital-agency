"use client";

import { useState } from "react";
import {
  HeartPulse,
  Pill,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  Users,
  Bed,
  Plus,
  FileText,
  UserCheck,
  ChevronDown,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function NursePortal({
  currentStaff,
  allStaff,
  patients,
  setPatients,
  prescriptions,
  setPrescriptions,
  floors,
}) {
  const nurses = allStaff.filter((s) => s.role === "Nurse");
  const [selectedNurseId, setSelectedNurseId] = useState(
    currentStaff?.role === "Nurse" ? currentStaff.id : nurses[0]?.id || "NUR-201"
  );

  const selectedNurse = nurses.find((n) => n.id === selectedNurseId) || nurses[0];

  const [activeTab, setActiveTab] = useState("medicines"); // medicines | vitals | patients
  const [slotFilter, setSlotFilter] = useState("ALL"); // ALL | Morning | Afternoon | Evening | Night
  const [filterMyWardOnly, setFilterMyWardOnly] = useState(true);

  // Vitals entry modal
  const [vitalsModalPatient, setVitalsModalPatient] = useState(null);
  const [vitalTemp, setVitalTemp] = useState("98.4");
  const [vitalBP, setVitalBP] = useState("120/80");
  const [vitalPulse, setVitalPulse] = useState("76");
  const [vitalSpO2, setVitalSpO2] = useState("98");
  const [vitalSugar, setVitalSugar] = useState("110");
  const [vitalNote, setVitalNote] = useState("");

  // Quick administration confirmation toast/state
  const [actionMessage, setActionMessage] = useState(null);

  // Filter Admitted Patients
  const admittedPatients = patients.filter((p) => p.status === "Admitted");

  // Determine patients assigned to this nurse
  const myAssignedPatients = admittedPatients.filter((p) => {
    if (selectedNurse?.assignedFloor && p.floor) {
      if (p.floor.toLowerCase().includes(selectedNurse.assignedFloor.toLowerCase().split(" ")[0])) {
        return true;
      }
    }
    if (p.attendingNurse && p.attendingNurse.includes(selectedNurse?.name)) {
      return true;
    }
    return false;
  });

  const displayedPatients = filterMyWardOnly ? (myAssignedPatients.length > 0 ? myAssignedPatients : admittedPatients) : admittedPatients;

  // Extract all scheduled medicines from prescriptions for displayed patients
  const scheduledDoses = [];
  displayedPatients.forEach((patient) => {
    const pPrescriptions = prescriptions.filter((rx) => rx.patientId === patient.id);
    pPrescriptions.forEach((rx) => {
      rx.medicines.forEach((med, medIdx) => {
        // Derive daily slots based on frequency
        const freq = med.frequency || "BD (Twice daily)";
        const slots = [];
        if (freq.includes("OD") || freq.includes("Once")) slots.push("Morning (08:00 AM)");
        else if (freq.includes("BD") || freq.includes("Twice")) {
          slots.push("Morning (08:00 AM)");
          slots.push("Night (08:00 PM)");
        } else if (freq.includes("TDS") || freq.includes("Thrice")) {
          slots.push("Morning (08:00 AM)");
          slots.push("Afternoon (01:00 PM)");
          slots.push("Night (08:00 PM)");
        } else if (freq.includes("QID") || freq.includes("4 times")) {
          slots.push("Morning (08:00 AM)");
          slots.push("Afternoon (01:00 PM)");
          slots.push("Evening (05:00 PM)");
          slots.push("Night (09:00 PM)");
        } else {
          slots.push("Morning (08:00 AM)");
          slots.push("Night (08:00 PM)");
        }

        slots.forEach((slot) => {
          scheduledDoses.push({
            uniqueId: `${rx.id}-${medIdx}-${slot}`,
            rxId: rx.id,
            medIdx,
            patientId: patient.id,
            patientName: patient.name,
            bed: patient.bedNo,
            floor: patient.floor,
            primaryDoctor: patient.primaryDoctor,
            medicineName: med.medicineName || med.name,
            dosage: med.dosage,
            route: med.route || "Oral",
            instructions: med.instructions || "After food",
            timeSlot: slot,
            isGiven: med.adminRecords && med.adminRecords[slot]?.given,
            givenAt: med.adminRecords && med.adminRecords[slot]?.timestamp,
            givenBy: med.adminRecords && med.adminRecords[slot]?.nurseName,
          });
        });
      });
    });
  });

  const filteredDoses = slotFilter === "ALL"
    ? scheduledDoses
    : scheduledDoses.filter((d) => d.timeSlot.toLowerCase().includes(slotFilter.toLowerCase()));

  // Handle Giving Medicine
  function handleGiveMedicine(dose) {
    const currentTimeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nurseName = selectedNurse?.name || "Staff Nurse";

    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id !== dose.rxId) return rx;
        const newMeds = [...rx.medicines];
        const med = { ...newMeds[dose.medIdx] };
        med.adminRecords = {
          ...(med.adminRecords || {}),
          [dose.timeSlot]: {
            given: true,
            timestamp: currentTimeStr,
            nurseName,
          },
        };
        newMeds[dose.medIdx] = med;
        return { ...rx, medicines: newMeds };
      })
    );

    setActionMessage(`✓ Given ${dose.medicineName} to ${dose.patientName} (${dose.bed}) by ${nurseName}`);
    setTimeout(() => setActionMessage(null), 4000);
  }

  // Handle Saving Vitals
  function handleSaveVitals(e) {
    e.preventDefault();
    if (!vitalsModalPatient) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newVitalRecord = {
      timestamp: timeStr,
      date: new Date().toISOString().split("T")[0],
      temp: vitalTemp,
      bp: vitalBP,
      pulse: vitalPulse,
      spO2: vitalSpO2,
      sugar: vitalSugar,
      recordedBy: selectedNurse?.name || "Staff Nurse",
      notes: vitalNote,
    };

    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== vitalsModalPatient.id) return p;
        return {
          ...p,
          vitals: {
            temperature: `${vitalTemp}°F`,
            bloodPressure: vitalBP,
            pulse: `${vitalPulse} bpm`,
            spO2: `${vitalSpO2}%`,
          },
          vitalsHistory: [newVitalRecord, ...(p.vitalsHistory || [])],
        };
      })
    );

    setVitalsModalPatient(null);
    setVitalNote("");
    setActionMessage(`✓ Vitals recorded for ${vitalsModalPatient.name}`);
    setTimeout(() => setActionMessage(null), 3000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Alert */}
      {actionMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 100,
            fontSize: "0.9rem",
            fontWeight: 700,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Nurse Top Profile & Station Header - Light Mode */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
            }}
          >
            <Users size={30} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700, color: "#0f172a" }}>
                {selectedNurse.name}
              </h2>
              <span
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#b45309",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "1px solid #fde68a",
                }}
              >
                {selectedNurse.designation}
              </span>
            </div>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "6px", fontSize: "0.82rem", color: "#64748b" }}>
              <span>Assigned Ward: <strong style={{ color: "#0f172a" }}>{selectedNurse.assignedFloor || "General & ICU"}</strong></span>
              <span>•</span>
              <span>Shift: <strong style={{ color: "#0284c7" }}>{selectedNurse.shift}</strong></span>
              <span>•</span>
              <span>Status: <strong style={{ color: "#16a34a" }}>On Active Duty</strong></span>
            </div>
          </div>
        </div>

        {/* Switch Nurse Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Nurse Profile:</span>
          <select
            value={selectedNurseId}
            onChange={(e) => setSelectedNurseId(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              color: "#0f172a",
              border: "1px solid #cbd5e1",
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            {nurses.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name} ({n.assignedFloor || "Ward Nurse"})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Counters - Light Mode */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Patients In My Ward</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>
            {displayedPatients.length}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#0284c7", fontWeight: 600 }}>Admitted Inpatients under care</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Scheduled Medicines Today</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#d97706", marginTop: "4px" }}>
            {scheduledDoses.length} doses
          </div>
          <span style={{ fontSize: "0.76rem", color: "#64748b" }}>Morning, Noon, Eve &amp; Night</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Doses Administered</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            {scheduledDoses.filter((d) => d.isGiven).length} / {scheduledDoses.length}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#16a34a", fontWeight: 600 }}>Given on time</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Pending Doses</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", marginTop: "4px" }}>
            {scheduledDoses.filter((d) => !d.isGiven).length}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#dc2626", fontWeight: 600 }}>Awaiting Administration</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("medicines")}
          style={{
            backgroundColor: activeTab === "medicines" ? "#f59e0b" : "#ffffff",
            color: activeTab === "medicines" ? "#000000" : "#475569",
            fontWeight: 700,
            border: "1px solid #cbd5e1",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem",
            boxShadow: activeTab === "medicines" ? "0 2px 6px rgba(245, 158, 11, 0.25)" : "none",
          }}
        >
          <Pill size={16} />
          <span>Scheduled Medicine Dispense &amp; Give</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("vitals")}
          style={{
            backgroundColor: activeTab === "vitals" ? "#f59e0b" : "#ffffff",
            color: activeTab === "vitals" ? "#000000" : "#475569",
            fontWeight: 700,
            border: "1px solid #cbd5e1",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem",
          }}
        >
          <Activity size={16} />
          <span>Patient Vitals Charting</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("patients")}
          style={{
            backgroundColor: activeTab === "patients" ? "#f59e0b" : "#ffffff",
            color: activeTab === "patients" ? "#000000" : "#475569",
            fontWeight: 700,
            border: "1px solid #cbd5e1",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem",
          }}
        >
          <Bed size={16} />
          <span>My Ward Inpatients ({displayedPatients.length})</span>
        </button>
      </div>

      {/* TAB 1: Scheduled Medicine Administration */}
      {activeTab === "medicines" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Filters Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              backgroundColor: "#ffffff",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Time Slot:</span>
              {["ALL", "Morning", "Afternoon", "Evening", "Night"].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSlotFilter(slot)}
                  style={{
                    backgroundColor: slotFilter === slot ? "#f59e0b" : "#f1f5f9",
                    color: slotFilter === slot ? "#000000" : "#475569",
                    border: "1px solid #cbd5e1",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#334155", cursor: "pointer", fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={filterMyWardOnly}
                onChange={(e) => setFilterMyWardOnly(e.target.checked)}
              />
              <span>Filter Only My Assigned Ward / Floor</span>
            </label>
          </div>

          {/* Doses Table / Cards - Light Mode */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredDoses.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No scheduled doses found for this time slot.
              </div>
            ) : (
              filteredDoses.map((dose) => (
                <div
                  key={dose.uniqueId}
                  style={{
                    backgroundColor: dose.isGiven ? "#f0fdf4" : "#ffffff",
                    border: dose.isGiven ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "18px 20px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Left: Patient & Bed Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: "240px" }}>
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#f0f9ff",
                        color: "#0284c7",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        textAlign: "center",
                        border: "1px solid #bae6fd",
                      }}
                    >
                      <Bed size={16} style={{ margin: "0 auto 2px" }} />
                      <div>{dose.bed}</div>
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                        {dose.patientName}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        {dose.floor} • Dr: <strong style={{ color: "#334155" }}>{dose.primaryDoctor}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Medicine Details */}
                  <div style={{ flex: 1, minWidth: "260px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <Pill size={16} color="#d97706" />
                      <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                        {dose.medicineName}
                      </strong>
                      <span
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#475569",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          border: "1px solid #cbd5e1",
                        }}
                      >
                        {dose.dosage} ({dose.route})
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      <span>Schedule: <strong style={{ color: "#0284c7" }}>{dose.timeSlot}</strong></span>
                      <span style={{ marginLeft: "10px", color: "#475569", fontWeight: 500 }}>Instructions: {dose.instructions}</span>
                    </div>
                  </div>

                  {/* Right: Administration Status & Button */}
                  <div>
                    {dose.isGiven ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            padding: "6px 14px",
                            borderRadius: "8px",
                            backgroundColor: "#dcfce7",
                            color: "#15803d",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            border: "1px solid #bbf7d0",
                          }}
                        >
                          <CheckCircle2 size={16} />
                          Given at {dose.givenAt || "08:15 AM"} by {dose.givenBy || "Sister Preeti"}
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleGiveMedicine(dose)}
                        style={{
                          backgroundColor: "#f59e0b",
                          color: "#000000",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.86rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)",
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Give Medicine (Dawaai Dein)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Patient Vitals Recording - Light Mode */}
      {activeTab === "vitals" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
              Inpatient Vitals Charting &amp; Monitoring
            </h3>
            <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: "0.85rem" }}>
              Record temperature, blood pressure, pulse, SpO2, and blood sugar readings for admitted ward patients.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {displayedPatients.map((patient) => (
                <div
                  key={patient.id}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "14px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "1rem" }}>{patient.name}</strong>
                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                          {patient.age}y / {patient.gender} • Bed: <strong style={{ color: "#0284c7" }}>{patient.bedNo}</strong>
                        </div>
                      </div>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.74rem",
                          backgroundColor: "#f0f9ff",
                          color: "#0284c7",
                          fontWeight: 600,
                          border: "1px solid #bae6fd",
                        }}
                      >
                        {patient.floor}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.82rem", color: "#334155", marginBottom: "12px" }}>
                      Diagnosis: <strong>{patient.diagnosis}</strong>
                    </div>

                    {/* Current Vitals Strip */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "6px",
                        backgroundColor: "#ffffff",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        textAlign: "center",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div style={{ color: "#64748b" }}>BP</div>
                        <strong style={{ color: "#0f172a" }}>{patient.vitals?.bloodPressure || "--"}</strong>
                      </div>
                      <div>
                        <div style={{ color: "#64748b" }}>Pulse</div>
                        <strong style={{ color: "#0f172a" }}>{patient.vitals?.pulse || "--"}</strong>
                      </div>
                      <div>
                        <div style={{ color: "#64748b" }}>Temp</div>
                        <strong style={{ color: "#0f172a" }}>{patient.vitals?.temperature || "--"}</strong>
                      </div>
                      <div>
                        <div style={{ color: "#64748b" }}>SpO2</div>
                        <strong style={{ color: "#16a34a" }}>{patient.vitals?.spO2 || "--"}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setVitalsModalPatient(patient);
                      setVitalBP(patient.vitals?.bloodPressure?.replace(" mmHg", "") || "120/80");
                      setVitalPulse(patient.vitals?.pulse?.replace(" bpm", "") || "76");
                      setVitalTemp(patient.vitals?.temperature?.replace("°F", "") || "98.4");
                      setVitalSpO2(patient.vitals?.spO2?.replace("%", "") || "98");
                    }}
                    style={{
                      backgroundColor: "#fef3c7",
                      color: "#b45309",
                      border: "1px solid #fde68a",
                      padding: "8px 14px",
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
                    <Activity size={14} />
                    <span>Record / Update Vitals</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: My Ward Inpatients */}
      {activeTab === "patients" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
              Admitted Patients in {selectedNurse.assignedFloor || "Ward"}
            </h3>
            <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Total: {displayedPatients.length} active patients</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {displayedPatients.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <strong style={{ color: "#0f172a", fontSize: "1rem" }}>{p.name}</strong>
                    <span style={{ backgroundColor: "#f0f9ff", color: "#0284c7", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>
                      Bed: {p.bedNo}
                    </span>
                    <span style={{ backgroundColor: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>
                      {p.condition}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>
                    Diagnosis: <strong style={{ color: "#334155" }}>{p.diagnosis}</strong> • Primary Doctor: {p.primaryDoctor}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setVitalsModalPatient(p);
                      setActiveTab("vitals");
                    }}
                    style={{
                      backgroundColor: "#fef3c7",
                      color: "#b45309",
                      border: "1px solid #fde68a",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Vitals
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("medicines")}
                    style={{
                      backgroundColor: "#f0f9ff",
                      color: "#0284c7",
                      border: "1px solid #bae6fd",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Dispense Meds
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Record Vitals Modal - Light Mode */}
      {vitalsModalPatient && (
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
          onClick={() => setVitalsModalPatient(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "26px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                  Record Vitals for {vitalsModalPatient.name}
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#0284c7", fontWeight: 600 }}>Bed: {vitalsModalPatient.bedNo}</span>
              </div>
              <button
                type="button"
                onClick={() => setVitalsModalPatient(null)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVitals} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Blood Pressure (sys/dia mmHg)
                  </label>
                  <input
                    type="text"
                    value={vitalBP}
                    onChange={(e) => setVitalBP(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Pulse Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={vitalPulse}
                    onChange={(e) => setVitalPulse(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Temperature (°F)
                  </label>
                  <input
                    type="text"
                    value={vitalTemp}
                    onChange={(e) => setVitalTemp(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Oxygen Saturation (SpO2 %)
                  </label>
                  <input
                    type="number"
                    value={vitalSpO2}
                    onChange={(e) => setVitalSpO2(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#0f172a",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Blood Sugar (mg/dL - Optional)
                </label>
                <input
                  type="number"
                  value={vitalSugar}
                  onChange={(e) => setVitalSugar(e.target.value)}
                  placeholder="e.g. 110"
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Nursing Observation Notes
                </label>
                <textarea
                  rows={2}
                  value={vitalNote}
                  onChange={(e) => setVitalNote(e.target.value)}
                  placeholder="e.g. Patient conscious, oriented, no chest discomfort reported"
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setVitalsModalPatient(null)}
                  style={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "1px solid #cbd5e1",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000000",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "8px",
                    fontWeight: 700,
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
    </div>
  );
}
