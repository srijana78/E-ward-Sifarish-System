import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock3,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const getToken = (token) =>
  token ||
  localStorage.getItem("sifarish_token") ||
  localStorage.getItem("token");

const SecretaryDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, user } = useAuth();

  const [pending, setPending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const headers = {
          Authorization: `Bearer ${getToken(token)}`,
        };

        const [pendingRes, recommendedRes] = await Promise.all([
          fetch(API, { headers }),
          fetch(`${API}/secretary/recommended`, { headers }),
        ]);

        const [pendingData, recommendedData] = await Promise.all([
          pendingRes.json(),
          recommendedRes.json(),
        ]);

        if (!pendingRes.ok) {
          throw new Error(
            pendingData.message || "Failed to load applications"
          );
        }

        if (!recommendedRes.ok) {
          throw new Error(
            recommendedData.message ||
              "Failed to load recommended applications"
          );
        }

        setPending(pendingData.applications || []);
        setRecommended(recommendedData.applications || []);
      } catch (err) {
        console.error("Secretary dashboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  const stats = [
    {
      label: "total",
      value: pending.length + recommended.length,
      icon: FileText,
    },
    {
      label: "waitingReview",
      value: pending.length,
      icon: Clock3,
    },
    {
      label: "recommended",
      value: recommended.length,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <p className="text-sm font-semibold text-red-300">
          {t("secretaryDashboard.welcome")}
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {user?.name || t("secretaryDashboard.secretary")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          {t("secretaryDashboard.description")}
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Stats */}
      <section className="grid gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {t(`secretaryDashboard.${label}`)}
                </p>

                <p className="mt-3 text-3xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3.5 text-blue-900">
                <Icon size={23} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Pending Applications */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("secretaryDashboard.pendingTitle")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("secretaryDashboard.pendingDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/secretary/applications")}
            className="hidden items-center gap-1 text-sm font-semibold text-blue-900 hover:text-red-600 sm:flex"
          >
            {t("secretaryDashboard.viewAll")}
            <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <Empty text={t("secretaryDashboard.loading")} />
        ) : pending.length === 0 ? (
          <Empty text={t("secretaryDashboard.noPending")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {pending.slice(0, 5).map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                onClick={() =>
                  navigate(`/secretary/application/${app._id}`)
                }
                t={t}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/secretary/applications")}
          className="flex w-full items-center justify-center gap-2 border-t border-slate-100 p-4 text-sm font-semibold text-blue-900 hover:bg-slate-50 sm:hidden"
        >
          {t("secretaryDashboard.viewAll")}
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Recommended */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("secretaryDashboard.recommendedTitle")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("secretaryDashboard.recommendedDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/secretary/recommended")}
            className="hidden items-center gap-1 text-sm font-semibold text-blue-900 hover:text-red-600 sm:flex"
          >
            {t("secretaryDashboard.viewAll")}
            <ArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <Empty text={t("secretaryDashboard.loading")} />
        ) : recommended.length === 0 ? (
          <Empty text={t("secretaryDashboard.noRecommended")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {recommended.slice(0, 5).map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                recommended
                onClick={() =>
                  navigate(`/secretary/application/${app._id}`)
                }
                t={t}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/secretary/recommended")}
          className="flex w-full items-center justify-center gap-2 border-t border-slate-100 p-4 text-sm font-semibold text-blue-900 hover:bg-slate-50 sm:hidden"
        >
          {t("secretaryDashboard.viewAll")}
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
};

const ApplicationRow = ({ app, recommended, onClick, t }) => (
  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          recommended
            ? "bg-green-50 text-green-700"
            : "bg-blue-50 text-blue-900"
        }`}
      >
        {recommended ? (
          <CheckCircle2 size={19} />
        ) : (
          <FileText size={19} />
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate font-semibold text-blue-950">
          {app.applicantDetails?.fullName ||
            t("secretaryDashboard.unknown")}
        </p>

        <p className="text-sm text-slate-500">
          {app.service}
        </p>

        <p className="text-xs text-slate-400">
          {app.applicationNumber || app._id}
        </p>
      </div>
    </div>

    <div className="flex items-center justify-between gap-3 sm:justify-end">
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          recommended
            ? "bg-green-50 text-green-700"
            : "bg-blue-50 text-blue-700"
        }`}
      >
        {recommended
          ? t("secretaryDashboard.recommended")
          : t("secretaryDashboard.pending")}
      </span>

      <button
        onClick={onClick}
        className="flex items-center gap-1.5 rounded-lg bg-blue-950 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-900"
      >
        {t("secretaryDashboard.view")}
        <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default SecretaryDashboard;