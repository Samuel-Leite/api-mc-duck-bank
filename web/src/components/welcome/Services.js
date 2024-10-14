import React from 'react';
import serviceImage1 from '../../assets/images/service-1.jpg'; // Imagem do primeiro serviço
import serviceImage2 from '../../assets/images/service-2.jpg'; // Imagem do segundo serviço
import serviceImage3 from '../../assets/images/service-3.png'; // Imagem do terceiro serviço

const Services = () => {
  return (
    <section className="section service bg-black-10 text-center" aria-label="service" id="services">
      <div className="container">
        <p className="section-subtitle label-2">Elite Financial Services for Sophisticated Needs</p>
        <h2 className="headline-1 section-title">We Offer Top-Notch</h2>
        <p className="section-text">
          Our services are designed to meet the highest standards of quality and excellence,
          ensuring that you receive the best banking experience possible. From personalized banking solutions to
          expert investment advice, we are committed to providing services that exceed your expectations.
        </p>
        <ul className="grid-list">
          <li>
            <div className="service-card" id="service-personal">
              <a href="#" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                  <img src={serviceImage1} width="285" height="336" loading="lazy"
                    alt="Banking Services" className="img-cover" />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#" id="card-personal">Personal Banking</a>
                </h3>
              </div>
            </div>
          </li>
          <li>
            <div className="service-card" id="service-investment">
              <a href="#" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                  <img src={serviceImage2} width="285" height="336" loading="lazy"
                    alt="Investment Services" className="img-cover" />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#" id="card-investment">Investment Solutions</a>
                </h3>
              </div>
            </div>
          </li>
          <li>
            <div className="service-card" id="service-credit">
              <a href="#" className="has-before hover:shine">
                <figure className="card-banner img-holder" style={{ '--width': '285px', '--height': '336px' }}>
                  <img src={serviceImage3} width="285" height="336" loading="lazy"
                    alt="Credit Card" className="img-cover" />
                </figure>
              </a>
              <div className="card-content">
                <h3 className="title-4 card-title">
                  <a href="#" id="card-credit">Credit Card</a>
                </h3>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
