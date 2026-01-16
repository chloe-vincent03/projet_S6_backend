const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // On récupère le jeton dans le header
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { userId: decodedToken.userId };
    next(); // On passe à la suite
  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée !" });
  }
};