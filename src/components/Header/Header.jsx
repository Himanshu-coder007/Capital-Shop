import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AccountSlice from "../../pages/Login/AccountSlice";
import { getLoginSuccess, quantityItem } from "../../redux/selectors";

export const Category = [
  {
    id: 118,
    name: "Clothes",
    image: "https://api.lorem.space/image/fashion?w=640&h=480&r=4972",
  },
  {
    id: 119,
    name: "Electronics",
    image: "https://api.lorem.space/image/watch?w=640&h=480&r=4387",
  },
  {
    id: 120,
    name: "Furniture",
    image: "https://api.lorem.space/image/furniture?w=640&h=480&r=1729",
  },
  {
    id: 121,
    name: "Shoes",
    image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6486",
  },
  {
    id: 122,
    name: "Others",
    image: "https://api.lorem.space/image?w=640&h=480&r=3891",
  },
];

const Header = () => {
  const quantity = useSelector(quantityItem);
  const LoginSuccess = useSelector(getLoginSuccess);
  const dispatch = useDispatch();

  return (
    <div className="font-jost">
      <div className="hidden md:flex  md:px-20 py-3 border-b border-gray-200 flex-row justify-between text-sm transition-all ">
        <div className="flex gap-8">
          <p className="hover:text-primary cursor-pointer hover:text-orange-500">About Us</p>
          <p className="hover:text-primary cursor-pointer hover:text-orange-500">Privacy</p>
          <p className="hover:text-primary cursor-pointer hover:text-orange-500">FAQ</p>
          <p className="hover:text-primary cursor-pointer hover:text-orange-500">Careers</p>
        </div>
        <div className="flex items-center">
          <p className="px-5 border-r border-gray-200 cursor-pointer hover:text-orange-500">
            Track Your Order
          </p>
          <div className="gap-3 flex ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-4 w-4 hover:scale-110 hover:text-orange-500 cursor-pointer"
            >
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-4 w-4 hover:scale-110 hover:text-orange-500 cursor-pointer"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-4 w-4 hover:scale-110 hover:text-orange-500 cursor-pointer"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-20 bg-slate-50 flex justify-between items-center transition-all">
        <div>
          <Link to="/home">
            <img src={Logo} alt="" className="h-9 hover:opacity-100" />
          </Link>
        </div>
        <div className="hidden md:flex flex-col md:flex-row max-w-full">
          {Category.map((item) => (
            <Link
              to={`category/${item.id}`}
              key={item.id}
              className="md:p-6 text-base font-bold cursor-pointer hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center">
          <div className="relative group">
            <Link to="/login" className="relative ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-orange-500 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            {LoginSuccess === "true" ? (
              <div
                onClick={() => {
                  localStorage.setItem("loginSuccess", "false");
                  dispatch(AccountSlice.actions.Logout());
                }}
                className="hidden transition-all group-hover:block absolute border shadow-custom p-3 z-50 bg-white left-[-100%] rounded-lg"
              >
                <p className="hover:text-orange-500 cursor-pointer">Logout</p>
              </div>
            ) : null}
          </div>

          <Link to="/cart" className="relative ml-1 md:p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-orange-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div
              className={`${
                quantity === 0 ? "hidden" : ""
              } absolute rounded-full bg-red-500 h-3 w-3 md:h-6 md:w-6  top-0 text-white font-medium right-0 justify-center items-center flex text-xs`}
            >
              {quantity}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;