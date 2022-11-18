import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./images/login.svg";
import "../App.css";
import "./css/register.css";
import "./css/Login.css";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      toast.error("Please Fill All The Required Fields");
    } else if (data.status === 400) {
      toast.warn("Invalid Credentials!");
    } else {
      toast.success(`✨ Login Successful ✨`, { hideProgressBar: true });
      setTimeout(() => {
        dispatch({ type: "USER", payload: true });
        history.push("/");
      }, 1800);
    }
  };
  return (
    <>
      <section className="signup">
        <div className="signup-content">
          <div className="signup-form login">
            <h2 className="form-title login-form">Sign In</h2>
            <form
              method="POST"
              className="register-form login-reg"
              id="register-form"
            >
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  required
                  placeholder=" "
                  className="inputText"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Your Email</span>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  required
                  minLength="8"
                  placeholder=" "
                  className="inputText"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Your Password</span>
              </div>
              <div className="form-group form-button">
                <input
                  className="inputButton"
                  type="submit"
                  name="signup"
                  id="signup"
                  value="Sign In"
                  onClick={PostData}
                />
              </div>
              <br />
              <NavLink to="/Register" className="signup-image1-link">
                New to Website? Create an account.
              </NavLink>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={logo} alt="img" />
            </figure>
            <NavLink to="/Register" className="signup-image-link">
              New to Website? Create an account.
            </NavLink>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        theme="colored"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default Login;
