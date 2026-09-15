import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import SecretarySidebar from "../components/secretary/SecretarySidebar";

const SecretaryLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50">
      <SecretarySidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <main className="lg:ml-[260px]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-blue-950">
                {t("secretarySidebar.secretary")}
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                {t("secretarySidebar.portal")}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2.5 text-slate-600 transition hover:bg-slate-100">
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SecretaryLayout;