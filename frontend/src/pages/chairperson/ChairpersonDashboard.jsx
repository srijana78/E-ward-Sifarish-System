import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  FileCheck2,
  FileText,
  ArrowRight,
  Clock3,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const getToken = (token) =>
  token ||
  localStorage.getItem("sifarish_token") ||
  localStorage.getItem("token");

const isToday = (date) => {
  if (!date) return false;

  const d = new Date(date);
  const today = new Date();

  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};

const ChairpersonDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${getToken(token)}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data.message || `Failed to load applications (${response.status})`
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  const waiting = applications.filter(
    (app) =>
      app.status === "recommended" &&
      app.currentStage === "chairperson"
  );

  const approved = applications.filter((app) => app.status === "approved");
  const rejected = applications.filter((app) => app.status === "rejected");

  const approvedToday = approved.filter((app) =>
    isToday(app.updatedAt || app.decisionAt)
  );

  const rejectedToday = rejected.filter((app) =>
    isToday(app.updatedAt || app.decisionAt)
  );

  const stats = [
    ["waitingDecision", waiting.length, Clock3],
    ["approvedToday", approvedToday.length, CheckCircle2],
    ["rejectedToday", rejectedToday.length, XCircle],
    ["totalApproved", approved.length, FileText],
  ];

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex items-center gap-2 text-red-300">
              <ShieldCheck size={20} />
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t("chairpersonDashboard.welcomeLabel")}
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {t("chairpersonDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
              {t("chairpersonDashboard.welcomeDescription")}
            </p>
          </div>

          <ActionButton
            icon={ClipboardCheck}
            text={t("chairpersonDashboard.reviewNow")}
            onClick={() => navigate("/chairperson/applications")}
            primary
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, value, Icon]) => (
          <StatCard
            key={title}
            title={t(`chairpersonDashboard.${title}`)}
            value={loading ? "..." : value}
            icon={Icon}
          />
        ))}
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Waiting Applications */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <SectionHeader
          title={t("chairpersonDashboard.applicationsForDecision")}
          description={t(
            "chairpersonDashboard.applicationsForDecisionDescription"
          )}
          buttonText={t("chairpersonDashboard.viewAll")}
          onClick={() => navigate("/chairperson/applications")}
        />

        {loading ? (
          <Empty text={t("chairpersonDashboard.loading")} />
        ) : waiting.length === 0 ? (
          <Empty text={t("chairpersonDashboard.noApplications")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {waiting.slice(0, 5).map((app) => (
              <ApplicationRow
                key={app._id}
                application={app}
                reviewText={t("chairpersonDashboard.review")}
                onReview={() =>
                  navigate(`/chairperson/application/${app._id}`)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <SectionHeader
          title={t("chairpersonDashboard.quickActions")}
          description={t("chairpersonDashboard.quickActionsDescription")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <QuickAction
            icon={ClipboardCheck}
            title={t("chairpersonDashboard.reviewApplications")}
            description={t(
              "chairpersonDashboard.reviewApplicationsDescription"
            )}
            onClick={() => navigate("/chairperson/applications")}
          />

          <QuickAction
            icon={FileCheck2}
            title={t("chairpersonDashboard.approvedApplications")}
            description={t(
              "chairpersonDashboard.approvedApplicationsDescription"
            )}
            onClick={() => navigate("/chairperson/approved")}
          />
        </div>
      </section>

      {/* Decision Process */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-7">
        <SectionHeader
          title={t("chairpersonDashboard.decisionProcess")}
          description={t("chairpersonDashboard.decisionProcessDescription")}
        />

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ["1", "stepRecommended", "stepRecommendedDescription"],
            ["2", "stepReview", "stepReviewDescription"],
            ["3", "stepDecide", "stepDecideDescription"],
          ].map(([number, title, description]) => (
            <ProcessCard
              key={number}
              number={number}
              title={t(`chairpersonDashboard.${title}`)}
              description={t(`chairpersonDashboard.${description}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-bold text-blue-950">{value}</p>
      </div>

      <div className="rounded-xl bg-blue-50 p-3.5 text-blue-900">
        <Icon size={23} />
      </div>
    </div>
  </div>
);

const SectionHeader = ({
  title,
  description,
  buttonText,
  onClick,
}) => (
  <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-lg font-bold text-blue-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>

    {buttonText && (
      <button
        onClick={onClick}
        className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-red-600"
      >
        {buttonText}
        <ArrowRight size={16} />
      </button>
    )}
  </div>
);

const ApplicationRow = ({ application, reviewText, onReview }) => (
  <div className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
        <FileText size={22} />
      </div>

      <div>
        <p className="text-base font-bold text-blue-950">
          {application.applicantDetails?.fullName || "Unknown Applicant"}
        </p>

        <p className="mt-1 text-sm text-slate-600">
          {application.service}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {application.applicationNumber || application._id}
          {" • "}
          {new Date(application.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    <ActionButton
      text={reviewText}
      icon={ArrowRight}
      onClick={onReview}
    />
  </div>
);

const ActionButton = ({ icon: Icon, text, onClick, primary = false }) => (
  <button
    onClick={onClick}
    className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition ${
      primary
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-blue-950 text-white hover:bg-blue-900"
    }`}
  >
    {Icon && <Icon size={18} />}
    {text}
  </button>
);

const QuickAction = ({ icon: Icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
        <Icon size={23} />
      </div>

      <ArrowRight
        size={20}
        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
      />
    </div>

    <h3 className="mt-5 text-base font-bold text-blue-950">{title}</h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
  </button>
);

const ProcessCard = ({ number, title, description }) => (
  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
      {number}
    </div>

    <h3 className="mt-4 font-bold text-blue-950">{title}</h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">{text}</div>
);

export default ChairpersonDashboard;