// import React, { useEffect, useState } from "react";
// import {
// FileText,
// Clock3,
// CheckCircle2,
// XCircle,
// Eye,
// X,
// User,
// MapPin,
// Receipt,
// } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";

// const MyApplications = () => {
// const { token } = useAuth();

// const [applications, setApplications] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState("");
// const [selectedApplication, setSelectedApplication] = useState(null);

// useEffect(() => {
// const fetchApplications = async () => {
// try {
// const authToken =
// token || localStorage.getItem("sifarish_token");


//     const response = await fetch(
//       "http://localhost:5000/api/applications/my-applications",
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         data.message || "Failed to fetch applications"
//       );
//     }

//     setApplications(data.applications || []);
//   } catch (error) {
//     console.error(error);
//     setError(error.message || "Failed to load applications");
//   } finally {
//     setLoading(false);
//   }
// };

// fetchApplications();


// }, [token]);

// const statusInfo = {
// submitted: {
// label: "Submitted",
// icon: Clock3,
// color: "bg-amber-50 text-amber-700",
// },
// pending: {
// label: "Pending",
// icon: Clock3,
// color: "bg-amber-50 text-amber-700",
// },
// under_review: {
// label: "Under Review",
// icon: Clock3,
// color: "bg-blue-50 text-blue-700",
// },
// approved: {
//   label: "Approved",
//   icon: CheckCircle2,
//   color: "bg-green-50 text-green-700",
// },
// verified: {
//   label: "Verified by Secretary",
//   icon: CheckCircle2,
//   color: "bg-purple-50 text-purple-700",
// },
// rejected: {
// label: "Rejected",
// icon: XCircle,
// color: "bg-red-50 text-red-700",
// },
// };

// const Status = ({ status }) => {
// const info = statusInfo[status] || statusInfo.submitted;
// const Icon = info.icon;


// return (
//   <span
//     className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${info.color}`}
//   >
//     <Icon size={15} />
//     {info.label}
//   </span>
// );


// };

// return ( <div className="space-y-6">
// {/* HEADER */} <div> <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
// My Services </p>


//     <h1 className="mt-2 text-3xl font-extrabold text-blue-950">
//       My Applications
//     </h1>

//     <p className="mt-2 text-sm text-slate-500">
//       Track and view your submitted applications.
//     </p>
//   </div>

//   {error && (
//     <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
//       {error}
//     </div>
//   )}

//   {/* APPLICATION LIST */}
//   <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//     <div className="border-b border-slate-200 p-5">
//       <h2 className="font-bold text-blue-950">
//         Submitted Applications
//       </h2>

//       <p className="mt-1 text-sm text-slate-500">
//         {applications.length} application(s) found
//       </p>
//     </div>

//     {loading ? (
//       <div className="p-10 text-center text-slate-500">
//         Loading applications...
//       </div>
//     ) : applications.length === 0 ? (
//       <div className="p-10 text-center">
//         <FileText
//           size={40}
//           className="mx-auto text-slate-300"
//         />

//         <h3 className="mt-4 font-bold text-blue-950">
//           No Applications Found
//         </h3>

//         <p className="mt-2 text-sm text-slate-500">
//           You haven't submitted any applications yet.
//         </p>
//       </div>
//     ) : (
//       <div className="divide-y divide-slate-100">
//         {applications.map((application) => (
//           <div
//             key={application._id}
//             className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
//           >
//             <div className="flex items-center gap-4">
//               <div className="rounded-xl bg-blue-50 p-3 text-blue-900">
//                 <FileText size={22} />
//               </div>

//               <div>
//                 <h3 className="font-bold text-blue-950">
//                   {application.service}
//                 </h3>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Application ID:{" "}
//                   {application.applicationNumber ||
//                     application._id}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Submitted:{" "}
//                   {new Date(
//                     application.createdAt
//                   ).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Status status={application.status} />

