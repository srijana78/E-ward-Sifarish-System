import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  FileText,
  Home,
  GraduationCap,
  BriefcaseBusiness,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

// Recommendation data
const recommendationServices = [
  {
    id: "residence",
    category: "residence",
    titleKey: "residence",
    descriptionKey: "residenceDescription",
    icon: Home,
  },
  {
    id: "personal",
    category: "personal",
    titleKey: "personal",
    descriptionKey: "personalDescription",
    icon: Users,
  },
  {
    id: "education",
    category: "education",
    titleKey: "education",
    descriptionKey: "educationDescription",
    icon: GraduationCap,
  },
  {
    id: "business",
    category: "business",
    titleKey: "business",
    descriptionKey: "businessDescription",
    icon: BriefcaseBusiness,
  },
  {
    id: "property",
    category: "property",
    titleKey: "property",
    descriptionKey: "propertyDescription",
    icon: Building2,
  },
  {
    id: "other",
    category: "other",
    titleKey: "other",
    descriptionKey: "otherDescription",
    icon: FileText,
  },
];

const categories = [
  { id: "all", labelKey: "all" },
  { id: "personal", labelKey: "personal" },
  { id: "residence", labelKey: "residence" },
  { id: "education", labelKey: "education" },
  { id: "business", labelKey: "business" },
  { id: "property", labelKey: "property" },
  { id: "other", labelKey: "other" },
];

const NewApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = recommendationServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" ||
      service.category === selectedCategory;

    const title = t(
      `newApplication.services.${service.titleKey}`
    ).toLowerCase();

    const description = t(
      `newApplication.services.${service.descriptionKey}`
    ).toLowerCase();

    const searchText = search.toLowerCase();

    return (
      matchesCategory &&
      (title.includes(searchText) ||
        description.includes(searchText))
    );
  });

  const handleContinue = () => {
    if (!selectedService) return;

    navigate(
      `/citizen/apply/details?service=${selectedService.id}`
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-24">

      {/* Page Header */}
      <section>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <span>{t("citizenSidebar.dashboard")}</span>
          <span>/</span>
          <span className="text-blue-900">
            {t("citizenSidebar.newApplication")}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            {t("newApplication.stepOne")}
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
            {t("newApplication.title")}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            {t("newApplication.description")}
          </p>
        </div>
      </section>

      {/* Progress */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-red-600" />

        <div className="flex items-center gap-4 p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-base font-bold text-white shadow-sm">
            1
          </div>

          <div>
            <p className="text-sm font-bold text-blue-950 sm:text-base">
              {t("newApplication.stepOne")}
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              {t("newApplication.stepOneDescription")}
            </p>
          </div>

          <div className="ml-auto hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:block">
            1 / 5
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
            {t("newApplication.selectService")}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {t("newApplication.selectServiceDescription")}
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("newApplication.searchPlaceholder")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Categories */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
            Categories
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive =
                selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                  className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "border-blue-950 bg-blue-950 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                  }`}
                >
                  {t(
                    `newApplication.categories.${category.labelKey}`
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
              {t("newApplication.availableServices")}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              {t(
                "newApplication.availableServicesDescription"
              )}
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {filteredServices.length}{" "}
            {t("newApplication.servicesFound")}
          </span>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const isSelected =
                selectedService?.id === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative rounded-2xl border bg-white p-6 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-red-600 bg-red-50/30 shadow-md ring-2 ring-red-100"
                      : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  }`}
                >
                  {/* Selected */}
                  {isSelected && (
                    <div className="absolute right-5 top-5">
                      <CheckCircle2
                        size={22}
                        className="text-red-600"
                      />
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl transition ${
                      isSelected
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-50 text-blue-900 group-hover:bg-blue-100"
                    }`}
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 pr-8 text-base font-bold leading-6 text-blue-950 sm:text-lg">
                    {t(
                      `newApplication.services.${service.titleKey}`
                    )}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm leading-6 text-slate-500">
                    {t(
                      `newApplication.services.${service.descriptionKey}`
                    )}
                  </p>

                  {/* Action */}
                  <div
                    className={`mt-5 flex items-center gap-1.5 text-sm font-bold ${
                      isSelected
                        ? "text-red-600"
                        : "text-blue-900"
                    }`}
                  >
                    {isSelected
                      ? t("newApplication.selected")
                      : t("newApplication.select")}

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <FileText
              size={34}
              className="mx-auto text-slate-400"
            />

            <p className="mt-4 text-base font-bold text-slate-700">
              {t("newApplication.noServices")}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {t(
                "newApplication.noServicesDescription"
              )}
            </p>
          </div>
        )}
      </section>

      {/* Information Note */}
      <section className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
        <Info
          size={19}
          className="mt-0.5 shrink-0 text-blue-800"
        />

        <div>
          <p className="text-sm font-bold text-blue-950">
            Before you continue
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-800 sm:text-sm">
            Select the recommendation service that matches
            your requirement. You can review your information
            and documents before final submission.
          </p>
        </div>
      </section>

      {/* Continue Footer */}
      <section className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] backdrop-blur lg:left-[270px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            {selectedService ? (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {t("newApplication.selectedService")}
                </p>

                <p className="mt-0.5 text-sm font-bold text-blue-950">
                  {t(
                    `newApplication.services.${selectedService.titleKey}`
                  )}
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                {t(
                  "newApplication.selectServiceToContinue"
                )}
              </p>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {t("newApplication.continue")}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewApplication;