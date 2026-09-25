import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "crm.json");

// Default initial CRM state if file is empty
const defaultData = {
  partners: [],
  referrals: [],
  config: {
    googleSheetUrl:
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      "https://script.google.com/macros/s/AKfycbxek_EVhcM__i92wU9T3FwWZUfD1KZmuTod6K3TMBHONN2v9pz_NGfDFvrFsSh4-eO1GQ/exec",
    rewardPerEnrollment: 1000,
    adminPin: "vyan@2026",
  },
};

export function readCRMData() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      writeCRMData(defaultData);
      return defaultData;
    }
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading crm.json:", err);
    return defaultData;
  }
}

export function writeCRMData(data) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing crm.json:", err);
    return false;
  }
}

function generateReferralCode() {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "VYAN-";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Dispatches lead/partner data to Google Sheets Web App in background
export async function sendToGoogleSheet(action, payload, sheetUrlOverride) {
  const data = readCRMData();
  const url = sheetUrlOverride || data.config.googleSheetUrl;
  if (!url) return { ok: false, error: "No Google Sheet URL set" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: action, // "REGISTER_PARTNER" | "NEW_REFERRAL" | "UPDATE_PAYOUT" | "SYNC_ALL"
        data: payload,
        timestamp: new Date().toISOString(),
      }),
      // short timeout in case Google takes time
      signal: AbortSignal.timeout(6000),
    });
    return { ok: true, status: res.status };
  } catch (err) {
    // Non-blocking error
    console.warn("Google Sheet sync notice:", err.message);
    return { ok: false, error: err.message };
  }
}

// Register a new partner
export async function registerPartner({ name, mobile, email, city, upiId, referredBy }) {
  const data = readCRMData();
  const cleanMobile = mobile.replace(/[^0-9]/g, "").slice(-10);
  const cleanName = name.trim();

  // Check if already registered
  const existing = data.partners.find((p) => p.mobile === cleanMobile);
  if (existing) {
    return {
      success: true,
      partner: existing,
      isNew: false,
      message: "You are already registered! Welcome back to your partner portal.",
    };
  }

  // Generate unique code
  let newCode = generateReferralCode();
  while (data.partners.some((p) => p.referralCode === newCode)) {
    newCode = generateReferralCode();
  }

  // Validate referredBy if provided
  let parentReferrer = null;
  const cleanReferrerCode = (referredBy || "").trim().toUpperCase();
  if (cleanReferrerCode) {
    parentReferrer = data.partners.find(
      (p) => p.referralCode.toUpperCase() === cleanReferrerCode
    );
  }

  const newPartner = {
    id: `partner-${Date.now()}`,
    name: cleanName,
    mobile: cleanMobile,
    email: email ? email.trim() : "",
    city: city ? city.trim() : "Kanpur",
    upiId: upiId ? upiId.trim() : "",
    referralCode: newCode,
    referredBy: parentReferrer ? parentReferrer.referralCode : "DIRECT",
    joinedAt: new Date().toISOString(),
    totalReferrals: 0,
    totalEarned: 0,
    pendingPayout: 0,
    paidOut: 0,
    status: "active",
  };

  data.partners.unshift(newPartner);

  // If referred by another partner, create referral record
  let newReferralRecord = null;
  if (parentReferrer) {
    newReferralRecord = {
      id: `ref-${Date.now()}`,
      referrerCode: parentReferrer.referralCode,
      referrerName: parentReferrer.name,
      refereeName: cleanName,
      refereeMobile: cleanMobile,
      joinedAt: new Date().toISOString(),
      status: "Joined - Pending Course",
      reward: data.config.rewardPerEnrollment || 1000,
      payoutStatus: "Pending Approval",
      transactionRef: "",
    };

    data.referrals.unshift(newReferralRecord);

    // Update parent's stats
    parentReferrer.totalReferrals = (parentReferrer.totalReferrals || 0) + 1;
    parentReferrer.pendingPayout =
      (parentReferrer.pendingPayout || 0) + (data.config.rewardPerEnrollment || 1000);
    parentReferrer.totalEarned =
      (parentReferrer.totalEarned || 0) + (data.config.rewardPerEnrollment || 1000);
  }

  writeCRMData(data);

  // Background dispatch to Google Sheet
  sendToGoogleSheet("REGISTER_PARTNER", {
    partner: newPartner,
    referral: newReferralRecord,
    referrer: parentReferrer ? { name: parentReferrer.name, code: parentReferrer.referralCode } : null,
  });

  return {
    success: true,
    partner: newPartner,
    isNew: true,
    message: "Registration successful! Your referral code is active.",
  };
}

