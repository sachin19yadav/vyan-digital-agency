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
        backgroundColor: "#070D1F",
        color: "#94a3b8",
        borderTop: "2px solid #0ea5e9",
        fontSize: "0.9rem",
        marginTop: "auto",
      }}
    >
      {/* Emergency Strip */}
      <div
        style={{
          backgroundColor: "#0f172a",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ef4444",
                flexShrink: 0,
              }}
            >
              <AlertCircle size={22} className="pulse-dot" />
            </div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.98rem" }}>
                24x7 Medical Emergency & Critical Trauma Care
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
                Immediate Cardiac Life Support (ACLS), Stroke Ready, ICU & Ambulance Response
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
                boxShadow: "0 2px 10px rgba(220, 38, 38, 0.35)",
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
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "0.86rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <Activity size={15} color="#10b981" />
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
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
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
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {hospitalInfo.name}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 500 }}>
                  Hospital Management & Clinical System
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#94a3b8", marginBottom: "16px" }}>
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
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                border: "1px solid rgba(14, 165, 233, 0.25)",
                borderRadius: "6px",
                fontSize: "0.78rem",
                color: "#38bdf8",
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
                color: "#ffffff",
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
              <Stethoscope size={16} color="#0ea5e9" />
              Specialities & Units
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", lineHeight: 2 }}>
              <li>
                <span style={{ color: "#cbd5e1" }}>• Cardiology & Cath Lab</span>
              </li>
              <li>
                <span style={{ color: "#cbd5e1" }}>• Orthopedics & Joint Replacement</span>
              </li>
              <li>
                <span style={{ color: "#cbd5e1" }}>• General Medicine & Diabetology</span>
              </li>
              <li>
                <span style={{ color: "#cbd5e1" }}>• Obstetrics, Gynecology & NICU</span>
              </li>
              <li>
                <span style={{ color: "#cbd5e1" }}>• 24x7 Trauma & Critical Care ICU</span>
              </li>
              <li>
                <span style={{ color: "#cbd5e1" }}>• In-House Digital Pathology & Pharmacy</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick HMS Portal Navigation */}
          <div>
            <h4
              style={{
                color: "#ffffff",
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
              <Building size={16} color="#10b981" />
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
                  color: "#cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0ea5e9" /> Doctor Chamber & Prescription Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("opd");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0ea5e9" /> OPD Appointments & Token Queue
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("patients");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0ea5e9" /> Patient Admissions (IPD)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("duty");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0ea5e9" /> Nurse & Doctor Floor Duty Roster
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
                  color: "#cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ArrowRight size={14} color="#0ea5e9" /> Discharge Summary & Itemized Bills
              </button>
            </div>
          </div>

          {/* Column 4: Contact, Timings & Address */}
          <div>
            <h4
              style={{
                color: "#ffffff",
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
              <MapPin size={16} color="#f59e0b" />
              Location & Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} color="#94a3b8" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>{hospitalInfo.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
                <a href={`tel:${hospitalInfo.phone}`} style={{ color: "#38bdf8", textDecoration: "none" }}>
                  {hospitalInfo.phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
                <a href={`mailto:${hospitalInfo.email}`} style={{ color: "#cbd5e1", textDecoration: "none" }}>
                  {hospitalInfo.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Clock size={15} color="#94a3b8" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>
                  OPD: 09:00 AM – 08:00 PM <br />
                  Emergency & ICU: Open 24x7
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
            backgroundColor: "rgba(255, 255, 255, 0.08)",
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
            © {currentYear} {hospitalInfo.name}. All Clinical & Medical Records Reserved.
            <span style={{ marginLeft: "10px", color: "#10b981" }}>• HIPAA & NABH Compliance Ready</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: 500,
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
