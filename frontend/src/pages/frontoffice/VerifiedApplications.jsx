import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  Search,
  FileText,
  CheckCircle2,
  CalendarDays,
  Eye,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

function VerifiedApplications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

        const res = await fetch(`${API}/frontoffice/verified`, {
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
            data.message || "Failed to fetch verified applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  const filtered = applications.filter((app) =>
    [
      app.applicationNumber,
      app._id,
      app.applicantDetails?.fullName,
      app.service,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const today = new Date().toDateString();

  const verifiedToday = applications.filter(
    (app) =>
      app.updatedAt &&
      new Date(app.updatedAt).toDateString() === today
  ).length;

  const stats = [
    {
      title: t("verifiedApplications.totalVerified"),
      value: applications.length,
      icon: CheckCircle2,
      style: "bg-green-50 text-green-600",
    },
    {
      title: t("verifiedApplications.verifiedToday"),
      value: verifiedToday,
      icon: CalendarDays,
      style: "bg-blue-50 text-blue-900",
    },
    {
      title: t("verifiedApplications.completedApplications"),
      value: applications.length,
      icon: FileText,
      style: "bg-slate-100 text-blue-950",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8">
      {/* Header */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("verifiedApplications.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("verifiedApplications.title")}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {t("verifiedApplications.description")}
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ title, value, icon: Icon, style }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{title}</p>

                <p className="mt-2 text-2xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className={`rounded-lg p-3 ${style}`}>
                <Icon size={21} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Application List */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        {/* Search */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("verifiedApplications.applicationList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("verifiedApplications.applicationListDescription")}
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                "verifiedApplications.searchPlaceholder"
              )}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Loading t={t} />
        ) : filtered.length === 0 ? (
          <Empty search={search} t={t} />
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                navigate={navigate}
                t={t}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* Application Row */
const ApplicationRow = ({ app, navigate, t }) => (
  <div className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center">
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
        <FileText size={20} />
      </div>

      <div>
        <h3 className="font-bold text-blue-950">
          {app.applicantDetails?.fullName || "Unknown Applicant"}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {app.service || "N/A"}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {app.applicationNumber || app._id} •{" "}
          {t("verifiedApplications.verifiedOn")}{" "}
          {app.updatedAt
            ? new Date(app.updatedAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
        <CheckCircle2 size={14} />
        {t("verifiedApplications.verified")}
      </span>

      <button
        onClick={() =>
          navigate(`/frontoffice/application/${app._id}`)
        }
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
      >
        <Eye size={17} />
        {t("verifiedApplications.view")}
      </button>
    </div>
  </div>
);

/* Loading */
const Loading = ({ t }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <Loader2 size={32} className="animate-spin text-blue-700" />

    <p className="mt-4 text-sm text-slate-500">
      {t("verifiedApplications.loadingText")}
    </p>
  </div>
);

/* Empty */
const Empty = ({ search, t }) => (
  <div className="py-14 text-center">
    <FileText size={38} className="mx-auto text-slate-300" />

    <h3 className="mt-4 font-semibold text-slate-700">
      {t("verifiedApplications.noApplications")}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      {search
        ? t("verifiedApplications.noSearchResults")
        : t("verifiedApplications.noApplicationsDescription")}
    </p>
  </div>
);

export default VerifiedApplications;