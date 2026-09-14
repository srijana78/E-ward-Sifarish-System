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
  Wallet,
} from "lucide-react";
import { useApplication } from "../../context/ApplicationContext";

const services = [
  {
    id: "permanentResidence",
    category: "residence",
    icon: Home,
    fee: 0,
    documents: ["citizenship", "application"],
  },
  {
    id: "temporaryResidence",
    category: "residence",
    icon: Home,
    fee: 100,
    documents: ["citizenship", "application"],
  },
  {
    id: "citizenship",
    category: "personal",
    icon: Users,
    fee: 0,
    documents: ["citizenship", "application"],
  },
  {
    id: "relationship",
    category: "personal",
    icon: Users,
    fee: 0,
    documents: ["citizenship", "application"],
  },
  {
    id: "education",
    category: "education",
    icon: GraduationCap,
    fee: 100,
    documents: ["citizenship", "application"],
  },
  {
    id: "business",
    category: "business",
    icon: BriefcaseBusiness,
    fee: 500,
    documents: ["citizenship", "application", "supporting"],
  },
  {
    id: "property",
    category: "property",
    icon: Building2,
    fee: 300,
    documents: ["citizenship", "application", "supporting"],
  },
  {
    id: "other",
    category: "other",
    icon: FileText,
    fee: 0,
    documents: ["citizenship", "application"],
  },
];

const categories = [
  "all",
  "personal",
  "residence",
  "education",
  "business",
  "property",
  "other",
];

const NewApplication = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateService } = useApplication();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = services.filter(({ id, category: serviceCategory }) => {
    const title = t(`newApplication.services.${id}`).toLowerCase();
    const description = t(
      `newApplication.services.${id}Description`
    ).toLowerCase();

    return (
      (category === "all" || serviceCategory === category) &&
      (title.includes(search.toLowerCase()) ||
        description.includes(search.toLowerCase()))
    );
  });

  const handleContinue = () => {
    if (!selectedService) return;

    updateService({
      service: selectedService.id,
      fee: selectedService.fee,
      paymentRequired: selectedService.fee > 0,
      requiredDocuments: selectedService.documents,
    });

    navigate(`/citizen/apply/details?service=${selectedService.id}`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-24">
      {/* Header */}
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
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold text-white">
            1
          </div>

          <div>
            <p className="font-bold text-blue-950">
              {t("newApplication.stepOne")}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {t("newApplication.stepOneDescription")}
            </p>
          </div>

          <span className="ml-auto hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 sm:block">
            1 / 5
          </span>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
          {t("newApplication.selectService")}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {t("newApplication.selectServiceDescription")}
        </p>

        <div className="relative mt-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("newApplication.searchPlaceholder")}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-xs font-semibold transition ${
                category === item
                  ? "border-blue-950 bg-blue-950 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-blue-50"
              }`}
            >
              {t(`newApplication.categories.${item}`)}
            </button>
          ))}
        </div>
      </section>

      {/* Services */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
              {t("newApplication.availableServices")}
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              {t("newApplication.availableServicesDescription")}
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {filteredServices.length} {t("newApplication.servicesFound")}
          </span>
        </div>

        {filteredServices.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const selected = selectedService?.id === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`group relative rounded-2xl border bg-white p-6 text-left transition-all ${
                    selected
                      ? "border-red-600 bg-red-50/30 ring-2 ring-red-100"
                      : "border-slate-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  }`}
                >
                  {selected && (
                    <CheckCircle2
                      size={22}
                      className="absolute right-5 top-5 text-red-600"
                    />
                  )}

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-50 text-blue-900"
                    }`}
                  >
                    <Icon size={25} />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold leading-6 text-blue-950">
                      {t(`newApplication.services.${service.id}`)}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                        service.fee
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {service.fee
                        ? `Rs. ${service.fee}`
                        : t("newApplication.free")}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm leading-6 text-slate-500">
                    {t(`newApplication.services.${service.id}Description`)}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-blue-900">
                    {selected
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
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
            <FileText size={34} className="mx-auto text-slate-400" />

            <p className="mt-4 font-bold text-slate-700">
              {t("newApplication.noServices")}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {t("newApplication.noServicesDescription")}
            </p>
          </div>
        )}
      </section>

      {/* Information */}
      <section className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <Info size={19} className="shrink-0 text-blue-800" />

        <div>
          <p className="text-sm font-bold text-blue-950">
            {t("newApplication.beforeContinue")}
          </p>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            {t("newApplication.beforeContinueDescription")}
          </p>
        </div>
      </section>

      {/* Continue */}
      <section className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur lg:left-[270px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="hidden sm:block">
            {selectedService ? (
              <>
                <p className="text-[11px] font-medium uppercase text-slate-400">
                  {t("newApplication.selectedService")}
                </p>

                <p className="text-sm font-bold text-blue-950">
                  {t(`newApplication.services.${selectedService.id}`)}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500">
                {t("newApplication.selectServiceToContinue")}
              </p>
            )}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className="ml-auto inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Wallet size={17} />
            {t("newApplication.continue")}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewApplication;