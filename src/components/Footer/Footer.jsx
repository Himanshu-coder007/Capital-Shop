import { Link } from "react-router-dom";
import { Category } from "../Header/Header";
const Logo = require("../../assets/images/logowhite.webp");

const Footer = () => {
  return (
    <div className="bg-bgBlack px-2 md:px-20 py-6 md:py-10 text-center">
      <div className="pb-12 border-b border-gray-600">
        <div>
          <p className="text-xl md:text-2xl font-bold text-white">
            Subscribe Newsletter
          </p>
          <p className="text-sm md:text-base text-white">
            Subscribe newsletter to get 5% on all products.
          </p>
        </div>
        <div className="flex mx-auto items-center mb-3 mt-6 md:max-w-[70vw]">
          <div className="relative mr-3 w-full revue-form-group">
            <input
              className="revue-form-field bg-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:pl-10 p-4"
              placeholder="Your email address..."
              type="email"
            />
          </div>
          <div className="revue-form-actions">
            <input
              type="submit"
              value="Subscribe"
              className="cursor-pointer text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-4 text-center"
              name="member[subscribe]"
            />
          </div>
        </div>
      </div>
      <div className="grid-cols-3 grid md:grid-cols-5 text-white py-10 border-b border-gray-600">
        <div className="grid-col-1">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        {Category.map((item) => (
          <div
            key={item.id}
            className={`${item.id === 5 ? "hidden" : ""} text-sm`}
          >
            <p className="font-bold text-base md:my-4 cursor-pointer hover:text-primary">
              {item.name}
            </p>
            <p className="cursor-pointer hover:text-primary text-gray-400">
              Clothing
            </p>
            <p className="cursor-pointer hover:text-primary text-gray-400">
              Fashion
            </p>
            <p className="cursor-pointer hover:text-primary text-gray-400">
              Winter
            </p>
            <p className="cursor-pointer hover:text-primary text-gray-400">
              Summer
            </p>
            <p className="cursor-pointer hover:text-primary text-gray-400">
              Casual
            </p>
          </div>
        ))}
      </div>
      <div className="text-sm text-center p-4 text-gray-400">
        Copyright ©2022 All rights reserved
      </div>
    </div>
  );
};

export default Footer;