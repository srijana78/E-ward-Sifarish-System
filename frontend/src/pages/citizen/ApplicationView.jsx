import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft, FileText, User, MapPin, CreditCard, Loader2, CalendarDays,
  Phone, Mail, Hash, CheckCircle2, Clock3, XCircle, ExternalLink, Download,
  ShieldAlert, Award, QrCode,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/applications`;
const BACKEND_URL = import.meta.env.VITE_API_URL;

const STATUS_STYLES = {
  approved: { icon: CheckCircle2, style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { icon: XCircle, style: "bg-red-50 text-red-700 border-red-200" },
  submitted: { icon: Clock3, style: "bg-amber-50 text-amber-700 border-amber-200" },
  pending: { icon: Clock3, style: "bg-amber-50 text-amber-700 border-amber-200" },
  under_review: { icon: Clock3, style: "bg-blue-50 text-blue-700 border-blue-200" },
  verified: { icon: CheckCircle2, style: "bg-purple-50 text-purple-700 border-purple-200" },
  recommended: { icon: CheckCircle2, style: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  draft: { icon: FileText, style: "bg-slate-50 text-slate-700 border-slate-200" },
};

// Human-readable label for who rejected the application, used with rejectedBy
const REJECTED_BY_LABEL = {
  frontoffice: "applicationView.rejectedByFrontOffice",
  secretary: "applicationView.rejectedBySecretary",
  chairperson: "applicationView.rejectedByChairperson",
};

// Picks the correct remarks field based on who rejected it
const getRejectionRemarks = (application) => {
  if (application.rejectedBy === "frontoffice") return application.frontOfficeRemarks;
  if (application.rejectedBy === "secretary") return application.secretaryRemarks;
  if (application.rejectedBy === "chairperson") return application.chairpersonRemarks;
  return "";
};

const formatFileSize = (b) => (!b ? "" : b < 1024 ? `${b} B` : b < 1024 ** 2 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 ** 2).toFixed(1)} MB`);
const getFileUrl = (url) => (!url ? "" : /^https?:\/\//.test(url) ? url : `${BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const Section = ({ icon: Icon, title, description, children }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800"><Icon size={20} /></div>
        <div>
          <h2 className="text-lg font-bold text-blue-950">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

const InfoItem = ({ label, value, icon: Icon, na }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={15} className="text-slate-400" />}
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
    <p className="mt-2 break-words text-sm font-bold text-slate-800">{value || na}</p>
  </div>
);

const QuickInfo = ({ icon: Icon, label, value, na }) => (
  <div className="bg-white p-4 sm:p-5">
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Icon size={17} /></div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="mt-1 truncate text-sm font-bold text-slate-800">{value || na}</p>
      </div>
    </div>
  </div>
);

