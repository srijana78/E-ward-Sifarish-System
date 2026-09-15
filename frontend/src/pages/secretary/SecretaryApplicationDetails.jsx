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
} from "lucide-react";
import { useTranslation } from "react-i18next";
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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      token || localStorage.getItem("sifarish_token")
    }`,
  };

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const res = await fetch(`${API}/${id}`, { headers });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setApplication(data.application);
        setRemarks(data.application.secretaryRemarks || "");
      } catch (err) {
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
        headers,
        body: JSON.stringify({
          decision,
          remarks: remarks.trim(),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        throw new Error(
          `Server returned an unexpected response (status ${res.status}). Check the backend logs / network tab.`
        );
      }

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
      <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-md">
        {t("secretaryDetails.loading")}
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-xl bg-red-50 p-5 text-red-600 shadow-md">
        {error}
      </div>
    );
  }

  const { applicantDetails = {}, address = {}, payment = {} } =
    application;

  const voucherUrl = payment.voucherUrl
    ? resolveFileUrl(payment.voucherUrl)
    : "";

  // Only applications still waiting on the secretary ("verified" status)
  // should show the decision form. Anything already recommended/rejected
  // is shown read-only so re-submitting a decision isn't possible.
  const isPendingDecision = application.status === "verified";

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* Header */}
      <section className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border p-2 hover:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <p className="text-sm font-semibold text-red-600">
            {t("secretaryDetails.label")}
          </p>

          <h1 className="text-xl font-bold text-blue-950">
            {application.applicationNumber}
          </h1>

          <p className="text-sm text-slate-500">
            {application.service}
          </p>
        </div>
      </section>

      {error && (
        <div className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Applicant */}
      <InfoCard icon={User} title={t("secretaryDetails.applicant")}>
        <Info label="Name" value={applicantDetails.fullName} />
        <Info
          label="Citizenship"
          value={applicantDetails.citizenshipNumber}
        />
        <Info label="Phone" value={applicantDetails.phone} />
        <Info label="Email" value={applicantDetails.email} />
      </InfoCard>

      {/* Address */}
      <InfoCard icon={MapPin} title={t("secretaryDetails.address")}>
        <Info label="Province" value={address.province} />
        <Info label="District" value={address.district} />
        <Info label="Municipality" value={address.municipality} />
        <Info
          label="Ward"
          value={address.wardNumber}
        />
        <Info label="Tole" value={address.tole} />
      </InfoCard>

      {/* Documents */}
      <InfoCard
        icon={FileText}
        title={t("secretaryDetails.documents")}
      >
        <div className="space-y-2">
          {application.documents?.length ? (
            application.documents.map((doc, index) => {
              const url = resolveFileUrl(doc.fileUrl);

              return (
                <div
                  key={doc._id || index}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {isImage(doc.fileType) ? (
                      <img
                        src={url}
                        alt={doc.fileName || doc.documentType}
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <FileText
                        size={18}
                        className="shrink-0 text-blue-900"
                      />
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-blue-950">
                        {doc.documentType}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {doc.fileName}
                      </p>
                    </div>
                  </div>

                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-lg bg-blue-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-900"
                    >
                      {t("secretaryDetails.view")}
                    </a>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              {t("secretaryDetails.noDocuments")}
            </p>
          )}
        </div>
      </InfoCard>

      {/* Payment Voucher Preview */}
      {voucherUrl && (
        <InfoCard
          icon={Receipt}
          title={t("secretaryDetails.voucher") || "Payment Voucher"}
        >
          <a
            href={voucherUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-3 rounded-lg bg-slate-50 p-4 transition hover:bg-slate-100"
          >
            {isImage(payment.voucherType) ? (
              <img
                src={voucherUrl}
                alt={payment.voucherName}
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
            ) : (
              <FileText size={18} className="shrink-0 text-blue-900" />
            )}

            <div>
              <p className="text-sm font-medium text-slate-700">
                {payment.voucherName ||
                  t("secretaryDetails.voucher") ||
                  "Voucher"}
              </p>

              <p className="text-xs font-medium text-blue-700">
                {t("secretaryDetails.view")}
              </p>
            </div>
          </a>
        </InfoCard>
      )}

      {/* Payment */}
      <InfoCard
        icon={Receipt}
        title={t("secretaryDetails.payment")}
      >
        <Info
          label={t("secretaryDetails.status")}
          value={payment.status || "-"}
        />

        <Info
          label="Voucher"
          value={
            payment.voucherName ||
            t("secretaryDetails.noVoucher")
          }
        />
      </InfoCard>

      {/* Front Office */}
      <InfoCard
        icon={CheckCircle2}
        title={t("secretaryDetails.frontOfficeReview")}
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
          <CheckCircle2 size={18} />
          {t("secretaryDetails.verifiedByFrontOffice")}
        </div>

        <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          {application.frontOfficeRemarks ||
            t("secretaryDetails.noRemarks")}
        </p>
      </InfoCard>

      {/* Secretary Decision */}
      {isPendingDecision ? (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
          <h2 className="text-lg font-bold text-blue-950">
            {t("secretaryDetails.secretaryReview")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("secretaryDetails.reviewDescription")}
          </p>

          <textarea
            value={remarks}
            onChange={(e) => {
              setRemarks(e.target.value);
              setError("");
            }}
            placeholder={t("secretaryDetails.remarksPlaceholder")}
            className="mt-4 min-h-28 w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-900 focus:bg-white"
          />

          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => handleDecision("recommend")}
              disabled={processing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              <Send size={18} />
              {processing
                ? t("secretaryDetails.processing") || "Processing..."
                : t("secretaryDetails.recommend")}
            </button>

            <button
              onClick={() => handleDecision("reject")}
              disabled={processing}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle size={18} />
              {processing
                ? t("secretaryDetails.processing") || "Processing..."
                : t("secretaryDetails.reject")}
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`flex items-start gap-3 rounded-xl p-6 shadow-md ${
            application.status === "rejected"
              ? "bg-red-50"
              : "bg-green-50"
          }`}
        >
          {application.status === "rejected" ? (
            <XCircle size={24} className="mt-0.5 shrink-0 text-red-600" />
          ) : (
            <CheckCircle2
              size={24}
              className="mt-0.5 shrink-0 text-green-600"
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
        </section>
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
    <h2 className="mb-4 flex items-center gap-2 font-bold text-blue-950">
      <Icon size={19} />
      {title}
    </h2>

    <div className="space-y-2">{children}</div>
  </section>
);

const Info = ({ label, value }) => (
  <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
    <span className="font-semibold text-blue-950">{label}:</span>{" "}
    {value || "-"}
  </p>
);

export default SecretaryApplicationDetails;