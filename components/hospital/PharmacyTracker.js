"use client";

import { useState } from "react";
import {
  Pill,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  Stethoscope,
  Filter,
  Check,
  AlertCircle,
  Building2,
} from "lucide-react";

export default function PharmacyTracker({
  prescriptions,
  setPrescriptions,
  patients,
  currentStaff,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | Administered | Scheduled | Dispensed

  // Flatten all prescribed medicines into a searchable list
  let allMedicineRows = [];
  prescriptions.forEach((rx) => {
    const patientObj = patients.find((p) => p.id === rx.patientId);
    if (rx.medicines) {
      rx.medicines.forEach((med) => {
        allMedicineRows.push({
          ...med,
          rxId: rx.id,
          patientId: rx.patientId,
          patientName: rx.patientName,
          patientRoom: patientObj ? `${patientObj.floor} • ${patientObj.roomNo} (${patientObj.bedNo})` : "General Care",
          doctorId: rx.doctorId,
          doctorName: rx.doctorName,
          rxDate: rx.date,
          diagnosis: rx.diagnosis,
        });
      });
    }
  });

  const filteredMedicines = allMedicineRows.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.instructions?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Action: Mark medicine as administered by attending nurse
  function handleMarkAdministered(rxId, medId) {
    const nurseName = currentStaff?.name || "Attending Nurse";
    const timestamp = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = prescriptions.map((rx) => {
      if (rx.id === rxId && rx.medicines) {
        return {
          ...rx,
          medicines: rx.medicines.map((m) => {
            if (m.id === medId) {
              return {
                ...m,
                status: "Administered",
                lastGivenAt: `Today at ${timestamp}`,
                lastGivenBy: nurseName,
              };
            }
            return m;
          }),
        };
      }
      return rx;
    });

    setPrescriptions(updated);
  }

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Header */}
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
            Prescription &amp; Patient Medicine Administration Tracker
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Track every medicine suggested by doctors, doses given by nurses, and pharmacy dispensing records.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "0.85rem",
            color: "#34D399",
            fontWeight: 700,
          }}
        >
          Total Prescribed Doses Active: {allMedicineRows.length}
        </div>
      </div>

      {/* Filter and Search */}
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
            maxWidth: 420,
          }}
        >
          <Search size={16} style={{ color: "#64748b" }} />
          <input
            type="text"
            placeholder="Search medicine, patient name, doctor, or dosage..."
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

        <div style={{ display: "flex", gap: 6 }}>
          {["ALL", "Administered", "Scheduled", "Dispensed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                backgroundColor: statusFilter === st ? "#0D9488" : "#1E293B",
                color: statusFilter === st ? "#ffffff" : "#94A3B8",
                border: "1px solid #cbd5e1",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {st === "ALL" ? "All Medicines" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Table */}
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
              <th style={{ padding: "14px 18px" }}>Medicine Name &amp; Strength</th>
              <th style={{ padding: "14px 18px" }}>Patient &amp; Inpatient Bed</th>
              <th style={{ padding: "14px 18px" }}>Prescribing Doctor</th>
              <th style={{ padding: "14px 18px" }}>Dosage &amp; Frequency</th>
              <th style={{ padding: "14px 18px" }}>Administration Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Nurse Check</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((item, idx) => (
              <tr
                key={`${item.rxId}-${item.id || idx}`}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {/* Medicine details */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Pill size={16} style={{ color: "#38BDF8" }} />
                    <span style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem" }}>
                      {item.name}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
                    Type: {item.type} • Dosage: {item.dosage} • Duration: {item.duration}
                  </div>
                  {item.instructions && (
                    <div style={{ fontSize: "0.76rem", color: "#FCD34D", marginTop: 2 }}>
                      {item.instructions}
                    </div>
                  )}
                </td>

                {/* Patient details */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{item.patientName}</div>
                  <div style={{ fontSize: "0.78rem", color: "#38BDF8", marginTop: 2 }}>
                    {item.patientRoom}
                  </div>
                </td>

                {/* Prescribing doctor */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 600, color: "#ffffff" }}>{item.doctorName}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    Diagnosis: {item.diagnosis}
                  </div>
                </td>

                {/* Dosage & Frequency */}
                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      color: "#0f172a",
                      fontWeight: 600,
                      border: "1px solid #cbd5e1",
                      fontSize: "0.82rem",
                    }}
                  >
                    {item.frequency}
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: "14px 18px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor:
                        item.status === "Administered"
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(234, 179, 8, 0.15)",
                      color: item.status === "Administered" ? "#34D399" : "#FBBF24",
                      padding: "3px 10px",
                      borderRadius: "12px",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      border: `1px solid ${
                        item.status === "Administered"
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(234, 179, 8, 0.3)"
                      }`,
                    }}
                  >
                    {item.status === "Administered" ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                    <span>{item.status}</span>
                  </div>
                  <span style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginTop: 3 }}>
                    {item.lastGivenBy} ({item.lastGivenAt})
                  </span>
                </td>

                {/* Nurse action */}
                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  {item.status !== "Administered" ? (
                    <button
                      onClick={() => handleMarkAdministered(item.rxId, item.id)}
                      style={{
                        backgroundColor: "#10B981",
                        color: "#0f172a",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Check size={14} />
                      <span>Mark Given</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: "0.78rem", color: "#10B981", fontWeight: 600 }}>
                      ✓ Verified Given
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
