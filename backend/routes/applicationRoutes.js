const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const requireRole = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

const ctrl = require("../controllers/applicationController");

// --- PUBLIC: QR code scan lands here, no login needed ---

router.get("/verify/:id", ctrl.verifyCertificate);

// --- CITIZEN ---

router.post(
  "/",
  auth,
  requireRole("citizen"),
  upload.fields([
    { name: "documents", maxCount: 10 },
    { name: "voucher", maxCount: 1 },
  ]),
  ctrl.submitApplication
);

router.get(
  "/my-applications",
  auth,
  requireRole("citizen"),
  ctrl.getMyApplications
);

// --- STAFF: queue + actions ---

router.get(
  "/",
  auth,
  requireRole(
    "frontoffice",
    "secretary",
    "chairperson",
    "admin"
  ),
  ctrl.listForRole
);

router.patch(
  "/:id/frontoffice",
  auth,
  requireRole("frontoffice"),
  ctrl.frontOfficeAction
);

router.patch(
  "/:id/secretary",
  auth,
  requireRole("secretary"),
  ctrl.secretaryAction
);

router.patch(
  "/:id/chairperson",
  auth,
  requireRole("chairperson"),
  ctrl.chairpersonAction
);

router.get(
  "/frontoffice/verified",
  auth,
  requireRole("frontoffice", "admin"),
  ctrl.getFrontOfficeVerified
);

router.get(
  "/secretary/recommended",
  auth,
  requireRole("secretary", "admin"),
  ctrl.getSecretaryRecommended
);

// --- ADMIN: APPLICATION STATISTICS ---

router.get(
  "/reports/statistics",
  auth,
  requireRole("admin"),
  ctrl.getApplicationStatistics
);

// --- SHARED ---

router.get(
  "/:id",
  auth,
  ctrl.getApplicationById
);

module.exports = router;