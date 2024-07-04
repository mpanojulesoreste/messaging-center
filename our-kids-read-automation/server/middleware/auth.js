const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    console.log('Auth failed: No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Auth error details:', {
      name: err.name,
      message: err.message,
      expiredAt: err.expiredAt,
      stack: err.stack
    });
    res.status(401).json({ msg: 'Token is not valid' });
  }
};