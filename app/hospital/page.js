"use client";

import { useState, useEffect } from "react";
import HospitalHeader from "@/components/hospital/HospitalHeader";
import HospitalFooter from "@/components/hospital/HospitalFooter";
import HospitalLandingPage from "@/components/hospital/HospitalLandingPage";
import HospitalDashboard from "@/components/hospital/HospitalDashboard";
import DoctorPortal from "@/components/hospital/DoctorPortal";
import NursePortal from "@/components/hospital/NursePortal";
import ReceptionistPortal from "@/components/hospital/ReceptionistPortal";
import HRManager from "@/components/hospital/HRManager";
import PatientManager from "@/components/hospital/PatientManager";
import DutyRoster from "@/components/hospital/DutyRoster";
import StaffManager from "@/components/hospital/StaffManager";
import PharmacyTracker from "@/components/hospital/PharmacyTracker";
import BillingManager from "@/components/hospital/BillingManager";
import RoomsManager from "@/components/hospital/RoomsManager";
import OPDAppointmentManager from "@/components/hospital/OPDAppointmentManager";
import GoogleSheetSyncModal from "@/components/hospital/GoogleSheetSyncModal";

import {
  hospitalInfo,
  initialStaff,
  initialFloors,
  initialPatients,
  initialPrescriptions,
  initialDutyRoster,
  initialBills,
  initialAppointments,
  initialDoctorSchedules,
  initialAttendance,
} from "@/data/hospitalSeedData";

