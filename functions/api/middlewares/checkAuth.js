const auth = require('../firebase').auth;

const checkAuth = (req, res, next) => {
  if (!req.get('Authorization')) {
    return res.sendStatus(401);
  } else {
    auth.verifyIdToken(req.get('Authorization'))
      .then( decodedToken => {
        req.uid = decodedToken.uid;
        return next();
      })
      .catch(() => res.sendStatus(401));
  }
}

module.exports = checkAuth;