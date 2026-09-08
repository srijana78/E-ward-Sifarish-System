import React from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const Reports = () => {
  const { t } = useTranslation();

  const statistics = [
    {
      title: t("reports.totalApplications"),
      value: "24",
      icon: FileText,
      iconStyle: "bg-blue-50 text-blue-700",
    },
    {
      title: t("reports.pendingApplications"),
      value: "8",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: t("reports.verifiedApplications"),
      value: "12",
      icon: CheckCircle2,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: t("reports.rejectedApplications"),
      value: "4",
      icon: XCircle,
      iconStyle: "bg-red-50 text-red-600",
    },
  ];

  const statusReports = [
    {
      label: t("reports.pending"),
      value: 8,
      percentage: 33,
      color: "bg-amber-500",
    },
    {
      label: t("reports.verified"),
      value: 12,
      percentage: 50,
      color: "bg-green-500",
    },
    {
      label: t("reports.rejected"),
      value: 4,
      percentage: 17,
      color: "bg-red-500",
    },
  ];

  const serviceReports = [
    {
      service: t("reports.residence"),
      applications: 9,
    },
    {
      service: t("reports.personal"),
      applications: 6,
    },
    {
      service: t("reports.education"),
      applications: 4,
    },
    {
      service: t("reports.business"),
      applications: 3,
    },
    {
      service: t("reports.other"),
      applications: 2,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl mt-9 space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("reports.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("reports.title")}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {t("reports.description")}
        </p>
      </section>

      {/* Report Overview */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
            <BarChart3 size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("reports.overview")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("reports.overviewDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-950">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-3 ${stat.iconStyle}`}
                >
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Reports */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Applications by Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("reports.applicationsByStatus")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("reports.applicationsByStatusDescription")}
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {statusReports.map((report) => (
              <div key={report.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {report.label}
                  </span>

                  <span className="text-sm font-bold text-blue-950">
                    {report.value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${report.color}`}
                    style={{ width: `${report.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications by Service */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("reports.applicationsByService")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("reports.applicationsByServiceDescription")}
            </p>
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {serviceReports.map((report) => (
              <div
                key={report.service}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-900">
                    <FileText size={17} />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    {report.service}
                  </span>
                </div>

                <span className="text-sm font-bold text-blue-950">
                  {report.applications}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Insight */}
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-4">
          <div className="rounded-lg bg-white p-2 text-blue-900 shadow-sm">
            <TrendingUp size={20} />
          </div>

          <div>
            <h3 className="font-bold text-blue-950">
              {t("reports.insight")}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {t("reports.insightDescription")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;