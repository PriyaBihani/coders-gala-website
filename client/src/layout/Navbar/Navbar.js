/* eslint-disable */
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// jQuery-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// import $ from "jquery";

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// logo imports
import Logo from "./images/codersgalaLogo.PNG";

import $ from "jquery";

const Navbar = ({ auth }) => {
  // -------------------------------------------------
  console.log(auth.user);
  // =-=-

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 767) {
        $("body .logo").css({
          "font-size": "2rem",
        });
        $(".dropdown-accordion").removeClass("dropdown-accordion");
      }

      $(window).resize(function () {
        if (window.innerWidth >= 767) {
          $("body .logo").css({
            "font-size": "2rem",
          });
          $(".dropdown-accordion").removeClass("dropdown-accordion");
        } else {
          $("body .logo").css({
            "font-size": "1.2rem",
          });
        }
      });
    }

    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  }, []);

  // Getting the current mode from local storage
  if (typeof window !== "undefined") {
    let mode = "light";

    mode = localStorage.getItem("mode");

    if (mode === "dark") {
      $("body").addClass("dark");
      $(".mode-icon").attr("src", "https://www.svgrepo.com/show/3158/moon.svg");
      $("#circle").css("background-color", "#111");
      $(".switch").addClass("switched");
    } else {
      $("body").removeClass("dark");
      $(".mode-icon").attr("src", "https://www.svgrepo.com/show/83726/sun.svg");
      $("#circle").css("background-color", "#f1f1f1");
      $(".switch").removeClass("switched");
    }
  }

  //

  const links = <SignedOutLinks />;
  return (
    <div className="navigation-wrap bg-light start-header start-style">
      <div className="container">
        <Accordion className="dropdown-accordion">
          <Row>
            <Col>
              <nav className="navbar navbar-expand-md navbar-light">
                <Link to="/">
                  <img className="nav-logo" src={Logo} alt="" />
                </Link>
                <div
                  id="switch"
                  onClick={() => {
                    if ($("body").hasClass("dark")) {
                      $("body").removeClass("dark");
                      localStorage.setItem("mode", "light");
                      $(".mode-icon").attr(
                        "src",
                        "https://www.svgrepo.com/show/83726/sun.svg"
                      );
                      $("#circle").css("background-color", "#f1f1f1");
                      $(".switch").removeClass("switched");
                    } else {
                      $("body").addClass("dark");
                      localStorage.setItem("mode", "dark");
                      $(".mode-icon").attr(
                        "src",
                        "https://www.svgrepo.com/show/3158/moon.svg"
                      );
                      $("#circle").css("background-color", "#111");
                      $(".switch").addClass("switched");
                    }
                    // window.location.reload();
                  }}
                  className="switch float-right"
                >
                  <div id="circle">
                    <img
                      className="mode-icon"
                      style={{ width: "20px" }}
                      alt=""
                    />
                  </div>
                </div>
                <div className="points-box ">
                  <div>
                    <span className="points-text"> Points </span>
                    <span>
                      <img
                        src="https://image.flaticon.com/icons/svg/715/715709.svg"
                        className="points-img"
                      />
                    </span>
                    <span> {auth.user && auth.user.points} </span>
                  </div>
                </div>

                <div className="signed-links">
                  {auth.user && auth.user.userId ? (
                    <>
                      <SignedInLinks />
                    </>
                  ) : (
                    <SignedOutLinks />
                  )}
                </div>

                <Accordion.Toggle
                  className="nav-btn"
                  onClick={() => {
                    if ($(".navbar-toggler").attr("aria-expanded") == "false") {
                      $(".navbar-toggler").attr("aria-expanded", "true");
                    } else {
                      $(".navbar-toggler").attr("aria-expanded", "false");
                    }
                  }}
                  as={Button}
                  variant="link"
                  eventKey="5"
                >
                  <a
                    className="navbar-toggler"
                    type="button"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </a>
                </Accordion.Toggle>
                <Accordion.Collapse
                  className=" "
                  id="navbarSupportedContent"
                  eventKey="5"
                >
                  <div>
                    {auth.user && auth.user.userId ? (
                      <SignedInLinks />
                    ) : (
                      <SignedOutLinks />
                    )}
                  </div>
                </Accordion.Collapse>
              </nav>
            </Col>
          </Row>
        </Accordion>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Navbar);
