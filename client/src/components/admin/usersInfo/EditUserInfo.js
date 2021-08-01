import React, { Fragment, useState } from "react";

const EditUserInfo = ({ user, setUsersChange }) => {
  const [name, setName] = useState(user.user_name);
  const [email, setEmail] = useState(user.user_email);
  const [number, setNumber] = useState(user.user_number);
  const [address, setAddress] = useState(user.user_address);
  const userID = user.user_id;
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, number, address };

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      await fetch(
        `http://localhost:5000/admin/adminpage/user/${user.user_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      setUsersChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${userID}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${userID}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit User</h4>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                onClick={() => {
                  setName(user.user_name);
                  setEmail(user.user_email);
                  setNumber(user.user_number);
                  setAddress(user.user_address);
                }}
              ></button>
            </div>

            <div className="modal-body">
              <h6>Name:</h6>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h6>Email:</h6>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              <h6>Number:</h6>
              <input
                type="text"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <h6>Address:</h6>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateUser(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  setName(user.user_name);
                  setEmail(user.user_email);
                  setNumber(user.user_number);
                  setAddress(user.user_address);
                }}
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

export default EditUserInfo;
