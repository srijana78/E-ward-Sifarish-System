import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  FileText,
  Search,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const SecretaryApplications = () => {
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
          data = {};
        }

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to load applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
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

  const stats = [
    {
      label: "total",
      value: applications.length,
      icon: FileText,
    },
    {
      label: "waitingReview",
      value: applications.filter(
        (app) => app.status === "verified"
      ).length,
      icon: Clock3,
    },
    {
      label: "recommended",
      value: applications.filter(
        (app) => app.status === "recommended"
      ).length,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
          {t("secretaryApplications.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {t("secretaryApplications.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          {t("secretaryApplications.description")}
        </p>
      </section>

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
                  {t(`secretaryApplications.${label}`)}
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

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* Application List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("secretaryApplications.listTitle")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("secretaryApplications.listDescription")}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("secretaryApplications.search")}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-900 focus:bg-white"
            />
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("secretaryApplications.loading")} />
          ) : filtered.length === 0 ? (
            <Empty
              text={
                search
                  ? t("secretaryApplications.noSearchResults")
                  : t("secretaryApplications.noApplications")
              }
            />
          ) : (
            filtered.map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                t={t}
                onReview={() =>
                  navigate(
                    `/secretary/application/${app._id}`
                  )
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
  <div className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
        <FileText size={22} />
      </div>

      <div>
        <h3 className="font-bold text-blue-950">
          {app.applicantDetails?.fullName ||
            t("secretaryApplications.unknownApplicant")}
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

    <div className="flex items-center justify-between gap-3 lg:justify-end">
      <StatusBadge status={app.status} t={t} />

      <button
        onClick={onReview}
        className="flex items-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
      >
        {t("secretaryApplications.review")}
        <ArrowRight size={17} />
      </button>
    </div>
  </div>
);

const StatusBadge = ({ status, t }) => {
  const styles = {
    verified: "bg-blue-50 text-blue-700",
    recommended: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {t(`secretaryApplications.status.${status}`)}
    </span>
  );
};

const Empty = ({ text }) => (
  <div className="p-12 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default SecretaryApplications;