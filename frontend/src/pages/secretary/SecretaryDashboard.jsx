import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ClipboardCheck,
  FileCheck2,
  Clock3,
  ArrowRight,
  Loader2,
  FileText,
} from "lucide-react";

const SecretaryDashboard = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH VERIFIED APPLICATIONS
  // ==========================================

  useEffect(() => {
    const fetchVerifiedApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/applications/verified"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch applications"
          );
        }

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Secretary dashboard error:", error);

        setError(
          error.message || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedApplications();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Ward Secretary Portal
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          Secretary Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Review applications verified by the Front Office and
          recommend valid applications for final approval.
        </p>
      </section>

      {/* ========================================== */}
      {/* STATISTICS */}
      {/* ========================================== */}

      <section className="grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-700">
                Ready for Review
              </p>

              <h2 className="mt-2 text-4xl font-extrabold text-blue-950">
                {loading ? "..." : applications.length}
              </h2>

              <p className="mt-2 text-sm text-blue-700">
                Verified applications
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 text-blue-900 shadow-sm">
              <ClipboardCheck size={28} />
            </div>

          </div>
        </div>


        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Your Responsibility
              </p>

              <h2 className="mt-2 text-lg font-bold text-emerald-950">
                Review & Recommend
              </h2>

              <p className="mt-2 text-sm text-emerald-700">
                Forward valid applications
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 text-emerald-700 shadow-sm">
              <FileCheck2 size={28} />
            </div>

          </div>
        </div>

      </section>


      {/* ========================================== */}
      {/* APPLICATIONS */}
      {/* ========================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>
            <h2 className="text-xl font-bold text-blue-950">
              Applications Ready for Review
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Applications verified by the Front Office.
            </p>
          </div>

          <button
            onClick={() => navigate("/secretary/applications")}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-slate-50"
          >
            View All
            <ArrowRight size={17} />
          </button>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">

            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading applications...
            </p>

          </div>
        )}


        {/* ERROR */}

        {!loading && error && (
          <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* EMPTY STATE */}

        {!loading && !error && applications.length === 0 && (
          <div className="py-16 text-center">

            <FileText
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-700">
              No applications ready for review
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Verified applications from the Front Office will
              appear here.
            </p>

          </div>
        )}


        {/* APPLICATION LIST */}

        {!loading &&
          !error &&
          applications.slice(0, 5).map((application) => (

            <div
              key={application._id}
              className="border-b border-slate-100 p-5 last:border-b-0 transition hover:bg-slate-50 sm:p-6"
            >

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                    <FileText size={21} />
                  </div>

                  <div>

                    <h3 className="font-bold text-blue-950">
                      {application.service}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {application.applicationNumber ||
                        application._id}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">

                      <Clock3 size={14} />

                      <span>
                        Verified and ready for secretary review
                      </span>

                    </div>

                  </div>

                </div>


                <button
                  onClick={() =>
                    navigate(
                      `/secretary/application/${application._id}`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-950"
                >
                  Review Application

                  <ArrowRight size={17} />
                </button>

              </div>

            </div>

          ))}

      </section>

    </div>
  );
};

export default SecretaryDashboard;