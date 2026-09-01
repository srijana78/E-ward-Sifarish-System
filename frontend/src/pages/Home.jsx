import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

  


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>


        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 sm:py-20 lg:py-28">


            {/* Hero Content */}

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">

                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>

                GOVERNMENT DIGITAL SERVICE

              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900">

                Ward Services,

                <span className="block text-blue-700">
                  Simplified.
                </span>

              </h1>


              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">

                Apply for ward recommendations online, upload
                required documents, track your application and
                receive your approved certificate digitally.

              </p>


              {/* Buttons */}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">

                <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-700/20 transition">

                  Apply for Sifarish
                  <span className="ml-2">→</span>

                </button>


                <button className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-7 py-3.5 rounded-xl font-semibold transition">

                  Verify Certificate

                </button>

              </div>


              {/* Trust indicators */}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Secure Application
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Online Tracking
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  QR Verification
                </div>

              </div>

            </div>


            {/* Hero Card */}

            <div className="relative">

              <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-900/5 p-6 sm:p-8">


                {/* Card Header */}

                <div className="flex items-center justify-between pb-5 border-b border-slate-100">

                  <div>

                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      Citizen Portal
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      Digital Ward Services
                    </h2>

                  </div>

                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                    🏛️
                  </div>

                </div>


                {/* Service Items */}

                <div className="mt-6 space-y-4">


                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition">

                    <div className="w-11 h-11 shrink-0 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                      📝
                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        Online Application
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Submit your recommendation request online.
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-green-50 transition">

                    <div className="w-11 h-11 shrink-0 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                      📄
                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        Document Upload
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Upload citizenship and required documents securely.
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-purple-50 transition">

                    <div className="w-11 h-11 shrink-0 bg-purple-100 rounded-xl flex items-center justify-center text-xl">
                      📊
                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        Application Tracking
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Monitor your application status anytime.
                      </p>

                    </div>

                  </div>


                </div>


                {/* Bottom status */}

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

                    <span className="text-sm text-slate-500">
                      Services Available
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-blue-700">
                    Learn more →
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="bg-white py-20 sm:py-24"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-2xl">

            <p className="text-sm font-bold tracking-wider text-blue-700 uppercase">
              Our Services
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              Everything you need in one place
            </h2>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Access ward recommendation services digitally
              without unnecessary office visits.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">


            {/* Service 1 */}

            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                📝
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Apply Online
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                Fill out recommendation forms and submit
                your application from anywhere.
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                Start application →
              </div>

            </div>


            {/* Service 2 */}

            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                📊
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Track Application
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                Track your application from submission through
                verification and approval.
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                Track status →
              </div>

            </div>


            {/* Service 3 */}

            <div className="group p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                🔐
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Verify Certificate
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                Verify the authenticity of a digital certificate
                using its QR code.
              </p>

              <div className="mt-5 text-sm font-semibold text-blue-700">
                Verify certificate →
              </div>

            </div>


          </div>

        </div>

      </section>



      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="py-20 sm:py-24 bg-slate-50"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm font-bold tracking-wider text-blue-700 uppercase">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
              Get your service in four steps
            </h2>

            <p className="mt-4 text-slate-600">
              A simple digital process designed to save your
              time and reduce unnecessary office visits.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">


            {[
              {
                number: "01",
                title: "Register",
                description: "Create your citizen account securely."
              },
              {
                number: "02",
                title: "Apply",
                description: "Fill the form and upload required documents."
              },
              {
                number: "03",
                title: "Verification",
                description: "Ward officials verify your application."
              },
              {
                number: "04",
                title: "Receive",
                description: "Download your approved digital certificate."
              }
            ].map((step) => (

              <div
                key={step.number}
                className="relative"
              >

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

      <section
        id="about"
        className="bg-blue-700"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div className="max-w-2xl">

              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to apply for a ward service?
              </h2>

              <p className="mt-4 text-blue-100 leading-relaxed">
                Submit your application online and track
                its progress without repeated visits to the
                ward office.
              </p>

            </div>


            <button className="shrink-0 bg-white hover:bg-blue-50 text-blue-700 px-7 py-3.5 rounded-xl font-bold transition">

              Start Application →

            </button>

          </div>

        </div>

      </section>


    </div>
  );
}

export default Home;