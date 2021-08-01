const router = require("express").Router();
const pool = require("../db");
const checkRole = require("../middleware/checkRole");
const validation = require("../middleware/validation");
const bcrypt = require("bcrypt");

//get admin
router.get("/", checkRole("admin"), async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT users.role, users.user_name FROM users WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//get all users
router.get("/adminpage", checkRole("admin"), async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT users.user_id, users.user_name, users.user_email, users.user_number, users.user_address, users.status FROM users"
    );
    if (user.rows.length === 0) {
      return res.json("You're not authorize as admin!");
    }
    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//get all todos for user
router.get("/adminpage/todo/:userId", checkRole("admin"), async (req, res) => {
  try {
    const { userId } = req.params;
    const userTodos = await pool.query(
      "SELECT * FROM todos WHERE user_id = $1",
      [userId]
    );
    res.json(userTodos);
  } catch (error) {
    console.error(error.message);
  }
});

//create user todo
router.post("/adminpage/todo/:userId", checkRole("admin"), async (req, res) => {
  try {
    const { userId } = req.params;
    const { description } = req.body;
    const saveTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING *",
      [description, userId]
    );
    res.json(saveTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update user todo
router.put("/adminpage/todo/:id", checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateOne = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    res.json("Todo updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete user todo
router.delete("/adminpage/todo/:id", checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOne = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 RETURNING *",
      [id]
    );
    res.json("Todo deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//edit user
router.put("/adminpage/user/:id", checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, address } = req.body;
    const updateOne = await pool.query(
      "UPDATE users SET user_name = $1, user_email = $2, user_number = $3, user_address = $4 WHERE user_id = $5 RETURNING *",
      [name, email, number, address, id]
    );
    res.json("User updated");
  } catch (error) {
    console.error(error.message);
  }
});

//create user
router.post("/adminpage", checkRole("admin"), validation, async (req, res) => {
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
    await pool.query(
      "INSERT INTO users (user_name, user_email, user_number, user_address, user_password ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, number, address, bcryptPassword]
    );
    res.json("User Created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//delete user
router.delete("/adminpage/user/:id", checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUsersTodos = await pool.query(
      "DELETE FROM todos WHERE user_id = $1 RETURNING *",
      [id]
    );
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );
    res.json("User deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//ban user
router.put("/adminpage/:id", checkRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const checkUserStatus = await pool.query(
      "SELECT users.status FROM users WHERE user_id = $1",
      [id]
    );
    if (checkUserStatus.rows[0].status === "Unban") {
      const statusChangeOnBan = await pool.query(
        "UPDATE users SET status = $1  WHERE user_id = $2 RETURNING *",
        ["Ban", id]
      );
      res.json(statusChangeOnBan.rows[0].status);
    } else {
      const statusChangeOnBan = await pool.query(
        "UPDATE users SET status = $1  WHERE user_id = $2 RETURNING *",
        ["Unban", id]
      );
      res.json(statusChangeOnBan.rows[0].status);
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/is-admin", checkRole("admin"), async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
