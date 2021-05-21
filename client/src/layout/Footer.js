import React, { useState, useCallback, useEffect } from 'react';

const FooterSocialMedia = () => {
  return (
    <div className="social-media">
      <a rel="nofollow" href="https://gmail.com">
        <img
          src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg"
          alt=""
        />
      </a>
      <a rel="nofollow" href="https://twitter.com">
        <img src="https://www.svgrepo.com/show/183608/twitter.svg" alt="" />
      </a>
      <a rel="nofollow" href="https://instagram.com/bihani.priya">
        <img src="https://www.svgrepo.com/show/111199/instagram.svg" alt="" />
      </a>
      <a rel="nofollow" href="https://github.com">
        <img
          src="https://www.svgrepo.com/show/217753/github.svg"
          className="github"
          alt=""
        />
      </a>
    </div>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFooterMessage()
  })

  const setFooterMessage = useCallback(() => { setMessage('Enter Your Email here to subscribe for Newsletter') }
    , [])

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
