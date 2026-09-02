import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Menu,
  X,
  Building2,
  Search,
  ShieldCheck,
  LogIn,
  Phone,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Change website language
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  const navLinkClass = ({ isActive }) =>
    `text-lg font-medium transition ${
      isActive
        ? "text-blue-700 font-semibold"
        : "text-slate-600 hover:text-blue-700"
    }`;

  return (
    <>
      {/* ================= TOP GOVERNMENT BAR ================= */}
      <div className="hidden  md:block bg-slate-900 text-slate-200 text-lg">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-around ">

          {/* Government Information */}
          <div className="flex items-center gap-4">
            <span>🇳🇵</span>

            <span>
              {t("government.title")} |{" "}
              {t("government.subtitle")}
            </span>
          </div>


          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Help */}
            <div className="flex items-center gap-3">
              <Phone size={14} />
              <span>{t("navbar.helpCenter")}</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => changeLanguage("ne")}
                className={`transition ${
                  i18n.language === "ne"
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("navbar.nepali")}
              </button>

              <span className="text-slate-400">|</span>

              <button
                onClick={() => changeLanguage("en")}
                className={`transition ${
                  i18n.language === "en"
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("navbar.english")}
              </button>

            </div>

          </div>
        </div>
      </div>


      {/* ================= MAIN NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-300 shadow-md">

        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="min-h-[100px] max-h-[120px] flex items-center justify-between">
            {/* ================= BRAND ================= */}
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-700 flex items-center justify-center shadow-md">
                <Building2 size={28} className="text-white" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                  {t("navbar.systemName")}
                </h1>

                <p className="hidden sm:block text-md text-slate-500 mt-0.5">
                  {t("navbar.systemSubtitle")}
                </p>
              </div>
            </Link>


            {/* ================= DESKTOP NAVIGATION ================= */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">

              <NavLink
                to="/"
                className={navLinkClass}
              >
                {t("navbar.home")}
              </NavLink>


              <a
                href="/#services"
                className="text-lg font-bold text-slate-800 hover:text-blue-700 transition"
              >
                {t("navbar.services")}
              </a>


              <Link
                to="/track"
                className="flex items-center gap-1.5 text-lg font-medium text-slate-600 hover:text-blue-700 transition"
              >
                <Search size={18} />

                {t("navbar.trackApplication")}
              </Link>


              <Link
                to="/verify"
                className="flex items-center gap-1.5 text-lg font-medium text-slate-600 hover:text-blue-700 transition"
              >
                <ShieldCheck size={18} />

                {t("navbar.verifyCertificate")}
              </Link>


              <a
                href="/#notices"
                className="text-lg  font-medium text-slate-600 hover:text-blue-700 transition"
              >
                {t("navbar.notices")}
              </a>


              {/* Login */}
              <Link
                to="/login"
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold px-5 py-3 rounded-lg transition shadow-sm"
              >
                <LogIn size={18} />

                {t("navbar.login")}
              </Link>

            </div>


            {/* ================= MOBILE MENU BUTTON ================= */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>


          {/* ================= MOBILE NAVIGATION ================= */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-slate-400 py-4">

              <div className="flex flex-col gap-1">

                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-blue-100 text-lg text-blue-700"
                        : "text-slate-800 hover:bg-slate-200"
                    }`
                  }
                >
                  {t("navbar.home")}
                </NavLink>


                <a
                  href="/#services"
                  onClick={closeMenu}
                  className="px-4 py-3 text-lg rounded-lg text-slate-600 hover:bg-slate-200 transition"
                >
                  {t("navbar.services")}
                </a>


                <Link
                  to="/track"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition"
                >
                  <Search size={17} />

                  {t("navbar.trackApplication")}
                </Link>


                <Link
                  to="/verify"
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-200 transition"
                >
                  <ShieldCheck size={17} />

                  {t("navbar.verifyCertificate")}
                </Link>


                <a
                  href="/#notices"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-slate-600 text-lg hover:bg-slate-200 transition"
                >
                  {t("navbar.notices")}
                </a>


                {/* Mobile Language Switcher */}
                <div className="flex gap-3 px-4 py-3 mt-2">

                  <button
                    onClick={() => changeLanguage("ne")}
                    className={`px-3 py-1.5 rounded-md text-base transition ${
                      i18n.language === "ne"
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    नेपाली
                  </button>

                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-3 py-1.5 rounded-md text-base transition ${
                      i18n.language === "en"
                        ? "bg-blue-100 text-blue-700 font-ibold"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    English
                  </button>

                </div>


                {/* Login */}
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="mt-3 flex text-lg items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-3 rounded-lg transition"
                >
                  <LogIn size={18} />

                  {t("navbar.loginNow")}
                </Link>

              </div>

            </div>
          )}

        </div>

      </nav>
    </>
  );
}

export default Navbar;