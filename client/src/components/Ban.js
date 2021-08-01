import React from "react";

const Ban = ({ setAuth, setBan }) => {
  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    setBan(false);
  }
  return (
    <div className="bg-secondary p-5 rounded-lg mt-5 text-center">
      <h1 className="display-4">
        &#9888; This Account Has Been Banned &#9888;
      </h1>

      <button className="btn btn-link" onClick={(e) => logout(e)}>
        Return Back
      </button>
    </div>
  );
};

export default Ban;
