import React from "react";
import { FaEnvelope, FaRegFilePdf } from "react-icons/fa6";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Landing() {
  return (
    <section id="landing-page">
      <header class="header">
        <h1 class="title">Hey</h1>
        <h1 class="title color__text">I'm Rafael,</h1>
        <p class="header__para">
          I'm a <b class="color--text">Frontend Software Engineer</b> who
          specializes in crafting clean, responsive, and user-friendly web
          applications. I have a strong foundation in{" "}
          <b class="color--text">HTML, CSS, JavaScript, and React.</b> I thrive
          on solving problems, optimizing performance, and building intuitive
          user experiences that merge functionality with aesthetics.
          <br />
          Here's a bit more <b class="color--text">about me.</b>
        </p>
        <ul class="header__link--list">
          <li class="header__link color--background">
            <a
              href="https://www.linkedin.com/in/rafael-ladmer-price-8113a3a7/"
              target="_blank"
              class="header__link--anchor click"
            >
              <FaLinkedinIn />
            </a>
          </li>
          <li class="header__link color--background">
            <a
              href="https://github.com/shaydpines"
              target="_blank"
              class="header__link--anchor click"
            >
              <FaGithub />
            </a>
          </li>
          <li class="header__link color--background">
            <a
              href="./assets/Resume.pdf"
              target="_blank"
              class="header__link--anchor click"
            >
              {/* Change out for your resume soon! */}
              <FaRegFilePdf />
            </a>
          </li>
        </ul>
      </header>
      <button class="mail__btn click">
        <FaEnvelope />
      </button>
      <button>
        <a href="#projects" class="scroll">
          <div class="scroll__icon click"></div>
        </a>
      </button>
    </section>
  );
}
