
import React from "react";
import {
  Users,
  Building2,
  ClipboardCheck,
  Landmark,
  Mail,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const StaffManagement = () => {
  // Temporary UI data
  const staff = [
    {
      id: 1,
      name: "Ram Sharma",
      email: "ram@eward.gov.np",
      role: "frontoffice",
    },
    {
      id: 2,
      name: "Sita Thapa",
      email: "sita@eward.gov.np",
      role: "secretary",
    },
    {
      id: 3,
      name: "Hari Bhandari",
      email: "hari@eward.gov.np",
      role: "chairperson",
    },
  ];

  const getRoleInfo = (role) => {
    switch (role) {
      case "frontoffice":
        return {
          label: "Front Office",
          icon: Building2,
          color: "bg-blue-50 text-blue-700",
        };

      case "secretary":
        return {
          label: "Ward Secretary",
          icon: ClipboardCheck,
          color: "bg-purple-50 text-purple-700",
        };

      case "chairperson":
        return {
          label: "Ward Chairperson",
          icon: Landmark,
          color: "bg-orange-50 text-orange-700",
        };

      default:
        return {
          label: role,
          icon: Users,
          color: "bg-slate-100 text-slate-700",
        };
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-blue-950">
            Staff Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage government staff accounts and their roles.
          </p>
        </div>

        <Link
          to="/admin/create-staff"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-950"
        >
          <UserPlus size={18} />
          Create Staff
        </Link>
      </div>

      {/* STATS */}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Staff
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-950">
            {staff.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Front Office
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-950">
            {staff.filter(
              (person) => person.role === "frontoffice"
            ).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Administrative Staff
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-950">
            {staff.filter(
              (person) =>
                person.role === "secretary" ||
                person.role === "chairperson"
            ).length}
          </h2>
        </div>
      </div>

      {/* STAFF LIST */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
              <Users size={22} />
            </div>

            <div>
              <h2 className="font-bold text-blue-950">
                Government Staff
              </h2>

              <p className="text-sm text-slate-500">
                All registered staff accounts
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {staff.map((member) => {
            const roleInfo = getRoleInfo(member.role);
            const RoleIcon = roleInfo.icon;

            return (
              <div
                key={member.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${roleInfo.color}`}
                  >
                    <RoleIcon size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-950">
                      {member.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <Mail size={14} />

                      {member.email}
                    </div>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${roleInfo.color}`}
                >
                  {roleInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
