import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CreditCard,
  X,
  CheckCircle2,
  FileText,
  Info,
} from "lucide-react";

const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();

  const service = new URLSearchParams(search).get("service");
  const [voucher, setVoucher] = useState(null);

  const continueNext = () => {
    if (!voucher) return;

    navigate(`/citizen/apply/review?service=${service}`);
  };

  const serviceName = service
    ? t(`newApplication.services.${service}`)
    : "-";

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-6">

      {/* Page Header */}
      <section>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <span>{t("citizenSidebar.dashboard")}</span>
          <span>/</span>
          <span className="text-blue-900">
            {t("citizenSidebar.newApplication")}
          </span>
          <span>/</span>
          <span className="text-blue-900">
            {t("paymentPage.paymentInformation")}
          </span>
        </div>

        <div className="mt-5 flex items-start gap-4">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900 sm:flex">
            <CreditCard size={27} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
              {t("paymentPage.stepFour")}
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
              {t("paymentPage.title")}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              {t("paymentPage.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-red-600" />

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-blue-950">
              {t("paymentPage.progress")}
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900">
              4 / 5
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-4/5 rounded-full bg-red-600" />
          </div>
        </div>
      </section>

      {/* Selected Service */}
      <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
          {t("paymentPage.selectedService")}
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

      {/* Payment Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
            {t("paymentPage.paymentInformation")}
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {t("paymentPage.description")}
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          {/* Service */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {t("paymentPage.service")}
            </p>

            <p className="mt-2 text-sm font-bold text-blue-950 sm:text-base">
              {serviceName}
            </p>
          </div>

          {/* Status */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {t("paymentPage.paymentStatus")}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />

              <p className="text-sm font-bold text-amber-600 sm:text-base">
                {t("paymentPage.pending")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voucher Upload */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
            {t("paymentPage.uploadVoucher")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("paymentPage.uploadVoucherDescription")}
          </p>
        </div>

        <div className="mt-6">
          {!voucher ? (
            <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-800 transition group-hover:bg-blue-200">
                <Upload size={25} />
              </div>

              <p className="mt-5 text-base font-bold text-blue-950">
                {t("paymentPage.chooseVoucher")}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {t("paymentPage.voucherFormats")}
              </p>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setVoucher(e.target.files[0]);
                  }
                }}
              />
            </label>
          ) : (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    {t("paymentPage.uploaded")}
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-emerald-800">
                    {voucher.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setVoucher(null)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-red-600"
                  title="Remove voucher"
                >
                  <X size={19} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Information */}
      <section className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
        <Info
          size={19}
          className="mt-0.5 shrink-0 text-blue-800"
        />

        <div>
          <p className="text-sm font-bold text-blue-950">
            Payment voucher
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-800 sm:text-sm">
            Upload a clear copy of your payment voucher. Make
            sure the uploaded file is readable before continuing
            to the review step.
          </p>
        </div>
      </section>

      {/* Bottom Actions */}
      <section className="border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() =>
              navigate(
                `/citizen/apply/documents?service=${service}`
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            {t("paymentPage.back")}
          </button>

          <button
            onClick={continueNext}
            disabled={!voucher}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {t("paymentPage.continue")}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Payment;