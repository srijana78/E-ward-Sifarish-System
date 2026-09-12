const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// Citizen registration
router.post("/register", registerUser);

// Citizen + Staff login
router.post("/login", loginUser);

module.exports = router;