"use client";

import { useState } from "react";
import {
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Save,
  Building,
  ShieldCheck,
  Stethoscope,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function HRManager({
  currentStaff,
  allStaff,
  attendanceRecords,
  setAttendanceRecords,
  dutyRoster,
  setDutyRoster,
  floors,
}) {
  const [activeTab, setActiveTab] = useState("attendance"); // attendance | roster
  const [selectedDate, setSelectedDate] = useState("2026-09-29");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Duty Roster Assignment Modal State
  const [isAssignDutyModalOpen, setIsAssignDutyModalOpen] = useState(false);
  const [targetFloor, setTargetFloor] = useState("Floor 3 (ICU)");
  const [targetShift, setTargetShift] = useState("Morning (08:00 AM – 04:00 PM)");
  const [assignedDocId, setAssignedDocId] = useState("");
  const [assignedNurseId, setAssignedNurseId] = useState("");

  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const nurses = allStaff.filter((s) => s.role === "Nurse");

  // Filter Staff & Attendance for selectedDate
  const filteredStaff = allStaff.filter((staff) => {
    const matchesRole = roleFilter === "ALL" || staff.role === roleFilter;
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.designation?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  // Calculate Attendance Stats for selectedDate
  const totalStaffCount = allStaff.length;
  const currentDayRecords = attendanceRecords.filter((r) => r.date === selectedDate);
  const presentCount = currentDayRecords.filter((r) => r.status === "Present").length;
  const absentCount = currentDayRecords.filter((r) => r.status === "Absent").length;
  const leaveCount = currentDayRecords.filter((r) => r.status === "On Leave").length;
  const halfDayCount = currentDayRecords.filter((r) => r.status === "Half Day").length;
  const attendanceRate = totalStaffCount > 0 ? Math.round((presentCount / totalStaffCount) * 100) : 0;

  // Toggle or Update Attendance
  function handleUpdateStatus(staff, newStatus) {
    setAttendanceRecords((prev) => {
      const existingIdx = prev.findIndex(
        (r) => r.staffId === staff.id && r.date === selectedDate
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          status: newStatus,
          inTime: newStatus === "Absent" || newStatus === "On Leave" ? "--" : updated[existingIdx].inTime || "08:00 AM",
          outTime: newStatus === "Absent" || newStatus === "On Leave" ? "--" : updated[existingIdx].outTime || "04:30 PM",
        };
        return updated;
      } else {
        const newRecord = {
          id: `ATT-${Date.now()}-${staff.id}`,
          staffId: staff.id,
          staffName: staff.name,
          role: staff.role,
          department: staff.department,
          date: selectedDate,
          status: newStatus,
          inTime: newStatus === "Absent" || newStatus === "On Leave" ? "--" : "08:00 AM",
          outTime: newStatus === "Absent" || newStatus === "On Leave" ? "--" : "04:30 PM",
          dutyHours: newStatus === "Present" ? "8 hrs" : newStatus === "Half Day" ? "4 hrs" : "0 hrs",
          shift: staff.shift?.split(" ")[0] || "Morning",
          remarks: `Marked by HR ${currentStaff?.name || "Kavita"}`,
        };
        return [newRecord, ...prev];
      }
    });

    setToastMessage(`Updated ${staff.name} to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 2500);
  }

  // Quick Action: Mark All Present
  function handleMarkAllPresent() {
    setAttendanceRecords((prev) => {
      const otherDates = prev.filter((r) => r.date !== selectedDate);
      const newRecordsForToday = allStaff.map((staff) => {
        return {
          id: `ATT-${selectedDate}-${staff.id}`,
          staffId: staff.id,
          staffName: staff.name,
          role: staff.role,
          department: staff.department,
          date: selectedDate,
          status: "Present",
          inTime: "08:00 AM",
          outTime: "04:30 PM",
          dutyHours: "8 hrs 30 mins",
          shift: staff.shift?.split(" ")[0] || "Morning",
          remarks: "Biometric Attendance Sync - Present",
        };
      });
      return [...newRecordsForToday, ...otherDates];
    });

    setToastMessage("✓ All Hospital Staff marked Present for today");
    setTimeout(() => setToastMessage(null), 3000);
  }

  // Handle Assign Duty Shift
  function handleSaveDutyShift(e) {
    e.preventDefault();
    const docObj = doctors.find((d) => d.id === assignedDocId);
    const nurseObj = nurses.find((n) => n.id === assignedNurseId);

    const newDuty = {
      id: `DUTY-${Date.now()}`,
      floor: targetFloor,
      shift: targetShift,
      doctor: docObj?.name || "Dr. Rajesh Sharma",
      doctorId: docObj?.id || "DOC-101",
      nurse: nurseObj?.name || "Sister Preeti Mishra",
      nurseId: nurseObj?.id || "NUR-201",
      rooms: targetFloor.includes("ICU") ? "ICU-01 to ICU-04" : targetFloor.includes("Emergency") ? "Triage & Resuscitation" : "Ward 101-102",
      activePatientsCount: 3,
      date: selectedDate,
      assignedBy: currentStaff?.name || "HR Kavita Saxena",
    };

    setDutyRoster([newDuty, ...dutyRoster]);
    setIsAssignDutyModalOpen(false);
    setToastMessage(`✓ Duty assigned for ${targetFloor} (${targetShift.split(" ")[0]} Shift)`);
    setTimeout(() => setToastMessage(null), 3000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#db2777",
            color: "#ffffff",
            padding: "12px 22px",
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
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top HR Header - Light Mode */}
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
              background: "linear-gradient(135deg, #db2777, #be185d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(219, 39, 119, 0.25)",
            }}
          >
            <Briefcase size={30} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700, color: "#0f172a" }}>
                Human Resources &amp; Staff Duty Desk
              </h2>
              <span
                style={{
                  backgroundColor: "#fce7f3",
                  color: "#be185d",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "1px solid #fbcfe8",
                }}
              >
                Manager: {currentStaff?.name || "Kavita Saxena"}
              </span>
            </div>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
              Staff daily biometric attendance, shift roster scheduling, and floor assignment matrix.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleMarkAllPresent}
            style={{
              backgroundColor: "#f0fdf4",
              color: "#15803d",
              border: "1px solid #bbf7d0",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle2 size={16} />
            <span>Mark All Staff Present</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAssignDutyModalOpen(true)}
            style={{
              backgroundColor: "#db2777",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 3px 10px rgba(219, 39, 119, 0.25)",
            }}
          >
            <Plus size={18} />
            <span>Assign Duty Roster / Shift</span>
          </button>
        </div>
      </div>

      {/* HR Stats Ribbon - Light Mode */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Total Workforce</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>
            {totalStaffCount}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#0284c7", fontWeight: 600 }}>Doctors, Nurses &amp; Support</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Present Today</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            {presentCount} <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 400 }}>({attendanceRate}%)</span>
          </div>
          <span style={{ fontSize: "0.76rem", color: "#16a34a", fontWeight: 600 }}>On Active Duty</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>On Approved Leave</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#7c3aed", marginTop: "4px" }}>
            {leaveCount}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#7c3aed", fontWeight: 600 }}>Medical / Casual Leave</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Absent / Off Duty</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#dc2626", marginTop: "4px" }}>
            {absentCount}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#dc2626", fontWeight: 600 }}>Unmarked or Off</span>
        </div>
      </div>

      {/* HR Navigation Sub-Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("attendance")}
          style={{
            backgroundColor: activeTab === "attendance" ? "#db2777" : "#ffffff",
            color: activeTab === "attendance" ? "#ffffff" : "#475569",
            fontWeight: 700,
            border: "1px solid #cbd5e1",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem",
            boxShadow: activeTab === "attendance" ? "0 2px 6px rgba(219, 39, 119, 0.25)" : "none",
          }}
        >
          <Clock size={16} />
          <span>Daily Staff Attendance ({allStaff.length} Employees)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("roster")}
          style={{
            backgroundColor: activeTab === "roster" ? "#db2777" : "#ffffff",
            color: activeTab === "roster" ? "#ffffff" : "#475569",
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
          <Calendar size={16} />
          <span>Shift &amp; Floor Duty Roster ({dutyRoster.length} Shifts)</span>
        </button>
      </div>

      {/* TAB 1: Attendance Marking Table - Light Mode */}
      {activeTab === "attendance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Controls Bar */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  width: "100%",
                }}
              >
                <Search size={16} color="#64748b" />
                <input
                  type="text"
                  placeholder="Search staff name, department, designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#0f172a",
                    fontSize: "0.85rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Date:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "7px 12px",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  <option value="ALL">All Staff</option>
                  <option value="Doctor">Doctors</option>
                  <option value="Nurse">Nurses</option>
                  <option value="Receptionist">Receptionists</option>
                  <option value="Pharmacist">Pharmacists</option>
                  <option value="HR">HR Team</option>
                </select>
              </div>
            </div>
          </div>

          {/* Staff Attendance Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredStaff.map((staff) => {
              const attRecord = attendanceRecords.find(
                (r) => r.staffId === staff.id && r.date === selectedDate
              );
              const currentStatus = attRecord?.status || "Present";

              return (
                <div
                  key={staff.id}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                >
                  {/* Left: Staff Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "260px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "10px",
                        backgroundColor:
                          staff.role === "Doctor"
                            ? "#f0fdf4"
                            : staff.role === "Nurse"
                            ? "#fef3c7"
                            : "#fce7f3",
                        color:
                          staff.role === "Doctor"
                            ? "#15803d"
                            : staff.role === "Nurse"
                            ? "#b45309"
                            : "#be185d",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {staff.role === "Doctor" ? "Dr" : staff.role === "Nurse" ? "RN" : "HR"}
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 2px", fontSize: "0.98rem", fontWeight: 700, color: "#0f172a" }}>
                        {staff.name}
                      </h4>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        {staff.designation} • <strong style={{ color: "#334155" }}>{staff.department}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Shift & Timings */}
                  <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    <div>Shift: <strong style={{ color: "#0284c7" }}>{staff.shift}</strong></div>
                    <div>In: <strong style={{ color: "#0f172a" }}>{attRecord?.inTime || "08:00 AM"}</strong> | Out: <strong style={{ color: "#0f172a" }}>{attRecord?.outTime || "04:30 PM"}</strong></div>
                  </div>

                  {/* Right: Attendance Marking Status Buttons */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {["Present", "Absent", "Half Day", "On Leave"].map((st) => {
                      const isSelected = currentStatus === st;
                      const activeBg =
                        st === "Present"
                          ? "#16a34a"
                          : st === "Absent"
                          ? "#dc2626"
                          : st === "Half Day"
                          ? "#d97706"
                          : "#7c3aed";

                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateStatus(staff, st)}
                          style={{
                            backgroundColor: isSelected ? activeBg : "#f8fafc",
                            color: isSelected ? "#ffffff" : "#475569",
                            border: `1px solid ${isSelected ? activeBg : "#cbd5e1"}`,
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "0.78rem",
                            fontWeight: isSelected ? 700 : 600,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            boxShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                          }}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Shift & Floor Duty Roster Scheduling - Light Mode */}
      {activeTab === "roster" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                Hospital Ward &amp; Floor Duty Roster
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
                Assign Doctors and Nurses to Morning, Evening, and Night shifts across all hospital floors.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAssignDutyModalOpen(true)}
              style={{
                backgroundColor: "#db2777",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 6px rgba(219, 39, 119, 0.25)",
              }}
            >
              <Plus size={16} />
              <span>Schedule New Shift Duty</span>
            </button>
          </div>

          {/* Duty Matrix Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {dutyRoster.map((duty) => (
              <div
                key={duty.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "14px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                        {duty.floor}
                      </h4>
                      <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{duty.rooms}</span>
                    </div>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        backgroundColor: duty.shift.includes("Morning")
                          ? "#f0f9ff"
                          : duty.shift.includes("Evening")
                          ? "#fef3c7"
                          : "#f3e8ff",
                        color: duty.shift.includes("Morning")
                          ? "#0284c7"
                          : duty.shift.includes("Evening")
                          ? "#b45309"
                          : "#7e22ce",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {duty.shift.split(" ")[0]} Shift
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "0.82rem",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Stethoscope size={15} color="#16a34a" />
                      <span style={{ color: "#64748b" }}>Duty Doctor:</span>
                      <strong style={{ color: "#0f172a" }}>{duty.doctor}</strong>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Users size={15} color="#d97706" />
                      <span style={{ color: "#64748b" }}>Attending Nurse:</span>
                      <strong style={{ color: "#0f172a" }}>{duty.nurse}</strong>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Clock size={15} color="#0284c7" />
                      <span style={{ color: "#64748b" }}>Timings:</span>
                      <strong style={{ color: "#0284c7" }}>{duty.shift}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  Assigned by: {duty.assignedBy || "HR Department"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign Duty Modal - Light Mode */}
      {isAssignDutyModalOpen && (
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
          onClick={() => setIsAssignDutyModalOpen(false)}
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
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>
                Assign Floor Shift Duty
              </h3>
              <button
                type="button"
                onClick={() => setIsAssignDutyModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDutyShift} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Hospital Floor / Ward *
                </label>
                <select
                  value={targetFloor}
                  onChange={(e) => setTargetFloor(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <option value="Ground Floor (Emergency & Triage)">Ground Floor (Emergency & Triage)</option>
                  <option value="Floor 1 (General Ward 101-102)">Floor 1 (General Ward 101-102)</option>
                  <option value="Floor 2 (Private Deluxe 201-205)">Floor 2 (Private Deluxe 201-205)</option>
                  <option value="Floor 3 (ICU & Critical Care)">Floor 3 (ICU & Critical Care)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Shift Timing *
                </label>
                <select
                  value={targetShift}
                  onChange={(e) => setTargetShift(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <option value="Morning (08:00 AM – 04:00 PM)">Morning (08:00 AM – 04:00 PM)</option>
                  <option value="Evening (04:00 PM – 12:00 AM)">Evening (04:00 PM – 12:00 AM)</option>
                  <option value="Night (12:00 AM – 08:00 AM)">Night (12:00 AM – 08:00 AM)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Assign In-Charge Doctor *
                </label>
                <select
                  value={assignedDocId}
                  onChange={(e) => setAssignedDocId(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <option value="">Select Doctor...</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Assign Attending Staff Nurse *
                </label>
                <select
                  value={assignedNurseId}
                  onChange={(e) => setAssignedNurseId(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  <option value="">Select Nurse...</option>
                  {nurses.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name} ({n.assignedFloor || "Ward Nurse"})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsAssignDutyModalOpen(false)}
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
                    backgroundColor: "#db2777",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 22px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Assign Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
