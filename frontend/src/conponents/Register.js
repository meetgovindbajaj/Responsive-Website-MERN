import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./images/signup1.svg";
import "../App.css";
import "./css/register.css";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      toast.error("Please Fill All The Required Fields");
    } else if (data.status === 400) {
      toast.warn("Email Already Registered!");
    } else if (data.status === 401) {
      toast.warn("Phone No. Already Registered!");
    } else if (data.status === 402) {
      toast.warn("Passwords Are Not Matching");
    } else {
      toast.success(`Registration Successful! 🎉`, { hideProgressBar: true });
      setTimeout(() => {
        history.push("/Login");
      }, 1800);
    }
  };
  return (
    <>
      <section className="signup">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account"></i>
                </label>
                <input
                  required
                  placeholder=" "
                  className="inputText"
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Your Name</span>
              </div>
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
                <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  required
                  placeholder=" "
                  className="inputText"
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Your Phone No</span>
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <i className="zmdi zmdi-slideshow"></i>
                </label>
                <input
                  required
                  placeholder=" "
                  className="inputText"
                  type="text"
                  name="work"
                  id="work"
                  autoComplete="off"
                  value={user.work}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Your Profession</span>
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
                <span className="floating-label">Create Password</span>
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  required
                  minLength="8"
                  placeholder=" "
                  className="inputText"
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                ></input>
                <span className="floating-label">Re-Enter Password</span>
              </div>
              <div className="form-group form-button">
                <input
                  className="inputButton"
                  type="submit"
                  name="signup"
                  id="signup"
                  value="register"
                  onClick={PostData}
                />
              </div>
              <NavLink to="/Login" className="signup-image1-link">
                Already Registered? Login Here.
              </NavLink>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img src={logo} alt="img" />
            </figure>
            <NavLink to="/Login" className="signup-image-link">
              Already Registered? Login Here.
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

export default Register;
