import React from 'react';
import footerBg from '../../assets/images/footer-bg.png'; // Importando a imagem

const Footer = () => {
  return (
    <footer className="footer section has-bg-image" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="container">
        <div className="footer-bottom">
          <p>
            &copy; 2024 McDuck Bank. All Rights Reserved | Crafted by{' '}
            <a href="https://github.com/Samuel-Leite" target="_blank" rel="noopener noreferrer">Samuel Leite</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
