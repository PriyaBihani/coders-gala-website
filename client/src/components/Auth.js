import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { register, login } from "../actions/auth";
import { Seo } from "../helpers";

const Auth = ({ login, register, token, type }) => {
  const [data, setData] = useState({});

  if (token) return <Redirect to="/learn" />;
  const dinText = "<Coders Gala/>";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == "signup") {
      document.querySelector(".section h1").classList.add("changed");

      register(data);
    } else {
      e.preventDefault();
      document.querySelector(".section h1").classList.add("changed");
      login(data);
    }
  };

  return (
    <div className="auth-container">
      <Seo title="LogIn" />
      <div className="container">
        <div className="form-container">
          <div className="section">
            <h6 className="dinTag">{dinText}</h6>
            {type == "signup" ? (
              <>
                <h1>Sign Up</h1>
                <p>Hey, Welcome to CodersGala !!</p>
              </>
            ) : (
              <>
                <h1>Login</h1>
                <p>Hey there, Welcome Back !!</p>
              </>
            )}
            <form onSubmit={handleSubmit}>
              <div className={type == "signup" ? "flex" : ""}>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    type="email"
                    className="form-control"
                    required
                    placeholder="First Name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    required
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    type="password"
                    className="form-control"
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>
              {type == "signup" ? (
                <>
                  {" "}
                  <div className="flex">
                    <div className="form-field">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }));
                        }}
                        type="text"
                        id="lastName"
                        className="form-control"
                        required
                        placeholder="First Name"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }));
                        }}
                        type="text"
                        id="lastName"
                        className="form-control"
                        required
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="form-field">
                      <label htmlFor="age">Age</label>
                      <input
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            age: e.target.value,
                          }));
                        }}
                        type="number"
                        id="age"
                        className="form-control"
                        required
                        placeholder="Age"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="codeReferred">Refer Code</label>
                      <input
                        type="text"
                        id="codeReferred"
                        placeholder="PB18FC69"
                        defaultValue=""
                        className="form-control"
                        onChange={(e) => {
                          setData((prev) => ({
                            ...prev,
                            codeReffered: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {type == "signup" ? (
                <div className="form-options">
                  <div className="checkbox-field">
                    <label htmlFor="rememberMe">Have an account?</label>
                  </div>
                  <NavLink to="/login">Login</NavLink>
                </div>
              ) : (
                <div className="form-options">
                  <div className="checkbox-field">
                    <label htmlFor="rememberMe">Forgot Password?</label>
                  </div>
                  <NavLink to="/signup">SignUp</NavLink>
                </div>
              )}
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { login, register })(Auth);
