function Reports() {
  const reports = [
    {
      title: "Total Applications",
      value: 124,
      description: "Applications received",
      icon: "📋",
      color: "blue",
    },
    {
      title: "Pending Applications",
      value: 18,
      description: "Waiting for verification",
      icon: "⏳",
      color: "amber",
    },
    {
      title: "Verified Applications",
      value: 91,
      description: "Successfully verified",
      icon: "✓",
      color: "green",
    },
    {
      title: "Rejected Applications",
      value: 15,
      description: "Applications rejected",
      icon: "!",
      color: "red",
    },
  ];

  const services = [
    {
      name: "Residence Recommendation",
      nepali: "बसोबास प्रमाणित सिफारिस",
      count: 48,
    },
    {
      name: "Relationship Certificate",
      nepali: "नाता प्रमाणित सिफारिस",
      count: 31,
    },
    {
      name: "Land Recommendation",
      nepali: "जग्गा सम्बन्धी सिफारिस",
      count: 27,
    },
    {
      name: "Other Services",
      nepali: "अन्य सेवाहरू",
      count: 18,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">
          Ward Administration
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Reports
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          आवेदन तथा सेवाहरूको प्रतिवेदन
        </p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

        {reports.map((report) => (
          <div
            key={report.title}
            className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="text-xs sm:text-sm text-slate-500">
                  {report.title}
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                  {report.value}
                </p>

                <p className="text-[11px] text-slate-400 mt-1">
                  {report.description}
                </p>
              </div>

              <div
                className={`
                  w-10 h-10 rounded-xl
                  flex items-center justify-center
                  ${
                    report.color === "blue"
                      ? "bg-blue-50 text-blue-700"
                      : report.color === "amber"
                      ? "bg-amber-50 text-amber-700"
                      : report.color === "green"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }
                `}
              >
                {report.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Service Report */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Applications by Service
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            सेवाअनुसार आवेदनहरूको विवरण
          </p>
        </div>

        <div className="divide-y divide-slate-100">

          {services.map((service) => (
            <div
              key={service.name}
              className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">
                  {service.name}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {service.nepali}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-blue-700">
                  {service.count}
                </p>

                <p className="text-[10px] text-slate-400">
                  applications
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Reports;