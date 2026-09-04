import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-950 text-slate-300 border-t-4 border-red-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg"
                alt="Emblem"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-white font-bold text-sm">
                  {t("footer.aboutTitle")}
                </h3>
                <p className="text-xs text-red-400 font-semibold">
                  {t("footer.aboutSub")}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("footer.aboutDesc")}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-blue-900 pb-2">
              {t("footer.contactTitle")}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span>{t("footer.phone")}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span>{t("footer.email")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{t("footer.hours")}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-blue-900 pb-2">
              {t("footer.linksTitle")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  {t("footer.sifarishServices")}
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  {t("footer.trackApp")}
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-white transition flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  {t("footer.qrVerify")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-red-400" />
                  {t("footer.citizenCharter")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Grievances */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-b border-blue-900 pb-2">
              {t("footer.grievanceTitle")}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("footer.grievanceDesc")}
            </p>
            <div className="bg-blue-900/60 border border-blue-800 p-3 rounded-lg text-xs space-y-1">
              <p className="text-white font-semibold">सूचना अधिकारी (Information Officer)</p>
              <p className="text-slate-300">फोन: ९८४३२३१२३४</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">{t("footer.privacy")}</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;