import React from "react";
import aboutBanner from "../../assets/images/about-banner.jpg"; // Ajuste o caminho conforme a localização da imagem
import badgeImage from "../../assets/images/badge-1.png"; // Ajuste o caminho conforme a localização da imagem
import shapeImage from "../../assets/images/shape-1.png"; // Ajuste o caminho conforme a localização da imagem

const About = () => {
  return (
    <section
      className="section about text-center"
      aria-labelledby="about-label"
      id="about"
    >
      <div className="container">
        <div className="about-content">
          <p className="label-2 section-subtitle" id="about-label">
            Our Legacy
          </p>
          <h2 className="headline-1 section-title">
            Each transaction tells a unique story
          </h2>
          <p className="section-text">
            Uncle Scrooge's Bank is dedicated to providing reliable financial
            services with a touch of heritage and trust.
          </p>
          <p className="section-text">
            Founded by the legendary Uncle Scrooge McDuck in Duckburg, our
            bank's rich history of perseverance and ingenuity has made it the
            best in the business. With a foundation built on hard work, smart
            investments, and unrivaled financial acumen, Uncle Scrooge's Bank
            stands as a testament to excellence and trust.
          </p>
          <p className="section-text">
            Today, we continue his legacy by offering top-notch banking services
            that reflect his commitment to security, innovation, and
            customer-centric solutions. Experience the legacy of the greatest
            financier in Duckburg history with Uncle Scrooge's Bank.
          </p>
          {/* Contato */}
          <div className="contact-label">Contact Us</div>
          <a
            href="tel:+30123456789"
            className="body-1 contact-number hover-underline"
          >
            +1 555-123-4567
          </a>
        </div>

        {/* Imagens */}
        <figure className="about-banner">
          <img
            src={aboutBanner}
            loading="lazy"
            alt="about banner"
            className="w-100"
            data-parallax-item
            data-parallax-speed="1"
          />
          <div
            className="abs-img abs-img-1 has-before"
            data-parallax-item
            data-parallax-speed="1.75"
          >
            <img src={shapeImage} loading="lazy" alt="" className="w-100" />
          </div>
          <div className="abs-img abs-img-2 has-before">
            <img
              src={badgeImage}
              loading="lazy"
              alt=""
              width="150" // ajuste para a largura desejada
              height="100" // ajuste para a altura desejada
            />
          </div>
        </figure>
      </div>
    </section>
  );
};

export default About;
