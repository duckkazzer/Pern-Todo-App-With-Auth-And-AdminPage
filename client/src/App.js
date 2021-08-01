import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminPage from "./components/admin/AdminPage";
import Ban from "./components/Ban";

function App() {
  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const isAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/is-admin", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsAdministrator(true) : setIsAdministrator(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  const isBanned = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/is-banned", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      parseRes === true ? setIsUserBanned(true) : setIsUserBanned(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
    isAdmin();
    isBanned();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [isUserBanned, setIsUserBanned] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const setAdmin = (boolean) => {
    setIsAdministrator(boolean);
  };
  const setBan = (boolean) => {
    setIsUserBanned(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />

            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }

              //if (!isAuthenticated) {
              //return <Login {...props} setAuth={setAuth} />;
              //} else {
              //if (!isAdministrator) {
              //return <Redirect to="/dashboard" />;
              //} else {
              //return <Redirect to="/admin" />;
              //}
              //}
              //}}
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  !isAdministrator ? (
                    !isUserBanned ? (
                      <Dashboard
                        {...props}
                        setAuth={setAuth}
                        setAdmin={setAdmin}
                        setBan={setBan}
                      />
                    ) : (
                      <Redirect to="/ban" />
                    )
                  ) : (
                    <Redirect to="/admin" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/admin"
              render={(props) =>
                isAuthenticated ? (
                  isAdministrator ? (
                    <AdminDashboard
                      {...props}
                      setAuth={setAuth}
                      setAdmin={setAdmin}
                    />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/admin/adminpage"
              render={(props) =>
                isAdministrator ? (
                  <AdminPage {...props} setAuth={setAuth} setAdmin={setAdmin} />
                ) : (
                  <Route
                    path="/error"
                    children={() => (
                      <h2>You Are Not Authorized as Administrator!</h2>
                    )}
                  />
                )
              }
            />
            <Route
              exact
              path="/ban"
              render={(props) =>
                isAuthenticated ? (
                  isUserBanned ? (
                    <Ban {...props} setAuth={setAuth} setBan={setBan} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
