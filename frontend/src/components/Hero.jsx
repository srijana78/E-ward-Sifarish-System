import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ArrowRight,
  Search,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAuth();

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    navigate("/citizen");
  };

  const handleVerify = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role === "frontoffice") {
      navigate("/frontoffice");
    } else {
      navigate("/citizen");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden py-16 lg:py-24">

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">

              <ShieldCheck className="w-4 h-4 text-red-800" />

              <span className="text-red-700">
                {t("hero.badge")}
              </span>

            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">

              <span className="block text-red-600">
                {t("hero.titleLine1")}
              </span>

              <span className="text-white">
                {t("hero.titleLine2")}
              </span>

            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">

              <button
                onClick={handleApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
              >
                <span>
                  {isAuthenticated
                    ? "Go to Citizen Dashboard"
                    : t("hero.applyButton")}
                </span>

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

            {/* Features */}
            <div className="pt-6 border-t border-blue-800/80 grid grid-cols-3 gap-2 text-center lg:text-left">

              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>{t("hero.secure")}</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>{t("hero.tracking")}</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>{t("hero.qrVerification")}</span>
              </div>

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

                <div className="p-3.5 rounded-lg bg-blue-950/60 border border-white/10">
                  <p className="text-sm font-bold text-white">
                    {t("hero.feature1Title")}
                  </p>

                  <p className="text-xs text-slate-300 mt-1">
                    {t("hero.feature1Desc")}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-blue-950/60 border border-white/10">
                  <p className="text-sm font-bold text-white">
                    {t("hero.feature2Title")}
                  </p>

                  <p className="text-xs text-slate-300 mt-1">
                    {t("hero.feature2Desc")}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-blue-950/60 border border-white/10">
                  <p className="text-sm font-bold text-white">
                    {t("hero.feature3Title")}
                  </p>

                  <p className="text-xs text-slate-300 mt-1">
                    {t("hero.feature3Desc")}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;