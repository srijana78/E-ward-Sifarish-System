import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  FileText,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const SecretaryApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ================= FETCH VERIFIED APPLICATIONS =================

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await fetch(
          "http://localhost:5000/api/applications/verified"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch verified applications"
          );
        }

        setApplications(data.applications || []);
      } catch (error) {
        console.error("Secretary applications error:", error);

        setError(
          error.message || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // ================= SEARCH =================

  const filteredApplications = applications.filter((application) => {
    const applicationNumber =
      application.applicationNumber ||
      application._id ||
      "";

    const service = application.service || "";

    const applicantName =
      application.applicantDetails?.fullName || "";

    const searchValue = search.toLowerCase();

    return (
      applicationNumber.toLowerCase().includes(searchValue) ||
      service.toLowerCase().includes(searchValue) ||
      applicantName.toLowerCase().includes(searchValue)
    );
  });

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">

      {/* ================= HEADER ================= */}

      <section>

        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Secretary Portal
        </p>

        <h1 className="mt-2 text-3xl font-bold text-blue-950 sm:text-4xl">
          Verified Applications
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Review applications verified by the Front Office and
          prepare them for further recommendation.
        </p>

      </section>


      {/* ================= SEARCH ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="relative max-w-xl">

          <Search
            size={19}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by application number, service or applicant"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </section>


      {/* ================= ERROR ================= */}

      {error && (

        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">

          <AlertCircle size={20} />

          <p className="text-sm font-medium">
            {error}
          </p>

        </div>

      )}


      {/* ================= APPLICATION LIST ================= */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* ================= LOADING ================= */}

        {loading && (

          <div className="flex flex-col items-center justify-center px-5 py-16">

            <Loader2
              size={32}
              className="animate-spin text-blue-700"
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading verified applications...
            </p>

          </div>

        )}


        {/* ================= APPLICATIONS ================= */}

        {!loading &&
          filteredApplications.map((application) => (

            <div
              key={application._id}
              className="border-b border-slate-100 p-5 last:border-b-0 sm:p-6"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* APPLICATION INFO */}

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">

                    <FileText size={21} />

                  </div>


                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-blue-950">

                        {application.service || "Ward Recommendation"}

                      </h3>

                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">

                        <CheckCircle2 size={14} />

                        Verified

                      </span>

                    </div>


                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-500">

                      <span>
                        {application.applicationNumber ||
                          application._id}
                      </span>

                      <span>•</span>

                      <span>
                        {application.applicantDetails?.fullName ||
                          "Applicant"}
                      </span>

                      <span>•</span>

                      <span>
                        Submitted: {formatDate(application.createdAt)}
                      </span>

                    </div>

                  </div>

                </div>


                {/* ACTION */}

                <button
                  onClick={() =>
                    navigate(
                      `/secretary/applications/${application._id}`
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-slate-50"
                >

                  <Eye size={17} />

                  Review Application

                </button>

              </div>

            </div>

          ))}


        {/* ================= EMPTY STATE ================= */}

        {!loading &&
          filteredApplications.length === 0 &&
          !error && (

            <div className="px-5 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">

                <FileText
                  size={28}
                  className="text-slate-400"
                />

              </div>

              <h3 className="mt-4 font-semibold text-slate-700">

                {search
                  ? "No matching applications found"
                  : "No verified applications yet"}

              </h3>

              <p className="mt-2 text-sm text-slate-500">

                {search
                  ? "Try searching with another keyword."
                  : "Applications verified by Front Office will appear here."}

              </p>

            </div>

          )}

      </section>

    </div>
  );
};

export default SecretaryApplications;