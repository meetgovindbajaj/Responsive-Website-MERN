import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";
import { NavLink } from "react-router-dom";

const Home = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  const [show, setshow] = useState(false);
  const callAboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data);
      setshow(true);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "USER", payload: true });
        setTimeout(() => {
          toast(`✨ Hello ${data.name} ✨`);
        }, 250);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container-fluid body">
      <div className="home-div">
        <p className="pt-5">welcome</p>
        <h1>{userData.name}</h1>
        <h2>
          {show ? (
            "Happy To See You Back 🤗"
          ) : (
            <>
              We Are The MERN Developer
              <h6 className="px-4" style={{ color: "red" }}>
                ** Please login to access your profile and send message **
              </h6>
              <h6 className="px-4">
                <NavLink
                  className="nav-link text-decoration-none text-bold "
                  to="/Login"
                >
                  click here to login
                </NavLink>
              </h6>
            </>
          )}
        </h2>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Home;
