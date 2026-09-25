"use client";

import { useState } from "react";
import { User, Phone, Briefcase, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

// Replace with your own Google Apps Script Web App URL.
// See SETUP-GOOGLE-SHEETS.md at the project root for the 5-minute setup.
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbxek_EVhcM__i92wU9T3FwWZUfD1KZmuTod6K3TMBHONN2v9pz_NGfDFvrFsSh4-eO1GQ/exec";

const SERVICES = [
  "Meta Ads (Facebook & Instagram)",
  "Google Ads (Search & Display)",
  "Google Maps Business Listing (SEO)",
  "Facebook Account Handling",
  "YouTube Account Handling",
  "Business Automation Agents (WhatsApp Bot)",
  "Custom Website Development",
  "Mobile & Web App Development (Android & iOS)",
  "Courses / Earn with Us",
  "Full Agency Audit / Need Guidance",
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", mobile: "", service: "" });
  const [status, setStatus] = useState(null); // { ok: bool, message: string }
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !/^[0-9]{10}$/.test(form.mobile) || !form.service) {
      setStatus({
        ok: false,
        message: "Please fill in all fields correctly (mobile must be a 10-digit number).",
      });
      return;
    }

    if (GOOGLE_SCRIPT_URL.startsWith("PASTE_YOUR")) {
      setStatus({
        ok: false,
        message: "Form is not connected to Google Sheets yet — see SETUP-GOOGLE-SHEETS.md.",
      });
      return;
    }

    setSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script web apps don't return normal CORS headers
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
      });
      setStatus({ ok: true, message: "Thank you! We have received your inquiry and will contact you within 24 hours." });
      setForm({ name: "", mobile: "", service: "" });
    } catch {
      setStatus({ ok: false, message: "Something went wrong. Please call/WhatsApp +91 96548 80240 instead." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <User size={15} style={{ color: "var(--accent)" }} />
          <span>Full Name</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="e.g. Ramesh Kumar"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="mobile" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Phone size={15} style={{ color: "var(--accent)" }} />
          <span>Mobile Number (WhatsApp)</span>
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="10-digit WhatsApp number"
          value={form.mobile}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="service" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Briefcase size={15} style={{ color: "var(--accent)" }} />
          <span>Service You Are Interested In</span>
        </label>
        <select id="service" name="service" required value={form.service} onChange={handleChange}>
          <option value="" disabled>Select a growth service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-icon"
        disabled={submitting}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Sending Inquiry…</span>
          </>
        ) : (
          <>
            <span>Submit Strategy Inquiry</span>
            <Send size={16} />
          </>
        )}
      </button>

      {status && (
        <div className={`form-status show ${status.ok ? "ok" : "err"}`} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          {status.ok ? <CheckCircle2 size={18} style={{ flexShrink: 0 }} /> : <AlertCircle size={18} style={{ flexShrink: 0 }} />}
          <span>{status.message}</span>
        </div>
      )}

      <p className="form-note text-muted">
        🔒 We respect your privacy. No spam. You will only be contacted regarding your inquiry.
      </p>
    </form>
  );
}
