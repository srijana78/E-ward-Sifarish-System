import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const FrontOfficeApplicationDetails = () => {
const navigate = useNavigate();
const { id } = useParams();
const { token } = useAuth();

const [application, setApplication] = useState(null);
const [loading, setLoading] = useState(true);
const [verifying, setVerifying] = useState(false);
const [error, setError] = useState("");

const authToken = token || localStorage.getItem("sifarish_token");

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

if (!res.ok) throw new Error(data.message || "Something went wrong");

return data;


};

useEffect(() => {
const fetchApplication = async () => {
try {
setLoading(true);
const data = await request(`${API}/${id}`);
setApplication(data.application);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};


fetchApplication();


}, [id, token]);

const handleVerify = async () => {
try {
setVerifying(true);
setError("");


  const data = await request(`${API}/${id}/verify`, {
    method: "PATCH",
  });

  setApplication(data.application);
  alert("Application verified successfully!");
  navigate("/frontoffice/verified");
} catch (err) {
  setError(err.message);
} finally {
  setVerifying(false);
}


};

const formatDate = (date) =>
date ? new Date(date).toLocaleDateString() : "N/A";

if (loading)
return ( <div className="flex min-h-[60vh] flex-col items-center justify-center"> <Loader2 size={35} className="animate-spin text-blue-700" /> <p className="mt-4 text-sm text-slate-500">
Loading application... </p> </div>
);

if (!application)
return ( <div className="mx-auto mt-9 max-w-4xl rounded-xl bg-red-50 p-5 text-red-600">
{error || "Application not found"} </div>
);

const applicant = application.applicantDetails || {};
const address = application.address || {};
const verified = application.status === "verified";

return ( <div className="mx-auto mt-9 max-w-7xl space-y-6">


  {/* HEADER */}
  <section className="flex items-start justify-between gap-4">
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-900"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <p className="text-sm font-semibold text-red-600">
        Application Details
      </p>

      <h1 className="mt-1 text-2xl font-bold text-blue-950">
        {application.applicationNumber || application._id}
      </h1>
    </div>

    <Status status={application.status} />
  </section>

  {error && (
    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
      {error}
    </div>
  )}

  {/* APPLICATION ID */}
  <section className="rounded-xl bg-blue-50 p-5">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm text-blue-700">Application ID</p>
        <h2 className="text-xl font-bold text-blue-950">
          {application.applicationNumber || application._id}
        </h2>
      </div>

      <p className="flex items-center gap-2 text-sm text-slate-600">
        <CalendarDays size={17} />
        Submitted on {formatDate(application.createdAt)}
      </p>
    </div>
  </section>

  {/* APPLICANT */}
  <Section
    icon={User}
    title="Applicant Information"
    description="Personal information of the applicant"
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Info label="Full Name" value={applicant.fullName} />
      <Info label="Citizenship Number" value={applicant.citizenshipNumber} />
      <Info label="Phone" value={applicant.phone} />
      <Info label="Email" value={applicant.email} />
      <Info
        label="Address"
        value={
          applicant.address ||
          address.municipality ||
          address.district
        }
      />
    </div>
  </Section>

  {/* SERVICE */}
  <Section
    icon={FileText}
    title="Application Information"
    description="Requested service details"
  >
    <Info label="Requested Service" value={application.service} />
  </Section>

  {/* DOCUMENTS */}
  <Section
    icon={FileText}
    title="Documents"
    description="Uploaded documents"
  >
    {application.documents?.length ? (
      <div className="space-y-3">
        {application.documents.map((doc, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg bg-slate-50 p-4"
          >
            <FileText size={18} className="text-blue-900" />
            <span className="text-sm font-medium text-slate-700">
              {doc.name || doc.fileName || `Document ${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-slate-500">
        No documents uploaded.
      </p>
    )}
  </Section>

  {/* PAYMENT */}
  <Section
    icon={CreditCard}
    title="Payment Information"
    description="Application payment status"
  >
    <div className="flex items-center justify-between">
      <p className="font-medium text-slate-700">Payment Status</p>

      <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
        <CheckCircle2 size={16} />
        {application.payment?.status || "Paid"}
      </span>
    </div>
  </Section>

  {/* VERIFY */}
  {!verified ? (
    <section className="rounded-xl bg-blue-50 p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div className="flex gap-3">
          <div className="rounded-lg bg-white p-3 text-blue-900">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              Verify Application
            </h2>
            <p className="text-sm text-slate-600">
              Check all information before verifying this application.
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

          {verifying ? "Verifying..." : "Verify Application"}
        </button>
      </div>
    </section>
  ) : (
    <section className="flex items-center gap-3 rounded-xl bg-green-50 p-6">
      <CheckCircle2 size={25} className="text-green-600" />

      <div>
        <h2 className="font-bold text-green-800">
          Application Verified
        </h2>
        <p className="text-sm text-green-700">
          This application has been successfully verified.
        </p>
      </div>
    </section>
  )}
</div>


);
};

const Section = ({ icon: Icon, title, description, children }) => (

  <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b p-5">
      <div className="rounded-lg bg-blue-50 p-2.5 text-blue-900">
        <Icon size={21} />
      </div>


  <div>
    <h2 className="font-bold text-blue-950">{title}</h2>
    <p className="text-sm text-slate-500">{description}</p>
  </div>
</div>

<div className="p-5">{children}</div>


  </section>
);

const Info = ({ label, value }) => (

  <div>
    <p className="text-xs font-medium text-slate-400">{label}</p>
    <p className="mt-1 font-semibold text-slate-800">{value || "N/A"}</p>
  </div>
);

const Status = ({ status }) => {
const verified = status === "verified";

return (
<span
className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        verified
          ? "bg-green-50 text-green-700"
          : "bg-amber-50 text-amber-700"
      }`}
>
{verified ? <CheckCircle2 size={17} /> : <Clock3 size={17} />}
{status?.replace("_", " ") || "Pending"} </span>
);
};

export default FrontOfficeApplicationDetails;
