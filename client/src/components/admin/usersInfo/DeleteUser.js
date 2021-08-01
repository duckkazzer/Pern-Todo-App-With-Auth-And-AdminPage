import React, { Fragment } from "react";

const DeleteUser = ({ user, setUsersChange }) => {
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/admin/adminpage/user/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      setUsersChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target={`#id2${user.user_id}`}
      >
        Delete
      </button>

      <div
        className="modal fade"
        id={`id2${user.user_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel2">
                Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this user?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => deleteUser(user.user_id)}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteUser;
