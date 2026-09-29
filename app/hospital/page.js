"use client";

import { useState, useEffect } from "react";
import HospitalHeader from "@/components/hospital/HospitalHeader";
import HospitalDashboard from "@/components/hospital/HospitalDashboard";
import DoctorPortal from "@/components/hospital/DoctorPortal";
import PatientManager from "@/components/hospital/PatientManager";
import DutyRoster from "@/components/hospital/DutyRoster";
import StaffManager from "@/components/hospital/StaffManager";
import PharmacyTracker from "@/components/hospital/PharmacyTracker";
import BillingManager from "@/components/hospital/BillingManager";
import RoomsManager from "@/components/hospital/RoomsManager";
import OPDAppointmentManager from "@/components/hospital/OPDAppointmentManager";
import GoogleSheetSyncModal from "@/components/hospital/GoogleSheetSyncModal";
import HospitalFooter from "@/components/hospital/HospitalFooter";

import {
  hospitalInfo,
  initialStaff,
  initialFloors,
  initialPatients,
  initialPrescriptions,
  initialDutyRoster,
  initialBills,
  initialAppointments,
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
  });

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | doctor | patients | duty | staff | pharmacy | billing | rooms
  const [currentStaff, setCurrentStaff] = useState(initialStaff[0]); // Current logged in staff / doctor
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState({ synced: false, text: "Google Sheet Sync" });

  // Load saved state from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aarogya_hospital_records");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.patients && parsed.staff) {
          setHospitalData(parsed);
          setSyncStatus({ synced: true, text: "Local Cached" });
        }
      }
      const savedStaffId = localStorage.getItem("aarogya_active_staff_id");
      if (savedStaffId) {
        const found = initialStaff.find((s) => s.id === savedStaffId);
        if (found) setCurrentStaff(found);
      }
    } catch (e) {
      console.warn("Could not read hospital localStorage:", e);
    }
  }, []);

  // Save changes to localStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem("aarogya_hospital_records", JSON.stringify(hospitalData));
      if (currentStaff?.id) {
        localStorage.setItem("aarogya_active_staff_id", currentStaff.id);
      }
    } catch (e) {
      console.warn("Could not write hospital localStorage:", e);
    }
  }, [hospitalData, currentStaff]);

  // Convenience state mutators
  const setPatients = (newPatients) => {
    setHospitalData((prev) => ({
      ...prev,
      patients: typeof newPatients === "function" ? newPatients(prev.patients) : newPatients,
    }));
  };

  const setPrescriptions = (newRx) => {
    setHospitalData((prev) => ({
      ...prev,
      prescriptions: typeof newRx === "function" ? newRx(prev.prescriptions) : newRx,
    }));
  };

  const setStaff = (newStaff) => {
    setHospitalData((prev) => ({
      ...prev,
      staff: typeof newStaff === "function" ? newStaff(prev.staff) : newStaff,
    }));
  };

  const setDutyRoster = (newRoster) => {
    setHospitalData((prev) => ({
      ...prev,
      dutyRoster: typeof newRoster === "function" ? newRoster(prev.dutyRoster) : newRoster,
    }));
  };

  const setBills = (newBills) => {
    setHospitalData((prev) => ({
      ...prev,
      bills: typeof newBills === "function" ? newBills(prev.bills) : newBills,
    }));
  };

  const setAppointments = (newApts) => {
    setHospitalData((prev) => ({
      ...prev,
      appointments: typeof newApts === "function" ? newApts(prev.appointments) : newApts,
    }));
  };

  // Census calculations
  const totalBeds = hospitalData.floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const admittedPatients = hospitalData.patients.filter((p) => p.status === "Admitted");
  const occupiedBeds = admittedPatients.length;

  return (
    <div
      style={{
        backgroundColor: "#070D1F",
        color: "#F8FAFC",
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
        currentStaff={currentStaff}
        setCurrentStaff={setCurrentStaff}
        allStaff={hospitalData.staff}
        totalPatients={hospitalData.patients.length}
        admittedCount={admittedPatients.length}
        totalBeds={totalBeds}
        occupiedBeds={occupiedBeds}
        syncStatus={syncStatus}
        onOpenSync={() => setIsSyncModalOpen(true)}
      />

      {/* Main Workspace based on Active Tab */}
      <main style={{ flex: 1, backgroundColor: "#070D1F" }}>
        {activeTab === "dashboard" && (
          <HospitalDashboard
            hospitalData={hospitalData}
            setActiveTab={setActiveTab}
            onAdmitClick={() => setActiveTab("patients")}
          />
        )}

        {activeTab === "doctor" && (
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
            onAdmitPatientClick={(doctor) => {
              setActiveTab("patients");
            }}
          />
        )}

        {activeTab === "opd" && (
          <OPDAppointmentManager
            appointments={hospitalData.appointments}
            setAppointments={setAppointments}
            allStaff={hospitalData.staff}
            onAdmitToIPD={() => setActiveTab("patients")}
          />
        )}

        {activeTab === "patients" && (
          <PatientManager
            patients={hospitalData.patients}
            setPatients={setPatients}
            allStaff={hospitalData.staff}
            floors={hospitalData.floors}
            onAdmitPatient={(p) => setPatients([p, ...hospitalData.patients])}
            onGenerateBillForPatient={(p) => {
              setActiveTab("billing");
            }}
          />
        )}

        {activeTab === "duty" && (
          <DutyRoster
            dutyRoster={hospitalData.dutyRoster}
            setDutyRoster={setDutyRoster}
            allStaff={hospitalData.staff}
            floors={hospitalData.floors}
            patients={hospitalData.patients}
          />
        )}

        {activeTab === "staff" && (
          <StaffManager
            allStaff={hospitalData.staff}
            setAllStaff={setStaff}
          />
        )}

        {activeTab === "pharmacy" && (
          <PharmacyTracker
            prescriptions={hospitalData.prescriptions}
            setPrescriptions={setPrescriptions}
            patients={hospitalData.patients}
            currentStaff={currentStaff}
          />
        )}

        {activeTab === "billing" && (
          <BillingManager
            bills={hospitalData.bills}
            setBills={setBills}
            patients={hospitalData.patients}
            allStaff={hospitalData.staff}
          />
        )}

        {activeTab === "rooms" && (
          <RoomsManager
            floors={hospitalData.floors}
            patients={hospitalData.patients}
            onAdmitToBedClick={(bed) => setActiveTab("patients")}
          />
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
