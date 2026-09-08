import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import CitizenDashboardLayout from "./layouts/CitizenDashboardLayout";
import FrontOfficeLayout from "./layouts/FrontOfficeLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Citizen Pages
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import NewApplication from "./pages/citizen/NewApplication";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";
import Documents from "./pages/citizen/Documents";
import Payment from "./pages/citizen/Payment";
import ReviewSubmit from "./pages/citizen/ReviewSubmit";
import MyApplications from "./pages/citizen/MyApplications";

// Front Office Pages
import FrontOfficeDashboard from "./pages/frontoffice/FrontOfficeDashboard";
import PendingApplications from "./pages/frontoffice/PendingApplications";
import VerifiedApplications from "./pages/frontoffice/VerifiedApplications";
import Notifications from "./pages/frontoffice/Notifications";
import Reports from "./pages/frontoffice/Reports";
import Settings from "./pages/frontoffice/Settings";
import FrontOfficeApplicationDetails from "./pages/frontoffice/FrontOfficeApplicationDetails";
function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= CITIZEN PORTAL ================= */}

      <Route
        path="/citizen"
        element={<CitizenDashboardLayout />}
      >
        <Route index element={<CitizenDashboard />} />

        {/* Application Flow */}
        <Route path="apply" element={<NewApplication />} />
        <Route
          path="apply/details"
          element={<ApplicationDetails />}
        />
        <Route
          path="apply/documents"
          element={<Documents />}
        />
        <Route
          path="apply/payment"
          element={<Payment />}
        />
        <Route
          path="apply/review"
          element={<ReviewSubmit />}
        />

        {/* My Applications */}
        <Route
          path="applications"
          element={<MyApplications />}
        />

        {/* Payment Voucher */}
        <Route path="payments" element={<Payment />} />
      </Route>

      {/* ============== FRONT OFFICE PORTAL ============== */}

     <Route path="/frontoffice" element={<FrontOfficeLayout />}>
  <Route index element={<FrontOfficeDashboard />} />

  <Route path="pending" element={<PendingApplications />} />

  <Route path="verified" element={<VerifiedApplications />} />

  <Route
    path="application/:id"
    element={<FrontOfficeApplicationDetails />}
  />

  <Route path="notifications" element={<Notifications />} />

  <Route path="reports" element={<Reports />} />

  <Route path="settings" element={<Settings />} />
</Route>

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;