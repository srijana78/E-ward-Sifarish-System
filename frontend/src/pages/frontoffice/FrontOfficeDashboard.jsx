import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FileText,
  Clock3,
  CheckCircle2,
  Bell,
  ArrowRight,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const FrontOfficeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const authToken =
        token ||
        localStorage.getItem("sifarish_token") ||
        localStorage.getItem("token");

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const text = await res.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(t("frontOfficeDashboard.invalidResponse"));
      }

      if (!res.ok) {
        throw new Error(
          data.message || t("frontOfficeDashboard.loadFailed")
        );
      }

      setApplications(data.applications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [token]);

  // Applications currently waiting for Front Office
  const pendingApplications = applications.filter(
    (app) =>
      app.currentStage === "frontoffice" &&
      app.status !== "rejected"
  );

  // Applications already verified by Front Office
  const verifiedApplications = applications.filter(
    (app) => app.status === "verified"
  );

  const stats = [
    {
      title: t("frontOfficeDashboard.totalApplications"),
      value: applications.length,
      icon: FileText,
    },
    {
      title: t("frontOfficeDashboard.pendingApplications"),
      value: pendingApplications.length,
      icon: Clock3,
    },
    {
      title: t("frontOfficeDashboard.verifiedApplications"),
      value: verifiedApplications.length,
      icon: CheckCircle2,
    },
    {
      title: t("frontOfficeDashboard.notifications"),
      value: pendingApplications.length,
      icon: Bell,
    },
  ];

  const quickActions = [
    {
      title: t("frontOfficeDashboard.reviewApplications"),
      description: t(
        "frontOfficeDashboard.reviewApplicationsDescription"
      ),
      icon: ClipboardCheck,
      path: "/frontoffice/pending",
    },
    {
      title: t("frontOfficeDashboard.verifiedApplications"),
      description: t(
        "frontOfficeDashboard.verifiedApplicationsDescription"
      ),
      icon: CheckCircle2,
      path: "/frontoffice/verified",
    },
    {
      title: t("frontOfficeDashboard.notifications"),
      description: t(
        "frontOfficeDashboard.notificationsDescription"
      ),
      icon: Bell,
      path: "/frontoffice/notifications",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-6 sm:py-8">
      {/* Welcome */}
      <section className="rounded-2xl bg-blue-950 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-red-300">
              {t("frontOfficeDashboard.welcomeLabel")}
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {t("frontOfficeDashboard.welcomeTitle")}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
              {t("frontOfficeDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold transition hover:bg-red-700"
          >
            <ClipboardCheck size={18} />
            {t("frontOfficeDashboard.reviewNow")}
          </button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>

          <button
            onClick={loadApplications}
            className="flex items-center gap-2 self-start font-semibold hover:text-red-900"
          >
            <RefreshCw size={15} />
            {t("frontOfficeDashboard.retry")}
          </button>
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <StatCard
            key={title}
            title={title}
            value={loading ? "..." : value}
            icon={Icon}
          />
        ))}
      </section>

      {/* Pending Work */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <SectionHeader
          title={t("frontOfficeDashboard.pendingTitle")}
          description={t(
            "frontOfficeDashboard.pendingDescription"
          )}
          action={t("frontOfficeDashboard.viewAll")}
          onClick={() => navigate("/frontoffice/pending")}
        />

        {loading ? (
          <EmptyState text={t("frontOfficeDashboard.loading")} />
        ) : pendingApplications.length === 0 ? (
          <EmptyState text={t("frontOfficeDashboard.noPending")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingApplications.slice(0, 5).map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                onClick={() =>
                  navigate(`/frontoffice/applications/${app._id}`)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-blue-950">
          {t("frontOfficeDashboard.quickActions")}
        </h2>

        <p className="mb-4 mt-1 text-sm text-slate-500">
          {t("frontOfficeDashboard.quickActionsDescription")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map(
            ({ title, description, icon: Icon, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                  />
                </div>

                <h3 className="mt-4 font-bold text-blue-950">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {description}
                </p>
              </button>
            )
          )}
        </div>
      </section>
    </div>
  );
};

/* Statistic Card */
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <p className="mt-2 text-2xl font-bold text-blue-950">
          {value}
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
        <Icon size={21} />
      </div>
    </div>
  </div>
);

/* Section Header */
const SectionHeader = ({
  title,
  description,
  action,
  onClick,
}) => (
  <div className="flex items-center justify-between border-b border-slate-200 p-5">
    <div>
      <h2 className="font-bold text-blue-950">{title}</h2>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>

    <button
      onClick={onClick}
      className="text-sm font-semibold text-blue-900 hover:text-red-600"
    >
      {action}
    </button>
  </div>
);

/* Application Row */
const ApplicationRow = ({ app, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full flex-col gap-4 p-5 text-left transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
  >
    <div className="flex items-center gap-4">
      <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
        <FileText size={20} />
      </div>

      <div className="min-w-0">
        <p className="truncate font-semibold text-blue-950">
          {app.applicantDetails?.fullName || "Unknown Applicant"}
        </p>

        <p className="text-sm text-slate-500">
          {app.service || "-"}
        </p>

        <p className="text-xs text-slate-400">
          {app.applicationNumber || app._id}
          {" • "}
          {app.createdAt
            ? new Date(app.createdAt).toLocaleDateString()
            : "-"}
        </p>
      </div>
    </div>

    <StatusBadge status={app.status} />
  </button>
);

/* Empty State */
const EmptyState = ({ text }) => (
  <p className="p-10 text-center text-sm text-slate-500">
    {text}
  </p>
);

/* Status Badge */
const StatusBadge = ({ status }) => {
  const styles = {
    submitted: "bg-amber-50 text-amber-700",
    pending: "bg-amber-50 text-amber-700",
    under_review: "bg-blue-50 text-blue-700",
    verified: "bg-green-50 text-green-700",
    recommended: "bg-purple-50 text-purple-700",
    approved: "bg-emerald-50 text-emerald-700",
    rejected: "bg-red-50 text-red-700",
  };

  const label = (status || "submitted").replace("_", " ");

  return (
    <span
      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {label}
    </span>
  );
};

export default FrontOfficeDashboard;