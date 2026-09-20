const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPasswordStaff,
  resetPasswordStaff,
  forgotPasswordCitizen,
} = require("../controllers/authController");

const rateLimit = require("../middleware/rateLimitMiddleware");

// Each route gets its OWN limiter instance (its own in-memory Map),
// keyed by IP. Before this fix, a single shared limiter was likely being
// applied across multiple auth routes, so requests to /login or /register
// during testing were already using up the same bucket that
// /forgot-password/citizen then hit — causing a lockout on the very
// first real attempt at that route.

const registerLimiter = rateLimit(10, 15 * 60 * 1000); // 10 attempts / 15 min
const loginLimiter = rateLimit(10, 15 * 60 * 1000); // 10 attempts / 15 min

// Forgot-password routes get a shorter window and a slightly lower cap —
// still enough headroom for someone to mistype their phone/citizenship
// number a couple of times without getting locked out immediately.
const forgotPasswordLimiter = rateLimit(5, 10 * 60 * 1000); // 5 attempts / 10 min
const resetPasswordLimiter = rateLimit(5, 10 * 60 * 1000); // 5 attempts / 10 min

router.post("/register", registerLimiter, registerUser);
router.post("/login", loginLimiter, loginUser);

router.post("/forgot-password/staff", forgotPasswordLimiter, forgotPasswordStaff);
router.post("/reset-password/staff/:token", resetPasswordLimiter, resetPasswordStaff);
router.post("/forgot-password/citizen", forgotPasswordLimiter, forgotPasswordCitizen);

module.exports = router;