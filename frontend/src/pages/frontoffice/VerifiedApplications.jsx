
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Search,
  FileText,
  CheckCircle2,
  CalendarDays,
  Eye,
} from "lucide-react";

const VerifiedApplications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Temporary data
  // Later this data will come from the backend
  const applications = [
    {
      id: "EW-2026-003",
      applicant: "Hari Karki",
      service: "Business Recommendation",
      submittedDate: "2026-09-02",
      verifiedDate: "2026-09-03",
    },
    {
      id: "EW-2026-005",
      applicant: "Bishal Thapa",
      service: "Residence Recommendation",
      submittedDate: "2026-09-01",
      verifiedDate: "2026-09-02",
    },
    {
      id: "EW-2026-006",
      applicant: "Mina Rai",
      service: "Education Recommendation",
      submittedDate: "2026-08-30",
      verifiedDate: "2026-09-01",
    },
  ];

  // Search applications
  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase();

    return (
      app.id.toLowerCase().includes(searchText) ||
      app.applicant.toLowerCase().includes(searchText) ||
      app.service.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 mt-9">
      {/* Header */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("verifiedApplications.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("verifiedApplications.title")}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {t("verifiedApplications.description")}
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Verified */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("verifiedApplications.totalVerified")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                {applications.length}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>

        {/* Verified Today */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("verifiedApplications.verifiedToday")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                2
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
              <CalendarDays size={21} />
            </div>
          </div>
        </div>

        {/* Completed Applications */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("verifiedApplications.completedApplications")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                {applications.length}
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 p-3 text-blue-950">
              <FileText size={21} />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Applications List */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("verifiedApplications.applicationList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("verifiedApplications.applicationListDescription")}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("verifiedApplications.searchPlaceholder")}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Applications */}
        <div className="divide-y divide-slate-100">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Application Information */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-blue-950">
                      {app.applicant}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>{app.id}</span>
                      <span>•</span>

                      <span>
                        {t("verifiedApplications.verifiedOn")}{" "}
                        {app.verifiedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status + Action */}
                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <CheckCircle2 size={14} />
                    {t("verifiedApplications.verified")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/frontoffice/application/${app.id}`)
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <Eye size={17} />
                    {t("verifiedApplications.view")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="px-5 py-14 text-center">
              <FileText
                size={38}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-sm font-semibold text-slate-700">
                {t("verifiedApplications.noApplications")}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {t("verifiedApplications.noApplicationsDescription")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VerifiedApplications;
