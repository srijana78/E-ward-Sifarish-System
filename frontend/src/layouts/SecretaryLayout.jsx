import React, { useState } from "react";

import {
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardCheck,
  Menu,
  X,
  LogOut,
  Building2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const SecretaryLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/secretary",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Verified Applications",
      path: "/secretary/applications",
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= MOBILE HEADER ================= */}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">

          <div className="rounded-lg bg-blue-900 p-2 text-white">
            <Building2 size={18} />
          </div>

          <span className="font-bold text-blue-950">
            Secretary Portal
          </span>

        </div>

        <div className="w-10" />

      </header>

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-blue-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* Logo */}

        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-600 p-2.5">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="font-bold">
                E-Ward Sifarish
              </h2>

              <p className="text-xs text-blue-200">
                Secretary Portal
              </p>
            </div>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-blue-200 hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 px-4 py-6">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-blue-950 shadow-sm"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />

                {item.name}
              </NavLink>
            );
          })}

        </nav>

        {/* User + Logout */}

        <div className="border-t border-white/10 p-4">

          <div className="mb-3 rounded-xl bg-white/10 p-3">

            <p className="truncate text-sm font-semibold">
              {user?.name || "Ward Secretary"}
            </p>

            <p className="mt-1 text-xs text-blue-200">
              Ward Secretary
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20 hover:text-white"
          >
            <LogOut size={19} />

            Logout
          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="min-h-screen lg:ml-72">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
};

export default SecretaryLayout;