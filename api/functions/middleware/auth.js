/* eslint-disable */
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const JWT_SECRET = process.env.JWT_SEC;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authorization failed: No token' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authorization failed: Invalid token' });
  }
};

module.exports = auth;