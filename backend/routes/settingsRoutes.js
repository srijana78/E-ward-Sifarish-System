
const express = require("express");

const auth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const router = express.Router();

router.get("/", getSettings);
router.put("/", auth, requireRole("admin"), updateSettings);

module.exports = router;