import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FileCheck, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications/secretary/recommended`;

const SecretaryRecommended = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken =
      token ||
      localStorage.getItem("sifarish_token") ||
      localStorage.getItem("token");

    fetch(API, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(async (res) => {
        const text = await res.text();

        let data = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        return { ok: res.ok, data };
      })
      .then(({ ok, data }) => {
        if (!ok) {
          throw new Error(
            data.message || "Failed to load applications"
          );
        }

        setApplications(data.applications || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-blue-950">
          {t("secretaryRecommended.title")}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {t("secretaryRecommended.description")}
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Total */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            {t("secretaryRecommended.total")}
          </p>

          <p className="text-xl font-bold text-blue-950">
            {loading ? "..." : applications.length}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <Empty text={t("secretaryRecommended.loading")} />
        ) : applications.length === 0 ? (
          <Empty text={t("secretaryRecommended.empty")} />
        ) : (
          <div className="divide-y divide-slate-100">
            {applications.map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-3 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                    <FileCheck size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-blue-950">
                      {app.applicantDetails?.fullName ||
                        t("secretaryRecommended.unknown")}
                    </p>

                    <p className="text-sm text-slate-500">
                      {app.service}
                    </p>

                    <p className="text-xs text-slate-400">
                      {app.applicationNumber || app._id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    {t("secretaryRecommended.recommended")}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/secretary/application/${app._id}`)
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-blue-950 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-900"
                  >
                    {t("secretaryRecommended.view")}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default SecretaryRecommended;