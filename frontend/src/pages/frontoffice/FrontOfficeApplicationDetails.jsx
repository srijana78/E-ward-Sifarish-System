
import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";
const FILE_BASE = "http://localhost:5000";

const resolveFileUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;

  return `${FILE_BASE}/${url.replace(/^\/?/, "")}`;
};

const isImage = (fileType) =>
  Boolean(fileType && fileType.startsWith("image/"));

function FrontOfficeApplicationDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const authToken = token || localStorage.getItem("sifarish_token");
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

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  };

  useEffect(() => {
    request(`${API}/${id}`)
      .then((data) => setApplication(data.application))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      setError("");

      const data = await request(`${API}/${id}/frontoffice`, {
        method: "PATCH",
        body: JSON.stringify({
          decision: "verify",
          remarks: "",
        }),
      });

      setApplication(data.application);

      alert(t("frontOfficeApplicationDetails.verifySuccess"));

      navigate("/frontoffice/verified");
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

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
      <div className="mx-auto mt-9 max-w-4xl rounded-xl bg-red-50 p-5 text-red-600">
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
    [
      "address",
      applicant.address || address.municipality || address.district,
    ],
  ];

  return (
    <div className="mx-auto mt-9 max-w-7xl space-y-6">
      {/* Header */}
      <section className="flex items-start justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-900"
          >
            <ArrowLeft size={18} />
            {t("frontOfficeApplicationDetails.back")}
          </button>

          <p className="text-sm font-semibold text-red-600">
            {t("frontOfficeApplicationDetails.label")}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-blue-950">
            {application.applicationNumber || application._id}
          </h1>
        </div>

        <StatusBadge verified={verified} t={t} />
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Application ID */}
      <section className="rounded-xl bg-blue-50 p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-blue-700">
              {t("frontOfficeApplicationDetails.applicationId")}
            </p>

            <h2 className="text-xl font-bold text-blue-950">
              {application.applicationNumber || application._id}
            </h2>
          </div>

          <p className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays size={17} />

            {t("frontOfficeApplicationDetails.submittedOn")}{" "}
            {formatDate(application.createdAt)}
          </p>
        </div>
      </section>

      {/* Applicant Information */}
      <Section
        icon={User}
        title={t("frontOfficeApplicationDetails.applicantInformation")}
        description={t(
          "frontOfficeApplicationDetails.applicantInformationDescription"
        )}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applicantFields.map(([key, value]) => (
            <div key={key}>
              <p className="text-xs font-medium text-slate-400">
                {t(`frontOfficeApplicationDetails.${key}`)}
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {value || na}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Application Information */}
      <Section
        icon={FileText}
        title={t("frontOfficeApplicationDetails.applicationInformation")}
        description={t(
          "frontOfficeApplicationDetails.applicationInformationDescription"
        )}
      >
        <div>
          <p className="text-xs font-medium text-slate-400">
            {t("frontOfficeApplicationDetails.requestedService")}
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {application.service || na}
          </p>
        </div>
      </Section>

      {/* Documents */}
      <Section
        icon={FileText}
        title={t("frontOfficeApplicationDetails.documents")}
        description={t(
          "frontOfficeApplicationDetails.documentsDescription"
        )}
      >
        {application.documents && application.documents.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {application.documents.map((doc, i) => {
              const url = resolveFileUrl(doc.fileUrl);

              const fallbackLabel =
                t("frontOfficeApplicationDetails.documentFallback") +
                " " +
                (i + 1);

              const label = doc.fileName || fallbackLabel;

              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 transition hover:bg-slate-100"
                >
                  {isImage(doc.fileType) ? (
                    <img
                      src={url}
                      alt={label}
                      className="h-12 w-12 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <FileText
                      size={18}
                      className="shrink-0 text-blue-900"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {label}
                    </p>

                    <p className="text-xs font-medium text-blue-700">
                      {t("frontOfficeApplicationDetails.viewFile")}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            {t("frontOfficeApplicationDetails.noDocuments")}
          </p>
        )}
      </Section>

      {/* Payment Voucher */}
      {application.payment && application.payment.voucherUrl && (
        <Section
          icon={CreditCard}
          title={t("frontOfficeApplicationDetails.voucher")}
        >
          <a
            href={resolveFileUrl(application.payment.voucherUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-3 rounded-lg bg-slate-50 p-4 transition hover:bg-slate-100"
          >
            {isImage(application.payment.voucherType) ? (
              <img
                src={resolveFileUrl(application.payment.voucherUrl)}
                alt={application.payment.voucherName}
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
            ) : (
              <FileText
                size={18}
                className="shrink-0 text-blue-900"
              />
            )}

            <div>
              <p className="text-sm font-medium text-slate-700">
                {application.payment.voucherName ||
                  t("frontOfficeApplicationDetails.voucher")}
              </p>

              <p className="text-xs font-medium text-blue-700">
                {t("frontOfficeApplicationDetails.viewFile")}
              </p>
            </div>
          </a>
        </Section>
      )}

      {/* Payment Information */}
      <Section
        icon={CreditCard}
        title={t("frontOfficeApplicationDetails.paymentInformation")}
        description={t(
          "frontOfficeApplicationDetails.paymentInformationDescription"
        )}
      >
        <div className="flex items-center justify-between">
          <p className="font-medium text-slate-700">
            {t("frontOfficeApplicationDetails.paymentStatus")}
          </p>

          <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
            <CheckCircle2 size={16} />

            {(application.payment && application.payment.status) ||
              t("frontOfficeApplicationDetails.paid")}
          </span>
        </div>
      </Section>

      {/* Verification */}
      {!verified ? (
        <section className="rounded-xl bg-blue-50 p-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <div className="rounded-lg bg-white p-3 text-blue-900">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h2 className="font-bold text-blue-950">
                  {t("frontOfficeApplicationDetails.verification")}
                </h2>

                <p className="text-sm text-slate-600">
                  {t(
                    "frontOfficeApplicationDetails.verificationDescription"
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={verifying}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {verifying ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}

              {verifying
                ? t("frontOfficeApplicationDetails.verifying")
                : t("frontOfficeApplicationDetails.verifyApplication")}
            </button>
          </div>
        </section>
      ) : (
        <section className="flex items-center gap-3 rounded-xl bg-green-50 p-6">
          <CheckCircle2 size={25} className="text-green-600" />

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
}

const Section = ({ icon: Icon, title, description, children }) => (
  <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b p-5">
      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-900">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="font-bold text-blue-950">{title}</h2>

        {description ? (
          <p className="text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
    </div>

    <div className="p-5">{children}</div>
  </section>
);

const StatusBadge = ({ verified, t }) => (
  <span
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
      verified
        ? "bg-green-50 text-green-700"
        : "bg-amber-50 text-amber-700"
    }`}
  >
    {verified ? (
      <CheckCircle2 size={17} />
    ) : (
      <Clock3 size={17} />
    )}

    {verified
      ? t("frontOfficeApplicationDetails.applicationVerified")
      : t("frontOfficeApplicationDetails.pending")}
  </span>
);

export default FrontOfficeApplicationDetails;
