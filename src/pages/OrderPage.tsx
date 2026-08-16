import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, MAX_QUANTITY } from "../context/CartContext";
import { useLanguage } from "../i18n/LanguageContext";

// Resolve a selected option id back to its display name (e.g. "oat" -> "Oat").
const optionName = (product, groupName, optionId) => {
  const group = product.variants?.find((g) => g.name === groupName);
  return group?.options.find((o) => o.id === optionId)?.name ?? optionId;
};

const OrderPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-xl font-display font-bold text-stone-800">
          {t("order.emptyTitle")}
        </h1>
        <p className="text-stone-500 mt-1 text-center">
          {t("order.emptySubtitle")}
        </p>
        <Link
          to="/menu"
          className="mt-6 px-6 py-3 rounded-full bg-amber-700 text-white font-bold active:scale-95 transition-transform"
        >
          {t("order.browseMenu")}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate("/menu")}
            aria-label="Go back to menu"
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
          <div>
            <h1 className="text-lg font-display font-bold text-stone-800 tracking-tight leading-tight">
              {t("order.yourOrder")}
            </h1>
            <p className="text-xs text-stone-500">
              {t("order.items", { count: items.length })}
            </p>
          </div>
        </div>
      </header>

      {/* Item list */}
      <main className="px-4 py-4 pb-40">
        <div className="space-y-3">
          {items.map((item, index) => {
            const variantSummary = Object.entries(item.selectedOptions)
              .map(([groupName, optId]) => optionName(item.product, groupName, optId))
              .join(" · ");

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      navigate(`/product/${item.product.id}?edit=${index}`)
                    }
                    className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-stone-800 tracking-tight">
                        {item.product.name}
                      </h3>
                      {variantSummary && (
                        <p className="text-xs text-stone-500 mt-0.5">
                          {variantSummary}
                        </p>
                      )}
                      {item.note && (
                        <p className="text-xs text-stone-400 italic mt-0.5 truncate">
                          “{item.note}”
                        </p>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    aria-label={t("order.remove", { name: item.product.name })}
                    className="text-stone-400 hover:text-red-500 active:scale-90 transition-colors flex-shrink-0"
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
                </div>

                {/* Bottom row: stepper + line price */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-stone-100 rounded-full px-1.5 py-1">
                    <button
                      onClick={() =>
                        updateQuantity(index, Math.max(1, item.quantity - 1))
                      }
                      aria-label="Decrease quantity"
                      className="h-7 w-7 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="w-5 text-center font-bold text-stone-800 text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          index,
                          Math.min(MAX_QUANTITY, item.quantity + 1)
                        )
                      }
                      aria-label="Increase quantity"
                      className="h-7 w-7 rounded-full bg-white text-stone-700 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-amber-700 font-bold">
                    {(
                      (item.product.price +
                        Object.values(item.selectedOptions).reduce((acc, optId) => {
                          const delta = item.product.variants
                            ?.flatMap((g) => g.options)
                            .find((o) => o.id === optId)?.priceDelta;
                          return acc + (delta || 0);
                        }, 0)) *
                      item.quantity
                    ).toFixed(2)}{" "}
                    TND
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sticky confirm bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto bg-white border-t border-stone-200 px-5 py-4">
          {/* Total */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-stone-500">Total</span>
            <span className="text-amber-700 font-bold text-xl">
              {totalPrice.toFixed(2)} TND
            </span>
          </div>
          <button
            onClick={() => {
              clearCart();
              navigate("/order-confirmed");
            }}
            className="w-full py-3 rounded-full bg-amber-700 text-white font-bold active:scale-[0.98] transition-transform"
          >
            {t("order.confirmOrder")}
          </button>
        </div>
      </div>

    </div>
  );
};

export default OrderPage;
