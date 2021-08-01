const router = require("express").Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middleware/validation");
const { authUser } = require("../middleware/authorization");

router.post("/register", validation, async (req, res) => {
  try {
    const { name, email, number, address, password } = req.body;
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (checkUser.rows.length !== 0) {
      return res.status(401).send("User Already Exist");
    }

    //Bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //save in db
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_number, user_address, user_password ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, number, address, bcryptPassword]
    );

    //jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validation, async (req, res) => {
  try {
    const { name, email, number, address, password } = req.body;
    const findUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (findUser.rows.length === 0) {
      return res.status(401).send("Password or email is inccorect");
    }

    //check password
    const validPassword = await bcrypt.compare(
      password,
      findUser.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).send("Incorrect password or Email");
    }
    //token
    const token = jwtGenerator(
      findUser.rows[0].user_id,
      findUser.rows[0].role,
      findUser.rows[0].status
    );

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/is-verify", authUser, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
