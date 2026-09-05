import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  FolderOpen,
  Receipt,
  Home,
  LogOut,
  X,
  ShieldCheck,
  UserRound,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../context/AuthContext";

const CitizenSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "ne" ? "en" : "ne");
  };

  const mainMenu = [
    {
      name: t("citizenSidebar.dashboard"),
      path: "/citizen",
      icon: LayoutDashboard,
    },
    {
      name: t("citizenSidebar.newApplication"),
      path: "/citizen/apply",
      icon: PlusCircle,
    },
    {
      name: t("citizenSidebar.myApplications"),
      path: "/citizen/applications",
      icon: FileText,
    },
  
    {
      name: t("citizenSidebar.documents"),
      path: "/citizen/apply/documents",
      icon: FolderOpen,
    },
    {
      name: t("citizenSidebar.paymentVoucher"),
      path: "/citizen/payments",
      icon: Receipt,
    },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        end
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive
              ? "bg-red-600 text-white shadow-sm"
              : "text-blue-100 hover:bg-blue-900 hover:text-white"
          }`
        }
      >
        <Icon size={19} strokeWidth={1.8} />
        <span>{item.name}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[270px]
          bg-blue-950 text-white flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <ShieldCheck
                size={23}
                className="text-blue-950"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold">
                E-Ward Sifarish
              </h1>

              <p className="text-[11px] text-blue-300">
                {t("citizenSidebar.servicePortal")}
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-300 hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Citizen Account */}
        <div className="px-4 py-4 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800">
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user?.name || t("citizenSidebar.citizen")}
              </p>

              <p className="text-xs text-blue-300">
                {t("citizenSidebar.citizenAccount")}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-2 mb-3 text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            {t("citizenSidebar.mainMenu")}
          </p>

          <div className="space-y-1.5">
            {mainMenu.map((item) => (
              <NavItem
                key={`${item.name}-${item.path}`}
                item={item}
              />
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-4 border-t border-blue-900 space-y-1.5">

          {/* Public Home */}
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-900 hover:text-white"
          >
            <Home size={19} strokeWidth={1.8} />
            <span>{t("citizenSidebar.publicHome")}</span>
          </button>

          {/* Language */}
          <button
            onClick={changeLanguage}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-blue-100 transition hover:bg-blue-900 hover:text-white"
          >
            <Globe size={19} strokeWidth={1.8} />

            <span>
              {i18n.language === "ne" ? "English" : "नेपाली"}
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={19} strokeWidth={1.8} />
            <span>{t("citizenSidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default CitizenSidebar;