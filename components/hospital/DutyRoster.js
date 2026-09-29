"use client";

import { useState } from "react";
import {
  Clock,
  Building2,
  Stethoscope,
  Users,
  UserCheck,
  Bed,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function DutyRoster({
  dutyRoster,
  setDutyRoster,
  allStaff,
  floors,
  patients,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");

  const [activeShiftFilter, setActiveShiftFilter] = useState("ALL"); // ALL | Morning | Evening | Night
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // New Roster Form State
  const [rosterForm, setRosterForm] = useState({
    floor: "Floor 2 (Private Deluxe Ward)",
    shift: "Morning (08:00 AM – 04:00 PM)",
    doctorId: doctors[0]?.id || "DOC-101",
    doctorOnCallId: doctors[1]?.id || "DOC-102",
    nurseId: nurses[0]?.id || "NUR-201",
    supportStaff: "Brother Ram (Attendant)",
    roomsCovered: "Room 201, 202, 203",
    notes: "Post-op wound dressing and vitals monitoring every 4 hours.",
  });

  const filteredRoster = dutyRoster.filter((r) => {
    if (activeShiftFilter === "ALL") return true;
    return r.shift.toLowerCase().includes(activeShiftFilter.toLowerCase());
  });

  function handleAssignSubmit(e) {
    e.preventDefault();

    const selectedDoc = doctors.find((d) => d.id === rosterForm.doctorId);
    const selectedDocCall = doctors.find((d) => d.id === rosterForm.doctorOnCallId);
    const selectedNurse = nurses.find((n) => n.id === rosterForm.nurseId);

    const newRosterEntry = {
      id: `ROSTER-${Date.now().toString().slice(-4)}`,
      floor: rosterForm.floor,
      shift: rosterForm.shift,
      doctorIncharge: `${selectedDoc?.name} (${selectedDoc?.department})`,
      doctorOnCall: `${selectedDocCall?.name} (${selectedDocCall?.department})`,
      leadNurse: selectedNurse?.name,
      supportStaff: rosterForm.supportStaff,
      roomsCovered: rosterForm.roomsCovered,
      activePatientsCount: 3,
      notes: rosterForm.notes,
    };

    setDutyRoster([newRosterEntry, ...dutyRoster]);
    setIsAssignModalOpen(false);
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
          <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
            Floor-Wise, Room-Wise &amp; Shift Duty Allocation Matrix
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Doctors and nurses divided by roles, shift timings, floor rounds, and assigned inpatient care.
          </p>
        </div>

        <button
          onClick={() => setIsAssignModalOpen(true)}
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
          <Plus size={16} />
          <span>+ Assign Shift Duty / Ward Nurse</span>
        </button>
      </div>

      {/* Shift Filter Pills */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>Shift View:</span>
        {["ALL", "Morning", "Evening", "Night"].map((shift) => (
          <button
            key={shift}
            onClick={() => setActiveShiftFilter(shift)}
            style={{
              backgroundColor: activeShiftFilter === shift ? "#0D9488" : "#111C44",
              color: activeShiftFilter === shift ? "#ffffff" : "#94A3B8",
              border: `1px solid ${activeShiftFilter === shift ? "#0D9488" : "#1E293B"}`,
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {shift === "ALL" ? "All Shifts (24x7)" : `${shift} Shift`}
          </button>
        ))}
      </div>

      {/* Duty Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: 20,
        }}
      >
        {filteredRoster.map((roster) => {
          // Find patients admitted on this floor
          const floorPatients = patients.filter((p) =>
            roster.floor.toLowerCase().includes(p.floor?.toLowerCase())
          );

          return (
            <div
              key={roster.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {/* Floor & Shift Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: 14,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Building2 size={18} style={{ color: "#38BDF8" }} />
                    <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#ffffff" }}>
                      {roster.floor}
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2, display: "block" }}>
                    Covering: <strong style={{ color: "#0f172a" }}>{roster.roomsCovered}</strong>
                  </span>
                </div>

                <span
                  style={{
                    backgroundColor: "rgba(13, 148, 136, 0.2)",
                    color: "#2DD4BF",
                    border: "1px solid rgba(13, 148, 136, 0.3)",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                  }}
                >
                  {roster.shift}
                </span>
              </div>

              {/* Doctors & Nurses On Duty Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.86rem" }}>
                {/* Doctor Incharge */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#38BDF8", fontSize: "0.78rem", fontWeight: 700 }}>
                    <Stethoscope size={14} />
                    <span>ATTENDING DOCTOR IN-CHARGE</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
                    {roster.doctorIncharge}
                  </div>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    On-Call Backup: {roster.doctorOnCall}
                  </span>
                </div>

                {/* Lead Nurse */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#34D399", fontSize: "0.78rem", fontWeight: 700 }}>
                    <UserCheck size={14} />
                    <span>ATTENDING DUTY NURSE</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#ffffff", marginTop: 2 }}>
                    {roster.leadNurse}
                  </div>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    Assigned Ward Care, Vitals &amp; Meds Administration
                  </span>
                </div>
              </div>

              {/* Handover & Shift Instructions */}
              {roster.notes && (
                <div
                  style={{
                    backgroundColor: "rgba(2, 132, 199, 0.08)",
                    border: "1px dashed rgba(2, 132, 199, 0.25)",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    color: "#475569",
                  }}
                >
                  <strong style={{ color: "#38BDF8" }}>Shift Handover Note:</strong> {roster.notes}
                </div>
              )}

              {/* Currently Admitted Patients in This Ward */}
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", display: "block", marginBottom: 6 }}>
                  Patients Under Care in this Zone ({floorPatients.length}):
                </span>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {floorPatients.map((p) => (
                    <span
                      key={p.id}
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#0f172a",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "0.74rem",
                        border: "1px solid #cbd5e1",
                      }}
                    >
                      {p.name} ({p.bedNo})
                    </span>
                  ))}
                  {floorPatients.length === 0 && (
                    <span style={{ color: "#64748B", fontSize: "0.78rem" }}>
                      No patients currently occupied
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Assign New Shift Duty */}
      {isAssignModalOpen && (
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
              maxWidth: 600,
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
                  Assign Floor, Room &amp; Shift Duty
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Allocate doctor and nurse to a specific ward
                </span>
              </div>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Select Floor / Ward *
                  </label>
                  <select
                    value={rosterForm.floor}
                    onChange={(e) => setRosterForm({ ...rosterForm, floor: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="Floor 3 (ICU & Critical Care)">Floor 3 (ICU &amp; Critical Care)</option>
                    <option value="Floor 2 (Private Deluxe Ward)">Floor 2 (Private Deluxe Ward)</option>
                    <option value="Floor 1 (General Wards)">Floor 1 (General Wards)</option>
                    <option value="Ground Floor (Emergency & Triage)">Ground Floor (Emergency &amp; Triage)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Shift Timing *
                  </label>
                  <select
                    value={rosterForm.shift}
                    onChange={(e) => setRosterForm({ ...rosterForm, shift: e.target.value })}
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
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Attending Doctor In-Charge *
                  </label>
                  <select
                    value={rosterForm.doctorId}
                    onChange={(e) => setRosterForm({ ...rosterForm, doctorId: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Attending Duty Nurse *
                  </label>
                  <select
                    value={rosterForm.nurseId}
                    onChange={(e) => setRosterForm({ ...rosterForm, nurseId: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {nurses.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name} ({n.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                  Rooms / Beds Covered
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rooms 201 to 206, Beds 201A-206A"
                  value={rosterForm.roomsCovered}
                  onChange={(e) => setRosterForm({ ...rosterForm, roomsCovered: e.target.value })}
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

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                  Handover Notes / Specific Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Check vital signs every 2 hours for Bed 101-B."
                  value={rosterForm.notes}
                  onChange={(e) => setRosterForm({ ...rosterForm, notes: e.target.value })}
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

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
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
                  Save Shift Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
