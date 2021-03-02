import React from "react";
import { Row, Col } from "react-bootstrap";

const ProfileCard = ({ data }) => {
  return (
    <aside className="profile-card">
      <header>
        <img src="" alt="" />
        <h1>{data.name}</h1>
        <h2>Hello!</h2>
      </header>
      <div className="profile-bio">
        <p>{data.bio}</p>
        <ul className="social-icons list-unstyled list-inline">
          <li>
            <a target="__blank" href={data.portfolioUrl}>
              <img
                style={{ width: "25px" }}
                src="https://www.svgrepo.com/show/188990/browser-website.svg"
                alt=""
              />
            </a>
          </li>
          <li>
            <a target="__blank" href={data.instaUrl}>
              <img
                style={{ width: "25px" }}
                src="https://www.svgrepo.com/show/111199/instagram.svg"
                alt=""
              />
            </a>
          </li>
          <li>
            <a target="__blank" href={data.twitterUrl}>
              <img
                style={{ width: "25px" }}
                src="https://www.svgrepo.com/show/183608/twitter.svg"
                alt=""
              />
            </a>
          </li>
          <li>
            <a target="__blank" href={data.githubUrl}>
              <img
                style={{ width: "25px" }}
                src="https://www.svgrepo.com/show/217753/github.svg"
                className="github"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const AboutUs = () => {
  if (typeof window !== "undefined") {
    window.onscroll = function () {
      myFunction();
    };

    function myFunction() {
      if (window.scrollY > 1550) {
        document
          .querySelector(".profile-card")
          .classList.add("profile-card-anim");
      }
    }
  }

  return (
    <div className="about-us-container">
      <div>
        <div className="about-us-heading">
          <h2>
            About <span>Us</span>
          </h2>
        </div>
        <div className="about-us-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolor
          dolore odit, neque itaque iure quas mollitia nihil cumque rem harum
          consequuntur consectetur. Autem fugit, doloribus sint enim error sequi
          quo rem minima magni excepturi expedita mollitia recusandae harum
          alias repellendus, sit voluptate facilis similique at in asperiores
          sunt inam saepe qui. Nisi minima ipsa illo tempore quod enim eum
          quidem?
        </div>
      </div>
      <div className="profile-cards">
        <Row>
          <Col lg={6}>
            <ProfileCard
              data={{
                name: "Priya",
                portfolioUrl: "https://know-priya-bihani.vercel.app",
                instaUrl: "https://www.instagram.com/bihani.priya",
                githubUrl: "https://www.github.com/PriyaBihani",
                twitterUrl: "https://twitter.com/p_bihani",
                bio:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt tempora eveniet quae neque hic doloribus voluptatibus incidunt quia facilis blanditiis.",
              }}
            />
          </Col>

          <Col lg={6}>
            <ProfileCard
              data={{
                name: "Kartik",
                portfolioUrl: "https://google.com",
                instaUrl: "https://www.instagram.com/bihani.priya",
                githubUrl: "https://www.github.com/kartik18g",
                twitterUrl: "https://twitter.com/Gkaartik",
                bio:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt tempora eveniet quae neque hic doloribus voluptatibus incidunt quia facilis blanditiis.",
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUs;
