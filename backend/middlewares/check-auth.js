const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    //validating
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    //add data to request
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    if (!token) {
      const error = new HttpError('Authentication failed!', 403);
      return next(error);
    }
  }
};
