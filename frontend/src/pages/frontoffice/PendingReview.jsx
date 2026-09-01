import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PendingReview() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Temporary data
  // Later this will come from the backend/database.
  const pendingApplications = [
    {
      id: "EW-2026-00124",
      applicant: "Srijana Bhakri",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      submitted: "Today, 9:30 AM",
      documents: 4,
    },
    {
      id: "EW-2026-00123",
      applicant: "Ram Sharma",
      service: "Relationship Certificate",
      nepaliService: "नाता प्रमाणित सिफारिस",
      submitted: "Today, 8:45 AM",
      documents: 3,
    },
    {
      id: "EW-2026-00120",
      applicant: "Sunita Adhikari",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      submitted: "Today, 8:10 AM",
      documents: 5,
    },
    {
      id: "EW-2026-00117",
      applicant: "Prakash Bista",
      service: "Land Recommendation",
      nepaliService: "जग्गा सम्बन्धी सिफारिस",
      submitted: "Yesterday",
      documents: 4,
    },
  ];

  // Search
  const filteredApplications = pendingApplications.filter((application) => {
    const searchText = search.toLowerCase();

    return (
      application.applicant.toLowerCase().includes(searchText) ||
      application.id.toLowerCase().includes(searchText) ||
      application.service.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm font-medium text-amber-600">
              Ward Administration
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Pending Review
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              प्रमाणीकरणका लागि बाँकी आवेदनहरू
            </p>
          </div>

          {/* Pending Count */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
            <p className="text-xs text-amber-600">
              Pending Applications
            </p>

            <p className="text-2xl font-bold text-amber-700 mt-1">
              18
            </p>
          </div>

        </div>
      </div>

      {/* =========================================
          INFO CARD
      ========================================== */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-5 mb-6">

        <div className="flex gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            ℹ
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-800">
              Applications waiting for verification
            </p>

            <p className="text-xs text-blue-600 mt-1">
              Review the applicant's information and documents before
              approving or rejecting the application.
            </p>
          </div>

        </div>

      </div>

      {/* =========================================
          APPLICATION SECTION
      ========================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {/* Section Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Applications Awaiting Review
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                प्रमाणीकरण बाँकी आवेदनहरूको सूची
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-72">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search application..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>

          </div>

        </div>

        {/* =========================================
            APPLICATION LIST
        ========================================== */}

        <div className="divide-y divide-slate-100">

          {filteredApplications.map((application) => (

            <div
              key={application.id}
              className="p-5 sm:p-6 hover:bg-slate-50 transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Applicant Information */}
                <div className="flex gap-4 min-w-0">

                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    {application.applicant.charAt(0)}
                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-slate-800">
                      {application.applicant}
                    </h3>

                    <p className="text-sm text-slate-600 mt-1">
                      {application.service}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {application.nepaliService}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-2">

                      <span className="text-xs text-slate-400">
                        {application.id}
                      </span>

                      <span className="text-xs text-slate-400">
                        Submitted: {application.submitted}
                      </span>

                      <span className="text-xs text-slate-400">
                        Documents: {application.documents}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Status + Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                  <span className="self-start px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-semibold">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2" />
                    Pending Review
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/frontoffice/applications/${application.id}`
                      )
                    }
                    className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition"
                  >
                    Review Application
                  </button>

                </div>

              </div>

            </div>

          ))}

          {/* Empty State */}
          {filteredApplications.length === 0 && (

            <div className="py-16 text-center px-5">

              <div className="text-3xl mb-3">
                🔍
              </div>

              <h3 className="font-semibold text-slate-700">
                No pending applications found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default PendingReview;