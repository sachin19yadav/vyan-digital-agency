"use client";

import Link from "next/link";
import {
  Utensils,
  Phone,
  Clock,
  MapPin,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  ChefHat,
  Truck,
} from "lucide-react";
import { restaurantInfo } from "@/data/restaurantSeedData";

export default function RestaurantFooter({ setActiveTab }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#ffffff",
        color: "#475569",
        borderTop: "2px solid #ea580c",
        fontSize: "0.9rem",
        marginTop: "auto",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      {/* Top 3 Guarantee Pillars */}
      <div
        style={{
          backgroundColor: "#fff7ed",
          borderBottom: "1px solid #fed7aa",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
              <ChefHat size={22} />
            </div>
            <div>
              <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.95rem" }}>100% Authentic Recipes</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>Clay oven tandoor &amp; slow-cooked dum biryani</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.95rem" }}>Express 30-Min Delivery</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>Hot insulated packaging to your doorstep</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c" }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.95rem" }}>5-Star Hygiene Kitchen</div>
              <div style={{ color: "#64748b", fontSize: "0.8rem" }}>FSSAI Certified: Lic. #{restaurantInfo.fssaiLicense}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
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
          {/* Column 1: Restaurant Identity */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #ea580c, #c2410c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <Utensils size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "#0f172a",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {restaurantInfo.name}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "#ea580c", fontWeight: 700 }}>
                  Gourmet Fine Dine &amp; Cloud Kitchen
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#64748b", marginBottom: "16px" }}>
              Experience the royal aromas of Awadh and Punjab. Hand-crafted tandoori kebabs, 
              rich slow-simmered curries, and fragrant dum biryanis made with pure desi ghee and fresh farm spices.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                backgroundColor: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "6px",
                fontSize: "0.78rem",
                color: "#c2410c",
                fontWeight: 700,
              }}
            >
              <Award size={15} />
              <span>FSSAI Lic: {restaurantInfo.fssaiLicense}</span>
            </div>
          </div>

          {/* Column 2: Popular Menu Specialties */}
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
              <Sparkles size={16} color="#ea580c" />
              Chef Specialties
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", lineHeight: 2 }}>
              <li style={{ color: "#334155" }}>• Butter Chicken Royale (Boneless)</li>
              <li style={{ color: "#334155" }}>• Hyderabadi Chicken Dum Biryani</li>
              <li style={{ color: "#334155" }}>• Dal Makhani Bukhara (16-Hr Slow Cooked)</li>
              <li style={{ color: "#334155" }}>• Paneer Tikka Angara</li>
              <li style={{ color: "#334155" }}>• Butter Garlic Naan &amp; Laccha Paratha</li>
              <li style={{ color: "#334155" }}>• Shahi Gulab Jamun with Thick Rabri</li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
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
              <Utensils size={16} color="#ea580c" />
              Quick Modules
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("menu");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", color: "#334155", cursor: "pointer" }}
              >
                → Browse Full Food Menu
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("orders");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", color: "#334155", cursor: "pointer" }}
              >
                → Track Online Order &amp; Delivery
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("billing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", color: "#334155", cursor: "pointer" }}
              >
                → POS Billing Software &amp; Receipt Print
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("kitchen");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", color: "#334155", cursor: "pointer" }}
              >
                → Kitchen KOT Orders Desk
              </button>
              <button
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab("admin");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", color: "#334155", cursor: "pointer" }}
              >
                → Restaurant Admin Dashboard
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
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
              <MapPin size={16} color="#ea580c" />
              Visit &amp; Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} color="#ea580c" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>{restaurantInfo.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={15} color="#ea580c" style={{ flexShrink: 0 }} />
                <a href={`tel:${restaurantInfo.phone}`} style={{ color: "#ea580c", textDecoration: "none", fontWeight: 700 }}>
                  {restaurantInfo.phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={15} color="#ea580c" style={{ flexShrink: 0 }} />
                <a href={`mailto:${restaurantInfo.email}`} style={{ color: "#334155", textDecoration: "none" }}>
                  {restaurantInfo.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Clock size={15} color="#ea580c" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>
                  Dine-In: 11:30 AM – 11:00 PM <br />
                  Online Delivery: Open till 11:30 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ margin: "36px 0 24px", height: "1px", backgroundColor: "#e2e8f0" }} />

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
            © {currentYear} {restaurantInfo.name}. All Culinary Recipes &amp; Online Orders Reserved.
            <span style={{ marginLeft: "10px", color: "#16a34a", fontWeight: 600 }}>• GSTIN: {restaurantInfo.gstin}</span>
          </div>

          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                color: "#ea580c",
                textDecoration: "none",
                fontWeight: 700,
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
