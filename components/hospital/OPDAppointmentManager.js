"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  UserPlus,
  Stethoscope,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Printer,
  ChevronRight,
  Filter,
  Check,
  User,
  Phone,
  DollarSign,
  ArrowRight,
  Bed,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospitalSeedData";

export default function OPDAppointmentManager({
  appointments,
  setAppointments,
  allStaff,
  onAdmitToIPD,
}) {
  const doctors = allStaff.filter((s) => s.role === "Doctor");

  const todayStr = "2026-09-29"; // System baseline date or current date
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [doctorFilter, setDoctorFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [printableToken, setPrintableToken] = useState(null); // Print token slip modal

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    age: "",
    gender: "Male",
    mobile: "",
    city: "Kanpur",
    appointmentDate: todayStr,
    timeSlot: "11:00 AM",
    doctorId: doctors[0]?.id || "DOC-101",
    chiefComplaint: "",
    consultationFee: 800,
    paymentStatus: "Paid",
  });

  // Calculate day-wise stats
  const dateAppointments = appointments.filter((a) => a.appointmentDate === selectedDate);
  const waitingCount = dateAppointments.filter((a) => a.status === "Waiting").length;
  const inConsultCount = dateAppointments.filter((a) => a.status === "In Consultation").length;
  const completedCount = dateAppointments.filter((a) => a.status === "Completed").length;

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesDate = selectedDate === "ALL" || apt.appointmentDate === selectedDate;
    const matchesDoc = doctorFilter === "ALL" || apt.doctorId === doctorFilter;
    const matchesStatus = statusFilter === "ALL" || apt.status === statusFilter;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.mobile.includes(searchTerm) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.chiefComplaint?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDate && matchesDoc && matchesStatus && matchesSearch;
  });

  // Handle Book Appointment Submit
  function handleBookSubmit(e) {
    e.preventDefault();
    if (!bookingForm.patientName.trim() || !bookingForm.mobile.trim()) return;

    const assignedDoc = doctors.find((d) => d.id === bookingForm.doctorId) || doctors[0];

    // Calculate next token number for this doctor on this date
    const sameDocDateApts = appointments.filter(
      (a) => a.doctorId === assignedDoc.id && a.appointmentDate === bookingForm.appointmentDate
    );
    const nextToken = sameDocDateApts.length + 1;

    // Calculate day of week
    const dateObj = new Date(bookingForm.appointmentDate);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const newApt = {
      id: `APT-${Date.now().toString().slice(-4)}`,
      tokenNumber: nextToken,
      patientName: bookingForm.patientName.trim(),
      age: parseInt(bookingForm.age) || 30,
      gender: bookingForm.gender,
      mobile: bookingForm.mobile.trim(),
      city: bookingForm.city || "Kanpur",
      appointmentDate: bookingForm.appointmentDate,
      dayOfWeek: dayOfWeek,
      timeSlot: bookingForm.timeSlot,
      doctorId: assignedDoc.id,
      doctorName: assignedDoc.name,
      department: assignedDoc.department,
      chiefComplaint: bookingForm.chiefComplaint || "Routine consultation",
      consultationFee: parseInt(bookingForm.consultationFee) || 800,
      paymentStatus: bookingForm.paymentStatus,
      status: "Waiting",
      bookedBy: "Reception Desk",
      bookedAt: new Date().toISOString(),
    };

    setAppointments([newApt, ...appointments]);
    setIsBookModalOpen(false);
    setPrintableToken(newApt); // Open token slip print preview!

    // Reset Form
    setBookingForm({
      patientName: "",
      age: "",
      gender: "Male",
      mobile: "",
      city: "Kanpur",
      appointmentDate: todayStr,
      timeSlot: "11:00 AM",
      doctorId: doctors[0]?.id || "DOC-101",
      chiefComplaint: "",
      consultationFee: 800,
      paymentStatus: "Paid",
    });
  }

  // Update Status Action
  function handleStatusChange(aptId, newStatus) {
    const updated = appointments.map((a) => {
      if (a.id === aptId) {
        return { ...a, status: newStatus };
      }
      return a;
    });
    setAppointments(updated);
  }

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Top Header & Reception Action */}
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
            OPD Appointments &amp; Day-Wise Token Queue Management
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Receptionist appointment booking, doctor assignment, day/date tracking, and live chamber queue.
          </p>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0D9488",
            color: "#0f172a",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(13, 148, 136, 0.4)",
          }}
        >
          <UserPlus size={16} />
          <span>+ Book OPD Appointment &amp; Generate Token</span>
        </button>
      </div>

      {/* Date & Day Filter Tabs Bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          padding: "18px 22px",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Quick Date Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.84rem", color: "#64748b", fontWeight: 700 }}>
            Select Day / Date:
          </span>
          <button
            onClick={() => setSelectedDate("2026-09-29")}
            style={{
              backgroundColor: selectedDate === "2026-09-29" ? "#0284C7" : "#0F172A",
              color: selectedDate === "2026-09-29" ? "#ffffff" : "#94A3B8",
              border: "1px solid #cbd5e1",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            📅 Today (Tuesday, 29 Sep)
          </button>

          <button
            onClick={() => setSelectedDate("2026-09-30")}
            style={{
              backgroundColor: selectedDate === "2026-09-30" ? "#0284C7" : "#0F172A",
              color: selectedDate === "2026-09-30" ? "#ffffff" : "#94A3B8",
              border: "1px solid #cbd5e1",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            📅 Tomorrow (Wednesday, 30 Sep)
          </button>

          <button
            onClick={() => setSelectedDate("ALL")}
            style={{
              backgroundColor: selectedDate === "ALL" ? "#0284C7" : "#0F172A",
              color: selectedDate === "ALL" ? "#ffffff" : "#94A3B8",
              border: "1px solid #cbd5e1",
              padding: "7px 14px",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            All Dates Log
          </button>

          {/* Custom Date Picker */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 6 }}>
            <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Pick Date:</span>
            <input
              type="date"
              value={selectedDate === "ALL" ? todayStr : selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                backgroundColor: "#ffffff",
                color: "#ffffff",
                border: "1px solid #cbd5e1",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "0.82rem",
                outline: "none",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* Live OPD Queue Stats for Selected Date */}
        <div style={{ display: "flex", gap: 10, fontSize: "0.82rem" }}>
          <div
            style={{
              backgroundColor: "rgba(234, 179, 8, 0.12)",
              border: "1px solid rgba(234, 179, 8, 0.3)",
              color: "#FCD34D",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            {waitingCount} Waiting
          </div>
          <div
            style={{
              backgroundColor: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38BDF8",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            {inConsultCount} In Chamber
          </div>
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34D399",
              padding: "4px 10px",
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            {completedCount} Done
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
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
            placeholder="Search patient, mobile, doctor, complaint..."
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

        {/* Doctor and Status Filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              color: "#ffffff",
              border: "1px solid #cbd5e1",
              padding: "7px 12px",
              borderRadius: "6px",
              fontSize: "0.82rem",
              outline: "none",
            }}
          >
            <option value="ALL">All Doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                👨‍⚕️ {d.name} ({d.department})
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: "#ffffff",
              color: "#ffffff",
              border: "1px solid #cbd5e1",
              padding: "7px 12px",
              borderRadius: "6px",
              fontSize: "0.82rem",
              outline: "none",
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="Waiting">Waiting in OPD</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Completed">Completed</option>
            <option value="Scheduled">Scheduled (Future)</option>
          </select>
        </div>
      </div>

      {/* OPD Appointments Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.86rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", color: "#64748b" }}>
              <th style={{ padding: "14px 18px", textAlign: "center" }}>Token #</th>
              <th style={{ padding: "14px 18px" }}>Patient Details</th>
              <th style={{ padding: "14px 18px" }}>Assigned Doctor</th>
              <th style={{ padding: "14px 18px" }}>Date &amp; Time Slot</th>
              <th style={{ padding: "14px 18px" }}>Chief Problem / Complaint</th>
              <th style={{ padding: "14px 18px" }}>Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Reception Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "36px", textAlign: "center", color: "#64748b" }}>
                  No OPD appointments found for this selection. Click <strong>+ Book OPD Appointment</strong> above.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => (
                <tr
                  key={apt.id}
                  style={{
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {/* Token Number */}
                  <td style={{ padding: "14px 18px", textAlign: "center" }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
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
                        border: `2px solid ${
                          apt.status === "In Consultation"
                            ? "#38BDF8"
                            : apt.status === "Completed"
                            ? "#34D399"
                            : "#FCD34D"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: "0.95rem",
                        margin: "0 auto",
                      }}
                    >
                      #{apt.tokenNumber}
                    </div>
                  </td>

                  {/* Patient Details */}
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>
                      {apt.patientName}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
                      {apt.age}y • {apt.gender} • 📞 {apt.mobile}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748B" }}>
                      Locality: {apt.city}
                    </div>
                  </td>

                  {/* Assigned Doctor */}
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 700, color: "#38BDF8" }}>
                      {apt.doctorName}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "#64748b" }}>
                      {apt.department}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#34D399", marginTop: 2 }}>
                      Fee: ₹{apt.consultationFee} ({apt.paymentStatus})
                    </div>
                  </td>

                  {/* Date & Time Slot */}
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>
                      {apt.appointmentDate}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#FCD34D" }}>
                      {apt.dayOfWeek} • {apt.timeSlot}
                    </div>
                  </td>

                  {/* Complaint */}
                  <td style={{ padding: "14px 18px", maxWidth: 220 }}>
                    <div style={{ color: "#475569", fontSize: "0.82rem" }}>
                      {apt.chiefComplaint}
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: "14px 18px" }}>
                    <span
                      style={{
                        backgroundColor:
                          apt.status === "In Consultation"
                            ? "rgba(56, 189, 248, 0.15)"
                            : apt.status === "Completed"
                            ? "rgba(16, 185, 129, 0.15)"
                            : "rgba(234, 179, 8, 0.15)",
                        color:
                          apt.status === "In Consultation"
                            ? "#38BDF8"
                            : apt.status === "Completed"
                            ? "#34D399"
                            : "#FCD34D",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: `1px solid ${
                          apt.status === "In Consultation"
                            ? "rgba(56, 189, 248, 0.3)"
                            : apt.status === "Completed"
                            ? "rgba(16, 185, 129, 0.3)"
                            : "rgba(234, 179, 8, 0.3)"
                        }`,
                      }}
                    >
                      {apt.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
                      {apt.status === "Waiting" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "In Consultation")}
                          style={{
                            backgroundColor: "#0284C7",
                            color: "#ffffff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Send Inside
                        </button>
                      )}

                      {apt.status === "In Consultation" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "Completed")}
                          style={{
                            backgroundColor: "#10B981",
                            color: "#ffffff",
                            border: "none",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => setPrintableToken(apt)}
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#64748b",
                          border: "1px solid #cbd5e1",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Printer size={12} />
                        <span>Token Slip</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Book OPD Appointment Form */}
      {isBookModalOpen && (
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
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: 14,
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                  Book OPD Appointment &amp; Assign Doctor
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Reception desk patient booking &amp; token queue generator
                </span>
              </div>
              <button
                onClick={() => setIsBookModalOpen(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBookSubmit}>
              {/* Patient Basic Info */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={bookingForm.patientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
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
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="45"
                    value={bookingForm.age}
                    onChange={(e) => setBookingForm({ ...bookingForm, age: e.target.value })}
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
                    Gender *
                  </label>
                  <select
                    value={bookingForm.gender}
                    onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
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

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={bookingForm.mobile}
                    onChange={(e) => setBookingForm({ ...bookingForm, mobile: e.target.value })}
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
                    City / Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Panki, Kanpur"
                    value={bookingForm.city}
                    onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
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

              {/* Date & Time Slot */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.appointmentDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, appointmentDate: e.target.value })}
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
                    Preferred Time Slot *
                  </label>
                  <select
                    value={bookingForm.timeSlot}
                    onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Assign Doctor */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                  Assign Specialist Doctor *
                </label>
                <select
                  value={bookingForm.doctorId}
                  onChange={(e) => {
                    const doc = doctors.find((d) => d.id === e.target.value);
                    setBookingForm({
                      ...bookingForm,
                      doctorId: e.target.value,
                      consultationFee: doc?.department === "Cardiology" ? 800 : doc?.department === "Orthopedics" ? 700 : 600,
                    });
                  }}
                  style={{
                    width: "100%",
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      👨‍⚕️ {d.name} — {d.designation} ({d.department} • {d.room})
                    </option>
                  ))}
                </select>
              </div>

              {/* Chief Problem / Symptoms */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                  Chief Problem / Reason for Visit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chest tightness on walking / High continuous fever / Knee joint pain"
                  value={bookingForm.chiefComplaint}
                  onChange={(e) => setBookingForm({ ...bookingForm, chiefComplaint: e.target.value })}
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

              {/* Fee and Payment */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", marginBottom: 4 }}>
                    OPD Consultation Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={bookingForm.consultationFee}
                    onChange={(e) => setBookingForm({ ...bookingForm, consultationFee: e.target.value })}
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
                    Payment Status
                  </label>
                  <select
                    value={bookingForm.paymentStatus}
                    onChange={(e) => setBookingForm({ ...bookingForm, paymentStatus: e.target.value })}
                    style={{
                      width: "100%",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      color: "#ffffff",
                    }}
                  >
                    <option value="Paid">Paid at Reception Counter</option>
                    <option value="Pending">Pending (Pay after Consultation)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
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
                    backgroundColor: "#0D9488",
                    color: "#0f172a",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Confirm &amp; Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE OPD TOKEN SLIP */}
      {printableToken && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 110,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#0F172A",
              borderRadius: "12px",
              padding: "28px 32px",
              maxWidth: 440,
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: "2px dashed #CBD5E1", paddingBottom: 14, marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 2px", fontSize: "1.2rem", fontWeight: 800, color: "#0F766E" }}>
                {hospitalInfo.name}
              </h3>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B" }}>
                OPD Outpatient Token Slip • Panki, Kanpur
              </p>
            </div>

            {/* Token Big Badge */}
            <div
              style={{
                backgroundColor: "#F0FDFA",
                border: "2px solid #0D9488",
                borderRadius: "12px",
                padding: "14px",
                margin: "12px 0 16px",
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "#0F766E", fontWeight: 700, textTransform: "uppercase" }}>
                OPD QUEUE TOKEN NUMBER
              </span>
              <div style={{ fontSize: "3rem", fontWeight: 900, color: "#0F766E", lineHeight: 1.1 }}>
                #{printableToken.tokenNumber}
              </div>
              <span style={{ fontSize: "0.82rem", color: "#475569" }}>
                Slot: <strong>{printableToken.timeSlot}</strong> • {printableToken.dayOfWeek}, {printableToken.appointmentDate}
              </span>
            </div>

            {/* Patient & Doctor Meta */}
            <div
              style={{
                textAlign: "left",
                backgroundColor: "#ffffff",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "0.84rem",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginBottom: 20,
              }}
            >
              <div>
                Patient: <strong>{printableToken.patientName}</strong> ({printableToken.age}y/{printableToken.gender})
              </div>
              <div>Phone: <strong>{printableToken.mobile}</strong></div>
              <div>
                Doctor: <strong style={{ color: "#0F766E" }}>{printableToken.doctorName}</strong>
              </div>
              <div>Department: <strong>{printableToken.department}</strong></div>
              <div>Problem: <em>{printableToken.chiefComplaint}</em></div>
              <div style={{ borderTop: "1px dashed #E2E8F0", paddingTop: 4, marginTop: 4 }}>
                Fee: <strong>₹{printableToken.consultationFee}</strong> ({printableToken.paymentStatus})
              </div>
            </div>

            {/* Print and Close buttons */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => window.print()}
                style={{
                  backgroundColor: "#0D9488",
                  color: "#0f172a",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Printer size={16} />
                <span>Print Token Slip</span>
              </button>

              <button
                onClick={() => setPrintableToken(null)}
                style={{
                  backgroundColor: "#F1F5F9",
                  color: "#475569",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
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
