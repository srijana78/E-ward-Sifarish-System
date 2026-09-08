import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  FileText,
  FolderOpen,
  Receipt,
  ArrowRight,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    {
      title: t("citizenDashboard.totalApplications"),
      value: "2",
      icon: FileText,
    },
    {
      title: t("citizenDashboard.pending"),
      value: "1",
      icon: Clock3,
    },
    {
      title: t("citizenDashboard.approved"),
      value: "1",
      icon: CheckCircle2,
    },
    {
      title: t("citizenDashboard.actionRequired"),
      value: "0",
      icon: AlertCircle,
    },
  ];

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

  const quickActions = [
    {
      title: t("citizenDashboard.applyForRecommendation"),
      description: t(
        "citizenDashboard.applyForRecommendationDescription"
      ),
      icon: PlusCircle,
      path: "/citizen/apply",
    },
    {
      title: t("citizenDashboard.trackApplication"),
      description: t(
        "citizenDashboard.trackApplicationDescription"
      ),
      icon: FileText,
      path: "/citizen/applications",
    },
    {
      title: t("citizenDashboard.documents"),
      description: t("citizenDashboard.documentsDescription"),
      icon: FolderOpen,
      path: "/citizen/apply/documents",
    },
    {
      title: t("citizenDashboard.paymentVoucher"),
      description: t("citizenDashboard.paymentVoucherDescription"),
      icon: Receipt,
      path: "/citizen/payments",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome Section */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="max-w-2xl text-white">
            <p className="mb-2 text-sm font-semibold text-red-300">
              {t("citizenDashboard.welcomeLabel")}
            </p>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {t("citizenDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
              {t("citizenDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/citizen/apply")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <PlusCircle size={18} />
            {t("citizenDashboard.newApplication")}
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
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-blue-950">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-100 p-3 text-blue-950">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Recent Applications */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("citizenDashboard.recentApplications")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("citizenDashboard.recentApplicationsDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/citizen/applications")}
            className="text-sm font-semibold text-blue-900 hover:text-red-600"
          >
            {t("citizenDashboard.viewAll")}
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {applications.map((application) => (
            <div
              key={application.id}
              className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-blue-950">
                  {application.service}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {t("citizenDashboard.applicationId")}:{" "}
                  {application.id} • {application.date}
                </p>
              </div>

              <StatusBadge status={application.status} />
            </div>
          ))}
        </div>
      </section>

      {/* Quick Services */}
      <section>
        <div className="mb-4">
          <h2 className="font-bold text-blue-950">
            {t("citizenDashboard.quickServices")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("citizenDashboard.quickServicesDescription")}
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

      {/* Application Process */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-6">
          <h2 className="font-bold text-blue-950">
            {t("citizenDashboard.applicationProcess")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("citizenDashboard.applicationProcessDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <ProcessStep
            number="1"
            title={t("citizenDashboard.stepApplication")}
            description={t(
              "citizenDashboard.stepApplicationDescription"
            )}
          />

          <ProcessStep
            number="2"
            title={t("citizenDashboard.stepDocuments")}
            description={t(
              "citizenDashboard.stepDocumentsDescription"
            )}
          />

          <ProcessStep
            number="3"
            title={t("citizenDashboard.stepPayment")}
            description={t(
              "citizenDashboard.stepPaymentDescription"
            )}
          />

          <ProcessStep
            number="4"
            title={t("citizenDashboard.stepReview")}
            description={t(
              "citizenDashboard.stepReviewDescription"
            )}
          />

          <ProcessStep
            number="5"
            title={t("citizenDashboard.stepCertificate")}
            description={t(
              "citizenDashboard.stepCertificateDescription"
            )}
          />
        </div>
      </section>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const isApproved = status === "Approved";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isApproved
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
};

const ProcessStep = ({ number, title, description }) => {
  return (
    <div className="relative rounded-lg bg-slate-50 p-4">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="text-sm font-bold text-blue-950">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default CitizenDashboard;