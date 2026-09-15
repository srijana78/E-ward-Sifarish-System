import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <main className="lg:ml-[270px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
          <button
            onClick={() => setIsOpen(true)}
            className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label={t("adminLayout.openMenu")}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-blue-950">
              {t("adminLayout.title")}
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              {t("adminLayout.subtitle")}
            </p>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;