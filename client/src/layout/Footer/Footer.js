import React, { useState } from "react";

const FooterSocialMedia = () => {
  return (
    <div className="social-media">
      <a rel="nofollow" href="#">
        <img
          src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
          alt=""
        />
      </a>
      <a rel="nofollow" href="#">
        <img src="https://www.svgrepo.com/show/183608/twitter.svg" alt="" />
      </a>
      <a rel="nofollow" href="#">
        <img src="https://www.svgrepo.com/show/111199/instagram.svg" alt="" />
      </a>
      <a rel="nofollow" href="#">
        <img
          src="https://www.svgrepo.com/show/217753/github.svg"
          className="github"
          alt=""
        />
      </a>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Enter Your Email here to subscribe for Newsletter"
  );
  return (
    <div className="footer-cont">
      <footer>
        <div className="footer-container">
          <div className="left-col">
            <span className="logo">Coders Gala</span>
            <FooterSocialMedia />
            <p className="rights-text">
              &copy; 2020 Coders Gala , All Rights Reserved
            </p>
          </div>
          <div className="right-col">
            <h1>Our Newsletter</h1>
            <div className="border"></div>
            <p>{message}</p>
            <form className=" form newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="Email"
                className="txtb"
                placeholder="Enter Your Email"
              />

              <input type="submit" value="submit" className="btn" />
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
