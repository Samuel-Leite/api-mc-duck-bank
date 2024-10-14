import React from 'react';

const Contact = () => {
  return (
    <section className="section contact bg-blue" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-text">
          Reach out to us for any inquiries or assistance. Our team is here to help you.
        </p>
        {/* Informações de contato */}
        <div className="contact-info">
          <p><strong>McDuck Bank</strong></p>
          <p>1 Money Bin Street - Duckburg, Calisota - United States of America</p>
          <p>Email: info@mcduckbank.com</p>
          <p>Phone: +1 555-123-4567</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
