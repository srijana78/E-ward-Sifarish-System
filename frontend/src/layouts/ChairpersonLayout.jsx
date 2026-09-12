import { Outlet } from "react-router-dom";
import { useState } from "react";
import ChairpersonSidebar from "../components/chairperson/ChairpersonSidebar";

const ChairpersonLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <ChairpersonSidebar open={open} setOpen={setOpen} />

      <main className="min-h-screen p-4 pt-20 lg:ml-72 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ChairpersonLayout;