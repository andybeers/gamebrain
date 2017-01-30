const tokenSvc = require('./token');

module.exports = function getEnsureAuth() {
  return function ensureAuth(req, res, next) {
    if(req.method === 'OPTIONS') return next();
    const token = req.headers.authorization;
    if(!token) return next({ code: 403, error: 'Unauthorized, no token provided'});
    tokenSvc.verify(token)
      .then(payload => {
        req.user = payload;
        next();
      })
      .catch(() => {
        next({ code: 403, error: 'Unauthorized, bad token'});
      });
  };
};