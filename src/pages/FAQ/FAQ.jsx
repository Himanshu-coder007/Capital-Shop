// src/pages/FAQ/FAQ.jsx
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaCreditCard, FaTruck, FaExchangeAlt, FaQuestionCircle } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('ordering');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const faqCategories = {
    ordering: {
      title: "Ordering",
      icon: <FaShoppingCart className="mr-2" />,
      items: [
        {
          id: 'ord1',
          question: "How do I place an order?",
          answer: "To place an order: 1) Browse our products and select items, 2) Add them to your cart, 3) Proceed to checkout, 4) Enter your shipping and payment details, 5) Review and confirm your order. You'll receive an order confirmation email once completed."
        },
        {
          id: 'ord2',
          question: "Can I modify my order after placing it?",
          answer: "Order modifications are possible within 1 hour of placement. Contact our customer support immediately at support@example.com or call +1 (555) 123-4567. Include your order number in all communications."
        },
        {
          id: 'ord3',
          question: "How do I use a discount code?",
          answer: "Enter your valid discount code in the 'Promo Code' field during checkout before payment. The discount will be applied to your order total if all conditions are met. Only one code can be used per order."
        }
      ]
    },
    payment: {
      title: "Payment",
      icon: <FaCreditCard className="mr-2" />,
      items: [
        {
          id: 'pay1',
          question: "What payment methods do you accept?",
          answer: "We accept: Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, and Amazon Pay. All transactions are securely processed with 256-bit SSL encryption."
        },
        {
          id: 'pay2',
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard PCI-compliant security measures. We never store full credit card numbers on our servers. All payments are processed through certified payment gateways."
        },
        {
          id: 'pay3',
          question: "Why was my payment declined?",
          answer: "Common reasons include: insufficient funds, incorrect card details, billing address mismatch, or bank security restrictions. Contact your bank for specifics or try an alternative payment method."
        }
      ]
    },
    shipping: {
      title: "Shipping",
      icon: <FaTruck className="mr-2" />,
      items: [
        {
          id: 'ship1',
          question: "How long does shipping take?",
          answer: "Standard shipping: 3-5 business days ($5.99). Express shipping: 2 business days ($12.99). Overnight shipping: 1 business day ($24.99). International shipping: 7-14 business days (varies by country)."
        },
        {
          id: 'ship2',
          question: "How can I track my order?",
          answer: "Tracking numbers are emailed once your order ships. Click the tracking link in your email or visit our Order Status page. For real-time updates, use the carrier's website with your tracking number."
        },
        {
          id: 'ship3',
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries. International orders may be subject to customs fees and import taxes, which are the customer's responsibility. Delivery times vary by destination."
        }
      ]
    },
    returns: {
      title: "Returns & Exchanges",
      icon: <FaExchangeAlt className="mr-2" />,
      items: [
        {
          id: 'ret1',
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be unused, in original packaging with tags attached. Some exclusions apply (final sale items, perishables). Refunds are issued to the original payment method."
        },
        {
          id: 'ret2',
          question: "How do I initiate a return?",
          answer: "1) Log in to your account, 2) Go to Order History, 3) Select the item(s) to return, 4) Print the prepaid return label, 5) Package securely and ship within 7 days. Alternatively, contact our support team."
        },
        {
          id: 'ret3',
          question: "How long do refunds take?",
          answer: "Once we receive your return, processing takes 3-5 business days. Bank processing may take additional 5-10 business days. You'll receive email confirmation at each stage of the process."
        }
      ]
    },
    support: {
      title: "Customer Support",
      icon: <MdSupportAgent className="mr-2" />,
      items: [
        {
          id: 'sup1',
          question: "How do I contact customer support?",
          answer: "Available 24/7 via: Live Chat (click the chat icon), Email (support@example.com), Phone (+1 (555) 123-4567), or Twitter (@ExampleSupport). Average response time is under 30 minutes."
        },
        {
          id: 'sup2',
          question: "What are your support hours?",
          answer: "Our customer support team is available 24 hours a day, 7 days a week, including holidays. For fastest service, use our live chat feature during peak hours (9AM-9PM EST)."
        },
        {
          id: 'sup3',
          question: "Where can I find product care instructions?",
          answer: "Care instructions are included with each product and available on the product page under 'Details'. For specific questions, contact our support team with the product SKU number."
        }
      ]
    }
  };

  // Filter FAQs based on search query
  const filteredItems = Object.entries(faqCategories).reduce((acc, [key, category]) => {
    const filteredCategoryItems = category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredCategoryItems.length > 0) {
      acc[key] = {
        ...category,
        items: filteredCategoryItems
      };
    }
    
    return acc;
  }, {});

  const currentCategory = filteredItems[activeCategory] || faqCategories[activeCategory];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <FaQuestionCircle className="text-5xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions or contact our support team
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6">FAQ Categories</h2>
              <nav className="space-y-2">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center ${activeCategory === key ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    {category.icon}
                    {category.title}
                  </button>
                ))}
              </nav>
              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold mb-3">Need More Help?</h3>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                  <MdSupportAgent className="mr-2" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div className="bg-blue-50 px-8 py-6 border-b">
                <h2 className="text-2xl font-bold flex items-center">
                  {currentCategory.icon}
                  {currentCategory.title}
                </h2>
              </div>

              {/* FAQ Items */}
              <div className="divide-y">
                {currentCategory.items.length > 0 ? (
                  currentCategory.items.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition">
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
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
                    <h3 className="text-xl font-medium mb-2">No results found</h3>
                    <p className="text-gray-600">Try a different search term or browse our categories</p>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Questions */}
            {!searchQuery && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Popular Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "How do I track my order?",
                    "What is your return policy?",
                    "Do you offer international shipping?",
                    "How can I change my account information?",
                    "What payment methods do you accept?",
                    "How do I contact customer support?"
                  ].map((question, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                      <h3 className="font-medium mb-2">{question}</h3>
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        View answer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support CTA */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 md:p-12 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
                    <p className="mb-4 opacity-90">
                      Our customer support team is available 24/7 to answer your questions and resolve any issues.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                    <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition flex items-center">
                      <MdSupportAgent className="mr-2" />
                      Contact Support
                    </button>
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

export default FAQ;