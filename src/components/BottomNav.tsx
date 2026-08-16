import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../i18n/LanguageContext";

const BottomNav = () => {
  const location = useLocation();
  const { totalCount } = useCart();
  const { t } = useLanguage();

  // Derive the active tab from the current route so the highlight stays in
  // sync with navigation (e.g. /menu highlights "Menu").
  const currentTab = location.pathname.startsWith("/menu")
    ? "menu"
    : location.pathname.startsWith("/cart")
    ? "cart"
    : location.pathname.startsWith("/login")
    ? "login"
    : "home";

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-stone-200 flex justify-around items-center py-1 z-50">
      <Link
        to="/"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div
          className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 ${
            currentTab === "home"
              ? "bg-amber-100 ring-2 ring-amber-500"
              : "bg-transparent"
          }`}
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
        </div>
        <span
          className={`text-xs mt-1 ${currentTab === "home" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          Home
        </span>
      </Link>
      <Link
        to="/menu"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div
          className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 ${
            currentTab === "menu"
              ? "bg-amber-100 ring-2 ring-amber-500"
              : "bg-transparent"
          }`}
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
        </div>
        <span
          className={`text-xs mt-1 ${currentTab === "menu" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          {t("nav.menu")}
        </span>
      </Link>

      {/* Order — styled like the other tabs, links to the cart */}
      <Link
        to="/cart"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div
          className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 ${
            currentTab === "cart"
              ? "bg-amber-100 ring-2 ring-amber-500"
              : "bg-transparent"
          }`}
        >
          <div className="relative">
            <svg
              className={`h-6 w-6 ${currentTab === "cart" ? "text-amber-700" : "text-stone-400"}`}
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
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
        </div>
        <span
          className={`text-xs mt-1 ${currentTab === "cart" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          {t("nav.order")}
        </span>
      </Link>

      <Link
        to="/login"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div
          className={`flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 ${
            currentTab === "login"
              ? "bg-amber-100 ring-2 ring-amber-500"
              : "bg-transparent"
          }`}
        >
          <svg
            className={`h-6 w-6 ${currentTab === "login" ? "text-amber-700" : "text-stone-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <span
          className={`text-xs mt-1 ${currentTab === "login" ? "text-amber-700 font-bold" : "text-stone-400"}`}
        >
          {t("nav.login")}
        </span>
      </Link>
    </nav>
  );
};

export default BottomNav;