// Get partner profile and self-referred persons (ONLY self-referred info)
export function getPartnerProfile(query) {
  const data = readCRMData();
  if (!query) return null;

  const q = query.trim().toUpperCase();
  const cleanPhone = query.replace(/[^0-9]/g, "").slice(-10);

  const partner = data.partners.find(
    (p) => p.referralCode.toUpperCase() === q || p.mobile === cleanPhone
  );

  if (!partner) return null;

  // Filter ONLY self-referred persons for this user
  const selfReferrals = data.referrals
    .filter((r) => r.referrerCode.toUpperCase() === partner.referralCode.toUpperCase())
    .map((r) => ({
      id: r.id,
      refereeName: r.refereeName,
      // Mask phone for user privacy (e.g. 98765***** or +91 98765***** )
      refereeMobileMasked:
        r.refereeMobile && r.refereeMobile.length >= 10
          ? `${r.refereeMobile.slice(0, 5)}*****`
          : "Protected",
      joinedAt: r.joinedAt,
      status: r.status,
      reward: r.reward,
      payoutStatus: r.payoutStatus,
      transactionRef: r.transactionRef,
    }));

  return {
    partner,
    referrals: selfReferrals,
    stats: {
      totalReferrals: selfReferrals.length,
      totalEarned: partner.totalEarned || 0,
      pendingPayout: partner.pendingPayout || 0,
      paidOut: partner.paidOut || 0,
    },
  };
}

// Admin functions: Get all partners and all referrals
export function getAdminCRMData() {
  const data = readCRMData();

  const totalPartners = data.partners.length;
  const totalReferrals = data.referrals.length;
  const totalEarned = data.partners.reduce((sum, p) => sum + (p.totalEarned || 0), 0);
  const totalPaidOut = data.partners.reduce((sum, p) => sum + (p.paidOut || 0), 0);
  const totalPending = data.partners.reduce((sum, p) => sum + (p.pendingPayout || 0), 0);

  return {
    partners: data.partners,
    referrals: data.referrals,
    config: {
      googleSheetUrl: data.config.googleSheetUrl,
      rewardPerEnrollment: data.config.rewardPerEnrollment,
    },
    metrics: {
      totalPartners,
      totalReferrals,
      totalEarned,
      totalPaidOut,
      totalPending,
    },
  };
}

// Admin update referral status / payout
export async function updateReferralStatus({ referralId, status, payoutStatus, transactionRef }) {
  const data = readCRMData();
  const ref = data.referrals.find((r) => r.id === referralId);
  if (!ref) return { success: false, error: "Referral not found" };

  const prevPayoutStatus = ref.payoutStatus;

  if (status) ref.status = status;
  if (payoutStatus) ref.payoutStatus = payoutStatus;
  if (transactionRef !== undefined) ref.transactionRef = transactionRef;

  // Recalculate parent partner's paidOut vs pendingPayout if payoutStatus changed
  const partner = data.partners.find((p) => p.referralCode === ref.referrerCode);
  if (partner && payoutStatus && payoutStatus !== prevPayoutStatus) {
    if (payoutStatus === "Paid" && prevPayoutStatus !== "Paid") {
      partner.paidOut = (partner.paidOut || 0) + (ref.reward || 1000);
      partner.pendingPayout = Math.max(0, (partner.pendingPayout || 0) - (ref.reward || 1000));
    } else if (payoutStatus !== "Paid" && prevPayoutStatus === "Paid") {
      partner.paidOut = Math.max(0, (partner.paidOut || 0) - (ref.reward || 1000));
      partner.pendingPayout = (partner.pendingPayout || 0) + (ref.reward || 1000);
    }
  }

  writeCRMData(data);

  // Sync update to Google Sheet
  sendToGoogleSheet("UPDATE_REFERRAL_STATUS", {
    referral: ref,
    partner: partner ? { name: partner.name, code: partner.referralCode } : null,
  });

  return { success: true, referral: ref, partner };
}

// Update Admin Config (Google Sheet Web App URL, Admin PIN)
export function updateCRMConfig({ googleSheetUrl, adminPin, rewardPerEnrollment }) {
  const data = readCRMData();
  if (googleSheetUrl !== undefined) data.config.googleSheetUrl = googleSheetUrl.trim();
  if (adminPin !== undefined && adminPin.trim()) data.config.adminPin = adminPin.trim();
  if (rewardPerEnrollment !== undefined)
    data.config.rewardPerEnrollment = Number(rewardPerEnrollment) || 1000;

  writeCRMData(data);
  return { success: true, config: data.config };
}
