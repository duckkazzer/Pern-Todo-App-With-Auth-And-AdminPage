import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-light p-5 rounded-lg mt-5 text-center">
      <h1 className="display-4">Welcome to Todo</h1>
      <p className="lead">Sign In and start building your todo list</p>
      <hr class="my-4"></hr>
      <Link to="/login" className="btn btn-primary  mx-5">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary mx-5">
        Register
      </Link>
    </div>
  );
};

export default Landing;
