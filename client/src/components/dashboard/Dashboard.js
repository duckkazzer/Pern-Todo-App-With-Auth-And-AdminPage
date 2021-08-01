import { Fragment, React, useEffect, useState } from "react";
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodo";

const Dashboard = ({ setAuth, setAdmin, setBan }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false); //update without refreshing

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard/", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        const parseRes = await response.json();
        if (parseRes[0].role !== "admin") {
          if (parseRes[0].status !== "Ban") {
            setAdmin(false);
            setName(parseRes[0].user_name);
            setAllTodos(parseRes);
          } else {
            setBan(true);
          }
        } else {
          setAdmin(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getProfile();

    setTodosChange(false);
  }, [todosChange, setAdmin, setBan]);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h1>Hello {name}</h1>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </Fragment>
  );
};

export default Dashboard;
