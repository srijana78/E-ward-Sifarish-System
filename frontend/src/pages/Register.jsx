import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  User,
  Phone,
  Lock,
  FileText,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

function Register() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    citizenshipNo: "",
    password: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const registerURL = `${API_URL}/api/auth/register`;

    console.log("Register API URL:", registerURL);

    try {
      const response = await fetch(registerURL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phone,
          citizenshipNo: formData.citizenshipNo,
          password: formData.password,
        }),
      });

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      console.log("Register response status:", response.status);
      console.log("Register response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Registration failed (${response.status})`
        );
      }

      alert(
        data.message ||
          "Registration successful! Please login."
      );

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-3 py-5 sm:px-5 sm:py-6 md:px-6">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[440px]">

          {/* Main Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_14px_rgba(15,23,42,0.06)] sm:rounded-3xl">

            {/* Header */}
            <div className="bg-teal-700 px-5 pb-5 pt-6 text-center text-white sm:px-7 sm:pb-6 sm:pt-7">

              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl">
                <UserPlus
                  size={25}
                  strokeWidth={1.9}
                  className="sm:h-7 sm:w-7"
                />
              </div>

              <h1 className="text-xl font-bold leading-tight sm:text-2xl">
                {t("auth.registerTitle")}
              </h1>

              <p className="mx-auto mt-1.5 max-w-[350px] text-xs leading-5 text-white/75 sm:text-sm">
                {t("auth.registerSubtitle")}
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6"
            >

              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div className="mb-4">

                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                >
                  {t("auth.fullNameLabel")}
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t(
                      "auth.fullNamePlaceholder"
                    )}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 sm:h-11 sm:rounded-xl"
                  />

                </div>
              </div>

              {/* Phone */}
              <div className="mb-4">

                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                >
                  {t("auth.phoneLabel")}
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t(
                      "auth.phonePlaceholder"
                    )}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 sm:h-11 sm:rounded-xl"
                  />

                </div>
              </div>

              {/* Citizenship Number */}
              <div className="mb-4">

                <label
                  htmlFor="citizenshipNo"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                >
                  {t("auth.citizenshipLabel")}
                </label>

                <div className="relative">

                  <FileText
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="citizenshipNo"
                    name="citizenshipNo"
                    type="text"
                    required
                    value={formData.citizenshipNo}
                    onChange={handleChange}
                    placeholder={t(
                      "auth.citizenshipPlaceholder"
                    )}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 sm:h-11 sm:rounded-xl"
                  />

                </div>
              </div>

              {/* Password */}
              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                >
                  {t("auth.passwordLabel")}
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t(
                      "auth.passwordPlaceholder"
                    )}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 sm:h-11 sm:rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:right-2"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-teal-600 px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-teal-700 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:rounded-xl"
              >

                <span className="truncate">
                  {loading
                    ? t("auth.creatingAccount")
                    : t("auth.registerButton")}
                </span>

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="shrink-0"
                  />
                )}

              </button>

            </form>

            {/* Login Footer */}
            <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-center sm:px-6 sm:py-3.5">

              <span className="text-xs text-slate-500 sm:text-sm">
                {t("auth.hasAccount")}{" "}
              </span>

              <Link
                to="/login"
                className="text-xs font-semibold text-teal-700 transition hover:text-teal-800 hover:underline sm:text-sm"
              >
                {t("auth.loginLink")}
              </Link>

            </div>

          </div>

          {/* Back to Home */}
          <Link
            to="/"
            className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-teal-700 transition hover:text-teal-800"
          >
            <ArrowLeft size={16} />

            <span>
              {t("auth.backHome")}
            </span>
          </Link>

          <p className="px-3 pt-3 text-center text-[10px] leading-4 text-slate-400 sm:pt-4 sm:text-xs">
            E-Sifarish Portal • Chandannath Municipality
          </p>

        </div>
      </div>
    </main>
  );
}

export default Register;