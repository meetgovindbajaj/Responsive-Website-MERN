import React, { createContext, useReducer } from "react";
import Navbar from "./conponents/Navbar";
import Home from "./conponents/Home";
import About from "./conponents/About";
import Contact from "./conponents/Contact";
import Login from "./conponents/Login";
import Register from "./conponents/Register";
import Logout from "./conponents/Logout";
import ErrorPage from "./conponents/ErrorPage";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/About">
        <About />
      </Route>
      <Route path="/Contact">
        <Contact />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/Register">
        <Register />
      </Route>
      <Route path="/Logout">
        <Logout />
      </Route>
      <Route path="/">
        <ErrorPage />
      </Route>
    </Switch>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
