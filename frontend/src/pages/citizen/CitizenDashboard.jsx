import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  PlusCircle,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;

const CitizenDashboard = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { token } = useAuth();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch citizen applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const authToken =
          token ||
          localStorage.getItem("sifarish_token") ||
          localStorage.getItem("token");

        const response = await fetch(`${API}/my-applications`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const text = await response.text();

        let data;

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          throw new Error(
            "Server returned HTML instead of JSON. Check backend route."
          );
        }

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

  // Application statistics
  const counts = {
    total: applications.length,

    pending: applications.filter((application) =>
      ["submitted", "pending", "under_review", "verified"].includes(
        application.status
      )
    ).length,

    approved: applications.filter(
      (application) => application.status === "approved"
    ).length,

    rejected: applications.filter(
      (application) => application.status === "rejected"
    ).length,
  };

  const stats = [
    ["totalApplications", counts.total, FileText],
    ["pending", counts.pending, Clock3],
    ["approved", counts.approved, CheckCircle2],
    ["actionRequired", counts.rejected, AlertCircle],
  ];

  return (
    <div className="space-y-6">
      {/* WELCOME */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-red-300">
              {t("citizenDashboard.welcomeLabel")} 
              
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {t("citizenDashboard.welcomeTitle")}
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-blue-100">
              {t("citizenDashboard.welcomeDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/citizen/apply")}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            <PlusCircle size={18} />

            {t("citizenDashboard.newApplication")}
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
                  {t(`citizenDashboard.${title}`)}
                </p>

                <p className="mt-2 text-2xl font-bold text-blue-950">
                  {loading ? "..." : value}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-3 text-blue-950">
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* RECENT APPLICATIONS */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
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
          {loading ? (
            <Empty text="Loading applications..." />
          ) : applications.length === 0 ? (
            <Empty text="No applications found. Create your first application." />
          ) : (
            applications.slice(0, 5).map((application) => (
              <div
                key={application._id}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-blue-950">
                    {application.service}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Application ID:{" "}
                    {application.applicationNumber || application._id}
                    {" • "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <StatusBadge status={application.status} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-blue-950">
          {t("citizenDashboard.applicationProcess")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("citizenDashboard.applicationProcessDescription")}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {[
            ["stepApplication", "stepApplicationDescription"],
            ["stepDocuments", "stepDocumentsDescription"],
            ["stepPayment", "stepPaymentDescription"],
            ["stepReview", "stepReviewDescription"],
            ["stepCertificate", "stepCertificateDescription"],
          ].map(([title, description], index) => (
            <div
              key={title}
              className="rounded-lg bg-slate-50 p-4"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 text-sm font-bold text-white">
                {index + 1}
              </div>

              <h3 className="text-sm font-bold text-blue-950">
                {t(`citizenDashboard.${title}`)}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {t(`citizenDashboard.${description}`)}
              </p>
            </div>
          ))}
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

const StatusBadge = ({ status }) => {
  const styles = {
    submitted: "bg-amber-50 text-amber-700",
    pending: "bg-amber-50 text-amber-700",
    under_review: "bg-blue-50 text-blue-700",
    verified: "bg-purple-50 text-purple-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status?.replace("_", " ") || "Unknown"}
    </span>
  );
};

export default CitizenDashboard;