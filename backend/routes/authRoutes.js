// const express = require("express");

// const {
//   registerUser,
//   loginUser,
// } = require("../controllers/authController");

// const router = express.Router();

// // Citizen registration
// router.post("/register", registerUser);

// // Citizen + Staff login
// router.post("/login", loginUser);

// module.exports = router;


// here 
const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const rateLimit = require("../middleware/rateLimitMiddleware");

const router = express.Router();

// Citizen registration — 10 attempts per 15 minutes per IP
router.post("/register", rateLimit(10, 15 * 60 * 1000), registerUser);

// Citizen + Staff login — 10 attempts per 15 minutes per IP
router.post("/login", rateLimit(10, 15 * 60 * 1000), loginUser);

module.exports = router;