import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
const AdminDashboard = ({ setAuth, setAdmin }) => {
  const [name, setName] = useState("");

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    setAdmin(false);
  }

  useEffect(() => {
    const getName = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/", {
          method: "GET",
          headers: { token: localStorage.token },
        });
        const parseRes = await res.json();
        setName(parseRes[0].user_name);
        setAdmin(true);
      } catch (error) {
        console.error(error.message);
      }
    };
    getName();
  }, [setAdmin]);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h1>Hello Admin {name}</h1>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
        <div className="text-center mt-3">
          <Link to="/admin/adminpage">Admin Page</Link>
        </div>
      </div>
      <div className="d-flex mt-5 justify-content-around">
        <p>
          Here can be any text, but I'm too lazy to add something specific, so
          here some template text:<br></br>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. We Love Lain...
        </p>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
