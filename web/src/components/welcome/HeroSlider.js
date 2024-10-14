import React, { useState } from 'react';
import heroImage1 from '../../assets/images/hero-slider-1.jpg'; // Imagem do primeiro slide

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      subtitle: "History and Financial Security",
      title: "For those who value a trustworthy bank",
      text: "Come discover our secure and transparent financial solutions",
      img: heroImage1,
    },
    {
      subtitle: "Innovation and Financial Trust",
      title: "Where each investment shapes your future",
      text: "Join us and discover our innovative financial solutions",
      img: heroImage1,
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero text-center" aria-label="home" id="home">
      <ul className="hero-slider" data-hero-slider>
        {slides.map((slide, index) => (
          <li className={`slider-item ${activeSlide === index ? 'active' : ''}`} data-hero-slider-item key={index}>
            <div className="slider-bg">
              <img src={slide.img} width="1880" height="950" alt="" className="img-cover" />
            </div>
            <p className="label-2 section-subtitle slider-reveal">{slide.subtitle}</p>
            <h1 className="display-1 hero-title slider-reveal">{slide.title}</h1>
            <p className="body-2 hero-text slider-reveal">{slide.text}</p>
          </li>
        ))}
      </ul>
      <button className="slider-btn prev" aria-label="slide to previous" onClick={handlePrev}>
        <ion-icon name="chevron-back"></ion-icon>
      </button>
      <button className="slider-btn next" aria-label="slide to next" onClick={handleNext}>
        <ion-icon name="chevron-forward"></ion-icon>
      </button>
    </section>
  );
};

export default HeroSection;
