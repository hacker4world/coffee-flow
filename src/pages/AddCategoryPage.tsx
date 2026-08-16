import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { useCategories } from "../context/CategoryContext";

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addCategory } = useCategories();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

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
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = t("admin.categoryNameInvalid");
    }

    if (!description.trim()) {
      newErrors.description = t("admin.categoryDescriptionInvalid");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    addCategory({
      name: name.trim(),
      description: description.trim(),
      emoji: emoji.trim() || "☕",
      totalProducts: 0,
      image: image ?? "",
    });

    navigate("/admin");
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate("/admin")}
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
            {t("admin.addCategory")}
          </h1>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-6 pb-28">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 p-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.categoryNameLabel")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder={t("admin.categoryNamePlaceholder")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                } outline-none transition-all`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.categoryDescriptionLabel")}
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder={t("admin.categoryDescriptionPlaceholder")}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border resize-none ${
                  errors.description
                    ? "border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    : "border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                } outline-none transition-all`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Emoji */}
            <div>
              <label
                htmlFor="emoji"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.categoryEmojiLabel")}
              </label>
              <input
                type="text"
                id="emoji"
                name="emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder={t("admin.categoryEmojiPlaceholder")}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>

            {/* Image select */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                {t("admin.categoryImageLabel")}
              </label>
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors overflow-hidden"
              >
                {image ? (
                  <img
                    src={image}
                    alt={t("admin.categoryImagePreview")}
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
                      {t("admin.categoryImagePlaceholder")}
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
              {t("admin.addCategory")}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCategoryPage;