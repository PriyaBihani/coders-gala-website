/* eslint-disable */
import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { register } from '../actions/auth';

const SignUp = ({ register, token }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState();
  const [codeReferred, setCodeReferred] = useState('');
  const [data, setData] = useState({});

  if (token) return <Redirect to="/learn" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector('.sign-in-section h1').classList.add('changed');
    console.log(data);
    register(data);
  };

  const dinText = '<Coders Gala/>';
  return (
    <div className="login-form-container">
      <Helmet>
        <title>Coders Gala - SignUp</title>
        <meta name="description" content="Coders Gala SignUp page." />
      </Helmet>
      <div className="login-container">
        <div className="login-form">
          <div className="sign-in-section">
            <h6 className="dinTag">{dinText}</h6>
            <h1>SignUp</h1>
            <p>Hey, Welcome Back !!</p>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, email: e.target.value }));
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
                    setData((prev) => ({ ...prev, password: e.target.value }));
                  }}
                  type="password"
                  id="password"
                  className="pass-input"
                  placeholder="*********"
                />
              </div>
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
                    setData((prev) => ({ ...prev, lastName: e.target.value }));
                  }}
                  type="text"
                  id="lastName"
                  className="form-control"
                  required
                  placeholder="Last Name"
                />
              </div>
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
              <div className="form-options">
                <div className="checkbox-field">
                  <label htmlFor="rememberMe">Forgot Password?</label>
                </div>
                <NavLink to="/login">Login</NavLink>
              </div>
              <div className="form-field">
                <input
                  type="submit"
                  className="btn btn-signin"
                  value="Submit"
                />
              </div>

              <div className="text-danger text-center text-uppercase">
                message here
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

export default connect(mapStateToProps, { register })(SignUp);
