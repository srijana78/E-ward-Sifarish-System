import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle2,
  MonitorCog,
  FileCheck,
  Landmark,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = `${import.meta.env.VITE_API_URL}/api/admin`;

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "frontoffice",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const roles = [
    ["frontoffice", MonitorCog],
    ["secretary", FileCheck],
    ["chairperson", Landmark],
  ];

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
            data.message || t("editStaff.loadError")
          );
        }

        setForm({
          name: data.staff?.name || "",
          email: data.staff?.email || "",
          password: "",
          role: data.staff?.role || "frontoffice",
        });
      } catch (err) {
        console.error("Edit staff loading error:", err);
        setError(err.message || t("editStaff.loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id, token, t]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const authToken =
        token ||
        localStorage.getItem("sifarish_token") ||
        localStorage.getItem("token");

      const body = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      // Only send password when admin enters a new one
      if (form.password.trim()) {
        body.password = form.password;
      }

      const res = await fetch(`${API}/staff/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || t("editStaff.error")
        );
      }

      setMessage(
        data.message || t("editStaff.success")
      );

      setForm({
        ...form,
        password: "",
      });

      setTimeout(() => {
        navigate(`/admin/staff/${id}`);
      }, 1000);
    } catch (err) {
      console.error("Update staff error:", err);
      setError(err.message || t("editStaff.error"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-slate-500">
          {t("editStaff.loading")}
        </p>
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="rounded-2xl bg-red-50 p-8 text-center">
        <AlertCircle
          size={28}
          className="mx-auto text-red-500"
        />

        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>

        <button
          onClick={() => navigate("/admin/staff")}
          className="mt-5 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-900"
        >
          {t("editStaff.back")}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(`/admin/staff/${id}`)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-950"
      >
        <ArrowLeft size={18} />
        {t("editStaff.back")}
      </button>

      {/* Header */}
      <section>
        <p className="text-sm font-semibold text-red-600">
          {t("editStaff.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-blue-950">
          {t("editStaff.title")}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {t("editStaff.description")}
        </p>
      </section>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Success */}
      {message && (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Role */}
        <div>
          <h2 className="text-lg font-bold text-blue-950">
            {t("editStaff.chooseRole")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("editStaff.chooseRoleDescription")}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {roles.map(([id, Icon]) => {
              const selected = form.role === id;

              return (
                <button
                  type="button"
                  key={id}
                  onClick={() =>
                    setForm({
                      ...form,
                      role: id,
                    })
                  }
                  className={`rounded-xl border p-4 text-left transition ${
                    selected
                      ? "border-blue-950 bg-blue-950 text-white"
                      : "border-slate-200 hover:border-blue-900"
                  }`}
                >
                  <Icon size={22} />

                  <p className="mt-3 font-semibold">
                    {t(`editStaff.roles.${id}`)}
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      selected
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {t(`editStaff.roleDescriptions.${id}`)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-8 border-t pt-7">
          <h2 className="text-lg font-bold text-blue-950">
            {t("editStaff.accountInformation")}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <Input
              label={t("editStaff.name")}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("editStaff.namePlaceholder")}
              icon={User}
            />

            {/* Email */}
            <Input
              label={t("editStaff.email")}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("editStaff.emailPlaceholder")}
              icon={Mail}
            />

            {/* Password */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-blue-950">
                {t("editStaff.password")}
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t(
                    "editStaff.passwordPlaceholder"
                  )}
                  className="w-full rounded-xl bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-950"
                  aria-label={
                    showPassword
                      ? t("editStaff.hidePassword")
                      : t("editStaff.showPassword")
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {t("editStaff.passwordHint")}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={() => navigate(`/admin/staff/${id}`)}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            {t("editStaff.cancel")}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? t("editStaff.saving")
              : t("editStaff.saveButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-blue-950">
      {label}
    </label>

    <div className="relative">
      <Icon
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/20"
      />
    </div>
  </div>
);

export default EditStaff;