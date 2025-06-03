import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div className="rounded p-4 shadow-xl group overflow-hidden cursor-pointer">
      <div className="max-w-full overflow-hidden relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.description}
            className="max-w-[100%] min-h-[216px] group-hover:scale-110 transition-all duration-700"
          />
        </Link>
        <div className="absolute translate-y-[999px] group-hover:translate-y-0 w-full bg-transparent bottom-0 px-[30%] py-3 transition-all duration-500 ease-out">
          <div className="bg-white grid grid-cols-2">
            <div className="grid-cols-1 p-2 flex items-center justify-center border-r border-gray-300 hover:text-white hover:bg-primary transition-all duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </div>
            <div className="grid-cols-1 p-2 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <Link to={`/product/${product.id}`}>
          <p className="text-lg text-black group-hover:text-primary text-center pt-4 pb-2 transition-all duration-500">
            {product.title}
          </p>
          <p className="text-gray-400 font-medium text-center group-hover:text-gray-800 transition-all duration-500">
            {"$" + product.price}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;