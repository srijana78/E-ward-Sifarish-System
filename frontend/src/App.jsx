import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import CitizenLayout from "./layouts/CitizenLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Citizen
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import NewApplication from "./pages/citizen/NewApplication";
import MyApplications from "./pages/citizen/MyApplications";
import ApplicationDetails from "./pages/citizen/ApplicationDetails";

// Front Office
import FrontOfficeDashboard from "./pages/frontoffice/FrontOfficeDashboard";
import FrontOfficeApplicationDetails from "./pages/frontoffice/FrontOfficeApplicationDetails";
import Applications from "./pages/frontoffice/Applications";

import Notifications from "./pages/frontoffice/Notifications";
import PendingReview from "./pages/frontoffice/PendingReview";
import Reports from "./pages/frontoffice/Reports";
import Settings from "./pages/frontoffice/Settings";
import Verified from "./pages/frontoffice/Verified";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC
        ========================== */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        {/* =========================
            CITIZEN
        ========================== */}

        <Route element={<CitizenLayout />}>
          <Route
            path="/citizen/dashboard"
            element={<CitizenDashboard />}
          />

          <Route
            path="/citizen/new-application"
            element={<NewApplication />}
          />

          <Route
            path="/citizen/applications"
            element={<MyApplications />}
          />

          <Route
            path="/citizen/applications/:id"
            element={<ApplicationDetails />}
          />
        </Route>


        {/* =========================
            FRONT OFFICE
        ========================== */}

 <Route path="/frontoffice" element={<AdminLayout />}>

  {/* Dashboard */}
  <Route
    path="dashboard"
    element={<FrontOfficeDashboard />}
  />

  {/* All Applications */}
  <Route
    path="applications"
    element={<Applications />}
  />

  {/* Application Details */}
  <Route
    path="applications/:id"
    element={<FrontOfficeApplicationDetails />}
  />

  {/* Notifications */}
  <Route
    path="notifications"
    element={<Notifications />}
  />

  {/* Pending Review */}
  <Route
    path="pending"
    element={<PendingReview />}
  />

  {/* Reports */}
  <Route
    path="reports"
    element={<Reports />}
  />

  {/* Verified Applications */}
  <Route
    path="verified"
    element={<Verified />}
  />

  {/* Settings */}
  <Route
    path="settings"
    element={<Settings />}
  />

</Route>
        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-slate-800">
                  404
                </h1>

                <p className="text-slate-500 mt-2">
                  Page not found
                </p>
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;