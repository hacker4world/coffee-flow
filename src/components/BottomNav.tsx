import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation();

  // Derive the active tab from the current route so the highlight stays in
  // sync with navigation (e.g. /menu highlights "Menu").
  const currentTab = location.pathname.startsWith("/menu")
    ? "menu"
    : location.pathname.startsWith("/cart")
    ? "cart"
    : "home";

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-stone-200 flex justify-around items-center py-1 z-50">
      <Link
        to="/"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <svg
          className={`h-6 w-6 ${currentTab === "home" ? "text-amber-700" : "text-stone-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span
          className={`text-xs mt-1 ${currentTab === "home" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          Home
        </span>
      </Link>

      <Link
        to="/menu"
        onClick={() => setActiveTab("menu")}
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <svg
          className={`h-6 w-6 ${currentTab === "menu" ? "text-amber-700" : "text-stone-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        <span
          className={`text-xs mt-1 ${currentTab === "menu" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          Menu
        </span>
      </Link>

      {/* Floating order button — raised amber circle in the center */}
      <button
        onClick={() => setActiveTab("cart")}
        aria-label="Order"
        className="flex flex-col items-center -mt-8 active:scale-95 transition-transform"
      >
        <span className="h-14 w-14 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-lg ring-4 ring-white">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
        <span className="text-xs mt-1 text-amber-700 font-bold">Order</span>
      </button>

      <button
        onClick={() => setActiveTab("cart")}
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <svg
          className={`h-6 w-6 ${activeTab === "cart" ? "text-amber-700" : "text-stone-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span
          className={`text-xs mt-1 ${activeTab === "cart" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          Cart
        </span>
      </button>
    </nav>
  );
};

export default BottomNav;
