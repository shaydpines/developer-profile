import React from "react";

import { FaEnvelope, FaRegFilePdf } from "react-icons/fa6";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import resume from "../assets/RLP.png";
import Sphere from "./Sphere";

export default function Landing({ handleContactClick }) {

  return (
    <section id="landing">
      <header className="header">
        <div className="header__intro">
          <h1 className="title">Hey</h1>
          <h1 className="title">
            <span className="color--text">I'm Rafael,</span>
          </h1>
          <p className="header__para">
            I'm a <b className="color--text">Frontend Software Engineer</b> who
            specializes in crafting clean, responsive, and user-friendly web
            applications. I have a strong foundation in{" "}
            <b className="color--text">HTML, CSS, JavaScript, and React.</b> I
            thrive on solving problems, optimizing performance, and building
            intuitive user experiences that merge functionality with aesthetics.
            <br />
            Here's a bit more <b className="color--text">about me.</b>
          </p>
          <ul className="header__link--list">
            <li className="header__link color--background">
              <a
                href="https://www.linkedin.com/in/rafael-ladmer-price-8113a3a7/"
                target="_blank"
                className="header__link--anchor click"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="header__link color--background">
              <a
                href="https://github.com/shaydpines"
                target="_blank"
                className="header__link--anchor click"
              >
                <FaGithub />
              </a>
            </li>
            <li className="header__link color--background">
              <a
                href={resume}
                target="_blank"
                className="header__link--anchor click"
              >
                {/* Change out for your resume soon! */}
                <FaRegFilePdf />
              </a>
            </li>
          </ul>
        </div>
        <div className="landing__sphere--wrapper">
          <Sphere />
        </div>
      </header>
      <button className="mail__btn" onClick={handleContactClick}>
        <FaEnvelope className="click" />
      </button>

      <a href="#projects" className="scroll">
        <div className="scroll__icon click"></div>
      </a>
    </section>
  );
}
