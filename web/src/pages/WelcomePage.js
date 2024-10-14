import React from "react";
import "../styles/Welcome.css";
import Header from "../components/welcome/Header";
import HeroSlider from "../components/welcome/HeroSlider";
import About from "../components/welcome/About";
import Services from "../components/welcome/Services";
import Contact from "../components/welcome//Contact";
import Footer from "../components/welcome/Footer";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <Header />
      <main>
        <HeroSlider />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
