import React from "react";
import resume from "../assets/Software Resume 2025.pdf";

export default function Footer({ scrollToTop }) {
  return (
    <footer>
      <div className="container">
        <div className="row footer__row">
          <figure>
            <img className="footer__logo--img" src="./assets/logo.svg" alt="" />
          </figure>
          <div className="footer__social--list">
            <a
              href="https://github.com/shaydpines"
              target="_blank"
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/rafael-ladmer-price-8113a3a7/"
              target="_blank"
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              LinkedIn
            </a>
            <a
              href="/"
              onClick={scrollToTop}
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Contact
            </a>
            <a
              href={resume}
              target="_blank"
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Resume
            </a>
          </div>
          <div className="footer__copyright">Copyright &copy;2025</div>
        </div>
      </div>
    </footer>
  );
}
