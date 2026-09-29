import { NextResponse } from "next/server";
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

// In-memory runtime cache for server-side persistence fallback
let globalHospitalData = {
  hospitalInfo,
  staff: initialStaff,
  floors: initialFloors,
  patients: initialPatients,
  prescriptions: initialPrescriptions,
  dutyRoster: initialDutyRoster,
  bills: initialBills,
  appointments: initialAppointments,
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: globalHospitalData,
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { action, data, scriptUrl } = payload;

    // Update in-memory server cache
    if (data) {
      globalHospitalData = {
        ...globalHospitalData,
        ...data,
        lastUpdated: new Date().toISOString(),
      };
    }

    // Optional proxy to Google Apps Script Web App
    if (scriptUrl && scriptUrl.startsWith("https://script.google.com/")) {
      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: action || "HOSPITAL_SYNC_ALL",
            hospitalData: globalHospitalData,
          }),
        });
        const resText = await response.text();
        return NextResponse.json({
          success: true,
          message: "Data synced with Google Sheet and server successfully!",
          sheetResponse: resText,
          data: globalHospitalData,
        });
      } catch (err) {
        return NextResponse.json({
          success: true,
          warning: "Saved locally. Google Sheet forward failed: " + err.message,
          data: globalHospitalData,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Hospital records saved successfully!",
      data: globalHospitalData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
