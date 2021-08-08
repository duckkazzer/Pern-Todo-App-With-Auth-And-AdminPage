import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    number: "",
    address: "",
    password: "",
    password2: "",
  });

  const { name, email, number, address, password, password2 } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        const passwordCheckText = document.getElementById("CheckPasswordMatch");
        document.getElementById("Password2").style.borderColor = "#B22222";
        passwordCheckText.innerHTML = "Password does not match !";
        passwordCheckText.style.color = "#B22222";
      } else {
        const body = { name, email, number, address, password };

        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form id="identicalForm" onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="number"
          placeholder="Phone number"
          value={number}
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          className="form-control my-3"
          required
          onChange={(e) => onChange(e)}
        />
        <input
          required
          id="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          className="form-control my-3"
          onChange={(e) => onChange(e)}
        />
        <div className="my-3">
          <input
            type="password"
            id="Password2"
            name="password2"
            placeholder="Confirm Password"
            value={password2}
            className="form-control"
            onChange={(e) => onChange(e)}
          />
          <div id="CheckPasswordMatch"></div>
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
      </form>

      <Link to="/login">Login</Link>
    </Fragment>
  );
};

export default Register;
