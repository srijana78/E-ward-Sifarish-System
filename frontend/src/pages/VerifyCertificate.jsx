import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2, ArrowLeft } from "lucide-react";
import { apiFetch } from "../services/api";

function VerifyCertificate() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading"); // "loading" | "valid" | "invalid"
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

   const check = async () => {
  try {
    const res = await apiFetch(`/applications/verify/${id}`);
    if (cancelled) return;

    if (res.valid) {
      setData(res);
      setStatus("valid");
    } else {
      setStatus("invalid");
    }
  } catch {
    if (!cancelled) setStatus("invalid");
  }
};

    check();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-3 py-5 sm:px-5">
      <div className="flex min-h-[calc(100vh-112px)] items-center justify-center">
        <div className="w-full max-w-[420px]">
          <div className="overflow-hidden rounded-3xl bg-white px-6 py-8 text-center shadow-xl shadow-slate-200/60">
            {status === "loading" && (
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm">Checking certificate...</p>
              </div>
            )}

            {status === "valid" && data && (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle2 className="text-green-600" size={48} />
                <h1 className="text-lg font-bold text-slate-800">
                  Certificate is Authentic
                </h1>
                <p className="text-sm text-slate-500">
                  Issued through the E-Ward Sifarish digital system
                </p>

                <div className="mt-3 w-full space-y-1.5 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Application No:</span>{" "}
                    {data.applicationNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Issued to:</span>{" "}
                    {data.applicantName}
                  </p>
                  <p>
                    <span className="font-semibold">Service:</span>{" "}
                    {data.service}
                  </p>
                  <p>
                    <span className="font-semibold">Approved on:</span>{" "}
                    {new Date(data.approvedOn).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            )}

            {status === "invalid" && (
              <div className="flex flex-col items-center gap-3">
                <XCircle className="text-red-500" size={48} />
                <h1 className="text-lg font-bold text-slate-800">
                  Certificate Not Found
                </h1>
                <p className="text-sm text-slate-500">
                  This certificate could not be verified. It may be invalid,
                  altered, or no longer active.
                </p>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default VerifyCertificate;