export const checkRole = (role) => {
    return (req, res, next) => {
      if (!res.locals.user || res.locals.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
  
      next();
    };
  };
  