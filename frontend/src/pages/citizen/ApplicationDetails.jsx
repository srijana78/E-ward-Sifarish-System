import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  MapPin,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useApplication } from "../../context/ApplicationContext";

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { applicationData, updateApplicantDetails, updateAddress } =
    useApplication();

  const params = new URLSearchParams(location.search);
  const service = params.get("service");

  // ================= FORM DATA =================
  // Prefilled from context (if the user already filled this step once)
  // or from their logged-in profile as a starting point.

  const [formData, setFormData] = useState({
    fullName:
      applicationData.applicantDetails?.fullName || user?.name || "",

    citizenshipNumber:
      applicationData.applicantDetails?.citizenshipNumber ||
      user?.citizenshipNo ||
      "",

    dateOfBirth: applicationData.applicantDetails?.dateOfBirth
      ? applicationData.applicantDetails.dateOfBirth.split("T")[0]
      : "",

    phone: applicationData.applicantDetails?.phone || user?.phone || "",

    email: applicationData.applicantDetails?.email || user?.email || "",

    province: applicationData.address?.province || "",
    district: applicationData.address?.district || "",
    municipality: applicationData.address?.municipality || "",
    wardNumber: applicationData.address?.wardNumber || "",
    tole: applicationData.address?.tole || "",
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= CONTINUE =================

  const handleContinue = (e) => {
    e.preventDefault();

    updateApplicantDetails({
      fullName: formData.fullName,
      citizenshipNumber: formData.citizenshipNumber,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      email: formData.email,
    });

    updateAddress({
      province: formData.province,
      district: formData.district,
      municipality: formData.municipality,
      wardNumber: formData.wardNumber,
      tole: formData.tole,
    });

    navigate(`/citizen/apply/documents?service=${service || ""}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-slate-500">

        <button
          onClick={() => navigate("/citizen/apply")}
          className="hover:text-blue-700 transition"
        >
          {t("newApplication.title")}
        </button>

        <span>/</span>

        <span className="text-slate-700 font-medium">
          {t("applicationDetails.title")}
        </span>

      </div>

      {/* Header */}

      <div>

        <div className="flex items-center gap-3 mb-2">

          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <UserRound size={22} />
          </div>

          <div>

            <p className="text-sm font-semibold text-red-600">
              {t("applicationDetails.stepTwo")}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
              {t("applicationDetails.title")}
            </h1>

          </div>

        </div>

        <p className="text-slate-600 max-w-3xl">
          {t("applicationDetails.description")}
        </p>

      </div>

      {/* Progress */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex items-center justify-between mb-3">

          <span className="text-sm font-semibold text-slate-700">
            {t("applicationDetails.progress")}
          </span>

          <span className="text-sm font-bold text-blue-700">
            2 / 5
          </span>

        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full w-2/5 bg-red-600 rounded-full" />
        </div>

        <div className="grid grid-cols-5 mt-4 text-xs text-slate-500">

          <span className="text-blue-700 font-semibold">
            {t("applicationDetails.application")}
          </span>

          <span className="text-blue-700 font-semibold">
            {t("applicationDetails.applicant")}
          </span>

          <span>
            {t("applicationDetails.documents")}
          </span>

          <span>
            {t("applicationDetails.payment")}
          </span>

          <span>
            {t("applicationDetails.review")}
          </span>

        </div>

      </div>

      {/* Selected Service */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <div className="flex items-start gap-3">

          <FileText
            size={20}
            className="text-blue-700 mt-0.5"
          />

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {t("applicationDetails.selectedService")}
            </p>

            <p className="font-bold text-blue-950 mt-1">

              {service
                ? t(`newApplication.services.${service}`)
                : t(
                    "applicationDetails.recommendationService"
                  )}

            </p>

          </div>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleContinue}
        className="space-y-6"
      >

        {/* PERSONAL INFORMATION */}

        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">

            <div className="flex items-center gap-3">

              <UserRound
                size={20}
                className="text-blue-700"
              />

              <div>

                <h2 className="font-bold text-lg text-blue-950">
                  {t(
                    "applicationDetails.personalInformation"
                  )}
                </h2>

                <p className="text-sm text-slate-500">

                  {t(
                    "applicationDetails.personalInformationDescription"
                  )}

                </p>

              </div>

            </div>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <InputField
              label={t("applicationDetails.fullName")}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.fullNamePlaceholder"
              )}
              required
            />

            <InputField
              label={t(
                "applicationDetails.citizenshipNumber"
              )}
              name="citizenshipNumber"
              value={formData.citizenshipNumber}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.citizenshipNumberPlaceholder"
              )}
              required
            />

            <InputField
              label={t(
                "applicationDetails.dateOfBirth"
              )}
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />

            <InputField
              label={t("applicationDetails.phone")}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.phonePlaceholder"
              )}
              required
              icon={<Phone size={16} />}
            />

            <InputField
              label={t("applicationDetails.email")}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.emailPlaceholder"
              )}
              icon={<Mail size={16} />}
            />

          </div>

        </section>

        {/* ADDRESS INFORMATION */}

        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-200">

            <div className="flex items-center gap-3">

              <MapPin
                size={20}
                className="text-blue-700"
              />

              <div>

                <h2 className="font-bold text-lg text-blue-950">
                  {t(
                    "applicationDetails.addressInformation"
                  )}
                </h2>

                <p className="text-sm text-slate-500">

                  {t(
                    "applicationDetails.addressInformationDescription"
                  )}

                </p>

              </div>

            </div>

          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

            <InputField
              label={t("applicationDetails.province")}
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.provincePlaceholder"
              )}
              required
            />

            <InputField
              label={t("applicationDetails.district")}
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.districtPlaceholder"
              )}
              required
            />

            <InputField
              label={t(
                "applicationDetails.municipality"
              )}
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.municipalityPlaceholder"
              )}
              required
            />

            <InputField
              label={t(
                "applicationDetails.wardNumber"
              )}
              name="wardNumber"
              value={formData.wardNumber}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.wardNumberPlaceholder"
              )}
              required
            />

            <InputField
              label={t("applicationDetails.tole")}
              name="tole"
              value={formData.tole}
              onChange={handleChange}
              placeholder={t(
                "applicationDetails.tolePlaceholder"
              )}
              required
            />

          </div>

        </section>

        {/* ACTION BUTTONS */}

        <div className="flex flex-col sm:flex-row justify-between gap-3 pb-6">

          <button
            type="button"
            onClick={() =>
              navigate("/citizen/apply")
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
          >

            <ArrowLeft size={18} />

            {t("applicationDetails.back")}

          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm"
          >

            {t("applicationDetails.continue")}

            <ArrowRight size={18} />

          </button>

        </div>

      </form>

    </div>
  );
};


// ================= REUSABLE INPUT =================

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) => {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">

        {label}

        {required && (
          <span className="text-red-600 ml-1">*</span>
        )}

      </label>

      <div className="relative">

        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
            icon ? "pl-10" : ""
          }`}
        />

      </div>

    </div>
  );
};

export default ApplicationDetails;