const DocumentCard = ({ doc, t }) => {
  const fileUrl = getFileUrl(doc.fileUrl || doc.url || doc.path || "");
  const fileName = doc.fileName || doc.originalName || doc.filename || t("applicationView.documentLabel");
  const isImage = doc.fileType?.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  const isPdf = doc.fileType === "application/pdf" || /\.pdf$/i.test(fileName);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative flex h-[300px] items-center justify-center bg-slate-100">
        {fileUrl && isImage ? (
          <img src={fileUrl} alt={fileName} className="h-[300px] w-full bg-white object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
        ) : fileUrl && isPdf ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50"><FileText size={40} className="text-red-600" /></div>
            <p className="mt-4 font-bold text-slate-800">{t("applicationView.pdfDocument")}</p>
            <p className="mt-1 max-w-[80%] truncate text-xs text-slate-500">{fileName}</p>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-white">
            <FileText size={50} className="text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-500">{t("applicationView.previewUnavailable")}</p>
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-red-600">{t("applicationView.documentLabel")}</p>
            <h3 className="mt-1 font-bold capitalize text-blue-950">{(doc.documentType || "").replace(/[-_]/g, " ") || t("applicationView.documentLabel")}</h3>
            <p className="mt-1 truncate text-sm text-slate-500">{fileName}</p>
            {doc.fileSize ? <p className="mt-1 text-xs text-slate-400">{formatFileSize(doc.fileSize)}</p> : null}
          </div>
          <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-800"><FileText size={18} /></div>
        </div>
        {fileUrl && (
          <div className="mt-4 flex gap-3">
            <a href={fileUrl} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-950">
              <ExternalLink size={16} /> {t("applicationView.view")}
            </a>
            <a href={fileUrl} download={fileName} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              <Download size={16} /> <span className="hidden sm:inline">{t("applicationView.download")}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const ApplicationView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const { t } = useTranslation();
  const na = t("common.notAvailable");

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const authToken = token || localStorage.getItem("sifarish_token") || localStorage.getItem("token");
        if (!authToken) throw new Error(t("applicationView.noToken"));
        const res = await fetch(`${API}/${id}`, { headers: { Authorization: `Bearer ${authToken}` } });
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (!res.ok) throw new Error(data.message || t("applicationView.fetchError"));
        setApplication(data.application);
      } catch (err) {
        setError(err.message || t("applicationView.fetchError"));
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  const formatDate = (date) => {
    const d = date && new Date(date);
    return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : na;
  };

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <Loader2 size={38} className="mx-auto animate-spin text-blue-800" />
        <p className="mt-4 text-sm font-medium text-slate-500">{t("applicationView.loading")}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <XCircle size={22} className="mt-0.5 text-red-600" />
          <div>
            <h2 className="font-bold text-red-800">{t("applicationView.errorTitle")}</h2>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
        <button onClick={() => navigate("/citizen/applications")} className="mt-5 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">
          <ArrowLeft size={17} /> {t("applicationView.backToApplications")}
        </button>
      </div>
    </div>
  );

  if (!application) return null;

  const statusKey = application.status?.toLowerCase();
  const { icon: StatusIcon, style } = STATUS_STYLES[statusKey] || STATUS_STYLES.draft;
  const statusLabel = t(`status.${statusKey}`, { defaultValue: application.status || t("status.pending") });
  const back = () => navigate("/citizen/applications");

  const isApproved = statusKey === "approved" && application.certificate?.filePath;
  const isRejected = statusKey === "rejected";
  const rejectionRemarks = isRejected ? getRejectionRemarks(application) : "";
  const rejectedByLabelKey = isRejected ? REJECTED_BY_LABEL[application.rejectedBy] : null;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <button onClick={back} className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-800">
        <ArrowLeft size={18} /> {t("applicationView.backToApplications")}
      </button>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-r from-blue-950 to-blue-900 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-200"><FileText size={17} /> {t("applicationView.badge")}</div>
              <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{application.service || t("applicationView.badge")}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-blue-100"><Hash size={15} /> <span>{application.applicationNumber || application._id}</span></div>
            </div>
            <div className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${style}`}><StatusIcon size={17} /> {statusLabel}</div>
          </div>
        </div>
        <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
          <QuickInfo icon={Hash} label={t("applicationView.applicationNumber")} value={application.applicationNumber || application._id} na={na} />
          <QuickInfo icon={CalendarDays} label={t("myApplications.submittedDate")} value={formatDate(application.createdAt)} na={na} />
          <QuickInfo icon={Clock3} label={t("myApplications.currentStatus")} value={statusLabel} na={na} />
        </div>
      </section>

      {/* CERTIFICATE — shown only when approved and a certificate file exists */}
      {isApproved && (
        <section className="overflow-hidden rounded-2xl border-2 border-emerald-200 bg-emerald-50 shadow-sm">
          <div className="px-5 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                  <Award size={26} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-emerald-900">
                    {t("applicationView.certificateReadyTitle")}
                  </h2>
                  <p className="mt-1 text-sm text-emerald-700">
                    {t("applicationView.certificateReadyDescription")}
                  </p>
                </div>
              </div>

              
               <a href={getFileUrl(application.certificate.filePath)}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <Download size={18} />
                {t("applicationView.downloadCertificate")}
              </a>
            </div>

            {application.certificate.qrData && (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/60 px-4 py-3 text-xs text-emerald-800">
                <QrCode size={15} className="shrink-0" />
                <span>{t("applicationView.certificateQrNote")}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* REJECTION REASON — shown only when rejected */}
      {isRejected && (
        <section className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 shadow-sm">
          <div className="px-5 py-6 sm:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white">
                <ShieldAlert size={22} />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-red-900">
                  {t("applicationView.rejectedTitle")}
                </h2>
                <p className="mt-1 text-sm font-semibold text-red-700">
                  {rejectedByLabelKey ? t(rejectedByLabelKey) : t("applicationView.rejectedByUnknown")}
                </p>
                <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-red-800">
                  {rejectionRemarks || t("applicationView.noRejectionReason")}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Section icon={FileText} title={t("applicationView.appInfoTitle")} description={t("applicationView.appInfoDesc")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoItem label={t("applicationView.applicationNumber")} value={application.applicationNumber || application._id} na={na} />
          <InfoItem label={t("applicationView.service")} value={application.service} na={na} />
          <InfoItem label={t("applicationView.status")} value={statusLabel} na={na} />
          <InfoItem label={t("myApplications.submittedDate")} value={formatDate(application.createdAt)} na={na} />
        </div>
      </Section>

      <Section icon={User} title={t("applicationView.applicantTitle")} description={t("applicationView.applicantDesc")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem label={t("auth.fullNameLabel")} value={application.applicantDetails?.fullName} na={na} />
          <InfoItem label={t("auth.citizenshipLabel")} value={application.applicantDetails?.citizenshipNumber} na={na} />
          <InfoItem label={t("applicationView.dateOfBirth")} value={formatDate(application.applicantDetails?.dateOfBirth)} na={na} />
          <InfoItem label={t("applicationView.phone")} value={application.applicantDetails?.phone} icon={Phone} na={na} />
          <InfoItem label={t("applicationView.email")} value={application.applicantDetails?.email} icon={Mail} na={na} />
        </div>
      </Section>

      <Section icon={MapPin} title={t("applicationView.addressTitle")} description={t("applicationView.addressDesc")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label={t("applicationView.province")} value={application.address?.province} na={na} />
          <InfoItem label={t("applicationView.district")} value={application.address?.district} na={na} />
          <InfoItem label={t("applicationView.municipality")} value={application.address?.municipality} na={na} />
          <InfoItem label={t("applicationView.wardNumber")} value={application.address?.wardNumber} na={na} />
          <InfoItem label={t("applicationView.tole")} value={application.address?.tole} na={na} />
        </div>
      </Section>

      <Section icon={FileText} title={t("applicationView.documentsTitle")} description={t("applicationView.documentsDesc")}>
        {(application.documents || []).length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <FileText size={38} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-500">{t("applicationView.noDocuments")}</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {application.documents.map((doc, i) => <DocumentCard key={doc._id || i} doc={doc} t={t} />)}
          </div>
        )}
      </Section>

      <Section icon={CreditCard} title={t("applicationView.paymentTitle")} description={t("applicationView.paymentDesc")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem label={t("applicationView.applicationFee")} value={`Rs. ${application.payment?.amount ?? application.amount ?? 0}`} na={na} />
          <InfoItem label={t("applicationView.paymentStatus")} value={application.payment?.status || t("status.pending")} na={na} />
        </div>
        {application.payment?.voucherUrl && (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{t("applicationView.paymentVoucher")}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{application.payment.voucherName || t("applicationView.paymentVoucher")}</p>
              </div>
              <a href={getFileUrl(application.payment.voucherUrl)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-950">
                <ExternalLink size={16} /> {t("applicationView.view")}
              </a>
            </div>
          </div>
        )}
      </Section>

      <div className="flex justify-end border-t border-slate-200 pt-5">
        <button onClick={back} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-slate-50">
          <ArrowLeft size={17} /> {t("applicationView.backToApplications")}
        </button>
      </div>
    </div>
  );
};

export default ApplicationView;