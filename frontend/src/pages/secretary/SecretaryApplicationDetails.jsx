import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  FileText,
  Receipt,
  CheckCircle2,
  Send,
  XCircle,
  AlertCircle,
  CalendarDays,
  Phone,
  Mail,
  CreditCard,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;
const FILE_BASE = import.meta.env.VITE_API_URL;

const getToken = (token) =>
  token ||
  localStorage.getItem("sifarish_token") ||
  localStorage.getItem("token");

const resolveFileUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http")
    ? url
    : `${FILE_BASE}/${url.replace(/^\/?/, "")}`;
};

const isImage = (type) => type?.startsWith("image/");

const Section = ({ icon: Icon, title, children }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
        <Icon size={18} />
      </div>

      <h2 className="font-bold text-blue-950">{title}</h2>
    </div>

    <div className="p-5">{children}</div>
  </section>
);

const Field = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
      {Icon && <Icon size={14} />}
      {label}
    </div>

    <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
      {value || "-"}
    </p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    verified: "bg-green-50 text-green-700 border-green-200",
    recommended: "bg-blue-50 text-blue-700 border-blue-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    submitted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
};

const SecretaryApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken(token)}`,
  };

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/${id}`, {
          headers: authHeaders,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || `Request failed with status ${res.status}`
          );
        }

        setApplication(data.application);
        setRemarks(data.application?.secretaryRemarks || "");
      } catch (err) {
        console.error("Failed to load application:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id, token]);

  const handleDecision = async (decision) => {
    if (!remarks.trim()) {
      setError(
        t("secretaryDetails.remarksRequired") ||
          "Please add remarks before recommending or rejecting this application."
      );
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const res = await fetch(`${API}/${id}/secretary`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({
          decision,
          remarks: remarks.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || `Request failed with status ${res.status}`
        );
      }

      navigate(
        decision === "recommend"
          ? "/secretary/recommended"
          : "/secretary/applications"
      );
    } catch (err) {
      console.error("Secretary decision failed:", err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-900" />
          <p className="mt-3 text-sm text-slate-500">
            {t("secretaryDetails.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error || t("secretaryDetails.notFound")}</span>
        </div>
      </div>
    );
  }

  const {
    applicantDetails = {},
    address = {},
    payment = {},
    documents = [],
  } = application;

  const voucherUrl = resolveFileUrl(payment.voucherUrl);

  // Application is waiting for Secretary when currentStage is secretary.
  const isPendingDecision = application.currentStage === "secretary";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate(-1)}
              className="mt-1 rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-red-600">
                  {t("secretaryDetails.label")}
                </p>

                <StatusBadge status={application.status} />
              </div>

              <h1 className="mt-1 text-2xl font-bold text-blue-950">
                {application.applicationNumber}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {application.service}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <ShieldCheck size={18} />
              {t("secretaryDetails.frontOfficeVerified")}
            </div>

            <p className="mt-1 text-xs text-blue-700">
              {t("secretaryDetails.readyForReview")}
            </p>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Applicant + Address */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Section
          icon={User}
          title={t("secretaryDetails.applicant")}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              icon={User}
              label="Full Name"
              value={applicantDetails.fullName}
            />

            <Field
              icon={CreditCard}
              label="Citizenship Number"
              value={applicantDetails.citizenshipNumber}
            />

            <Field
              icon={Phone}
              label="Phone"
              value={applicantDetails.phone}
            />

            <Field
              icon={Mail}
              label="Email"
              value={applicantDetails.email}
            />

            <Field
              icon={CalendarDays}
              label="Date of Birth"
              value={applicantDetails.dateOfBirth}
            />
          </div>
        </Section>

        <Section
          icon={MapPin}
          title={t("secretaryDetails.address")}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Province"
              value={address.province}
            />

            <Field
              label="District"
              value={address.district}
            />

            <Field
              label="Municipality"
              value={address.municipality}
            />

            <Field
              label="Ward"
              value={address.wardNumber}
            />

            <div className="sm:col-span-2">
              <Field
                label="Tole"
                value={address.tole}
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Documents */}
      <Section
        icon={FileText}
        title={t("secretaryDetails.documents")}
      >
        {documents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((doc, index) => {
              const url = resolveFileUrl(doc.fileUrl);

              return (
                <div
                  key={doc._id || index}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50">
                      {isImage(doc.fileType) && url ? (
                        <img
                          src={url}
                          alt={doc.fileName || doc.documentType}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FileText
                          size={21}
                          className="text-blue-900"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {doc.documentType || "Document"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {doc.fileName || "Uploaded document"}
                      </p>
                    </div>
                  </div>

                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-900 transition hover:bg-blue-50"
                    >
                      <Eye size={15} />
                      {t("secretaryDetails.view")}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            {t("secretaryDetails.noDocuments")}
          </p>
        )}
      </Section>

      {/* Payment + Voucher */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Section
          icon={Receipt}
          title={t("secretaryDetails.payment")}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              icon={CreditCard}
              label={t("secretaryDetails.status")}
              value={payment.status}
            />

            <Field
              label="Amount"
              value={
                payment.amount
                  ? `NPR ${payment.amount}`
                  : "-"
              }
            />

            <div className="sm:col-span-2">
              <Field
                label="Voucher"
                value={
                  payment.voucherName ||
                  t("secretaryDetails.noVoucher")
                }
              />
            </div>
          </div>
        </Section>

        {voucherUrl && (
          <Section
            icon={Receipt}
            title={t("secretaryDetails.voucher")}
          >
            <a
              href={voucherUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-slate-50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-blue-50">
                {isImage(payment.voucherType) ? (
                  <img
                    src={voucherUrl}
                    alt={payment.voucherName || "Voucher"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FileText
                    size={23}
                    className="text-blue-900"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {payment.voucherName ||
                    t("secretaryDetails.voucher")}
                </p>

                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-700">
                  <Eye size={14} />
                  {t("secretaryDetails.view")}
                </p>
              </div>
            </a>
          </Section>
        )}
      </div>

      {/* Front Office Review */}
      <section className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-green-100 bg-green-50 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <h2 className="font-bold text-green-900">
              {t("secretaryDetails.frontOfficeReview")}
            </h2>

            <p className="text-xs text-green-700">
              {t("secretaryDetails.verifiedByFrontOffice")}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="rounded-xl border border-green-100 bg-green-50/50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
              <CheckCircle2 size={17} />
              {t("secretaryDetails.verifiedByFrontOffice")}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {application.frontOfficeRemarks ||
                t("secretaryDetails.noRemarks")}
            </p>
          </div>
        </div>
      </section>

      {/* Secretary Decision */}
     {isPendingDecision ? (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* Review Header */}
    <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white">
          <ShieldCheck size={21} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-blue-950">
            {t("secretaryDetails.secretaryReview")}
          </h2>

          <p className="mt-0.5 text-sm text-slate-500">
            {t("secretaryDetails.reviewDescription")}
          </p>
        </div>
      </div>
    </div>

    {/* Review Body */}
    <div className="p-5 sm:p-6">
      {/* Application Status */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>
            <p className="text-sm font-semibold text-blue-950">
              {t("secretaryDetails.actionRequired")}
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              {t("secretaryDetails.actionDescription")}
            </p>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-800">
            {t("secretaryDetails.remarks")}
          </label>

          <span className="text-xs text-red-500">
            {t("secretaryDetails.required")}
          </span>
        </div>

        <textarea
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
            setError("");
          }}
          placeholder={t("secretaryDetails.remarksPlaceholder")}
          className="mt-2 min-h-[140px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-slate-400">
          {t("secretaryDetails.remarksRequired")}
        </p>
      </div>

      {/* Decision Buttons */}
      <div className="mt-6 border-t border-slate-100 pt-6">
        <p className="mb-3 text-sm font-semibold text-slate-800">
          {t("secretaryDetails.selectDecision")}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Recommend */}
          <button
            onClick={() => handleDecision("recommend")}
            disabled={processing}
            className="group flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-left transition hover:border-blue-900 hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900 text-white transition group-hover:bg-white group-hover:text-blue-900">
                <Send size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-blue-950 group-hover:text-white">
                  {processing
                    ? t("secretaryDetails.processing")
                    : t("secretaryDetails.recommend")}
                </p>

                <p className="mt-0.5 text-xs text-blue-700 group-hover:text-blue-100">
                  {t("secretaryDetails.recommendDescription")}
                </p>
              </div>
            </div>

            <Send
              size={17}
              className="text-blue-500 transition group-hover:translate-x-1 group-hover:text-white"
            />
          </button>

          {/* Reject */}
          <button
            onClick={() => handleDecision("reject")}
            disabled={processing}
            className="group flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-left transition hover:border-red-600 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 transition group-hover:bg-white">
                <XCircle size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-red-700 group-hover:text-white">
                  {processing
                    ? t("secretaryDetails.processing")
                    : t("secretaryDetails.reject")}
                </p>

                <p className="mt-0.5 text-xs text-red-500 group-hover:text-red-100">
                  {t("secretaryDetails.rejectDescription")}
                </p>
              </div>
            </div>

            <XCircle
              size={17}
              className="text-red-400 transition group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
) : (
  /* keep your existing already-recommended/rejected section */
  <section
    className={`rounded-2xl border p-6 ${
      application.status === "rejected"
        ? "border-red-200 bg-red-50"
        : "border-green-200 bg-green-50"
    }`}
  >
    <div className="flex items-start gap-3">
      {application.status === "rejected" ? (
        <XCircle
          className="mt-0.5 shrink-0 text-red-600"
          size={24}
        />
      ) : (
        <CheckCircle2
          className="mt-0.5 shrink-0 text-green-600"
          size={24}
        />
      )}

      <div>
        <h2
          className={`font-bold ${
            application.status === "rejected"
              ? "text-red-800"
              : "text-green-800"
          }`}
        >
          {application.status === "rejected"
            ? t("secretaryDetails.alreadyRejected")
            : t("secretaryDetails.alreadyRecommended")}
        </h2>

        <p
          className={`mt-1 text-sm ${
            application.status === "rejected"
              ? "text-red-700"
              : "text-green-700"
          }`}
        >
          {application.secretaryRemarks ||
            t("secretaryDetails.noRemarks")}
        </p>
      </div>
    </div>
  </section>

      )}
    </div>
  );
};

export default SecretaryApplicationDetails;