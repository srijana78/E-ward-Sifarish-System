import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verified() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const verifiedApplications = [
    {
      id: "EW-2026-00121",
      applicant: "Mina Thapa",
      service: "Land Recommendation",
      nepaliService: "जग्गा सम्बन्धी सिफारिस",
      verifiedDate: "September 1, 2026",
      verifiedBy: "Front Office Staff",
    },
    {
      id: "EW-2026-00118",
      applicant: "Anita Sharma",
      service: "Residence Recommendation",
      nepaliService: "बसोबास प्रमाणित सिफारिस",
      verifiedDate: "August 31, 2026",
      verifiedBy: "Front Office Staff",
    },
    {
      id: "EW-2026-00115",
      applicant: "Ramesh Karki",
      service: "Relationship Certificate",
      nepaliService: "नाता प्रमाणित सिफारिस",
      verifiedDate: "August 30, 2026",
      verifiedBy: "Front Office Staff",
    },
  ];

  const filteredApplications = verifiedApplications.filter((application) => {
    const searchText = search.toLowerCase();

    return (
      application.applicant.toLowerCase().includes(searchText) ||
      application.id.toLowerCase().includes(searchText) ||
      application.service.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Header */}
      <div className="mb-7">
        <p className="text-sm font-medium text-green-700">
          Ward Administration
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Verified Applications
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          प्रमाणित आवेदनहरूको सूची
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Total Verified
          </p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-3xl font-bold text-green-600">
              91
            </p>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-xl">
              ✓
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Verified Today
          </p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-3xl font-bold text-blue-700">
              6
            </p>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl">
              📋
            </div>
          </div>
        </div>

      </div>

      {/* Applications */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Verified Applications
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                प्रमाणित आवेदनहरूको विवरण
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
                placeholder="Search verified application..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>

          </div>

        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">

          {filteredApplications.map((application) => (

            <div
              key={application.id}
              className="p-5 sm:p-6 hover:bg-slate-50 transition"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Applicant */}
                <div className="flex gap-4 min-w-0">

                  <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold shrink-0">
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
                        Verified: {application.verifiedDate}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Status + Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                  <span className="self-start px-3 py-1.5 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-semibold">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2" />
                    Verified
                  </span>

                  <button
                    onClick={() =>
                      navigate(
                        `/frontoffice/applications/${application.id}`
                      )
                    }
                    className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition"
                  >
                    View Application
                  </button>

                </div>

              </div>

            </div>

          ))}

          {filteredApplications.length === 0 && (
            <div className="py-16 text-center">

              <div className="text-3xl mb-3">
                🔍
              </div>

              <h3 className="font-semibold text-slate-700">
                No verified applications found
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

export default Verified;