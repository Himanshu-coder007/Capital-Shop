// src/pages/AboutUs/AboutUs.jsx
import React, { useState } from 'react';
import { FaUsers, FaAward, FaHandshake, FaChartLine, FaMapMarkerAlt, FaShoppingBag } from 'react-icons/fa';
import teamMembers from './teamData'; // You'll need to create this file

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [expandedMember, setExpandedMember] = useState(null);

  const toggleMember = (id) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            From humble beginnings to becoming a leader in e-commerce innovation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Company Overview */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
              <p className="text-lg mb-6">
                Founded in 2023, we started as a small team with a big vision: to revolutionize the online shopping experience. 
                Today, we serve millions of customers across 50+ countries with our curated selection of high-quality products.
              </p>
              <p className="text-lg mb-6">
                Our platform combines cutting-edge technology with human-centered design to create seamless shopping experiences 
                that keep customers coming back.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <FaUsers className="text-blue-600 text-3xl mb-2" />
                  <h3 className="font-bold">10M+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <FaShoppingBag className="text-purple-600 text-3xl mb-2" />
                  <h3 className="font-bold">50K+</h3>
                  <p className="text-gray-600">Products</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Our team working together" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-20">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-2 px-6 font-medium ${activeTab === 'mission' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('mission')}
            >
              Our Mission
            </button>
            <button
              className={`py-2 px-6 font-medium ${activeTab === 'values' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('values')}
            >
              Our Values
            </button>
            <button
              className={`py-2 px-6 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('history')}
            >
              Our History
            </button>
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'mission' && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <FaAward className="text-blue-600 text-4xl mb-4" />
                  <h3 className="text-xl font-bold mb-3">Quality First</h3>
                  <p>We meticulously curate our product selection to ensure only the highest quality items reach our customers.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <FaHandshake className="text-purple-600 text-4xl mb-4" />
                  <h3 className="text-xl font-bold mb-3">Customer Centric</h3>
                  <p>Every decision we make starts with asking: how does this benefit our customers?</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <FaChartLine className="text-green-600 text-4xl mb-4" />
                  <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
                  <p>We're constantly evolving our platform to stay ahead of e-commerce trends and technologies.</p>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-3">Integrity</h3>
                  <p>We believe in transparent, honest business practices that build trust with our customers and partners.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                  <p>We're committed to eco-friendly practices, from packaging to our supply chain operations.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold mb-3">Diversity & Inclusion</h3>
                  <p>We celebrate differences and foster an inclusive environment for our team and community.</p>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="relative">
                <div className="border-l-2 border-blue-500 absolute h-full left-4 ml-1"></div>
                <div className="space-y-8">
                  <div className="relative pl-12">
                    <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="text-xl font-bold mb-2">2023 - Humble Beginnings</h3>
                    <p>Founded in a small office with just 5 team members and a dream to change e-commerce.</p>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="text-xl font-bold mb-2">2024 - First Million</h3>
                    <p>Reached our first million customers and expanded to international markets.</p>
                  </div>
                  <div className="relative pl-12">
                    <div className="absolute w-8 h-8 bg-blue-600 rounded-full -left-4 flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="text-xl font-bold mb-2">2025 - Innovation Leader</h3>
                    <p>Recognized as an industry innovator with our AI-powered shopping assistant.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                onClick={() => toggleMember(member.id)}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.position}</p>
                  {expandedMember === member.id && (
                    <div className="mt-3">
                      <p className="mb-2">{member.bio}</p>
                      <div className="flex space-x-4">
                        {member.socialLinks.map((link) => (
                          <a key={link.name} href={link.url} className="text-gray-600 hover:text-blue-600">
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Locations Section */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-12">Our Global Presence</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex items-start mb-6">
                  <FaMapMarkerAlt className="text-red-500 text-2xl mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">Headquarters</h3>
                    <p>San Francisco, California</p>
                    <p className="text-gray-600">123 Tech Street, Suite 500</p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <FaMapMarkerAlt className="text-blue-500 text-2xl mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">European Office</h3>
                    <p>Berlin, Germany</p>
                    <p className="text-gray-600">45 Innovation Avenue</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-green-500 text-2xl mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">Asia Pacific</h3>
                    <p>Singapore</p>
                    <p className="text-gray-600">8 Marina Boulevard</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" 
                  alt="World map" 
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;