import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Mail, Briefcase, Calendar, Pencil } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/admin";

const StaffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${
          token || localStorage.getItem("sifarish_token")
        }`,
      },
    })
      .then((res) => res.json().then((data) => ({ res, data })))
      .then(({ res, data }) => {
        if (!res.ok) throw new Error(data.message);
        setStaff(data.staff);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) {
    return <div className="p-8 text-center">{t("staffDetails.loading")}</div>;
  }

  if (error || !staff) {
    return (
      <div className="p-8 text-center text-red-600">
        {error || t("staffDetails.notFound")}
      </div>
    );
  }

  const details = [
    [Mail, t("staffDetails.email"), staff.email],
    [
      Briefcase,
      t("staffDetails.role"),
      t(`staffManagement.roles.${staff.role}`),
    ],
    [
      Calendar,
      t("staffDetails.joined"),
      new Date(staff.createdAt).toLocaleDateString(),
    ],
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/admin/staff")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-950"
      >
        <ArrowLeft size={18} />
        {t("staffDetails.back")}
      </button>

      {/* Profile */}
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-8 text-white">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-950">
              {staff.name?.[0]?.toUpperCase()}
            </div>

            <div>
              <p className="text-sm text-blue-200">
                {t("staffDetails.staffProfile")}
              </p>

              <h1 className="text-2xl font-bold">{staff.name}</h1>

              <p className="mt-1 text-blue-100">{staff.email}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1 p-6">
          {details.map(([Icon, label, value]) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-xl p-4 hover:bg-slate-50"
            >
              <div className="rounded-lg bg-blue-50 p-3 text-blue-900">
                <Icon size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-semibold text-blue-950">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-5">
          <button
            onClick={() => navigate(`/admin/staff/edit/${staff._id}`)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-950 py-3 font-semibold text-white hover:bg-blue-900"
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