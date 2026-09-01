import { Outlet } from "react-router-dom";

function CitizenLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Main Area */}
      <div className="flex-1 min-w-0">

        {/* Top Header */}
        <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200">

          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

            {/* Page Identity */}
            <div>
              <p className="text-xs text-slate-400">
                Digital Ward Services
              </p>

              <h1 className="text-sm font-bold text-slate-800">
                Citizen Portal
              </h1>
            </div>


            {/* Header Right */}
            <div className="ml-auto flex items-center gap-3">

              {/* Language */}
              <button
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                <span>ने</span>
                <span className="text-slate-300">|</span>
                <span>EN</span>
              </button>


              {/* Notification */}
              <button
                className="relative w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                🔔

                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
              </button>


              {/* User */}
              <div className="flex items-center gap-3 pl-2">

                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    Srijana Bhakri
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Citizen
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  S
                </div>

              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default CitizenLayout;