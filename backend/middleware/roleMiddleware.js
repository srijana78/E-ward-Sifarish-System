// Usage: requireRole('frontoffice', 'secretary')
// Assumes authMiddleware has already run and set req.user (with a `.role` field)
module.exports = function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${allowedRoles.join(', ')}`
      });
    }
    next();
  };
};