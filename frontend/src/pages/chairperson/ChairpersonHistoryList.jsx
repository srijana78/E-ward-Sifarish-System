import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, ArrowRight } from "lucide-react";

const ChairpersonHistoryList = ({
  applications = [],
  loading,
  error,
  label,
  title,
  description,
  icon: Icon,
  badgeClass = "bg-slate-50 text-slate-700",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <div className="flex items-center gap-3 text-red-300">
          {Icon && <Icon size={20} />}
          <span className="text-sm font-semibold uppercase tracking-wide">
            {label}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
          {description}
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        {loading ? (
          <Empty text={t("chairpersonHistory.loading")} />
        ) : applications.length === 0 ? (
          <Empty text={t("chairpersonHistory.noApplications")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {applications.map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                badgeClass={badgeClass}
                t={t}
                onView={() =>
                  navigate(`/chairperson/application/${app._id}`)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const ApplicationRow = ({ app, badgeClass, t, onView }) => (
  <div className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${badgeClass}`}
      >
        <FileText size={22} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-base font-bold text-blue-950">
          {app.applicantDetails?.fullName ||
            t("chairpersonApplications.unknownApplicant")}
        </p>

        <p className="mt-1 text-sm text-slate-600">
          {app.service} • {t("chairpersonApplications.ward")}{" "}
          {app.address?.wardNumber || "-"}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {app.applicationNumber || app._id}
          {" • "}
          {t("chairpersonHistory.decidedOn")}{" "}
          {new Date(app.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    <button
      onClick={onView}
      className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200"
    >
      {t("chairpersonHistory.view")}
      <ArrowRight size={16} />
    </button>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonHistoryList;