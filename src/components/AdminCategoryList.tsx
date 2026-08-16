import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import { useLanguage } from "../i18n/LanguageContext";

// Admin list of product categories. Mirrors the TableList layout: a heading
// with a list/grid view toggle and cards showing each category's image, name,
// description and product count. Data comes from the CategoryContext.
const AdminCategoryList = () => {
  const { t } = useLanguage();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // "list" | "grid"

  return (
    <section className="py-4">
      {/* Heading + view toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-amber-700"></span>
          <h2 className="text-xl font-display font-bold text-stone-800 tracking-tight">
            {t("admin.categories")}
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

      {/* Category list */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform"
            >
              {/* Image fills the top of the card */}
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-36 object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-700/90 text-white text-xs font-bold shadow-md">
                  {category.emoji}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-display font-bold text-stone-800 tracking-tight leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {category.description}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                  {t("category.items", { count: category.totalProducts })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/admin/categories/${category.id}/edit`)}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="h-20 w-20 rounded-xl relative flex-shrink-0 overflow-hidden shadow-sm">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-amber-700/90 text-white text-xs font-bold leading-none">
                  {category.emoji}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-stone-800 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                  {category.description}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex-shrink-0">
                {t("category.items", { count: category.totalProducts })}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminCategoryList;