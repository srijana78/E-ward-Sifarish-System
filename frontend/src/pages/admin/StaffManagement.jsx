import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  RefreshCw,
  Eye,
  Pencil,
  UserX,
  UserCheck,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/admin`;

const StaffManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const authToken =
        token ||
        localStorage.getItem("sifarish_token") ||
        localStorage.getItem("token");

      const res = await fetch(`${API}/staff`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || t("staffManagement.loadError")
        );
      }

      setStaff(data.staff || []);
    } catch (err) {
      console.error("Staff loading error:", err);
      setError(err.message || t("staffManagement.loadError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [token]);

  const handleStatusChange = async (member) => {
    const isActive = member.isActive !== false;

    const confirmed = window.confirm(
      isActive
        ? t("staffManagement.confirmDeactivate")
        : t("staffManagement.confirmActivate")
    );

    if (!confirmed) return;

    try {
      setStatusLoading(member._id);
      setError("");
      setMessage("");

      const authToken =
        token ||
        localStorage.getItem("sifarish_token") ||
        localStorage.getItem("token");

      const endpoint = isActive
        ? `${API}/staff/${member._id}/deactivate`
        : `${API}/staff/${member._id}/activate`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || t("staffManagement.statusError")
        );
      }

      setMessage(
        data.message ||
          (isActive
            ? t("staffManagement.deactivated")
            : t("staffManagement.activated"))
      );

      await fetchStaff();
    } catch (err) {
      console.error("Staff status error:", err);
      setError(
        err.message || t("staffManagement.statusError")
      );
    } finally {
      setStatusLoading("");
    }
  };

  const filteredStaff = staff.filter((member) => {
    const searchText = search.toLowerCase();

    return [member.name, member.email, member.role].some((item) =>
      item?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-5 rounded-2xl bg-blue-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm font-semibold text-red-300">
            {t("staffManagement.label")}
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            {t("staffManagement.title")}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-blue-200">
            {t("staffManagement.description")}
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/create-staff")}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold transition hover:bg-red-700"
        >
          <UserPlus size={18} />
          {t("staffManagement.addStaff")}
        </button>
      </section>

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("staffManagement.staffList")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {staff.length} {t("staffManagement.totalStaff")}
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("staffManagement.search")}
                className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-900/20 sm:w-64"
              />
            </div>

            <button
              onClick={fetchStaff}
              disabled={loading}
              className="rounded-xl bg-slate-100 p-3 text-blue-950 transition hover:bg-slate-200 disabled:opacity-50"
              title={t("staffManagement.refresh")}
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            <Empty text={t("staffManagement.loading")} />
          ) : filteredStaff.length === 0 ? (
            <Empty text={t("staffManagement.noStaff")} />
          ) : (
            filteredStaff.map((member) => {
              const isActive = member.isActive !== false;
              const isChanging = statusLoading === member._id;

              return (
                <div
                  key={member._id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-950 font-bold text-white">
                    {member.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-blue-950">
                        {member.name}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isActive
                          ? t("staffManagement.active")
                          : t("staffManagement.inactive")}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {member.email}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {t(`staffManagement.roles.${member.role}`)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/staff/${member._id}`)
                      }
                      className="rounded-lg bg-blue-50 p-2.5 text-blue-900 transition hover:bg-blue-100"
                      title={t("staffManagement.view")}
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/admin/staff/edit/${member._id}`)
                      }
                      className="rounded-lg bg-amber-50 p-2.5 text-amber-600 transition hover:bg-amber-100"
                      title={t("staffManagement.edit")}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(member)
                      }
                      disabled={isChanging}
                      className={`rounded-lg p-2.5 transition disabled:opacity-50 ${
                        isActive
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                      }`}
                      title={
                        isActive
                          ? t("staffManagement.deactivate")
                          : t("staffManagement.activate")
                      }
                    >
                      {isActive ? (
                        <UserX
                          size={18}
                          className={
                            isChanging
                              ? "animate-pulse"
                              : ""
                          }
                        />
                      ) : (
                        <UserCheck
                          size={18}
                          className={
                            isChanging
                              ? "animate-pulse"
                              : ""
                          }
                        />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="p-12 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default StaffManagement;