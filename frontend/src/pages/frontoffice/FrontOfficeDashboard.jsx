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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API, {
      headers: {
        Authorization: `Bearer ${
          token || localStorage.getItem("sifarish_token")
        }`,
      },
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok) throw new Error(data.message);
        setApplications(data.applications || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const count = (statuses) =>
    applications.filter((a) => statuses.includes(a.status)).length;

  const pending = count(["submitted", "pending", "under_review"]);
  const verified = count(["verified"]);
  const rejected = count(["rejected"]);

  const stats = [
    [t("frontOfficeDashboard.totalApplications"), applications.length, FileText],
    [t("frontOfficeDashboard.pendingApplications"), pending, Clock3],
    [t("frontOfficeDashboard.verifiedApplications"), verified, CheckCircle2],
    [t("frontOfficeDashboard.newNotifications"), pending, Bell],
  ];

  const actions = [
    [
      t("frontOfficeDashboard.reviewApplications"),
      t("frontOfficeDashboard.reviewApplicationsDescription"),
      ClipboardCheck,
      "/frontoffice/pending",
    ],
    [
      t("frontOfficeDashboard.verifiedApplications"),
      t("frontOfficeDashboard.verifiedApplicationsDescription"),
      CheckCircle2,
      "/frontoffice/verified",
    ],
    [
      t("frontOfficeDashboard.viewNotifications"),
      t("frontOfficeDashboard.viewNotificationsDescription"),
      Bell,
      "/frontoffice/notifications",
    ],
    [
      t("frontOfficeDashboard.viewReports"),
      t("frontOfficeDashboard.viewReportsDescription"),
      FileText,
      "/frontoffice/reports",
    ],
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <section className="mt-10 rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold text-red-300">
              {t("frontOfficeDashboard.welcomeLabel")}
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {t("frontOfficeDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 text-sm text-blue-100">
              {t("frontOfficeDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            <ClipboardCheck size={18} />
            {t("frontOfficeDashboard.reviewNow")}
          </button>
        </div>
      </section>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, value, Icon]) => (
          <Card
            key={title}
            title={title}
            value={loading ? "..." : value}
            icon={Icon}
          />
        ))}
      </section>

      {/* Recent Applications */}
      <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("frontOfficeDashboard.recentApplications")}
            </h2>

            <p className="text-xs text-slate-500">
              {t("frontOfficeDashboard.recentApplicationsDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="font-semibold text-blue-900 hover:text-red-600"
          >
            {t("frontOfficeDashboard.viewAll")}
          </button>
        </div>

        <div className="divide-y">
          {loading ? (
            <Empty text="Loading applications..." />
          ) : applications.length ? (
            applications.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-blue-950">
                      {app.applicantDetails?.fullName || "Unknown Applicant"}
                    </p>

                    <p className="text-sm text-slate-500">{app.service}</p>

                    <p className="text-xs text-slate-400">
                      {app.applicationNumber || app._id} •{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <StatusBadge status={app.status} />
              </div>
            ))
          ) : (
            <Empty text="No applications found." />
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-blue-950">
          {t("frontOfficeDashboard.quickActions")}
        </h2>

        <p className="mb-4 text-sm text-slate-500">
          {t("frontOfficeDashboard.quickActionsDescription")}
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {actions.map(([title, description, Icon, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="group rounded-xl border bg-white p-5 text-left shadow-sm hover:shadow-md"
            >
              <div className="mb-4 flex justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                  <Icon size={20} />
                </div>

                <ArrowRight className="text-slate-400 group-hover:text-red-600" />
              </div>

              <h3 className="font-bold text-blue-950">{title}</h3>
              <p className="mt-2 text-xs text-slate-500">{description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Work Summary */}
      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-blue-950">
          {t("frontOfficeDashboard.workSummary")}
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          {t("frontOfficeDashboard.workSummaryDescription")}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card title={t("frontOfficeDashboard.pendingReview")} value={pending} icon={Clock3} />
          <Card title={t("frontOfficeDashboard.completedToday")} value={verified} icon={CheckCircle2} />
          <Card title={t("frontOfficeDashboard.requiresAttention")} value={rejected} icon={AlertCircle} />
        </div>
      </section>
    </div>
  );
};

const Card = ({ title, value, icon: Icon }) => (
  <div className="rounded-xl border bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-blue-950">{value}</p>
      </div>

      <div className="rounded-lg bg-slate-100 p-3 text-blue-950">
        <Icon size={21} />
      </div>
    </div>
  </div>
);

const Empty = ({ text }) => (
  <p className="p-8 text-center text-sm text-slate-500">{text}</p>
);

const StatusBadge = ({ status = "submitted" }) => {
  const colors = {
    verified: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
    under_review: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        colors[status] || "bg-amber-50 text-amber-700"
      }`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default FrontOfficeDashboard;