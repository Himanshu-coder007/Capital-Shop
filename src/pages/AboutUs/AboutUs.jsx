// src/pages/AboutUs/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          Welcome to our e-commerce platform! We're a passionate team dedicated to providing you with the best shopping experience.
        </p>
        <p className="mb-4">
          Founded in 2023, our company has grown from a small startup to a trusted online retailer serving customers worldwide.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
        <p className="mb-4">
          To deliver high-quality products with exceptional customer service, making online shopping easy and enjoyable for everyone.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Team</h2>
        <p>
          We're a diverse group of professionals including developers, designers, and customer service experts who work tirelessly to improve your shopping experience.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;