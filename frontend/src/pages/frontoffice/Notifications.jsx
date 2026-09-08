import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bell,
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
  Check,
} from "lucide-react";

const Notifications = () => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      message: "A new residence recommendation application has been submitted.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "verified",
      title: "Application Verified",
      message: "Application EW-2026-002 has been successfully verified.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "pending",
      title: "Application Requires Review",
      message: "An application is waiting for additional verification.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      message: "The E-Ward Sifarish system has been updated successfully.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const types = {
    application: {
      icon: FileText,
      style: "bg-blue-50 text-blue-700",
    },
    verified: {
      icon: CheckCircle2,
      style: "bg-green-50 text-green-600",
    },
    pending: {
      icon: Clock3,
      style: "bg-amber-50 text-amber-600",
    },
    system: {
      icon: AlertCircle,
      style: "bg-red-50 text-red-600",
    },
  };

  const summary = [
    {
      label: t("notifications.total"),
      value: notifications.length,
      icon: Bell,
      style: "bg-blue-50 text-blue-900",
      valueStyle: "text-blue-950",
    },
    {
      label: t("notifications.unread"),
      value: unreadCount,
      icon: AlertCircle,
      style: "bg-red-50 text-red-600",
      valueStyle: "text-red-600",
    },
    {
      label: t("notifications.read"),
      value: notifications.length - unreadCount,
      icon: CheckCircle2,
      style: "bg-green-50 text-green-600",
      valueStyle: "text-green-600",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6  mt-9">
      {/* Header */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("notifications.label")}
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-950 sm:text-3xl">
              {t("notifications.title")}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t("notifications.description")}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 hover:bg-slate-50"
            >
              <Check size={17} />
              {t("notifications.markAllRead")}
            </button>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>

                  <p className={`mt-2 text-2xl font-bold ${item.valueStyle}`}>
                    {item.value}
                  </p>
                </div>

                <div className={`rounded-lg p-3 ${item.style}`}>
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Notifications */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("notifications.recentNotifications")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("notifications.recentNotificationsDescription")}
            </p>
          </div>

          {unreadCount > 0 && (
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              {unreadCount} {t("notifications.new")}
            </span>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {notifications.map((notification) => {
            const { icon: Icon, style } = types[notification.type];

            return (
              <div
                key={notification.id}
                className={`flex gap-4 px-5 py-5 ${
                  notification.read ? "bg-white" : "bg-blue-50/40"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${style}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-blue-950">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-red-600" />
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {notification.message}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {notification.time}
                    </span>
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-3 text-xs font-semibold text-blue-900 hover:text-red-600"
                    >
                      {t("notifications.markAsRead")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Notifications;