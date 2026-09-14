import React, { useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  MapPin,
  Receipt,
  Send,
  User,
  AlertCircle,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";
import { useApplication } from "../../context/ApplicationContext";

const API = "http://localhost:5000/api/applications";

const ReviewSubmit = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const { token } = useAuth();

  const { applicationData, clearApplication } = useApplication();

  const service = searchParams.get("service");

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applicant = applicationData?.applicantDetails || {};
  const address = applicationData?.address || {};
  const documents = applicationData?.documents || {};
  const payment = applicationData?.payment || {};

  const documentEntries = Object.entries(documents).filter(
    ([, file]) => file instanceof File
  );

  const serviceName = service
    ? t(`newApplication.services.${service}`)
    : applicationData?.service || "-";

  const handleSubmit = async () => {
    if (!confirmed) {
      setError("Please confirm your information before submitting.");
      return;
    }

    const authToken =
      token || localStorage.getItem("sifarish_token");

    if (!authToken) {
      setError("Please login again.");
      return;
    }

    if (
      !applicationData?.service ||
      !applicant.fullName ||
      !applicant.citizenshipNumber ||
      !applicant.dateOfBirth ||
      !applicant.phone
    ) {
      setError("Some required information is missing.");
      return;
    }

    if (documentEntries.length === 0) {
      setError("Please upload at least one document.");
      return;
    }

    if (
      (payment.required || applicationData?.paymentRequired) &&
      !(payment.voucher instanceof File)
    ) {
      setError("Please upload your payment voucher.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("service", applicationData.service);

      formData.append("fullName", applicant.fullName);

      formData.append(
        "citizenshipNumber",
        applicant.citizenshipNumber
      );

      formData.append("dateOfBirth", applicant.dateOfBirth);

      formData.append("phone", applicant.phone);

      formData.append("email", applicant.email || "");

      formData.append("province", address.province || "");

      formData.append("district", address.district || "");

      formData.append(
        "municipality",
        address.municipality || ""
      );

      formData.append(
        "wardNumber",
        address.wardNumber || ""
      );

      formData.append("tole", address.tole || "");

      formData.append(
        "amount",
        payment.amount ?? applicationData.fee ?? 0
      );

      formData.append(
        "documentTypes",
        JSON.stringify(
          documentEntries.map(([type]) => type)
        )
      );

      documentEntries.forEach(([, file]) => {
        formData.append("documents", file);
      });

      if (payment.voucher instanceof File) {
        formData.append("voucher", payment.voucher);
      }

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit application."
        );
      }

      // Clear the draft only after successful submission.
      clearApplication();

      navigate("/citizen/applications");
    } catch (err) {
      console.error("SUBMIT ERROR:", err);

      setError(
        err.message || "Failed to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">
          {t("reviewPage.stepFive")}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          {t("reviewPage.title")}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {t("reviewPage.description")}
        </p>
      </section>

      {/* Service */}
      <section className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
        <div className="border-l-4 border-blue-900 bg-blue-50 px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Service
          </p>

          <p className="mt-2 text-lg font-extrabold text-blue-950">
            {serviceName}
          </p>
        </div>
      </section>

      {/* Applicant Information */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={User}
          title="Applicant Information"
          description="Please verify your personal information before submission."
        />

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <InfoItem
            label="Full Name"
            value={applicant.fullName}
          />

          <InfoItem
            label="Citizenship Number"
            value={applicant.citizenshipNumber}
          />

          <InfoItem
            label="Date of Birth"
            value={applicant.dateOfBirth}
          />

          <InfoItem
            label="Phone"
            value={applicant.phone}
          />

          <InfoItem
            label="Email"
            value={applicant.email}
          />
        </div>
      </section>

      {/* Address */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={MapPin}
          title="Address"
          description="Address information provided for this application."
        />

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          <InfoItem
            label="Province"
            value={address.province}
          />

          <InfoItem
            label="District"
            value={address.district}
          />

          <InfoItem
            label="Municipality"
            value={address.municipality}
          />

          <InfoItem
            label="Ward Number"
            value={address.wardNumber}
          />

          <InfoItem
            label="Tole"
            value={address.tole}
          />
        </div>
      </section>

      {/* Documents */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={FileText}
          title="Uploaded Documents"
          description="Review the documents you have uploaded."
        />

        <div className="p-5 sm:p-6">
          {documentEntries.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <FileText
                size={42}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-600">
                No documents uploaded
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {documentEntries.map(([type, file]) => (
                <div
                  key={type}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Document Preview */}
                  <div className="flex min-h-[260px] items-center justify-center overflow-hidden bg-slate-100">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-[260px] w-full object-contain bg-white"
                      />
                    ) : (
                      <div className="flex h-[260px] w-full flex-col items-center justify-center bg-white">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
                          <FileText
                            size={40}
                            className="text-red-600"
                          />
                        </div>

                        <p className="mt-4 font-bold text-slate-800">
                          PDF / Document
                        </p>

                        <p className="mt-1 max-w-[80%] truncate text-sm text-slate-500">
                          {file.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Document Details */}
                  <div className="border-t border-slate-200 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                      Document
                    </p>

                    <h3 className="mt-1 text-base font-bold capitalize text-blue-950">
                      {type.replace(/[-_]/g, " ")}
                    </h3>

                    <p className="mt-2 truncate text-sm text-slate-500">
                      {file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Payment */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={Receipt}
          title="Payment Information"
          description="Review the payment details before submitting."
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Application Fee
              </p>

              <p className="mt-1 text-2xl font-extrabold text-blue-950">
                Rs.{" "}
                {payment.amount ??
                  applicationData?.fee ??
                  0}
              </p>
            </div>

            {payment.voucher instanceof File && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-green-700">
                  Payment Voucher
                </p>

                <p className="mt-1 max-w-xs truncate text-sm font-semibold text-green-800">
                  {payment.voucher.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5 sm:p-6">
          <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => {
                setConfirmed(e.target.checked);
                setError("");
              }}
              className="mt-1 h-5 w-5 shrink-0 accent-red-600"
            />

            <div>
              <p className="font-bold text-blue-950">
                Confirm Information
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {t("reviewPage.confirmation")}
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <p>{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            navigate(
              `/citizen/apply/payment?service=${
                service ||
                applicationData?.service ||
                ""
              }`
            )
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-blue-950 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={18} />

          {t("reviewPage.back")}
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!confirmed || loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />

              {t("reviewPage.submit")}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-950 sm:text-xl">
            {title}
          </h2>

          <p className="mt-0.5 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
};

export default ReviewSubmit;