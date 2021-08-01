const jwt = require("jsonwebtoken");
require("dotenv").config();

function authUser(req, res, next) {
  try {
    //Get token from header
    const jwtToken = req.header("token");
    //Check if no token
    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }
    //verify user
    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json("Not Authorize");
  }
}

module.exports = { authUser };
