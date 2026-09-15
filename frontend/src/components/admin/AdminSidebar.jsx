import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Home,
  LogOut,
  X,
  ShieldCheck,
  UserRound,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "ne" ? "en" : "ne");
  };

  const menu = [
    {
      name: t("adminSidebar.dashboard"),
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: t("adminSidebar.staffManagement"),
      path: "/admin/staff",
      icon: Users,
    },
    {
      name: t("adminSidebar.createStaff"),
      path: "/admin/create-staff",
      icon: UserPlus,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col
          bg-blue-950 text-white transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <ShieldCheck size={23} className="text-blue-950" />
            </div>

            <div>
              <h1 className="text-sm font-bold">E-Ward Sifarish</h1>
              <p className="text-[11px] text-blue-300">
                {t("adminSidebar.adminPortal")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Admin */}
        <div className="border-b border-blue-900 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-800">
              <UserRound size={18} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user?.name || t("adminSidebar.admin")}
              </p>
              <p className="text-xs text-blue-300">
                {t("adminSidebar.administrator")}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-5">
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            {t("adminSidebar.mainMenu")}
          </p>

          <div className="space-y-1.5">
            {menu.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-blue-100 hover:bg-blue-900 hover:text-white"
                  }`
                }
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="space-y-1.5 border-t border-blue-900 px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-blue-100 hover:bg-blue-900 hover:text-white"
          >
            <Home size={19} />
            <span>{t("adminSidebar.publicHome")}</span>
          </button>

          <button
            onClick={changeLanguage}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-blue-100 hover:bg-blue-900 hover:text-white"
          >
            <Globe size={19} />
            <span>{i18n.language === "ne" ? "English" : "नेपाली"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={19} />
            <span>{t("adminSidebar.logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;