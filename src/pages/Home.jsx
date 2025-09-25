import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Modal from "../components/Modal";

export default function Home({ isModalOpen, toggleModal, handleContactClick }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openModal) {
      toggleModal();
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <Landing handleContactClick={handleContactClick} />
      <Projects />
    </>
  );
}
