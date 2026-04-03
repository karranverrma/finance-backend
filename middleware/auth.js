function authenticate(req, res, next) {
  req.user = {
    _id: "64f1a2b3c4d5e6f7890a1234", // fixed valid ObjectId
    role: req.headers.role || "admin"
  };

  next();
}

module.exports = { authenticate };