import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";


function App() {
  return (
    <Routes>
      {/* Redirect home route to login */}
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}

      {/* Authentication routes */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      {/* Citizen Dashboard */}
      <Route path="/citizen" element={<CitizenDashboard />} />
      <Route path="/" element={<Navigate to="/citizen" />} />



      {/* Admin dashboard */}

     
  {/* <Route path="/admin" element={<AdminDashboardLayout />} /> */}


   {/* Redirect home to Admin Dashboard */}
      {/* <Route path="/" element={<Navigate to="/admin" />} /> */}

    </Routes>



  );
}

export default App;