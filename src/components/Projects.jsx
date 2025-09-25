import React from "react";
import MovieFinder from '../assets/MovieFinder.png'
import Ultraverse from '../assets/Ultraverse.png'
import Skinstric from '../assets/Skinstric.png'
import Project from "./Project";

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="row">
          <h1 className="section__title">
            Here are some of my <span className="color--text">projects.</span>
          </h1>
          <div className="project__list">
            <Project
              image={Skinstric}
              title={"Skinstric AI"}
              tools={"HTML, CSS, Javascript, React, Vite, Tailwind"}
              description={
                `Skinstric AI demo that enables users to register their name and location, 
                then capture or upload a photo using React Webcam. 
                The image is processed through an API that generates randomized demographic data, 
                which is displayed dynamically with options for users to refine and personalize 
                the results to better reflect their identity.`
              }
              github={"https://github.com/shaydpines/skinstric-vite"}
              link={"https://skinstric-vite.vercel.app/"}
            />
            <Project
              image={Ultraverse}
              title={"Ultraverse NFT Collections"}
              tools={"HTML, CSS, Javascript, React, Tailwind"}
              description={
                `NFT marketplace demo allowing users to browse NFT listings and view asset details, 
                as well as detalied information on creators and current owners. 
                Dynamic and responsive interface styled with Tailwind, Swiper, and Animate on Scroll,
                creating a smooth and responsive viewing experience.`
              }
              github={"https://github.com/shaydpines/rafael-internship"}
              link={"https://virtual-internship-steel.vercel.app/"}
            />
            <Project
              image={MovieFinder}
              title={"OMDb Search Engine"}
              tools={"HTML, CSS, Javascript, React"}
              description={
                `Search engine using the OMDb API to find films by title. 
                Once a film is selected a more specific API call is made to display further details. 
                Completely responsive and dynamic with built in animations and loading states.`
              }
              github={"https://github.com/shaydpines/movie-finder-react"}
              link={"https://movie-finder-react-five.vercel.app/"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
