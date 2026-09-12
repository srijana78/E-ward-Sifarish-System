import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  XCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

const ChairpersonSidebar = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    {
      name: "dashboard",
      icon: LayoutDashboard,
      path: "/chairperson",
    },
    {
      name: "applications",
      icon: FileText,
      path: "/chairperson/applications",
    },
    {
      name: "approved",
      icon: CheckCircle2,
      path: "/chairperson/approved",
    },
    {
      name: "rejected",
      icon: XCircle,
      path: "/chairperson/rejected",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <>
      {/* LOGO */}
      <div className="flex h-20 items-center justify-between border-b border-slate-800 px-5">
        <NavLink
          to="/chairperson"
          className="text-lg font-bold text-white"
        >
          {t("chairpersonSidebar.title")}
        </NavLink>

        <button
          onClick={() => setOpen(false)}
          className="lg:hidden text-slate-300"
        >
          <X size={22} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2 p-4">
        {links.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            onClick={() => setOpen(false)}
            end={path === "/chairperson"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            {t(`chairpersonSidebar.${name}`)}
          </NavLink>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={20} />
          {t("chairpersonSidebar.logout")}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg bg-blue-950 p-2 text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-blue-950 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default ChairpersonSidebar;