import { useEffect, useState } from "react";
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
  Loader2,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;
const BASE_URL = import.meta.env.VITE_API_URL;

const FrontOfficeApplicationDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  const authToken =
    token ||
    localStorage.getItem("sifarish_token") ||
    localStorage.getItem("token");

  const na = t("frontOfficeApplicationDetails.notAvailable");

  const request = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(
        data.message || t("frontOfficeApplicationDetails.actionFailed")
      );
    }

    return data;
  };

  useEffect(() => {
    request(`${API}/${id}`)
      .then((data) => setApplication(data.application))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleDecision = async (decision) => {
    if (
      decision === "reject" &&
      !window.confirm(t("frontOfficeApplicationDetails.rejectConfirm"))
    ) {
      return;
    }

    try {
      setAction(decision);
      setError("");

      const data = await request(`${API}/${id}/frontoffice`, {
        method: "PATCH",
        body: JSON.stringify({
          decision,
          remarks: "",
        }),
      });

      setApplication(data.application);

      alert(
        t(
          decision === "reject"
            ? "frontOfficeApplicationDetails.rejectSuccess"
            : "frontOfficeApplicationDetails.verifySuccess"
        )
      );

      navigate(
        decision === "reject"
          ? "/frontoffice/pending"
          : "/frontoffice/verified"
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setAction("");
    }
  };

  const fileUrl = (url) =>
    url?.startsWith("http")
      ? url
      : url
        ? `${BASE_URL}/${url.replace(/^\/?/, "")}`
        : "";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : na;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 size={35} className="animate-spin text-blue-700" />
        <p className="mt-4 text-sm text-slate-500">
          {t("frontOfficeApplicationDetails.loadingText")}
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="mx-auto mt-8 max-w-4xl rounded-xl bg-red-50 p-5 text-red-600">
        {error || t("frontOfficeApplicationDetails.notFound")}
      </div>
    );
  }

  const applicant = application.applicantDetails || {};
  const address = application.address || {};
  const verified = application.status === "verified";

  const applicantFields = [
    ["fullName", applicant.fullName],
    ["citizenshipNumber", applicant.citizenshipNumber],
    ["phone", applicant.phone],
    ["email", applicant.email],
    ["address", applicant.address || address.municipality || address.district],
  ];

  return (
    <div className="mx-auto mt-6 max-w-6xl space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-900"
          >
            <ArrowLeft size={17} />
            {t("frontOfficeApplicationDetails.back")}
          </button>

          <p className="text-sm font-semibold text-red-600">
            {t("frontOfficeApplicationDetails.label")}
          </p>

          <h1 className="mt-1 text-xl font-bold text-blue-950 sm:text-2xl">
            {application.applicationNumber || application._id}
          </h1>
        </div>

        <StatusBadge verified={verified} t={t} />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary */}
      <section className="rounded-xl bg-blue-950 p-5 text-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-blue-200">
              {t("frontOfficeApplicationDetails.applicationId")}
            </p>
            <h2 className="mt-1 font-bold">
              {application.applicationNumber || application._id}
            </h2>
          </div>

          <p className="flex items-center gap-2 text-sm text-blue-100">
            <CalendarDays size={16} />
            {formatDate(application.createdAt)}
          </p>
        </div>
      </section>

      {/* Applicant */}
      <Section
        icon={User}
        title={t("frontOfficeApplicationDetails.applicantInformation")}
        description={t(
          "frontOfficeApplicationDetails.applicantInformationDescription"
        )}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applicantFields.map(([key, value]) => (
            <Info
              key={key}
              label={t(`frontOfficeApplicationDetails.${key}`)}
              value={value || na}
            />
          ))}
        </div>
      </Section>

      {/* Application */}
      <Section
        icon={FileText}
        title={t("frontOfficeApplicationDetails.applicationInformation")}
      >
        <Info
          label={t("frontOfficeApplicationDetails.requestedService")}
          value={application.service || na}
        />
      </Section>

      {/* Documents */}
      <Section
        icon={FileText}
        title={t("frontOfficeApplicationDetails.documents")}
        description={t(
          "frontOfficeApplicationDetails.documentsDescription"
        )}
      >
        {application.documents?.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {application.documents.map((doc, index) => (
              <FilePreview
                key={index}
                url={fileUrl(doc.fileUrl)}
                name={
                  doc.fileName ||
                  `${t("frontOfficeApplicationDetails.documentFallback")} ${
                    index + 1
                  }`
                }
                type={doc.fileType}
                t={t}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            {t("frontOfficeApplicationDetails.noDocuments")}
          </p>
        )}
      </Section>

      {/* Payment */}
      <Section
        icon={CreditCard}
        title={t("frontOfficeApplicationDetails.paymentInformation")}
        description={t(
          "frontOfficeApplicationDetails.paymentInformationDescription"
        )}
      >
        <div className="space-y-5">
          <Info
            label={t("frontOfficeApplicationDetails.paymentStatus")}
            value={
              application.payment?.status ||
              t("frontOfficeApplicationDetails.paid")
            }
          />

          {application.payment?.voucherUrl && (
            <FilePreview
              url={fileUrl(application.payment.voucherUrl)}
              name={
                application.payment.voucherName ||
                t("frontOfficeApplicationDetails.voucher")
              }
              type={application.payment.voucherType}
              t={t}
            />
          )}
        </div>
      </Section>

      {/* Verification */}
      {!verified ? (
        <section className="rounded-xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-3">
              <div className="h-fit rounded-lg bg-white p-3 text-blue-900">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h2 className="font-bold text-blue-950">
                  {t("frontOfficeApplicationDetails.verification")}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  {t(
                    "frontOfficeApplicationDetails.verificationDescription"
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => handleDecision("reject")}
                disabled={!!action}
                className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
              >
                {action === "reject" ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <XCircle size={17} />
                )}
                {t("frontOfficeApplicationDetails.rejectApplication")}
              </button>

              <button
                onClick={() => handleDecision("verify")}
                disabled={!!action}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {action === "verify" ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={17} />
                )}

                {action === "verify"
                  ? t("frontOfficeApplicationDetails.verifying")
                  : t("frontOfficeApplicationDetails.verifyApplication")}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex items-center gap-3 rounded-xl bg-green-50 p-5">
          <CheckCircle2 size={24} className="shrink-0 text-green-600" />

          <div>
            <h2 className="font-bold text-green-800">
              {t("frontOfficeApplicationDetails.applicationVerified")}
            </h2>

            <p className="text-sm text-green-700">
              {t(
                "frontOfficeApplicationDetails.applicationVerifiedDescription"
              )}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ icon: Icon, title, description, children }) => (
  <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b border-slate-200 p-4 sm:p-5">
      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-900">
        <Icon size={20} />
      </div>

      <div>
        <h2 className="font-bold text-blue-950">{title}</h2>

        {description && (
          <p className="text-xs text-slate-500 sm:text-sm">{description}</p>
        )}
      </div>
    </div>

    <div className="p-4 sm:p-5">{children}</div>
  </section>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-slate-400">{label}</p>
    <p className="mt-1 font-semibold text-slate-800">{value}</p>
  </div>
);

const FilePreview = ({ url, name, type, t }) => {
  const isImage = type?.startsWith("image/");

  if (!url) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {t("frontOfficeApplicationDetails.fileUnavailable")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {isImage ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-slate-100"
        >
          <img
            src={url}
            alt={name}
            className="h-64 w-full object-contain"
          />
        </a>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-64 flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100"
        >
          <FileText size={45} className="text-blue-900" />
          <span className="text-sm font-semibold text-blue-900">
            {t("frontOfficeApplicationDetails.viewFile")}
          </span>
        </a>
      )}

      <div className="border-t border-slate-200 p-3">
        <p className="truncate text-sm font-semibold text-slate-800">
          {name}
        </p>

        <p className="mt-1 text-xs text-blue-600">
          {isImage
            ? t("frontOfficeApplicationDetails.viewImage")
            : t("frontOfficeApplicationDetails.viewFile")}
        </p>
      </div>
    </div>
  );
};

const StatusBadge = ({ verified, t }) => (
  <span
    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
      verified
        ? "bg-green-50 text-green-700"
        : "bg-amber-50 text-amber-700"
    }`}
  >
    {verified ? <CheckCircle2 size={17} /> : <Clock3 size={17} />}

    {verified
      ? t("frontOfficeApplicationDetails.applicationVerified")
      : t("frontOfficeApplicationDetails.pending")}
  </span>
);

export default FrontOfficeApplicationDetails;