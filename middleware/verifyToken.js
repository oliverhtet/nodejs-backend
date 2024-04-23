const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  jwt.verify(token, process.env.TOKEN_SCRECT, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
};

module.exports = verifyToken;
