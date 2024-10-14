import React from 'react';
import mcduckLogo from '../../assets/images/mcduck-logo.png'; // Imagem do logo
import navLogo from '../../assets/logo.svg'; // Imagem do logo da navegação

const Header = () => {
  const handleNavToggle = () => {
    const navbar = document.querySelector('[data-navbar]');
    navbar.classList.toggle('active');
  };

  return (
    <header className="header" data-header>
      <div className="container">
        <a href="#" className="logo">
          <img src={mcduckLogo} width="100" height="50" alt="McDuck Bank - Home" />
        </a>
        {/* Navigation */}
        <nav className="navbar" data-navbar>
          <button className="close-btn" aria-label="close service" onClick={handleNavToggle}>
            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
          </button>
          <a href="#" className="logo">
            <img src={navLogo} width="160" height="50" alt="Uncle Scrooge's Bank - Home" />
          </a>
          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#home" className="navbar-link hover-underline active" id="nav-home">
                <div className="separator"></div>
                <span className="span">Home</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#services" className="navbar-link hover-underline" id="nav-services">
                <div className="separator"></div>
                <span className="span">Services</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#about" className="navbar-link hover-underline" id="nav-about">
                <div className="separator"></div>
                <span className="span">About Us</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#contact" className="navbar-link hover-underline" id="nav-contact">
                <div className="separator"></div>
                <span className="span">Contact</span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="/authentication" className="navbar-link hover-underline" id="nav-login">
                <div className="separator"></div>
                <span className="span">Login</span>
              </a>
            </li>
          </ul>
          <div className="text-center">
            <p className="headline-1 navbar-title">Visit Us</p>
            <address className="body-4">
              Money Bin St, Duckburg, <br />
              Calisota 12345, US
            </address>
            <p className="body-4 navbar-text">Open: 9 am - 5 pm</p>
            <a href="mailto:info@mcduckbank.com" className="body-4 sidebar-link">info@mcduckbank.com</a>
            <div className="separator"></div>
            <p className="contact-label">Customer Service</p>
            <a href="tel:+11234567890" className="body-1 contact-number hover-underline">+1 (123) 456-7890</a>
          </div>
        </nav>
        <button className="nav-open-btn" aria-label="open service" onClick={handleNavToggle}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>
        <div className="overlay" data-nav-toggler data-overlay></div>
      </div>
    </header>
  );
};

export default Header;
