import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../data/coffeeData";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import BottomNav from "../components/BottomNav";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../i18n/LanguageContext";

const MenuPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [view, setView] = useState("list"); // "list" | "grid"
  const { items } = useCart();
  const { t } = useLanguage();

  // Set of product ids currently in the cart.
  const cartProductIds = new Set(items.map((item) => item.product.id));

  // Selected category from the URL (if any). "all" shows every product.
  const activeCategoryId = categoryId ? Number(categoryId) : "all";

  const visibleProducts =
    activeCategoryId === "all"
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  const activeCategory =
    activeCategoryId === "all"
      ? null
      : categories.find((c) => c.id === activeCategoryId);

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      {/* Header with back button and title */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            aria-label={t("menu.goBack")}
            className="p-2 -ml-2 text-stone-600 active:scale-90 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-display font-bold text-stone-800 tracking-tight leading-tight">
              {activeCategory ? activeCategory.name : t("menu.fullMenu")}
            </h1>
            <p className="text-xs text-stone-500">
              {visibleProducts.length} items
            </p>
          </div>

          {/* View toggle: list vs grid */}
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
      </header>

      {/* Category tabs */}
      <div className="sticky top-[60px] z-30 bg-stone-50/90 backdrop-blur-md px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/menu")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategoryId === "all"
                ? "bg-amber-700 text-white"
                : "bg-white text-stone-600 ring-1 ring-stone-200"
            }`}
          >
            {t("menu.all")}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/menu/${category.id}`)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategoryId === category.id
                  ? "bg-amber-700 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200"
              }`}
            >
              {category.emoji} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <main className="px-4 py-4 pb-28">
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="grid"
                inCart={cartProductIds.has(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="list"
                inCart={cartProductIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MenuPage;
