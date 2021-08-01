import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

import ListOfTodosAdmin from "./usertodos/ListOfTodosAdmin";
import CreateTodoForUser from "../admin/usertodos/CreateTodoForUser";

import EditUserInfo from "./usersInfo/EditUserInfo";
import DeleteUser from "./usersInfo/DeleteUser";
import CreateUser from "./usersInfo/CreateUser";
import BanUser from "./usersInfo/BanUser";

import CreateGroupTodo from "./usertodos/CreateGroupTodo";

const AdminPage = ({ setAuth, setAdmin }) => {
  const [users, setUsers] = useState("");
  const [listChange, setListChange] = useState(false);
  const [usersChange, setUsersChange] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/adminpage", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await res.json();
        setUsers(parseRes);
        setAdmin(true);
      } catch (error) {
        console.error(error.message);
      }
    };
    getUsers();
    setUsersChange(false);
  }, [usersChange, setAdmin]);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <Link to="/admin">Home</Link>
      </div>{" "}
      <table className="table table-striped mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Todos</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Ban</th>
          </tr>
        </thead>
        <tbody>
          {users.length !== 0 &&
            users.map((user) => (
              <tr key={user.user_email}>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.user_number}</td>
                <td>{user.user_address}</td>
                <td>
                  <ListOfTodosAdmin
                    user={user}
                    setListChange={setListChange}
                    listChange={listChange}
                  />
                  <CreateTodoForUser
                    user={user}
                    setListChange={setListChange}
                  />
                </td>
                <td>
                  <EditUserInfo user={user} setUsersChange={setUsersChange} />
                </td>
                <td>
                  <DeleteUser user={user} setUsersChange={setUsersChange} />
                </td>
                <td>
                  <BanUser user={user} setUsersChange={setUsersChange} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="text-center">
        <CreateUser setUsersChange={setUsersChange} />
        <CreateGroupTodo setListChange={setListChange} users={users} />
      </div>
    </Fragment>
  );
};

export default AdminPage;
