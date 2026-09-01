function CitizenDashboard() {

  const stats = [
    {
      title: "Total Applications",
      nepali: "कुल आवेदन",
      value: "04",
      icon: "▦",
    },
    {
      title: "Pending",
      nepali: "प्रक्रियामा",
      value: "01",
      icon: "◷",
    },
    {
      title: "Approved",
      nepali: "स्वीकृत",
      value: "02",
      icon: "✓",
    },
    {
      title: "Rejected",
      nepali: "अस्वीकृत",
      value: "01",
      icon: "×",
    },
  ];


  const applications = [
    {
      id: "EW-2026-00124",
      service: "Residence Recommendation",
      nepali: "बसोबास प्रमाणित सिफारिस",
      date: "Sep 01, 2026",
      status: "Pending",
    },
    {
      id: "EW-2026-00118",
      service: "Relationship Certificate",
      nepali: "नाता प्रमाणित",
      date: "Aug 28, 2026",
      status: "Approved",
    },
    {
      id: "EW-2026-00105",
      service: "Land Recommendation",
      nepali: "जग्गा सम्बन्धी सिफारिस",
      date: "Aug 20, 2026",
      status: "Approved",
    },
  ];


  const statusStyle = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };


  return (

    <div className="max-w-7xl mx-auto space-y-6">


      {/* Welcome */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl p-6 sm:p-8 text-white shadow-sm">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-blue-100 text-sm mb-2">
              नमस्कार, Srijana 👋
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Welcome to your Citizen Portal
            </h2>

            <p className="mt-2 text-sm text-blue-100 max-w-xl">
              Apply for ward recommendations, track your applications,
              and access your digital certificates from anywhere.
            </p>

          </div>


          <button className="self-start lg:self-center bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-xl text-sm font-bold transition shadow-sm">
            + New Application
          </button>

        </div>

      </section>


      {/* Statistics */}
      <section>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {stats.map((stat) => (

            <div
              key={stat.title}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-sm transition"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-600">
                    {stat.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {stat.nepali}
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  {stat.icon}
                </div>

              </div>


              <p className="mt-5 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* Main Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        {/* Applications */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">

            <div>

              <h3 className="font-bold text-slate-900">
                Recent Applications
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                तपाईंका पछिल्ला आवेदनहरू
              </p>

            </div>

            <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              View All
            </button>

          </div>


          <div className="divide-y divide-slate-100">

            {applications.map((application) => (

              <div
                key={application.id}
                className="p-5 sm:p-6 hover:bg-slate-50 transition"
              >

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                  {/* Icon */}
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    ▤
                  </div>


                  {/* Details */}
                  <div className="flex-1 min-w-0">

                    <h4 className="font-semibold text-slate-900 text-sm">
                      {application.service}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1">
                      {application.nepali}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      {application.id} · {application.date}
                    </p>

                  </div>


                  {/* Status */}
                  <span
                    className={`self-start sm:self-center px-3 py-1.5 rounded-full border text-xs font-semibold ${statusStyle[application.status]}`}
                  >
                    {application.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Quick Actions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

          <div className="mb-5">

            <h3 className="font-bold text-slate-900">
              Quick Services
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              छिटो सेवा
            </p>

          </div>


          <div className="space-y-3">

            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition">

              <p className="text-sm font-semibold text-slate-800">
                Apply for Recommendation
              </p>

              <p className="text-xs text-slate-400 mt-1">
                नयाँ सिफारिसको लागि आवेदन
              </p>

            </button>


            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition">

              <p className="text-sm font-semibold text-slate-800">
                Track Application
              </p>

              <p className="text-xs text-slate-400 mt-1">
                आवेदनको स्थिति हेर्नुहोस्
              </p>

            </button>


            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition">

              <p className="text-sm font-semibold text-slate-800">
                Verify Certificate
              </p>

              <p className="text-xs text-slate-400 mt-1">
                प्रमाणपत्र प्रमाणीकरण
              </p>

            </button>

          </div>

        </div>

      </section>


      {/* Help Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            ?
          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-slate-900">
              Need help with your application?
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              आवेदन प्रक्रियाको बारेमा सहयोग चाहिन्छ?
            </p>

          </div>

          <button className="self-start sm:self-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Help & Support
          </button>

        </div>

      </section>

    </div>

  );
}

export default CitizenDashboard;