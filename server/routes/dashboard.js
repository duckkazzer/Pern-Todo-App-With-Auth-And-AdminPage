const router = require("express").Router();
const pool = require("../db");
const { authUser } = require("../middleware/authorization");

//all todos and name
router.get("/", authUser, async (req, res) => {
  try {
    //req.user has payload
    //res.json(req.user); = gives id of user

    //const user = await pool.query(
    //"SELECT user_name FROM users WHERE user_id = $1",
    // [req.user.id]
    //);

    const user = await pool.query(
      "SELECT users.user_name, todos.todo_id, todos.description, users.role, users.status FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

//create todo
router.post("/todos", authUser, async (req, res) => {
  try {
    const { description } = req.body;
    const saveTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING *",
      [description, req.user.id]
    );
    res.json(saveTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update
router.put("/todos/:id", authUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateOne = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );
    if (updateOne.rows.length === 0) {
      return res.json("This todo is not yours");
    }
    res.json("Todo updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete
router.delete("/todos/:id", authUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOne = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if (deleteOne.rows.length === 0) {
      return res.json("This value is not yours");
    }
    res.json("Todo deleted");
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/is-banned", authUser, async (req, res) => {
  try {
    if (req.user.status === "Ban") {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
