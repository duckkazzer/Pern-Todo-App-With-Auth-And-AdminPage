import React, { Fragment, useState } from "react";

const CreateGroupTodo = ({ users, setListChange }) => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (event) => {
    try {
      event.preventDefault();
      const elem = event.target.elements;
      const body = { description };
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      for (let i = 0; i < elem.length - 2; i++) {
        if (elem[i].checked) {
          await fetch(
            `http://localhost:5000/admin/adminpage/todo/${elem[i].id}`,
            {
              method: "POST",
              headers: myHeaders,
              body: JSON.stringify(body),
            }
          );
        }
      }
      setDescription("");

      setListChange(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary btn-lg mx-5"
        data-toggle="modal"
        data-target={`#id4`}
      >
        Create Group Todo
      </button>

      <div
        className="modal fade"
        id={`id4`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel4"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel4">
                Add Users
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="text-start" onSubmit={onSubmitForm}>
                {users.length !== 0 &&
                  users.map((user) => (
                    <div key={user.user_id} className="mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={user.user_name}
                        value={user.user_id}
                        id={user.user_id}
                      />
                      <label
                        className="form-check-label mx-3"
                        htmlFor={user.user_id}
                      >
                        {user.user_name} - {user.user_email}
                      </label>
                    </div>
                  ))}
                <input
                  type="text"
                  className="form-control mt-3"
                  value={description}
                  placeholder="Write Todo For This Users"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="btn btn-success mt-3">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateGroupTodo;
