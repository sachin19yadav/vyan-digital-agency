"use client";

import { useState } from "react";
import {
  Utensils,
  ShoppingBag,
  Sparkles,
  Star,
  Clock,
  Truck,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Phone,
  Flame,
  ChefHat,
  ShieldCheck,
  ChevronRight,
  Heart,
  Plus,
} from "lucide-react";
import { restaurantInfo } from "@/data/restaurantSeedData";

export default function RestaurantLandingPage({
  menuItems,
  onAddToCart,
  onOpenMenu,
  onOpenReservation,
  onOpenOrderTracking,
}) {
  const [guestCount, setGuestCount] = useState(2);
  const [resDate, setResDate] = useState("2026-09-29");
  const [resTime, setResTime] = useState("08:00 PM");
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [reservationBooked, setReservationBooked] = useState(false);

  const bestsellers = menuItems.filter((item) => item.isBestseller).slice(0, 4);

  function handleReserveTable(e) {
    e.preventDefault();
    if (!resName.trim() || !resPhone.trim()) return;
    setReservationBooked(true);
    setTimeout(() => {
      setReservationBooked(false);
      setResName("");
      setResPhone("");
    }, 4000);
  }

  return (
    <div style={{ backgroundColor: "#fdfbf7", color: "#0f172a" }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "50px 20px 70px",
          background: "linear-gradient(180deg, #fff7ed 0%, #fdfbf7 100%)",
          borderBottom: "1px solid #fed7aa",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Left Hero Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  backgroundColor: "#ffedd5",
                  border: "1px solid #fdba74",
                  borderRadius: "50px",
                  fontSize: "0.82rem",
                  color: "#c2410c",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                <Flame size={15} color="#ea580c" />
                <span>#1 Royal Awadhi &amp; Punjabi Fine Dine in Kanpur</span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: "0 0 18px",
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                Experience Royal Flavors &amp; Sizzling Tandoor Dishes
              </h1>

              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.6,
                  color: "#475569",
                  marginBottom: "28px",
                  maxWidth: "580px",
                }}
              >
                Hand-pounded spices, slow-cooked 16-hour Dal Bukhara, authentic Dum Biryanis, 
                and succulent kebabs roasted in clay tandoor. Dine in luxury or enjoy fast 30-min doorstep delivery.
              </p>

              {/* Call to Actions */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
                <button
                  type="button"
                  onClick={onOpenMenu}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    padding: "14px 28px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "0.98rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(234, 88, 12, 0.35)",
                    transition: "transform 0.15s",
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>Order Food Online Now</span>
                </button>

                <a
                  href="#reserve-table"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    border: "1px solid #fed7aa",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Calendar size={18} color="#ea580c" />
                  <span>Reserve a Table</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "0.85rem", color: "#334155" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <strong>4.9 / 5</strong> <span style={{ color: "#64748b" }}>(2,800+ Foodies)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Truck size={16} color="#16a34a" />
                  <strong>30 Min</strong> <span style={{ color: "#64748b" }}>Hot Delivery Guarantee</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Award size={16} color="#ea580c" />
                  <strong>100%</strong> <span style={{ color: "#64748b" }}>Desi Ghee &amp; Fresh Prep</span>
                </div>
              </div>
            </div>

            {/* Right Food Photo Collage Grid */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "2px solid #ffffff",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
                    alt="Butter Chicken Royale"
                    style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    Butter Chicken Royale
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "2px solid #ffffff",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                    alt="Hyderabadi Dum Biryani"
                    style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    Dum Biryani (Saffron)
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "2px solid #ffffff",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
                    alt="Paneer Tikka Angara"
                    style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    Paneer Tikka Angara
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "2px solid #ffffff",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                    alt="Dal Makhani Bukhara"
                    style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      color: "#0f172a",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    Dal Makhani Bukhara
                  </div>
                </div>
              </div>

              {/* Floating Chef Recommendation Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: "50px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "2px solid #ea580c",
                }}
              >
                <ChefHat size={22} color="#ea580c" />
                <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0f172a" }}>
                  Chef Harpal Singh Signature
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP BESTSELLERS SECTION (FOOD IMAGES WITH ADD TO CART) */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#ea580c", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
              <Flame size={16} /> Most Loved Dishes
            </div>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>
              Today's Chef Recommendations &amp; Bestsellers
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "6px 0 0" }}>
              Order these signature gourmet preparations loved by over 50,000 guests in Kanpur.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenMenu}
            style={{
              backgroundColor: "#fff7ed",
              color: "#ea580c",
              border: "1px solid #fdba74",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.88rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>View Full Menu ({menuItems.length} Dishes)</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {bestsellers.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #fed7aa",
                borderRadius: "18px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.04)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Food Image with Veg/Non-Veg Tag */}
              <div style={{ position: "relative", height: "200px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    backgroundColor: item.isVeg ? "#dcfce7" : "#fee2e2",
                    color: item.isVeg ? "#15803d" : "#b91c1c",
                    border: `1px solid ${item.isVeg ? "#bbf7d0" : "#fecaca"}`,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                  }}
                >
                  {item.isVeg ? "🌱 100% PURE VEG" : "🍗 NON-VEG"}
                </span>

                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    color: "#ffffff",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  {item.rating}
                </span>
              </div>

              {/* Card Details */}
              <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#ea580c", fontWeight: 700, textTransform: "uppercase" }}>
                    {item.category} • {item.spiceLevel}
                  </div>
                  <h3 style={{ margin: "4px 0 8px", fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                    {item.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748b", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Price</span>
                    <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>
                      ₹{item.price}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(item)}
                    style={{
                      backgroundColor: "#ea580c",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 2px 8px rgba(234, 88, 12, 0.25)",
                    }}
                  >
                    <Plus size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY DINE WITH US (KEY QUALITY HIGHLIGHTS) */}
      <section
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #fed7aa",
          borderBottom: "1px solid #fed7aa",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#ea580c", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
            <Award size={16} /> The Zaika Royale Promise
          </div>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 900, margin: "0 0 10px", color: "#0f172a" }}>
            Unmatched Taste, Purity &amp; Royalty in Every Bite
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 40px" }}>
            We bring age-old culinary secrets from royal khansamas using 100% genuine ingredients.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
            <div style={{ padding: "24px", backgroundColor: "#fff7ed", borderRadius: "16px", border: "1px solid #fed7aa", textAlign: "left" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: "16px" }}>
                <Flame size={24} />
              </div>
              <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                Authentic Clay Oven Tandoor
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>
                Every naan and tikka is slow-roasted over real natural charcoal inside an authentic red clay tandoor.
              </p>
            </div>

            <div style={{ padding: "24px", backgroundColor: "#fff7ed", borderRadius: "16px", border: "1px solid #fed7aa", textAlign: "left" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: "16px" }}>
                <Clock size={24} />
              </div>
              <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                16-Hour Slow Dum Cooking
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>
                Our signature Dal Bukhara and Awadhi Biryani are cooked on slow embers with dough seals to trap authentic aromas.
              </p>
            </div>

            <div style={{ padding: "24px", backgroundColor: "#fff7ed", borderRadius: "16px", border: "1px solid #fed7aa", textAlign: "left" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: "16px" }}>
                <Truck size={24} />
              </div>
              <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                Insulated Thermal Food Packaging
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>
                Custom foil-lined eco containers ensure your gravies, biryanis, and tandoori breads reach piping hot.
              </p>
            </div>

            <div style={{ padding: "24px", backgroundColor: "#fff7ed", borderRadius: "16px", border: "1px solid #fed7aa", textAlign: "left" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#ffedd5", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", marginBottom: "16px" }}>
                <ShieldCheck size={24} />
              </div>
              <h4 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>
                100% Pure Ingredients
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>
                No artificial colors, no MSG. We only use pure Amul butter, real cream, Kashmiri saffron, and cold-pressed oils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE RESERVATION FORM */}
      <section
        id="reserve-table"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #fed7aa",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 10px 30px rgba(234, 88, 12, 0.08)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#ea580c", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>
              <Calendar size={15} /> Dine-In Experience
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, margin: "6px 0", color: "#0f172a" }}>
              Book Your Royal Table in Advance
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              Avoid weekend waiting queues. Reserve an intimate couple table, family booth, or rooftop dining.
            </p>
          </div>

          {reservationBooked ? (
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#15803d",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              🎉 Table Reservation Confirmed for {resName} ({guestCount} Guests) on {resDate} at {resTime}!
              <div style={{ fontSize: "0.85rem", color: "#166534", marginTop: "4px", fontWeight: 500 }}>
                Our floor captain will call you at {resPhone} 1 hour before arrival.
              </div>
            </div>
          ) : (
            <form onSubmit={handleReserveTable} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kapoor"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                    }}
                  >
                    <option value={2}>2 Guests (Couple Table)</option>
                    <option value={4}>4 Guests (Family Table)</option>
                    <option value={6}>6 Guests (Large Booth)</option>
                    <option value={8}>8+ Guests (VIP Lounge)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                    Preferred Time Slot
                  </label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.88rem",
                      backgroundColor: "#ffffff",
                      color: "#0f172a",
                    }}
                  >
                    <option value="01:00 PM">01:00 PM (Lunch)</option>
                    <option value="02:00 PM">02:00 PM (Lunch)</option>
                    <option value="07:30 PM">07:30 PM (Dinner)</option>
                    <option value="08:30 PM">08:30 PM (Dinner)</option>
                    <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ea580c",
                    color: "#ffffff",
                    border: "none",
                    padding: "13px 36px",
                    borderRadius: "10px",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    boxShadow: "0 3px 12px rgba(234, 88, 12, 0.3)",
                  }}
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
