import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  CheckCircle2,
  X,
} from "lucide-react";

const Documents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const service = params.get("service");

  const [files, setFiles] = useState({});

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

  const handleFileChange = (documentId, file) => {
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [documentId]: file,
    }));
  };

  const removeFile = (documentId) => {
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[documentId];
      return updated;
    });
  };

  const handleContinue = () => {
    navigate(`/citizen/apply/payment?service=${service}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button
          onClick={() =>
            navigate(`/citizen/apply/details?service=${service}`)
          }
          className="hover:text-blue-700 transition"
        >
          {t("applicationDetails.title")}
        </button>

        <span>/</span>

        <span className="text-slate-700 font-medium">
          {t("documentsPage.title")}
        </span>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText size={22} />
          </div>

          <div>
            <p className="text-sm font-semibold text-red-600">
              {t("documentsPage.stepThree")}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
              {t("documentsPage.title")}
            </h1>
          </div>
        </div>

        <p className="text-slate-600 max-w-3xl">
          {t("documentsPage.description")}
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700">
            {t("documentsPage.progress")}
          </span>

          <span className="text-sm font-bold text-blue-700">
            3 / 5
          </span>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-red-600 rounded-full" />
        </div>

        <div className="grid grid-cols-5 mt-4 text-xs text-slate-500">
          <span>{t("documentsPage.application")}</span>

          <span>{t("documentsPage.applicant")}</span>

          <span className="text-blue-700 font-semibold">
            {t("documentsPage.documents")}
          </span>

          <span>{t("documentsPage.payment")}</span>

          <span>{t("documentsPage.review")}</span>
        </div>
      </div>

      {/* Selected Service */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {t("documentsPage.selectedService")}
        </p>

        <p className="font-bold text-blue-950 mt-1">
          {service
            ? t(`newApplication.services.${service}`)
            : t("documentsPage.recommendationService")}
        </p>
      </div>

      {/* Documents */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="font-bold text-lg text-blue-950">
            {t("documentsPage.requiredDocuments")}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {t("documentsPage.requiredDocumentsDescription")}
          </p>
        </div>

        <div className="p-6 space-y-5">

          {requiredDocuments.map((document) => {
            const uploadedFile = files[document.id];

            return (
              <div
                key={document.id}
                className="border border-slate-200 rounded-2xl p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Document information */}
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-800">
                          {t(
                            `documentsPage.documents.${document.titleKey}`
                          )}
                        </h3>

                        {document.required && (
                          <span className="text-xs text-red-600 font-semibold">
                            *
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-500 mt-1">
                        {t(
                          `documentsPage.documents.${document.descriptionKey}`
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Upload */}
                  {!uploadedFile ? (
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition shrink-0">
                      <Upload size={17} />

                      {t("documentsPage.upload")}

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(
                            document.id,
                            e.target.files[0]
                          )
                        }
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                      <CheckCircle2
                        size={18}
                        className="text-emerald-600"
                      />

                      <div className="max-w-[180px]">
                        <p className="text-sm font-semibold text-emerald-700 truncate">
                          {uploadedFile.name}
                        </p>

                        <p className="text-xs text-emerald-600">
                          {t("documentsPage.uploaded")}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFile(document.id)
                        }
                        className="p-1 rounded-lg hover:bg-emerald-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Upload note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="font-semibold text-amber-800">
          {t("documentsPage.uploadNoteTitle")}
        </p>

        <p className="text-sm text-amber-700 mt-1">
          {t("documentsPage.uploadNote")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pb-6">

        <button
          type="button"
          onClick={() =>
            navigate(`/citizen/apply/details?service=${service}`)
          }
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
        >
          <ArrowLeft size={18} />

          {t("documentsPage.back")}
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm"
        >
          {t("documentsPage.continue")}

          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default Documents;