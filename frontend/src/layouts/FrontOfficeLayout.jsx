import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

import FrontOfficeSidebar from "../components/frontoffice/FrontOfficeSidebar";

const FrontOfficeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openNotifications = () => {
    navigate("/frontoffice/notifications");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <FrontOfficeSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-[270px]">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label={t("frontOfficeLayout.openMenu")}
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white">
              <span className="text-sm font-bold">E</span>
            </div>

            <span className="text-sm font-bold text-blue-950">
              {t("frontOfficeLayout.eWardSifarish")}
            </span>
          </div>

          <NotificationButton
            onClick={openNotifications}
            label={t("frontOfficeLayout.notifications")}
          />
        </header>

        {/* Desktop Header */}
        <header className="sticky top-0 z-30 hidden h-[82px] items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm lg:flex">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {t("frontOfficeLayout.portal")}
            </p>

            <h2 className="mt-1 text-lg font-bold text-blue-950">
              {t("frontOfficeLayout.applicationManagement")}
            </h2>
          </div>

          <NotificationButton
            onClick={openNotifications}
            label={t("frontOfficeLayout.notifications")}
          />
        </header>

        <main className="min-h-[calc(100vh-82px)] px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NotificationButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    className="relative rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-900"
  >
    <Bell size={19} />

    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
  </button>
);

export default FrontOfficeLayout;