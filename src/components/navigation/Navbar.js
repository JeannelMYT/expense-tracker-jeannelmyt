import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <nav role="navigation">
      <div className="navigation-container">
        <NavLink
          className="navbar-item"
          activeClassName="is-active"
          to="/dashboard"
        >
          Home
        </NavLink>

        <NavLink
          className="navbar-item"
          activeClassName="is-active"
          to="/personalDetails"
        >
          Account
        </NavLink>
        <NavLink
          className="logout"
          to="/"
          onClick={logout}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
