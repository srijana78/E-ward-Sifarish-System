import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bell,
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const Notifications = () => {
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authToken = token || localStorage.getItem("sifarish_token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load notifications");
        }

        setApplications(data.applications || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [authToken]);

  const notifications = applications
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .map((app) => {
      const name =
        app.applicantDetails?.fullName || "Unknown Applicant";

      if (app.status === "verified") {
        return {
          id: app._id,
          title: "Application Verified",
          message: `${name}'s application has been verified.`,
          time: app.updatedAt,
          type: "verified",
        };
      }

      if (app.status === "rejected") {
        return {
          id: app._id,
          title: "Application Rejected",
          message: `${name}'s application requires attention.`,
          time: app.updatedAt,
          type: "rejected",
        };
      }

      return {
        id: app._id,
        title: "New Application Received",
        message: `${name} submitted a ${app.service} application.`,
        time: app.createdAt,
        type: "pending",
      };
    });

  const types = {
    verified: {
      icon: CheckCircle2,
      style: "bg-green-50 text-green-600",
    },
    rejected: {
      icon: AlertCircle,
      style: "bg-red-50 text-red-600",
    },
    pending: {
      icon: Clock3,
      style: "bg-amber-50 text-amber-600",
    },
  };

  const formatTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString();
  };

  return (
    <div className="mx-auto mt-9 max-w-6xl space-y-6">
      {/* HEADER */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("notifications.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("notifications.title")}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {t("notifications.description")}
        </p>
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title={t("notifications.total")}
          value={applications.length}
          icon={Bell}
          color="bg-blue-50 text-blue-900"
        />

        <StatCard
          title="Pending"
          value={
            applications.filter((app) =>
              ["submitted", "pending", "under_review"].includes(
                app.status
              )
            ).length
          }
          icon={Clock3}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Verified"
          value={
            applications.filter(
              (app) => app.status === "verified"
            ).length
          }
          icon={CheckCircle2}
          color="bg-green-50 text-green-600"
        />
      </section>

      {/* NOTIFICATIONS */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-blue-950">
            {t("notifications.recentNotifications")}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {t("notifications.recentNotificationsDescription")}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-16">
            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

            <p className="mt-3 text-sm text-slate-500">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center">
            <Bell
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-sm text-slate-500">
              No notifications found.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => {
              const { icon: Icon, style } =
                types[notification.type];

              return (
                <div
                  key={notification.id}
                  className="flex gap-4 px-5 py-5 hover:bg-slate-50"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${style}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-blue-950">
                          {notification.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {notification.message}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400">
                        {formatTime(notification.time)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <p className="mt-2 text-2xl font-bold text-blue-950">
          {value}
        </p>
      </div>

      <div className={`rounded-lg p-3 ${color}`}>
        <Icon size={21} />
      </div>
    </div>
  </div>
);

export default Notifications;