export default function HospitalAppPage() {
  // Master Hospital State
  const [hospitalData, setHospitalData] = useState({
    hospitalInfo,
    staff: initialStaff,
    floors: initialFloors,
    patients: initialPatients,
    prescriptions: initialPrescriptions,
    dutyRoster: initialDutyRoster,
    bills: initialBills,
    appointments: initialAppointments,
    doctorSchedules: initialDoctorSchedules,
    attendance: initialAttendance,
  });

  // Role-Based Access Control State
  // Roles: "Guest" (Landing Page) | "Admin" | "Doctor" | "Nurse" | "Receptionist" | "HR"
  const [currentRole, setCurrentRole] = useState("Guest");
  const [activeTab, setActiveTab] = useState("landing");
  const [currentStaff, setCurrentStaff] = useState(initialStaff[0]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ synced: false, text: "Google Sheet Sync" });

  // Load saved state from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aarogya_hospital_records_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.patients && parsed.staff) {
          setHospitalData(parsed);
          setSyncStatus({ synced: true, text: "Local Cached" });
        }
      }
      const savedRole = localStorage.getItem("aarogya_active_role");
      if (savedRole) {
        setCurrentRole(savedRole);
        if (savedRole === "Doctor") setActiveTab("doctor");
        else if (savedRole === "Nurse") setActiveTab("nurse");
        else if (savedRole === "Receptionist") setActiveTab("reception");
        else if (savedRole === "HR") setActiveTab("hr");
        else if (savedRole === "Admin") setActiveTab("dashboard");
        else setActiveTab("landing");
      }
      const savedStaffId = localStorage.getItem("aarogya_active_staff_id");
      if (savedStaffId) {
        const found = initialStaff.find((s) => s.id === savedStaffId);
        if (found) setCurrentStaff(found);
      }
    } catch (e) {
      console.error("Failed to load local storage hospital records", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aarogya_hospital_records_v2", JSON.stringify(hospitalData));
      if (currentStaff?.id) {
        localStorage.setItem("aarogya_active_staff_id", currentStaff.id);
      }
      if (currentRole) {
        localStorage.setItem("aarogya_active_role", currentRole);
      }
    } catch (e) {
      console.error("Failed to persist hospital data to localStorage", e);
    }
  }, [hospitalData, currentStaff, currentRole]);

  // Updaters for hospital sub-states
  const setPatients = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      patients: typeof updater === "function" ? updater(prev.patients) : updater,
    }));
  };

  const setPrescriptions = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      prescriptions: typeof updater === "function" ? updater(prev.prescriptions) : updater,
    }));
  };

  const setStaff = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      staff: typeof updater === "function" ? updater(prev.staff) : updater,
    }));
  };

  const setDutyRoster = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      dutyRoster: typeof updater === "function" ? updater(prev.dutyRoster) : updater,
    }));
  };

  const setBills = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      bills: typeof updater === "function" ? updater(prev.bills) : updater,
    }));
  };

  const setAppointments = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      appointments: typeof updater === "function" ? updater(prev.appointments) : updater,
    }));
  };

  const setAttendanceRecords = (updater) => {
    setHospitalData((prev) => ({
      ...prev,
      attendance: typeof updater === "function" ? updater(prev.attendance) : updater,
    }));
  };

  // Switch Role Handler
  const handleSelectRole = (role, staffMember) => {
    setCurrentRole(role);
    if (staffMember) setCurrentStaff(staffMember);

    if (role === "Doctor") setActiveTab("doctor");
    else if (role === "Nurse") setActiveTab("nurse");
    else if (role === "Receptionist") setActiveTab("reception");
    else if (role === "HR") setActiveTab("hr");
    else if (role === "Admin") setActiveTab("dashboard");
    else setActiveTab("landing");
  };

  // Census calculations
  const totalBeds = hospitalData.floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const admittedPatients = hospitalData.patients.filter((p) => p.status === "Admitted");
  const occupiedBeds = admittedPatients.length;

  return (
    <div
      id="hospital-root"
      className="hospital-root"
      style={{
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Hospital App Navigation Header */}
      <HospitalHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentStaff={currentStaff}
        setCurrentStaff={setCurrentStaff}
        allStaff={hospitalData.staff}
        totalPatients={hospitalData.patients.length}
        admittedCount={admittedPatients.length}
        totalBeds={totalBeds}
        occupiedBeds={occupiedBeds}
        syncStatus={syncStatus}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenLoginModal={() => {
          setActiveTab("landing");
        }}
      />

      {/* Main Workspace based on Role & Active Tab */}
      <main style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        {/* PUBLIC HOSPITAL LANDING PAGE */}
        {(activeTab === "landing" || currentRole === "Guest") && (
          <HospitalLandingPage
            onSelectRole={handleSelectRole}
            allStaff={hospitalData.staff}
            doctorSchedules={hospitalData.doctorSchedules}
            floors={hospitalData.floors}
            patients={hospitalData.patients}
            onBookAppointmentClick={() => {
              const rec = hospitalData.staff.find((s) => s.role === "Receptionist") || hospitalData.staff[0];
              handleSelectRole("Receptionist", rec);
            }}
          />
        )}

        {/* DOCTOR CHAMBER PORTAL */}
        {activeTab === "doctor" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <DoctorPortal
              currentStaff={currentStaff}
              allStaff={hospitalData.staff}
              patients={hospitalData.patients}
              setPatients={setPatients}
              prescriptions={hospitalData.prescriptions}
              setPrescriptions={setPrescriptions}
              appointments={hospitalData.appointments}
              setAppointments={setAppointments}
              floors={hospitalData.floors}
              onAdmitPatientClick={() => {
                setActiveTab("patients");
              }}
            />
          </div>
        )}

        {/* NURSE CARE STATION */}
        {activeTab === "nurse" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <NursePortal
              currentStaff={currentStaff}
              allStaff={hospitalData.staff}
              patients={hospitalData.patients}
              setPatients={setPatients}
              prescriptions={hospitalData.prescriptions}
              setPrescriptions={setPrescriptions}
              floors={hospitalData.floors}
            />
          </div>
        )}

        {/* RECEPTIONIST & FRONT DESK */}
        {activeTab === "reception" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <ReceptionistPortal
              currentStaff={currentStaff}
              allStaff={hospitalData.staff}
              appointments={hospitalData.appointments}
              setAppointments={setAppointments}
              doctorSchedules={hospitalData.doctorSchedules}
              floors={hospitalData.floors}
              patients={hospitalData.patients}
              setPatients={setPatients}
              bills={hospitalData.bills}
              setBills={setBills}
            />
          </div>
        )}

        {/* HR & ATTENDANCE MANAGEMENT */}
        {activeTab === "hr" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <HRManager
              currentStaff={currentStaff}
              allStaff={hospitalData.staff}
              attendanceRecords={hospitalData.attendance}
              setAttendanceRecords={setAttendanceRecords}
              dutyRoster={hospitalData.dutyRoster}
              setDutyRoster={setDutyRoster}
              floors={hospitalData.floors}
            />
          </div>
        )}

        {/* MASTER OVERVIEW / DASHBOARD (Admin) */}
        {activeTab === "dashboard" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <HospitalDashboard
              hospitalData={hospitalData}
              setActiveTab={setActiveTab}
              onAdmitClick={() => setActiveTab("patients")}
            />
          </div>
        )}

        {/* OPD APPOINTMENTS (Admin & Direct) */}
        {activeTab === "opd" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <OPDAppointmentManager
              appointments={hospitalData.appointments}
              setAppointments={setAppointments}
              allStaff={hospitalData.staff}
              onAdmitToIPD={() => setActiveTab("patients")}
            />
          </div>
        )}

        {/* PATIENT ADMISSION (IPD) */}
        {activeTab === "patients" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <PatientManager
              patients={hospitalData.patients}
              setPatients={setPatients}
              allStaff={hospitalData.staff}
              floors={hospitalData.floors}
              onAdmitPatient={(p) => setPatients([p, ...hospitalData.patients])}
              onGenerateBillForPatient={() => {
                setActiveTab("billing");
              }}
            />
          </div>
        )}

        {/* DUTY ROSTER */}
        {activeTab === "duty" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <DutyRoster
              dutyRoster={hospitalData.dutyRoster}
              setDutyRoster={setDutyRoster}
              allStaff={hospitalData.staff}
              floors={hospitalData.floors}
              patients={hospitalData.patients}
            />
          </div>
        )}

        {/* STAFF DIRECTORY */}
        {activeTab === "staff" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <StaffManager
              allStaff={hospitalData.staff}
              setAllStaff={setStaff}
            />
          </div>
        )}

        {/* PHARMACY TRACKER */}
        {activeTab === "pharmacy" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <PharmacyTracker
              prescriptions={hospitalData.prescriptions}
              setPrescriptions={setPrescriptions}
              patients={hospitalData.patients}
              currentStaff={currentStaff}
            />
          </div>
        )}

        {/* BILLING & INVOICE MANAGEMENT */}
        {activeTab === "billing" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <BillingManager
              bills={hospitalData.bills}
              setBills={setBills}
              patients={hospitalData.patients}
              allStaff={hospitalData.staff}
            />
          </div>
        )}

        {/* ROOMS & BEDS CENSUS */}
        {activeTab === "rooms" && currentRole !== "Guest" && (
          <div style={{ padding: "24px 20px", maxWidth: "1600px", margin: "0 auto" }}>
            <RoomsManager
              floors={hospitalData.floors}
              patients={hospitalData.patients}
              onAdmitToBedClick={() => setActiveTab("patients")}
            />
          </div>
        )}
      </main>

      {/* Hospital Footer */}
      <HospitalFooter setActiveTab={setActiveTab} />

      {/* Google Sheet Sync Modal */}
      <GoogleSheetSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        hospitalData={hospitalData}
        setHospitalData={setHospitalData}
        setSyncStatus={setSyncStatus}
      />

      {/* Embedded Print & Pulse CSS */}
      <style jsx global>{`
        /* Light Mode Enforced for Hospital */
        body {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }

        .hospital-root, #hospital-root {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }

        .hospital-root input:not([type="checkbox"]):not([type="radio"]),
        .hospital-root select,
        .hospital-root textarea {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border: 1px solid #cbd5e1 !important;
        }

        .hospital-root option,
        .hospital-root optgroup {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }

        @keyframes pulse-ring {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .pulse-dot {
          animation: pulse-ring 2s infinite ease-in-out;
        }

        @media print {
          header,
          nav,
          .no-print,
          button:not(.print-btn) {
            display: none !important;
          }
          body,
          main {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}</style>
    </div>
  );
}
