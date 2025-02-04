const jwt = require('jsonwebtoken');
const User = require('../models/user_model'); 

const checkRole = (roles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (roles.includes(user.role)) {
        req.user = user; // Attach user to request object
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// Middleware to check if the user is an admin
const isAdmin = checkRole(['admin']);

// Middleware to check if the user is a shipper
const isShipper = checkRole(['shipper']);

// Middleware to check if the user is a carrier
const isCarrier = checkRole(['carrier']);



module.exports = {
  isAdmin,
  isShipper,
  isCarrier,
};
