import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMounted = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      toggleModal();
    } else {
      navigate("/", { state: { openModal: true } });
    }
  };

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (!isModalOpen) {
      return document.body.classList.remove("modal--open");
    }
    setTimeout(() => {
      document.body.classList += "modal--open";
    }, 1);
  }, [isModalOpen]);

  return (
    <>
      <Nav handleContactClick={handleContactClick} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isModalOpen={isModalOpen}
              toggleModal={toggleModal}
              handleContactClick={handleContactClick}
            />
          }
        />
      </Routes>
      <Footer handleContactClick={handleContactClick} />
    </>
  );
}

export default App;
