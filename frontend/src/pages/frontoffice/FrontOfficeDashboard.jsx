import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FrontOfficeDashboard() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Temporary data
  // Later this will come from our backend/database.
  const applications = [
    {
      id: "EW-2026-00124",
      applicant: "Srijana Bhakri",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      submitted: "Today, 9:30 AM",
      status: "Pending",
    },
    {
      id: "EW-2026-00123",
      applicant: "Ram Sharma",
      service: "Relationship Certificate",
      nepaliService: "नाता प्रमाणित सिफारिस",
      submitted: "Today, 8:45 AM",
      status: "Pending",
    },
    {
      id: "EW-2026-00121",
      applicant: "Mina Thapa",
      service: "Land Recommendation",
      nepaliService: "जग्गा सम्बन्धी सिफारिस",
      submitted: "Yesterday",
      status: "Verified",
    },
    {
      id: "EW-2026-00119",
      applicant: "Bikash KC",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      submitted: "Yesterday",
      status: "Rejected",
    },
  ];

  // Filter + Search
  const filteredApplications = applications.filter((application) => {
    const matchesFilter =
      activeFilter === "All" ||
      application.status === activeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      application.applicant.toLowerCase().includes(searchText) ||
      application.id.toLowerCase().includes(searchText) ||
      application.service.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  // Status styling
  const getStatusStyle = (status) => {
    if (status === "Verified") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-7 ">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-sm font-medium text-blue-700">
              Ward Administration
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Front Office Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              आवेदन प्रमाणीकरण तथा व्यवस्थापन
            </p>
          </div>

          {/* Date */}

          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">

            <p className="text-xs text-slate-400">
              Today's Date
            </p>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              September 1, 2026
            </p>

          </div>

        </div>

      </div>


      {/* =========================================
          STAT CARDS
      ========================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

        {/* Total */}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Total Applications
          </p>

          <div className="flex items-end justify-between mt-3">

            <p className="text-2xl sm:text-3xl font-bold text-slate-900">
              124
            </p>

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
              📋
            </div>

          </div>

        </div>


        {/* Pending */}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Pending Verification
          </p>

          <div className="flex items-end justify-between mt-3">

            <p className="text-2xl sm:text-3xl font-bold text-amber-600">
              18
            </p>

            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
              ⏳
            </div>

          </div>

        </div>


        {/* Verified */}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Verified
          </p>

          <div className="flex items-end justify-between mt-3">

            <p className="text-2xl sm:text-3xl font-bold text-green-600">
              91
            </p>

            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
              ✓
            </div>

          </div>

        </div>


        {/* Rejected */}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">

          <p className="text-xs sm:text-sm text-slate-500">
            Rejected
          </p>

          <div className="flex items-end justify-between mt-3">

            <p className="text-2xl sm:text-3xl font-bold text-red-600">
              15
            </p>

            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-700">
              !
            </div>

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

            {/* Title */}

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Applications
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                आवेदनहरूको सूची
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
                className="
                  w-full
                  pl-10
                  pr-4
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  text-sm
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  transition
                "
              />

            </div>

          </div>


          {/* Filters */}

          <div className="flex gap-2 overflow-x-auto mt-5">

            {["All", "Pending", "Verified", "Rejected"].map(
              (filter) => (

                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    text-xs
                    font-semibold
                    whitespace-nowrap
                    transition

                    ${
                      activeFilter === filter
                        ? "bg-blue-700 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }
                  `}
                >
                  {filter}
                </button>

              )
            )}

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

                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold shrink-0">
                    {application.applicant.charAt(0)}
                  </div>


                  {/* Details */}

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
                        {application.submitted}
                      </span>

                    </div>

                  </div>

                </div>


                {/* Status + Review */}

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                  {/* Status */}

                  <span
                    className={`
                      self-start
                      px-3
                      py-1.5
                      rounded-full
                      border
                      text-xs
                      font-semibold
                      ${getStatusStyle(application.status)}
                    `}
                  >

                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2" />

                    {application.status}

                  </span>


                  {/* Review Button */}

                  <button
                    onClick={() =>
                      navigate(
                        `/frontoffice/applications/${application.id}`
                      )
                    }
                    className="
                      px-5
                      py-2.5
                      rounded-lg
                      bg-blue-700
                      hover:bg-blue-800
                      text-white
                      text-xs
                      font-semibold
                      transition
                    "
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
                No applications found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default FrontOfficeDashboard;