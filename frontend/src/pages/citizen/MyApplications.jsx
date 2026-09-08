import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, FileText, Eye } from "lucide-react";

const MyApplications = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  // Temporary sample data
  const applications = [
    {
      id: "EW-2026-001",
      service: "Residence Recommendation",
      date: "2026-09-02",
      status: "Pending Review",
    },
    {
      id: "EW-2026-002",
      service: "Personal & Civil Recommendation",
      date: "2026-08-28",
      status: "Approved",
    },
  ];

  const filteredApplications = applications.filter(
    (app) =>
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-6">

      {/* Header */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          {t("myApplications.label")}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          {t("myApplications.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          {t("myApplications.description")}
        </p>
      </section>

      {/* Search */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="relative max-w-xl">
          <Search
            size={19}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("myApplications.searchPlaceholder")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </section>

      {/* Applications */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
            {t("myApplications.applicationList")}
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="border-b border-slate-100 p-5 last:border-b-0 sm:p-6"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                {/* Application Info */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      {app.service}
                    </h3>

                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span>{app.id}</span>
                      <span>•</span>
                      <span>{app.date}</span>
                    </div>
                  </div>
                </div>

                {/* Status + Action */}
                <div className="flex items-center gap-3 md:shrink-0">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      app.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {app.status}
                  </span>

                  <button
                    onClick={() =>
                      alert(`Application: ${app.id}`)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-slate-50"
                  >
                    <Eye size={16} />
                    {t("myApplications.view")}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredApplications.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <FileText size={28} className="text-slate-400" />
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                {t("myApplications.noApplications")}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {t("myApplications.noApplicationsDescription")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyApplications;