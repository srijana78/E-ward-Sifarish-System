import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  MapPin,
  CreditCard,
  Loader2,
  CalendarDays,
  Phone,
  Mail,
  Hash,
  CheckCircle2,
  Clock3,
  XCircle,
  ExternalLink,
  Download,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";
const BACKEND_URL = "http://localhost:5000";

const ApplicationView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH APPLICATION =================

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken =
          token || localStorage.getItem("sifarish_token");

        if (!authToken) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(`${API}/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch application"
          );
        }

        setApplication(data.application);
      } catch (err) {
        console.error("Fetch application error:", err);

        setError(
          err.message || "Failed to fetch application"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id, token]);

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= FILE URL =================

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return "";

    // Already a complete URL
    if (
      fileUrl.startsWith("http://") ||
      fileUrl.startsWith("https://")
    ) {
      return fileUrl;
    }

    // Backend returns /uploads/...
    if (fileUrl.startsWith("/")) {
      return `${BACKEND_URL}${fileUrl}`;
    }

    return `${BACKEND_URL}/${fileUrl}`;
  };

  // ================= STATUS =================

  const statusInfo = {
    approved: {
      label: "Approved",
      icon: CheckCircle2,
      style:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
    },

    rejected: {
      label: "Rejected",
      icon: XCircle,
      style: "bg-red-50 text-red-700 border-red-200",
    },

    submitted: {
      label: "Submitted",
      icon: Clock3,
      style:
        "bg-amber-50 text-amber-700 border-amber-200",
    },

    pending: {
      label: "Pending",
      icon: Clock3,
      style:
        "bg-amber-50 text-amber-700 border-amber-200",
    },

    under_review: {
      label: "Under Review",
      icon: Clock3,
      style:
        "bg-blue-50 text-blue-700 border-blue-200",
    },

    verified: {
      label: "Verified",
      icon: CheckCircle2,
      style:
        "bg-purple-50 text-purple-700 border-purple-200",
    },

    recommended: {
      label: "Recommended",
      icon: CheckCircle2,
      style:
        "bg-indigo-50 text-indigo-700 border-indigo-200",
    },

    draft: {
      label: "Draft",
      icon: FileText,
      style:
        "bg-slate-50 text-slate-700 border-slate-200",
    },
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2
            size={38}
            className="mx-auto animate-spin text-blue-800"
          />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading application details...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-3">
            <XCircle
              size={22}
              className="mt-0.5 text-red-600"
            />

            <div>
              <h2 className="font-bold text-red-800">
                Unable to load application
              </h2>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/citizen/applications")
            }
            className="mt-5 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <ArrowLeft size={17} />
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  // ================= APPLICATION DATA =================

  const documents = application.documents || [];

  const currentStatus =
    statusInfo[application.status?.toLowerCase()] || {
      label: application.status || "Pending",
      icon: Clock3,
      style:
        "bg-slate-50 text-slate-700 border-slate-200",
    };

  const StatusIcon = currentStatus.icon;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">

      {/* BACK BUTTON */}

      <button
        type="button"
        onClick={() =>
          navigate("/citizen/applications")
        }
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-800"
      >
        <ArrowLeft size={18} />
        Back to Applications
      </button>

      {/* ================= HEADER ================= */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 bg-gradient-to-r from-blue-950 to-blue-900 px-6 py-7 text-white sm:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <FileText size={17} />
                Application Details
              </div>

              <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                {application.service || "Application"}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-blue-100">
                <Hash size={15} />

                <span>
                  {application.applicationNumber ||
                    application._id}
                </span>
              </div>

            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${currentStatus.style}`}
            >
              <StatusIcon size={17} />
              {currentStatus.label}
            </div>

          </div>

        </div>

        {/* QUICK INFORMATION */}

        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">

          <QuickInfo
            icon={Hash}
            label="Application Number"
            value={
              application.applicationNumber ||
              application._id
            }
          />

          <QuickInfo
            icon={CalendarDays}
            label="Submitted Date"
            value={formatDate(application.createdAt)}
          />

          <QuickInfo
            icon={Clock3}
            label="Current Status"
            value={currentStatus.label}
          />

        </div>

      </section>

      {/* ================= APPLICATION INFORMATION ================= */}

      <Section
        icon={FileText}
        title="Application Information"
        description="Basic information about this application."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <InfoItem
            label="Application Number"
            value={
              application.applicationNumber ||
              application._id
            }
          />

          <InfoItem
            label="Service"
            value={application.service}
          />

          <InfoItem
            label="Status"
            value={currentStatus.label}
          />

          <InfoItem
            label="Submitted Date"
            value={formatDate(application.createdAt)}
          />

        </div>
      </Section>

      {/* ================= APPLICANT DETAILS ================= */}

      <Section
        icon={User}
        title="Applicant Details"
        description="Personal information submitted with this application."
      >

        <div className="grid gap-4 sm:grid-cols-2">

          <InfoItem
            label="Full Name"
            value={
              application.applicantDetails?.fullName
            }
          />

          <InfoItem
            label="Citizenship Number"
            value={
              application.applicantDetails
                ?.citizenshipNumber
            }
          />

          <InfoItem
            label="Date of Birth"
            value={formatDate(
              application.applicantDetails?.dateOfBirth
            )}
          />

          <InfoItem
            label="Phone"
            value={
              application.applicantDetails?.phone
            }
            icon={Phone}
          />

          <InfoItem
            label="Email"
            value={
              application.applicantDetails?.email
            }
            icon={Mail}
          />

        </div>

      </Section>

      {/* ================= ADDRESS ================= */}

      <Section
        icon={MapPin}
        title="Address"
        description="Address information provided by the applicant."
      >

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <InfoItem
            label="Province"
            value={application.address?.province}
          />

          <InfoItem
            label="District"
            value={application.address?.district}
          />

          <InfoItem
            label="Municipality"
            value={application.address?.municipality}
          />

          <InfoItem
            label="Ward Number"
            value={application.address?.wardNumber}
          />

          <InfoItem
            label="Tole"
            value={application.address?.tole}
          />

        </div>

      </Section>

      {/* ================= DOCUMENTS ================= */}

      <Section
        icon={FileText}
        title="Submitted Documents"
        description="Documents submitted with this application."
      >

        {documents.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

            <FileText
              size={38}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-medium text-slate-500">
              No documents available.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 md:grid-cols-2">

            {documents.map((doc, index) => {

              /*
               * Backend schema:
               * documentType
               * fileName
               * fileUrl
               * fileType
               * fileSize
               */

              const rawFileUrl =
                doc.fileUrl ||
                doc.url ||
                doc.path ||
                "";

              const fileUrl = getFileUrl(rawFileUrl);

              const fileName =
                doc.fileName ||
                doc.originalName ||
                doc.filename ||
                "Document";

              const documentType =
                doc.documentType ||
                "Submitted Document";

              const isImage =
                doc.fileType?.startsWith("image/") ||
                /\.(jpg|jpeg|png|gif|webp)$/i.test(
                  fileName
                );

              const isPdf =
                doc.fileType === "application/pdf" ||
                /\.pdf$/i.test(fileName);

              return (

                <div
                  key={doc._id || index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* DOCUMENT PREVIEW */}

                  <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-slate-100">

                    {fileUrl && isImage ? (

                      <img
                        src={fileUrl}
                        alt={fileName}
                        className="h-[300px] w-full object-contain bg-white"
                        onError={(event) => {
                          console.error(
                            "Document image failed to load:",
                            fileUrl
                          );

                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : fileUrl && isPdf ? (

                      <div className="flex h-[300px] w-full flex-col items-center justify-center bg-white">

                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
                          <FileText
                            size={40}
                            className="text-red-600"
                          />
                        </div>

                        <p className="mt-4 font-bold text-slate-800">
                          PDF Document
                        </p>

                        <p className="mt-1 max-w-[80%] truncate text-xs text-slate-500">
                          {fileName}
                        </p>

                      </div>

                    ) : (

                      <div className="flex h-[300px] w-full flex-col items-center justify-center bg-white">

                        <FileText
                          size={50}
                          className="text-slate-300"
                        />

                        <p className="mt-3 text-sm font-semibold text-slate-500">
                          Document Preview Unavailable
                        </p>

                      </div>

                    )}

                  </div>

                  {/* DOCUMENT INFORMATION */}

                  <div className="border-t border-slate-200 p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                          Document
                        </p>

                        <h3 className="mt-1 font-bold capitalize text-blue-950">
                          {documentType.replace(
                            /[-_]/g,
                            " "
                          )}
                        </h3>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {fileName}
                        </p>

                        {doc.fileSize ? (
                          <p className="mt-1 text-xs text-slate-400">
                            {formatFileSize(doc.fileSize)}
                          </p>
                        ) : null}

                      </div>

                      <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-800">
                        <FileText size={18} />
                      </div>

                    </div>

                    {/* DOCUMENT ACTIONS */}

                    {fileUrl && (

                      <div className="mt-4 flex gap-3">

                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-950"
                        >
                          <ExternalLink size={16} />
                          View
                        </a>

                        <a
                          href={fileUrl}
                          download={fileName}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                          <Download size={16} />

                          <span className="hidden sm:inline">
                            Download
                          </span>

                        </a>

                      </div>

                    )}

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </Section>

      {/* ================= PAYMENT ================= */}

      <Section
        icon={CreditCard}
        title="Payment Information"
        description="Payment details associated with this application."
      >

        <div className="grid gap-4 sm:grid-cols-2">

          <InfoItem
            label="Application Fee"
            value={`Rs. ${
              application.payment?.amount ??
              application.amount ??
              0
            }`}
          />

          <InfoItem
            label="Payment Status"
            value={
              application.payment?.status ||
              "Pending"
            }
          />

        </div>

        {/* VOUCHER */}

        {application.payment?.voucherUrl && (

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Payment Voucher
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {application.payment.voucherName ||
                    "Payment Voucher"}
                </p>

              </div>

              <a
                href={getFileUrl(
                  application.payment.voucherUrl
                )}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-950"
              >
                <ExternalLink size={16} />
                View
              </a>

            </div>

          </div>

        )}

      </Section>

      {/* ================= FOOTER ================= */}

      <div className="flex justify-end border-t border-slate-200 pt-5">

        <button
          type="button"
          onClick={() =>
            navigate("/citizen/applications")
          }
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-slate-50"
        >
          <ArrowLeft size={17} />
          Back to Applications
        </button>

      </div>

    </div>
  );
};

// ================= SECTION COMPONENT =================

const Section = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
            <Icon size={20} />
          </div>

          <div>

            <h2 className="text-lg font-bold text-blue-950">
              {title}
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>

    </section>
  );
};

// ================= INFO ITEM =================

const InfoItem = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <div className="flex items-center gap-2">

        {Icon && (
          <Icon
            size={15}
            className="text-slate-400"
          />
        )}

        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>

      </div>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>

    </div>
  );
};

// ================= QUICK INFO =================

const QuickInfo = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <Icon size={17} />
        </div>

        <div className="min-w-0">

          <p className="text-xs font-semibold text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-slate-800">
            {value || "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

// ================= FILE SIZE =================

const formatFileSize = (bytes) => {
  if (!bytes) return "";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default ApplicationView;