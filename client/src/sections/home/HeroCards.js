import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroCards = () => {
  // refs for the three section
  const heroBlue = useRef();
  const heroOrange = useRef();
  const heroGreen = useRef();

  const scrollFunction = () => {
    window.addEventListener("scroll", () => {
      var scroll = window.scrollY;
      if (scroll < 150) {
        heroBlue.current.classList.remove("one");
        heroOrange.current.classList.remove("three");
        heroGreen.current.classList.remove("two");
      }
      if (scroll > 150 && scroll < 450) {
        heroBlue.current.classList.add("one");
        heroOrange.current.classList.remove("three");
        heroGreen.current.classList.remove("two");
      }
      if (scroll > 450 && scroll < 650) {
        heroGreen.current.classList.add("two");
        heroBlue.current.classList.remove("one");
        heroOrange.current.classList.remove("three");
      }
      if (scroll > 650) {
        heroGreen.current.classList.add("two");
        heroBlue.current.classList.remove("one");
        heroOrange.current.classList.add("three");
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
      document.addEventListener("DOMContentLoaded", () => {
        heroGreen.current.classList.add("two");
        heroOrange.current.classList.add("three");
        heroBlue.current.classList.add("one");
        window.setTimeout(() => {
          heroBlue.current.classList.remove("one");
          window.setTimeout(() => {
            heroGreen.current.classList.remove("two");
            window.setTimeout(() => {
              heroOrange.current.classList.remove("three");
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
        <Link to="/about">
          <span
            ref={heroBlue}
            className="hero-box__circle hero-box__circle--blue"
          ></span>
          <h2 className="hero-box__title">What is CodersGala?</h2>
          <p className="hero-box__body">
            CodersGala is a free to use platform for all those people who are
            unwilling to pay high ransom to these crooked coaching centers for
            learning web Development. We won't be spoon feeding you but we will
            guide you. Anyway, if you are eager to learn you will find a way.
          </p>
        </Link>
        <Link to="/about/#aboutus">
          <span
            ref={heroGreen}
            className="hero-box__circle hero-box__circle--green"
          ></span>
          <h2 className="hero-box__title">Who are we?</h2>
          <p className="hero-box__body">
            We started web development on our own, with no direction and no
            coaching. All we had was determination and internet. We consider
            ourselves lucky to be able to provide the support that had been
            provided to us.
          </p>
        </Link>
        <Link to="/learn">
          <span
            ref={heroOrange}
            className="hero-box__circle hero-box__circle--orange"
          ></span>
          <h2 className="hero-box__title">Start Learning ..</h2>
          <p className="hero-box__body">
            Right now we have the articles on front-end-development. We are
            working tirelessly to cover backend. We will have the articles aired
            on backend before september. The course will cover Front-end, API,
            Nodejs-express, MongoDb, MySQL, Hosting, React, Firebase... and a
            lot more projects.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default HeroCards;
