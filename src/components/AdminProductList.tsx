import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useLanguage } from "../i18n/LanguageContext";

// Admin list of products. Mirrors the TableList/CategoryList layout: a heading
// with a list/grid view toggle and cards showing each product's image, name,
// description and price. Data comes from the ProductContext.
const AdminProductList = () => {
  const { t } = useLanguage();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // "list" | "grid"

  return (
    <section className="py-4">
      {/* Heading + view toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-amber-700"></span>
          <h2 className="text-xl font-display font-bold text-stone-800 tracking-tight">
            {t("admin.products")}
          </h2>
        </div>

        <div className="flex items-center bg-stone-200/70 rounded-full p-1">
          <button
            onClick={() => setView("list")}
            aria-label={t("menu.listView")}
            className={`p-1.5 rounded-full transition-colors ${
              view === "list" ? "bg-white shadow" : "text-stone-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
          <button
            onClick={() => setView("grid")}
            aria-label={t("menu.gridView")}
            className={`p-1.5 rounded-full transition-colors ${
              view === "grid" ? "bg-white shadow" : "text-stone-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product list */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/admin/products/${product.id}/edit`)}
              className="relative bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              {/* Image fills the top of the card */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-display font-bold text-stone-800 tracking-tight leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {product.description}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                  {product.price.toFixed(2)} TND
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/admin/products/${product.id}/edit`)}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="h-20 w-20 rounded-xl relative flex-shrink-0 overflow-hidden shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-stone-800 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex-shrink-0">
                {product.price.toFixed(2)} TND
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminProductList;