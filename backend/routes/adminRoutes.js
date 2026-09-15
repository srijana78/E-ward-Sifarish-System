const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deactivateStaff,
  activateStaff,
} = require("../controllers/adminController");

const router = express.Router();

// ================= CREATE STAFF =================

router.post(
  "/create-staff",
  authMiddleware,
  createStaff
);

// ================= GET ALL STAFF =================

router.get(
  "/staff",
  authMiddleware,
  getAllStaff
);

// ================= GET SINGLE STAFF =================

router.get(
  "/staff/:id",
  authMiddleware,
  getStaffById
);

// ================= UPDATE STAFF =================

router.put(
  "/staff/:id",
  authMiddleware,
  updateStaff
);

// ================= DEACTIVATE STAFF =================

router.patch(
  "/staff/:id/deactivate",
  authMiddleware,
  deactivateStaff
);

// ================= ACTIVATE STAFF =================

router.patch(
  "/staff/:id/activate",
  authMiddleware,
  activateStaff
);

module.exports = router;