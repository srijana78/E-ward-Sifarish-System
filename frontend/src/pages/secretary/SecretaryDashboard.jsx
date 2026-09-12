import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  FileCheck2,
  Send,
  FileText,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const SecretaryDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            Authorization: `Bearer ${
              token || localStorage.getItem("sifarish_token")
            }`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load applications");
        }

        setApplications(data.applications || []);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  // Secretary only receives verified applications
  const verified = applications.filter(
    (app) => app.status === "verified"
  );

  const recommended = applications.filter(
    (app) => app.status === "recommended"
  );

  const rejected = applications.filter(
    (app) => app.status === "rejected"
  );

  const stats = [
    ["totalVerified", verified.length, FileText],
    ["waitingReview", verified.length, Clock3],
    ["recommended", recommended.length, CheckCircle2],
    ["attentionRequired", rejected.length, AlertCircle],
  ];

  const quickActions = [
    [
      "reviewApplications",
      "reviewApplicationsDescription",
      ClipboardCheck,
      "/secretary/applications",
    ],
    [
      "recommendedApplications",
      "recommendedApplicationsDescription",
      FileCheck2,
      "/secretary/recommended",
    ],
  ];

  return (
    <div className="space-y-6">

      {/* WELCOME */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-red-300">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">
                {t("secretaryDashboard.welcomeLabel")}
              </span>
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              {t("secretaryDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
              {t("secretaryDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/secretary/applications")}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            <ClipboardCheck size={18} />
            {t("secretaryDashboard.reviewNow")}
          </button>

        </div>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([title, value, Icon]) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {t(`secretaryDashboard.${title}`)}
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                <Icon size={21} />
              </div>

            </div>
          </div>
        ))}
      </section>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* APPLICATIONS WAITING FOR SECRETARY */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <div>
            <h2 className="font-bold text-blue-950">
              {t("secretaryDashboard.applicationsForReview")}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {t("secretaryDashboard.applicationsForReviewDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/secretary/applications")}
            className="text-sm font-semibold text-blue-900 transition hover:text-red-600"
          >
            {t("secretaryDashboard.viewAll")}
          </button>

        </div>

        <div className="divide-y divide-slate-100">

          {loading ? (
            <Empty text={t("secretaryDashboard.loading")} />
          ) : verified.length === 0 ? (
            <Empty text={t("secretaryDashboard.noApplications")} />
          ) : (
            verified.slice(0, 5).map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-blue-950">
                      {app.applicantDetails?.fullName || "Unknown Applicant"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                      {" • "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(`/secretary/application/${app._id}`)
                  }
                  className="flex items-center gap-2 self-start rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900 sm:self-auto"
                >
                  {t("secretaryDashboard.review")}
                  <ArrowRight size={16} />
                </button>

              </div>
            ))
          )}

        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>

        <h2 className="font-bold text-blue-950">
          {t("secretaryDashboard.quickActions")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("secretaryDashboard.quickActionsDescription")}
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-2">

          {quickActions.map(([title, description, Icon, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="mb-4 flex items-center justify-between">

                <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                  <Icon size={21} />
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-400 transition group-hover:text-red-600"
                />

              </div>

              <h3 className="font-bold text-blue-950">
                {t(`secretaryDashboard.${title}`)}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {t(`secretaryDashboard.${description}`)}
              </p>

            </button>
          ))}

        </div>
      </section>

      {/* SECRETARY WORKFLOW */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="font-bold text-blue-950">
          {t("secretaryDashboard.reviewProcess")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("secretaryDashboard.reviewProcessDescription")}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">

          <ProcessCard
            number="1"
            title={t("secretaryDashboard.stepVerified")}
            description={t("secretaryDashboard.stepVerifiedDescription")}
          />

          <ProcessCard
            number="2"
            title={t("secretaryDashboard.stepReview")}
            description={t("secretaryDashboard.stepReviewDescription")}
          />

          <ProcessCard
            number="3"
            title={t("secretaryDashboard.stepRecommend")}
            description={t("secretaryDashboard.stepRecommendDescription")}
          />

        </div>

      </section>

    </div>
  );
};

const Empty = ({ text }) => (
  <div className="p-8 text-center text-sm text-slate-500">
    {text}
  </div>
);

const ProcessCard = ({ number, title, description }) => (
  <div className="rounded-xl bg-slate-50 p-5">

    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
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

export default SecretaryDashboard;