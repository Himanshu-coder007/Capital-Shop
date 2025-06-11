// src/pages/Careers/Careers.jsx
import React from 'react';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Frontend Developer",
      location: "Remote",
      description: "We're looking for an experienced React developer to join our team."
    },
    {
      title: "Customer Support Specialist",
      location: "New York, NY",
      description: "Help our customers with their orders and provide excellent service."
    },
    {
      title: "UX Designer",
      location: "San Francisco, CA",
      description: "Design beautiful and intuitive interfaces for our e-commerce platform."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Careers</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-8 text-center">
          Join our growing team and help us build the future of e-commerce!
        </p>
        
        <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>
        
        {jobOpenings.map((job, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-medium">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.location}</p>
            <p className="mb-4">{job.description}</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
              Apply Now
            </button>
          </div>
        ))}
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Why Work With Us?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Competitive salaries and benefits</li>
            <li>Flexible work arrangements</li>
            <li>Opportunities for growth and development</li>
            <li>Inclusive and diverse workplace</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Careers;