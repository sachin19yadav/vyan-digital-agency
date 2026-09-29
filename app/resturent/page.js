"use client";

import { useState, useEffect } from "react";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import RestaurantLandingPage from "@/components/restaurant/RestaurantLandingPage";
import FoodMenu from "@/components/restaurant/FoodMenu";
import OnlineOrderManager from "@/components/restaurant/OnlineOrderManager";
import BillingPOS from "@/components/restaurant/BillingPOS";
import KitchenStaffDesk from "@/components/restaurant/KitchenStaffDesk";
import AdminDashboard from "@/components/restaurant/AdminDashboard";

import {
  restaurantInfo,
  initialMenuItems,
  initialTables,
  initialOrders,
  initialStaff,
  initialBills,
} from "@/data/restaurantSeedData";

export default function RestaurantAppPage() {
  // Master State
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const [tables, setTables] = useState(initialTables);
  const [bills, setBills] = useState(initialBills);
  const [allStaff, setAllStaff] = useState(initialStaff);

  // Active View & Role
  // Roles: "Guest" | "Billing" | "Kitchen" | "Admin"
  const [currentRole, setCurrentRole] = useState("Guest");
  // Tabs: "landing" | "menu" | "orders" | "billing" | "kitchen" | "admin"
  const [activeTab, setActiveTab] = useState("landing");

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Load persisted state from localStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zaika_royale_restaurant_data_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.menuItems?.length) setMenuItems(parsed.menuItems);
        if (parsed.orders?.length) setOrders(parsed.orders);
        if (parsed.tables?.length) setTables(parsed.tables);
        if (parsed.bills?.length) setBills(parsed.bills);
        if (parsed.cart?.length) setCart(parsed.cart);
      }
    } catch (e) {
      console.error("Failed to load restaurant data from localStorage", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "zaika_royale_restaurant_data_v1",
        JSON.stringify({
          menuItems,
          orders,
          tables,
          bills,
          cart,
        })
      );
    } catch (e) {
      console.error("Failed to persist restaurant data to localStorage", e);
    }
  }, [menuItems, orders, tables, bills, cart]);

  // Toast Notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [
        ...prevCart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          image: item.image,
          isVeg: item.isVeg,
        },
      ];
    });
    showToast(`Added "${item.name}" to cart`);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === itemId);
      if (!existing) return prevCart;
      if (existing.qty <= 1) {
        return prevCart.filter((c) => c.id !== itemId);
      }
      return prevCart.map((c) =>
        c.id === itemId ? { ...c, qty: c.qty - 1 } : c
      );
    });
  };

  const updateCartQty = (itemId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((c) => c.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((c) => (c.id === itemId ? { ...c, qty } : c))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            zIndex: 200,
            fontSize: "0.88rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #334155",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dedicated Restaurant Header (Replaces main agency header on /resturent) */}
      <RestaurantHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allStaff={allStaff}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* 1. Landing Page */}
        {activeTab === "landing" && (
          <RestaurantLandingPage
            menuItems={menuItems}
            onAddToCart={addToCart}
            onOpenMenu={() => setActiveTab("menu")}
            onOpenReservation={() => {
              const resSection = document.getElementById("reservation-section");
              if (resSection) {
                resSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            onOpenOrderTracking={() => setActiveTab("orders")}
          />
        )}

        {/* 2. Food Menu */}
        {activeTab === "menu" && (
          <FoodMenu
            menuItems={menuItems}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartQty={updateCartQty}
            setIsCartOpen={setIsCartOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {/* 3. Track Orders & Delivery */}
        {activeTab === "orders" && (
          <OnlineOrderManager
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateCartQty={updateCartQty}
            clearCart={clearCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            orders={orders}
            setOrders={setOrders}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* 4. Billing Software (POS) */}
        {activeTab === "billing" && (
          <BillingPOS
            menuItems={menuItems}
            tables={tables}
            setTables={setTables}
            bills={bills}
            setBills={setBills}
            allStaff={allStaff}
          />
        )}

        {/* 5. Kitchen Staff & KOT Desk */}
        {activeTab === "kitchen" && (
          <KitchenStaffDesk
            orders={orders}
            setOrders={setOrders}
            tables={tables}
            setTables={setTables}
            allStaff={allStaff}
          />
        )}

        {/* 6. Admin Portal */}
        {activeTab === "admin" && (
          <AdminDashboard
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            orders={orders}
            bills={bills}
            tables={tables}
            allStaff={allStaff}
          />
        )}
      </main>

      {/* Global Sliding Cart Drawer (Can be opened from header or floating bar on any tab) */}
      <OnlineOrderManager
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateCartQty={updateCartQty}
        clearCart={clearCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        orders={orders}
        setOrders={setOrders}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Dedicated Restaurant Footer (Pure light theme) */}
      <RestaurantFooter setActiveTab={setActiveTab} />
    </div>
  );
}
