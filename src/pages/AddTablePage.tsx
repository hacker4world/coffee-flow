import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useTables } from "../context/TableContext";

const AddTablePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addTable } = useTables();

  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ number?: string; capacity?: string }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Read the file as a data URL so it can be shown as a preview and
      // stored in state (not persisted yet).
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { number?: string; capacity?: string } = {};

    const num = Number(number);
    if (!number.trim() || !Number.isInteger(num) || num <= 0) {
      newErrors.number = t("admin.tableNumberInvalid");
    }

    const cap = Number(capacity);
    if (!capacity.trim() || !Number.isInteger(cap) || cap <= 0) {
      newErrors.capacity = t("admin.tableCapacityInvalid");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addTable({
      number: num,
      capacity: cap,
      image: image ?? "",
    });

    navigate("/admin/tables");
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate("/admin/tables")}
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-display font-bold text-stone-800 tracking-tight leading-tight">
            {t("admin.addTable")}
          </h1>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-6 pb-28">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 p-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Table number */}
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.tableNumberLabel")}
              </label>
              <input
                type="number"
                id="number"
                name="number"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  if (errors.number) setErrors((prev) => ({ ...prev, number: undefined }));
                }}
                placeholder={t("admin.tableNumberPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.number
                    ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                } outline-none transition-all`}
              />
              {errors.number && (
                <p className="mt-1 text-sm text-red-600">{errors.number}</p>
              )}
            </div>

            {/* Number of places */}
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.tableCapacityLabel")}
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value);
                  if (errors.capacity)
                    setErrors((prev) => ({ ...prev, capacity: undefined }));
                }}
                placeholder={t("admin.tableCapacityPlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.capacity
                    ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                } outline-none transition-all`}
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
              )}
            </div>

            {/* Image select */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.tableImageLabel")}
              </label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors overflow-hidden"
              >
                {image ? (
                  <img
                    src={image}
                    alt={t("admin.tableImagePreview")}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <svg
                      className="h-8 w-8 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm text-stone-500">
                      {t("admin.tableImagePlaceholder")}
                    </span>
                  </>
                )}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-700 text-white font-semibold shadow-sm shadow-amber-700/30 hover:bg-amber-800 active:scale-95 transition-all"
            >
              {t("admin.addTable")}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddTablePage;