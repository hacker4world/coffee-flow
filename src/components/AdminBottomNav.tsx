import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const AdminBottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // Derive the active tab from the current route so the highlight stays in
  // sync with navigation (e.g. /admin/products highlights "Products").
  const currentTab = location.pathname.startsWith("/admin/tables")
    ? "tables"
    : location.pathname.startsWith("/admin/products")
    ? "products"
    : location.pathname.startsWith("/admin/orders")
    ? "orders"
    : "categories";

  // Shared classes for the circular active highlight.
  const circleClass = (active: boolean) =>
    `flex items-center justify-center h-9 w-9 rounded-full transition-all duration-200 ${
      active ? "bg-amber-100 ring-2 ring-amber-500" : "bg-transparent"
    }`;

  const iconClass = (active: boolean) =>
    `h-6 w-6 ${active ? "text-amber-700" : "text-stone-400"}`;

  const labelClass = (active: boolean) =>
    `text-xs mt-1 ${active ? "text-amber-700 font-bold" : "text-stone-400"}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-stone-200 flex justify-around items-center py-1 z-50">
      {/* Tables */}
      <Link
        to="/admin/tables"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div className={circleClass(currentTab === "tables")}>
          <svg
            className={iconClass(currentTab === "tables")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M3 14h18M3 6h18M3 18h18"
            />
          </svg>
        </div>
        <span className={labelClass(currentTab === "tables")}>
          {t("admin.tables")}
        </span>
      </Link>

      {/* Categories */}
      <Link
        to="/admin"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div className={circleClass(currentTab === "categories")}>
          <svg
            className={iconClass(currentTab === "categories")}
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
        <span className={labelClass(currentTab === "categories")}>
          {t("admin.categories")}
        </span>
      </Link>

      {/* Products */}
      <Link
        to="/admin/products"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div className={circleClass(currentTab === "products")}>
          <svg
            className={iconClass(currentTab === "products")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <span className={labelClass(currentTab === "products")}>
          {t("admin.products")}
        </span>
      </Link>

      {/* Orders */}
      <Link
        to="/admin/orders"
        className="flex flex-col items-center p-1 w-20 active:scale-95 transition-transform"
      >
        <div className={circleClass(currentTab === "orders")}>
          <svg
            className={iconClass(currentTab === "orders")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <span className={labelClass(currentTab === "orders")}>
          {t("admin.orders")}
        </span>
      </Link>
    </nav>
  );
};

export default AdminBottomNav;