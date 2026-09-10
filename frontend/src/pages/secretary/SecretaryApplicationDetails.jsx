import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  User,
  FileText,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

const SecretaryApplicationDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  const [forwarding, setForwarding] = useState(false);

  const [remarks, setRemarks] = useState("");

  const [error, setError] = useState("");

  // ================= FETCH APPLICATION =================

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await fetch(
          `http://localhost:5000/api/applications/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch application"
          );
        }

        setApplication(data.application);

        setRemarks(data.application?.remarks || "");
      } catch (error) {
        console.error("Fetch application error:", error);

        setError(
          error.message || "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // ================= FORMAT DATE =================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  // ================= FORWARD TO CHAIRPERSON =================

  const handleForward = async () => {
    try {
      setForwarding(true);

      const response = await fetch(
        `http://localhost:5000/api/applications/${id}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status: "recommended",
            remarks,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to forward application"
        );
      }

      alert(
        "Application successfully forwarded to the Chairperson!"
      );

      navigate("/secretary/applications");
    } catch (error) {
      console.error("Forward application error:", error);

      alert(
        error.message || "Failed to forward application"
      );
    } finally {
      setForwarding(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">

        <Loader2
          size={35}
          className="animate-spin text-blue-700"
        />

        <p className="mt-4 text-sm text-slate-500">
          Loading application...
        </p>

      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="mx-auto mt-8 flex max-w-5xl items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">

        <AlertCircle size={22} />

        <p className="font-medium">
          {error}
        </p>

      </div>
    );
  }

  if (!application) return null;

  const applicant = application.applicantDetails || {};

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">

      {/* ================= HEADER ================= */}

      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-900"
          >

            <ArrowLeft size={18} />

            Back to Applications

          </button>

          <p className="text-sm font-semibold text-red-600">
            Secretary Review
          </p>

          <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">

            {application.applicationNumber || application._id}

          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review the verified application before forwarding it
            to the Ward Chairperson.
          </p>

        </div>


        {/* VERIFIED STATUS */}

        <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">

          <CheckCircle2 size={17} />

          {application.status || "Verified"}

        </div>

      </section>


      {/* ================= APPLICATION SUMMARY ================= */}

      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-medium text-blue-700">
              Application Number
            </p>

            <h2 className="mt-1 text-xl font-bold text-blue-950">

              {application.applicationNumber || application._id}

            </h2>

          </div>


          <div className="flex items-center gap-2 text-sm text-slate-600">

            <CalendarDays size={17} />

            Submitted on {formatDate(application.createdAt)}

          </div>

        </div>

      </section>


      {/* ================= APPLICANT INFORMATION ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-200 p-5">

          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-900">

            <User size={21} />

          </div>

          <div>

            <h2 className="font-bold text-blue-950">
              Applicant Information
            </h2>

            <p className="text-sm text-slate-500">
              Citizen information submitted with the application
            </p>

          </div>

        </div>


        <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">

          <Info
            label="Full Name"
            value={
              applicant.fullName ||
              application.user?.name
            }
          />

          <Info
            label="Citizenship Number"
            value={applicant.citizenshipNumber}
          />

          <Info
            label="Phone Number"
            value={applicant.phone}
          />

          <Info
            label="Email"
            value={
              applicant.email ||
              application.user?.email
            }
          />

          <Info
            label="Address"
            value={applicant.address}
          />

        </div>

      </section>


      {/* ================= APPLICATION INFORMATION ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-200 p-5">

          <div className="rounded-xl bg-red-50 p-2.5 text-red-600">

            <FileText size={21} />

          </div>

          <div>

            <h2 className="font-bold text-blue-950">
              Application Information
            </h2>

            <p className="text-sm text-slate-500">
              Requested ward service details
            </p>

          </div>

        </div>


        <div className="grid gap-5 p-5 sm:grid-cols-2">

          <Info
            label="Requested Service"
            value={application.service}
          />

          <Info
            label="Current Status"
            value={application.status}
          />

        </div>

      </section>


      {/* ================= DOCUMENTS ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-200 p-5">

          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-900">

            <FileText size={21} />

          </div>

          <div>

            <h2 className="font-bold text-blue-950">
              Supporting Documents
            </h2>

            <p className="text-sm text-slate-500">
              Documents submitted by the citizen
            </p>

          </div>

        </div>


        <div className="p-5">

          {application.documents?.length > 0 ? (

            <div className="space-y-3">

              {application.documents.map((document, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                >

                  <FileText
                    size={20}
                    className="text-blue-700"
                  />

                  <div>

                    <p className="font-semibold text-slate-800">

                      {document.name ||
                        `Document ${index + 1}`}

                    </p>

                    <p className="text-xs text-slate-500">
                      Submitted document
                    </p>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No documents available for this application.
            </p>

          )}

        </div>

      </section>


      {/* ================= PAYMENT ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center gap-3 border-b border-slate-200 p-5">

          <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">

            <CreditCard size={21} />

          </div>

          <div>

            <h2 className="font-bold text-blue-950">
              Payment Information
            </h2>

            <p className="text-sm text-slate-500">
              Application payment details
            </p>

          </div>

        </div>


        <div className="p-5">

          <Info
            label="Payment Status"
            value={
              application.payment?.status ||
              "Payment information not available"
            }
          />

        </div>

      </section>


      {/* ================= FRONT OFFICE VERIFICATION ================= */}

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">

            <ShieldCheck size={22} />

          </div>

          <div>

            <h2 className="font-bold text-emerald-900">
              Front Office Verification Completed
            </h2>

            <p className="mt-1 text-sm leading-6 text-emerald-800">

              The application has been verified by the Front
              Office and is ready for Secretary review.

            </p>

          </div>

        </div>

      </section>


      {/* ================= SECRETARY REMARKS ================= */}

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">

          <h2 className="font-bold text-blue-950">
            Secretary Remarks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add remarks or recommendations before forwarding
            the application.
          </p>

        </div>


        <div className="p-5">

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={5}
            placeholder="Enter your remarks or recommendation..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </section>


      {/* ================= FORWARD ACTION ================= */}

      {application.status === "verified" && (

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="font-bold text-blue-950">
                Forward to Ward Chairperson
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">

                After reviewing the application, forward it to
                the Ward Chairperson for final approval.

              </p>

            </div>


            <button
              onClick={handleForward}
              disabled={forwarding}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-950 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {forwarding ? (

                <Loader2
                  size={18}
                  className="animate-spin"
                />

              ) : (

                <Send size={18} />

              )}

              {forwarding
                ? "Forwarding..."
                : "Forward to Chairperson"}

            </button>

          </div>

        </section>

      )}

    </div>
  );
};


// ================= INFO COMPONENT =================

const Info = ({ label, value }) => {

  return (

    <div>

      <p className="text-xs font-medium text-slate-400">

        {label}

      </p>

      <p className="mt-1 font-semibold text-slate-800">

        {value || "N/A"}

      </p>

    </div>

  );

};

export default SecretaryApplicationDetails;