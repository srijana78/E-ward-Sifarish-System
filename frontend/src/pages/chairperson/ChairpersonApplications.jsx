import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Search,
  ArrowRight,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const ChairpersonApplications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
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

  const filtered = applications.filter((app) => {
    const text = search.toLowerCase();

    return [
      app.applicantDetails?.fullName,
      app.applicationNumber,
      app.service,
    ].some((item) => item?.toLowerCase().includes(text));
  });

  const stats = [
    ["recommended", count("recommended"), Clock3],
    ["approved", count("approved"), CheckCircle2],
    ["rejected", count("rejected"), XCircle],
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <p className="text-sm font-semibold text-red-300">
          {t("chairpersonApplications.label")}
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          {t("chairpersonApplications.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-blue-100">
          {t("chairpersonApplications.description")}
        </p>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map(([name, value, Icon]) => (
          <div
            key={name}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {t(`chairpersonApplications.${name}`)}
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                <Icon size={21} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* APPLICATION LIST */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* LIST HEADER */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("chairpersonApplications.listTitle")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("chairpersonApplications.listDescription")}
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("chairpersonApplications.search")}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("chairpersonApplications.loading")} />
          ) : filtered.length === 0 ? (
            <Empty text={t("chairpersonApplications.noApplications")} />
          ) : (
            filtered.map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* APPLICATION INFO */}
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        t("chairpersonApplications.unknownApplicant")}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                      {" • "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACTION */}
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={app.status} t={t} />

                  <button
                    onClick={() =>
                      navigate(`/chairperson/application/${app._id}`)
                    }
                    className="flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
                  >
                    {t("chairpersonApplications.review")}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const StatusBadge = ({ status, t }) => {
  const styles = {
    recommended: "bg-amber-50 text-amber-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {t(`chairpersonApplications.status.${status}`)}
    </span>
  );
};

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonApplications;