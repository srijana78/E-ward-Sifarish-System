import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  UserPlus,
  AlertCircle,
  CheckCircle2,
  MonitorCog,
  FileCheck,
  Landmark,
  User,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api/admin";

const CreateStaff = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "frontoffice",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const roles = [
    {
      id: "frontoffice",
      icon: MonitorCog,
      title: t("createStaff.roles.frontoffice"),
      description: t("createStaff.roleDescriptions.frontoffice"),
    },
    {
      id: "secretary",
      icon: FileCheck,
      title: t("createStaff.roles.secretary"),
      description: t("createStaff.roleDescriptions.secretary"),
    },
    {
      id: "chairperson",
      icon: Landmark,
      title: t("createStaff.roles.chairperson"),
      description: t("createStaff.roleDescriptions.chairperson"),
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await fetch(`${API}/create-staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            token || localStorage.getItem("sifarish_token")
          }`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create staff");
      }

      setMessage(data.message);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "frontoffice",
      });

      setTimeout(() => {
        navigate("/admin/staff");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}

      <section>
        <button
          onClick={() => navigate("/admin/staff")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-950"
        >
          <ArrowLeft size={18} />
          {t("createStaff.back")}
        </button>

        <p className="text-sm font-semibold text-red-600">
          {t("createStaff.label")}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-blue-950">
          {t("createStaff.title")}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          {t("createStaff.description")}
        </p>
      </section>

      {/* Alert Messages */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {message && (
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Role Selection */}

        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-blue-950">
              {t("createStaff.chooseRole")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("createStaff.chooseRoleDescription")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const selected = form.role === role.id;

              return (
                <button
                  type="button"
                  key={role.id}
                  onClick={() =>
                    setForm({ ...form, role: role.id })
                  }
                  className={`relative rounded-2xl p-5 text-left transition-all ${
                    selected
                      ? "bg-blue-950 text-white shadow-lg"
                      : "bg-white text-slate-700 shadow-sm hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-red-600"
                        : "bg-blue-50 text-blue-950"
                    }`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="font-bold">
                    {role.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      selected
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {role.description}
                  </p>

                  {selected && (
                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Account Information */}

        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7">
            <h2 className="text-lg font-bold text-blue-950">
              {t("createStaff.accountInformation")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("createStaff.accountInformationDescription")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}

            <InputField
              label={t("createStaff.name")}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("createStaff.namePlaceholder")}
              icon={User}
            />

            {/* Email */}

            <InputField
              label={t("createStaff.email")}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("createStaff.emailPlaceholder")}
              icon={Mail}
            />

            {/* Password */}

            <div className="md:col-span-2">
              <InputField
                label={t("createStaff.password")}
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={t("createStaff.passwordPlaceholder")}
                icon={Lock}
              />
            </div>
          </div>

          {/* Submit */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/staff")}
              className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              {t("createStaff.cancel")}
            </button>

            <button
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={19} />

              {loading
                ? t("createStaff.creating")
                : t("createStaff.createButton")}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

const InputField = ({
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
        className="w-full rounded-xl bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-900/20"
      />
    </div>
  </div>
);

export default CreateStaff;