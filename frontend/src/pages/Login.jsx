import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loginType, setLoginType] = useState("citizen");

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeLoginType = (type) => {
    setLoginType(type);

    setFormData({
      phone: "",
      email: "",
      password: "",
    });

    setShowPassword(false);
  };

  // ================= LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const identifier =
        loginType === "citizen"
          ? formData.phone
          : formData.email;

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            identifier: identifier,
            password: formData.password,
            loginType: loginType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save logged-in user
      login(data.user);

      alert("Login successful!");

      // Redirect based on role
      if (data.user.role === "citizen") {
        navigate("/citizen");
      } else {
        navigate("/frontoffice");
      }

    } catch (error) {
      console.error("Login error:", error);

      alert("Failed to connect to server");
    }
  };

  const isCitizen = loginType === "citizen";

  return (
    <main className="bg-slate-50 px-3 py-3 sm:px-5 sm:py-5">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[420px]">

          {/* Main Card */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">

            {/* Header */}

            <div
              className={`px-5 pb-5 pt-6 text-center text-white transition-colors duration-300 sm:px-7 sm:pb-6 sm:pt-7 ${
                isCitizen ? "bg-indigo-700" : "bg-emerald-700"
              }`}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl">
                {isCitizen ? (
                  <User
                    size={25}
                    strokeWidth={1.9}
                    className="sm:h-7 sm:w-7"
                  />
                ) : (
                  <ShieldCheck
                    size={25}
                    strokeWidth={1.9}
                    className="sm:h-7 sm:w-7"
                  />
                )}
              </div>

              <h1 className="text-xl font-bold leading-tight sm:text-2xl">
                {t("auth.loginTitle")}
              </h1>

              <p className="mx-auto mt-1.5 max-w-[350px] text-xs leading-5 text-white/75 sm:text-sm">
                {t("auth.loginSubtitle")}
              </p>
            </div>

            {/* Citizen / Admin Selector */}

            <div className="px-5 pt-5 sm:px-7 sm:pt-6">
              <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">

                {/* Citizen */}

                <button
                  type="button"
                  onClick={() => changeLoginType("citizen")}
                  className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-all duration-200 sm:h-10 sm:text-sm ${
                    isCitizen
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-700"
                  }`}
                >
                  <User size={16} />

                  <span>{t("auth.citizen")}</span>
                </button>

                {/* Front Office */}

                <button
                  type="button"
                  onClick={() => changeLoginType("frontoffice")}
                  className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-semibold transition-all duration-200 sm:h-10 sm:text-sm ${
                    !isCitizen
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white hover:text-slate-700"
                  }`}
                >
                  <ShieldCheck size={16} />

                  <span>{t("auth.admin")}</span>
                </button>

              </div>
            </div>

            {/* Login Heading */}

            <div className="px-5 pt-5 sm:px-7 sm:pt-6">
              <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                {isCitizen
                  ? t("auth.citizenLoginTitle")
                  : t("auth.adminLoginTitle")}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                {isCitizen
                  ? t("auth.citizenLoginSubtitle")
                  : t("auth.adminLoginSubtitle")}
              </p>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6"
            >

              {/* Citizen Phone */}

              {isCitizen && (
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
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("auth.phonePlaceholder")}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 sm:h-11 sm:rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Front Office Email */}

              {!isCitizen && (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    {t("auth.adminEmailLabel")}
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("auth.adminEmailPlaceholder")}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 sm:h-11 sm:rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Password */}

              <div className="mb-4">
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("auth.passwordPlaceholder")}
                    className={`h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 sm:h-11 sm:rounded-xl ${
                      isCitizen
                        ? "focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                        : "focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
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

              {/* Remember / Forgot */}

              <div className="mb-5 flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500 sm:text-sm">
                  <input
                    type="checkbox"
                    className={`h-3.5 w-3.5 rounded border-slate-300 ${
                      isCitizen
                        ? "accent-indigo-600"
                        : "accent-emerald-600"
                    }`}
                  />

                  {t("auth.rememberMe")}
                </label>

                <button
                  type="button"
                  className={`text-xs font-semibold transition hover:underline sm:text-sm ${
                    isCitizen
                      ? "text-indigo-600 hover:text-indigo-700"
                      : "text-emerald-600 hover:text-emerald-700"
                  }`}
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] sm:h-11 sm:rounded-xl ${
                  isCitizen
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <span className="truncate">
                  {isCitizen
                    ? t("auth.citizenLoginButton")
                    : t("auth.adminLoginButton")}
                </span>

                <ArrowRight size={17} className="shrink-0" />
              </button>

            </form>

            {/* Register */}

            {isCitizen && (
              <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-center sm:px-6 sm:py-3.5">
                <span className="text-xs text-slate-500 sm:text-sm">
                  {t("auth.noAccount")}{" "}
                </span>

                <Link
                  to="/register"
                  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline sm:text-sm"
                >
                  {t("auth.registerLink")}
                </Link>
              </div>
            )}

          </div>

          <Link
            to="/"
            className={`mt-4 flex items-center justify-center gap-1.5 text-sm font-medium transition ${
              isCitizen
                ? "text-indigo-600 hover:text-indigo-700"
                : "text-emerald-600 hover:text-emerald-700"
            }`}
          >
            <ArrowLeft size={16} />

            <span>Back to Home</span>
          </Link>

          <p className="px-3 pt-3 text-center text-[10px] leading-4 text-slate-400 sm:pt-4 sm:text-xs">
            E-Sifarish Portal • Chandannath Municipality
          </p>

        </div>
      </div>
    </main>
  );
}

export default Login;