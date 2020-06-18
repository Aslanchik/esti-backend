const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
