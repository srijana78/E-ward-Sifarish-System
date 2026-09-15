import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bell,
  CheckCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/notifications`;

const getToken = (token) =>
  token ||
  localStorage.getItem("sifarish_token") ||
  localStorage.getItem("token");

const ChairpersonNotifications = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    Authorization: `Bearer ${getToken(token)}`,
  };

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(API, { headers });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || t("chairpersonNotifications.loadError")
        );
      }

      setNotifications(data.notifications || []);
    } catch (err) {
      console.error(err);
      setError(
        err.message || t("chairpersonNotifications.loadError")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`${API}/${id}/read`, {
        method: "PATCH",
        headers,
      });

      if (!res.ok) return;

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch(`${API}/read-all`, {
        method: "PATCH",
        headers,
      });

      if (!res.ok) return;

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          read: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const openApplication = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }

    const applicationId = notification.application?._id;

    if (applicationId) {
      navigate(`/chairperson/application/${applicationId}`);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-300">
              <Bell size={20} />

              <span className="text-sm font-semibold uppercase">
                {t("chairpersonNotifications.label")}
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              {t("chairpersonNotifications.title")}
            </h1>

            <p className="mt-2 text-sm text-blue-100 sm:text-base">
              {t("chairpersonNotifications.description")}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 hover:bg-blue-50"
            >
              <CheckCheck size={17} />

              <span className="hidden sm:inline">
                {t("chairpersonNotifications.markAll")}
              </span>
            </button>
          )}
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Notifications */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        {loading ? (
          <Empty text={t("chairpersonNotifications.loading")} />
        ) : notifications.length === 0 ? (
          <Empty text={t("chairpersonNotifications.empty")} />
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              t={t}
              onRead={markAsRead}
              onOpen={openApplication}
            />
          ))
        )}
      </section>
    </div>
  );
};

const NotificationItem = ({
  notification,
  t,
  onRead,
  onOpen,
}) => {
  const unread = !notification.read;
  const hasApplication = Boolean(
    notification.application?._id
  );

  return (
    <div
      className={`flex flex-col gap-4 border-b border-slate-100 p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between ${
        unread ? "bg-blue-50/50" : ""
      }`}
    >
      <div className="flex min-w-0 gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            unread
              ? "bg-blue-100 text-blue-900"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          <Bell size={18} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-blue-950">
              {notification.title}
            </h3>

            {unread && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                {t("chairpersonNotifications.new")}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {notification.message}
          </p>

          {notification.createdAt && (
            <p className="mt-1 text-xs text-slate-400">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        {unread && (
          <button
            onClick={() => onRead(notification._id)}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-100"
          >
            {t("chairpersonNotifications.markRead")}
          </button>
        )}

        {hasApplication && (
          <button
            onClick={() => onOpen(notification)}
            className="flex items-center gap-1 rounded-lg bg-blue-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-900"
          >
            {t("chairpersonNotifications.view")}
            <ArrowRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="p-12 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonNotifications;