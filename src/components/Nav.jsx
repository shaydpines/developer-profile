import React from "react";
import RLP from "../assets/RLP.png";
import { FaCircleHalfStroke } from "react-icons/fa6";

export default function Nav() {
  return (
    <nav>
      <figure className="nav__logo--wrapper">
        <img className="nav__logo" src={RLP} alt={"RLP"} />
      </figure>
      <ul class="nav__link--list">
        <li class="nav__link">
          <a
            href="#"
            class="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
          >
            About
          </a>
        </li>
        <li class="nav__link">
          <a
            href="#"
            class="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
          >
            Projects
          </a>
        </li>
        <li class="nav__link">
          <a
            href="#"
            class="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
          >
            Contact
          </a>
        </li>
        <li class="nav__link">
          <a
            href="#"
            class="
            nav__link--anchor
            link__hover-effect
            link__hover-effect--black
            "
          >
            <FaCircleHalfStroke />
          </a>
        </li>
      </ul>
    </nav>
  );
}
