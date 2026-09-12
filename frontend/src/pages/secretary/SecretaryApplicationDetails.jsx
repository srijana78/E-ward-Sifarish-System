import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  FileText,
  Receipt,
  CheckCircle2,
  Send,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/applications";

const SecretaryApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      token || localStorage.getItem("sifarish_token")
    }`,
  };

  useEffect(() => {
    const fetchApplication = async () => {
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

    fetchApplication();
  }, [id, token]);

  const recommendApplication = async () => {
    if (!remarks.trim()) {
      return setError(t("secretaryDetails.remarksRequired"));
    }

    try {
      const res = await fetch(`${API}/${id}/recommend`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ remarks }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      navigate("/secretary/recommended");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-slate-500">{t("secretaryDetails.loading")}</p>;
  }

  if (!application) {
    return <p className="text-red-600">{error}</p>;
  }

  const { applicantDetails = {}, address = {}, payment = {} } = application;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border bg-white p-2 hover:bg-slate-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <p className="text-sm font-semibold text-red-600">
            {t("secretaryDetails.label")}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-blue-950">
            {application.applicationNumber}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {application.service}
          </p>
        </div>
      </section>

      {error && (
        <div className="flex gap-2 rounded-xl bg-red-50 p-4 text-red-600">
          <AlertCircle size={19} />
          {error}
        </div>
      )}

      {/* APPLICANT + ADDRESS */}
      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={User}
          title={t("secretaryDetails.applicant")}
          items={[
            applicantDetails.fullName,
            applicantDetails.citizenshipNumber,
            applicantDetails.phone,
            applicantDetails.email,
          ]}
        />

        <InfoCard
          icon={FileText}
          title={t("secretaryDetails.address")}
          items={[
            address.province,
            address.district,
            address.municipality,
            `${t("secretaryDetails.ward")} ${address.wardNumber}`,
            address.tole,
          ]}
        />
      </section>

      {/* DOCUMENTS */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-bold text-blue-950">
          <FileText size={20} />
          {t("secretaryDetails.documents")}
        </h2>

        <div className="mt-4 space-y-2">
          {application.documents?.length ? (
            application.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <span className="text-sm">{doc.documentType}</span>

                {doc.fileUrl && (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-blue-900"
                  >
                    {t("secretaryDetails.view")}
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              {t("secretaryDetails.noDocuments")}
            </p>
          )}
        </div>
      </section>

      {/* PAYMENT + FRONT OFFICE */}
      <section className="grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={Receipt}
          title={t("secretaryDetails.payment")}
          items={[
            `${t("secretaryDetails.status")}: ${payment.status || "-"}`,
            payment.voucherName || t("secretaryDetails.noVoucher"),
          ]}
        />

        <InfoCard
          icon={CheckCircle2}
          title={t("secretaryDetails.frontOfficeReview")}
          items={[
            application.remarks || t("secretaryDetails.noRemarks"),
            t("secretaryDetails.verifiedByFrontOffice"),
          ]}
        />
      </section>

      {/* SECRETARY ACTION */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-blue-950">
          {t("secretaryDetails.secretaryReview")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("secretaryDetails.reviewDescription")}
        </p>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder={t("secretaryDetails.remarksPlaceholder")}
          className="mt-4 min-h-28 w-full rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-900"
        />

        <button
          onClick={recommendApplication}
          className="mt-4 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          <Send size={18} />
          {t("secretaryDetails.recommend")}
        </button>
      </section>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, items }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 className="flex items-center gap-2 font-bold text-blue-950">
      <Icon size={20} />
      {title}
    </h2>

    <div className="mt-4 space-y-2 text-sm text-slate-600">
      {items.filter(Boolean).map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  </div>
);

export default SecretaryApplicationDetails;