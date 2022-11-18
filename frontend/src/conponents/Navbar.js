import React, { useContext } from "react";
import "./css/navbar.css";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./images/logos1.png";
import { UserContext } from "../App";

const Navbar = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  // console.log(state);
  const RenderMenu = () => {
    if (state) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/About" data-toggle="collapse" data-target=".navbar-collapse.show">
              Profile
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/Contact" data-toggle="collapse" data-target=".navbar-collapse.show">
              Contact
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/Logout" data-toggle="collapse" data-target=".navbar-collapse.show">
              Logout
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
              Home
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/Contact" data-toggle="collapse" data-target=".navbar-collapse.show">
              Contact
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/Login" data-toggle="collapse" data-target=".navbar-collapse.show">
              Sign In
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink className="nav-link sudo text-bold" to="/Register" data-toggle="collapse" data-target=".navbar-collapse.show">
              Sign Up
            </NavLink>
          </li>
        </ul>
      );
    }
  };
  return (
    <>
      <div className="nbar">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <NavLink
              className="aa navbar-brand text-dark font-weight-bold"
              to="/"
            >
              <img src={logo} alt="img" height="30em" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse text-center"
              id="navbarSupportedContent"
            >
              <RenderMenu />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
