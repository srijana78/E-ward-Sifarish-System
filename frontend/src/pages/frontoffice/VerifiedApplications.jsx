
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

const API = "http://localhost:5000/api/applications";

const VerifiedApplications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH VERIFIED APPLICATIONS =================
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken =
          token || localStorage.getItem("sifarish_token");

        if (!authToken) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(`${API}/verified`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch verified applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error("Fetch verified applications error:", err);

        setError(
          err.message || "Failed to fetch verified applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  // ================= SEARCH =================
  const filteredApplications = applications.filter((app) => {
    const text = search.toLowerCase();

    return [
      app.applicationNumber,
      app._id,
      app.applicantDetails?.fullName,
      app.service,
    ].some((item) =>
      String(item || "").toLowerCase().includes(text)
    );
  });

  // ================= VERIFIED TODAY =================
  const today = new Date().toDateString();

  const verifiedToday = applications.filter((app) => {
    if (!app.updatedAt) return false;

    return new Date(app.updatedAt).toDateString() === today;
  }).length;

  // ================= DATE FORMAT =================
  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString()
      : "N/A";
  };

  // ================= STAT CARDS =================
  const cards = [
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
    <div className="mx-auto mt-9 max-w-7xl space-y-6">

      {/* HEADER */}
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

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* STATISTICS */}
      <section className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ title, value, icon: Icon, style }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {title}
                </p>

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

      {/* APPLICATION LIST */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* LIST HEADER */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("verifiedApplications.applicationList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t(
                "verifiedApplications.applicationListDescription"
              )}
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(
                "verifiedApplications.searchPlaceholder"
              )}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading verified applications...
            </p>
          </div>
        ) : filteredApplications.length > 0 ? (

          /* APPLICATIONS */
          <div className="divide-y divide-slate-100">
            {filteredApplications.map((app) => (
              <div
                key={app._id}
                className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center"
              >
                {/* APPLICATION INFO */}
                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        "Unknown Applicant"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service || "N/A"}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                      {" • "}
                      {t("verifiedApplications.verifiedOn")}{" "}
                      {formatDate(app.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* STATUS + BUTTON */}
                <div className="flex items-center gap-3">

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={14} />

                    {t("verifiedApplications.verified")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/frontoffice/application/${app._id}`
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
                  >
                    <Eye size={17} />

                    {t("verifiedApplications.view")}
                  </button>

                </div>
              </div>
            ))}
          </div>

        ) : (

          /* EMPTY STATE */
          <div className="py-14 text-center">

            <FileText
              size={38}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              {t("verifiedApplications.noApplications")}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "No matching applications found."
                : t(
                    "verifiedApplications.noApplicationsDescription"
                  )}
            </p>
          </div>
        )}

      </section>
    </div>
  );
};

export default VerifiedApplications;

