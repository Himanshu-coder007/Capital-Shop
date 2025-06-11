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
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: cart, 1: details, 2: payment, 3: confirmation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

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
            image: res.image,
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
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === "creditCard" || paymentMethod === "debitCard") {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardName ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        toast.error("Please fill all card details");
        return false;
      }

      if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
        toast.error("Please enter a valid 16-digit card number");
        return false;
      }

      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        toast.error("Please enter a valid CVV");
        return false;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        toast.error("Please enter your UPI ID");
        return false;
      }

      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId)) {
        toast.error("Please enter a valid UPI ID (e.g., name@upi)");
        return false;
      }
    }

    return true;
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutStep(1);
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCheckoutStep(2);
    }
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setCheckoutStep(3);
    }
  };

  const handleCompleteOrder = () => {
    dispatch(CartSlice.actions.checkout());
    toast.success("Payment Successful! Your order has been placed.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setCheckoutStep(0);
  };

  const renderCartContent = () => {
    return (
      <>
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
            <p className="text-2xl font-medium text-gray-500 mb-4">
              Your cart is empty
            </p>
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
                          CartSlice.actions.removeFromCart({
                            id: item.id.toString(),
                          })
                        );
                        toast.info(`${item.name} removed from cart`);
                      }}
                      className="text-sm text-amber-600 hover:text-amber-800 mt-1 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-4 md:col-span-2 flex md:justify-center items-center">
                  <p className="text-gray-700 font-medium">
                    ${item.price.toFixed(2)}
                  </p>
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
                    <span className="font-medium">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleProceedToCheckout}
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
      </>
    );
  };

  const renderCheckoutForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCheckoutStep(0)}
            className="text-amber-600 hover:text-amber-800 mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div
              className={`flex flex-col items-center ${
                checkoutStep >= 1 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep >= 1 ? "bg-amber-100" : "bg-gray-100"
                }`}
              >
                {checkoutStep >= 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className="text-xs mt-1">Details</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                checkoutStep >= 2 ? "bg-amber-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center ${
                checkoutStep >= 2 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep >= 2 ? "bg-amber-100" : "bg-gray-100"
                }`}
              >
                {checkoutStep >= 3 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>2</span>
                )}
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                checkoutStep >= 3 ? "bg-amber-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center ${
                checkoutStep >= 3 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkoutStep >= 3 ? "bg-amber-100" : "bg-gray-100"
                }`}
              >
                <span>3</span>
              </div>
              <span className="text-xs mt-1">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Customer Details */}
        {checkoutStep === 1 && (
          <form onSubmit={handleSubmitDetails}>
            <div className="space-y-4 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-4">
                Shipping Address
              </h3>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>India</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-colors font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {checkoutStep === 2 && (
          <form onSubmit={handleSubmitPayment}>
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-medium text-gray-800">
                Payment Method
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("creditCard")}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label
                    htmlFor="creditCard"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Credit Card
                  </label>
                </div>

                {paymentMethod === "creditCard" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src="data:image/jpeg;base64,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"
                        className="h-8"
                        alt="Visa"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Mastercard"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Axis Bank"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="ICIC Bank"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="debitCard"
                    name="paymentMethod"
                    value="debitCard"
                    checked={paymentMethod === "debitCard"}
                    onChange={() => setPaymentMethod("debitCard")}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label
                    htmlFor="debitCard"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Debit Card
                  </label>
                </div>

                {paymentMethod === "debitCard" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Visa"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Mastercard"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label
                    htmlFor="upi"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    UPI Payment
                  </label>
                </div>

                {paymentMethod === "upi" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label
                        htmlFor="upiId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        UPI ID
                      </label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Google Pay"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="PhonePe"
                      />
                      <img
                        src="data:image/png;base64,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"
                        className="h-8"
                        alt="Paytm"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    PayPal
                  </label>
                </div>

                {paymentMethod === "paypal" && (
                  <div className="ml-7">
                    <p className="text-sm text-gray-500">
                      You will be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-colors font-medium"
                >
                  Review Order
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation */}
        {checkoutStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Order ready for confirmation
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Please review your order details below before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Shipping Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p>{formData.country}</p>
                    <p className="mt-2">{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {paymentMethod === "creditCard" && (
                      <>
                        <p className="font-medium">Credit Card</p>
                        <p>•••• •••• •••• {cardDetails.cardNumber.slice(-4)}</p>
                        <p>{cardDetails.cardName}</p>
                        <p>Expires: {cardDetails.expiryDate}</p>
                      </>
                    )}
                    {paymentMethod === "debitCard" && (
                      <>
                        <p className="font-medium">Debit Card</p>
                        <p>•••• •••• •••• {cardDetails.cardNumber.slice(-4)}</p>
                        <p>{cardDetails.cardName}</p>
                        <p>Expires: {cardDetails.expiryDate}</p>
                      </>
                    )}
                    {paymentMethod === "upi" && (
                      <>
                        <p className="font-medium">UPI Payment</p>
                        <p>UPI ID: {upiId}</p>
                      </>
                    )}
                    {paymentMethod === "paypal" && (
                      <>
                        <p className="font-medium">PayPal</p>
                        <p>
                          You'll be redirected to PayPal to complete payment
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Order Items
                  </h3>
                  <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 flex justify-between">
                        <div className="flex items-center space-x-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md border border-gray-200"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Order Summary
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-amber-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleCompleteOrder}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-colors font-medium"
                    >
                      Complete Order
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By completing your purchase, you agree to our Terms of
                    Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-jost min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 flex items-center justify-center flex-col text-white">
        <h1 className="text-4xl font-bold mb-4">
          {checkoutStep === 0 ? "Your Shopping Cart" : "Checkout"}
        </h1>
        <div className="flex items-center text-amber-100">
          <Link
            to="/home"
            className="hover:text-white transition-colors border-r border-amber-300 pr-3"
          >
            Home
          </Link>
          <span className="pl-3">
            {checkoutStep === 0 ? "Cart" : "Checkout"}
          </span>
        </div>
      </div>

      {/* Cart/Checkout Content */}
      <div className="container mx-auto px-4 py-8">
        {checkoutStep === 0 ? renderCartContent() : renderCheckoutForm()}
      </div>
    </div>
  );
};

export default CartPage;
