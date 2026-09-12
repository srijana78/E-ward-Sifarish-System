import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Clock,
  Mail,
  HelpCircle,
  Globe,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ne" ? "en" : "ne";
    i18n.changeLanguage(nextLang);
  };

  const goToDashboard = () => {
    if (user?.role === "frontoffice") {
      navigate("/frontoffice");
    } else {
      navigate("/citizen");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full bg-white border-b border-slate-200">

      {/* Top Utility Bar */}
      <div className="bg-blue-950 text-slate-100 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-2">

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-normal">

            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />

              <span>{t("header.officeHours")}</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-300 shrink-0" />

              <a
                href={`mailto:${t("header.email")}`}
                className="hover:underline"
              >
                {t("header.email")}
              </a>
            </div>

          </div>

          <div className="flex items-center gap-4 ml-auto">

            <div className="flex items-center gap-1.5 bg-red-600/90 text-white px-2.5 py-0.5 rounded font-medium text-xs">
              <HelpCircle className="w-3.5 h-3.5" />

              <span>
                {t("header.helplineLabel")}{" "}
                {t("header.helplineNumber")}
              </span>
            </div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-blue-900 hover:bg-blue-800 text-white px-2.5 py-1 rounded text-xs font-semibold transition border border-blue-700 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />

              <span>{t("header.languageSwitch")}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo and Municipality Name */}
        <Link
          to="/"
          className="flex items-center gap-4 text-center md:text-left"
        >
          <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full p-2">

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
              alt="Emblem of Nepal"
              className="w-full h-full object-contain"
            />

          </div>

          <div>
            <p className="text-xs sm:text-sm font-semibold text-red-600 uppercase tracking-wider">
              {t("header.province")}
            </p>

            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950 leading-tight">
              {t("header.municipality")}
            </h1>

            <p className="text-sm sm:text-base font-bold text-slate-700">
              {t("header.ward")}
            </p>
          </div>

        </Link>

        {/* Authentication Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">

          {isAuthenticated ? (
            <>
              {/* Dashboard */}
              <button
                onClick={goToDashboard}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />

                <span>Dashboard</span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />

                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <LogIn className="w-4 h-4" />

                <span>{t("header.login")}</span>
              </button>

              {/* Register */}
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <span>{t("header.register")}</span>
              </button>
            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;