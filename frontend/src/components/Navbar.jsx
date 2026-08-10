import React from "react";
import { LogOut, User, FileText } from 'lucide-react';
function Navbar() {
  return (
    <nav className="  bg-primary  text-black shadow-md px-6 py-4 flex justify-between items-center ">

      <div className=" flex  items-center  space-x-3 ">

        <FileText className=" text-yellow-400 h-8 w-8" />

        <div >
          <h1 className=" font-bold text-lg leading-tight ">E-ward Sifarish Portal</h1>
          <p className=" text-xs text-blue-400"> Government of Nepal , Ward Management System</p>

        </div>

      </div>


<div className=" flex items-center space-x-4">


    <div className=" flex items-center space-x-2 bg-blue-500 px-3 py-1.5 rounded-full  text-sm cursor-pointer">
        <User className="h-4 w-4"/>
        <span>srijana Admin </span>
    </div>

        <button className=" flex space-x-1 items-center text-sm bg-red-600    
        hover:bg-red-800 px-3 py-1.5 rounded transition cursor-pointer">
            <LogOut className="h-4 w-4"/>
            <span>Logout</span>
        </button>

</div>


    </nav>
  );
}

export default Navbar;
