const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["token"];

  jwt.verify(token, "123-xyz", (err, success) => {
    if (err) {
      res.status(401).json({ status: "unauthorized" });
    } else {
      req.headers.email = success["data"];
      next();
    }
  });
};
