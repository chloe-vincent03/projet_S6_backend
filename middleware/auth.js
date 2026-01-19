const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('[Auth Middleware] Headers:', req.headers.authorization);
    if (!req.headers.authorization) {
      throw new Error('No Authorization header');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error('[Auth Middleware] Error:', error.message);
    res.status(401).json({ message: "Requête non authentifiée !" });
  }
};