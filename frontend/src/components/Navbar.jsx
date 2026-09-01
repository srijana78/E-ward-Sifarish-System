import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-18 min-h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >

            <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">
                EW
              </span>
            </div>

            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                E-Ward Sifarish
              </h1>

              <p className="hidden sm:block text-xs text-slate-500">
                Digital Ward Services
              </p>
            </div>

          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">

            <Link
              to="/"
              className="text-sm font-semibold text-blue-700"
            >
              Home
            </Link>

            <a
              href="/#services"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition"
            >
              Services
            </a>

            <a
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition"
            >
              How It Works
            </a>

            <a
              href="/#about"
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition"
            >
              About
            </a>

            <Link
              to="/login"
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
            >
              Login
            </Link>

          </div>


          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium"
              >
                Home
              </Link>

              <a
                href="/#services"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                Services
              </a>

              <a
                href="/#how-it-works"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                How It Works
              </a>

              <a
                href="/#about"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                About
              </a>

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-lg transition"
              >
                Login
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;