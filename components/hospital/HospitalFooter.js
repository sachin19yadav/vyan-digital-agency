"use client";

import Link from "next/link";
import {
  HeartPulse,
  Phone,
  Clock,
  MapPin,
  Mail,
  ShieldCheck,
  Activity,
  AlertCircle,
  Stethoscope,
  Building,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospitalSeedData";

export default function HospitalFooter({ setActiveTab }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        color: "#475569",
        borderTop: "2px solid #0284c7",
        fontSize: "0.9rem",
        marginTop: "auto",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Emergency Strip - Light Theme */}
      <div
        style={{
          backgroundColor: "#fef2f2",
          borderBottom: "1px solid #fee2e2",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#dc2626",
                flexShrink: 0,
                border: "1px solid #fca5a5",
              }}
            >
              <AlertCircle size={22} className="pulse-dot" color="#dc2626" />
            </div>
            <div>
              <div style={{ color: "#991b1b", fontWeight: 700, fontSize: "0.98rem" }}>
                24x7 Medical Emergency &amp; Critical Trauma Care
              </div>
              <div style={{ color: "#b91c1c", fontSize: "0.82rem" }}>
                Immediate Cardiac Life Support (ACLS), Stroke Ready, ICU &amp; Ambulance Response
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="tel:+919654880240"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#dc2626",
                color: "#ffffff",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.88rem",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.25)",
              }}
            >
              <Phone size={16} />
              <span>Emergency Helpline: +91 96548 80240</span>
            </a>
            <a
              href="tel:108"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.86rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid #cbd5e1",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <Activity size={15} color="#16a34a" />
              <span>Ambulance: 108</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Hospital Directory */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 24px 36px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "36px",
          }}
        >
          {/* Column 1: Hospital Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #0284c7, #0d9488)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <HeartPulse size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {hospitalInfo.name}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#0284c7", fontWeight: 600 }}>
                  Hospital Management &amp; Clinical System
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#64748b", marginBottom: "16px" }}>
              A state-of-the-art super-speciality medical center delivering compassionate, 
              evidence-based clinical care, equipped with advanced ICU, modular operation theatres, 
              and 24x7 emergency resuscitation units.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                backgroundColor: "#f0f9ff",
                border: "1px solid #bae6fd",
                borderRadius: "6px",
                fontSize: "0.78rem",
                color: "#0369a1",
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={16} />
              <span>Reg. No: {hospitalInfo.regNo}</span>
            </div>
          </div>

          {/* Column 2: Clinical Departments */}
          <div>
            <h4
              style={{
                color: "#0f172a",
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Stethoscope size={16} color="#0284c7" />
              Specialities &amp; Units
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", lineHeight: 2 }}>
              <li>
                <span style={{ color: "#334155" }}>• Cardiology &amp; Cath Lab</span>
              </li>
              <li>
                <span style={{ color: "#334155" }}>• Orthopedics &amp; Joint Replacement</span>
              </li>
              <li>
                <span style={{ color: "#334155" }}>• General Medicine &amp; Diabetology</span>
              </li>
              <li>
                <span style={{ color: "#334155" }}>• Obstetrics, Gynecology &amp; NICU</span>
              </li>
              <li>
                <span style={{ color: "#334155" }}>• 24x7 Trauma &amp; Critical Care ICU</span>
              </li>
              <li>
                <span style={{ color: "#334155" }}>• In-House Digital Pathology &amp; Pharmacy</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick HMS Portal Navigation */}
          <div>
            <h4
              style={{
                color: "#0f172a",
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Building size={16} color="#059669" />
              Hospital Workspaces
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("doctor");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0284c7" /> Doctor Chamber &amp; Prescription Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("reception");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0284c7" /> Reception Desk &amp; OPD Booking
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("nurse");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0284c7" /> Nurse Station &amp; Scheduled Meds
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("hr");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0284c7" /> HR Staff Attendance &amp; Shift Roster
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("billing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0284c7" /> Discharge Summary &amp; Itemized Bills
              </button>
            </div>
          </div>

          {/* Column 4: Contact, Timings & Address */}
          <div>
            <h4
              style={{
                color: "#0f172a",
                fontSize: "0.95rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MapPin size={16} color="#d97706" />
              Location &amp; Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} color="#64748b" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>{hospitalInfo.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={15} color="#64748b" style={{ flexShrink: 0 }} />
                <a href={`tel:${hospitalInfo.phone}`} style={{ color: "#0284c7", textDecoration: "none", fontWeight: 600 }}>
                  {hospitalInfo.phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={15} color="#64748b" style={{ flexShrink: 0 }} />
                <a href={`mailto:${hospitalInfo.email}`} style={{ color: "#334155", textDecoration: "none" }}>
                  {hospitalInfo.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Clock size={15} color="#64748b" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>
                  OPD: 09:00 AM – 08:00 PM <br />
                  Emergency &amp; ICU: Open 24x7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            margin: "36px 0 24px",
            height: "1px",
            backgroundColor: "#e2e8f0",
          }}
        />

        {/* Bottom Sub-Footer */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontSize: "0.82rem",
            color: "#64748b",
          }}
        >
          <div>
            © {currentYear} {hospitalInfo.name}. All Clinical &amp; Medical Records Reserved.
            <span style={{ marginLeft: "10px", color: "#16a34a", fontWeight: 600 }}>• HIPAA &amp; NABH Compliance Ready</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#0284c7",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <span>Switch to Main Agency Website</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
