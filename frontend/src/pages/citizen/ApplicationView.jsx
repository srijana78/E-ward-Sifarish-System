import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";

const ApplicationView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/applications/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch application"
          );
        }

        setApplication(data.application);
      } catch (error) {
        console.error("Fetch application error:", error);
        setError(
          error.message || "Failed to fetch application"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "submitted":
      case "pending":
      case "pending review":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2
          size={40}
          className="animate-spin text-blue-700"
        />

        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading application...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-bold text-red-700">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => navigate("/citizen/applications")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white"
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

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8">

      {/* Back Button */}

      <button
        onClick={() => navigate("/citizen/applications")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
      >
        <ArrowLeft size={18} />

        Back to My Applications
      </button>


      {/* Header */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
              <FileText size={27} />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-600">
                APPLICATION DETAILS
              </p>

              <h1 className="mt-1 text-2xl font-bold text-blue-950">
                {application.service}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {application.applicationNumber || application._id}
              </p>
            </div>

          </div>


          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(
              application.status
            )}`}
          >
            {application.status || "Pending"}
          </span>

        </div>

      </section>


      {/* Application Information */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <FileText
              size={21}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Application Information
              </h2>

              <p className="text-sm text-slate-500">
                Details about your submitted application
              </p>
            </div>

          </div>

        </div>


        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

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
            value={application.status}
          />

          <InfoItem
            label="Submitted Date"
            value={formatDate(application.createdAt)}
          />

        </div>

      </section>


      {/* Applicant Details */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <User
              size={21}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Applicant Details
              </h2>

              <p className="text-sm text-slate-500">
                Personal information provided in the application
              </p>
            </div>

          </div>

        </div>


        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

          <InfoItem
            icon={<User size={17} />}
            label="Full Name"
            value={application.applicantDetails?.fullName}
          />

          <InfoItem
            label="Citizenship Number"
            value={
              application.applicantDetails?.citizenshipNumber
            }
          />

          <InfoItem
            icon={<Calendar size={17} />}
            label="Date of Birth"
            value={formatDate(
              application.applicantDetails?.dateOfBirth
            )}
          />

          <InfoItem
            icon={<Phone size={17} />}
            label="Phone Number"
            value={application.applicantDetails?.phone}
          />

          <InfoItem
            icon={<Mail size={17} />}
            label="Email"
            value={
              application.applicantDetails?.email || "N/A"
            }
          />

        </div>

      </section>


      {/* Address */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <MapPin
              size={21}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Address Information
              </h2>

              <p className="text-sm text-slate-500">
                Address provided during the application
              </p>
            </div>

          </div>

        </div>


        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

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

      </section>


      {/* Payment */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-center gap-3">

            <CreditCard
              size={21}
              className="text-blue-700"
            />

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Payment Information
              </h2>

              <p className="text-sm text-slate-500">
                Payment verification status
              </p>
            </div>

          </div>

        </div>


        <div className="p-6">

          <InfoItem
            label="Payment Status"
            value={application.payment?.status || "Pending"}
          />

        </div>

      </section>

    </div>
  );
};


const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">

        {icon}

        {label}

      </p>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value || "N/A"}
      </p>

    </div>
  );
};


export default ApplicationView;