"use client";

import { useState, useMemo } from "react";
import {
  Utensils,
  Search,
  Flame,
  Star,
  Clock,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Filter,
  Sparkles,
  Award,
  ChevronRight,
  Info,
} from "lucide-react";
import { menuCategories } from "@/data/restaurantSeedData";

export default function FoodMenu({
  menuItems,
  cart,
  addToCart,
  removeFromCart,
  updateCartQty,
  setIsCartOpen,
  searchTerm,
  setSearchTerm,
}) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [dietFilter, setDietFilter] = useState("ALL"); // "ALL", "VEG", "NON_VEG"
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured"); // "featured", "price-low", "price-high", "rating"

  // Filtered & sorted menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === "VEG" && !item.isVeg) return false;
      if (dietFilter === "NON_VEG" && item.isVeg) return false;
      // Bestseller filter
      if (bestsellerOnly && !item.isBestseller) return false;
      // Search term
      if (searchTerm && searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCat = item.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [menuItems, selectedCategory, dietFilter, bestsellerOnly, searchTerm, sortBy]);

  // Helper to get cart quantity for an item
  const getItemCartQty = (itemId) => {
    const found = cart.find((c) => c.id === itemId);
    return found ? found.qty : 0;
  };

  const totalCartCount = cart.reduce((acc, c) => acc + c.qty, 0);
  const totalCartAmount = cart.reduce((acc, c) => acc + c.qty * c.price, 0);

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Category Navigation Hero */}
      <section
        style={{
          background: "linear-gradient(180deg, #fff7ed 0%, #faf8f5 100%)",
          borderBottom: "1px solid #fed7aa",
          padding: "36px 20px 24px",
        }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#c2410c", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                <Sparkles size={16} />
                <span>Zaika Royale Master Menu</span>
              </div>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0f172a", margin: "6px 0", letterSpacing: "-0.5px" }}>
                Explore Royal Flavors &amp; Delicacies
              </h1>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.95rem" }}>
                Cooked with authentic slow-fire dum techniques, fresh ingredients, and royal khansama recipes.
              </p>
            </div>

            {/* Quick Search in Menu */}
            <div style={{ position: "relative", minWidth: "280px" }}>
              <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dish (e.g. Biryani, Paneer, Naan)..."
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 40px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  fontSize: "0.88rem",
                  color: "#0f172a",
                  outline: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "8px",
              scrollbarWidth: "none",
            }}
          >
            {menuCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 18px",
                    borderRadius: "30px",
                    border: isSelected ? "2px solid #ea580c" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#ea580c" : "#ffffff",
                    color: isSelected ? "#ffffff" : "#334155",
                    fontSize: "0.88rem",
                    fontWeight: isSelected ? 800 : 600,
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 4px 12px rgba(234, 88, 12, 0.25)" : "0 1px 3px rgba(0,0,0,0.04)",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Utensils size={14} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filters Bar: Veg/Non-Veg, Bestsellers, Sort */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid #fed7aa",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {/* Veg / Non-Veg Pills */}
              <div
                style={{
                  display: "inline-flex",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "3px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setDietFilter("ALL")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: dietFilter === "ALL" ? "#0f172a" : "transparent",
                    color: dietFilter === "ALL" ? "#ffffff" : "#64748b",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  All Food
                </button>
                <button
                  type="button"
                  onClick={() => setDietFilter("VEG")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: dietFilter === "VEG" ? "#16a34a" : "transparent",
                    color: dietFilter === "VEG" ? "#ffffff" : "#16a34a",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: dietFilter === "VEG" ? "#ffffff" : "#16a34a",
                      display: "inline-block",
                    }}
                  />
                  Pure Veg
                </button>
                <button
                  type="button"
                  onClick={() => setDietFilter("NON_VEG")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: dietFilter === "NON_VEG" ? "#dc2626" : "transparent",
                    color: dietFilter === "NON_VEG" ? "#ffffff" : "#dc2626",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: dietFilter === "NON_VEG" ? "#ffffff" : "#dc2626",
                      display: "inline-block",
                    }}
                  />
                  Non-Veg
                </button>
              </div>

              {/* Bestseller Toggle */}
              <button
                type="button"
                onClick={() => setBestsellerOnly(!bestsellerOnly)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: bestsellerOnly ? "1px solid #f59e0b" : "1px solid #e2e8f0",
                  backgroundColor: bestsellerOnly ? "#fef3c7" : "#ffffff",
                  color: bestsellerOnly ? "#b45309" : "#475569",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Award size={14} color={bestsellerOnly ? "#b45309" : "#64748b"} />
                <span>Bestsellers Only</span>
              </button>
            </div>

            {/* Sort Dropdown & Results Counter */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
                Showing <strong>{filteredItems.length}</strong> items
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "0.78rem",
                    color: "#0f172a",
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="featured">Featured / Chef Pick</option>
                  <option value="rating">Top Rated (★)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Cards Grid */}
      <section style={{ maxWidth: "1240px", margin: "30px auto", padding: "0 20px" }}>
        {filteredItems.length === 0 ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "60px 20px",
              textAlign: "center",
              border: "1px dashed #cbd5e1",
              maxWidth: "500px",
              margin: "40px auto",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#fff7ed",
                color: "#ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Utensils size={30} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
              No culinary items found
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.88rem", margin: "0 0 20px" }}>
              We couldn't find any dishes matching your filters or search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setDietFilter("ALL");
                setBestsellerOnly(false);
                setSearchTerm("");
              }}
              style={{
                backgroundColor: "#ea580c",
                color: "#ffffff",
                border: "none",
                padding: "8px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredItems.map((item) => {
              const currentQty = getItemCartQty(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.04)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  {/* Food Image Container */}
                  <div style={{ position: "relative", width: "100%", height: "190px", backgroundColor: "#f1f5f9" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />

                    {/* Veg / Non-Veg Indicator Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        backgroundColor: "#ffffff",
                        padding: "4px",
                        borderRadius: "4px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title={item.isVeg ? "100% Pure Vegetarian" : "Non-Vegetarian"}
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: `2px solid ${item.isVeg ? "#16a34a" : "#dc2626"}`,
                          borderRadius: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: item.isVeg ? "#16a34a" : "#dc2626",
                          }}
                        />
                      </div>
                    </div>

                    {/* Bestseller Badge */}
                    {item.isBestseller && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#ea580c",
                          color: "#ffffff",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: "20px",
                          boxShadow: "0 2px 6px rgba(234, 88, 12, 0.4)",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Sparkles size={11} />
                        <span>BESTSELLER</span>
                      </div>
                    )}

                    {/* Rating pill on image bottom */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "12px",
                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(4px)",
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
                      <Star size={12} fill="#fbbf24" color="#fbbf24" />
                      <span>{item.rating}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.68rem" }}>({item.reviewsCount})</span>
                    </div>

                    {/* Prep Time pill on image bottom right */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#334155",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={11} color="#ea580c" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Food Content Details */}
                  <div style={{ padding: "18px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "1.08rem", fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>
                        {item.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          backgroundColor: "#f1f5f9",
                          color: "#475569",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {item.category}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#c2410c",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Flame size={12} />
                        {item.spiceLevel}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#64748b",
                        lineHeight: 1.45,
                        margin: "0 0 16px",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Price and Add to Cart Section */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      <div>
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8", display: "block" }}>Price</span>
                        <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Add Button or Quantity Stepper */}
                      {currentQty === 0 ? (
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "#ea580c",
                            color: "#ffffff",
                            border: "none",
                            padding: "9px 18px",
                            borderRadius: "10px",
                            fontWeight: 800,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.28)",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Plus size={16} />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            backgroundColor: "#fff7ed",
                            border: "2px solid #ea580c",
                            borderRadius: "10px",
                            padding: "2px 4px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "#ea580c",
                              padding: "4px 8px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            style={{
                              fontWeight: 900,
                              color: "#ea580c",
                              fontSize: "0.92rem",
                              minWidth: "24px",
                              textAlign: "center",
                            }}
                          >
                            {currentQty}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "#ea580c",
                              padding: "4px 8px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Bottom Cart Bar (Appears when items are in cart) */}
      {totalCartCount > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 40px)",
            maxWidth: "680px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "14px 22px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 40,
            border: "1px solid #334155",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "#ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <ShoppingBag size={22} />
            </div>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>
                {totalCartCount} {totalCartCount === 1 ? "Item" : "Items"} in Cart
              </div>
              <div style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                Subtotal: <strong style={{ color: "#ffffff" }}>₹{totalCartAmount.toFixed(2)}</strong> (Excl. taxes)
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#ea580c",
              color: "#ffffff",
              border: "none",
              padding: "10px 22px",
              borderRadius: "10px",
              fontWeight: 800,
              fontSize: "0.92rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(234, 88, 12, 0.4)",
            }}
          >
            <span>Proceed to Checkout</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
