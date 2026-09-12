import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  ClipboardCheck,
  FileCheck2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const ChairpersonDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API}/chairperson`, {
          headers: {
            Authorization: `Bearer ${
              token || localStorage.getItem("sifarish_token")
            }`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load applications");
        }

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const count = (status) =>
    applications.filter((app) => app.status === status).length;

  const stats = [
    ["waitingDecision", count("recommended"), Clock3],
    ["approved", count("approved"), CheckCircle2],
    ["rejected", count("rejected"), XCircle],
    ["total", applications.length, FileText],
  ];

  const pending = applications.filter(
    (app) => app.status === "recommended"
  );

  const actions = [
    [
      "reviewApplications",
      "reviewApplicationsDescription",
      ClipboardCheck,
      "/chairperson/applications",
    ],
    [
      "approvedApplications",
      "approvedApplicationsDescription",
      FileCheck2,
      "/chairperson/approved",
    ],
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-red-300">
              <ShieldCheck size={18} />

              <span className="text-sm font-semibold">
                {t("chairpersonDashboard.label")}
              </span>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {t("chairpersonDashboard.title")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              {t("chairpersonDashboard.description")}
            </p>
          </div>

          <button
            onClick={() => navigate("/chairperson/applications")}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            <ClipboardCheck size={18} />

            {t("chairpersonDashboard.reviewNow")}
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([name, value, Icon]) => (
          <StatCard
            key={name}
            title={t(`chairpersonDashboard.${name}`)}
            value={loading ? "..." : value}
            Icon={Icon}
          />
        ))}
      </section>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* APPLICATIONS WAITING */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("chairpersonDashboard.pendingTitle")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("chairpersonDashboard.pendingDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/chairperson/applications")}
            className="text-sm font-semibold text-blue-900 hover:text-red-600"
          >
            {t("chairpersonDashboard.viewAll")}
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("chairpersonDashboard.loading")} />
          ) : pending.length === 0 ? (
            <Empty text={t("chairpersonDashboard.noApplications")} />
          ) : (
            pending.slice(0, 5).map((app) => (
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
                        t("chairpersonDashboard.unknownApplicant")}
                    </p>

                    <p className="text-sm text-slate-500">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/chairperson/application/${app._id}`)
                  }
                  className="flex items-center gap-2 self-start rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 sm:self-auto"
                >
                  {t("chairpersonDashboard.review")}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="font-bold text-blue-950">
          {t("chairpersonDashboard.quickActions")}
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {actions.map(([title, description, Icon, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                  <Icon size={21} />
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400 group-hover:text-red-600"
                />
              </div>

              <h3 className="mt-4 font-bold text-blue-950">
                {t(`chairpersonDashboard.${title}`)}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {t(`chairpersonDashboard.${description}`)}
              </p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, value, Icon }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
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

const Empty = ({ text }) => (
  <div className="p-8 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonDashboard;