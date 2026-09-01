import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // Handle input changes
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  };


  // Handle registration
  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // Password validation
    if (formData.password.length < 6) {

      setError("Password must be at least 6 characters.");

      return;
    }


    // Confirm password
    if (formData.password !== formData.confirmPassword) {

      setError("Passwords do not match.");

      return;
    }


    // Terms validation
    if (!formData.agreeTerms) {

      setError("Please accept the terms and conditions.");

      return;
    }


    // Temporary success
    console.log("Citizen registration data:", formData);

    setSuccess(
      "Registration successful! Redirecting to login..."
    );


    // Temporary redirect
    setTimeout(() => {

      navigate("/login");

    }, 1500);

  };


  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">


        {/* Logo */}

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
            Create Citizen Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Register to access digital ward services
          </p>

        </div>


        {/* Registration Card */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* Full Name */}

            <div>

              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Phone */}

            <div>

              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Password */}

            <div>

              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Confirm Password */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>


            {/* Terms */}

            <div className="flex items-start gap-2">

              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 accent-blue-700"
              />

              <label
                htmlFor="agreeTerms"
                className="text-xs text-slate-500 leading-relaxed"
              >
                I agree to the terms and conditions and confirm
                that the information provided is accurate.
              </label>

            </div>


            {/* Error */}

            {error && (

              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>

            )}


            {/* Success */}

            {success && (

              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg">
                {success}
              </div>

            )}


            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition shadow-sm"
            >
              Create Citizen Account
            </button>

          </form>


          {/* Login */}

          <div className="mt-7 pt-6 border-t border-slate-100 text-center">

            <p className="text-sm text-slate-500">

              Already have an account?

              <Link
                to="/login"
                className="ml-1 text-blue-700 hover:text-blue-800 font-semibold"
              >
                Sign in
              </Link>

            </p>

          </div>

        </div>


        {/* Back */}

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

export default Register;