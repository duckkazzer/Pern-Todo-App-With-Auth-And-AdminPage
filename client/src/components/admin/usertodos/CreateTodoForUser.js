import React, { Fragment, useState } from "react";

const CreateTodoForUser = ({ user, setListChange }) => {
  const [description, setDescription] = useState("");
  //const [userId, setUserId] = useState(user.user_id);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description };
      const response = await fetch(
        `http://localhost:5000/admin/adminpage/todo/${user.user_id}`,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      //console.log(userId);
      setDescription("");

      setListChange(true);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        data-toggle="collapse"
        data-target=".dropdown-toggle:hover + .more-menu"
        type="button"
        className="btn btn-outline-primary dropdown-toggle"
      >
        Add +
      </button>

      <div className="collapse more-menu">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Todo
              </h5>
            </div>
            <div className="modal-body">
              {" "}
              <form className="d-flex mt-2" onSubmit={onSubmitForm}>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  placeholder="New Todo"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateTodoForUser;
