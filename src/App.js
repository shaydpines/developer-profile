import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contrastToggle, setContrastToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Load dark mode preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setContrastToggle(true);
    }
  }, []);

  // 🔹 Save preference whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", contrastToggle);
  }, [contrastToggle]);

  function toggleContrast() {
    setContrastToggle((prev) => !prev);
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

  // 🔹 Build the classes for the root div
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
      <Footer handleContactClick={handleContactClick} />
    </div>
  );
}

export default App;
