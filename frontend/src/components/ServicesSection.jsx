import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, FileCheck, Building2, ArrowRight, LayoutGrid } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SERVICES = [
  { id: "vital", icon: Users, iconColor: "text-red-600", titleKey: "services.vitalTitle", descKey: "services.vitalDesc" },
  { id: "citizenship", icon: FileCheck, iconColor: "text-blue-900", titleKey: "services.citizenshipTitle", descKey: "services.citizenshipDesc" },
  { id: "property", icon: Building2, iconColor: "text-red-600", titleKey: "services.propertyTitle", descKey: "services.propertyDesc" },
];

function ServicesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleApply = () => navigate(isAuthenticated ? "/citizen" : "/login");

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map(({ id, icon: Icon, iconColor, titleKey, descKey }) => (
            <div
              key={id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t(titleKey)}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">{t(descKey)}</p>
              </div>

              <button
                onClick={handleApply}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-lg transition duration-200 cursor-pointer"
              >
                <span>{isAuthenticated ? t("services.dashboardAction") : t("services.applyAction")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleApply}
            className="inline-flex items-center gap-2 border border-slate-300 bg-white hover:bg-blue-950 hover:text-white hover:border-blue-950 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl transition duration-200 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>{t("services.viewAllButton")}</span>
          </button>
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;