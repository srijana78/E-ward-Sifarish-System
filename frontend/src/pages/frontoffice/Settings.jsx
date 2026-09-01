import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">
          Ward Administration
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Settings
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          प्रणाली तथा खाता सेटिङ
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5">

        <div className="p-5 sm:p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Staff Profile
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            कर्मचारीको विवरण
          </p>
        </div>

        <div className="p-5 sm:p-6">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              FO
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Front Office Staff
              </p>

              <p className="text-sm text-slate-400">
                Ward Administration
              </p>
            </div>

          </div>

          <div className="grid sm:grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-semibold text-slate-500">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Front Office Staff"
                className="w-full mt-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">
                Email
              </label>

              <input
                type="email"
                defaultValue="frontoffice@eward.gov.np"
                className="w-full mt-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

          </div>

          <button className="mt-5 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition">
            Save Changes
          </button>

        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Notifications
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            सूचना सम्बन्धी सेटिङ
          </p>
        </div>

        <div className="divide-y divide-slate-100">

          {/* Browser Notifications */}
          <div className="p-5 sm:p-6 flex items-center justify-between gap-5">

            <div>
              <p className="text-sm font-semibold text-slate-800">
                System Notifications
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Receive notifications about new applications.
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`
                w-12 h-6 rounded-full relative transition
                ${notifications ? "bg-blue-700" : "bg-slate-300"}
              `}
            >
              <span
                className={`
                  absolute top-1 w-4 h-4 rounded-full bg-white transition
                  ${notifications ? "left-7" : "left-1"}
                `}
              />
            </button>

          </div>

          {/* Email Alerts */}
          <div className="p-5 sm:p-6 flex items-center justify-between gap-5">

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Email Alerts
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Receive important updates through email.
              </p>
            </div>

            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`
                w-12 h-6 rounded-full relative transition
                ${emailAlerts ? "bg-blue-700" : "bg-slate-300"}
              `}
            >
              <span
                className={`
                  absolute top-1 w-4 h-4 rounded-full bg-white transition
                  ${emailAlerts ? "left-7" : "left-1"}
                `}
              />
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Settings;