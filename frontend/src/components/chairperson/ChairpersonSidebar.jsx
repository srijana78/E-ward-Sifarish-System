import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  ClipboardList,
  Home,
  LogOut,
  X,
  ShieldCheck,
  UserRound,
  Globe,
} from "lucide-react";

const ChairpersonSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "dashboard",
      path: "/chairperson",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "applications",
      path: "/chairperson/applications",
      icon: ClipboardList,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose?.();
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "ne" ? "en" : "ne");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-blue-950 text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-[82px] items-center justify-between border-b border-blue-900 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-base font-bold">
                E-WARD SIFARISH
              </h1>

              <p className="text-[11px] text-blue-200">
                {t("chairpersonSidebar.portal")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-blue-200 hover:bg-blue-900 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Profile */}
        <div className="mx-4 mt-5 rounded-xl border border-blue-900 bg-blue-900/50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-950">
              <UserRound size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user?.name || t("chairpersonSidebar.chairperson")}
              </p>

              <p className="text-xs text-blue-200">
                {t("chairpersonSidebar.account")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-blue-300">
            {t("chairpersonSidebar.mainMenu")}
          </p>

          <nav className="space-y-1">
            {menuItems.map(({ name, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-blue-900 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {t(`chairpersonSidebar.${name}`)}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="space-y-1.5 border-t border-blue-900 p-4">
          <button
            onClick={() => {
              navigate("/");
              onClose?.();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-blue-900"
          >
            <Home size={18} />
            {t("chairpersonSidebar.publicHome")}
          </button>

          <button
            onClick={changeLanguage}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-blue-900"
          >
            <Globe size={18} />
            {i18n.language === "ne" ? "English" : "नेपाली"}
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-300 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />
            {t("chairpersonSidebar.logout")}
          </button>
        </div>
      </aside>
    </>
  );
};

export default ChairpersonSidebar;