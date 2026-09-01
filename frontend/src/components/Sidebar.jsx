import { NavLink } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      nepali: "ड्यासबोर्ड",
      path: "/frontoffice/dashboard",
      icon: "⌂",
    },
    {
      name: "Applications",
      nepali: "आवेदनहरू",
      path: "/frontoffice/applications",
      icon: "▤",
    },
    {
      name: "Notifications",
      nepali: "सूचनाहरू",
      path: "/frontoffice/notifications",
      icon: "♢",
      badge: 3,
    },
    {
      name: "Reports",
      nepali: "प्रतिवेदन",
      path: "/frontoffice/reports",
      icon: "▥",
    },
  ];

  return (
    <>
      {/* ==========================================
          MOBILE MENU BUTTON
      =========================================== */}

      <button
        onClick={() => setIsOpen(true)}
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-40
          w-10
          h-10
          rounded-xl
          bg-white
          border
          border-slate-200
          shadow-sm
          flex
          items-center
          justify-center
          text-slate-700
          hover:bg-slate-50
          transition
        "
      >
        ☰
      </button>


      {/* ==========================================
          MOBILE OVERLAY
      =========================================== */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            bg-slate-900/40
            z-40
            lg:hidden
          "
        />
      )}


      {/* ==========================================
          SIDEBAR
      =========================================== */}

      <aside
  className={`
    fixed
    lg:sticky
    top-0
    left-0
    z-50
    h-screen
    w-[270px]
    shrink-0
    bg-white
    border-r
    border-slate-200
    flex
    flex-col
    transition-transform
    duration-300

    ${
      isOpen
        ? "translate-x-0"
        : "-translate-x-full lg:translate-x-0"
    }
  `}
>

        {/* ========================================
            BRAND
        ========================================= */}

        <div className="h-[76px] px-5 border-b border-slate-100 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Logo */}

            <div className="
              w-10
              h-10
              rounded-xl
              bg-blue-700
              text-white
              flex
              items-center
              justify-center
              font-bold
              text-sm
              shadow-sm
            ">
              EW
            </div>


            {/* Brand text */}

            <div>

              <h1 className="text-base font-bold text-slate-900">
                E-Ward
              </h1>

              <p className="text-[10px] text-slate-400">
                Sifarish System
              </p>

            </div>

          </div>


          {/* Mobile close */}

          <button
            onClick={() => setIsOpen(false)}
            className="
              lg:hidden
              w-8
              h-8
              rounded-lg
              hover:bg-slate-100
              text-slate-500
              text-lg
            "
          >
            ×
          </button>

        </div>


        {/* ========================================
            OFFICE / USER CARD
        ========================================= */}

        <div className="px-4 pt-5">

          <div className="
            rounded-2xl
            bg-slate-50
            border
            border-slate-200
            p-4
          ">

            <div className="flex items-center gap-3">

              {/* Avatar */}

              <div className="
                w-10
                h-10
                rounded-xl
                bg-blue-700
                text-white
                flex
                items-center
                justify-center
                text-xs
                font-bold
              ">
                FO
              </div>


              <div className="min-w-0">

                <p className="text-sm font-semibold text-slate-800 truncate">
                  Front Office
                </p>

                <p className="text-xs text-slate-400 truncate">
                  Ward Administration
                </p>

              </div>

            </div>


            {/* Online status */}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">

              <span className="w-2 h-2 rounded-full bg-green-500" />

              <span className="text-[11px] text-slate-500">
                Online
              </span>

            </div>

          </div>

        </div>


        {/* ========================================
            NAVIGATION
        ========================================= */}

        <nav className="flex-1 px-4 mt-6 overflow-y-auto">

          {/* Main menu label */}

          <p className="
            px-3
            mb-2
            text-[10px]
            uppercase
            tracking-widest
            font-bold
            text-slate-400
          ">
            Main Menu
          </p>


          <div className="space-y-1">

            {menuItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `
                    group
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-blue-700 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                    }
                  `
                }
              >

                {/* Icon */}

                <span className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-base
                  shrink-0
                ">
                  {item.icon}
                </span>


                {/* Text */}

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>

                  <p className="text-[10px] opacity-70 mt-0.5">
                    {item.nepali}
                  </p>

                </div>


                {/* Notification badge */}

                {item.badge && (
                  <span className="
                    min-w-5
                    h-5
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  ">
                    {item.badge}
                  </span>
                )}

              </NavLink>

            ))}

          </div>


          {/* ======================================
              WORKFLOW
          ======================================= */}

          <p className="
            px-3
            mt-8
            mb-2
            text-[10px]
            uppercase
            tracking-widest
            font-bold
            text-slate-400
          ">
            Workflow
          </p>


          <div className="space-y-1">

            <NavLink
              to="/frontoffice/pending"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }
                `
              }
            >

              <span className="w-9 text-center">
                ◷
              </span>

              <div>

                <p>
                  Pending Review
                </p>

                <p className="text-[10px] opacity-60">
                  प्रमाणीकरण बाँकी
                </p>

              </div>

              <span className="
                ml-auto
                text-xs
                font-bold
                text-amber-600
              ">
                18
              </span>

            </NavLink>


            <NavLink
              to="/frontoffice/verified"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  text-sm
                  font-semibold
                  transition
                  ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                  }
                `
              }
            >

              <span className="w-9 text-center">
                ✓
              </span>

              <div>

                <p>
                  Verified
                </p>

                <p className="text-[10px] opacity-60">
                  प्रमाणित आवेदन
                </p>

              </div>

            </NavLink>

          </div>


          {/* ======================================
              SYSTEM
          ======================================= */}

          <p className="
            px-3
            mt-8
            mb-2
            text-[10px]
            uppercase
            tracking-widest
            font-bold
            text-slate-400
          ">
            System
          </p>


          <NavLink
            to="/frontoffice/settings"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                }
              `
            }
          >

            <span className="w-9 text-center">
              ⚙
            </span>

            <div>

              <p>
                Settings
              </p>

              <p className="text-[10px] opacity-60">
                सेटिङ
              </p>

            </div>

          </NavLink>

        </nav>


        {/* ========================================
            LOGOUT
        ========================================= */}

        <div className="
          p-4
          border-t
          border-slate-100
        ">

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              text-sm
              font-semibold
              text-red-600
              hover:bg-red-50
              transition
            "
          >

            <span className="w-9 text-center">
              ↪
            </span>

            <div className="text-left">

              <p>
                Logout
              </p>

              <p className="text-[10px] opacity-60">
                लगआउट
              </p>

            </div>

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;