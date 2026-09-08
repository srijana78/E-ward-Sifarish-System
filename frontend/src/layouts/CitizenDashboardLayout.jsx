import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

import CitizenSidebar from "../components/citizen/CitizenSidebar";

const CitizenDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Citizen Sidebar */}
      <CitizenSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Area */}
      <div className="lg:pl-[270px]">
        
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
          
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600 text-white">
              <span className="text-sm font-bold">E</span>
            </div>

            <span className="text-sm font-bold text-blue-950">
              {t("citizenLayout.portalName")}
            </span>
          </div>

          <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden h-[82px] items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm lg:flex">
          
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {t("citizenLayout.governmentPortal")}
            </p>

            <h2 className="mt-1 text-lg font-bold text-blue-950">
              {t("citizenLayout.citizenServices")}
            </h2>
          </div>

          <button className="relative rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
          </button>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-82px)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default CitizenDashboardLayout;