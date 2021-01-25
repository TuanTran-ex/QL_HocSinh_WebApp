const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    res.redirect("/auth");
  } else {
    try {
      const verified = jwt.verify(token, process.env.JWT_KEY);
      req.jwtDecoded = verified;
      next();
    } catch (err) {
      res.status(401).json({
        code: 401,
        message: "Invalid token",
        error: err,
      });
    }
  }
};
