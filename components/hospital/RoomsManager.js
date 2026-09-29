"use client";

import { useState } from "react";
import {
  Building2,
  Bed,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Users,
  Activity,
  Plus,
} from "lucide-react";

export default function RoomsManager({
  floors,
  patients,
  onAdmitToBedClick,
}) {
  const [selectedFloorId, setSelectedFloorId] = useState("ALL");

  const totalBeds = floors.reduce((acc, f) => acc + f.totalBeds, 0);
  const occupiedBeds = patients.filter((p) => p.status === "Admitted").length;
  const availableBeds = Math.max(0, totalBeds - occupiedBeds);

  const displayFloors =
    selectedFloorId === "ALL"
      ? floors
      : floors.filter((f) => f.id === selectedFloorId);

  return (
    <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>
      {/* Top Banner */}
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
            Hospital Floor-Wise Rooms &amp; Inpatient Bed Census
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#64748b" }}>
            Real-time visual map of occupied and available beds across ICU, Deluxe Rooms, and General Wards.
          </p>
        </div>

        {/* Quick Census Count */}
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              padding: "6px 14px",
              borderRadius: "8px",
              color: "#34D399",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            {availableBeds} Beds Free
          </div>
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "6px 14px",
              borderRadius: "8px",
              color: "#F87171",
              fontSize: "0.85rem",
              fontWeight: 700,
            }}
          >
            {occupiedBeds} Beds Occupied
          </div>
        </div>
      </div>

      {/* Floor Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedFloorId("ALL")}
          style={{
            backgroundColor: selectedFloorId === "ALL" ? "#0284C7" : "#111C44",
            color: selectedFloorId === "ALL" ? "#ffffff" : "#94A3B8",
            border: "1px solid #e2e8f0",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          All Floors ({totalBeds} Beds)
        </button>
        {floors.map((fl) => (
          <button
            key={fl.id}
            onClick={() => setSelectedFloorId(fl.id)}
            style={{
              backgroundColor: selectedFloorId === fl.id ? "#0284C7" : "#111C44",
              color: selectedFloorId === fl.id ? "#ffffff" : "#94A3B8",
              border: "1px solid #e2e8f0",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {fl.name}
          </button>
        ))}
      </div>

      {/* Floor Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {displayFloors.map((floor) => {
          // Find patients on this floor
          const floorPatients = patients.filter(
            (p) =>
              p.status === "Admitted" &&
              p.floor?.toLowerCase().includes(floor.name.toLowerCase().split(" ")[0].toLowerCase())
          );

          return (
            <div
              key={floor.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "24px",
              }}
            >
              {/* Floor Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: 14,
                  marginBottom: 18,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Building2 size={20} style={{ color: "#38BDF8" }} />
                    <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                      {floor.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: "0.82rem", color: "#64748b", marginTop: 2, display: "block" }}>
                    {floor.description}
                  </span>
                </div>

                <span
                  style={{
                    backgroundColor: "rgba(56, 189, 248, 0.1)",
                    color: "#38BDF8",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                  }}
                >
                  Capacity: {floor.totalBeds} Beds
                </span>
              </div>

              {/* Rooms & Beds Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {floor.rooms.map((room, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                        {room.roomNo}
                      </strong>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          backgroundColor: "#ffffff",
                          color: "#64748b",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {room.type}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      Dr. Incharge: <strong style={{ color: "#ffffff" }}>{room.inchargeDoctor}</strong>
                      <br />
                      Attending Nurse: <strong style={{ color: "#34D399" }}>{room.attendingNurse}</strong>
                    </div>

                    {/* Beds in this room */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                      {room.beds.map((bedStr, bIdx) => {
                        const isOccupied = bedStr.includes("Occupied");
                        const bedName = bedStr.split(" (")[0];

                        // Match if a patient is in this bed
                        const patInBed = floorPatients.find(
                          (p) =>
                            p.bedNo?.toLowerCase().replace(/\s/g, "") ===
                            bedName.toLowerCase().replace(/\s/g, "")
                        );

                        return (
                          <div
                            key={bIdx}
                            style={{
                              backgroundColor: isOccupied
                                ? "rgba(239, 68, 68, 0.08)"
                                : "rgba(16, 185, 129, 0.08)",
                              border: `1px solid ${
                                isOccupied ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"
                              }`,
                              borderRadius: "6px",
                              padding: "8px 12px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontSize: "0.82rem",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <Bed
                                size={14}
                                style={{ color: isOccupied ? "#F87171" : "#34D399" }}
                              />
                              <div>
                                <span style={{ fontWeight: 700, color: "#ffffff" }}>{bedName}</span>
                                {patInBed && (
                                  <div style={{ fontSize: "0.74rem", color: "#FCD34D" }}>
                                    Patient: {patInBed.name} ({patInBed.age}y)
                                  </div>
                                )}
                              </div>
                            </div>

                            <span
                              style={{
                                color: isOccupied ? "#F87171" : "#34D399",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                              }}
                            >
                              {isOccupied ? "Occupied" : "Available"}
                            </span>
                          </div>
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
  );
}
