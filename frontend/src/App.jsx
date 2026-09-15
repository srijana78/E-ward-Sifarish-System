import { Routes, Route, Navigate } from "react-router-dom";

// ================= LAYOUTS =================
import MainLayout from "./layouts/MainLayout";
import CitizenDashboardLayout from "./layouts/CitizenDashboardLayout";
import FrontOfficeLayout from "./layouts/FrontOfficeLayout";
import SecretaryLayout from "./layouts/SecretaryLayout";
import ChairpersonLayout from "./layouts/ChairpersonLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";

// ================= PUBLIC PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ================= CITIZEN PAGES =================
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import NewApplication from "./pages/citizen/NewApplication";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";
import Documents from "./pages/citizen/Documents";
import Payment from "./pages/citizen/Payment";
import ReviewSubmit from "./pages/citizen/ReviewSubmit";
import MyApplications from "./pages/citizen/MyApplications";
import ApplicationView from "./pages/citizen/ApplicationView";

// ================= FRONT OFFICE PAGES =================
import FrontOfficeDashboard from "./pages/frontoffice/FrontOfficeDashboard";
import PendingApplications from "./pages/frontoffice/PendingApplications";
import VerifiedApplications from "./pages/frontoffice/VerifiedApplications";
import Notifications from "./pages/frontoffice/Notifications";
// import Reports from "./pages/frontoffice/Reports";
// import Settings from "./pages/frontoffice/Settings";
import FrontOfficeApplicationDetails from "./pages/frontoffice/FrontOfficeApplicationDetails";

// ================= SECRETARY PAGES =================
import SecretaryDashboard from "./pages/secretary/SecretaryDashboard";
import SecretaryApplications from "./pages/secretary/SecretaryApplications";
import SecretaryApplicationDetails from "./pages/secretary/SecretaryApplicationDetails";
import SecretaryRecommended from "./pages/secretary/SecretaryRecommended";

// ================= CHAIRPERSON PAGES =================
import ChairpersonDashboard from "./pages/chairperson/ChairpersonDashboard";
import ChairpersonApplications from "./pages/chairperson/ChairpersonApplications";
import ChairpersonApplicationDetails from "./pages/chairperson/ChairpersonApplicationDetails";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import StaffManagement from "./pages/admin/StaffManagement";
import CreateStaff from "./pages/admin/CreateStaff";
import StaffDetails from "./pages/admin/StaffDetails";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= CITIZEN ================= */}

      <Route
        path="/citizen"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <CitizenDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CitizenDashboard />} />

        <Route path="apply" element={<NewApplication />} />
        <Route path="apply/details" element={<ApplicationDetails />} />
        <Route path="apply/documents" element={<Documents />} />
        <Route path="apply/payment" element={<Payment />} />
        <Route path="apply/review" element={<ReviewSubmit />} />

        <Route path="applications" element={<MyApplications />} />
        <Route path="applications/:id" element={<ApplicationView />} />

        <Route path="payments" element={<Payment />} />
      </Route>

      {/* ================= FRONT OFFICE ================= */}

      <Route
        path="/frontoffice"
        element={
          <ProtectedRoute allowedRoles={["frontoffice"]}>
            <FrontOfficeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FrontOfficeDashboard />} />

        <Route path="pending" element={<PendingApplications />} />
        <Route path="verified" element={<VerifiedApplications />} />

        <Route
          path="application/:id"
          element={<FrontOfficeApplicationDetails />}
        />

        <Route path="notifications" element={<Notifications />} />
        {/* <Route path="reports" element={<Reports />} /> */}
        {/* <Route path="settings" element={<Settings />} /> */}
      </Route>

      {/* ================= SECRETARY ================= */}
      <Route
        path="/secretary"
        element={
          <ProtectedRoute allowedRoles={["secretary"]}>
            <SecretaryLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SecretaryDashboard />} />

        <Route path="applications" element={<SecretaryApplications />} />

        <Route
          path="application/:id"
          element={<SecretaryApplicationDetails />}
        />

        <Route path="recommended" element={<SecretaryRecommended />} />
      </Route>
      {/* ================= CHAIRPERSON ================= */}

      <Route
        path="/chairperson"
        element={
          <ProtectedRoute allowedRoles={["chairperson"]}>
            <ChairpersonLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ChairpersonDashboard />} />

        <Route path="applications" element={<ChairpersonApplications />} />

        <Route
          path="application/:id"
          element={<ChairpersonApplicationDetails />}
        />
      </Route>

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          // <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="staff" element={<StaffManagement />} />

        <Route path="staff/:id" element={<StaffDetails />} />
        <Route path="create-staff" element={<CreateStaff />} />
      </Route>

      {/* ================= FALLBACK ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
