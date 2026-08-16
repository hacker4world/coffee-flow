import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useTables } from "../context/TableContext";
import { useProducts } from "../context/ProductContext";
import { useLanguage } from "../i18n/LanguageContext";

// Resolve a selected option id back to its display name (e.g. "oat" -> "Oat").
const optionName = (product, groupName, optionId) => {
  const group = product?.variants?.find((g) => g.name === groupName);
  return group?.options.find((o) => o.id === optionId)?.name ?? optionId;
};

// Detail page for a single order. Shows the associated table, the line items
// with their chosen variants, the total, and a button to confirm the order.
const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const { orders, confirmOrder, deleteOrder } = useOrders();
  const { tables } = useTables();
  const { products } = useProducts();

  const order = orders.find((o) => o.id === Number(id));
  const tableNumber = tables.find((table) => table.id === order?.tableId)?.number;

  // If the order doesn't exist (e.g. bad URL), show a fallback.
  if (!order) {
    return (
      <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col">
        <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => navigate("/admin/orders")}
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
              {t("admin.orderDetail")}
            </h1>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 pb-28">
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 p-8 text-center">
            <div className="text-4xl mb-3">🧾</div>
            <p className="text-stone-500">{t("admin.orderNotFound")}</p>
          </div>
        </main>
      </div>
    );
  }

  const isConfirmed = order.status === "confirmed";
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  const handleDelete = () => {
    if (window.confirm(t("admin.deleteConfirm"))) {
      deleteOrder(order.id);
      navigate("/admin/orders");
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate("/admin/orders")}
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
          <div>
            <h1 className="text-lg font-display font-bold text-stone-800 tracking-tight leading-tight">
              {t("admin.orderNumber", { n: order.id })}
            </h1>
            <p className="text-xs text-stone-500">
              {t("admin.orderItems", { count: itemCount })}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-28">
        {/* Order summary card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-stone-100 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500">{t("admin.orderTableLabel")}</p>
              <p className="font-display font-bold text-stone-800 text-lg">
                {t("admin.tableNumber", { n: tableNumber ?? order.tableId })}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isConfirmed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isConfirmed ? t("admin.orderConfirmed") : t("admin.orderPending")}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
            <span className="text-stone-500 text-sm">{t("admin.orderTotal")}</span>
            <span className="text-amber-700 font-bold text-lg">
              {order.total.toFixed(2)} TND
            </span>
          </div>
        </div>

        {/* Line items */}
        <div className="space-y-3">
          {order.items.map((item, index) => {
            const product = products.find((p) => p.id === item.productId);
            const variantSummary = Object.entries(item.selectedOptions)
              .map(([groupName, optId]) => optionName(product, groupName, optId))
              .join(" · ");

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-stone-800 tracking-tight">
                      {item.name}
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
                  <div className="text-right flex-shrink-0">
                    <p className="text-amber-700 font-bold">
                      {(item.price * item.quantity).toFixed(2)} TND
                    </p>
                    <p className="text-xs text-stone-500">
                      {t("admin.orderQty", { n: item.quantity })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Confirm bar */}
      {!isConfirmed && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-md mx-auto bg-white border-t border-stone-200 px-5 py-4 space-y-3">
            <button
              onClick={() => confirmOrder(order.id)}
              className="w-full py-3 rounded-full bg-amber-700 text-white font-bold active:scale-[0.98] transition-transform"
            >
              {t("admin.confirmOrder")}
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-full bg-red-50 text-red-600 font-semibold ring-1 ring-red-200 hover:bg-red-100 active:scale-[0.98] transition-all"
            >
              {t("admin.deleteOrder")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;