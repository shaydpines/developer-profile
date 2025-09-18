import React from "react";

export default function Footer() {
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
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Github
            </a>
            <a
              href=""
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              LinkedIn
            </a>
            <a
              href="htt"
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Contact
            </a>
            <a
              href="htt"
              className="footer__social--link link__hover-effect link__hover-effect--white"
            >
              Resume
            </a>
          </div>
          <div className="footer__copyright">Copyright 2025</div>
        </div>
      </div>
    </footer>
  );
}
