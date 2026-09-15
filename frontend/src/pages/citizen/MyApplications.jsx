import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FileText, Clock3, CheckCircle2, XCircle, Eye, CalendarDays, Hash, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const STATUS_STYLES = {
  submitted: { icon: Clock3, color: "bg-amber-50 text-amber-700 border-amber-200" },
  pending: { icon: Clock3, color: "bg-amber-50 text-amber-700 border-amber-200" },
  under_review: { icon: Clock3, color: "bg-blue-50 text-blue-700 border-blue-200" },
  verified: { icon: CheckCircle2, color: "bg-purple-50 text-purple-700 border-purple-200" },
  approved: { icon: CheckCircle2, color: "bg-green-50 text-green-700 border-green-200" },
  rejected: { icon: XCircle, color: "bg-red-50 text-red-700 border-red-200" },
};

const DetailBox = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
    <Icon size={18} className="text-slate-500" />
    <div>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm font-semibold capitalize text-slate-700">{value}</p>
    </div>
  </div>
);

const MyApplications = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const authToken = token || localStorage.getItem("sifarish_token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/my-applications`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || t("myApplications.fetchError"));
        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message || t("myApplications.fetchError"));
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const Status = ({ status }) => {
    const key = status?.toLowerCase() || "submitted";
    const { icon: Icon, color } = STATUS_STYLES[key] || STATUS_STYLES.submitted;
    return (
      <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${color}`}>
        <Icon size={15} /> {t(`status.${key}`)}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">{t("myApplications.pageLabel")}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">{t("myApplications.title")}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{t("myApplications.description")}</p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          <XCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-950">{t("myApplications.sectionTitle")}</h2>
              <p className="mt-1 text-sm text-slate-500">{t("myApplications.sectionSubtitle")}</p>
            </div>
            <div className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900">
              {t("myApplications.count", { count: applications.length })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-800" />
            <p className="mt-4 text-sm font-medium text-slate-500">{t("myApplications.loading")}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
              <FileText size={30} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-blue-950">{t("myApplications.emptyTitle")}</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{t("myApplications.emptyDescription")}</p>
          </div>
        ) : (
          <div className="space-y-4 bg-slate-50/50 p-4 sm:p-6">
            {applications.map((app) => (
              <div key={app._id} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                        <FileText size={23} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-blue-950 sm:text-xl">{app.service}</h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <Hash size={15} />
                          <span className="font-medium">{app.applicationNumber || app._id}</span>
                        </div>
                      </div>
                    </div>
                    <Status status={app.status} />
                  </div>

                  <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
                    <DetailBox icon={CalendarDays} label={t("myApplications.submittedDate")} value={new Date(app.createdAt).toLocaleDateString()} />
                    <DetailBox icon={Clock3} label={t("myApplications.currentStatus")} value={app.status?.replace(/_/g, " ") || t("status.submitted")} />
                  </div>

                  <div className="flex justify-end border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/citizen/applications/${app._id}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-950 sm:w-auto"
                    >
                      <Eye size={17} /> {t("myApplications.viewApplication")} <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;