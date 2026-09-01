import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewApplication() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    fullName: "Srijana Bhakri",
    citizenshipNumber: "",
    phone: "",
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    address: "",
    purpose: "",
    paymentMethod: "",
    paymentVoucher: null,
    citizenshipDocument: null,
    supportingDocument: null,
  });

  const [currentStep, setCurrentStep] = useState(1);


  // ==========================
  // FORM CHANGE
  // ==========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ==========================
  // FILE CHANGE
  // ==========================

  const handleFileChange = (e) => {

    const { name, files } = e.target;

    if (files && files[0]) {

      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

    }

  };


  // ==========================
  // NEXT STEP
  // ==========================

  const handleNext = () => {

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }

  };


  // ==========================
  // PREVIOUS STEP
  // ==========================

  const handlePrevious = () => {

    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }

  };


  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Application:", formData);

    alert("Application submitted successfully!");

    navigate("/citizen/applications");

  };


  // ==========================
  // STEPS
  // ==========================

  const steps = [
    {
      number: 1,
      title: "Service",
      nepali: "सेवा",
    },
    {
      number: 2,
      title: "Information",
      nepali: "विवरण",
    },
    {
      number: 3,
      title: "Documents",
      nepali: "कागजात",
    },
    {
      number: 4,
      title: "Review",
      nepali: "समीक्षा",
    },
  ];


  return (

    <div className="max-w-7xl mx-auto">

      {/* ==========================
          PAGE HEADER
      =========================== */}

      <div className="mb-6">

        <button
          onClick={() => navigate("/citizen/dashboard")}
          className="text-sm text-slate-500 hover:text-blue-700 mb-3 transition"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          New Application
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          नयाँ सिफारिसको लागि आवेदन दिनुहोस्
        </p>

      </div>


      {/* ==========================
          MAIN CARD
      =========================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">


        {/* ==========================
            PROGRESS BAR
        =========================== */}

        <div className="px-5 sm:px-8 py-6 border-b border-slate-100">

          <div className="flex items-center justify-between">

            {steps.map((step, index) => (

              <div
                key={step.number}
                className="flex items-center flex-1"
              >

                {/* Step */}
                <div className="flex items-center gap-2">

                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center
                      text-sm font-bold shrink-0
                      ${
                        currentStep >= step.number
                          ? "bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-400"
                      }
                    `}
                  >
                    {currentStep > step.number
                      ? "✓"
                      : step.number}
                  </div>

                  <div className="hidden sm:block">

                    <p
                      className={`text-xs font-semibold ${
                        currentStep >= step.number
                          ? "text-blue-700"
                          : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {step.nepali}
                    </p>

                  </div>

                </div>


                {/* Connector */}
                {index < steps.length - 1 && (

                  <div className="flex-1 mx-3 sm:mx-5">

                    <div
                      className={`h-0.5 ${
                        currentStep > step.number
                          ? "bg-blue-700"
                          : "bg-slate-200"
                      }`}
                    />

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>


        {/* ==========================
            FORM
        =========================== */}

        <form onSubmit={handleSubmit}>

          <div className="p-5 sm:p-8">


            {/* =====================================
                STEP 1 — SERVICE
            ====================================== */}

            {currentStep === 1 && (

              <div className="max-w-3xl">

                <div className="mb-7">

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Select a Service
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    तपाईंलाई आवश्यक पर्ने सिफारिस सेवा छान्नुहोस्।
                  </p>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                  {/* Residence */}
                  <label
                    className={`
                      cursor-pointer border rounded-xl p-5 transition
                      ${
                        formData.service === "residence"
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="service"
                      value="residence"
                      checked={formData.service === "residence"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                        🏠
                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          Residence Recommendation
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          बसोबास प्रमाणित सिफारिस
                        </p>

                      </div>

                    </div>

                  </label>


                  {/* Relationship */}
                  <label
                    className={`
                      cursor-pointer border rounded-xl p-5 transition
                      ${
                        formData.service === "relationship"
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="service"
                      value="relationship"
                      checked={formData.service === "relationship"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
                        👨‍👩‍👧
                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          Relationship Certificate
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          नाता प्रमाणित
                        </p>

                      </div>

                    </div>

                  </label>


                  {/* Land */}
                  <label
                    className={`
                      cursor-pointer border rounded-xl p-5 transition
                      ${
                        formData.service === "land"
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="service"
                      value="land"
                      checked={formData.service === "land"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                        📄
                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          Land Recommendation
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          जग्गा सम्बन्धी सिफारिस
                        </p>

                      </div>

                    </div>

                  </label>


                  {/* Other */}
                  <label
                    className={`
                      cursor-pointer border rounded-xl p-5 transition
                      ${
                        formData.service === "other"
                          ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="service"
                      value="other"
                      checked={formData.service === "other"}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                        ⋯
                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          Other Recommendation
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          अन्य सिफारिस
                        </p>

                      </div>

                    </div>

                  </label>

                </div>

              </div>

            )}


            {/* =====================================
                STEP 2 — INFORMATION
            ====================================== */}

            {currentStep === 2 && (

              <div className="max-w-4xl">

                <div className="mb-7">

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Applicant Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    आवेदकको विवरण भर्नुहोस्।
                  </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                  {/* Full Name */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>

                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Citizenship */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Citizenship Number
                    </label>

                    <input
                      name="citizenshipNumber"
                      value={formData.citizenshipNumber}
                      onChange={handleChange}
                      type="text"
                      placeholder="XX-XX-XXXXXXX"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Phone */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="98XXXXXXXX"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Province */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Province
                    </label>

                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >

                      <option value="">
                        Select Province
                      </option>

                      <option value="koshi">
                        Koshi Province
                      </option>

                      <option value="madhesh">
                        Madhesh Province
                      </option>

                      <option value="bagmati">
                        Bagmati Province
                      </option>

                      <option value="gandaki">
                        Gandaki Province
                      </option>

                      <option value="lumbini">
                        Lumbini Province
                      </option>

                      <option value="karnali">
                        Karnali Province
                      </option>

                      <option value="sudurpaschim">
                        Sudurpashchim Province
                      </option>

                    </select>

                  </div>


                  {/* District */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      District
                    </label>

                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter district"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Municipality */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Municipality / Rural Municipality
                    </label>

                    <input
                      name="municipality"
                      value={formData.municipality}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter municipality"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Ward */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Ward Number
                    </label>

                    <input
                      name="wardNumber"
                      value={formData.wardNumber}
                      onChange={handleChange}
                      type="number"
                      min="1"
                      max="32"
                      placeholder="Ward No."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Address */}
                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Address
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter your complete address"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>


                  {/* Purpose */}
                  <div className="md:col-span-2">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Purpose of Recommendation
                    </label>

                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Explain why you need this recommendation..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>

            )}


            {/* =====================================
                STEP 3 — DOCUMENTS
            ====================================== */}

            {currentStep === 3 && (

              <div className="max-w-3xl">

                <div className="mb-7">

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Upload Documents
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    आवश्यक कागजातहरू अपलोड गर्नुहोस्।
                  </p>

                </div>


                <div className="space-y-5">


                  {/* Citizenship */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Citizenship Certificate
                      <span className="text-red-500 ml-1">*</span>
                    </label>

                    <label className="flex flex-col sm:flex-row sm:items-center gap-4 border-2 border-dashed border-slate-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition">

                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg">
                        📄
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-semibold text-slate-700">
                          {formData.citizenshipDocument
                            ? formData.citizenshipDocument.name
                            : "Choose citizenship document"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          PDF, JPG or PNG · Maximum 5MB
                        </p>

                      </div>

                      <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                        Browse
                      </span>

                      <input
                        type="file"
                        name="citizenshipDocument"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                  </div>


                  {/* Supporting Document */}
                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Supporting Document
                      <span className="text-slate-400 ml-1">
                        (Optional)
                      </span>
                    </label>

                    <label className="flex flex-col sm:flex-row sm:items-center gap-4 border-2 border-dashed border-slate-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition">

                      <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-lg">
                        📎
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-semibold text-slate-700">
                          {formData.supportingDocument
                            ? formData.supportingDocument.name
                            : "Choose supporting document"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          PDF, JPG or PNG · Maximum 5MB
                        </p>

                      </div>

                      <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                        Browse
                      </span>

                      <input
                        type="file"
                        name="supportingDocument"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                  </div>


                  {/* Payment */}
                  <div className="pt-5 border-t border-slate-100">

                    <h3 className="font-semibold text-slate-900">
                      Payment Voucher
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Upload your bank or mobile wallet payment receipt.
                    </p>


                    <div className="mt-4">

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Payment Method
                      </label>

                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      >

                        <option value="">
                          Select payment method
                        </option>

                        <option value="bank">
                          Bank Transfer
                        </option>

                        <option value="esewa">
                          eSewa
                        </option>

                        <option value="khalti">
                          Khalti
                        </option>

                      </select>

                    </div>


                    <label className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 border-2 border-dashed border-slate-200 rounded-xl p-5 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition">

                      <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-lg">
                        💳
                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-semibold text-slate-700">
                          {formData.paymentVoucher
                            ? formData.paymentVoucher.name
                            : "Upload payment voucher"}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Screenshot, PDF, JPG or PNG
                        </p>

                      </div>

                      <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">
                        Browse
                      </span>

                      <input
                        type="file"
                        name="paymentVoucher"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                    </label>

                  </div>

                </div>

              </div>

            )}


            {/* =====================================
                STEP 4 — REVIEW
            ====================================== */}

            {currentStep === 4 && (

              <div className="max-w-4xl">

                <div className="mb-7">

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Review Application
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    आवेदन पेश गर्नु अघि आफ्नो विवरण जाँच गर्नुहोस्।
                  </p>

                </div>


                {/* Service */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">

                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">

                    <h3 className="font-semibold text-slate-800">
                      Service Information
                    </h3>

                  </div>

                  <div className="p-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      <div>

                        <p className="text-xs text-slate-400">
                          Service
                        </p>

                        <p className="text-sm font-semibold text-slate-800 mt-1">
                          {formData.service || "Not selected"}
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-slate-400">
                          Application Fee
                        </p>

                        <p className="text-sm font-semibold text-slate-800 mt-1">
                          Rs. 100
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Applicant */}
                <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden">

                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">

                    <h3 className="font-semibold text-slate-800">
                      Applicant Information
                    </h3>

                  </div>

                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                      <p className="text-xs text-slate-400">
                        Full Name
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        {formData.fullName || "-"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs text-slate-400">
                        Citizenship Number
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        {formData.citizenshipNumber || "-"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs text-slate-400">
                        Phone
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        {formData.phone || "-"}
                      </p>
                    </div>


                    <div>
                      <p className="text-xs text-slate-400">
                        Ward
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        {formData.wardNumber || "-"}
                      </p>
                    </div>


                    <div className="sm:col-span-2">

                      <p className="text-xs text-slate-400">
                        Address
                      </p>

                      <p className="text-sm font-semibold text-slate-800 mt-1">
                        {formData.address || "-"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Documents */}
                <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden">

                  <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">

                    <h3 className="font-semibold text-slate-800">
                      Documents
                    </h3>

                  </div>

                  <div className="p-5 space-y-3">

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                          📄
                        </div>

                        <span className="text-sm text-slate-700">
                          Citizenship Certificate
                        </span>

                      </div>

                      <span className="text-xs font-semibold text-green-600">
                        {formData.citizenshipDocument
                          ? "Uploaded ✓"
                          : "Not uploaded"}
                      </span>

                    </div>


                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                          💳
                        </div>

                        <span className="text-sm text-slate-700">
                          Payment Voucher
                        </span>

                      </div>

                      <span className="text-xs font-semibold text-green-600">
                        {formData.paymentVoucher
                          ? "Uploaded ✓"
                          : "Not uploaded"}
                      </span>

                    </div>

                  </div>

                </div>


                {/* Declaration */}
                <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl">

                  <div className="flex items-start gap-3">

                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 accent-blue-700"
                    />

                    <p className="text-sm text-blue-900 leading-relaxed">
                      I confirm that the information and documents
                      provided in this application are true and
                      accurate to the best of my knowledge.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ==========================
              FOOTER ACTIONS
          =========================== */}

          <div className="px-5 sm:px-8 py-5 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>


            {currentStep < 4 ? (

              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition shadow-sm"
              >
                Continue →
              </button>

            ) : (

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition shadow-sm"
              >
                Submit Application
              </button>

            )}

          </div>

        </form>

      </div>

    </div>

  );
}

export default NewApplication;