import React from "react";

import {
  Users,
  Building2,
  ClipboardCheck,
  Landmark,
  FileText,
  Clock,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Staff",
      value: "12",
      icon: Users,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      title: "Front Office",
      value: "5",
      icon: Building2,
      bg: "bg-indigo-50",
      color: "text-indigo-700",
    },
    {
      title: "Ward Secretaries",
      value: "4",
      icon: ClipboardCheck,
      bg: "bg-emerald-50",
      color: "text-emerald-700",
    },
    {
      title: "Chairpersons",
      value: "3",
      icon: Landmark,
      bg: "bg-orange-50",
      color: "text-orange-700",
    },
  ];

  const activities = [
    {
      title: "New citizen registration",
      description: "A new citizen account was created.",
      time: "10 minutes ago",
      icon: UserPlus,
    },
    {
      title: "Application verified",
      description: "A Front Office staff verified an application.",
      time: "35 minutes ago",
      icon: CheckCircle2,
    },
    {
      title: "New application submitted",
      description: "A citizen submitted a new recommendation request.",
      time: "1 hour ago",
      icon: FileText,
    },
  ];

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-blue-950 sm:text-4xl">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Overview of your E-Ward Sifarish System.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-blue-950">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`rounded-xl p-3 ${item.bg} ${item.color}`}
                >
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {/* SYSTEM OVERVIEW */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                System Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current application statistics
              </p>
            </div>

            <FileText className="text-blue-900" size={24} />

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-yellow-50 p-4">
              <Clock className="text-yellow-600" size={22} />

              <p className="mt-4 text-2xl font-bold text-slate-800">
                24
              </p>

              <p className="text-sm text-slate-500">
                Pending Applications
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <FileText className="text-blue-700" size={22} />

              <p className="mt-4 text-2xl font-bold text-slate-800">
                156
              </p>

              <p className="text-sm text-slate-500">
                Total Applications
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <CheckCircle2 className="text-green-600" size={22} />

              <p className="mt-4 text-2xl font-bold text-slate-800">
                132
              </p>

              <p className="text-sm text-slate-500">
                Completed Applications
              </p>
            </div>

          </div>

        </div>

        {/* QUICK ACTION */}
        <div className="rounded-2xl bg-blue-950 p-6 text-white shadow-sm">

          <UserPlus size={28} className="text-red-400" />

          <h2 className="mt-5 text-xl font-bold">
            Staff Management
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-200">
            Create and manage government staff accounts for the ward system.
          </p>

          <Link
            to="/admin/create-staff"
            className="mt-6 inline-flex items-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Create Staff Account
          </Link>

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-blue-950">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activities in the system
          </p>
        </div>

        <div className="divide-y divide-slate-100">

          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.title}
                className="flex gap-4 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-900">
                  <Icon size={20} />
                </div>

                <div className="flex-1">

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                    <h3 className="font-semibold text-slate-800">
                      {activity.title}
                    </h3>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;