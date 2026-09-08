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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    setError("");
    setShowPassword(false);
  };

  // ================= LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

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
            identifier,
            password: formData.password,
            loginType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user in AuthContext + localStorage
      login(data.user);

      alert("Login successful!");

      // Redirect according to role
      if (data.user.role === "citizen") {
        navigate("/citizen");
      } else if (data.user.role === "frontoffice") {
        navigate("/frontoffice");
      }

    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Failed to connect to server");
    } finally {
      setLoading(false);
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
                  <User size={25} strokeWidth={1.9} />
                ) : (
                  <ShieldCheck size={25} strokeWidth={1.9} />
                )}

              </div>

              <h1 className="text-xl font-bold sm:text-2xl">
                {t("auth.loginTitle")}
              </h1>

              <p className="mt-1.5 text-xs text-white/75 sm:text-sm">
                {t("auth.loginSubtitle")}
              </p>

            </div>

            {/* Citizen / Front Office Selector */}

            <div className="px-5 pt-5 sm:px-7 sm:pt-6">

              <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">

                {/* Citizen */}

                <button
                  type="button"
                  onClick={() => changeLoginType("citizen")}
                  className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-semibold sm:h-10 sm:text-sm ${
                    isCitizen
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white"
                  }`}
                >
                  <User size={16} />
                  <span>{t("auth.citizen")}</span>
                </button>

                {/* Front Office */}

                <button
                  type="button"
                  onClick={() => changeLoginType("frontoffice")}
                  className={`flex h-9 items-center justify-center gap-2 rounded-lg text-xs font-semibold sm:h-10 sm:text-sm ${
                    !isCitizen
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-500 hover:bg-white"
                  }`}
                >
                  <ShieldCheck size={16} />
                  <span>Front Office</span>
                </button>

              </div>

            </div>

            {/* Form Heading */}

            <div className="px-5 pt-5 sm:px-7 sm:pt-6">

              <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                {isCitizen
                  ? t("auth.citizenLoginTitle")
                  : "Front Office Login"}
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {isCitizen
                  ? t("auth.citizenLoginSubtitle")
                  : "Login using your email and password"}
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6"
            >

              {/* Error */}

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Citizen Phone */}

              {isCitizen && (
                <div className="mb-4">

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                    {t("auth.phoneLabel")}
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("auth.phonePlaceholder")}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 sm:h-11 sm:rounded-xl"
                    />

                  </div>

                </div>
              )}

              {/* Front Office Email */}

              {!isCitizen && (
                <div className="mb-4">

                  <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 sm:h-11 sm:rounded-xl"
                    />

                  </div>

                </div>
              )}

              {/* Password */}

              <div className="mb-5">

                <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                  {t("auth.passwordLabel")}
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("auth.passwordPlaceholder")}
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm outline-none sm:h-11 sm:rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white sm:h-11 sm:rounded-xl ${
                  isCitizen
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                } disabled:opacity-60`}
              >

                <span>
                  {loading
                    ? "Logging in..."
                    : isCitizen
                    ? t("auth.citizenLoginButton")
                    : "Login"}
                </span>

                <ArrowRight size={17} />

              </button>

            </form>

            {/* Register */}

            {isCitizen && (
              <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-center">

                <span className="text-xs text-slate-500 sm:text-sm">
                  {t("auth.noAccount")}{" "}
                </span>

                <Link
                  to="/register"
                  className="text-xs font-semibold text-indigo-600 hover:underline sm:text-sm"
                >
                  {t("auth.registerLink")}
                </Link>

              </div>
            )}

          </div>

          {/* Back */}

          <Link
            to="/"
            className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-600"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

        </div>

      </div>
    </main>
  );
}

export default Login;