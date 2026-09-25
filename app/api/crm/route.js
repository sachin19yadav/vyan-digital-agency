import { NextResponse } from "next/server";
import {
  registerPartner,
  getPartnerProfile,
  getAdminCRMData,
  updateReferralStatus,
  updateCRMConfig,
  sendToGoogleSheet,
  readCRMData,
} from "@/lib/crmStorage";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  // User / Partner Query (find by mobile or referral code)
  if (action === "partner") {
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json({ error: "Query (mobile or code) is required" }, { status: 400 });
    }
    const profile = getPartnerProfile(query);
    if (!profile) {
      return NextResponse.json(
        { error: "Partner profile not found. Please register first." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: profile });
  }

  // Admin Query (protected by admin pin)
  if (action === "admin") {
    const pin = searchParams.get("pin");
    const data = readCRMData();
    const expectedPin = data.config.adminPin || "vyan@2026";

    if (!pin || pin !== expectedPin) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin PIN" }, { status: 401 });
    }

    const adminData = getAdminCRMData();
    return NextResponse.json({ success: true, data: adminData });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, data, pin } = body;

    // Action 1: Register New Referral Partner
    if (action === "register") {
      if (!data || !data.name || !data.mobile) {
        return NextResponse.json(
          { error: "Name and Mobile number are required" },
          { status: 400 }
        );
      }
      const result = await registerPartner(data);
      return NextResponse.json(result);
    }

    // Admin-protected actions below
    const crmData = readCRMData();
    const expectedPin = crmData.config.adminPin || "vyan@2026";
    if (!pin || pin !== expectedPin) {
      return NextResponse.json({ error: "Unauthorized: Invalid Admin PIN" }, { status: 401 });
    }

    // Action 2: Update Referral Status / Payout
    if (action === "update_status") {
      if (!data || !data.referralId) {
        return NextResponse.json({ error: "referralId is required" }, { status: 400 });
      }
      const result = await updateReferralStatus(data);
      return NextResponse.json(result);
    }

    // Action 3: Update Config (Google Sheet URL, Admin PIN, Reward Amount)
    if (action === "update_config") {
      const result = updateCRMConfig(data || {});
      return NextResponse.json(result);
    }

    // Action 4: Sync all data to Google Sheets
    if (action === "sync_sheets") {
      const current = readCRMData();
      const syncResult = await sendToGoogleSheet("SYNC_ALL", {
        partners: current.partners,
        referrals: current.referrals,
      });
      return NextResponse.json({
        success: true,
        message: "Sync request dispatched to Google Sheets",
        syncResult,
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("API /api/crm error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
