import React from "react";
import FooterSocialMedia from "./footerSocialMedia";
import FooterNewsletterForm from "./footerNewsletter";

const Footer = () => {
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
          <FooterNewsletterForm />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
