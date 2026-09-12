import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
FileText,
Clock3,
CheckCircle2,
XCircle,
BarChart3,
TrendingUp,
Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Reports = () => {
const { t } = useTranslation();
const { token } = useAuth();

const [statistics, setStatistics] = useState({});
const [serviceReports, setServiceReports] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const fetchReports = async () => {
try {
const res = await fetch(
"http://localhost:5000/api/applications/reports/statistics",
{
headers: {
Authorization: `Bearer ${
                token || localStorage.getItem("sifarish_token")
              }`,
},
}
);


    const data = await res.json();

    if (!res.ok)
      throw new Error(data.message || "Failed to fetch reports");

    setStatistics(data.statistics || {});
    setServiceReports(data.serviceReports || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

fetchReports();


}, [token]);

const total = statistics.totalApplications || 0;

const cards = [
[t("reports.totalApplications"), total, FileText, "bg-blue-50 text-blue-700"],
[t("reports.pendingApplications"), statistics.pendingApplications || 0, Clock3, "bg-amber-50 text-amber-600"],
[t("reports.verifiedApplications"), statistics.verifiedApplications || 0, CheckCircle2, "bg-green-50 text-green-600"],
[t("reports.rejectedApplications"), statistics.rejectedApplications || 0, XCircle, "bg-red-50 text-red-600"],
];

const status = [
[t("reports.pending"), statistics.pendingApplications || 0, "bg-amber-500"],
[t("reports.verified"), statistics.verifiedApplications || 0, "bg-green-500"],
[t("reports.rejected"), statistics.rejectedApplications || 0, "bg-red-500"],
];

return ( <div className="mx-auto mt-9 max-w-7xl space-y-6">


  <section>
    <p className="text-sm font-bold text-red-600">
      {t("reports.label")}
    </p>

    <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
      {t("reports.title")}
    </h1>

    <p className="mt-2 text-sm text-slate-500">
      {t("reports.description")}
    </p>
  </section>

  {error && (
    <div className="rounded-xl bg-red-50 p-4 text-red-600">
      {error}
    </div>
  )}

  <section className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm">
    <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
      <BarChart3 size={24} />
    </div>

    <div>
      <h2 className="font-bold text-blue-950">
        {t("reports.overview")}
      </h2>

      <p className="text-sm text-slate-500">
        {t("reports.overviewDescription")}
      </p>
    </div>
  </section>

  {/* Statistics */}

  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {cards.map(([title, value, Icon, color]) => (
      <div key={title} className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-blue-950">
              {loading ? "..." : value}
            </p>
          </div>

          <div className={`rounded-lg p-3 ${color}`}>
            <Icon size={21} />
          </div>

        </div>
      </div>
    ))}
  </section>

  <section className="grid gap-6 lg:grid-cols-2">

    {/* Status */}

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="font-bold text-blue-950">
        {t("reports.applicationsByStatus")}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {t("reports.applicationsByStatusDescription")}
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-blue-700" />
        </div>
      ) : (
        <div className="mt-6 space-y-5">

          {status.map(([label, value, color]) => {
            const percentage = total
              ? Math.round((value / total) * 100)
              : 0;

            return (
              <div key={label}>

                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-slate-700">{label}</span>
                  <span className="font-bold text-blue-950">{value}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full ${color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>

    {/* Services */}

    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h2 className="font-bold text-blue-950">
        {t("reports.applicationsByService")}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {t("reports.applicationsByServiceDescription")}
      </p>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-blue-700" />
        </div>
      ) : serviceReports.length ? (
        <div className="mt-5 divide-y">

          {serviceReports.map((report) => (
            <div
              key={report.service}
              className="flex items-center justify-between py-4"
            >

              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-900" />

                <span className="text-sm font-medium text-slate-700">
                  {report.service}
                </span>
              </div>

              <span className="font-bold text-blue-950">
                {report.applications}
              </span>

            </div>
          ))}

        </div>
      ) : (
        <p className="py-10 text-center text-sm text-slate-500">
          No application data available.
        </p>
      )}

    </div>

  </section>

  {/* Insight */}

  <section className="flex gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5">

    <TrendingUp className="text-blue-900" />

    <div>
      <h3 className="font-bold text-blue-950">
        {t("reports.insight")}
      </h3>

      <p className="mt-1 text-sm text-slate-600">
        {total
          ? `${statistics.verifiedApplications || 0} applications have been verified out of ${total} total applications.`
          : t("reports.insightDescription")}
      </p>
    </div>

  </section>

</div>


);
};

export default Reports;
