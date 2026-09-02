import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                EW
              </span>
            </div>

            <span className="text-2xl font-bold text-slate-900">
              {t("login.brand")}
            </span>
          </Link>

          <h1 className="mt-8 text-2xl sm:text-3xl font-bold text-slate-900">
            {t("login.title")}
          </h1>

          <p className="mt-2 text-base text-slate-600">
            {t("login.subtitle")}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("login.email")}
              </label>

              <input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-lg font-semibold text-slate-700"
                >
                  {t("login.password")}
                </label>

                <button
                  type="button"
                  className="text-base font-semibold text-blue-700 hover:text-blue-800"
                >
                  {t("login.forgotPassword")}
                </button>
              </div>

              <input
                id="password"
                type="password"
                placeholder={t("login.passwordPlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 accent-blue-700"
              />

              <label
                htmlFor="remember"
                className="text-lg text-slate-600"
              >
                {t("login.rememberMe")}
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-900 text-white text-lg py-3 rounded-lg font-bold transition shadow-md"
            >
              {t("login.signIn")}
            </button>
          </form>

          {/* Register */}
          <div className="mt-3 mb-4 pt-6 border-t border-slate-100 text-center">
            <p className="text-base text-slate-700">
              {t("login.noAccount")}

              <Link
                to="/register"
                className="ml-1 text-blue-700 hover:text-blue-900 font-semibold"
              >
                {t("login.createAccount")}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-lg text-slate-700 hover:text-blue-900 font-semibold transition"
          >
            ← {t("login.backHome")}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;