//               <button
//                 onClick={() =>
//                   setSelectedApplication(application)
//                 }
//                 className="rounded-lg bg-blue-50 p-2.5 text-blue-900 transition hover:bg-blue-900 hover:text-white"
//                 title="View Application"
//               >
//                 <Eye size={18} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>

//   {/* VIEW APPLICATION MODAL */}
//   {selectedApplication && (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
//       <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//         {/* MODAL HEADER */}
//         <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-5">
//           <div>
//             <h2 className="text-xl font-bold text-blue-950">
//               Application Details
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               {selectedApplication.applicationNumber ||
//                 selectedApplication._id}
//             </p>
//           </div>

//           <button
//             onClick={() => setSelectedApplication(null)}
//             className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-6 p-5">

//           {/* STATUS */}
//           <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
//             <div>
//               <p className="text-xs text-slate-500">
//                 Service
//               </p>

//               <p className="mt-1 font-bold text-blue-950">
//                 {selectedApplication.service}
//               </p>
//             </div>

//             <Status status={selectedApplication.status} />
//           </div>

//           {/* APPLICANT DETAILS */}
//           <DetailSection
//             icon={User}
//             title="Applicant Information"
//           >
//             <DetailGrid
//               data={[
//                 [
//                   "Full Name",
//                   selectedApplication.applicantDetails?.fullName,
//                 ],
//                 [
//                   "Citizenship Number",
//                   selectedApplication.applicantDetails
//                     ?.citizenshipNumber,
//                 ],
//                 [
//                   "Date of Birth",
//                   selectedApplication.applicantDetails
//                     ?.dateOfBirth,
//                 ],
//                 [
//                   "Phone",
//                   selectedApplication.applicantDetails?.phone,
//                 ],
//                 [
//                   "Email",
//                   selectedApplication.applicantDetails?.email,
//                 ],
//               ]}
//             />
//           </DetailSection>

//           {/* ADDRESS */}
//           <DetailSection
//             icon={MapPin}
//             title="Address Information"
//           >
//             <DetailGrid
//               data={[
//                 [
//                   "Province",
//                   selectedApplication.address?.province,
//                 ],
//                 [
//                   "District",
//                   selectedApplication.address?.district,
//                 ],
//                 [
//                   "Municipality",
//                   selectedApplication.address?.municipality,
//                 ],
//                 [
//                   "Ward Number",
//                   selectedApplication.address?.wardNumber,
//                 ],
//                 [
//                   "Tole",
//                   selectedApplication.address?.tole,
//                 ],
//               ]}
//             />
//           </DetailSection>

//           {/* DOCUMENTS */}
//           <DetailSection
//             icon={FileText}
//             title="Documents"
//           >
//             {selectedApplication.documents?.length ? (
//               <div className="space-y-2">
//                 {selectedApplication.documents.map(
//                   (document, index) => (
//                     <div
//                       key={index}
//                       className="rounded-lg bg-slate-50 p-3"
//                     >
//                       <p className="font-semibold text-slate-700">
//                         {document.documentType}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-500">
//                         {document.fileName || "Document uploaded"}
//                       </p>
//                     </div>
//                   )
//                 )}
//               </div>
//             ) : (
//               <p className="text-sm text-slate-500">
//                 No documents available.
//               </p>
//             )}
//           </DetailSection>

//           {/* PAYMENT */}
//           <DetailSection
//             icon={Receipt}
//             title="Payment Information"
//           >
//             <DetailGrid
//               data={[
//                 [
//                   "Voucher",
//                   selectedApplication.payment?.voucherName,
//                 ],
//                 [
//                   "Payment Status",
//                   selectedApplication.payment?.status,
//                 ],
//               ]}
//             />
//           </DetailSection>

//           {/* REMARKS */}
//           {selectedApplication.remarks && (
//             <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
//               <p className="text-sm font-bold text-blue-950">
//                 Remarks
//               </p>

//               <p className="mt-2 text-sm text-blue-800">
//                 {selectedApplication.remarks}
//               </p>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   )}
// </div>


// );
// };

// /* REUSABLE SECTION */
// const DetailSection = ({ icon: Icon, title, children }) => (

//   <section className="rounded-xl border border-slate-200 p-4">
//     <div className="mb-4 flex items-center gap-2">
//       <Icon size={19} className="text-blue-900" />


//   <h3 className="font-bold text-blue-950">
//     {title}
//   </h3>
// </div>

// {children}


//   </section>
// );

// /* REUSABLE DETAILS GRID */
// const DetailGrid = ({ data }) => (

//   <div className="grid gap-4 sm:grid-cols-2">
//     {data.map(([label, value]) => (
//       <div key={label}>
//         <p className="text-xs font-semibold text-slate-400">
//           {label}
//         </p>


//     <p className="mt-1 text-sm font-medium text-slate-700">
//       {value || "-"}
//     </p>
//   </div>
// ))}


//   </div>
// );

// export default MyApplications;
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  CalendarDays,
  Hash,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const MyApplications = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const authToken =
          token || localStorage.getItem("sifarish_token");

        const response = await fetch(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch applications"
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const statusInfo = {
    submitted: {
      label: "Submitted",
      icon: Clock3,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },

    pending: {
      label: "Pending",
      icon: Clock3,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },

    under_review: {
      label: "Under Review",
      icon: Clock3,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },

    verified: {
      label: "Verified by Secretary",
      icon: CheckCircle2,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },

    approved: {
      label: "Approved",
      icon: CheckCircle2,
      color: "bg-green-50 text-green-700 border-green-200",
    },

    rejected: {
      label: "Rejected",
      icon: XCircle,
      color: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const Status = ({ status }) => {
    const info =
      statusInfo[status?.toLowerCase()] ||
      statusInfo.submitted;

    const Icon = info.icon;

    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${info.color}`}
      >
        <Icon size={15} />
        {info.label}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-7 pb-10">

      {/* HEADER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">
          My Services
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
          My Applications
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Track the status of your submitted applications and
          view complete application details.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          <XCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* APPLICATION CONTAINER */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* SECTION HEADER */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-blue-950">
                Submitted Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your application history and current status
              </p>
            </div>

            <div className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-900">
              {applications.length} Application
              {applications.length !== 1 ? "s" : ""}
            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="p-12 text-center">

            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-800" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading your applications...
            </p>

          </div>
        ) : applications.length === 0 ? (

          /* EMPTY STATE */
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
              <FileText size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-blue-950">
              No Applications Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't submitted any applications yet.
              Once you submit an application, it will appear
              here.
            </p>

          </div>
        ) : (

          /* APPLICATION LIST */
          <div className="space-y-4 bg-slate-50/50 p-4 sm:p-6">

            {applications.map((application) => (

              <div
                key={application._id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
              >

                <div className="flex flex-col gap-5">

                  {/* TOP SECTION */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    {/* SERVICE */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                        <FileText size={23} />
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-blue-950 sm:text-xl">
                          {application.service}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                          <Hash size={15} />

                          <span className="font-medium">
                            {application.applicationNumber ||
                              application._id}
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* STATUS */}
                    <div>
                      <Status status={application.status} />
                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                      <CalendarDays
                        size={18}
                        className="text-slate-500"
                      />

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Submitted Date
                        </p>

                        <p className="mt-0.5 text-sm font-semibold text-slate-700">
                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                      <Clock3
                        size={18}
                        className="text-slate-500"
                      />

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Current Status
                        </p>

                        <p className="mt-0.5 text-sm font-semibold capitalize text-slate-700">
                          {application.status
                            ?.replace(/_/g, " ") || "Submitted"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* ACTION */}
                  <div className="flex justify-end border-t border-slate-100 pt-4">

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/citizen/applications/${application._id}`
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-950 sm:w-auto"
                    >
                      <Eye size={17} />

                      View Application

                      <ArrowRight size={17} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;