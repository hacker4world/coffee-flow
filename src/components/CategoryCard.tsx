import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const CategoryCard = ({ id, name, totalProducts, image, emoji }) => {
  const { t } = useLanguage();

  return (
    // Full width card with relative positioning for the overlay
    <Link
      to={`/menu/${id}`}
      className="relative w-full h-70 rounded-2xl overflow-hidden shadow-md mb-4 active:scale-[0.98] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Emoji chip in the top corner for quick visual scanning */}
      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center text-lg">
        {emoji}
      </div>

      {/* Text Content positioned at the bottom left */}
      <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end">
        <div>
          <h3
            className="text-xl font-display font-bold text-white tracking-tight"
          >
            {name}
          </h3>
          <p className="text-sm text-stone-200 mt-0.5">
            {t("category.items", { count: totalProducts })}
          </p>
        </div>

        {/* Circular arrow button to indicate clickability */}
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full flex items-center gap-1">
          <span className="text-white text-sm font-semibold">{t("category.view")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
