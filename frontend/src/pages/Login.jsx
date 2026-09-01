import { Link } from "react-router-dom";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login form submitted");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >

            <div className="w-11 h-11 bg-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                EW
              </span>
            </div>

            <span className="text-xl font-bold text-slate-900">
              E-Ward Sifarish
            </span>

          </Link>

          <h1 className="mt-8 text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your digital ward services
          </p>

        </div>


        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-700 hover:text-blue-800"
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 accent-blue-700"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-600"
              >
                Remember me
              </label>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition shadow-sm"
            >
              Sign In
            </button>

          </form>


          {/* Register */}
          <div className="mt-7 pt-6 border-t border-slate-100 text-center">

            <p className="text-sm text-slate-500">
              Don't have a citizen account?

              <Link
                to="/register"
                className="ml-1 text-blue-700 hover:text-blue-800 font-semibold"
              >
                Create an account
              </Link>
            </p>

          </div>

        </div>


        {/* Back to home */}
        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-blue-700 transition"
          >
            ← Back to home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;