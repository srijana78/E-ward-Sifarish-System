import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  User,
  MapPin,
  FileText,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  FileCheck2,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const ChairpersonApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      token || localStorage.getItem("sifarish_token")
    }`,
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`${API}/${id}`, {
          headers: authHeaders,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to load application"
          );
        }

        setApplication(data.application);
        setRemarks(data.application?.chairpersonRemarks || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, token]);

  const handleDecision = async (action) => {
    if (action === "reject" && !remarks.trim()) {
      setError(t("chairpersonDetails.rejectRemarksRequired"));
      return;
    }

    try {
      setActionLoading(action);
      setError("");

      const res = await fetch(`${API}/${id}/${action}`, {
        method: "PATCH",
        headers: authHeaders,
        body: JSON.stringify({ remarks }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update application"
        );
      }

      setApplication(data.application);

      navigate("/chairperson/applications");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin text-blue-900" size={35} />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
        {error || t("chairpersonDetails.notFound")}
      </div>
    );
  }

  const {
    applicantDetails = {},
    address = {},
    documents = [],
    payment = {},
  } = application;

  const isFinal =
    application.status === "approved" ||
    application.status === "rejected";

  return (
    <div className="space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-blue-900 hover:text-red-600"
      >
        <ArrowLeft size={18} />
        {t("chairpersonDetails.back")}
      </button>

      {/* HEADER */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-red-300">
              {application.applicationNumber}
            </p>

            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              {application.service}
            </h1>

            <p className="mt-3 text-sm text-blue-100">
              {t("chairpersonDetails.submittedOn")}{" "}
              {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>

          <StatusBadge status={application.status} t={t} />
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* APPLICANT + ADDRESS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard
          icon={User}
          title={t("chairpersonDetails.applicantInformation")}
        >
          <InfoRow
            label={t("chairpersonDetails.fullName")}
            value={applicantDetails.fullName}
          />

          <InfoRow
            label={t("chairpersonDetails.citizenshipNumber")}
            value={applicantDetails.citizenshipNumber}
          />

          <InfoRow
            label={t("chairpersonDetails.dateOfBirth")}
            value={
              applicantDetails.dateOfBirth
                ? new Date(
                    applicantDetails.dateOfBirth
                  ).toLocaleDateString()
                : "-"
            }
          />

          <InfoRow
            label={t("chairpersonDetails.phone")}
            value={applicantDetails.phone}
          />

          <InfoRow
            label={t("chairpersonDetails.email")}
            value={applicantDetails.email}
          />
        </InfoCard>

        <InfoCard
          icon={MapPin}
          title={t("chairpersonDetails.address")}
        >
          <InfoRow
            label={t("chairpersonDetails.province")}
            value={address.province}
          />

          <InfoRow
            label={t("chairpersonDetails.district")}
            value={address.district}
          />

          <InfoRow
            label={t("chairpersonDetails.municipality")}
            value={address.municipality}
          />

          <InfoRow
            label={t("chairpersonDetails.wardNumber")}
            value={address.wardNumber}
          />

          <InfoRow
            label={t("chairpersonDetails.tole")}
            value={address.tole}
          />
        </InfoCard>
      </div>

      {/* DOCUMENTS */}
      <InfoCard
        icon={FileText}
        title={t("chairpersonDetails.documents")}
      >
        {documents.length === 0 ? (
          <p className="text-sm text-slate-500">
            {t("chairpersonDetails.noDocuments")}
          </p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText
                    size={20}
                    className="text-blue-900"
                  />

                  <div>
                    <p className="text-sm font-semibold text-blue-950">
                      {doc.documentType || t("chairpersonDetails.document")}
                    </p>

                    <p className="text-xs text-slate-500">
                      {doc.fileName || "-"}
                    </p>
                  </div>
                </div>

                {doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-blue-900 hover:text-red-600"
                  >
                    {t("chairpersonDetails.view")}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </InfoCard>

      {/* PAYMENT */}
      <InfoCard
        icon={CreditCard}
        title={t("chairpersonDetails.paymentInformation")}
      >
        <InfoRow
          label={t("chairpersonDetails.paymentStatus")}
          value={payment.status || "-"}
        />

        <InfoRow
          label={t("chairpersonDetails.voucher")}
          value={payment.voucherName || "-"}
        />
      </InfoCard>

      {/* WORKFLOW REMARKS */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
            <MessageSquare size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("chairpersonDetails.reviewHistory")}
            </h2>

            <p className="text-sm text-slate-500">
              {t("chairpersonDetails.reviewHistoryDescription")}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <RemarkCard
            title={t("chairpersonDetails.frontOfficeRemarks")}
            value={application.frontOfficeRemarks}
          />

          <RemarkCard
            title={t("chairpersonDetails.secretaryRemarks")}
            value={application.secretaryRemarks}
          />
        </div>
      </section>

      {/* FINAL DECISION */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
            <FileCheck2 size={21} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              {t("chairpersonDetails.finalDecision")}
            </h2>

            <p className="text-sm text-slate-500">
              {isFinal
                ? t("chairpersonDetails.finalDecisionCompleted")
                : t("chairpersonDetails.finalDecisionDescription")}
            </p>
          </div>
        </div>

        {/* Already approved/rejected */}
        {isFinal ? (
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">
              {t("chairpersonDetails.chairpersonRemarks")}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {application.chairpersonRemarks ||
                t("chairpersonDetails.noRemarks")}
            </p>
          </div>
        ) : (
          <>
            {/* REMARKS */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-blue-950">
                {t("chairpersonDetails.chairpersonRemarks")}
              </label>

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={t(
                  "chairpersonDetails.remarksPlaceholder"
                )}
                rows="5"
                className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handleDecision("approve")}
                disabled={actionLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoading === "approve" ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={19} />
                )}

                {t("chairpersonDetails.approve")}
              </button>

              <button
                onClick={() => handleDecision("reject")}
                disabled={actionLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoading === "reject" ? (
                  <Loader2 size={19} className="animate-spin" />
                ) : (
                  <XCircle size={19} />
                )}

                {t("chairpersonDetails.reject")}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const InfoCard = ({ icon: Icon, title, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="mb-5 flex items-center gap-3">
      <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
        <Icon size={21} />
      </div>

      <h2 className="font-bold text-blue-950">{title}</h2>
    </div>

    <div className="space-y-4">{children}</div>
  </section>
);

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
    <span className="text-xs font-medium text-slate-400">
      {label}
    </span>

    <span className="text-sm font-semibold text-slate-700">
      {value || "-"}
    </span>
  </div>
);

const RemarkCard = ({ title, value }) => (
  <div className="rounded-xl bg-slate-50 p-5">
    <h3 className="text-sm font-semibold text-blue-950">
      {title}
    </h3>

    <p className="mt-3 text-sm leading-6 text-slate-500">
      {value || "-"}
    </p>
  </div>
);

const StatusBadge = ({ status, t }) => {
  const styles = {
    recommended: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {t(`chairpersonDetails.status.${status}`)}
    </span>
  );
};

export default ChairpersonApplicationDetails;