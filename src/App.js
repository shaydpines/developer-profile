import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contrastToggle, setContrastToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setContrastToggle(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", contrastToggle);
  }, [contrastToggle]);

  function toggleContrast() {
    setContrastToggle((prev) => !prev);
  }

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!isModalOpen) {handleContactClick(e);}
  }

  const handleContactClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      toggleModal();
    } else {
      navigate("/", { state: { openModal: true } });
    }
  };

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  const appClasses = [
    "app",
    contrastToggle ? "dark-theme" : "",
    isModalOpen ? "modal--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={appClasses}>
      <Nav
        toggleContrast={toggleContrast}
        handleContactClick={handleContactClick}
      />
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
      <Footer scrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
