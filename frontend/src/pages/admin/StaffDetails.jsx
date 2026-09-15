import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Calendar,
  Pencil,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/admin`;

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        setError("");

        const authToken =
          token ||
          localStorage.getItem("sifarish_token") ||
          localStorage.getItem("token");

        const res = await fetch(`${API}/staff/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.message || t("staffDetails.loadError")
          );
        }

        setStaff(data.staff);
      } catch (err) {
        console.error("Staff details error:", err);
        setError(err.message || t("staffDetails.loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id, token, t]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          {t("staffDetails.loading")}
        </p>
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center">
        <AlertCircle className="mx-auto text-red-500" size={28} />

        <p className="mt-3 text-sm font-medium text-red-600">
          {error || t("staffDetails.notFound")}
        </p>

        <button
          onClick={() => navigate("/admin/staff")}
          className="mt-5 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
        >
          {t("staffDetails.back")}
        </button>
      </div>
    );
  }

  const details = [
    {
      icon: Mail,
      label: t("staffDetails.email"),
      value: staff.email,
    },
    {
      icon: Briefcase,
      label: t("staffDetails.role"),
      value: t(`staffManagement.roles.${staff.role}`),
    },
    {
      icon: Calendar,
      label: t("staffDetails.joined"),
      value: staff.createdAt
        ? new Date(staff.createdAt).toLocaleDateString()
        : "-",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/staff")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-950"
      >
        <ArrowLeft size={18} />
        {t("staffDetails.back")}
      </button>

      {/* Profile */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {/* Profile Header */}
        <div className="bg-blue-950 p-7 text-white sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-950">
              {staff.name?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <div>
              <p className="text-sm font-semibold text-red-300">
                {t("staffDetails.staffProfile")}
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                {staff.name}
              </h1>

              <p className="mt-1 text-sm text-blue-200">
                {staff.email}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 p-5 sm:p-6">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
            >
              <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">
                  {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-blue-950">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Edit */}
        <div className="border-t border-slate-100 p-5 sm:p-6">
          <button
            onClick={() =>
              navigate(`/admin/staff/edit/${staff._id}`)
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-950 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            <Pencil size={18} />
            {t("staffDetails.editStaff")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default StaffDetails;