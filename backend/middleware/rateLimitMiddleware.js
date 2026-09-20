// Simple in-memory rate limiter — no extra dependency needed.
// Good enough for a single-instance deployment (like this project's Render setup).
// Tracks attempts per IP address within a rolling time window.

const attempts = new Map();

/**
 * @param {number} maxAttempts - how many requests allowed per window
 * @param {number} windowMs - the window size, in milliseconds
 */
function rateLimit(maxAttempts = 10, windowMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    const record = attempts.get(key);

    if (!record || now - record.windowStart > windowMs) {
      // Start a fresh window for this IP
      attempts.set(key, { count: 1, windowStart: now });
      return next();
    }

    if (record.count >= maxAttempts) {
      const retryAfterSeconds = Math.ceil(
        (windowMs - (now - record.windowStart)) / 1000
      );
      return res.status(429).json({
        success: false,
        message: `Too many attempts. Please try again in ${retryAfterSeconds} seconds.`,
      });
    }

    record.count += 1;
    next();
  };
}

module.exports = rateLimit;