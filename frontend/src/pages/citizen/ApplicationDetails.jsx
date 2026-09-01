import { useNavigate, useParams } from "react-router-dom";

function ApplicationDetails() {

  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary application data
  // Later this information will come from our backend.

  const application = {
    id: id || "EW-2026-00124",

    service: "Residence Recommendation",
    nepaliService: "बसोबास प्रमाणित सिफारिस",

    submittedDate: "September 1, 2026",

    status: "Pending",

    currentStage: "Document Verification",

    applicant: {
      name: "Srijana Bhakri",
      citizenship: "68-01-78-12345",
      phone: "98XXXXXXXX",
      province: "Lumbini Province",
      district: "Banke",
      municipality: "Nepalgunj Sub-Metropolitan City",
      ward: "Ward No. 10",
      address: "Nepalgunj, Banke",
      purpose: "For official documentation purpose",
    },

    documents: [
      {
        name: "Citizenship Certificate",
        status: "Uploaded",
        type: "PDF",
      },
      {
        name: "Payment Voucher",
        status: "Uploaded",
        type: "JPG",
      },
    ],

    payment: {
      method: "eSewa",
      amount: "Rs. 100",
      status: "Pending Verification",
    },
  };


  // =====================================
  // APPLICATION TIMELINE
  // =====================================

  const timeline = [
    {
      title: "Application Submitted",
      nepali: "आवेदन पेश गरिएको",
      date: "September 1, 2026",
      status: "completed",
    },

    {
      title: "Document Verification",
      nepali: "कागजात प्रमाणीकरण",
      date: "In Progress",
      status: "current",
    },

    {
      title: "Secretary Review",
      nepali: "सचिव समीक्षा",
      date: "Waiting",
      status: "waiting",
    },

    {
      title: "Chairperson Approval",
      nepali: "वडा अध्यक्ष स्वीकृति",
      date: "Waiting",
      status: "waiting",
    },

    {
      title: "Certificate Issued",
      nepali: "प्रमाणपत्र जारी",
      date: "Waiting",
      status: "waiting",
    },
  ];


  // =====================================
  // TIMELINE ICON
  // =====================================

  const getTimelineIcon = (status) => {

    if (status === "completed") {
      return "✓";
    }

    if (status === "current") {
      return "●";
    }

    return "○";
  };


  return (

    <div className="max-w-7xl mx-auto">

      {/* =====================================
          BACK BUTTON
      ====================================== */}

      <button
        onClick={() => navigate("/citizen/applications")}
        className="mb-5 text-sm text-slate-500 hover:text-blue-700 transition"
      >
        ← Back to My Applications
      </button>


      {/* =====================================
          APPLICATION HEADER
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 sm:p-7">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

            <div className="flex gap-4">

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl shrink-0">
                📄
              </div>

              <div>

                <p className="text-xs font-medium text-slate-400 mb-1">
                  Application ID
                </p>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {application.id}
                </h1>

                <h2 className="text-sm sm:text-base font-semibold text-slate-700 mt-2">
                  {application.service}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {application.nepaliService}
                </p>

              </div>

            </div>


            {/* Status */}

            <span className="self-start inline-flex items-center px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold">

              <span className="w-2 h-2 rounded-full bg-current mr-2" />

              {application.status}

            </span>

          </div>


          {/* Submitted information */}

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">

            <div>

              <p className="text-xs text-slate-400">
                Submitted On
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1">
                {application.submittedDate}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Current Stage
              </p>

              <p className="text-sm font-semibold text-amber-600 mt-1">
                {application.currentStage}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          MAIN GRID
      ====================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">


        {/* =====================================
            LEFT — TIMELINE
        ====================================== */}

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">

          <div className="mb-7">

            <h2 className="text-lg font-bold text-slate-900">
              Application Progress
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              आवेदनको प्रगति
            </p>

          </div>


          <div>

            {timeline.map((item, index) => (

              <div
                key={item.title}
                className="flex gap-4"
              >

                {/* Timeline column */}

                <div className="flex flex-col items-center">

                  {/* Circle */}

                  <div
                    className={`
                      w-9 h-9
                      rounded-full
                      flex items-center justify-center
                      text-sm font-bold
                      shrink-0
                      ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "current"
                          ? "bg-blue-100 text-blue-700 ring-4 ring-blue-50"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >

                    {getTimelineIcon(item.status)}

                  </div>


                  {/* Line */}

                  {index < timeline.length - 1 && (

                    <div
                      className={`
                        w-0.5 h-16 sm:h-20
                        ${
                          item.status === "completed"
                            ? "bg-green-200"
                            : "bg-slate-200"
                        }
                      `}
                    />

                  )}

                </div>


                {/* Content */}

                <div className="pb-7">

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">

                    <h3
                      className={`
                        text-sm sm:text-base font-semibold
                        ${
                          item.status === "waiting"
                            ? "text-slate-400"
                            : "text-slate-800"
                        }
                      `}
                    >
                      {item.title}
                    </h3>


                    {item.status === "current" && (

                      <span className="self-start px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                        Current
                      </span>

                    )}

                  </div>


                  <p className="text-xs text-slate-400 mt-1">
                    {item.nepali}
                  </p>

                  <p
                    className={`
                      text-xs mt-2
                      ${
                        item.status === "current"
                          ? "text-blue-600 font-medium"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {item.date}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================
            RIGHT — SUMMARY
        ====================================== */}

        <div className="space-y-5">


          {/* Application summary */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5">

            <h2 className="font-bold text-slate-900">
              Application Summary
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              आवेदन सारांश
            </p>


            <div className="mt-5 space-y-4">

              <div>

                <p className="text-xs text-slate-400">
                  Service
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {application.service}
                </p>

              </div>


              <div>

                <p className="text-xs text-slate-400">
                  Application ID
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1 break-all">
                  {application.id}
                </p>

              </div>


              <div>

                <p className="text-xs text-slate-400">
                  Submitted
                </p>

                <p className="text-sm font-semibold text-slate-700 mt-1">
                  {application.submittedDate}
                </p>

              </div>


              <div>

                <p className="text-xs text-slate-400">
                  Status
                </p>

                <p className="text-sm font-semibold text-amber-600 mt-1">
                  {application.status}
                </p>

              </div>

            </div>

          </div>


          {/* Payment */}

          <div className="bg-white border border-slate-200 rounded-2xl p-5">

            <h2 className="font-bold text-slate-900">
              Payment Information
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              भुक्तानी विवरण
            </p>


            <div className="mt-5 space-y-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Method
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {application.payment.method}
                </span>

              </div>


              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Amount
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  {application.payment.amount}
                </span>

              </div>


              <div className="flex items-center justify-between gap-3">

                <span className="text-sm text-slate-500">
                  Verification
                </span>

                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Pending
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          APPLICANT INFORMATION
      ====================================== */}

      <div className="mt-5 bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 sm:p-7">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-slate-900">
              Applicant Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              आवेदकको विवरण
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">

            <div>

              <p className="text-xs text-slate-400">
                Full Name
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.name}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Citizenship Number
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.citizenship}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Phone Number
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.phone}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Province
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.province}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                District
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.district}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Municipality
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.municipality}
              </p>

            </div>


            <div>

              <p className="text-xs text-slate-400">
                Ward
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.ward}
              </p>

            </div>


            <div className="sm:col-span-2">

              <p className="text-xs text-slate-400">
                Address
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.address}
              </p>

            </div>


            <div className="sm:col-span-2 lg:col-span-3">

              <p className="text-xs text-slate-400">
                Purpose
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                {application.applicant.purpose}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          DOCUMENTS
      ====================================== */}

      <div className="mt-5 bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 sm:p-7">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-slate-900">
              Submitted Documents
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              पेश गरिएका कागजातहरू
            </p>

          </div>


          <div className="space-y-3">

            {application.documents.map((document) => (

              <div
                key={document.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50"
              >

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    📄
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      {document.name}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {document.type}
                    </p>

                  </div>

                </div>


                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                  ✓ {document.status}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================
          CERTIFICATE
      ====================================== */}

      <div className="mt-5 bg-slate-100 border border-slate-200 rounded-2xl p-5 sm:p-7">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex gap-4">

            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl">
              📜
            </div>

            <div>

              <h2 className="font-bold text-slate-800">
                Digital Certificate
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your certificate will appear here after final approval.
              </p>

            </div>

          </div>


          <button
            disabled
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-400 text-sm font-semibold cursor-not-allowed"
          >
            Download Certificate
          </button>

        </div>

      </div>

    </div>

  );
}

export default ApplicationDetails;