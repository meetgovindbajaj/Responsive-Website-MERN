import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./images/imgs.jpg";
import logo1 from "./images/img.jpg";
import "./css/about.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/About", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setuserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "USER", payload: true });
      }
    } catch (err) {
      history.push("/Login");
    }
  };
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };
  const contactForm = async (e) => {
    e.preventDefault();
    const {
      name,
      phone,
      work,
      experience,
      rate,
      project,
      eng,
      available,
      wapp,
      fb,
      insta,
      lin,
      ghub,
      yt,
    } = userData;
    const res = await fetch("/About", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        work,
        experience,
        rate,
        project,
        eng,
        available,
        wapp,
        fb,
        insta,
        lin,
        ghub,
        yt,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 422 || !data) {
      toast.warn("Please Fill All The Required Fields");
    } else if (data.status === 400) {
      toast.error("Some Error Occured!");
    } else {
      toast.success("Saved Successfully!");
      toggle();
    }
  };
  return (
    <>
      <div className="container emp-profile" id="blur">
        <form method="GET">
          <div className="row">
            <div className="col-md-4 col-sm-12 d-flex justify-content-start images py-1">
              <img
                className="image"
                src={userData.phone === 7688974744 ? logo1 : logo}
                alt="img"
                height="230vh"
                width="190vh"
              />
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-3">
                  Account Created On:<span> {userData.date} </span>
                </p>
                <input
                  name="btnAddMore"
                  className="profile-edit-btn"
                  type="button"
                  onClick={toggle}
                  value="Edit Profile"
                />
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item home">
                    <a
                      className="nav-link"
                      href="#home"
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item timeline">
                    <a
                      className="nav-link"
                      href="#profile"
                      id="profile-tab"
                      data-toggle="tab"
                      role="tab"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 profile-works">
              <div className="profile-work">
                <p>WORK LINKS</p>
                <a
                  className="a"
                  href={
                    userData.yt
                      ? userData.yt
                      : "https://www.youtube.com/channel/UCd0qJcMmMd83y_3cvaghUuQ"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
                <br />
                <a
                  className="a"
                  href={
                    userData.wapp
                      ? userData.wapp
                      : "https://wa.me//917688974744"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <br />
                <a
                  className="a"
                  href={
                    userData.fb
                      ? userData.fb
                      : "https://www.facebook.com/profile.php?id=100009144479546"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <br />
                <a
                  className="a"
                  href={
                    userData.insta
                      ? userData.insta
                      : "https://www.instagram.com/_govind.bajaj_/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  className="a"
                  href={
                    userData.lin
                      ? userData.lin
                      : "https://www.linkedin.com/in/govind-bajaj-7531b5182/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <a
                  className="a"
                  href={
                    userData.ghub
                      ? userData.ghub
                      : "https://github.com/bajaj277"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <br />
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info col-sm-12">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active as"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6 col-sm-6 u">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto u1">
                      <p style={{ overflow: "hidden" }}>{userData._id}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>+91 {userData.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6 col-sm-6 u">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto u1">
                      <p>
                        {!userData.experience ? "Rookie" : userData.experience}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{!userData.rate ? 0 : userData.rate}$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{!userData.project ? 0 : userData.project}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>{!userData.eng ? "Rookie" : userData.eng}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 m-auto">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6 col-sm-6 m-auto">
                      <p>
                        {!userData.available ? 0 : userData.available} Months
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-work xx d-none text-center">
            <p>WORK LINKS</p>
            <div className="row text-center">
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.yt
                      ? userData.yt
                      : "https://www.youtube.com/channel/UCd0qJcMmMd83y_3cvaghUuQ"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </div>
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.wapp
                      ? userData.wapp
                      : "https://wa.me//917688974744"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.fb
                      ? userData.fb
                      : "https://www.facebook.com/profile.php?id=100009144479546"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.insta
                      ? userData.insta
                      : "https://www.instagram.com/_govind.bajaj_/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.lin
                      ? userData.lin
                      : "https://www.linkedin.com/in/govind-bajaj-7531b5182/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
              <div className="col-4">
                <a
                  className="a a1"
                  href={
                    userData.ghub
                      ? userData.ghub
                      : "https://github.com/bajaj277"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div id="popup">
        <div className="edit-profile">
          <h2 className="form-title form-title1">Edit Profile</h2>
          <form method="POST" className="edit-form">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="name">
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    placeholder={userData.name}
                    className="inputText inputText1"
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="phone">
                    Phone No.<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    placeholder={userData.phone}
                    className="inputText inputText1"
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="work">
                    Profession<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    placeholder={userData.work}
                    className="inputText inputText1"
                    type="text"
                    name="work"
                    id="work"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="experience">
                    Experience
                  </label>
                  <input
                    placeholder={
                      userData.experience
                        ? userData.experience
                        : "Rookie/Medium/Expert"
                    }
                    title="Beginner / Medium / Expert / Pro"
                    className="inputText inputText1"
                    type="text"
                    name="experience"
                    id="experience"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="rate">
                    Hourly Rate
                  </label>
                  <input
                    title="USD"
                    placeholder={
                      userData.rate ? userData.rate + "$" : "eg. 100$"
                    }
                    className="inputText inputText1"
                    type="Number"
                    name="rate"
                    id="rate"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="project">
                    Projects
                  </label>
                  <input
                    placeholder={userData.project ? userData.project : "eg. 10"}
                    className="inputText inputText1"
                    type="number"
                    name="project"
                    id="project"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="eng">
                    English Level
                  </label>
                  <input
                    placeholder={
                      userData.eng ? userData.eng : "Rookie/Medium/Expert"
                    }
                    title="Beginner / Medium / Expert / Pro"
                    className="inputText inputText1"
                    type="text"
                    name="eng"
                    id="eng"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="available">
                    Availability
                  </label>
                  <input
                    placeholder={
                      userData.available
                        ? userData.available + " Months"
                        : "eg. 2 Months"
                    }
                    title="Months"
                    className="inputText inputText1"
                    type="number"
                    name="available"
                    id="available"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="wapp">
                    WhatsApp
                  </label>
                  <input
                    placeholder={
                      userData.wapp
                        ? userData.wapp
                        : "https://wa.me//91<Number>"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="wapp"
                    id="wapp"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="fb">
                    Facebook
                  </label>
                  <input
                    placeholder={
                      userData.fb ? userData.fb : "https://www.facebook.com/"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="fb"
                    id="fb"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="insta">
                    Instagram
                  </label>
                  <input
                    placeholder={
                      userData.insta
                        ? userData.insta
                        : "https://www.instagram.com/<uid>"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="insta"
                    id="insta"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="lin">
                    LinkedIn
                  </label>
                  <input
                    placeholder={
                      userData.lin
                        ? userData.lin
                        : "https://www.linkedin.com/<uid>"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="lin"
                    id="lin"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="ghub">
                    GitHub
                  </label>
                  <input
                    placeholder={
                      userData.ghub ? userData.ghub : "https://github.com/<uid>"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="ghub"
                    id="ghub"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="label" htmlFor="yt">
                    YouTube
                  </label>
                  <input
                    placeholder={
                      userData.yt
                        ? userData.yt
                        : "https://www.youtube.com/channel/"
                    }
                    className="inputText inputText1"
                    type="text"
                    name="yt"
                    id="yt"
                    onChange={handleInputs}
                  ></input>
                </div>
              </div>
            </div>
          </form>
          <div className="form-group form-button">
            <input
              className="inputButton"
              type="submit"
              name="edit"
              id="edit"
              value="Save"
              onClick={contactForm}
            />
            <input
              name="btnAddMore"
              className="inputButton"
              type="button"
              onClick={toggle}
              value="Discard"
            />
          </div>
        </div>
      </div>
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

export default About;
