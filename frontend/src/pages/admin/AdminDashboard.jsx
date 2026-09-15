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

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [stats, setStats] = useState({});
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const authToken =
          token ||
          localStorage.getItem("sifarish_token") ||
          localStorage.getItem("token");

        const headers = {
          ...(authToken && {
            Authorization: `Bearer ${authToken}`,
          }),
        };

        const [statsRes, staffRes] = await Promise.all([
          fetch(`${API_URL}/api/applications/reports/statistics`, {
            headers,
          }),
          fetch(`${API_URL}/api/admin/staff`, {
            headers,
          }),
        ]);

        const statsData = await statsRes.json();
        const staffData = await staffRes.json();

        if (!statsRes.ok) {
          throw new Error(statsData.message || "Failed to load statistics");
        }

        if (!staffRes.ok) {
          throw new Error(staffData.message || "Failed to load staff");
        }

        setStats(statsData.statistics || {});
        setStaff(staffData.staff || []);
      } catch (err) {
        console.error("Admin dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  const statCards = [
    ["totalApplications", stats.totalApplications || 0, FileText],
    ["pendingApplications", stats.pendingApplications || 0, Clock3],
    ["approvedApplications", stats.approvedApplications || 0, CheckCircle2],
    ["totalStaff", staff.length, Users],
  ];

  const actions = [
    ["manageStaff", "manageStaffDescription", Users, "/admin/staff"],
    ["createStaff", "createStaffDescription", UserPlus, "/admin/create-staff"],
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-7 text-white sm:p-10">
        <p className="text-sm font-semibold text-red-300">
          {t("adminDashboard.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {t("adminDashboard.title")}
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
          {t("adminDashboard.description")}
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-600">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([title, value, Icon]) => (
          <StatCard
            key={title}
            title={t(`adminDashboard.${title}`)}
            value={loading ? "..." : value}
            Icon={Icon}
          />
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-blue-950">
          {t("adminDashboard.quickActions")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("adminDashboard.quickActionsDescription")}
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {actions.map(([title, description, Icon, path]) => (
            <button
              key={title}
              onClick={() => navigate(path)}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                  <Icon size={23} />
                </div>

                <ArrowRight
                  size={21}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-blue-950">
                {t(`adminDashboard.${title}`)}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {t(`adminDashboard.${description}`)}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("adminDashboard.staffAccounts")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("adminDashboard.staffAccountsDescription")}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/staff")}
            className="text-sm font-semibold text-blue-900 hover:text-red-600"
          >
            {t("adminDashboard.viewAll")}
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {loading ? (
            <p className="py-6 text-center text-sm text-slate-500">
              {t("adminDashboard.loading")}
            </p>
          ) : staff.length ? (
            staff.map((member) => (
              <div
                key={member._id}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-950 font-bold text-white">
                  {member.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
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
            <p className="py-6 text-center text-sm text-slate-500">
              {t("adminDashboard.noStaff")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ title, value, Icon }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="mt-3 text-3xl font-bold text-blue-950">{value}</p>
      </div>

      <div className="rounded-2xl bg-slate-100 p-4 text-blue-950">
        <Icon size={22} />
      </div>
    </div>
  </div>
);

export default AdminDashboard;