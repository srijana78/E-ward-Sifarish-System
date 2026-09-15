import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";

function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend reset-password endpoint later
    setSent(true);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-3 py-5 sm:px-5">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[420px]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
            <div className="bg-indigo-600 px-6 pb-6 pt-7 text-center text-white">
              <h1 className="text-2xl font-bold">{t("auth.forgotPasswordTitle")}</h1>
              <p className="mt-2 text-sm text-white/70">{t("auth.forgotPasswordSubtitle")}</p>
            </div>

            <div className="px-6 py-6">
              {sent ? (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("auth.resetLinkSent")}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    {t("auth.emailLabel")}
                  </label>
                  <div className="relative mb-5">
                    <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("auth.emailPlaceholder")}
                      className="h-11 w-full rounded-xl bg-slate-50 pl-10 pr-4 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    {t("auth.sendResetLink")}
                    <ArrowRight size={17} />
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