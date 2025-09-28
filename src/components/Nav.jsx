import React from "react";
import RLP from "../assets/RLP.png";
import { FaCircleHalfStroke } from "react-icons/fa6";

export default function Nav({ toggleContrast, handleContactClick }) {
  return (
    <nav>
      <div className="nav__row">
        <div className="nav__logo--wrapper">
          <img className="nav__logo" src={RLP} alt={"RLP"} />
        </div>
        <ul className="nav__link--list">
          <li className="nav__link">
            <a
              href="#"
              onClick={handleContactClick}
              className="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
            >
              About
            </a>
          </li>
          <li className="nav__link">
            <a
              href="#projects"
              className="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
            >
              Projects
            </a>
          </li>
          <li className="nav__link">
            <a
              href="#"
              onClick={handleContactClick}
              className="nav__link--anchor
              link__hover-effect
              link__hover-effect--black
              "
            >
              Contact
            </a>
          </li>
          <li className="nav__link">
            <div
              className="nav__link--anchor
              click"
              onClick={toggleContrast}
            >
              <FaCircleHalfStroke />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
