import { useEffect, useState } from "react";
import { Bell, CheckCheck, FileCheck2, XCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BASE_API = import.meta.env.VITE_API_URL;

const SecretaryNotifications = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const authToken =
    token ||
    localStorage.getItem("sifarish_token") ||
    localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_API}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notifications");
      }

      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Notification error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `${BASE_API}/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) return;

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `${BASE_API}/api/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) return;

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const openApplication = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }

    if (notification.application?._id) {
      navigate(`/secretary/application/${notification.application._id}`);
    }
  };

  const getIcon = (type) => {
    if (type === "recommended") return FileCheck2;
    if (type === "approved") return CheckCircle2;
    if (type === "rejected") return XCircle;
    return Bell;
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-red-600">
            {t("secretaryNotifications.label")}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-blue-950">
            {t("secretaryNotifications.title")}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {t("secretaryNotifications.description")}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900"
          >
            <CheckCheck size={17} />
            {t("secretaryNotifications.markAll")}
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            {t("secretaryNotifications.loading")}
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell
              size={42}
              className="mx-auto mb-3 text-slate-300"
            />

            <p className="font-medium text-slate-600">
              {t("secretaryNotifications.empty")}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const Icon = getIcon(notification.type);

              return (
                <div
                  key={notification._id}
                  onClick={() => openApplication(notification)}
                  className={`flex gap-4 p-5 transition ${
                    notification.application?._id
                      ? "cursor-pointer hover:bg-slate-50"
                      : ""
                  } ${
                    !notification.read
                      ? "bg-blue-50/40"
                      : "bg-white"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      notification.read
                        ? "bg-slate-100 text-slate-500"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-sm ${
                          notification.read
                            ? "font-medium text-slate-700"
                            : "font-bold text-slate-900"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {notification.message}
                    </p>

                    {notification.application && (
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">
                          {notification.application.applicationNumber}
                        </span>

                        <span className="rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700">
                          {notification.application.service}
                        </span>
                      </div>
                    )}

                    {notification.createdAt && (
                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretaryNotifications;