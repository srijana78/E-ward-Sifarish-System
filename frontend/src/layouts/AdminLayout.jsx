import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-30 rounded-lg bg-blue-950 p-2.5 text-white shadow-lg lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Main Content */}
      <main className="min-h-screen p-4 pt-20 lg:ml-[270px] lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;