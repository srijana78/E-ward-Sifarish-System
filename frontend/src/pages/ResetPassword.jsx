import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
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

function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await apiFetch(`/auth/reset-password/staff/${token}`, {
        method: "POST",
        body: JSON.stringify({ newPassword }),
      });
      setDone(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.message || t("auth.invalidResetLink"));
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
              <h1 className="text-2xl font-bold">{t("auth.resetPasswordTitle")}</h1>
              <p className="mt-2 text-sm text-white/70">{t("auth.resetPasswordSubtitle")}</p>
            </div>

            <div className="px-6 py-6">
              {error && (
                <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              {done ? (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("auth.resetPasswordSuccess")}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
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
                    {loading ? t("auth.resettingPassword") : t("auth.resetPasswordButton")}
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

export default ResetPassword;