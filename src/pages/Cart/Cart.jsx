import { useDispatch, useSelector } from "react-redux";
import { getAllItemFromCart } from "../../redux/selectors";
import axiosClient from "../../apis/axiosClient";
import { useEffect, useState } from "react";
import CartSlice from "../../components/Cart/CartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  document.title = "Capitl Shop - CartPage";

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const item = useSelector(getAllItemFromCart);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setItems([]);
    const getItemFromId = async (item) => {
      try {
        const promises = item.map(async (element) => {
          const res = await axiosClient.get(`products/${element.id}`);
          return {
            id: res.id,
            name: res.title,
            price: res.price,
            quantity: element.quantity,
            image: res.image, // assuming the API returns an image
          };
        });
        
        const results = await Promise.all(promises);
        setItems(results);
      } catch (error) {
        toast.error("Failed to load cart items");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (item.length > 0) {
      getItemFromId(item);
    } else {
      setIsLoading(false);
    }
  }, [item]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="font-jost min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 flex items-center justify-center flex-col text-white">
        <h1 className="text-4xl font-bold mb-4">Your Shopping Cart</h1>
        <div className="flex items-center text-amber-100">
          <Link
            to="/home"
            className="hover:text-white transition-colors border-r border-amber-300 pr-3"
          >
            Home
          </Link>
          <span className="pl-3">Cart</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Cart Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 bg-white rounded-t-lg shadow-sm p-4 border-b border-gray-200">
          <div className="col-span-5 font-medium text-gray-700">
            <p>Product</p>
          </div>
          <div className="col-span-2 font-medium text-gray-700 text-center">
            <p>Price</p>
          </div>
          <div className="col-span-3 font-medium text-gray-700 text-center">
            <p>Quantity</p>
          </div>
          <div className="col-span-2 font-medium text-gray-700 text-right">
            <p>Total</p>
          </div>
        </div>

        {/* Empty Cart */}
        {!isLoading && item.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-2xl font-medium text-gray-500 mb-4">Your cart is empty</p>
            <Link
              to="/home"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        )}

        {/* Cart Items */}
        {!isLoading && items.length > 0 && (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 bg-white p-4 border-b border-gray-200 hover:bg-amber-50 transition-colors"
              >
                {/* Product Info */}
                <div className="col-span-12 md:col-span-5 flex items-center space-x-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <button
                      onClick={() => {
                        dispatch(
                          CartSlice.actions.removeItemFromCart({
                            id: item.id.toString(),
                          })
                        );
                        toast.info(`${item.name} removed from cart`);
                      }}
                      className="text-sm text-amber-600 hover:text-amber-800 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2 flex md:justify-center items-center">
                  <p className="text-gray-700 font-medium">${item.price.toFixed(2)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-4 md:col-span-3 flex items-center justify-center">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch(
                            CartSlice.actions.delCart({
                              id: item.id.toString(),
                              quantity: 1,
                            })
                          );
                        }
                      }}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-center w-12">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      onClick={() => {
                        dispatch(
                          CartSlice.actions.addCart({
                            id: item.id.toString(),
                            quantity: 1,
                          })
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-4 md:col-span-2 flex md:justify-end items-center">
                  <p className="font-medium text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="bg-white rounded-b-lg shadow-sm p-6 mt-4">
              <div className="flex justify-end">
                <div className="w-full md:w-1/3 space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        dispatch(CartSlice.actions.checkout());
                        toast.success("Payment Successful!", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-colors font-medium"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/home"
                      className="w-full inline-block text-center text-amber-600 hover:text-amber-800 py-2 rounded-md transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;