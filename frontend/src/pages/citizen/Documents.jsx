import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApplication } from "../../context/ApplicationContext";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  CheckCircle2,
  X,
} from "lucide-react";

const requiredDocuments = [
  {
    id: "citizenship",
    titleKey: "citizenship",
    descriptionKey: "citizenshipDescription",
    required: true,
  },
  {
    id: "application",
    titleKey: "application",
    descriptionKey: "applicationDescription",
    required: true,
  },
  {
    id: "supporting",
    titleKey: "supporting",
    descriptionKey: "supportingDescription",
    required: false,
  },
];

const Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { applicationData, updateDocuments } = useApplication();

  const service = new URLSearchParams(search).get("service");

  const [documents, setDocuments] = useState(
    applicationData.documents || {}
  );
  const [error, setError] = useState("");

  const goToDetails = () =>
    navigate(`/citizen/apply/details?service=${service || ""}`);

  const handleFileChange = (id, file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(t("documentsPage.invalidFile"));
      return;
    }

    const updated = { ...documents, [id]: file };

    setDocuments(updated);
    updateDocuments(updated);
    setError("");
  };

  const removeFile = (id) => {
    const updated = { ...documents };
    delete updated[id];

    setDocuments(updated);
    updateDocuments(updated);
  };

  const handleContinue = () => {
    const missing = requiredDocuments.some(
      ({ id, required }) => required && !documents[id]
    );

    if (missing) {
      setError(t("documentsPage.requiredError"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    updateDocuments(documents);
    navigate(`/citizen/apply/payment?service=${service || ""}`);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={goToDetails} className="hover:text-blue-700">
          {t("applicationDetails.title")}
        </button>
        <span>/</span>
        <span className="font-medium text-slate-700">
          {t("documentsPage.title")}
        </span>
      </div>

      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <FileText size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold text-red-600">
              {t("documentsPage.stepThree")}
            </p>
            <h1 className="text-2xl font-bold text-blue-950 md:text-3xl">
              {t("documentsPage.title")}
            </h1>
          </div>
        </div>

        <p className="max-w-3xl text-slate-600">
          {t("documentsPage.description")}
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex justify-between">
          <span className="text-sm font-semibold text-slate-700">
            {t("documentsPage.progress")}
          </span>

          <span className="text-sm font-bold text-blue-700">3 / 5</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-3/5 rounded-full bg-red-600" />
        </div>

        <div className="mt-4 grid grid-cols-5 text-xs text-slate-500">
          <span>{t("documentsPage.application")}</span>
          <span>{t("documentsPage.applicant")}</span>
          <span className="font-semibold text-blue-700">
            {t("documentsPage.documentsTitle")}
          </span>
          <span>{t("documentsPage.payment")}</span>
          <span>{t("documentsPage.review")}</span>
        </div>
      </div>

      {/* Selected Service */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {t("documentsPage.selectedService")}
        </p>

        <p className="mt-2 font-bold text-blue-950">
          {service
            ? t(`newApplication.services.${service}`)
            : t("documentsPage.recommendationService")}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Documents */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-bold text-blue-950">
            {t("documentsPage.requiredDocuments")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("documentsPage.requiredDocumentsDescription")}
          </p>
        </div>

        <div className="space-y-5 p-6">
          {requiredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              file={documents[document.id]}
              t={t}
              onUpload={handleFileChange}
              onRemove={removeFile}
            />
          ))}
        </div>
      </section>

      {/* Upload Note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-amber-800">
          {t("documentsPage.uploadNoteTitle")}
        </p>

        <p className="mt-1 text-sm text-amber-700">
          {t("documentsPage.uploadNote")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <button
          type="button"
          onClick={goToDetails}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          {t("documentsPage.back")}
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          {t("documentsPage.continue")}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const DocumentCard = ({ document, file, t, onUpload, onRemove }) => (
  <div className="rounded-2xl border border-slate-200 p-5">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-700">
          <FileText size={20} />
        </div>

        <div>
          <h3 className="font-bold text-slate-800">
            {t(`documentsPage.documents.${document.titleKey}`)}
            {document.required && (
              <span className="ml-1 text-red-600">*</span>
            )}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {t(`documentsPage.documents.${document.descriptionKey}`)}
          </p>
        </div>
      </div>

      {!file ? (
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 font-semibold text-blue-700 hover:bg-blue-100">
          <Upload size={17} />
          {t("documentsPage.upload")}

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => onUpload(document.id, e.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <CheckCircle2 size={18} className="text-emerald-600" />

          <div className="max-w-[180px]">
            <p className="truncate text-sm font-semibold text-emerald-700">
              {file.name}
            </p>

            <p className="text-xs text-emerald-600">
              {t("documentsPage.uploaded")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(document.id)}
            className="rounded-lg p-1 hover:bg-emerald-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Documents;