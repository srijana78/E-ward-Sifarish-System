import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

function Home() {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("home.howItWorks.step1.title"),
      description: t("home.howItWorks.step1.description"),
    },
    {
      number: "02",
      title: t("home.howItWorks.step2.title"),
      description: t("home.howItWorks.step2.description"),
    },
    {
      number: "03",
      title: t("home.howItWorks.step3.title"),
      description: t("home.howItWorks.step3.description"),
    },
    {
      number: "04",
      title: t("home.howItWorks.step4.title"),
      description: t("home.howItWorks.step4.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* <Navbar /> */}

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 sm:py-20 lg:py-28">
            
            {/* Hero Content */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>

                {t("home.hero.badge")}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900">
                {t("home.hero.titleLine1")}

                <span className="block text-blue-700">
                  {t("home.hero.titleLine2")}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {t("home.hero.description")}
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-700/20 transition">
                  {t("home.hero.applyButton")}
                  <span className="ml-2">→</span>
                </button>

                <button className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition">
                  {t("home.hero.verifyButton")}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {t("home.hero.secure")}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {t("home.hero.tracking")}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  {t("home.hero.qrVerification")}
                </div>
              </div>
            </div>

            {/* ================= HERO CARD ================= */}
            <div className="relative">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-900/5 p-6 sm:p-8">
                
                {/* Card Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      {t("home.portal.label")}
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {t("home.portal.title")}
                    </h2>
                  </div>

                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                    🏛️
                  </div>
                </div>

                {/* Service Items */}
                <div className="mt-6 space-y-4">
                  
                  {/* Online Application */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition">
                    <div className="w-11 h-11 shrink-0 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                      📝
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {t("home.portal.onlineApplication.title")}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {t("home.portal.onlineApplication.description")}
                      </p>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-green-50 transition">
                    <div className="w-11 h-11 shrink-0 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                      📄
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {t("home.portal.documentUpload.title")}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {t("home.portal.documentUpload.description")}
                      </p>
                    </div>
                  </div>

                  {/* Application Tracking */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-purple-50 transition">
                    <div className="w-11 h-11 shrink-0 bg-purple-100 rounded-xl flex items-center justify-center text-xl">
                      📊
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {t("home.portal.applicationTracking.title")}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {t("home.portal.applicationTracking.description")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

                    <span className="text-sm text-slate-500">
                      {t("home.portal.available")}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-blue-700">
                    {t("home.portal.learnMore")} →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SERVICES ================= */}
      <section id="services" className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wider text-blue-700 uppercase">
              {t("home.services.label")}
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              {t("home.services.title")}
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              {t("home.services.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            
            {/* Service 1 */}
            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                📝
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {t("home.services.apply.title")}
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                {t("home.services.apply.description")}
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                {t("home.services.apply.action")} →
              </div>
            </div>

            {/* Service 2 */}
            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {t("home.services.track.title")}
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                {t("home.services.track.description")}
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                {t("home.services.track.action")} →
              </div>
            </div>

            {/* Service 3 */}
            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                🔐
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {t("home.services.verify.title")}
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                {t("home.services.verify.description")}
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                {t("home.services.verify.action")} →
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-bold tracking-wider text-blue-700 uppercase">
              {t("home.howItWorks.label")}
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              {t("home.howItWorks.title")}
            </h2>

            <p className="mt-4 text-slate-600">
              {t("home.howItWorks.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                
                <div className="text-5xl font-bold text-blue-100">
                  {step.number}
                </div>

                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= CTA ================= */}
      <section id="about" className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                {t("home.cta.title")}
              </h2>

              <p className="mt-4 text-blue-100 leading-relaxed">
                {t("home.cta.description")}
              </p>
            </div>

            <button className="shrink-0 bg-white hover:bg-blue-50 text-blue-700 px-7 py-3.5 rounded-xl font-bold transition">
              {t("home.cta.button")} →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;