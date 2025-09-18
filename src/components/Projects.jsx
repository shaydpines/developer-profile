import React from "react";
import RLP from '../assets/RLP.png'

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="row">
          <h1 className="section__title">
            Here are some of my <span className="color--text">projects.</span>
          </h1>
          <ul className="project__list">
            <li className="project">
              <div className="project__wrapper">
                <img
                  src={RLP}
                  alt=""
                  className="project__img"
                />
                <div className="project__wrapper--background"></div>
                <div className="project__description">
                  <h3 className="project__description--title">Car Sales Project</h3>
                  <h4 className="project__description--sub-title">
                    Html, CSS, Javascript, Vue, Vuex
                  </h4>
                  <p className="project__description--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora animi voluptate numquam sit necessitatibus
                    perferendis hic impedit aperiam fuga, tenetur laboriosam
                    reprehenderit distinctio dicta, mollitia repudiandae natus
                    tempore laudantium nobis!
                  </p>
                  <div className="project__description--links">
                    <a href="" className="project__description--link">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="" className="project__description--link">
                      <i className="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="project">
              <div class="project__wrapper">
                <img
                  src={RLP}
                  alt=""
                  class="project__img"
                />
                <div class="project__wrapper--background"></div>
                <div class="project__description">
                  <h3 class="project__description--title">Car Sales Project</h3>
                  <h4 class="project__description--sub-title">
                    Html, CSS, Javascript, Vue, Vuex
                  </h4>
                  <p class="project__description--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora animi voluptate numquam sit necessitatibus
                    perferendis hic impedit aperiam fuga, tenetur laboriosam
                    reprehenderit distinctio dicta, mollitia repudiandae natus
                    tempore laudantium nobis!
                  </p>
                  <div class="project__description--links">
                    <a href="" class="project__description--link">
                      <i class="fab fa-github"></i>
                    </a>
                    <a href="" class="project__description--link">
                      <i class="fas fa-link"></i>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
