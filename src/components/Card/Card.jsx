import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getLoginSuccess } from "../../redux/selectors";
import CartSlice from "../Cart/CartSlice";
import { useEffect, useState } from "react";

const Card = (props) => {
  const dispatch = useDispatch();
  const LoginSuccess = useSelector(getLoginSuccess);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    setIsLiked(likedProducts.includes(props.product.id));
  }, [props.product.id]);

  const handleAddCartClick = () => {
    if (LoginSuccess === "true") {
      dispatch(
        CartSlice.actions.addCart({
          id: props.product.id.toString(),
          quantity: 1,
        })
      );
      toast.success("Add to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Please login or register account to perform this action.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleLikeClick = () => {
    if (LoginSuccess !== "true") {
      toast.error("Please login or register account to perform this action.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    let updatedLikedProducts;

    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(id => id !== props.product.id);
      toast.info("Removed from favorites", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      updatedLikedProducts = [...likedProducts, props.product.id];
      toast.success("Added to favorites!", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    setIsLiked(!isLiked);
  };

  return (
    <div className="rounded p-4 shadow-xl group overflow-hidden cursor-pointer h-[500px] w-full flex flex-col">
      <div className="w-full h-64 overflow-hidden relative flex-shrink-0">
        <Link to={`/product/${props.product.id}`}>
          <img
            src={props.product.images[0]}
            alt={props.product.description}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          />
        </Link>
        <div className="absolute translate-y-[999px] group-hover:translate-y-0 w-full bg-transparent bottom-0 px-[30%] py-3 transition-all duration-500 ease-out">
          <div className="bg-white grid grid-cols-2">
            <div
              onClick={handleAddCartClick}
              className="grid-cols-1 p-2 flex items-center justify-center border-r border-gray-300 hover:text-white hover:bg-primary transition-all duration-500"
            >
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
            <div 
              onClick={handleLikeClick}
              className="grid-cols-1 p-2 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isLiked ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke={isLiked ? "red" : "currentColor"}
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
      <div className="py-6 flex-grow flex flex-col">
        <Link to={`/product/${props.product.id}`} className="flex-grow flex flex-col">
          <p className="text-lg text-black group-hover:text-primary text-center pt-4 pb-2 transition-all duration-500 line-clamp-2 h-[3.5rem] flex items-center justify-center">
            {props.product.title}
          </p>
          <p className="text-gray-400 font-medium text-center group-hover:text-gray-800 transition-all duration-500 mt-auto">
            {"$" + props.product.price}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;