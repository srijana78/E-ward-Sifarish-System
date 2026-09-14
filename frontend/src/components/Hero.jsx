import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const FEATURE_KEYS = ["secure", "tracking", "qrVerification"];
const CARD_FEATURES = ["feature1", "feature2", "feature3"];

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleApply = () => {
    if (!isAuthenticated) return navigate("/login");
    navigate("/citizen");
  };

  const handleVerify = () => {
    if (!isAuthenticated) return navigate("/login");
    navigate(user?.role === "frontoffice" ? "/frontoffice" : "/citizen");
  };

  const stats = [
    [FileText, "8+", t("hero.statsServicesLabel")],
    [BadgeCheck, "100%", t("hero.statsProcessedLabel")],
    [Users, "24/7", t("hero.statsCitizensLabel")],
  ];

  return (
    <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="block text-red-600">{t("hero.titleLine1")}</span>
                <span className="text-white">{t("hero.titleLine2")}</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {t("hero.description")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleApply}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
                >
                  <span>{isAuthenticated ? t("hero.goToDashboard") : t("hero.applyButton")}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={handleVerify}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl transition duration-200 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-blue-300" />
                  <span>{t("hero.verifyButton")}</span>
                </button>
              </div>

              <div className="pt-6 border-t border-blue-800/80 grid grid-cols-3 gap-2 text-center lg:text-left">
                {FEATURE_KEYS.map((key) => (
                  <div key={key} className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{t(`hero.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {t("hero.cardLabel")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {t("hero.cardStatus")}
                  </span>
                </div>

                <div className="space-y-4">
                  {CARD_FEATURES.map((prefix) => (
                    <div key={prefix} className="p-3.5 rounded-lg bg-blue-950/60 border border-white/10">
                      <p className="text-sm font-bold text-white">{t(`hero.${prefix}Title`)}</p>
                      <p className="text-xs text-slate-300 mt-1">{t(`hero.${prefix}Desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Trust stats strip */}
      <div className="relative border-t border-blue-800/60 bg-blue-950/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-3 gap-4">
          {stats.map(([Icon, value, label]) => (
            <div key={label} className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div className="text-left">
                <p className="text-sm sm:text-base font-extrabold text-white leading-none">{value}</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;