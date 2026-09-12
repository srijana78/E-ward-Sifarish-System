import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  FileText,
  User,
  Receipt,
  ArrowLeft,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const ReviewSubmit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { user, token } = useAuth();

  const service = searchParams.get("service");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let applicationData = null;

  try {
    applicationData = JSON.parse(
      sessionStorage.getItem("sifarish_application")
    );
  } catch {
    applicationData = null;
  }

  const serviceName = service
    ? t(`newApplication.services.${service}`)
    : "-";

  const handleSubmit = async () => {
    if (!confirmed) {
      return setError("Please confirm the information before submitting.");
    }

    if (!applicationData) {
      return setError("Application data not found. Please start again.");
    }

    const authToken =
      token || localStorage.getItem("sifarish_token");

    if (!authToken) {
      return setError("No login token found. Please login again.");
    }

    try {
      setLoading(true);
      setError("");

      const submitData = {
        service: applicationData.service || service || "",

        user: user?._id || user?.id,

        applicantDetails: applicationData.applicantDetails || {},

        address: applicationData.address || {},

        documents: Object.entries(
          applicationData.documents || {}
        ).map(([documentType, document]) => ({
          documentType,
          fileName: document?.name || "",
          fileUrl: "",
        })),

        payment: {
          voucherName:
            applicationData.payment?.voucherName || "",
          voucherUrl:
            applicationData.payment?.voucherUrl || "",
          status:
            applicationData.payment?.status || "pending",
        },
      };

      console.log("USER:", user);
      console.log("TOKEN:", authToken);
      console.log("SUBMITTING:", submitData);

      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(submitData),
        }
      );

      // Safely read response
      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Backend returned:", text);

        throw new Error(
          "Server returned HTML instead of JSON. Check your backend route."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit application"
        );
      }

      sessionStorage.removeItem("sifarish_application");

      alert("Application submitted successfully!");

      navigate("/citizen/applications");

    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const reviewItems = [
    {
      title: t("reviewPage.applicantInformation"),
      description:
        applicationData?.applicantDetails?.fullName ||
        "Applicant information completed",
      icon: User,
    },
    {
      title: t("reviewPage.documents"),
      description: `${Object.keys(
        applicationData?.documents || {}
      ).length} document(s) uploaded`,
      icon: FileText,
    },
    {
      title: t("reviewPage.payment"),
      description:
        applicationData?.payment?.voucherName ||
        "Payment information completed",
      icon: Receipt,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-6">

      {/* HEADER */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          {t("reviewPage.stepFive")}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-blue-950 sm:text-4xl">
          {t("reviewPage.title")}
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {t("reviewPage.description")}
        </p>
      </section>

      {/* PROGRESS */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-red-600" />

        <div className="p-5">
          <div className="mb-3 flex justify-between">
            <span className="font-bold text-blue-950">
              {t("reviewPage.progress")}
            </span>

            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
              5 / 5
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-full w-full rounded-full bg-red-600" />
          </div>
        </div>
      </section>

      {/* SERVICE */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-xs font-bold uppercase text-blue-700">
          {t("reviewPage.recommendation")}
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="rounded-lg bg-white p-3 text-blue-900">
            <FileText size={20} />
          </div>

          <p className="font-bold text-blue-950">
            {serviceName}
          </p>
        </div>
      </section>

      {/* DETAILS */}
      {applicationData && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-blue-950">
            Application Details
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Full Name", applicationData.applicantDetails?.fullName],
              [
                "Citizenship Number",
                applicationData.applicantDetails?.citizenshipNumber,
              ],
              ["Phone", applicationData.applicantDetails?.phone],
              [
                "Email",
                applicationData.applicantDetails?.email,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-semibold text-slate-400">
                  {label}
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEW */}
      <section>
        <h2 className="text-xl font-bold text-blue-950">
          {t("reviewPage.reviewBeforeSubmit")}
        </h2>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {reviewItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 p-5 ${
                  index < reviewItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-blue-950">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>

                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* INFO */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            size={22}
            className="shrink-0 text-blue-900"
          />

          <div>
            <h3 className="font-bold text-blue-950">
              Important Information
            </h3>

            <p className="mt-2 text-sm text-blue-800">
              Please review all your information carefully before
              submitting your application.
            </p>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* CONFIRM */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-red-600"
          />

          <span className="text-sm text-slate-700">
            {t("reviewPage.confirmation")}
          </span>
        </label>
      </section>

      {/* BUTTONS */}
      <section className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">

        <button
          disabled={loading}
          onClick={() =>
            navigate(
              `/citizen/apply/payment?service=${service || ""}`
            )
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-bold text-blue-950"
        >
          <ArrowLeft size={18} />
          {t("reviewPage.back")}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!confirmed || loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 disabled:bg-slate-300"
        >
          <Send size={18} />

          {loading
            ? "Submitting..."
            : t("reviewPage.submit")}
        </button>

      </section>
    </div>
  );
};

export default ReviewSubmit;