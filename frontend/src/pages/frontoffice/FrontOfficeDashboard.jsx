import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  FileText,
  Clock3,
  CheckCircle2,
  Bell,
  ArrowRight,
  ClipboardCheck,
  Users,
  AlertCircle,
} from "lucide-react";

const FrontOfficeDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    {
      title: t("frontOfficeDashboard.totalApplications"),
      value: "24",
      icon: FileText,
    },
    {
      title: t("frontOfficeDashboard.pendingApplications"),
      value: "8",
      icon: Clock3,
    },
    {
      title: t("frontOfficeDashboard.verifiedApplications"),
      value: "14",
      icon: CheckCircle2,
    },
    {
      title: t("frontOfficeDashboard.newNotifications"),
      value: "3",
      icon: Bell,
    },
  ];

  const recentApplications = [
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
      id: "EW-2026-003",
      applicant: "Hari Karki",
      service: "Business Recommendation",
      date: "2026-09-02",
      status: "Verified",
    },
  ];

  const quickActions = [
    {
      title: t("frontOfficeDashboard.reviewApplications"),
      description: t(
        "frontOfficeDashboard.reviewApplicationsDescription"
      ),
      icon: ClipboardCheck,
      path: "/frontoffice/pending",
    },
    {
      title: t("frontOfficeDashboard.verifiedApplications"),
      description: t(
        "frontOfficeDashboard.verifiedApplicationsDescription"
      ),
      icon: CheckCircle2,
      path: "/frontoffice/verified",
    },
    {
      title: t("frontOfficeDashboard.viewNotifications"),
      description: t(
        "frontOfficeDashboard.viewNotificationsDescription"
      ),
      icon: Bell,
      path: "/frontoffice/notifications",
    },
    {
      title: t("frontOfficeDashboard.viewReports"),
      description: t(
        "frontOfficeDashboard.viewReportsDescription"
      ),
      icon: FileText,
      path: "/frontoffice/reports",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome Section */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 mt-10 via-blue-900 to-slate-900">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl text-white">
            <p className="mb-2 text-sm font-semibold text-red-300">
              {t("frontOfficeDashboard.welcomeLabel")}
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {t("frontOfficeDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
              {t("frontOfficeDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <ClipboardCheck size={18} />

            {t("frontOfficeDashboard.reviewNow")}
          </button>

        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
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

                <div className="rounded-lg bg-slate-100 p-3 text-blue-950">
                  <Icon size={21} />
                </div>

              </div>
            </div>
          );
        })}

      </section>

      {/* Recent Applications */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

          <div>
            <h2 className="text-base font-bold text-blue-950">
              {t("frontOfficeDashboard.recentApplications")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("frontOfficeDashboard.recentApplicationsDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/frontoffice/pending")}
            className="text-sm font-semibold text-blue-900 transition hover:text-red-600"
          >
            {t("frontOfficeDashboard.viewAll")}
          </button>

        </div>

        <div className="divide-y divide-slate-100">

          {recentApplications.map((application) => (
            <div
              key={application.id}
              className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-950">
                    {application.applicant}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {application.service}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {application.id} • {application.date}
                  </p>
                </div>

              </div>

              <StatusBadge status={application.status} />

            </div>
          ))}

        </div>

      </section>

      {/* Quick Actions */}
      <section>

        <div className="mb-4">

          <h2 className="text-lg font-bold text-blue-950">
            {t("frontOfficeDashboard.quickActions")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("frontOfficeDashboard.quickActionsDescription")}
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >

                <div className="mb-4 flex items-center justify-between">

                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                  />

                </div>

                <h3 className="text-sm font-bold text-blue-950">
                  {action.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>

              </button>
            );
          })}

        </div>

      </section>

      {/* Work Summary */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-bold text-blue-950">
            {t("frontOfficeDashboard.workSummary")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("frontOfficeDashboard.workSummaryDescription")}
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <SummaryCard
            icon={Clock3}
            title={t("frontOfficeDashboard.pendingReview")}
            value="8"
          />

          <SummaryCard
            icon={CheckCircle2}
            title={t("frontOfficeDashboard.completedToday")}
            value="5"
          />

          <SummaryCard
            icon={AlertCircle}
            title={t("frontOfficeDashboard.requiresAttention")}
            value="2"
          />

        </div>

      </section>

    </div>
  );
};


/* Status Badge */

const StatusBadge = ({ status }) => {

  const isVerified = status === "Verified";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isVerified
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
};


/* Summary Card */

const SummaryCard = ({ icon: Icon, title, value }) => {

  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-950">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-white p-3 text-blue-900 shadow-sm">
          <Icon size={20} />
        </div>

      </div>

    </div>
  );
};


export default FrontOfficeDashboard;