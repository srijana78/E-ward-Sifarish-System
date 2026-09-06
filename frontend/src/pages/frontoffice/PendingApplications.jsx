
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Search,
  FileText,
  Eye,
  Clock3,
  User,
} from "lucide-react";

const PendingApplications = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Temporary data
  // Later this will come from the backend
  const applications = [
    {
      id: "EW-2026-001",
      applicant: "Ram Sharma",
      service: "Residence Recommendation",
      date: "2026-09-04",
      status: "Pending",
    },
    {
      id: "EW-2026-002",
      applicant: "Sita Thapa",
      service: "Personal & Civil Recommendation",
      date: "2026-09-03",
      status: "Pending",
    },
    {
      id: "EW-2026-004",
      applicant: "Gita Rai",
      service: "Education Recommendation",
      date: "2026-09-01",
      status: "Pending",
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
          {t("pendingApplications.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("pendingApplications.title")}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {t("pendingApplications.description")}
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Pending */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("pendingApplications.totalPending")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                {applications.length}
              </p>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        {/* New Today */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("pendingApplications.newToday")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                2
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
              <FileText size={21} />
            </div>
          </div>
        </div>

        {/* Waiting Review */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                {t("pendingApplications.waitingReview")}
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-950">
                {applications.length}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <User size={21} />
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("pendingApplications.applicationList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("pendingApplications.applicationListDescription")}
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
              placeholder={t("pendingApplications.searchPlaceholder")}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Application List */}
        <div className="divide-y divide-slate-100">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Application Information */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-blue-950">
                      {app.applicant}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span>{app.id}</span>
                      <span>•</span>
                      <span>{app.date}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <Clock3 size={14} />
                    {t("pendingApplications.pending")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/frontoffice/application/${app.id}`)
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-900 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <Eye size={17} />
                    {t("pendingApplications.view")}
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
                {t("pendingApplications.noApplications")}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {t("pendingApplications.noApplicationsDescription")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PendingApplications;
