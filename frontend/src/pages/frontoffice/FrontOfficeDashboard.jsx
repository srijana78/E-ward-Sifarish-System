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
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const FrontOfficeDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await fetch(API, {
          headers: {
            Authorization: `Bearer ${
              token || localStorage.getItem("sifarish_token")
            }`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  const count = (statuses) =>
    applications.filter((app) => statuses.includes(app.status)).length;

  const pending = count(["submitted", "pending", "under_review"]);
  const verified = count(["verified"]);
  const rejected = count(["rejected"]);

  const stats = [
    {
      title: t("frontOfficeDashboard.totalApplications"),
      value: applications.length,
      icon: FileText,
    },
    {
      title: t("frontOfficeDashboard.pendingApplications"),
      value: pending,
      icon: Clock3,
    },
    {
      title: t("frontOfficeDashboard.verifiedApplications"),
      value: verified,
      icon: CheckCircle2,
    },
    {
      title: t("frontOfficeDashboard.newNotifications"),
      value: pending,
      icon: Bell,
    },
  ];

  const actions = [
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
      title: t("frontOfficeDashboard.viewNotifications"),
      description: t(
        "frontOfficeDashboard.viewNotificationsDescription"
      ),
      icon: Bell,
      path: "/frontoffice/notifications",
    },
    {
      title: t("frontOfficeDashboard.viewReports"),
      description: t("frontOfficeDashboard.viewReportsDescription"),
      icon: FileText,
      path: "/frontoffice/reports",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8">

      {/* Welcome */}
      <section className="rounded-2xl bg-blue-950 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-red-300">
              {t("frontOfficeDashboard.welcomeLabel")}
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {t("frontOfficeDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-blue-100">
              {t("frontOfficeDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold hover:bg-red-700"
          >
            <ClipboardCheck size={18} />
            {t("frontOfficeDashboard.reviewNow")}
          </button>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon }) => (
          <StatCard
            key={title}
            title={title}
            value={loading ? "..." : value}
            icon={icon}
          />
        ))}
      </section>

      {/* Recent Applications */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Header
          title={t("frontOfficeDashboard.recentApplications")}
          description={t(
            "frontOfficeDashboard.recentApplicationsDescription"
          )}
          action={t("frontOfficeDashboard.viewAll")}
          onClick={() => navigate("/frontoffice/pending")}
        />

        {loading ? (
          <Empty text="Loading applications..." />
        ) : applications.length === 0 ? (
          <Empty text="No applications found." />
        ) : (
          <div className="divide-y divide-slate-100">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        "Unknown Applicant"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {app.service}
                    </p>

                    <p className="text-xs text-slate-400">
                      {app.applicationNumber || app._id} •{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-blue-950">
          {t("frontOfficeDashboard.quickActions")}
        </h2>

        <p className="mt-1 mb-4 text-sm text-slate-500">
          {t("frontOfficeDashboard.quickActionsDescription")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map(
            ({ title, description, icon: Icon, path }) => (
              <button
                key={title}
                onClick={() => navigate(path)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex justify-between">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-slate-400 group-hover:text-red-600"
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

      {/* Work Summary */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold text-blue-950">
          {t("frontOfficeDashboard.workSummary")}
        </h2>

        <p className="mt-1 mb-5 text-sm text-slate-500">
          {t("frontOfficeDashboard.workSummaryDescription")}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title={t("frontOfficeDashboard.pendingReview")}
            value={pending}
            icon={Clock3}
          />

          <StatCard
            title={t("frontOfficeDashboard.completedToday")}
            value={verified}
            icon={CheckCircle2}
          />

          <StatCard
            title={t("frontOfficeDashboard.requiresAttention")}
            value={rejected}
            icon={AlertCircle}
          />
        </div>
      </section>
    </div>
  );
};

/* Reusable statistic card */
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

/* Reusable section header */
const Header = ({ title, description, action, onClick }) => (
  <div className="flex items-center justify-between border-b border-slate-200 p-5">
    <div>
      <h2 className="font-bold text-blue-950">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>

    <button
      onClick={onClick}
      className="text-sm font-semibold text-blue-900 hover:text-red-600"
    >
      {action}
    </button>
  </div>
);

/* Empty state */
const Empty = ({ text }) => (
  <p className="p-10 text-center text-sm text-slate-500">{text}</p>
);

/* Application status */
const StatusBadge = ({ status }) => {
  const styles = {
    verified: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
    under_review: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] || "bg-amber-50 text-amber-700"
      }`}
    >
      {(status || "submitted").replace("_", " ")}
    </span>
  );
};

export default FrontOfficeDashboard;