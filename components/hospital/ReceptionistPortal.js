"use client";

import { useState } from "react";
import {
  Calendar,
  Bed,
  Clock,
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Printer,
  UserCheck,
  AlertCircle,
  Building,
  Phone,
  DollarSign,
  ChevronRight,
  Filter,
  X,
  Stethoscope,
  Activity,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospitalSeedData";

export default function ReceptionistPortal({
  currentStaff,
  allStaff,
  appointments,
  setAppointments,
  doctorSchedules,
  floors,
  patients,
  setPatients,
  bills,
  setBills,
}) {
  const [activeTab, setActiveTab] = useState("appointments"); // appointments | beds | doctors | billing
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("2026-09-29");
  const [printableToken, setPrintableToken] = useState(null);
  const [printableReceipt, setPrintableReceipt] = useState(null);

  // New Appointment Booking Form State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const doctors = allStaff.filter((s) => s.role === "Doctor");
  const [patientName, setPatientName] = useState("");
  const [patientMobile, setPatientMobile] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [patientCity, setPatientCity] = useState("Kanpur");
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || "DOC-101");
  const [appointmentDate, setAppointmentDate] = useState("2026-09-29");
  const [timeSlot, setTimeSlot] = useState("10:30 AM");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [feePaid, setFeePaid] = useState(true);

  // Quick Payment Collection Modal State
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payPatientName, setPayPatientName] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [payCategory, setPayCategory] = useState("OPD Consultation Fee");
  const [payMode, setPayMode] = useState("Cash");
  const [payRemarks, setPayRemarks] = useState("");

  // Bed Vacancy Calculations
  const totalBeds = floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const totalOccupied = floors.reduce((acc, f) => acc + f.occupiedBeds, 0);
  const totalAvailable = Math.max(0, totalBeds - totalOccupied);

  // Appointments Filtering
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.mobile?.includes(searchQuery) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = dateFilter === "ALL" ? true : apt.appointmentDate === dateFilter;
    return matchesSearch && matchesDate;
  });

  // Calculate today's token number for selected doctor on that date
  const doctorForApt = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
  const matchingDateApts = appointments.filter(
    (a) => a.doctorId === selectedDoctorId && a.appointmentDate === appointmentDate
  );
  const nextTokenNumber = matchingDateApts.length + 1;

  // Handle New Booking
  function handleBookAppointment(e) {
    e.preventDefault();
    if (!patientName.trim() || !patientMobile.trim()) return;

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const chosenDay = days[new Date(appointmentDate).getDay()];

    const docSchedule = doctorSchedules.find((s) => s.doctorId === selectedDoctorId);
    const consultationFee = docSchedule ? docSchedule.consultationFee : 500;

    const newApt = {
      id: `APT-${Date.now()}`,
      tokenNumber: nextTokenNumber,
      patientName: patientName.trim(),
      age: parseInt(patientAge) || 30,
      gender: patientGender,
      mobile: patientMobile.trim(),
      city: patientCity.trim(),
      appointmentDate,
      dayOfWeek: chosenDay,
      timeSlot,
      doctorId: selectedDoctorId,
      doctorName: doctorForApt.name,
      department: doctorForApt.department,
      chiefComplaint: chiefComplaint.trim() || "General Consultation",
      consultationFee,
      paymentStatus: feePaid ? "Paid" : "Pending",
      status: "Waiting",
      bookedBy: currentStaff?.name || "Receptionist Neha",
      bookedAt: new Date().toISOString(),
    };

    setAppointments([newApt, ...appointments]);

    // If fee paid, record in billing
    if (feePaid) {
      const newBill = {
        id: `INV-OPD-${Date.now().toString().slice(-5)}`,
        invoiceNo: `OPD-${newApt.tokenNumber}-${Date.now().toString().slice(-4)}`,
        patientId: newApt.id,
        patientName: newApt.patientName,
        patientPhone: newApt.mobile,
        admissionDate: appointmentDate,
        dischargeDate: appointmentDate,
        billType: "OPD Consultation",
        doctorName: doctorForApt.name,
        roomType: "OPD Chamber",
        items: [
          { name: `OPD Consultation (${doctorForApt.department})`, category: "Doctor Fee", qty: 1, rate: consultationFee, amount: consultationFee },
        ],
        subtotal: consultationFee,
        discount: 0,
        grandTotal: consultationFee,
        paidAmount: consultationFee,
        dueAmount: 0,
        paymentStatus: "Paid",
        paymentMode: "Cash / Desk",
        generatedDate: appointmentDate,
        generatedBy: currentStaff?.name || "Receptionist Neha",
      };
      setBills([newBill, ...bills]);
    }

    setPrintableToken(newApt);
    setIsBookModalOpen(false);

    // Reset Form
    setPatientName("");
    setPatientMobile("");
    setPatientAge("");
    setChiefComplaint("");
  }

  // Handle Quick Payment Collection
  function handleCollectPayment(e) {
    e.preventDefault();
    if (!payPatientName.trim() || !payAmount) return;

    const amt = parseFloat(payAmount) || 0;
    const newBill = {
      id: `INV-REC-${Date.now().toString().slice(-5)}`,
      invoiceNo: `REC-${Date.now().toString().slice(-4)}`,
      patientId: `WALK-${Date.now().toString().slice(-4)}`,
      patientName: payPatientName.trim(),
      patientPhone: "--",
      admissionDate: "2026-09-29",
      dischargeDate: "2026-09-29",
      billType: payCategory,
      doctorName: "Hospital Billing Desk",
      roomType: "Reception Counter",
      items: [
        { name: payCategory, category: payCategory, qty: 1, rate: amt, amount: amt },
      ],
      subtotal: amt,
      discount: 0,
      grandTotal: amt,
      paidAmount: amt,
      dueAmount: 0,
      paymentStatus: "Paid",
      paymentMode: payMode,
      remarks: payRemarks,
      generatedDate: "2026-09-29",
      generatedBy: currentStaff?.name || "Receptionist Neha",
    };

    setBills([newBill, ...bills]);
    setPrintableReceipt(newBill);
    setIsPayModalOpen(false);
    setPayPatientName("");
    setPayAmount("");
    setPayRemarks("");
  }

  // Financial summary
  const totalCollected = bills.reduce((acc, b) => acc + (b.paidAmount || 0), 0);
  const totalBilled = bills.reduce((acc, b) => acc + (b.grandTotal || 0), 0);
  const totalPendingDues = bills.reduce((acc, b) => acc + (b.dueAmount || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Front Desk Header Ribbon - Light Mode */}
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
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
            }}
          >
            <Calendar size={30} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700, color: "#0f172a" }}>
                Reception &amp; Front Office Desk
              </h2>
              <span
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "#7e22ce",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  border: "1px solid #e9d5ff",
                }}
              >
                Officer: {currentStaff?.name || "Neha Gupta"}
              </span>
            </div>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
              OPD Appointment Booking, Bed Vacancy Status, Doctor Daily Roster &amp; Cash Collection.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setIsBookModalOpen(true)}
            style={{
              backgroundColor: "#7c3aed",
              color: "#ffffff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 3px 10px rgba(124, 58, 237, 0.25)",
            }}
          >
            <Plus size={18} />
            <span>Book OPD Appointment (New Token)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPayModalOpen(true)}
            style={{
              backgroundColor: "#16a34a",
              color: "#ffffff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(22, 163, 74, 0.25)",
            }}
          >
            <DollarSign size={18} />
            <span>Collect Payment / Fee</span>
          </button>
        </div>
      </div>

      {/* 4 Stat KPIs - Light Mode */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Available (Khali) Beds</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            {totalAvailable} <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 400 }}>/ {totalBeds} total</span>
          </div>
          <span style={{ fontSize: "0.76rem", color: "#16a34a", fontWeight: 600 }}>Vacant for immediate admission</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Today's OPD Appointments</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#7c3aed", marginTop: "4px" }}>
            {appointments.filter((a) => a.appointmentDate === "2026-09-29").length} Patients
          </div>
          <span style={{ fontSize: "0.76rem", color: "#64748b" }}>Token queue active</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Doctors Available Today</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0284c7", marginTop: "4px" }}>
            {doctorSchedules.length} Doctors
          </div>
          <span style={{ fontSize: "0.76rem", color: "#0284c7", fontWeight: 600 }}>In OPD / IPD Rounds</span>
        </div>

        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "18px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <div style={{ color: "#64748b", fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700 }}>Total Payments Collected</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>
            ₹{totalCollected.toLocaleString()}
          </div>
          <span style={{ fontSize: "0.76rem", color: "#16a34a", fontWeight: 600 }}>Pending Dues: ₹{totalPendingDues.toLocaleString()}</span>
        </div>
      </div>

      {/* Reception Navigation Sub-Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setActiveTab("appointments")}
          style={{
            backgroundColor: activeTab === "appointments" ? "#7c3aed" : "#ffffff",
            color: activeTab === "appointments" ? "#ffffff" : "#475569",
            fontWeight: 700,
            border: "1px solid #cbd5e1",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.88rem",
            boxShadow: activeTab === "appointments" ? "0 2px 6px rgba(124, 58, 237, 0.25)" : "none",
          }}
        >
          <Calendar size={16} />
          <span>OPD Appointments &amp; Token Queue ({appointments.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("beds")}
          style={{
            backgroundColor: activeTab === "beds" ? "#7c3aed" : "#ffffff",
            color: activeTab === "beds" ? "#ffffff" : "#475569",
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
          <span>Bed Availability Status ({totalAvailable} Khali Beds)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("doctors")}
          style={{
            backgroundColor: activeTab === "doctors" ? "#7c3aed" : "#ffffff",
            color: activeTab === "doctors" ? "#ffffff" : "#475569",
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
          <Clock size={16} />
          <span>Doctor OPD &amp; Daily Round Schedule</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("billing")}
          style={{
            backgroundColor: activeTab === "billing" ? "#7c3aed" : "#ffffff",
            color: activeTab === "billing" ? "#ffffff" : "#475569",
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
          <CreditCard size={16} />
          <span>Billing &amp; Payment Collection Desk</span>
        </button>
      </div>

      {/* TAB 1: OPD Appointments & Token Queue */}
      {activeTab === "appointments" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Search & Filter Bar */}
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
                  placeholder="Search patient name, mobile, doctor..."
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

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>Date:</span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  padding: "7px 12px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                <option value="2026-09-29">Today (2026-09-29)</option>
                <option value="2026-09-30">Tomorrow (2026-09-30)</option>
                <option value="ALL">All Dates</option>
              </select>
            </div>
          </div>

          {/* Appointment Tokens Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
            {filteredAppointments.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", backgroundColor: "#ffffff", borderRadius: "12px", color: "#64748b", border: "1px solid #e2e8f0" }}>
                No appointments found for the selected date.
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
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
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            backgroundColor: "#f3e8ff",
                            color: "#7e22ce",
                            fontWeight: 800,
                            fontSize: "1rem",
                            border: "1px solid #e9d5ff",
                          }}
                        >
                          Token #{String(apt.tokenNumber).padStart(2, "0")}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                            {apt.patientName}
                          </h4>
                          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            {apt.age}y / {apt.gender} • 📞 {apt.mobile}
                          </span>
                        </div>
                      </div>

                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          backgroundColor:
                            apt.status === "Completed"
                              ? "#f0fdf4"
                              : apt.status === "In Consultation"
                              ? "#f0f9ff"
                              : "#fef3c7",
                          color:
                            apt.status === "Completed"
                              ? "#15803d"
                              : apt.status === "In Consultation"
                              ? "#0284c7"
                              : "#b45309",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#f8fafc",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        fontSize: "0.82rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Consulting Doctor:</span>
                        <strong style={{ color: "#0f172a" }}>{apt.doctorName}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Date &amp; Day:</span>
                        <strong style={{ color: "#0284c7" }}>{apt.appointmentDate} ({apt.dayOfWeek})</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Complaint:</span>
                        <span style={{ color: "#334155", maxWidth: "180px", textAlign: "right" }}>{apt.chiefComplaint}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "4px" }}>
                        <span style={{ color: "#64748b" }}>Fee (₹{apt.consultationFee}):</span>
                        <strong style={{ color: apt.paymentStatus === "Paid" ? "#16a34a" : "#dc2626" }}>
                          {apt.paymentStatus}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setPrintableToken(apt)}
                      style={{
                        flex: 1,
                        backgroundColor: "#f8fafc",
                        color: "#0f172a",
                        border: "1px solid #cbd5e1",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Printer size={14} />
                      <span>Print Token Slip</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Bed Availability Status (Khali Beds) - Light Mode */}
      {activeTab === "beds" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "14px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                  Real-Time Bed Availability &amp; Ward Capacity
                </h3>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
                  Check which beds are vacant (khali) for incoming patients across all floors.
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  color: "#15803d",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  border: "1px solid #bbf7d0",
                }}
              >
                {totalAvailable} Beds Available Now
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {floors.map((floor) => {
                const floorVacant = Math.max(0, floor.totalBeds - floor.occupiedBeds);

                return (
                  <div
                    key={floor.id}
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "18px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>
                          {floor.name}
                        </h4>
                        <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{floor.description}</span>
                      </div>
                      <span
                        style={{
                          backgroundColor: floorVacant > 0 ? "#f0fdf4" : "#fef2f2",
                          color: floorVacant > 0 ? "#15803d" : "#b91c1c",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          border: `1px solid ${floorVacant > 0 ? "#bbf7d0" : "#fecaca"}`,
                        }}
                      >
                        {floorVacant} Available / {floor.totalBeds} Total
                      </span>
                    </div>

                    {/* Room & Bed Pills Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
                      {floor.rooms.map((room, rIdx) => (
                        <div
                          key={rIdx}
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "10px",
                            padding: "12px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
                            {room.roomNo} <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 400 }}>({room.type})</span>
                          </div>

                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {room.beds.map((bedStr, bIdx) => {
                              const isVacant = bedStr.includes("Available");
                              return (
                                <span
                                  key={bIdx}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "4px 8px",
                                    borderRadius: "6px",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    backgroundColor: isVacant ? "#f0fdf4" : "#fef2f2",
                                    color: isVacant ? "#15803d" : "#b91c1c",
                                    border: `1px solid ${isVacant ? "#bbf7d0" : "#fecaca"}`,
                                  }}
                                >
                                  <Bed size={12} />
                                  <span>{bedStr.split(" ")[0]} {bedStr.split(" ")[1]} ({isVacant ? "KHALI" : "OCCUPIED"})</span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Doctor OPD & Daily Round Schedule - Light Mode */}
      {activeTab === "doctors" && (
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
            <h3 style={{ margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
              Doctor Visiting Schedule &amp; Live Status
            </h3>
            <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: "0.85rem" }}>
              Information for front desk receptionist: which doctor comes at what time for OPD and IPD patient rounds.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
              {doctorSchedules.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "14px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                          {doc.doctorName}
                        </h4>
                        <span style={{ fontSize: "0.78rem", color: "#0284c7", fontWeight: 600 }}>{doc.qualification}</span>
                      </div>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          backgroundColor:
                            doc.currentStatus.includes("Chamber")
                              ? "#f0fdf4"
                              : doc.currentStatus.includes("OT")
                              ? "#fef2f2"
                              : "#fef3c7",
                          color:
                            doc.currentStatus.includes("Chamber")
                              ? "#15803d"
                              : doc.currentStatus.includes("OT")
                              ? "#b91c1c"
                              : "#b45309",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        ● {doc.currentStatus}
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Chamber:</span>
                        <strong style={{ color: "#0f172a" }}>{doc.room}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>OPD Timings:</span>
                        <strong style={{ color: "#0284c7" }}>{doc.opdTimings}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>IPD Admitted Rounds:</span>
                        <strong style={{ color: "#334155" }}>{doc.ipdRoundsTimings}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#64748b" }}>Available Days:</span>
                        <span style={{ color: "#475569" }}>
                          {doc.availableDays.length === 6 ? "Mon – Sat" : doc.availableDays.join(", ")}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2e8f0", paddingTop: "4px" }}>
                        <span style={{ color: "#64748b" }}>Consultation Fee:</span>
                        <strong style={{ color: "#16a34a" }}>₹{doc.consultationFee}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoctorId(doc.doctorId);
                      setIsBookModalOpen(true);
                    }}
                    style={{
                      backgroundColor: "#f3e8ff",
                      color: "#7e22ce",
                      border: "1px solid #e9d5ff",
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
                    <Plus size={14} />
                    <span>Book Appointment with {doc.doctorName.split(" ")[1]}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Billing & Cash Collection Desk - Light Mode */}
      {activeTab === "billing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Revenue Header Summary */}
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
              gap: "14px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#0f172a" }}>
                Billing &amp; Payment Collection Desk
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
                Reception payment collection, OPD registration slips, and inpatient deposit records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPayModalOpen(true)}
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
                border: "none",
                padding: "9px 18px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Plus size={16} />
              <span>Collect New Payment</span>
            </button>
          </div>

          {/* Bills List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {bills.map((bill) => (
              <div
                key={bill.id}
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
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <strong style={{ color: "#0f172a", fontSize: "1rem" }}>{bill.patientName}</strong>
                    <span style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "2px 8px", borderRadius: "4px", fontSize: "0.75rem", border: "1px solid #cbd5e1" }}>
                      {bill.invoiceNo || bill.id}
                    </span>
                    <span
                      style={{
                        backgroundColor: bill.paymentStatus === "Paid" ? "#f0fdf4" : "#fef2f2",
                        color: bill.paymentStatus === "Paid" ? "#15803d" : "#b91c1c",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: `1px solid ${bill.paymentStatus === "Paid" ? "#bbf7d0" : "#fecaca"}`,
                      }}
                    >
                      {bill.paymentStatus}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "4px" }}>
                    Type: <strong style={{ color: "#334155" }}>{bill.billType}</strong> • Mode: {bill.paymentMode || "Cash"} • Date: {bill.generatedDate}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#16a34a" }}>
                      ₹{bill.paidAmount?.toLocaleString()}
                    </div>
                    {bill.dueAmount > 0 && (
                      <div style={{ fontSize: "0.75rem", color: "#dc2626", fontWeight: 600 }}>
                        Due: ₹{bill.dueAmount?.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPrintableReceipt(bill)}
                    style={{
                      backgroundColor: "#f8fafc",
                      color: "#0f172a",
                      border: "1px solid #cbd5e1",
                      padding: "7px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Printer size={14} />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book OPD Appointment Modal - Light Mode */}
      {isBookModalOpen && (
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
          onClick={() => setIsBookModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "16px",
              padding: "26px",
              maxWidth: "550px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>
                  Book OPD Appointment &amp; Generate Token
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#7c3aed", fontWeight: 600 }}>
                  Next Token for Selected Doctor: #{String(nextTokenNumber).padStart(2, "0")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBookAppointment} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
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
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 45"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={patientMobile}
                    onChange={(e) => setPatientMobile(e.target.value)}
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
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Select Doctor *
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
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
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.department} - {d.room})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
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
                    Preferred Time Slot
                  </label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    placeholder="e.g. 11:00 AM"
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
                  Chief Complaint / Reason for Visit
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chest heaviness, routine check-up, joint pain"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
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

              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.82rem", color: "#475569" }}>Consultation Fee:</span>
                  <strong style={{ color: "#16a34a", marginLeft: "6px" }}>₹{doctorForApt?.id === "DOC-101" ? "800" : "500"}</strong>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#0f172a", cursor: "pointer", fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={feePaid}
                    onChange={(e) => setFeePaid(e.target.checked)}
                  />
                  <span>Fee Collected at Desk</span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
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
                    backgroundColor: "#7c3aed",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 22px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Confirm &amp; Print Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collect Payment Modal - Light Mode */}
      {isPayModalOpen && (
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
          onClick={() => setIsPayModalOpen(false)}
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
                Collect Payment at Reception
              </h3>
              <button
                type="button"
                onClick={() => setIsPayModalOpen(false)}
                style={{ background: "transparent", border: "none", color: "#64748b", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCollectPayment} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anil Saxena"
                  value={payPatientName}
                  onChange={(e) => setPayPatientName(e.target.value)}
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Payment Category
                  </label>
                  <select
                    value={payCategory}
                    onChange={(e) => setPayCategory(e.target.value)}
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
                    <option value="OPD Consultation Fee">OPD Consultation Fee</option>
                    <option value="IPD Bed Advance Deposit">IPD Bed Advance Deposit</option>
                    <option value="Pathology / Blood Test">Pathology / Blood Test</option>
                    <option value="X-Ray & Radiology">X-Ray &amp; Radiology</option>
                    <option value="Emergency Treatment Fee">Emergency Treatment Fee</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                    Amount Collected (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
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
                  Payment Mode
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["Cash", "UPI / QR", "Debit / Credit Card", "Net Banking"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPayMode(mode)}
                      style={{
                        flex: 1,
                        backgroundColor: payMode === mode ? "#16a34a" : "#f1f5f9",
                        color: payMode === mode ? "#ffffff" : "#475569",
                        border: `1px solid ${payMode === mode ? "#16a34a" : "#cbd5e1"}`,
                        padding: "6px 8px",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.78rem", color: "#475569", display: "block", marginBottom: "4px", fontWeight: 600 }}>
                  Remarks / Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UPI Ref: 48921820921"
                  value={payRemarks}
                  onChange={(e) => setPayRemarks(e.target.value)}
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
                  onClick={() => setIsPayModalOpen(false)}
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
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 22px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Collect &amp; Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable OPD Token Modal */}
      {printableToken && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 110,
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setPrintableToken(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
              border: "1px solid #cbd5e1",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", borderBottom: "2px dashed #cbd5e1", paddingBottom: "14px", marginBottom: "14px" }}>
              <h3 style={{ margin: "0 0 2px", fontSize: "1.1rem", fontWeight: 800 }}>
                {hospitalInfo.name}
              </h3>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748b" }}>
                {hospitalInfo.address}
              </p>
              <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#0284c7" }}>
                OPD PATIENT CONSULTATION TOKEN
              </span>
            </div>

            <div style={{ textAlign: "center", margin: "14px 0" }}>
              <div style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Queue Token Number</div>
              <div style={{ fontSize: "3.2rem", fontWeight: 900, color: "#7c3aed", lineHeight: 1 }}>
                #{String(printableToken.tokenNumber).padStart(2, "0")}
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#16a34a" }}>
                Status: {printableToken.status}
              </span>
            </div>

            <div style={{ backgroundColor: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "6px", border: "1px solid #e2e8f0" }}>
              <div><strong>Patient:</strong> {printableToken.patientName} ({printableToken.age}y / {printableToken.gender})</div>
              <div><strong>Mobile:</strong> {printableToken.mobile}</div>
              <div><strong>Doctor:</strong> {printableToken.doctorName}</div>
              <div><strong>Department:</strong> {printableToken.department}</div>
              <div><strong>Date:</strong> {printableToken.appointmentDate} ({printableToken.dayOfWeek})</div>
              <div><strong>Consultation Fee:</strong> ₹{printableToken.consultationFee} ({printableToken.paymentStatus})</div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <button
                type="button"
                onClick={() => setPrintableToken(null)}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#f1f5f9", cursor: "pointer", fontWeight: 600 }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", backgroundColor: "#7c3aed", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
              >
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Payment Receipt Modal */}
      {printableReceipt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 110,
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setPrintableReceipt(null)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
              border: "1px solid #cbd5e1",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", borderBottom: "2px solid #000000", paddingBottom: "10px", marginBottom: "14px" }}>
              <h3 style={{ margin: "0 0 2px", fontSize: "1.1rem", fontWeight: 800 }}>{hospitalInfo.name}</h3>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748b" }}>{hospitalInfo.address}</p>
              <strong style={{ fontSize: "0.85rem", color: "#16a34a" }}>OFFICIAL MONEY RECEIPT</strong>
            </div>

            <div style={{ fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Receipt No: <strong>{printableReceipt.invoiceNo || printableReceipt.id}</strong></span>
                <span>Date: <strong>{printableReceipt.generatedDate}</strong></span>
              </div>
              <div>Received with thanks from: <strong>{printableReceipt.patientName}</strong></div>
              <div>On Account of: <strong>{printableReceipt.billType}</strong></div>
              <div>Payment Mode: <strong>{printableReceipt.paymentMode || "Cash"}</strong></div>
            </div>

            <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
              <span style={{ fontWeight: 600 }}>Amount Received:</span>
              <strong style={{ fontSize: "1.3rem", color: "#16a34a" }}>₹{printableReceipt.paidAmount?.toLocaleString()}</strong>
            </div>

            <div style={{ fontSize: "0.75rem", color: "#64748b", textAlign: "right", marginTop: "16px" }}>
              Issued by: {printableReceipt.generatedBy || "Reception Cash Desk"}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <button
                type="button"
                onClick={() => setPrintableReceipt(null)}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#f1f5f9", cursor: "pointer", fontWeight: 600 }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "none", backgroundColor: "#16a34a", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
