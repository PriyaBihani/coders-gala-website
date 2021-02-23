import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const BottomSection = () => {
  const scrollFunction = () => {
    window.addEventListener("scroll", () => {
      var scroll = window.scrollY;
      if (scroll < 150) {
        document
          .querySelector(".hero-box__circle--blue")
          .classList.remove("one");
        document
          .querySelector(".hero-box__circle--orange")
          .classList.remove("three");
        document
          .querySelector(".hero-box__circle--green")
          .classList.remove("two");
      }
      if (scroll > 150 && scroll < 450) {
        document.querySelector(".hero-box__circle--blue").classList.add("one");
        document
          .querySelector(".hero-box__circle--orange")
          .classList.remove("three");
        document
          .querySelector(".hero-box__circle--green")
          .classList.remove("two");
      }
      if (scroll > 450 && scroll < 650) {
        document.querySelector(".hero-box__circle--green").classList.add("two");
        document
          .querySelector(".hero-box__circle--blue")
          .classList.remove("one");
        document
          .querySelector(".hero-box__circle--orange")
          .classList.remove("three");
      }
      if (scroll > 650) {
        document
          .querySelector(".hero-box__circle--orange")
          .classList.add("three");
        document
          .querySelector(".hero-box__circle--green")
          .classList.remove("two");
        document
          .querySelector(".hero-box__circle--blue")
          .classList.remove("one");
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 600) {
        window.addEventListener("scroll", scrollFunction);
      }
    }
    if (window.innerWidth > 600) {
      console.log("width is greater than 600");
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".hero-box__circle--green").classList.add("two");
        document
          .querySelector(".hero-box__circle--orange")
          .classList.add("three");
        document.querySelector(".hero-box__circle--blue").classList.add("one");
        window.setTimeout(() => {
          document
            .querySelector(".hero-box__circle--blue")
            .classList.remove("one");
          window.setTimeout(() => {
            document
              .querySelector(".hero-box__circle--green")
              .classList.remove("two");
            window.setTimeout(() => {
              document
                .querySelector(".hero-box__circle--orange")
                .classList.remove("three");
            }, 850);
          }, 750);
        }, 650);
      });
    }
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-box-container">
        <NavLink to="/about" className="hero-box">
          <span className="hero-box__circle hero-box__circle--blue"></span>
          <h2 className="hero-box__title">What is CodersGala?</h2>
          <p className="hero-box__body">
            CodersGala is a free to use platform for all those people who are
            unwilling to pay high ransom to these crooked coaching centers for
            learning web Development. We won't be spoon feeding you but we will
            guide you. Anyway, if you are eager to learn you will find a way.
          </p>
        </NavLink>
        <NavLink to="/about/#aboutus" className="hero-box">
          <span className="hero-box__circle hero-box__circle--green"></span>
          <h2 className="hero-box__title">Who are we?</h2>
          <p className="hero-box__body">
            We started web development on our own, with no direction and no
            coaching. All we had was determination and internet. We consider
            ourselves lucky to be able to provide the support that had been
            provided to us.
          </p>
        </NavLink>
        <NavLink to="/learn" className="hero-box">
          <span className="hero-box__circle hero-box__circle--orange"></span>
          <h2 className="hero-box__title">Start Learning ..</h2>
          <p className="hero-box__body">
            Right now we have the articles on front-end-development. We are
            working tirelessly to cover backend. We will have the articles aired
            on backend before september. The course will cover Front-end, API,
            Nodejs-express, MongoDb, MySQL, Hosting, React, Firebase... and a
            lot more projects.
          </p>
        </NavLink>
      </div>
    </section>
  );
};

export default BottomSection;
