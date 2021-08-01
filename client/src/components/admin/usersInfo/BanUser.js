import React, { useState } from "react";

const BanUser = ({ user, setUsersChange }) => {
  if (user.status === "Unban") {
    var userStatus = "Ban";
  } else {
    userStatus = "Unban";
  }
  const [status, setStatus] = useState(userStatus);
  const changeStatus = async () => {
    const res = await fetch(
      `http://localhost:5000/admin/adminpage/${user.user_id}`,
      {
        method: "PUT",
        headers: { token: localStorage.token },
      }
    );
    const parseRes = await res.json();
    if (parseRes === "Ban") {
      setStatus("Unban");
    } else {
      setStatus("Ban");
    }
    setUsersChange(true);
  };
  return (
    <button
      type="button"
      className="btn btn-dark"
      onClick={() => changeStatus()}
    >
      {status}
    </button>
  );
};
export default BanUser;
