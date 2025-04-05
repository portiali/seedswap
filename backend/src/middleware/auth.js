

module.exports = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  next();
};
