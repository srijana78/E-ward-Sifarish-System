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

const API = "http://localhost:5000/api/applications";

const isToday = (dateValue) => {
  if (!dateValue) return false;

  const d = new Date(dateValue);
  const now = new Date();

  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
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
        const authToken =
          token || localStorage.getItem("sifarish_token");

        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  const waitingApplications = applications.filter(
    (app) =>
      app.status === "recommended" &&
      app.currentStage === "chairperson"
  );

  const approvedApplications = applications.filter(
    (app) => app.status === "approved"
  );

  const rejectedApplications = applications.filter(
    (app) => app.status === "rejected"
  );

  const approvedToday = approvedApplications.filter((app) =>
    isToday(app.updatedAt || app.decisionAt)
  );

  const rejectedToday = rejectedApplications.filter((app) =>
    isToday(app.updatedAt || app.decisionAt)
  );

  const stats = [
    {
      title: "waitingDecision",
      value: waitingApplications.length,
      icon: Clock3,
    },
    {
      title: "approvedToday",
      value: approvedToday.length,
      icon: CheckCircle2,
    },
    {
      title: "rejectedToday",
      value: rejectedToday.length,
      icon: XCircle,
    },
    {
      title: "totalApproved",
      value: approvedApplications.length,
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-7">

      {/* Header / Welcome */}
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

          <button
            onClick={() => navigate("/chairperson/applications")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold shadow-md transition hover:bg-red-700"
          >
            <ClipboardCheck size={19} />
            {t("chairpersonDashboard.reviewNow")}
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {t(`chairpersonDashboard.${title}`)}
                </p>

                <p className="mt-3 text-3xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3.5 text-blue-900">
                <Icon size={23} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      {/* Applications Waiting Decision */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("chairpersonDashboard.applicationsForDecision")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t(
                "chairpersonDashboard.applicationsForDecisionDescription"
              )}
            </p>
          </div>

          <button
            onClick={() => navigate("/chairperson/applications")}
            className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-red-600"
          >
            {t("chairpersonDashboard.viewAll")}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("chairpersonDashboard.loading")} />
          ) : waitingApplications.length === 0 ? (
            <Empty text={t("chairpersonDashboard.noApplications")} />
          ) : (
            waitingApplications.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <FileText size={22} />
                  </div>

                  <div>
                    <p className="text-base font-bold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        "Unknown Applicant"}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                      {" • "}
                      {new Date(
                        app.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/chairperson/application/${app._id}`
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900"
                >
                  {t("chairpersonDashboard.review")}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-blue-950">
            {t("chairpersonDashboard.quickActions")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("chairpersonDashboard.quickActionsDescription")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <QuickAction
            icon={ClipboardCheck}
            title={t(
              "chairpersonDashboard.reviewApplications"
            )}
            description={t(
              "chairpersonDashboard.reviewApplicationsDescription"
            )}
            onClick={() =>
              navigate("/chairperson/applications")
            }
          />

          <QuickAction
            icon={FileCheck2}
            title={t(
              "chairpersonDashboard.approvedApplications"
            )}
            description={t(
              "chairpersonDashboard.approvedApplicationsDescription"
            )}
            onClick={() =>
              navigate("/chairperson/approved")
            }
          />
        </div>
      </section>

      {/* Workflow */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-7">
        <div>
          <h2 className="text-lg font-bold text-blue-950">
            {t("chairpersonDashboard.decisionProcess")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t(
              "chairpersonDashboard.decisionProcessDescription"
            )}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <ProcessCard
            number="1"
            title={t("chairpersonDashboard.stepRecommended")}
            description={t(
              "chairpersonDashboard.stepRecommendedDescription"
            )}
          />

          <ProcessCard
            number="2"
            title={t("chairpersonDashboard.stepReview")}
            description={t(
              "chairpersonDashboard.stepReviewDescription"
            )}
          />

          <ProcessCard
            number="3"
            title={t("chairpersonDashboard.stepDecide")}
            description={t(
              "chairpersonDashboard.stepDecideDescription"
            )}
          />
        </div>
      </section>
    </div>
  );
};

const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
}) => (
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

    <h3 className="mt-5 text-base font-bold text-blue-950">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      {description}
    </p>
  </button>
);

const ProcessCard = ({
  number,
  title,
  description,
}) => (
  <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
      {number}
    </div>

    <h3 className="mt-4 font-bold text-blue-950">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      {description}
    </p>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default ChairpersonDashboard;