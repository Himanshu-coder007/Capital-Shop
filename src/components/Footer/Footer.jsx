import { Link } from "react-router-dom";
import { Category } from "../Header/Header";
import Logo from "../../assets/images/logowhite.webp";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 px-2 md:px-20 pt-12 w-full">
      {/* Newsletter Section */}
      <div className="pb-12 border-b border-gray-700">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">
            Join Our Newsletter
          </p>
          <p className="text-sm md:text-base text-gray-300">
            Subscribe to get exclusive offers, the latest trends, and updates straight to your inbox.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mx-auto mb-3 mt-8 max-w-2xl">
          <div className="relative w-full">
            <input
              className="w-full px-6 py-4 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              placeholder="Your email address..."
              type="email"
            />
          </div>
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-gray-700">
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <Link to="/" className="mb-4">
            <img src={Logo} alt="Company Logo" className="h-10" />
          </Link>
          <p className="text-gray-400 text-sm text-center md:text-left">
            Bringing you the finest products with exceptional quality and service.
          </p>
          <div className="flex space-x-4 mt-4">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social}
              >
                <i className={`fab fa-${social} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>

        {Category.map((item) => (
          <div
            key={item.id}
            className={`${item.id === 5 ? "hidden" : ""} text-sm`}
          >
            <p className="font-bold text-lg mb-4 cursor-pointer text-white hover:text-purple-400 transition-colors duration-200">
              {item.name}
            </p>
            <div className="space-y-2">
              {['Clothing', 'Fashion', 'Winter', 'Summer', 'Casual'].map((subItem) => (
                <p 
                  key={subItem} 
                  className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {subItem}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="text-sm">
          <p className="font-bold text-lg mb-4 cursor-pointer text-white hover:text-purple-400 transition-colors duration-200">
            Contact Us
          </p>
          <div className="space-y-2 text-gray-400">
            <p>123 Fashion Street</p>
            <p>New York, NY 10001</p>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex flex-col md:flex-row justify-between items-center py-6 text-gray-400 text-sm">
        <div className="mb-4 md:mb-0">
          Copyright © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;