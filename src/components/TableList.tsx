import React, { useState } from "react";
import { useTables } from "../context/TableContext";
import { useLanguage } from "../i18n/LanguageContext";

// Stylized table visual used in both list and grid variants. Shows the
// table's photo with the table number overlaid in a corner badge.
const TableVisual = ({ image, number, size = "md", alt }) => {
  const sizeClass =
    size === "lg"
      ? "h-24 w-24 rounded-2xl"
      : "h-20 w-20 rounded-xl";
  return (
    <div className={`${sizeClass} relative flex-shrink-0 overflow-hidden shadow-sm`}>
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover"
      />
      {/* Number badge */}
      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-amber-700/90 text-white text-xs font-bold leading-none">
        {number}
      </span>
    </div>
  );
};

const TableList = () => {
  const { t } = useLanguage();
  const { tables } = useTables();
  const [view, setView] = useState("list"); // "list" | "grid"

  return (
    <section className="py-4">
      {/* Heading + view toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 rounded-full bg-amber-700"></span>
          <h2 className="text-xl font-display font-bold text-stone-800 tracking-tight">
            {t("admin.tables")}
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

      {/* Table list */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform"
            >
              {/* Image fills the top of the card */}
              <div className="relative">
                <img
                  src={table.image}
                  alt={t("admin.tableImageAlt", { n: table.number })}
                  className="w-full h-36 object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-700/90 text-white text-xs font-bold shadow-md">
                  {table.number}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-display font-bold text-stone-800 tracking-tight leading-tight">
                  {t("admin.tableNumber", { n: table.number })}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t("admin.tableCapacity", { n: table.capacity })}
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                  {t("admin.tableAvailable")}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform"
            >
              <TableVisual
                image={table.image}
                number={table.number}
                alt={t("admin.tableImageAlt", { n: table.number })}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-stone-800 tracking-tight">
                  {t("admin.tableNumber", { n: table.number })}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t("admin.tableCapacity", { n: table.capacity })}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex-shrink-0">
                {t("admin.tableAvailable")}
              </span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};

export default TableList;