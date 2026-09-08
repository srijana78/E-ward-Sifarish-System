import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  User,
  Bell,
  Languages,
  ShieldCheck,
  Save,
} from "lucide-react";

const Settings = () => {
  const { t, i18n } = useTranslation();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState(
    i18n.language === "ne" ? "ne" : "en"
  );

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const languages = [
    {
      code: "en",
      name: "English",
      description: t("settings.englishDescription"),
    },
    {
      code: "ne",
      name: "नेपाली",
      description: t("settings.nepaliDescription"),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl mt-9 space-y-6">
      {/* Header */}
      <section>
        <p className="text-sm font-bold text-red-600">
          {t("settings.label")}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-blue-950 sm:text-3xl">
          {t("settings.title")}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {t("settings.description")}
        </p>
      </section>

      {/* Profile */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
            <User size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("settings.profile")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("settings.profileDescription")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              label: t("settings.fullName"),
              type: "text",
              value: "Front Office Staff",
            },
            {
              label: t("settings.email"),
              type: "email",
              value: "frontoffice@eward.gov.np",
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-sm font-semibold text-slate-700">
                {field.label}
              </label>

              <input
                type={field.type}
                defaultValue={field.value}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
            <Bell size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("settings.notifications")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("settings.notificationsDescription")}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-slate-50 p-4">
          <div>
            <p className="text-sm font-semibold text-blue-950">
              {t("settings.applicationNotifications")}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {t("settings.applicationNotificationsDescription")}
            </p>
          </div>

          <button
            onClick={() => setNotificationsEnabled((prev) => !prev)}
            className={`relative h-7 w-12 rounded-full transition ${
              notificationsEnabled ? "bg-blue-950" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                notificationsEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>

      {/* Language */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
            <Languages size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {t("settings.language")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("settings.languageDescription")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => changeLanguage(item.code)}
              className={`rounded-xl border p-4 text-left transition ${
                language === item.code
                  ? "border-blue-950 bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className="font-semibold text-blue-950">{item.name}</p>

              <p className="mt-1 text-xs text-slate-500">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-4">
          <div className="rounded-lg bg-white p-2 text-blue-900 shadow-sm">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3 className="font-bold text-blue-950">
              {t("settings.security")}
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {t("settings.securityDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Save */}
      <section className="flex justify-end border-t border-slate-200 pt-5">
        <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700">
          <Save size={18} />
          {t("settings.saveChanges")}
        </button>
      </section>
    </div>
  );
};

export default Settings;