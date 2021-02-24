import React, { useState, useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Seo } from '../helpers';

const SignIn = ({ login, token }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (token) return <Redirect to="/learn" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector('.section h1').classList.add('changed');
    console.log({ email, password });
    login({ email, password });
  };

  const dinText = '<Coders Gala/>';

  return (
    <div className="auth-container">
      <Seo title="LogIn" />
      <div className="container">
        <div className="form-container">
          <div className="section">
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { login })(SignIn);
