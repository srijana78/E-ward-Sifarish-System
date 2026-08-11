import React from "react";
import { FileText } from "lucide-react";

function CitizenDashboard() {
  return (
   <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        
        {/* Brand & Emblem */}
        <div className="flex items-center space-x-3.5">
          <div className="bg-blue-600/15 p-2 rounded-xl border border-blue-500/20 text-yellow-400 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-sm tracking-wide text-white">E-Ward Sifarish Portal</h1>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded font-semibold">Nepal Digital Service</span>
            </div>
            <p className="text-[11px] text-slate-400">Ward No. 04 Municipal Office Executive</p>
          </div>
        </div>

        {/* User Account Bar */}
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center space-x-2.5 bg-slate-800/60 border border-slate-700/50 pl-3 pr-4 py-1.5 rounded-full text-xs font-medium text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Ramesh Shrestha</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-mono text-[11px]">27-01-78-12345</span>
          </div>

          <button className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-3.5 py-2 rounded-xl transition cursor-pointer">
            Sign Out
          </button>
        </div>
      </header>





      {/*  Main Body Content */}


      <main className=" ">
        {/* Banner Section */}
<div className=" bg-gradient-to-r from-slate-900 via-slate-900  to-slate-800/80  border border-slate-800 p-6  md:p-8 rounded-2xl  flex  flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden   ">
  <div className=" absolute  -right-10  -bottom-10  w-48  h-48  bg-blue-600/5 rounded-full blur-3xl pointer-events-none">

 <div className="space-y-1  relative z-10 max-w-xl">
  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Citizen Sifarish Desk</h2>
  <p className="text-xs md:text-sm text-slate-400 leading-relaxed"> Submit digital application for local governace recommendations,  track real-time verification stages, and download QR-signed  PDF certificates.</p>
 </div>

{/* Action Selector */}
<div>
  <button>Application </button>
  <button> + Apply New Request</button>

</div>



  </div>




</div>

      </main>
    </div>
  );
}

export default CitizenDashboard;
