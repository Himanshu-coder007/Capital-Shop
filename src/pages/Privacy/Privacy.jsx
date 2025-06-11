// src/pages/Privacy/Privacy.jsx
import React, { useState } from 'react';
import { FaShieldAlt, FaLock, FaUserCog, FaExchangeAlt, FaBell } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsDownload } from 'react-icons/bs';

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('collection');
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const privacySections = {
    collection: {
      title: "Information We Collect",
      icon: <FaUserCog className="mr-2" />,
      items: [
        {
          id: 'col1',
          question: "Personal Information",
          answer: "We collect personal details like your name, email address, phone number, shipping/billing addresses when you create an account or place an order."
        },
        {
          id: 'col2',
          question: "Payment Information",
          answer: "We process payment information through secure third-party processors. We don't store full credit card numbers on our servers."
        },
        {
          id: 'col3',
          question: "Automated Collection",
          answer: "We automatically collect device information, IP addresses, browser type, and usage data through cookies and similar technologies."
        }
      ]
    },
    usage: {
      title: "How We Use Information",
      icon: <FaExchangeAlt className="mr-2" />,
      items: [
        {
          id: 'use1',
          question: "Service Provision",
          answer: "To process transactions, deliver products, and provide customer support."
        },
        {
          id: 'use2',
          question: "Improvements",
          answer: "To analyze usage patterns and improve our website functionality and user experience."
        },
        {
          id: 'use3',
          question: "Communication",
          answer: "To send order confirmations, account notifications, and (with consent) marketing communications."
        }
      ]
    },
    sharing: {
      title: "Information Sharing",
      icon: <FaShieldAlt className="mr-2" />,
      items: [
        {
          id: 'sha1',
          question: "Service Providers",
          answer: "We share information with third parties who perform services on our behalf (payment processing, shipping, analytics)."
        },
        {
          id: 'sha2',
          question: "Legal Requirements",
          answer: "We may disclose information if required by law or to protect our rights, users, or the public."
        },
        {
          id: 'sha3',
          question: "Business Transfers",
          answer: "In case of merger, acquisition, or asset sale, user information may be transferred as a business asset."
        }
      ]
    },
    rights: {
      title: "Your Rights",
      icon: <FaLock className="mr-2" />,
      items: [
        {
          id: 'rig1',
          question: "Access & Correction",
          answer: "You can access and update your personal information through your account settings."
        },
        {
          id: 'rig2',
          question: "Data Portability",
          answer: "You can request a copy of your data in a structured, machine-readable format."
        },
        {
          id: 'rig3',
          question: "Deletion",
          answer: "You may request deletion of your personal data, subject to certain legal exceptions."
        },
        {
          id: 'rig4',
          question: "Opt-Out",
          answer: "You can opt-out of marketing communications and certain data processing activities."
        }
      ]
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <FaShieldAlt className="text-5xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center text-black">
              <FaBell className="mr-2" />
              Last updated: June 2023
            </div>
            <button className="bg-white text-blue-800 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition flex items-center">
              <BsDownload className="mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Policy Sections</h2>
              <nav className="space-y-3">
                {Object.keys(privacySections).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${activeSection === key ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      {privacySections[key].icon}
                      {privacySections[key].title}
                    </div>
                  </button>
                ))}
              </nav>
              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold mb-3">Quick Actions</h3>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                  <span>Request Data Export</span>
                  <BsDownload />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition mt-3">
                  <span>Delete My Account</span>
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Section Header */}
              <div className="bg-blue-50 px-8 py-6 border-b">
                <h2 className="text-2xl font-bold flex items-center">
                  {privacySections[activeSection].icon}
                  {privacySections[activeSection].title}
                </h2>
              </div>

              {/* Accordion Content */}
              <div className="divide-y">
                {privacySections[activeSection].items.map((item) => (
                  <div key={item.id} className="p-6">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <h3 className="text-lg font-medium">{item.question}</h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${expandedItems.includes(item.id) ? 'transform rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedItems.includes(item.id) && (
                      <div className="mt-4 text-gray-700 pl-2">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            {activeSection === 'collection' && (
              <div className="mt-8 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-4">Cookie Policy</h3>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold mb-2">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Required for site functionality and cannot be switched off.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us understand how visitors interact with our website.</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold mb-2">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Used to track effectiveness of our marketing campaigns.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'rights' && (
              <div className="mt-8 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold mb-4">Exercising Your Rights</h3>
                <p className="mb-6">
                  To exercise any of your privacy rights, please contact our Data Protection Officer at:
                </p>
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-bold mb-2">Data Protection Officer</h4>
                  <p className="mb-1">Email: privacy@example.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p className="mt-4 text-sm text-gray-600">
                    We respond to all requests within 30 days as required by applicable laws.
                  </p>
                </div>
              </div>
            )}

            {/* Policy Updates */}
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800">Policy Updates</h3>
                  <div className="mt-2 text-yellow-700">
                    <p>
                      This policy was last updated on June 15, 2023. We may update this Privacy Policy periodically. 
                      We'll notify you of significant changes through email or prominent notices on our website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;