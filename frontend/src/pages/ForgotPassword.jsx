import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, IdCard, Lock, ArrowLeft, ArrowRight, User, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { apiFetch } from "../services/api";

const Field = ({ icon: Icon, ...props }) => (
  <div className="relative mb-5">
    <Icon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    <input
      {...props}
      className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

// Same as Field, but for password inputs: adds an eye icon on the right
// that toggles the input between type="password" and type="text".
const PasswordField = ({ icon: Icon, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative mb-5">
      <Icon size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        {...props}
        type={show ? "text" : "password"}
        className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-10 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
};

function ForgotPassword() {
  const { t } = useTranslation();

  const [tab, setTab] = useState("citizen"); // "citizen" | "staff"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Staff (email link) fields
  const [email, setEmail] = useState("");

  // Citizen (identity-verified) fields
  const [phone, setPhone] = useState("");
  const [citizenshipNo, setCitizenshipNo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeTab = (next) => {
    setTab(next);
    setError("");
    setSent(false);
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiFetch("/auth/forgot-password/staff", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCitizenSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/auth/forgot-password/citizen", {
        method: "POST",
        body: JSON.stringify({ phone, citizenshipNo, newPassword }),
      });
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-3 py-5 sm:px-5">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[420px]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
            <div className="bg-indigo-600 px-6 pb-6 pt-7 text-center text-white">
              <h1 className="text-2xl font-bold">{t("auth.forgotPasswordTitle")}</h1>
              <p className="mt-2 text-sm text-white/70">
                {tab === "citizen" ? t("auth.forgotPasswordCitizenSubtitle") : t("auth.forgotPasswordSubtitle")}
              </p>
            </div>

            <div className="px-6 pt-5">
              <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => changeTab("citizen")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${
                    tab === "citizen" ? "bg-white text-indigo-600 shadow" : "text-slate-500"
                  }`}
                >
                  <User size={15} /> {t("auth.citizen")}
                </button>
                <button
                  type="button"
                  onClick={() => changeTab("staff")}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition ${
                    tab === "staff" ? "bg-white text-indigo-600 shadow" : "text-slate-500"
                  }`}
                >
                  <ShieldCheck size={15} /> {t("auth.staff")}
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              {error && (
                <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              {tab === "staff" ? (
                sent ? (
                  <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                    {t("auth.resetLinkSent")}
                  </div>
                ) : (
                  <form onSubmit={handleStaffSubmit}>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">{t("auth.emailLabel")}</label>
                    <Field
                      icon={Mail}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("auth.emailPlaceholder")}
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                      {loading ? t("auth.sendingResetLink") : t("auth.sendResetLink")}
                      {!loading && <ArrowRight size={17} />}
                    </button>
                  </form>
                )
              ) : sent ? (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("auth.resetPasswordCitizenSuccess")}
                </div>
              ) : (
                <form onSubmit={handleCitizenSubmit}>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">{t("auth.phoneLabel")}</label>
                  <Field
                    icon={Phone}
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("auth.phonePlaceholder")}
                  />

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("auth.citizenshipLabel")}
                  </label>
                  <Field
                    icon={IdCard}
                    required
                    value={citizenshipNo}
                    onChange={(e) => setCitizenshipNo(e.target.value)}
                    placeholder={t("auth.citizenshipPlaceholder")}
                  />

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("auth.newPasswordLabel")}
                  </label>
                  <PasswordField
                    icon={Lock}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t("auth.newPasswordPlaceholder")}
                  />

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("auth.confirmPasswordLabel")}
                  </label>
                  <PasswordField
                    icon={Lock}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? t("auth.resettingPassword") : t("auth.resetPasswordCitizenButton")}
                    {!loading && <ArrowRight size={17} />}
                  </button>
                </form>
              )}
            </div>
          </div>

          <Link to="/login" className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600">
            <ArrowLeft size={16} />
            {t("auth.backToLogin")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;