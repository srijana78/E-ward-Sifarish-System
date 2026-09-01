import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FrontOfficeApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Temporary application data
  const application = {
    id: id,
    applicant: "Srijana Bhakri",
    email: "srijana@example.com",
    phone: "98XXXXXXXX",
    address: "Nepalgunj, Banke",
    service: "Residence Recommendation",
    nepaliService: "बसोबास प्रमाणित सिफारिस",
    submitted: "September 1, 2026, 9:30 AM",
    purpose: "For official documentation purpose.",
  };

  // ==============================
  // VERIFY APPLICATION
  // ==============================

  const handleVerify = () => {
    setStatus("Verified");
    setShowRejectBox(false);
  };

  // ==============================
  // REJECT APPLICATION
  // ==============================

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    setStatus("Rejected");
    setShowRejectBox(false);
  };

  // ==============================
  // STATUS STYLE
  // ==============================

  const getStatusStyle = () => {
    if (status === "Verified") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Rejected") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="max-w-6xl mx-auto">

      {/* =====================================
          BACK BUTTON
      ====================================== */}

      <button
        onClick={() => navigate(-1)}
        className="mb-5 text-sm font-semibold text-blue-700 hover:text-blue-800"
      >
        ← Back to Applications
      </button>


      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">

        <div>

          <p className="text-sm font-medium text-blue-700">
            Ward Administration
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Application Details
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            आवेदन विवरण तथा प्रमाणीकरण
          </p>

        </div>


        {/* Status */}

        <div
          className={`
            self-start
            px-4
            py-2
            rounded-full
            border
            text-xs
            font-semibold
            ${getStatusStyle()}
          `}
        >
          <span className="mr-2">●</span>
          {status}
        </div>

      </div>


      {/* =====================================
          APPLICATION ID
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <p className="text-xs text-slate-400">
              Application ID
            </p>

            <p className="text-lg font-bold text-slate-900 mt-1">
              {application.id}
            </p>

          </div>


          <div>

            <p className="text-xs text-slate-400">
              Submitted
            </p>

            <p className="text-sm font-semibold text-slate-700 mt-1">
              {application.submitted}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          APPLICANT INFORMATION
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">

        <div className="p-5 border-b border-slate-100">

          <h2 className="text-lg font-bold text-slate-900">
            Applicant Information
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            आवेदकको विवरण
          </p>

        </div>


        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <p className="text-xs text-slate-400">
              Full Name
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.applicant}
            </p>
          </div>


          <div>
            <p className="text-xs text-slate-400">
              Phone Number
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.phone}
            </p>
          </div>


          <div>
            <p className="text-xs text-slate-400">
              Email Address
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.email}
            </p>
          </div>


          <div>
            <p className="text-xs text-slate-400">
              Address
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.address}
            </p>
          </div>

        </div>

      </div>


      {/* =====================================
          SERVICE INFORMATION
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">

        <div className="p-5 border-b border-slate-100">

          <h2 className="text-lg font-bold text-slate-900">
            Service Information
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            सेवाको विवरण
          </p>

        </div>


        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <p className="text-xs text-slate-400">
              Requested Service
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.service}
            </p>
          </div>


          <div>
            <p className="text-xs text-slate-400">
              Nepali Service
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-1">
              {application.nepaliService}
            </p>
          </div>


          <div className="sm:col-span-2">

            <p className="text-xs text-slate-400">
              Purpose
            </p>

            <p className="text-sm text-slate-700 mt-1">
              {application.purpose}
            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          DOCUMENTS
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">

        <div className="p-5 border-b border-slate-100">

          <h2 className="text-lg font-bold text-slate-900">
            Submitted Documents
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            पेश गरिएका कागजातहरू
          </p>

        </div>


        <div className="p-5 space-y-3">

          {/* Citizenship */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                📄
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Citizenship Certificate
                </p>

                <p className="text-xs text-slate-400">
                  citizenship.pdf
                </p>

              </div>

            </div>


            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100">
              View Document
            </button>

          </div>


          {/* Recommendation */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                📄
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Ward Recommendation Form
                </p>

                <p className="text-xs text-slate-400">
                  recommendation.pdf
                </p>

              </div>

            </div>


            <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100">
              View Document
            </button>

          </div>

        </div>

      </div>


      {/* =====================================
          REVIEW SECTION
      ====================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Application Review
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Verify the submitted information before approving this application.
        </p>


        {/* =================================
            REJECT REASON
        ================================== */}

        {showRejectBox && status === "Pending" && (

          <div className="mt-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Reason for Rejection
            </label>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter the reason for rejecting this application..."
              rows="4"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                resize-none
                focus:bg-white
                focus:border-red-400
                focus:ring-2
                focus:ring-red-100
              "
            />

          </div>

        )}


        {/* =================================
            ACTION BUTTONS
        ================================== */}

        {status === "Pending" ? (

          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button
              onClick={handleVerify}
              className="
                flex-1
                px-5
                py-3
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                text-sm
                font-semibold
                transition
              "
            >
              ✓ Verify Application
            </button>


            {!showRejectBox ? (

              <button
                onClick={() => setShowRejectBox(true)}
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                ✕ Reject Application
              </button>

            ) : (

              <button
                onClick={handleReject}
                className="
                  flex-1
                  px-5
                  py-3
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                Confirm Rejection
              </button>

            )}

          </div>

        ) : (

          /* =================================
             COMPLETED STATE
          ================================== */

          <div
            className={`
              mt-6
              p-4
              rounded-xl
              border
              ${
                status === "Verified"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }
            `}
          >

            <p
              className={`
                text-sm
                font-semibold
                ${
                  status === "Verified"
                    ? "text-green-700"
                    : "text-red-700"
                }
              `}
            >
              {status === "Verified"
                ? "✓ This application has been verified successfully."
                : "✕ This application has been rejected."}
            </p>


            {status === "Rejected" && rejectReason && (

              <p className="text-xs text-red-600 mt-2">
                Reason: {rejectReason}
              </p>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default FrontOfficeApplicationDetails;