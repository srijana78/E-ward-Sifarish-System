import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle registration
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password validation
    if (formData.password.length < 6) {
      setError(t("register.passwordLength"));
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    // Terms validation
    if (!formData.agreeTerms) {
      setError(t("register.acceptTerms"));
      return;
    }

    // Temporary success
    console.log("Citizen registration data:", formData);

    setSuccess(t("register.success"));

    // Temporary redirect
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <div className="w-11 h-11 bg-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                EW
              </span>
            </div>

            <span className="text-xl font-bold text-slate-900">
              {t("register.brand")}
            </span>
          </Link>

          <h1 className="mt-8 text-2xl sm:text-3xl font-bold text-slate-900">
            {t("register.title")}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t("register.subtitle")}
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white w-full border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("register.fullName")}
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t("register.fullNamePlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-400 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("register.email")}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("register.emailPlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-400 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("register.phone")}
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("register.phonePlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-400 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("register.password")}
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("register.passwordPlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-400 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-semibold text-slate-700 mb-2"
              >
                {t("register.confirmPassword")}
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t("register.confirmPasswordPlaceholder")}
                required
                className="w-full px-4 py-3 border border-slate-400 rounded-lg text-lg outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1.5 border border-slate-900 accent-blue-700"
              />

              <label
                htmlFor="agreeTerms"
                className="text-base text-slate-700 leading-relaxed"
              >
                {t("register.terms")}
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-base px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-base px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-900 text-white py-3 rounded-lg font-bold transition shadow-sm text-lg"
            >
              {t("register.createAccount")}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 pt-6 border-t border-slate-100 text-center">
            <p className="text-base text-slate-600">
              {t("register.alreadyAccount")}

              <Link
                to="/login"
                className="ml-1 text-base text-blue-700 hover:text-blue-800 font-bold"
              >
                {t("register.signIn")}
              </Link>
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-lg text-slate-600 font-semibold hover:text-blue-700 transition"
          >
            ← {t("register.backHome")}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;