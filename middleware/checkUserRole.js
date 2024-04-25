const checkUserRole = (...requiredRoles) => {
    return (req, res, next) => {
      const userRoles = req.user.roles; // Assuming user roles are stored in req.user
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      if (hasRequiredRole) {
        next(); // User has at least one of the required roles, proceed to next middleware or route handler
      } else {
        res.status(403).json({ message: 'Unauthorized' }); // User does not have any of the required roles
      }
    };
  };
  
  module.exports = checkUserRole;