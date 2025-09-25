import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

export default function Project({ image, title, tools, description, github, link }) {
  return (
    <div className="project">
              <div className="project__wrapper">
                <img
                  src={image}
                  alt=""
                  className="project__img"
                />
                <div className="project__wrapper--background"></div>
                <div className="project__description">
                    <div className="project__description--row">
                  <h3 className="project__description--title">{title}</h3>
                  <h4 className="project__description--sub-title">
                    {tools}
                  </h4>
                  <p className="project__description--para">
                    {description}
                  </p>
                  <div className="project__description--links">
                    <a href={github} className="project__description--link">
                      <FaGithub />
                    </a>
                    <a href={link} className="project__description--link">
                      <FaLink />
                    </a>
                  </div>
                    </div>
                </div>
              </div>
            </div>
  )
}
