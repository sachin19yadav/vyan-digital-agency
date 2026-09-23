"use client";

import { useState } from "react";

// Replace with your own Google Apps Script Web App URL.
// See SETUP-GOOGLE-SHEETS.md at the project root for the 5-minute setup.
const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const SERVICES = [
  "Meta Ads (Facebook & Instagram)",
  "Google Ads",
  "Google Maps Business Listing",
  "Facebook Account Handling",
  "YouTube Account Handling",
  "Automation Agents for Business",
  "Website Development",
  "Courses / Earn with Us",
  "Not sure / need guidance",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus({ ok: true, message: "Thanks! We've received your details and will contact you shortly." });
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
        <label htmlFor="name">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="mobile">Mobile number</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="10-digit mobile number"
          value={form.mobile}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label htmlFor="service">Service you're interested in</label>
        <select id="service" name="service" required value={form.service} onChange={handleChange}>
          <option value="" disabled>Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit enquiry"}
      </button>
      {status && (
        <p className={`form-status show ${status.ok ? "ok" : "err"}`}>{status.message}</p>
      )}
      <p className="form-note text-muted">
        By submitting, you agree we may contact you on the number provided.
      </p>
    </form>
  );
}
