import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../Styles/Homepage.css";
import { useAuth } from "../Context/context";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful");
  };

  return (
    <div className="homepage-container">
      <img
        src="/assets/task.png"
        alt="Homepage Image"
        className="homepage-image"
      />

      <div className="homepage-links">
        <Link to="/todolist" className="homepage-link">
          Todo List
        </Link>
        {!auth.user ? (
          <>
            <NavLink to="/register" className="homepage-link">
              Register
            </NavLink>
            <NavLink to="/login" className="homepage-link">
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="header-username">{auth?.user?.name}</span>
            </NavLink>
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="nav-link"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleLogout}
                  to="/"
                  className="nav-link"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        )}
        <Link to="/generateroutine" className="homepage-link">
          Generate Routine
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
