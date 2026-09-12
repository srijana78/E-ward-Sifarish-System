import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
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

      <main className="lg:ml-[270px]">
        <header className="flex items-center gap-4 border-b bg-white p-4 lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="font-bold text-blue-950">
              E-WARD SIFARISH
            </h1>

            <p className="text-xs text-slate-500">
              {t("secretarySidebar.portal")}
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

export default SecretaryLayout;