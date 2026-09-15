import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Search,
  ArrowRight,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const getToken = (token) =>
  token ||
  localStorage.getItem("sifarish_token") ||
  localStorage.getItem("token");

const ChairpersonApplications = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await fetch(API, {
          headers: {
            Authorization: `Bearer ${getToken(token)}`,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            data.message || `Failed to load applications (${res.status})`
          );
        }

        setApplications(
          (data.applications || []).filter(
            (app) =>
              app.status === "recommended" &&
              app.currentStage === "chairperson"
          )
        );
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  const filtered = applications.filter((app) => {
    const query = search.toLowerCase();

    return [
      app.applicantDetails?.fullName,
      app.applicationNumber,
      app.service,
    ].some((value) =>
      String(value || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
          {t("chairpersonApplications.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {t("chairpersonApplications.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          {t("chairpersonApplications.description")}
        </p>
      </section>

      {/* Summary */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
          <Clock3 size={23} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {t("chairpersonApplications.waitingDecision")}
          </p>

          <p className="text-2xl font-bold text-blue-950">
            {loading ? "..." : applications.length}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* Applications */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("chairpersonApplications.listTitle")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("chairpersonApplications.listDescription")}
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("chairpersonApplications.search")}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900 focus:bg-white"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("chairpersonApplications.loading")} />
          ) : filtered.length === 0 ? (
            <Empty
              text={
                search
                  ? t("chairpersonApplications.noSearchResults")
                  : t("chairpersonApplications.noApplications")
              }
            />
          ) : (
            filtered.map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                t={t}
                onReview={() =>
                  navigate(`/chairperson/application/${app._id}`)
                }
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const ApplicationRow = ({ app, t, onReview }) => (
  <div className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
        <FileText size={22} />
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-bold text-blue-950">
          {app.applicantDetails?.fullName ||
            t("chairpersonApplications.unknownApplicant")}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {app.service}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {app.applicationNumber || app._id}
          {" • "}
          {new Date(app.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    <button
      onClick={onReview}
      className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
    >
      {t("chairpersonApplications.review")}
      <ArrowRight size={17} />
    </button>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-12 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonApplications;