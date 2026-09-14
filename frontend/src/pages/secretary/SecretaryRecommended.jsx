import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileCheck, ArrowRight, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API =
  "http://localhost:5000/api/applications/secretary/recommended";

const SecretaryRecommended = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await fetch(API, {
          headers: {
            Authorization: `Bearer ${
              token || localStorage.getItem("sifarish_token")
            }`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to load applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  return (
    <div className="space-y-7">
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-7 text-white shadow-md sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-300">
          {t("secretaryRecommended.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {t("secretaryRecommended.title")}
        </h1>

        <p className="mt-3 text-sm text-blue-100">
          {t("secretaryRecommended.description")}
        </p>
      </section>

      {error && (
        <div className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-bold text-blue-950">
            {t("secretaryRecommended.listTitle")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("secretaryRecommended.listDescription")}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            {t("secretaryRecommended.loading")}
          </div>
        ) : applications.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            {t("secretaryRecommended.empty")}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {applications.map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <FileCheck size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        "Unknown Applicant"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {app.service}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {t("secretaryRecommended.recommended")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/secretary/application/${app._id}`
                      )
                    }
                    className="flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
                  >
                    {t("secretaryRecommended.view")}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SecretaryRecommended;