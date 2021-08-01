const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, role, status) {
  const payload = {
    user: { id: user_id, role: role, status: status },
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
