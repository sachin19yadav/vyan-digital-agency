"use client";

import { useState } from "react";
import {
  Cloud,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Upload,
  X,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  initialStaff,
  initialFloors,
  initialPatients,
  initialPrescriptions,
  initialDutyRoster,
  initialBills,
  initialAppointments,
} from "@/data/hospitalSeedData";

export default function GoogleSheetSyncModal({
  isOpen,
  onClose,
  hospitalData,
  setHospitalData,
  setSyncStatus,
}) {
  const [scriptUrl, setScriptUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("aarogya_hospital_sheet_url") ||
        "https://script.google.com/macros/s/AKfycbyarIClk8ovvT9lKqYIZkqUCP6seEIWOv-nFbsGw2905FeABpVOK6Bbfz-tHJQ2OCck/exec"
      );
    }
    return "";
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null); // { ok: bool, text: string }

  if (!isOpen) return null;

  function handleSaveUrl() {
    if (typeof window !== "undefined") {
      localStorage.setItem("aarogya_hospital_sheet_url", scriptUrl.trim());
      setStatusMsg({ ok: true, text: "Google Apps Script URL saved locally!" });
    }
  }

  // Push all hospital data to Google Sheets
  async function handlePushToSheet() {
    if (!scriptUrl.trim()) {
      setStatusMsg({ ok: false, text: "Please enter your Google Apps Script Web App URL first." });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      // Send directly or via /api/hospital
      const response = await fetch("/api/hospital", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "HOSPITAL_SYNC_ALL",
          scriptUrl: scriptUrl.trim(),
          data: hospitalData,
        }),
      });

      const resJson = await response.json();

      if (resJson.success) {
        setStatusMsg({
          ok: true,
          text: `🎉 Synced Successfully! All records (Patients: ${hospitalData.patients.length}, OPD Appointments: ${hospitalData.appointments?.length || 0}, Staff: ${hospitalData.staff.length}, Bills: ${hospitalData.bills.length}) updated in Google Sheet.`,
        });
        setSyncStatus({ synced: true, text: "Sheet Synced" });
      } else {
        setStatusMsg({ ok: false, text: resJson.error || "Sync failed. Check Web App permissions." });
      }
    } catch (err) {
      setStatusMsg({ ok: false, text: "Network error during sync: " + err.message });
    } finally {
      setLoading(false);
    }
  }

  // Fetch hospital data from Google Sheets
  async function handleFetchFromSheet() {
    if (!scriptUrl.trim()) {
      setStatusMsg({ ok: false, text: "Please enter your Google Apps Script Web App URL." });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const targetUrl = scriptUrl.includes("?")
        ? `${scriptUrl}&action=HOSPITAL_GET_DATA`
        : `${scriptUrl}?action=HOSPITAL_GET_DATA`;

      const res = await fetch(targetUrl);
      const json = await res.json();

      if (json.status === "success" && json.data) {
        if (json.data.patients && json.data.patients.length > 0) {
          setHospitalData((prev) => ({
            ...prev,
            patients: json.data.patients,
            staff: json.data.staff || prev.staff,
            prescriptions: json.data.prescriptions || prev.prescriptions,
            bills: json.data.bills || prev.bills,
            appointments: json.data.appointments || prev.appointments,
          }));
          setStatusMsg({
            ok: true,
            text: `✅ Loaded ${json.data.patients.length} patients and ${json.data.appointments?.length || 0} OPD appointments from your Google Sheet!`,
          });
          setSyncStatus({ synced: true, text: "Sheet Synced" });
        } else {
          setStatusMsg({
            ok: true,
            text: "Connected to Google Sheet, but no rows found. Use 'Push All Records' to populate it first.",
          });
        }
      } else {
        setStatusMsg({ ok: false, text: "Could not retrieve data from Sheet. Check Web App URL." });
      }
    } catch (err) {
      setStatusMsg({ ok: false, text: "Error fetching data: " + err.message });
    } finally {
      setLoading(false);
    }
  }

  // Reset to initial demo data
  function handleResetDemo() {
    if (!window.confirm("Reset all hospital records back to original demo data?")) return;
    setHospitalData({
      staff: initialStaff,
      floors: initialFloors,
      patients: initialPatients,
      prescriptions: initialPrescriptions,
      dutyRoster: initialDutyRoster,
      bills: initialBills,
      appointments: initialAppointments,
    });
    setStatusMsg({ ok: true, text: "Reset to fresh demo dataset." });
  }

  // Export JSON backup
  function handleExportBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(hospitalData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aarogya_hospital_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 120,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#111C44",
          border: "1px solid #1E293B",
          borderRadius: "14px",
          padding: "30px",
          maxWidth: 640,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #1E293B",
            paddingBottom: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileSpreadsheet size={24} style={{ color: "#34D399" }} />
            <div>
              <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                Google Sheet Database Sync
              </h3>
              <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                Bidirectional synchronization between web app and Google Sheets
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Alert */}
        {statusMsg && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "8px",
              marginBottom: 18,
              fontSize: "0.85rem",
              backgroundColor: statusMsg.ok ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
              border: `1px solid ${statusMsg.ok ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              color: statusMsg.ok ? "#34D399" : "#F87171",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {statusMsg.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Web App URL input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: "0.84rem", color: "#CBD5E1", fontWeight: 600, marginBottom: 6 }}>
            Google Apps Script Web App URL:
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={scriptUrl}
              onChange={(e) => setScriptUrl(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                padding: "10px 14px",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
            <button
              onClick={handleSaveUrl}
              style={{
                backgroundColor: "#1E293B",
                color: "#38BDF8",
                border: "1px solid #334155",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Save URL
            </button>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: 4, display: "block" }}>
            See <strong>SETUP-HOSPITAL-SHEET.md</strong> in project root for the 3-minute Google Apps Script setup.
          </span>
        </div>

        {/* Sync Action Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <button
            onClick={handlePushToSheet}
            disabled={loading}
            style={{
              backgroundColor: "#0D9488",
              color: "#ffffff",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Upload size={16} />
            <span>{loading ? "Syncing..." : "Push to Google Sheet"}</span>
          </button>

          <button
            onClick={handleFetchFromSheet}
            disabled={loading}
            style={{
              backgroundColor: "#0284C7",
              color: "#ffffff",
              border: "none",
              padding: "12px 18px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            <RefreshCw size={16} className={loading ? "spin" : ""} />
            <span>Load from Google Sheet</span>
          </button>
        </div>

        {/* Backup & Reset utilities */}
        <div
          style={{
            backgroundColor: "#0F172A",
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #1E293B",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <button
            onClick={handleExportBackup}
            style={{
              background: "none",
              border: "1px solid #334155",
              color: "#CBD5E1",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Download size={14} />
            <span>Download JSON Backup</span>
          </button>

          <button
            onClick={handleResetDemo}
            style={{
              background: "none",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#F87171",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Reset Demo Dataset
          </button>
        </div>
      </div>
    </div>
  );
}
