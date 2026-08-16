import React from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";
import { useTables } from "../context/TableContext";
import { useLanguage } from "../i18n/LanguageContext";

// Admin list of orders. Shows each order's table, item count, total and
// status. Clicking an order navigates to its detail page.
const AdminOrderList = () => {
  const { t } = useLanguage();
  const { orders } = useOrders();
  const { tables } = useTables();
  const navigate = useNavigate();

  const tableNumber = (tableId: number) =>
    tables.find((table) => table.id === tableId)?.number ?? tableId;

  return (
    <section className="py-4">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-6 rounded-full bg-amber-700"></span>
        <h2 className="text-xl font-display font-bold text-stone-800 tracking-tight">
          {t("admin.orders")}
        </h2>
      </div>

      {/* Order list */}
      <div className="space-y-3">
        {orders.map((order) => {
          const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
          const isConfirmed = order.status === "confirmed";
          return (
            <div
              key={order.id}
              onClick={() => navigate(`/admin/orders/${order.id}`)}
              className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm ring-1 ring-stone-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="h-14 w-14 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🧾</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-stone-800 tracking-tight">
                  {t("admin.orderNumber", { n: order.id })}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {t("admin.orderTable", { n: tableNumber(order.tableId) })} ·{" "}
                  {t("admin.orderItems", { count: itemCount })}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-amber-700 font-bold">
                  {order.total.toFixed(2)} TND
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    isConfirmed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isConfirmed
                    ? t("admin.orderConfirmed")
                    : t("admin.orderPending")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminOrderList;