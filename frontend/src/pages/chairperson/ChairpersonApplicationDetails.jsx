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
  Award,
  Download,
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

const ChairpersonApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [certificate, setCertificate] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken(token)}`,
  };

  const request = async (url, options = {}) => {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data.message || `Request failed with status ${res.status}`
      );
    }

    return data;
  };

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const data = await request(`${API}/${id}`);
        setApplication(data.application);
        setRemarks(data.application.chairpersonRemarks || "");
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load application");
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id, token]);

  const handleDecision = async (decision) => {
    if (!remarks.trim()) {
      setError(
        t("chairpersonDetails.remarksRequired") ||
          "Please add remarks before making a decision."
      );
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const data = await request(`${API}/${id}/chairperson`, {
        method: "PATCH",
        body: JSON.stringify({
          decision,
          remarks: remarks.trim(),
        }),
      });

      if (decision === "approve" && data.application?.certificate) {
        setCertificate(data.application.certificate);
        setApplication((prev) => ({
          ...prev,
          status: "approved",
          chairpersonRemarks: remarks.trim(),
        }));
      } else {
        navigate("/chairperson/applications");
      }
    } catch (err) {
      console.error("Chairperson decision failed:", err);
      setError(err.message || "Failed to process decision");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Empty text={t("chairpersonDetails.loading")} />
    );
  }

  if (!application) {
    return (
      <div className="rounded-xl bg-red-50 p-5 text-red-600 shadow-md">
        {error || "Application not found"}
      </div>
    );
  }

  const { applicantDetails = {}, address = {}, payment = {} } =
    application;

  const voucherUrl = resolveFileUrl(payment.voucherUrl);
  const certificateUrl = resolveFileUrl(certificate?.filePath);

  const pending =
    application.status === "recommended" && !certificate;

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
            {t("chairpersonDetails.label")}
          </p>

          <h1 className="text-xl font-bold text-blue-950">
            {application.applicationNumber}
          </h1>

          <p className="text-sm text-slate-500">
            {application.service}
          </p>
        </div>
      </section>

      {/* Error */}
      {error && <ErrorBox message={error} />}

      {/* Applicant */}
      <InfoCard
        icon={User}
        title={t("chairpersonDetails.applicant")}
      >
        <Info label="Name" value={applicantDetails.fullName} />
        <Info
          label="Citizenship"
          value={applicantDetails.citizenshipNumber}
        />
        <Info label="Phone" value={applicantDetails.phone} />
        <Info label="Email" value={applicantDetails.email} />
      </InfoCard>

      {/* Address */}
      <InfoCard
        icon={MapPin}
        title={t("chairpersonDetails.address")}
      >
        <Info label="Province" value={address.province} />
        <Info label="District" value={address.district} />
        <Info label="Municipality" value={address.municipality} />
        <Info label="Ward" value={address.wardNumber} />
        <Info label="Tole" value={address.tole} />
      </InfoCard>

      {/* Documents */}
      <InfoCard
        icon={FileText}
        title={t("chairpersonDetails.documents")}
      >
        {application.documents?.length ? (
          application.documents.map((doc, index) => (
            <FileItem
              key={doc._id || index}
              file={doc}
              t={t}
            />
          ))
        ) : (
          <p className="text-sm text-slate-500">
            {t("chairpersonDetails.noDocuments")}
          </p>
        )}
      </InfoCard>

      {/* Voucher */}
      {voucherUrl && (
        <InfoCard
          icon={Receipt}
          title={t("chairpersonDetails.voucher") || "Payment Voucher"}
        >
          <FileItem
            file={{
              fileName: payment.voucherName,
              fileType: payment.voucherType,
              fileUrl: payment.voucherUrl,
            }}
            t={t}
          />
        </InfoCard>
      )}

      {/* Payment */}
      <InfoCard
        icon={Receipt}
        title={t("chairpersonDetails.payment")}
      >
        <Info
          label={t("chairpersonDetails.status")}
          value={payment.status}
        />
        <Info
          label="Voucher"
          value={
            payment.voucherName ||
            t("chairpersonDetails.noVoucher")
          }
        />
      </InfoCard>

      {/* Front Office Review */}
      <ReviewCard
        icon={CheckCircle2}
        title={t("chairpersonDetails.frontOfficeReview")}
        label={t("chairpersonDetails.verifiedByFrontOffice")}
        remarks={application.frontOfficeRemarks}
        t={t}
      />

      {/* Secretary Review */}
      <ReviewCard
        icon={Send}
        title={t("chairpersonDetails.secretaryReview")}
        label={t("chairpersonDetails.recommendedBySecretary")}
        remarks={application.secretaryRemarks}
        t={t}
      />

      {/* Certificate */}
      {certificate && (
        <CertificateCard
          url={certificateUrl}
          navigate={navigate}
          t={t}
        />
      )}

      {/* Decision */}
      {pending ? (
        <DecisionSection
          remarks={remarks}
          setRemarks={(value) => {
            setRemarks(value);
            setError("");
          }}
          processing={processing}
          onDecision={handleDecision}
          t={t}
        />
      ) : (
        !certificate && (
          <StatusCard
            status={application.status}
            remarks={application.chairpersonRemarks}
            t={t}
          />
        )
      )}
    </div>
  );
};

/* ---------- Reusable Components ---------- */

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

const FileItem = ({ file, t }) => {
  const url = resolveFileUrl(file.fileUrl);

  if (!url) return null;

  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
      <div className="flex min-w-0 items-center gap-3">
        {isImage(file.fileType) ? (
          <img
            src={url}
            alt={file.fileName}
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
            {file.documentType || file.fileName || "Voucher"}
          </p>

          {file.documentType && (
            <p className="truncate text-xs text-slate-500">
              {file.fileName}
            </p>
          )}
        </div>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-lg bg-blue-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-900"
      >
        {t("chairpersonDetails.view")}
      </a>
    </div>
  );
};

const ReviewCard = ({
  icon: Icon,
  title,
  label,
  remarks,
  t,
}) => (
  <InfoCard icon={Icon} title={title}>
    <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
      <CheckCircle2 size={18} />
      {label}
    </div>

    <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
      {remarks || t("chairpersonDetails.noRemarks")}
    </p>
  </InfoCard>
);

const CertificateCard = ({ url, navigate, t }) => (
  <section className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-md">
    <div className="flex items-start gap-3">
      <Award size={26} className="shrink-0 text-green-700" />

      <div className="flex-1">
        <h2 className="font-bold text-green-800">
          {t("chairpersonDetails.certificateGenerated") ||
            "Application Approved — Certificate Generated"}
        </h2>

        <p className="mt-1 text-sm text-green-700">
          {t("chairpersonDetails.certificateGeneratedDescription") ||
            "A QR-coded certificate has been generated. The citizen can now download it from their dashboard."}
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
            >
              <Download size={17} />
              {t("chairpersonDetails.previewCertificate") ||
                "Preview Certificate"}
            </a>
          )}

          <button
            onClick={() => navigate("/chairperson/applications")}
            className="rounded-lg border border-green-300 bg-white px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50"
          >
            {t("chairpersonDetails.backToApplications") ||
              "Back to Applications"}
          </button>
        </div>
      </div>
    </div>
  </section>
);

const DecisionSection = ({
  remarks,
  setRemarks,
  processing,
  onDecision,
  t,
}) => (
  <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
    <h2 className="text-lg font-bold text-blue-950">
      {t("chairpersonDetails.chairpersonReview")}
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      {t("chairpersonDetails.reviewDescription")}
    </p>

    <textarea
      value={remarks}
      onChange={(e) => setRemarks(e.target.value)}
      placeholder={t("chairpersonDetails.remarksPlaceholder")}
      className="mt-4 min-h-28 w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-900 focus:bg-white"
    />

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <DecisionButton
        icon={CheckCircle2}
        text={
          processing
            ? t("chairpersonDetails.processing") || "Processing..."
            : t("chairpersonDetails.approve")
        }
        onClick={() => onDecision("approve")}
        disabled={processing}
        approve
      />

      <DecisionButton
        icon={XCircle}
        text={
          processing
            ? t("chairpersonDetails.processing") || "Processing..."
            : t("chairpersonDetails.reject")
        }
        onClick={() => onDecision("reject")}
        disabled={processing}
      />
    </div>
  </section>
);

const DecisionButton = ({
  icon: Icon,
  text,
  onClick,
  disabled,
  approve,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold disabled:opacity-50 ${
      approve
        ? "bg-red-600 text-white hover:bg-red-700"
        : "border border-red-200 text-red-600 hover:bg-red-50"
    }`}
  >
    <Icon size={18} />
    {text}
  </button>
);

const StatusCard = ({ status, remarks, t }) => {
  const rejected = status === "rejected";

  return (
    <section
      className={`flex items-start gap-3 rounded-xl p-6 shadow-md ${
        rejected ? "bg-red-50" : "bg-green-50"
      }`}
    >
      {rejected ? (
        <XCircle className="shrink-0 text-red-600" size={24} />
      ) : (
        <CheckCircle2
          className="shrink-0 text-green-600"
          size={24}
        />
      )}

      <div>
        <h2
          className={`font-bold ${
            rejected ? "text-red-800" : "text-green-800"
          }`}
        >
          {rejected
            ? t("chairpersonDetails.alreadyRejected")
            : t("chairpersonDetails.alreadyApproved")}
        </h2>

        <p
          className={`mt-1 text-sm ${
            rejected ? "text-red-700" : "text-green-700"
          }`}
        >
          {remarks || t("chairpersonDetails.noRemarks")}
        </p>
      </div>
    </section>
  );
};

const ErrorBox = ({ message }) => (
  <div className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
    <AlertCircle size={18} />
    {message}
  </div>
);

const Empty = ({ text }) => (
  <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow-md">
    {text}
  </div>
);

export default ChairpersonApplicationDetails;