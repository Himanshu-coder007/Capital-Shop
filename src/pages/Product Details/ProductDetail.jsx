import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import CartSlice from "../../components/Cart/CartSlice";
import { toast } from "react-toastify";
import { getLoginSuccess } from "../../redux/selectors";

const tablist = [
  {
    id: 1,
    name: "Description",
  },
  {
    id: 2,
    name: "Details",
  },
  {
    id: 3,
    name: "Reviews",
  },
  {
    id: 4,
    name: "Shipping",
  },
];

const ProductDetail = () => {
  document.title = "Capitl Shop - ProductDetail";
  const dispatch = useDispatch();
  const LoginSuccess = useSelector(getLoginSuccess);
  const [itemActive, setItemActive] = useState(1);
  const [product, setProduct] = useState({
    id: 1,
    title: "Loading...",
    price: 0,
    description: "Loading product details...",
    category: { name: "" },
    images: [],
    rating: 4.5,
    reviews: 120,
    stock: 10,
    brand: "",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Check if product is liked on component mount
  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    setIsLiked(likedProducts.includes(product.id));
  }, [product.id]);

  const handleAddCartClick = () => {
    if (LoginSuccess === "true") {
      dispatch(
        CartSlice.actions.addCart({
          id: product.id.toString(),
          quantity: 1,
        })
      );
      toast.success("Added to cart successfully!", {
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
      updatedLikedProducts = likedProducts.filter(id => id !== product.id);
      toast.info("Removed from favorites", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      updatedLikedProducts = [...likedProducts, product.id];
      toast.success("Added to favorites!", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    setIsLiked(!isLiked);
  };

  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosClient.get(`products/${id}`);
        setProduct({
          ...res,
          rating: res.rating || 4.5,
          reviews: res.reviews || 120,
          stock: res.stock || 10,
        });
        setSelectedImage(0);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getData();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const renderTabContent = () => {
    switch (itemActive) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
              voluptatum quos quas quidem nesciunt. Quisquam, quae. Quisquam
              voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
              voluptatum quos quas quidem nesciunt. Quisquam, quae.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Brand:</span> {product.brand || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {product.category?.name || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Stock:</span> {product.stock} available
            </p>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex mr-2">{renderStars(product.rating)}</div>
              <span className="text-gray-700">
                {product.rating} out of 5 ({product.reviews} reviews)
              </span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <div className="flex">{renderStars(5)}</div>
                </div>
              </div>
              <p className="text-gray-700">
                "This product exceeded my expectations. The quality is amazing and
                it arrived quickly. Highly recommend!"
              </p>
              <p className="text-gray-500 text-sm mt-2">Posted 2 weeks ago</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Free Shipping:</span> on all orders over $50
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Delivery:</span> 3-5 business days
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Returns:</span> 30-day return policy
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb and Header */}
      <div className="bg-[#F3EAD8] py-12 flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-gray-800">Product Details</h1>
        <div className="flex mt-4">
          <Link to="/" className="text-[#74706B] text-sm hover:text-primary transition cursor-pointer">
            Home
          </Link>
          <span className="mx-2 text-[#74706B]">/</span>
          <span className="text-[#74706B] text-sm">Product Details</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <img
                  src={product.images[selectedImage] || "https://via.placeholder.com/600"}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
                <button
                  onClick={handleLikeClick}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
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
                </button>
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img || "https://via.placeholder.com/100"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">{product.category?.name}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                  product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex mr-2">{renderStars(product.rating)}</div>
                <span className="text-gray-600 text-sm">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.price > 100 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mt-4">{product.description}</p>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleAddCartClick}
                  disabled={product.stock <= 0}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center ${
                    product.stock > 0
                      ? "bg-[#4F46E5] hover:bg-[#4338CA] text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={handleLikeClick}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center border ${
                    isLiked
                      ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 cursor-pointer"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  {isLiked ? "Added to Favorites" : "Add to Favorites"}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Free shipping
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delivery in 3-5 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tablist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setItemActive(item.id)}
                  className={`${
                    itemActive === item.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm cursor-pointer`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;