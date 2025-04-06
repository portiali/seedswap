

const isAuthenticated = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    return next(); // Proceed to the next route if authenticated
  } else {
    return res.status(401).send('Authentication required'); // Send 401 error if not authenticated
  }
};

module.exports = {isAuthenticated};

