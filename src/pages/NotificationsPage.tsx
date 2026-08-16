import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

// Mock notification data. For now a single order-status notification is shown;
// this will later be replaced by real data (e.g. from a backend or push).
const mockNotifications = [
  {
    id: 1,
    type: "order",
    status: "preparing",
    titleKey: "notifications.orderPreparing",
    bodyKey: "notifications.orderPreparingBody",
    time: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
];

// Map a status to its icon color and label key.
const statusMeta = {
  placed: { color: "bg-stone-400", labelKey: "notifications.orderPlaced" },
  preparing: { color: "bg-amber-500", labelKey: "notifications.orderPreparing" },
  ready: { color: "bg-green-500", labelKey: "notifications.orderReady" },
  delivered: { color: "bg-emerald-600", labelKey: "notifications.orderDelivered" },
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Format a timestamp as a short relative label.
  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return t("notifications.justNow");
    if (minutes < 60) return t("notifications.minutesAgo", { n: minutes });
    return t("notifications.hoursAgo", { n: Math.floor(minutes / 60) });
  };

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-stone-100 to-amber-100 min-h-screen shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            aria-label={t("notifications.goBack")}
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
              {t("notifications.title")}
            </h1>
            <p className="text-xs text-stone-500">
              {mockNotifications.length} {t("notifications.orderStatus")}
            </p>
          </div>
        </div>
      </header>

      {/* Notification list */}
      <main className="px-4 py-4 pb-28">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-lg font-display font-bold text-stone-800">
              {t("notifications.empty")}
            </h2>
            <p className="text-stone-500 mt-1 text-sm">
              {t("notifications.emptySubtitle")}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockNotifications.map((notification) => {
              const meta = statusMeta[notification.status] || statusMeta.placed;
              return (
                <div
                  key={notification.id}
                  className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-stone-100 flex gap-3"
                >
                  {/* Status dot */}
                  <div
                    className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${meta.color}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-stone-800 tracking-tight text-sm">
                        {t(meta.labelKey)}
                      </h3>
                      <span className="text-xs text-stone-400 flex-shrink-0">
                        {formatTime(notification.time)}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 mt-1">
                      {t(notification.bodyKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsPage;