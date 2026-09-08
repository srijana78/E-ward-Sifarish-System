
import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  ArrowLeft,
  User,
  FileText,
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Download,
} from "lucide-react";

const FrontOfficeApplicationDetails = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { id } = useParams();

  // Temporary data
  // Later this will come from the backend
  const application = {
    id: id || "EW-2026-001",
    applicant: "Ram Sharma",
    service: "Residence Recommendation",
    submittedDate: "2026-09-04",
    citizenshipNumber: "12-01-78-12345",
    phone: "9800000000",
    email: "ram@example.com",
    address: "Nepalgunj, Banke",
    status: "Pending",
    documents: [
      "Citizenship Certificate.pdf",
      "Ward Recommendation.pdf",
    ],
    paymentStatus: "Paid",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 mt-9">
      
      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-900"
          >
            <ArrowLeft size={18} />

            {t("frontOfficeApplicationDetails.back")}
          </button>

          <p className="text-sm font-semibold text-red-600">
            {t("frontOfficeApplicationDetails.label")}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
            {t("frontOfficeApplicationDetails.title")}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            {t("frontOfficeApplicationDetails.description")}
          </p>
        </div>

        {/* Status */}
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
          <Clock3 size={17} />

          {t("frontOfficeApplicationDetails.pending")}
        </div>
      </section>


      {/* Application ID */}
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">
              {t("frontOfficeApplicationDetails.applicationId")}
            </p>

            <h2 className="mt-1 text-xl font-bold text-blue-950">
              {application.id}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays size={17} />

            <span>
              {t("frontOfficeApplicationDetails.submittedOn")}{" "}
              {application.submittedDate}
            </span>
          </div>
        </div>
      </section>


      {/* Applicant Information */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-lg bg-blue-50 p-2.5 text-blue-900">
            <User size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("frontOfficeApplicationDetails.applicantInformation")}
            </h2>

            <p className="text-sm text-slate-500">
              {t("frontOfficeApplicationDetails.applicantInformationDescription")}
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-slate-400">
              {t("frontOfficeApplicationDetails.fullName")}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.applicant}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {t("frontOfficeApplicationDetails.citizenshipNumber")}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.citizenshipNumber}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {t("frontOfficeApplicationDetails.phone")}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.phone}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {t("frontOfficeApplicationDetails.email")}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400">
              {t("frontOfficeApplicationDetails.address")}
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.address}
            </p>
          </div>
        </div>
      </section>


      {/* Application Information */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
            <FileText size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("frontOfficeApplicationDetails.applicationInformation")}
            </h2>

            <p className="text-sm text-slate-500">
              {t("frontOfficeApplicationDetails.applicationInformationDescription")}
            </p>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs font-medium text-slate-400">
            {t("frontOfficeApplicationDetails.requestedService")}
          </p>

          <p className="mt-1 text-lg font-semibold text-blue-950">
            {application.service}
          </p>
        </div>
      </section>


      {/* Documents */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-lg bg-blue-50 p-2.5 text-blue-900">
            <FileText size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("frontOfficeApplicationDetails.documents")}
            </h2>

            <p className="text-sm text-slate-500">
              {t("frontOfficeApplicationDetails.documentsDescription")}
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {application.documents.map((document, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                  <FileText size={18} />
                </div>

                <p className="text-sm font-medium text-slate-700">
                  {document}
                </p>
              </div>

              <button className="rounded-lg border border-slate-200 p-2 text-blue-900 transition hover:bg-blue-50">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* Payment */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
            <CreditCard size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("frontOfficeApplicationDetails.paymentInformation")}
            </h2>

            <p className="text-sm text-slate-500">
              {t("frontOfficeApplicationDetails.paymentInformationDescription")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-5">
          <p className="font-medium text-slate-700">
            {t("frontOfficeApplicationDetails.paymentStatus")}
          </p>

          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
            <CheckCircle2 size={16} />

            {t("frontOfficeApplicationDetails.paid")}
          </span>
        </div>
      </section>


      {/* Verification Action */}
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="rounded-lg bg-white p-2.5 text-blue-900">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="font-bold text-blue-950">
                {t("frontOfficeApplicationDetails.verification")}
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                {t("frontOfficeApplicationDetails.verificationDescription")}
              </p>
            </div>
          </div>

          <button
            onClick={() => alert("Application verified successfully!")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <CheckCircle2 size={18} />

            {t("frontOfficeApplicationDetails.verifyApplication")}
          </button>
        </div>
      </section>

    </div>
  );
};

export default FrontOfficeApplicationDetails;
