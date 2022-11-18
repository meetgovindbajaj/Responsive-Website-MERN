import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    fetch("/Logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast.warn(`You Have Been Logged Out!`);
        // console.log(history);
        dispatch({ type: "USER", payload: false });
        history.push("/Login", { replace: true });

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  });
  return (
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
  );
};

export default Logout;
