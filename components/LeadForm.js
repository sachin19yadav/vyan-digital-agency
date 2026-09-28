"use client";

import { useState } from "react";
import { User, Phone, Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// Replace with your own Google Apps Script Web App URL if customized.
// See SETUP-GOOGLE-SHEETS.md at project root.
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbyarIClk8ovvT9lKqYIZkqUCP6seEIWOv-nFbsGw2905FeABpVOK6Bbfz-tHJQ2OCck/exec";

export default function LeadForm() {
  const [form, setForm] = useState({ name: "", mobile: "", gmail: "" });
  const [status, setStatus] = useState(null); // { ok: bool, message: string }
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedMobile = form.mobile.trim();
    const trimmedGmail = form.gmail.trim();

    // Validation
    if (!trimmedName) {
      setStatus({ ok: false, message: "Please enter your full name." });
      return;
    }

    if (!/^[0-9]{10}$/.test(trimmedMobile)) {
      setStatus({ ok: false, message: "Please enter a valid 10-digit mobile number." });
      return;
    }

    if (!trimmedGmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedGmail)) {
      setStatus({ ok: false, message: "Please enter a valid Gmail / Email address." });
      return;
    }

    if (GOOGLE_SCRIPT_URL.startsWith("PASTE_YOUR")) {
      setStatus({
        ok: false,
        message: "Google Sheet connection URL is missing. Please check SETUP-GOOGLE-SHEETS.md.",
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      // Send data to Google Apps Script attached to the Google Sheet (Excel)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors for public web app endpoints
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: trimmedName,
          mobile: trimmedMobile,
          email: trimmedGmail,
          gmail: trimmedGmail,
          service: `Mobile Earning (10K-15K) - ${trimmedGmail}`,
          source: "Mobile Earning Lead Page (/lead)",
        }),
      });

      // Track Meta Pixel Lead event
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Lead Generation Page",
          content_category: "Lead Capture",
        });
      }

      setStatus({
        ok: true,
        message: "Thank you! Your details have been successfully recorded in our system. Our team will contact you shortly.",
      });
      setForm({ name: "", mobile: "", gmail: "" });
    } catch {
      setStatus({
        ok: false,
        message: "Something went wrong while submitting. Please call or WhatsApp +91 96548 80240 directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "12px 16px",
            borderRadius: "var(--radius)",
            marginBottom: 20,
            fontSize: "0.9rem",
            lineHeight: 1.5,
            backgroundColor: status.ok ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
            border: `1px solid ${status.ok ? "rgba(16, 185, 129, 0.35)" : "rgba(239, 68, 68, 0.35)"}`,
            color: status.ok ? "#34d399" : "#f87171",
          }}
        >
          {status.ok ? (
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          ) : (
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Field 1: Name */}
      <div className="form-field">
        <label htmlFor="lead-name" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <User size={15} style={{ color: "var(--accent)" }} />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          id="lead-name"
          name="name"
          required
          placeholder="e.g. Rahul Sharma"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      {/* Field 2: Mobile */}
      <div className="form-field">
        <label htmlFor="lead-mobile" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Phone size={15} style={{ color: "var(--accent)" }} />
          <span>Mobile Number (WhatsApp)</span>
        </label>
        <input
          type="tel"
          id="lead-mobile"
          name="mobile"
          required
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="10-digit mobile number"
          value={form.mobile}
          onChange={handleChange}
        />
      </div>

      {/* Field 3: Gmail / Email */}
      <div className="form-field">
        <label htmlFor="lead-gmail" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Mail size={15} style={{ color: "var(--accent)" }} />
          <span>Gmail / Email Address</span>
        </label>
        <input
          type="email"
          id="lead-gmail"
          name="gmail"
          required
          placeholder="e.g. rahulsharma@gmail.com"
          value={form.gmail}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 8,
          opacity: submitting ? 0.75 : 1,
          cursor: submitting ? "not-allowed" : "pointer",
        }}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="spin" />
            <span>Submitting Details...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Submit Details &amp; Start Earning</span>
          </>
        )}
      </button>

      <p
        style={{
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          textAlign: "center",
          marginTop: 14,
          marginBottom: 0,
        }}
      >
        🔒 100% Privacy Guaranteed. We never spam or sell your information.
      </p>
    </form>
  );
}
