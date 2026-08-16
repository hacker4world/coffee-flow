import React, { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

interface VariantOption {
  id: string;
  name: string;
  priceDelta: number;
}

interface VariantGroup {
  name: string;
  options: VariantOption[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  variants?: VariantGroup[];
}

interface MultiItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  // Number of items to pre-fill when the modal opens (e.g. the chosen quantity).
  initialCount?: number;
  onAddToCart: (items: Array<{ selectedOptions: Record<string, string>; note?: string }>) => void;
}

const MultiItemModal = ({ isOpen, onClose, product, initialCount = 1, onAddToCart }: MultiItemModalProps) => {
  const { t } = useLanguage();
  const [items, setItems] = useState<Array<{ selectedOptions: Record<string, string>; note: string; showDetails: boolean }>>([
    { selectedOptions: {}, note: "", showDetails: false }
  ]);

  // Initialize default options for the first item
  const defaultOptions = product.variants?.reduce((acc, group) => {
    acc[group.name] = group.options[0]?.id || "";
    return acc;
  }, {} as Record<string, string>);

  // Reset the item list whenever the modal opens, pre-filling `initialCount` items
  // so each unit of the chosen quantity can get its own variant selection.
  useEffect(() => {
    if (isOpen) {
      const count = Math.max(1, Math.min(initialCount, 10));
      setItems(
        Array.from({ length: count }, () => ({
          selectedOptions: { ...defaultOptions },
          note: "",
          showDetails: false,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleAddItem = () => {
    if (items.length >= 10) return;
    setItems((prev) => [
      ...prev,
      { selectedOptions: { ...defaultOptions }, note: "", showDetails: false }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleVariantChange = (index: number, groupName: string, optionId: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, selectedOptions: { ...item.selectedOptions, [groupName]: optionId } }
          : item
      )
    );
  };

  const handleNoteChange = (index: number, note: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, note } : item
      )
    );
  };

  const handleToggleDetails = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, showDetails: !item.showDetails } : item
      )
    );
  };

  const handleAddToCart = () => {
    onAddToCart(items);
    onClose();
  };

  if (!isOpen) return null;

  // Calculate total price
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = product.variants
      ? product.variants.reduce((itemSum, group) => {
          const optId = item.selectedOptions[group.name];
          const opt = group.options.find((o) => o.id === optId);
          return itemSum + (opt ? opt.priceDelta : 0);
        }, product.price)
      : product.price;
    return sum + itemPrice;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative bg-white w-full max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-800">{t("modal.addToCart")}</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-stone-400 hover:text-stone-600 active:scale-90 transition-transform"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-stone-500 mt-1">{product.name}</p>
        </div>

        {/* Product image */}
        <div className="relative h-40 bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-block bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-stone-800">
              {product.categoryId === 1
                ? t("detail.categoryEspresso")
                : product.categoryId === 2
                ? t("detail.categoryColdBrew")
                : t("detail.categoryTea")}
            </span>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-stone-800 text-sm">{t("modal.item", { n: index + 1 })}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {Object.entries(item.selectedOptions).map(([groupName, optionId]) => {
                      const group = product.variants?.find((g) => g.name === groupName);
                      const option = group?.options.find((o) => o.id === optionId);
                      return option ? option.name : "";
                    }).filter(Boolean).join(", ") || t("modal.selectVariants")}
                  </p>
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-1.5 text-stone-400 hover:text-red-500 active:scale-90 transition-transform"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Variant selectors */}
              {product.variants?.map((group) => (
                <div key={group.name} className="mb-3">
                  <label className="text-xs font-semibold text-stone-600 mb-1.5 block">
                    {group.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleVariantChange(index, group.name, option.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          item.selectedOptions[group.name] === option.id
                            ? "bg-amber-700 text-white shadow-md shadow-amber-700/30"
                            : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-amber-300"
                        }`}
                      >
                        {option.name}
                        {option.priceDelta > 0 && (
                          <span className="ml-0.5 text-[10px] text-amber-700">
                            +{option.priceDelta.toFixed(2)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Further details toggle */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200">
                <span className="text-xs font-semibold text-stone-600">{t("modal.furtherDetails")}</span>
                <button
                  onClick={() => handleToggleDetails(index)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    item.showDetails
                      ? "bg-amber-100 text-amber-700"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {item.showDetails ? t("modal.hide") : t("modal.show")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3.5 w-3.5 transition-transform ${item.showDetails ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Further details textarea */}
              {item.showDetails && (
                <div className="mt-3">
                  <textarea
                    value={item.note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                    placeholder={t("modal.notePlaceholder")}
                    rows={3}
                    className="w-full bg-white rounded-xl ring-1 ring-stone-200 p-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
              )}
            </div>
          ))}

          {/* Add item button */}
          <button
            onClick={handleAddItem}
            disabled={items.length >= 10}
            className={`w-full py-2.5 rounded-full border-2 border-dashed text-sm font-semibold transition-all ${
              items.length >= 10
                ? "border-stone-200 text-stone-300 cursor-not-allowed"
                : "border-stone-300 text-stone-500 hover:border-amber-400 hover:text-amber-600 active:scale-98"
            }`}
          >
            {t("modal.addItem")}
          </button>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-stone-500">{t("modal.items", { count: items.length })}</span>
            <span className="text-lg font-bold text-amber-700">
              {totalPrice.toFixed(2)} TND
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={items.length === 0}
            className="w-full py-3 rounded-full bg-amber-700 text-white font-bold text-sm hover:bg-amber-800 disabled:bg-stone-300 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiItemModal;
