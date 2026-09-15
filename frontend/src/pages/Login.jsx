import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Field = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input {...props} className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
  </div>
);

const ROLE_ROUTES = { citizen: "/citizen", frontoffice: "/frontoffice", secretary: "/secretary", chairperson: "/chairperson", admin: "/admin" };

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginType, setLoginType] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ phone: "", email: "", password: "" });

  const isCitizen = loginType === "citizen";

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const changeLoginType = (type) => {
    setLoginType(type);
    setFormData({ phone: "", email: "", password: "" });
    setError("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const identifier = isCitizen ? formData.phone : formData.email;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: formData.password, loginType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user, data.token);
      navigate(ROLE_ROUTES[data.user.role] || "/");
    } catch (err) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-3 py-5 sm:px-5">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[420px]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
            <div className={`px-6 pb-6 pt-7 text-center text-white ${isCitizen ? "bg-indigo-600" : "bg-green-900"}`}>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                {isCitizen ? <User size={26} /> : <ShieldCheck size={26} />}
              </div>
              <h1 className="text-2xl font-bold">{t("auth.loginTitle")}</h1>
              <p className="mt-2 text-sm text-white/70">
                {isCitizen ? t("auth.citizenLoginSubtitle") : t("auth.staffLoginSubtitle")}
              </p>
            </div>

            <div className="px-6 pt-6">
              <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                <button type="button" onClick={() => changeLoginType("citizen")}
                  className={`flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${isCitizen ? "bg-indigo-600 text-white shadow" : "text-slate-800"}`}>
                  <User size={16} /> {t("auth.citizen")}
                </button>
                <button type="button" onClick={() => changeLoginType("staff")}
                  className={`flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${!isCitizen ? "bg-green-900 text-white shadow" : "text-slate-800"}`}>
                  <ShieldCheck size={16} /> {t("auth.staff")}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-6">
              {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {isCitizen ? t("auth.phoneLabel") : t("auth.emailLabel")}
                </label>
                {isCitizen ? (
                  <Field icon={Phone} name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder={t("auth.phonePlaceholder")} />
                ) : (
                  <Field icon={Mail} name="email" type="email" required value={formData.email} onChange={handleChange} placeholder={t("auth.emailPlaceholder")} />
                )}
              </div>

              <div className="mb-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">{t("auth.passwordLabel")}</label>
                <div className="relative">
                  <Field icon={Lock} name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder={t("auth.passwordPlaceholder")} />
                  <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

            
                <div className="mb-5 text-right">
  <Link
    to="/forgot-password"
    className={`text-sm font-medium hover:underline ${
      isCitizen ? "text-indigo-600" : "text-green-900"
    }`}
  >
    {t("auth.forgotPassword")}
  </Link>
</div>
            

              <button type="submit" disabled={loading}
                className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition disabled:opacity-60 ${isCitizen ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-900 hover:bg-green-800"}`}>
                {loading ? t("auth.loggingIn") : t("auth.loginButton")} <ArrowRight size={17} />
              </button>
            </form>

            {isCitizen ? (
              <div className="border-t bg-slate-50 px-5 py-4 text-center">
                <span className="text-sm text-slate-500">{t("auth.noAccount")} </span>
                <Link to="/register" className="font-semibold text-indigo-600 hover:underline">{t("auth.register")}</Link>
              </div>
            ) : (
              <div className="border-t bg-slate-50 px-6 py-4 text-center">
                <p className="text-xs leading-5 text-slate-500">{t("auth.staffInfo")}</p>
              </div>
            )}
          </div>

          <Link to="/" className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
            <ArrowLeft size={16} /> {t("auth.backHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;