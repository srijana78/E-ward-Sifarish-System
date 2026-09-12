import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Users,
  CheckCircle2,
  Clock3,
  UserPlus,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const APP_API = "http://localhost:5000/api/applications";
const ADMIN_API = "http://localhost:5000/api/admin";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [stats, setStats] = useState({});
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const authToken =
          token || localStorage.getItem("sifarish_token");

        const headers = {
          Authorization: `Bearer ${authToken}`,
        };

        const [statsRes, staffRes] = await Promise.all([
          fetch(`${APP_API}/reports/statistics`, { headers }),
          fetch(`${ADMIN_API}/staff`, { headers }),
        ]);

        const statsData = await statsRes.json();
        const staffData = await staffRes.json();

        if (!statsRes.ok)
          throw new Error(
            statsData.message || "Failed to load statistics"
          );

        if (!staffRes.ok)
          throw new Error(
            staffData.message || "Failed to load staff"
          );

        setStats(statsData.statistics || {});
        setStaff(staffData.staff || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const cards = [
    [
      "totalApplications",
      stats.totalApplications || 0,
      FileText,
    ],
    [
      "pendingApplications",
      stats.pendingApplications || 0,
      Clock3,
    ],
    [
      "approvedApplications",
      stats.approvedApplications || 0,
      CheckCircle2,
    ],
    ["totalStaff", staff.length, Users],
  ];

  const actions = [
    [
      "manageStaff",
      "manageStaffDescription",
      Users,
      "/admin/staff",
    ],
    [
      "createStaff",
      "createStaffDescription",
      UserPlus,
      "/admin/create-staff",
    ],
  ];

  return (
    <div className="space-y-8">

      {/* WELCOME */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-7 text-white sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold text-red-300">
              {t("adminDashboard.label")}
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              {t("adminDashboard.title")}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
              {t("adminDashboard.description")}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/create-staff")}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
          >
            <UserPlus size={18} />
            {t("adminDashboard.createStaff")}
          </button>

        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-600">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* STATISTICS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, Icon]) => (
          <StatCard
            key={title}
            title={t(`adminDashboard.${title}`)}
            value={loading ? "..." : value}
            icon={Icon}
          />
        ))}
      </section>

      {/* QUICK ACTIONS */}
      <section>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-blue-950">
            {t("adminDashboard.quickActions")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("adminDashboard.quickActionsDescription")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {actions.map(([title, description, Icon, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                  <Icon size={23} />
                </div>

                <ArrowRight
                  size={21}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                />

              </div>

              <h3 className="mt-6 text-lg font-bold text-blue-950">
                {t(`adminDashboard.${title}`)}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {t(`adminDashboard.${description}`)}
              </p>

            </button>
          ))}

        </div>
      </section>

      {/* RECENT STAFF */}
      <section className="rounded-2xl bg-white shadow-sm">

        <div className="flex items-center justify-between p-6">

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("adminDashboard.recentStaff")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("adminDashboard.recentStaffDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/staff")}
            className="text-sm font-semibold text-blue-900 hover:text-red-600"
          >
            {t("adminDashboard.viewAll")}
          </button>

        </div>

        <div className="divide-y divide-slate-100">

          {loading ? (
            <Empty text={t("adminDashboard.loading")} />
          ) : staff.length ? (

            staff.slice(0, 5).map((member) => (
              <div
                key={member._id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-950 font-bold text-white">
                  {member.name?.[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">

                  <p className="font-semibold text-blue-950">
                    {member.name}
                  </p>

                  <p className="truncate text-sm text-slate-500">
                    {member.email}
                  </p>

                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {t(`staffManagement.roles.${member.role}`)}
                </span>
              </div>
            ))

          ) : (
            <Empty text={t("adminDashboard.noStaff")} />
          )}

        </div>
      </section>

    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm">

    <div className="flex items-center justify-between">

      <div>
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-3 text-3xl font-bold text-blue-950">
          {value}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-4 text-blue-950">
        <Icon size={22} />
      </div>

    </div>
  </div>
);

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default AdminDashboard;