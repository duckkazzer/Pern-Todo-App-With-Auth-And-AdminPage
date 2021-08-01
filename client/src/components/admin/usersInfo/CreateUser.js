import React, { useState, Fragment } from "react";

const CreateUser = ({ setUsersChange }) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    number: "",
    address: "",
    password: "",
  });

  const { name, email, number, address, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = { name, email, number, address, password };

      await fetch("http://localhost:5000/admin/adminpage", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      setUsersChange(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-success btn-lg mb-5 mt-5 "
        data-toggle="modal"
        data-target={`#id3`}
      >
        Create User +
      </button>

      <div
        className="modal"
        id={`id3`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel3"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="ModalLabel3">
                Register
              </h4>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="email"
                name="email"
                placeholder="email"
                value={email}
                className="form-control my-3"
                onChange={(e) => onChange(e)}
              />
              <input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                className="form-control my-3"
                onChange={(e) => onChange(e)}
              />
              <input
                type="text"
                name="number"
                placeholder="phone number"
                value={number}
                className="form-control my-3"
                onChange={(e) => onChange(e)}
              />
              <input
                type="text"
                name="address"
                placeholder="address"
                value={address}
                className="form-control my-3"
                onChange={(e) => onChange(e)}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password}
                className="form-control my-3"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => onSubmit(e)}
              >
                Register User
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateUser;
