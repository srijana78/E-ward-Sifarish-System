import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  RefreshCw,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/admin";

const StaffManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/staff`, {
        headers: {
          Authorization: `Bearer ${
            token || localStorage.getItem("sifarish_token")
          }`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStaff(data.staff || []);
    } catch (err) {
      setError(err.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [token]);

  const filteredStaff = staff.filter((member) =>
    [member.name, member.email, member.role].some((item) =>
      item?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-4 rounded-2xl bg-blue-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-red-300">
            {t("staffManagement.label")}
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            {t("staffManagement.title")}
          </h1>

          <p className="mt-2 text-sm text-blue-200">
            {t("staffManagement.description")}
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/create-staff")}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold hover:bg-red-700"
        >
          <UserPlus size={18} />
          {t("staffManagement.addStaff")}
        </button>
      </section>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-600">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Staff List */}
      <section className="rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-blue-950">
              {t("staffManagement.staffList")}
            </h2>

            <p className="text-sm text-slate-500">
              {staff.length} {t("staffManagement.totalStaff")}
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("staffManagement.search")}
                className="w-full rounded-lg bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none sm:w-64"
              />
            </div>

            <button
              onClick={fetchStaff}
              className="rounded-lg bg-slate-100 p-3 text-blue-950 hover:bg-slate-200"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="divide-y">
          {loading ? (
            <Empty text={t("staffManagement.loading")} />
          ) : filteredStaff.length === 0 ? (
            <Empty text={t("staffManagement.noStaff")} />
          ) : (
            filteredStaff.map((member) => (
              <div
                key={member._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-950 font-bold text-white">
                  {member.name?.[0]?.toUpperCase()}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-blue-950">
                    {member.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {member.email}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {t(`staffManagement.roles.${member.role}`)}
                </span>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/staff/${member._id}`)
                    }
                    className="rounded-lg bg-blue-50 p-2 text-blue-900 hover:bg-blue-100"
                    title={t("staffManagement.view")}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/staff/edit/${member._id}`)
                    }
                    className="rounded-lg bg-amber-50 p-2 text-amber-600 hover:bg-amber-100"
                    title={t("staffManagement.edit")}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    title={t("staffManagement.delete")}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const Empty = ({ text }) => (
  <div className="p-10 text-center text-sm text-slate-500">
    {text}
  </div>
);

export default StaffManagement;