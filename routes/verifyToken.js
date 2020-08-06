const jwt = require("jsonwebtoken");
/* const dotenv = require("dotenv").config(); */

const auth = (req, res, next) => {
  //GET TOKEN FROM HEADER
  const token = req.header("auth-token");
  //IF THERE IS NO TOKEN THROW ACCESS DENIED
  if (!token) return res.status(401).send("Access Denied");
  // IF THERE IS A TOKEN TRY TO VERIFY IT
  try {
    //VERIFY USING JWT AND TOKEN SECRET
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //TAG THE USER WITH VERIFIED
    req.person = verified;
    //TELL IT TO CONTINUE TO NEXT MIDDLEWARE
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
