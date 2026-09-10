import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserPlus,
  User,
  Mail,
  Lock,
  Building2,
  ClipboardCheck,
  Landmark,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const CreateStaff = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "frontoffice",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // UI ONLY FOR NOW
    alert("Staff account created successfully!");

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "frontoffice",
    });

    navigate("/admin/staff");
  };

  const roles = [
    {
      value: "frontoffice",
      name: "Front Office",
      description: "Verify and review citizen applications",
      icon: Building2,
    },
    {
      value: "secretary",
      name: "Ward Secretary",
      description: "Review verified applications",
      icon: ClipboardCheck,
    },
    {
      value: "chairperson",
      name: "Ward Chairperson",
      description: "Approve final applications",
      icon: Landmark,
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate("/admin/staff")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-900"
      >
        <ArrowLeft size={18} />
        Back to Staff Management
      </button>


      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-2">
          <UserPlus size={18} className="text-red-600" />

          <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
            Administration
          </p>
        </div>

        <h1 className="mt-2 text-3xl font-extrabold text-blue-950 sm:text-4xl">
          Create Staff Account
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Create a secure login account for government staff members.
        </p>

      </div>


      {/* FORM CARD */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* CARD HEADER */}

        <div className="border-b border-slate-100 bg-slate-50 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-950 p-3 text-white">
              <UserPlus size={22} />
            </div>

            <div>
              <h2 className="font-bold text-blue-950">
                Staff Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fill in the information below to create an account.
              </p>
            </div>

          </div>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>


          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Official Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="staff@municipality.gov.np"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Temporary Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a secure password"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>


          {/* ROLE */}

          <div>

            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Select Staff Role
            </label>

            <div className="grid gap-3 sm:grid-cols-3">

              {roles.map((role) => {
                const Icon = role.icon;

                const isSelected =
                  formData.role === role.value;

                return (
                  <button
                    type="button"
                    key={role.value}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        role: role.value,
                      }))
                    }
                    className={`relative rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-blue-900 bg-blue-50 ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >

                    {isSelected && (
                      <CheckCircle2
                        size={18}
                        className="absolute right-3 top-3 text-blue-900"
                      />
                    )}

                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-blue-900 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <h3 className="text-sm font-bold text-blue-950">
                      {role.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {role.description}
                    </p>

                  </button>
                );
              })}

            </div>

          </div>


          {/* BUTTONS */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/admin/staff")}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              <UserPlus size={18} />

              Create Staff Account
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateStaff;