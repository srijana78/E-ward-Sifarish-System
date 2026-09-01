import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");

  // Temporary data
  // Later this will come from MongoDB through our API.

  const applications = [
    {
      id: "EW-2026-00124",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      submittedDate: "Sep 1, 2026",
      status: "Pending",
      stage: "Document Verification",
    },
    {
      id: "EW-2026-00118",
      service: "Relationship Certificate",
      nepaliService: "नाता प्रमाणित",
      submittedDate: "Aug 28, 2026",
      status: "Approved",
      stage: "Certificate Ready",
    },
    {
      id: "EW-2026-00097",
      service: "Land Recommendation",
      nepaliService: "जग्गा सम्बन्धी सिफारिस",
      submittedDate: "Aug 20, 2026",
      status: "Rejected",
      stage: "Application Rejected",
    },
  ];


  // Filter applications

  const filteredApplications =
    activeFilter === "All"
      ? applications
      : applications.filter(
          (application) => application.status === activeFilter
        );


  // Status styles

  const getStatusStyle = (status) => {

    switch (status) {

      case "Approved":
        return "bg-green-50 text-green-700 border-green-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "Pending":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }

  };


  return (

    <div className="max-w-7xl mx-auto">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">

        <div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            मेरा आवेदनहरू
          </p>

        </div>


        <button
          onClick={() => navigate("/citizen/new-application")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <span className="text-lg leading-none">
            +
          </span>

          New Application
        </button>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ====================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

        {/* Total */}

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Total Applications
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-2">
            3
          </p>

        </div>


        {/* Pending */}

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Pending
          </p>

          <p className="text-2xl font-bold text-amber-600 mt-2">
            1
          </p>

        </div>


        {/* Approved */}

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Approved
          </p>

          <p className="text-2xl font-bold text-green-600 mt-2">
            1
          </p>

        </div>


        {/* Rejected */}

        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Rejected
          </p>

          <p className="text-2xl font-bold text-red-600 mt-2">
            1
          </p>

        </div>

      </div>


      {/* =====================================
          FILTERS
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-xl p-3 mb-5">

        <div className="flex items-center gap-2 overflow-x-auto">

          {["All", "Pending", "Approved", "Rejected"].map(
            (filter) => (

              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  whitespace-nowrap
                  px-4 py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    activeFilter === filter
                      ? "bg-blue-700 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                {filter}
              </button>

            )
          )}

        </div>

      </div>


      {/* =====================================
          APPLICATION LIST
      ====================================== */}

      <div className="space-y-4">

        {filteredApplications.map((application) => (

          <div
            key={application.id}
            className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-sm transition"
          >

            {/* Top section */}

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">


              {/* Application information */}

              <div className="flex gap-4">

                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl shrink-0">
                  📄
                </div>


                <div>

                  <h2 className="font-bold text-slate-900">
                    {application.service}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {application.nepaliService}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">

                    <p className="text-xs text-slate-500">
                      Application ID:
                      <span className="font-semibold text-slate-700 ml-1">
                        {application.id}
                      </span>
                    </p>

                    <p className="text-xs text-slate-500">
                      Submitted:
                      <span className="font-semibold text-slate-700 ml-1">
                        {application.submittedDate}
                      </span>
                    </p>

                  </div>

                </div>

              </div>


              {/* Status */}

              <span
                className={`
                  self-start
                  inline-flex
                  items-center
                  px-3
                  py-1.5
                  rounded-full
                  border
                  text-xs
                  font-semibold
                  ${getStatusStyle(application.status)}
                `}
              >

                <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />

                {application.status}

              </span>

            </div>


            {/* Progress */}

            <div className="mt-6 pt-5 border-t border-slate-100">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs font-semibold text-slate-700">
                  Current Stage
                </p>

                <p className="text-xs text-slate-500">
                  {application.stage}
                </p>

              </div>


              {/* Progress line */}

              <div className="relative">

                <div className="h-1.5 bg-slate-100 rounded-full" />

                <div
                  className={`
                    absolute
                    top-0
                    left-0
                    h-1.5
                    rounded-full
                    ${
                      application.status === "Approved"
                        ? "w-full bg-green-500"
                        : application.status === "Rejected"
                        ? "w-1/2 bg-red-500"
                        : "w-1/3 bg-amber-500"
                    }
                  `}
                />

              </div>


              {/* Bottom actions */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">

                <p className="text-xs text-slate-400">
                  Last updated recently
                </p>


                <button
                  onClick={() =>
                    navigate(
                      `/citizen/applications/${application.id}`
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-sm font-semibold transition"
                >
                  View Details →
                </button>

              </div>

            </div>

          </div>

        ))}


        {/* Empty state */}

        {filteredApplications.length === 0 && (

          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">

            <div className="text-4xl mb-3">
              📄
            </div>

            <h3 className="font-semibold text-slate-800">
              No applications found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              You don't have any applications in this category.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}

export default MyApplications;