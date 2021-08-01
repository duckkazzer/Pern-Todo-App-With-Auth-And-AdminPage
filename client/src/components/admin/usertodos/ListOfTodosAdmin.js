import React, { Fragment, useEffect, useState } from "react";
import EditListOfTodosAdmin from "./EditListOfTodosAdmin";

const ListOfTodosAdmin = ({ user, setListChange, listChange }) => {
  const [todos, setTodos] = useState([]);
  const getTodosForUser = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/admin/adminpage/todo/${id}`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await res.json();
      setTodos(parseRes.rows);
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteUserTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/admin/adminpage/todo/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodosForUser(user.user_id);
    setListChange(false);
  }, [listChange, user.user_id, setListChange]);

  return (
    <Fragment>
      {" "}
      <table className="table  text-center">
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditListOfTodosAdmin
                    todo={todo}
                    setListChange={setListChange}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteUserTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListOfTodosAdmin;
