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

const ReviewSubmit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const service = searchParams.get("service");
  const [confirmed, setConfirmed] = useState(false);

  const serviceName = service
    ? t(`newApplication.services.${service}`)
    : "-";

  const handleSubmit = () => {
    if (!confirmed) return;

    navigate("/citizen/applications");
  };

  const reviewItems = [
    {
      title: t("reviewPage.applicantInformation"),
      description: t(
        "reviewPage.applicantInformationDescription"
      ),
      icon: User,
    },
    {
      title: t("reviewPage.documents"),
      description: t("reviewPage.documentsUploaded"),
      icon: FileText,
    },
    {
      title: t("reviewPage.payment"),
      description: t("reviewPage.paymentVoucherUploaded"),
      icon: Receipt,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-6">

      {/* Header */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          {t("reviewPage.stepFive")}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          {t("reviewPage.title")}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
          {t("reviewPage.description")}
        </p>
      </section>

      {/* Progress */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-red-600" />

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-blue-950">
              {t("reviewPage.progress")}
            </span>

            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
              5 / 5
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full rounded-full bg-red-600" />
          </div>
        </div>
      </section>

      {/* Selected Service */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          {t("reviewPage.recommendation")}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-900 shadow-sm">
            <FileText size={19} />
          </div>

          <p className="text-base font-bold text-blue-950 sm:text-lg">
            {serviceName}
          </p>
        </div>
      </section>

      {/* Review Checklist */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
            {t("reviewPage.reviewBeforeSubmit")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("reviewPage.reviewBeforeSubmitDescription")}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {reviewItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 p-5 ${
                  index !== reviewItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                  <Icon size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-blue-950 sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {item.description}
                  </p>
                </div>

                <CheckCircle2
                  size={21}
                  className="shrink-0 text-emerald-600"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Information */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <div className="flex gap-3">
          <ShieldCheck
            size={22}
            className="mt-0.5 shrink-0 text-blue-900"
          />

          <div>
            <h3 className="text-sm font-bold text-blue-950 sm:text-base">
              {t("reviewPage.reviewBeforeSubmit")}
            </h3>

            <p className="mt-2 text-xs leading-6 text-blue-800 sm:text-sm">
              {t("reviewPage.reviewBeforeSubmitDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-red-600"
          />

          <span className="text-sm leading-6 text-slate-700">
            {t("reviewPage.confirmation")}
          </span>
        </label>
      </section>

      {/* Actions */}
      <section className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() =>
            navigate(
              `/citizen/apply/payment?service=${service || ""}`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          {t("reviewPage.back")}
        </button>

        <button
          onClick={handleSubmit}
          disabled={!confirmed}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          <Send size={18} />
          {t("reviewPage.submit")}
        </button>
      </section>
    </div>
  );
};

export default ReviewSubmit;