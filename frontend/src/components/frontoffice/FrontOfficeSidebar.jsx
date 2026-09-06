import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Clock3,
  CheckCircle2,
  Bell,
  BarChart3,
  Settings,
  Home,
  LogOut,
  X,
  ShieldCheck,
  UserRound,
  Globe,
} from "lucide-react";

const FrontOfficeSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");

    onClose?.();
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "ne" ? "en" : "ne");
  };

  const menuItems = [
    {
      name: t("frontOfficeSidebar.dashboard"),
      path: "/frontoffice",
      icon: LayoutDashboard,
      end: true,
    },

    {
      name: t("frontOfficeSidebar.pendingApplications"),
      path: "/frontoffice/pending",
      icon: Clock3,
    },

    {
      name: t("frontOfficeSidebar.verifiedApplications"),
      path: "/frontoffice/verified",
      icon: CheckCircle2,
    },

    {
      name: t("frontOfficeSidebar.notifications"),
      path: "/frontoffice/notifications",
      icon: Bell,
    },

    {
      name: t("frontOfficeSidebar.reports"),
      path: "/frontoffice/reports",
      icon: BarChart3,
    },

    {
      name: t("frontOfficeSidebar.settings"),
      path: "/frontoffice/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-blue-950 text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}

        <div className="flex h-[82px] items-center justify-between border-b border-blue-900 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-base font-bold tracking-wide">
                E-WARD SIFARISH
              </h1>

              <p className="text-[11px] text-blue-200">
                {t("frontOfficeSidebar.portal")}
              </p>
            </div>
          </div>

          {/* Mobile Close */}

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-blue-200 transition hover:bg-blue-900 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        {/* Staff Profile */}

        <div className="mx-4 mt-5 rounded-xl border border-blue-900 bg-blue-900/50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-950">
              <UserRound size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || t("frontOfficeSidebar.staff")}
              </p>

              <p className="text-xs text-blue-200">
                {t("frontOfficeSidebar.account")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
            {t("frontOfficeSidebar.mainMenu")}
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "text-slate-300 hover:bg-blue-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}

        <div className="border-t border-blue-900 p-4 space-y-1.5">
          
          {/* Public Home */}

          <button
            onClick={() => {
              navigate("/");
              onClose?.();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-blue-900 hover:text-white"
          >
            <Home size={18} />

            <span>{t("frontOfficeSidebar.publicHome")}</span>
          </button>

          {/* Language */}

          <button
            onClick={changeLanguage}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-blue-900 hover:text-white"
          >
            <Globe size={18} />

            <span>
              {i18n.language === "ne" ? "English" : "नेपाली"}
            </span>
          </button>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />

            <span>{t("frontOfficeSidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default FrontOfficeSidebar;