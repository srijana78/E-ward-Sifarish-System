import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  FileText,
  Eye,
  Clock3,
  User,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

function PendingApplications() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
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
            data.message || "Failed to fetch applications"
          );
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

  const filtered = applications.filter((app) =>
    [
      app.applicationNumber,
      app._id,
      app.applicantDetails?.fullName,
      app.service,
    ].some((field) =>
      String(field || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const today = new Date().toDateString();

  const newToday = applications.filter(
    (app) =>
      app.createdAt &&
      new Date(app.createdAt).toDateString() === today
  ).length;

  const stats = [
    {
      title: t("pendingApplications.totalPending"),
      value: applications.length,
      icon: Clock3,
      style: "bg-amber-50 text-amber-600",
    },
    {
      title: t("pendingApplications.newToday"),
      value: newToday,
      icon: FileText,
      style: "bg-blue-50 text-blue-900",
    },
    {
      title: t("pendingApplications.waitingReview"),
      value: applications.length,
      icon: User,
      style: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="mx-auto mt-9 max-w-7xl space-y-6">
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("pendingApplications.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("pendingApplications.title")}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {t("pendingApplications.description")}
        </p>
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ title, value, icon: Icon, style }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
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

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("pendingApplications.applicationList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t(
                "pendingApplications.applicationListDescription"
              )}
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
                "pendingApplications.searchPlaceholder"
              )}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-900"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-16">
            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

            <p className="mt-3 text-sm text-slate-500">
              {t("pendingApplications.loadingText")}
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-14 text-center">
            <FileText
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              {t("pendingApplications.noApplications")}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {search
                ? t("pendingApplications.noSearchResults")
                : t(
                    "pendingApplications.noApplicationsDescription"
                  )}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-4 p-5 hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        "Unknown Applicant"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id} •{" "}
                      {new Date(
                        app.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <Clock3 size={14} />
                    {t("pendingApplications.pending")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/frontoffice/application/${app._id}`
                      )
                    }
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50"
                  >
                    <Eye size={17} />
                    {t("pendingApplications.view")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PendingApplications;