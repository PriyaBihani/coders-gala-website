import React, { useState, useContext } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { login } from "../actions/auth";

import $ from "jquery";

const SignIn = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    $(".sign-in-section h1").addClass("changed");
    console.log({ email, password });
    login({ email, password });
    e.preventDefault();
  };

  const dinText = "<Coders Gala/>";

  return (
    <div className="login-form-container">
      <Helmet>
        <title>Coders Gala-LogIn</title>
        <meta name="description" content="Coders Gala LogIn Page" />
        <meta name="robots" content="index follow" />
      </Helmet>
      <div className="login-container">
        <div className="login-form">
          <div className="sign-in-section">
            <h6 className="dinTag">{dinText}</h6>
            <h1>Log in</h1>
            <p>Hey, Welcome Back !!</p>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  className="user-input"
                  required
                  placeholder="example@mail.com"
                />
              </div>
              <div className="htmlForm-field">
                <label htmlFor="password">Password</label>
                <input
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  id="password"
                  className="pass-input"
                  placeholder="*********"
                />
              </div>
              <div className="form-options">
                <div className="checkbox-field">
                  <label htmlFor="rememberMe">Forgot Password?</label>
                </div>
                <NavLink to="/signup">SignUp</NavLink>
              </div>
              <div className="form-field">
                <input
                  type="submit"
                  className="btn btn-signin"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login })(SignIn);
