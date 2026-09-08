import React from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Users,
  FileCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function ServicesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleApply = () => {
    if (isAuthenticated) {
      navigate("/citizen");
    } else {
      navigate("/login");
    }
  };

  const services = [
    {
      id: "vital",
      icon: <Users className="w-7 h-7 text-red-600" />,
      titleKey: "services.vitalTitle",
      descKey: "services.vitalDesc",
    },
    {
      id: "citizenship",
      icon: <FileCheck className="w-7 h-7 text-blue-900" />,
      titleKey: "services.citizenshipTitle",
      descKey: "services.citizenshipDesc",
    },
    {
      id: "property",
      icon: <Building2 className="w-7 h-7 text-red-600" />,
      titleKey: "services.propertyTitle",
      descKey: "services.propertyDesc",
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <span className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {t("services.badge")}
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            {t("services.title")}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {t("services.description")}
          </p>

        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
            >

              <div>

                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {t(service.titleKey)}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {t(service.descKey)}
                </p>

              </div>

              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-lg transition duration-200 cursor-pointer"
              >

                <span>
                  {isAuthenticated
                    ? "Go to Dashboard"
                    : t("services.applyAction")}
                </span>

                <ArrowRight className="w-4 h-4" />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ServicesSection;