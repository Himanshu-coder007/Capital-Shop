// src/pages/Privacy/Privacy.jsx
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">Last updated: June 2023</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account, place an order, or contact customer service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Sharing of Information</h2>
        <p className="mb-4">
          We do not share your personal information with third parties except as necessary to provide our services or as required by law.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your information, but no system is completely secure.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>
      </div>
    </div>
  );
};

export default Privacy;