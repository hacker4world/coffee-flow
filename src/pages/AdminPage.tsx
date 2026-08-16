import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import AdminBottomNav from "../components/AdminBottomNav";
import TableList from "../components/TableList";
import AdminCategoryList from "../components/AdminCategoryList";
import AdminProductList from "../components/AdminProductList";
import AdminOrderList from "../components/AdminOrderList";

// Admin dashboard shell. It renders the admin bottom bar and the section
// matching the current route (tables/products/orders come next).
const AdminPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isTables = location.pathname.startsWith("/admin/tables");
  const isCategories = location.pathname === "/admin";
  const isProducts = location.pathname.startsWith("/admin/products");
  const isOrders = location.pathname.startsWith("/admin/orders");

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-display font-bold text-stone-800 tracking-tight leading-tight">
            {isTables
              ? t("admin.tables")
              : isCategories
              ? t("admin.categories")
              : isProducts
              ? t("admin.products")
              : isOrders
              ? t("admin.orders")
              : t("admin.title")}
          </h1>

          {/* Create table button (tables section only) */}
          {isTables && (
            <button
              type="button"
              onClick={() => navigate("/admin/tables/new")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-700 text-white text-sm font-semibold shadow-sm shadow-amber-700/30 hover:bg-amber-800 active:scale-95 transition-all"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t("admin.addTable")}
            </button>
          )}

          {/* Create category button (categories section only) */}
          {isCategories && (
            <button
              type="button"
              onClick={() => navigate("/admin/categories/new")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-700 text-white text-sm font-semibold shadow-sm shadow-amber-700/30 hover:bg-amber-800 active:scale-95 transition-all"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t("admin.addCategory")}
            </button>
          )}

          {/* Create product button (products section only) */}
          {isProducts && (
            <button
              type="button"
              onClick={() => navigate("/admin/products/new")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-700 text-white text-sm font-semibold shadow-sm shadow-amber-700/30 hover:bg-amber-800 active:scale-95 transition-all"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {t("admin.addProduct")}
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-4 pb-28">
        {isTables ? (
          <TableList />
        ) : isCategories ? (
          <AdminCategoryList />
        ) : isProducts ? (
          <AdminProductList />
        ) : isOrders ? (
          <AdminOrderList />
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm ring-1 ring-stone-100">
            <div className="text-5xl mb-3">⚙️</div>
            <p className="text-stone-500">{t("admin.placeholder")}</p>
          </div>
        )}
      </main>

      <AdminBottomNav />
    </div>
  );
};

export default AdminPage;