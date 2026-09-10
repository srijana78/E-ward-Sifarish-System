import React, { useState } from "react";
import {
  Settings,
  Building2,
  MapPin,
  Phone,
  Mail,
  Save,
} from "lucide-react";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    municipality: "Nepalgunj Sub-Metropolitan City",
    ward: "Ward No. 1",
    address: "Nepalgunj, Banke, Nepal",
    phone: "081-000000",
    email: "info@nepalgunj.gov.np",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-blue-950">
          System Settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage municipality and ward information.
        </p>
      </div>

      {/* SETTINGS CARD */}
      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* CARD HEADER */}
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">

          <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
            <Settings size={22} />
          </div>

          <div>
            <h2 className="font-bold text-blue-950">
              Municipality Information
            </h2>

            <p className="text-sm text-slate-500">
              Update your ward and municipality details.
            </p>
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >

          {/* MUNICIPALITY */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Municipality Name
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="municipality"
                value={formData.municipality}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* WARD */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Ward
            </label>

            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Contact Number
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* SAVE */}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-950"
          >
            <Save size={18} />
            Save Settings
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminSettings;