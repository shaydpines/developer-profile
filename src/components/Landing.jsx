import React from "react";

import { FaEnvelope, FaRegFilePdf } from "react-icons/fa6";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import resume from "../assets/Software Resume 2025.pdf";
import Sphere from "./Sphere";

export default function Landing({ handleContactClick }) {

  return (
    <section id="landing">
      <header className="header">
        <div className="header__intro">
          <h1
            className="title"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            Hey
          </h1>
          <h1
            className="title"
            data-aos="fade-right"
            data-aos-delay="600"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <span className="color--text">I'm Rafael,</span>
          </h1>
          <p
            id="first-animation-trigger"
            className="header__para"
            data-aos="fade-right"
            data-aos-delay="1500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            I'm a <b className="color--text">Frontend Software Engineer</b> who
            specializes in crafting clean, responsive, and user-friendly web
            applications. I have a strong foundation in{" "}
            <b className="color--text">HTML, CSS, JavaScript, and React.</b> I
            thrive on solving problems, optimizing performance, and building
            intuitive user experiences that merge functionality with aesthetics.
            <br />
            Here's a bit more <b className="color--text">about me:</b>
          </p>
          <ul className="header__link--list">
            {[
              { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
              { href: "https://github.com/shaydpines", icon: <FaGithub /> },
              { href: resume, icon: <FaRegFilePdf /> },
            ].map((item, i) => (
              <li
                key={i}
                className="header__link color--background"
                data-aos="fade-up"
                data-aos-anchor="#first-animation-trigger"
                data-aos-delay={i * 300}
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
              >
                <a
                  href={item.href}
                  target="_blank"
                  className="header__link--anchor click"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a href="#projects" className="scroll">
          <div className="scroll__icon click"></div>
        </a>
        <div className="landing__sphere--wrapper"
        data-aos="zoom-in"
        data-aos-duration="3000">
          <Sphere />
        </div>
      </header>
      <button className="mail__btn" onClick={handleContactClick}>
        <FaEnvelope className="click" />
      </button>
    </section>
  );
}
