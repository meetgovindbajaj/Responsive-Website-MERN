import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/contact.css";
import phone from "./images/mobile (2).png";
import email from "./images/mail.png";
import map from "./images/map.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

const Contact = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const callAboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      } else {
        dispatch({ type: "USER", payload: true });
      }
    } catch (err) {
      toast.warn("Please Login To Get In Touch");
    }
  };
  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line
  }, []);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      toast.warn("Please Fill All The Required Fields");
    } else if (data.status === 400) {
      toast.error("Some Error Occured!");
    } else {
      toast.success("Message Send Successfully!");
      setuserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-12 offset-sm-0 d-flex justify-content-between info">
              <div
                className="contact_info_item d-flex justify-content-start align-items-center"
                onClick={() =>
                  window.open(`tel:+91-${userData.phone}`, "_self")
                }
              >
                <img src={phone} alt="img" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91-(985)466-5854</div>
                </div>
              </div>
              <div
                className="contact_info_item d-flex justify-content-start align-items-center"
                onClick={() =>
                  window.open(`mailto:${userData.email}`, "_blank")
                }
              >
                <img src={email} alt="img" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">govindb277@gmail.com</div>
                </div>
              </div>
              <div
                className="contact_info_item d-flex justify-content-start align-items-center"
                onClick={() =>
                  window.open(`https://goo.gl/maps/egvU87KTjUiQvTfn9`, "_blank")
                }
              >
                <img src={map} alt="img" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Jodhpur, Rajasthan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form my-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-md-12 offset-md-0 col-12 offset-0">
              <div className="contact_form_container">
                <div className="contact_form_title">Get in touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between frrm">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      placeholder=" "
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      required
                    />
                    <span className="floating-label1">Your Name</span>
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_email input_field"
                      placeholder=" "
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      required
                    />
                    <span className="floating-label2">Your Email</span>
                    <input
                      type="tel"
                      id="contact_form_phone"
                      className="contact_form_phone input_field"
                      placeholder=" "
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      required
                    />
                    <span className="floating-label3">Your Phone No</span>
                  </div>
                  <div className="contact_form_text">
                    <textarea
                      className="text_field contact_form_message "
                      id=""
                      cols="30"
                      rows="7"
                      placeholder=" "
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      required
                    />
                    <span className="floating-label4">Message</span>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      onClick={contactForm}
                      className="button contact_submit_button"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

export default Contact;
