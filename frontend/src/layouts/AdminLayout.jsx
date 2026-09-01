import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="flex min-h-screen">

        {/* =========================
            SIDEBAR
        ========================== */}

        <Sidebar />


        {/* =========================
            MAIN AREA
        ========================== */}

        <div className="flex-1 min-w-0">

          {/* =========================
              TOP HEADER
          ========================== */}

          <header className="sticky top-0 z-30 h-20 bg-white border-b border-slate-200">

            <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

              {/* LEFT */}

              <div>
                <p className="text-xs text-slate-400">
                  Ward Administration
                </p>

                <h1 className="text-sm sm:text-base font-bold text-slate-800">
                  Front Office Portal
                </h1>
              </div>


              {/* RIGHT */}

              <div className="flex items-center gap-3">

                {/* Notification */}

                <button
                  type="button"
                  className="
                    relative
                    w-10
                    h-10
                    rounded-lg
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-slate-50
                  "
                >
                  🔔

                  <span
                    className="
                      absolute
                      top-1.5
                      right-1.5
                      w-2
                      h-2
                      rounded-full
                      bg-red-500
                      border-2
                      border-white
                    "
                  />
                </button>


                {/* Staff */}

                <div className="flex items-center gap-3">

                  <div className="hidden sm:block text-right">

                    <p className="text-sm font-semibold text-slate-800">
                      Front Office Staff
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Ward Administration
                    </p>

                  </div>


                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-xs
                    "
                  >
                    FO
                  </div>

                </div>

              </div>

            </div>

          </header>


          {/* =========================
              PAGE CONTENT
          ========================== */}

          <main className="p-4 sm:p-6 lg:p-8">

            <Outlet />

          </main>

        </div>

      </div>

    </div>
  );
}

export default AdminLayout;