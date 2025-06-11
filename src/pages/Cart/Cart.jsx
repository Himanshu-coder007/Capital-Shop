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
                        src="data:image/jpeg;base64,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"
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
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAADjCAMAAADdXVr2AAABKVBMVEX////+/v7t7e3s7Oz39/f6+vr9/f309PTv7+/r6+vy8vL19fUAJ5UNGmYAIYIAIoUGHXEAI4oDH3cGHXIBIH4AJZAJHGwAAI0AAFoAAF8AAGoAAHAAAHwAJJQAAF4AAGMAAHsAAIQAHZIAEWMAFJDr7fTc3eMAGJEAFXfJzNoAGHKEjr0mMHIAG4UAEof19/oACWGQk66tsciaoL3U1+W/wtQAGX1JWae+w9kAC49oc6t0eJsACHuQmcYAAFJDUJkOK4w4R5hbaak/TIkQKXwzSKFrb5UZJWuAhqhcZpng4+8kNoe1utekp74zO3dGToNvd6iCi79PXJwAEHhSYKUhO51EUZSWnsQwP4orQJtkcbBRVoWGj8Gdn7a3vdkVIWqfps0wRJ4PMZkd1XhLAAAW9ElEQVR4nO1dC1/aSNef3EhIfNQqogIKqKBgAeVi1erTte120Wprpbvadtvd9/n+H+KdS5K5ZEJC1FaR6W/b7AwJ58/Mucw5Z06AAhuwVdgcAC9TGrzSUqjTQZ026gS404CXQEedFu40I8Yt1KmjTgONq7gzahxTolNKFP+jKv2oRr/fRJeKjGj8AODD00wBnqkJ5GPyNAovYpyQj57P0BQ+TuFpzA+tKNwvwT5KSrSjTeCNDzzcbE3T0ia6SqXRZQpdmujSxuO400BXOrq0QJxxC3Xq6MpAnRoQxlXZOL7JoZQoskelfaI1TLRCiXbo89EDgI2absCmoysTXRkm32nTTgdf2qHjOh3HVw59qB17XBc6yUfF3qjvRx8FKhV6cDI1d91onFBzF4PmLgZAFoN03KHj/grXmBXMjCuy8QAlmL4UcNfd0I8KRKNeF56ULSLWushWIttIGVg6zkh3GSUBtqJEK+FEq08CHpUKGicVtHBWTmn8uEbHGalA5JPmyx9NGFeE8XQoJa7U4B81jGjN73VM2HTc0JWDr4RO5lKXjSe6KTCOHhR8aJyv8jsd/6sc0ksVgxZQDNIfllEMEeOJFUNgiqNWE6sYKFFYMYy5Wn8S8LQQeFI9w8DTIuEJyjF8XOWVZwx4MqKpciTwUqiZFmwOujLQlWWgSwddmXicdur4Uhk+btNOnT5UiRjHnbasU95ryr4fE2Ur3kdZGRsqFSgrs4apTDEEzEXRMI0aFylRGcVAewWiVakowx8dd7U+gfeI4d0F7zHjD433BMmZopKJSkblp0hO5S4kpy5IzjHXe0qoATBGVsvYwhOM73vfMWjaT90xxN+6ORFbt/D9XNR+0Bly00j7PY4+vN97OLt1LZQS6W5di7VbH3O1/iTgeSpt7PycD8FL7QidIiWjeql16qX2pcJ4xhjGXK1P4D1meKLGfgBu3FvzHmOUaTEoE7ezysSV9KDU+gTe44SXhPfu0pUUIZ9uy3tSeytWVD9W1F+0nEaN/xvhvVKimeejXiC1lrEJG2XtRlrDMrs8lt3O2t0xTHwv6Uqwu5+CWh9zeIIBEGm10M1/rKj/EFeS6DyglES5kpiPRrmSvFC7H7V3uEtpJ+2V3+R5gUJuGjYudHquIelHw77fpF/FupJiKAbGlSQ1yqJcRXef+METPXEljSE8EAJPrmciXEnD4jCCUIwVhwlERyKIZuGJsa2IgBOTXyCN+jtCpxglGyGKRTvlvVFEo49SxXDfriQin+54O5ueuJIm8B4tvJ/Ge/fiSorkPZkQUqRRfTG/QBr1j5Kc4niE5FSkklOeyiCVnGOu956E1TK+8H7qjiGmK4nuGFhXUuiOIeBKojuG5FF9PeKmRKkE8ptiZJnL6YNSFSTYrSsxfvjAFluRTMw9JX4oYGKUjQE8XqX9Qj+nkDJ3R37OEaP+I3ippfkHt/VSD0llkHqpQ70yd5QqLsif28YY4imGSXzvycOTjT80eKPxXpRRdue8F8uNO8QoE6SGEj+q/1NcSWD4zy3fzk4OuE3gPQZ4wjJ+ZK6kUasOyFMjpUZQLCNp1KoDUsttDKoOIPvJstQU2oDeZ9UBvBhQL1kMeBwtgOFWC1os6KNkXTG8oGJewIsxVK07ZIVVq1Wywg0rhlpXCTOoamyrxbItQgn817bw7Qq8sglm9KVh8PCyx85H8vNYhCb49di56XbC7gA8y3bSvevDV7+VSVs4eX183jXhSguDh+lDflJClOWehIquOmAtDWnP+1VHDTvH8KZYLOaY9tZUEavXinmu9W1Raijd45NC4ajReOa1RqNZLq99bVd8oSJYLa3j3xe5duLQjwaqDtCou17dWVrdWf+PvK0vL+2mHBrKZ1IB9GpxdnZ2nrQ52PJtA42nOnn0fxnY8F/5ns7dnzLOTyC0GdyesW1hbaP8omu4n2S/Ffw42FiZYtvKmiMS5d9FFQOemEr73R9Ly2EIl3ZD0lX7EN48/DPrwqun8K9pnm4ReARiplRh77ftzkzBxRbABxGWe1bQlQTaizw42BbPVJlhGjTKENF2bffD0qoc4VLNkKh1ALbmKTyIL9cHmBf0esaDh/DtvQesWq/dFGamZ0LgLTxbaKatgFoHrSC6qYNzewSrBTJ75eLD0rJsgX4EMng9sjZnZ93py1UwPKuK1yaERv4MLik8AK5Le9PTLDwBX+PECVot4O+NALqpzU9R8DReKMJZrPaXVyXTV7U4eERlne7MzroAEbytUyLJ7LYHjyzPUhtQ7fO6ND09FF7z0gzAA8pGcPKmVn53OHhxqg7ABb9bDMzgahvJZJs7OwsqRYLOEy65Hn6q5fQHc3P+/EHJ0gXe2VZwdTQ9LeLjeW+jbVri2VlwfhBEN7WymfYDYg7NL4ioOmCA1rslAd7yLhXsnmKw+8Vs1p09BLH+njwUYtii6OBfR2nVNSft1x668Okrn3mGKTUn7d8lkwdlS1dimEa7kqBIFBbo+regWrf+wVxH5Ar8K98hRpMC8v7kIXR7f5mu1QL6pcy0BB8HrwGAqNat2qIMHZQtIFStD4EHBcBzXoRm/0BfysGze3DyyOwRkDmDuE3AWW6OxTfou/BANw+XasT0NT4HrRbn65oU3uZhMngKaAvTt1QR4enf6hBd1pu++a2Xrs0JPMlCOA/qetuFd7OH4GU4eMhaaTDGS/M4AE+tyjgPMd+fofAiXEkVgfuWagLvqVU8eRRe7sxzk/QZ1oOzl++qZCu3jyaPW52NUuH958PLy9evvjTLTYyxvA9E3rOPJVqBrM5WGO8JklOsOpD6wK/O5V3T4qoOgA6Cl531hGf9jU4kq6Lf1OeY1ZkZABLq1//ay2S41Vk4uag6xCgx0rXOYaPcfFauUEoUIjnB/6SCBcHr2cmqDhh9XjnsvHMEvffPbJbBN5+DS5CMp/NzLDysDZHdXs3jlUnhFdqObfnOCMs29e6ncgOIzghjXy5YYNu4tpNVHXBq/Opcf87Bg+NFgs5fnZY33mPgweUJBSqGZ3eOMtzslfaB4GuBE2nsB+CBF3LBAtvaVzOZK8lsCcy3DO0WBp7xbifL4stB8eiOd3I8vBqB55wOMiy+xqFYXRXJHwBEV5J1trjAihNOtkzpSVPF3/DMt1SzmB2DWl3OZtnFmauqnnw63eLhtcim0r7Z4+AVzuMFn81Pawy8FZ4PF6tqsqoDxi7PfKsXKSZUr3wvZrMMQMhg7pMc4319nmG++lvg3uShc/GV4N4wIr8A9RrmxsICxbd5zknRg30jkF8Qq+qA1eM132qf260/X+fgFWve7+ZvF9zp27o0ycQYJQoPAWxcObGqDpwfMPDWXqicnNm4Tpgqrqb52Vv/AKhaB7XVbJbBV3+ueAzsbxdcePkLl62MvIfNXZ2lixTmlVBfMHHbfFlh4B20Uxz3rX0GCQNg+kdB86UAhecJFnf2ct8ND57ZH7BrEyp1i8BLDTL86pwudXCEfyg80C0vLFB8m2neQFuZGgpviMvQFphvqer7OUGrmGXbbC6te35M5w3HenODlkrggRuB+aZnSq+R2JE7Lwk8AL6uMfDWvjr2Ncd8i5WEVQdEzbfaBp6XGFzw8Ip9w/cSm1ssuLn6jfdN4HIgwJueHpT+TQ2hxDZSlcWFBYpvcd9x+N3DwQ+QsOpAip+95b7tKQaHESxo8opn1HBltgt48l4S+aGnrXZeXJ3Icpm5oNZuUDHY200GHlqKoMXZ15vbdsJUcfBth5Mt3xxXrVucYMlm6x8ZX0qbhwe3C36EKMB8CN9e4S0yokMiRPbKAgNv82+AZQ0rW144CQNg4DuvGooePIcVLGht9hh41BHhSRYPnrl7JIE3AwG+6obAM9sHCwy+xTME79MmK1tW0knhVXnmW6qSiXDS/OTN/wMYeOx2AbLenFfyHo5bc77dwm/aG6XDtC2Dp79aYeDh7Z0CeMW+2FUSGWWwCYq9R9jI+C4Ilg6jkVO5eVZwbl059PyeVctLpw+2wdGFrgaNMlcruPA2jkknr9g7QGaURWxnkTlonnLMt/qdhCvBh3UeXlX1pYLV4+HlrtnMCNAJ4vP8EYWvSiArybxcW2DwLVZwb2uNZb7NT86oriRXQ9o88+28I77c7tJ/WHR4J+itK7uTww7d+TkCMt8DbF6Lc50Pmb6ZmeaXisFTYqU3GHQLay8I0eCEU+y/G4msFgKEFZ3P8U3OSzin7OTVLArPOd2aZ6cvV+HgaU4nPx0Cb6bROOPje1CDs/AOzl14f3OyZTOdEJ6qF3nZ0sI/aTHLwlv/kGLIt996wSI8ffX3QMhKcnqDgXx1QnwzaYuD92WFhbfRIkQrPzjNt4h/3iRZSeY7jvmWunDcvkDanpm8tkM1slrN+dEiLFkugZiVZFevyAQGp2+m8cpkeM/qlbm1+dXdXKTOeNnyry3hvThRf3DBMR+ULbCP+JgoPIuJ74OeD4/E+zp6IP6fSrWnj6blDs/yv4BSAj43WHjQIPPoW+EU+yGQ5HOC4a4kouJ4zbfz0leGjLlps9bwbm6egwcXTjAb11b7R0fTsul71mz52bigUn7GoFtZ8B5lm5zzhTg7E1UdMP/hZMtHZJW4lqivFSyWgT/W/VAt+i+nWbK0HcupbpeOJPBmCv/6vhZw3Fxg8G1+Mj149jYrW6YWWyBhVpLAfEU4UQRd1oW3883h5FOdRFNcePUbpDOC8JD/qLVdGgThNb7Q2Ws+Y+Et+gvBts4F2SKBF8dqARbvi4dbPr+DwFvuWYwfwT4rkmiKK1y2XppaeNWBymFJMn0VLzfxvMzCW/nTVr2sJLUqyBaJ1SKNutNLL6mAYz645aNbeKwV/jDYm4x2DsdqPXg4kyDwfO/KAL29vYBw2TfIODjBPnlfKyChY5CoX4p3W0ORGqA/7hkiLlK03KdwCeddAPYMEXi55YUziVLHoTpN5uPDS0RvvRfxNTsmoaRWJpF2Ty18OoZtGzX47/+x8FamzKRVBwDni1//xjoo0NpsATaZD24X5uf9RAK4l8WhOk6t875i0MrsCfCuyZOcwyYHb2FtY2NjEzd4wcccFqtWwlxq0ONW5x/PKTgID2kKBh5o5fxY5jzeLuCHDoMHfpTk8KoFL1GCb1OSdrBvJ6w6AERfPNOy2dUqUNiUuW4Rw/PzQHal8BRGuYJWgV+dzQ6Bd92MD29jOwhPeqo/WHUAfAjL5cGuTy6KBi7I7Hncl3dTCQIPpWdnlVaDh1do43gc+M0LaC5E41v7rCetOmD3ZXkurqTpWZx8Mk/rXiIIgYf3Z0NTxa2ukAdS6CIb1dov0zSeSHjIw5Sw6oDdk2S5uItzXWBgPTvvCk68OlGmhErUOuiZpsVzgIIXk749EHa1LUSJ/rkxAjzkg0mYS22lQ5mvuMvnUltVmueC8MHtgg8vP+hXdSaX0YXn9ATN3jhBVotV9SYvHr6DH4lTxZ2PIcyXXa3w8FCqhJcIgv7LX3jwQCWXGeRP226si8gvtIz6HjoP39E1gmduN0eCt/l34lTxUObbeSekiqM0Hj/NBYWjuykvfocDtlv5/FWn1lKQVQG/0+heZ47EbUOhAilRVYoulnBZexE4piE7wC+rOgBqIatztWeTm7yqA+BbfZbNUsqnvaoCXhZWBiLMz9389fr09OpmLw/3DMKur/Ea5R8gc/PZKNO3sqaxklPxqw5EqXW0fZLDW39u86niABRn/cWJUiU+mN4Kd95g5yfJXc1k9ra2tqC1KfG5FLoowu2am/LJmyLueMFuqRmJrBbU+U3KfMvfbZU7AQbOUDyazh7cLrjwrLTruSZpPG4Oq8RjVtrG+QndAp9E10S51ji9+AA3fMXh2+gkh7crZb7VtCXAaxf9RAKEMHdhe/BqTJJZhkfHrs7GiY0pOWzy6DqOTXKxSTAJm+TGGu+QSCVwJRGNLGW+HbqV83YMfZxNQOF13UR/zb7w01cl+Pzp22tgM8CulPnJK6eJ/Qb8UCBqJ9ym4QsQdgwRp/od5mpHAm+pagg3pd7Usz4+lIRleOPgksb8MpkMi26axhv2jlCKuK4r100uh27tNeDpw0SnOGfn1IblJK06IGO+9Y903D02kSZJWF4mSP0bPSPEhFVCV+fgt6q7AmeecfBIkpl4hkgPODu1hFUHBHcgmbweHScMbLlpSp5wQdsFl4FbNJkgw6T/s/BmSldpi2w79gsz/OzJD7NWhAwJO5nVAjurEuYzRXj2dwYeyuPp+fBqTH6nm6DLrk6I76hx4VjuruovfAaACpZLRQbPBLyz86spWC2cn3N41YGgVtjV2XEEz/RjmmT6ihXgbRo7RTZPKSOszcz00dGxobubRnBWmuHglXsGs/9kiP7MOTv/p6tJqw6Ad6JwWaoyN5Govf58noNXB/4ptFTtcpDPbTHcR7HtHZXedlog5VECto9mWHyNP3X5gTpwLGRImEmrDtjf/8sfK/rvu8DJZ73y3+Xl5SJtpyaVT5Zj1zpX+Vx+MNja8jT73t7gqJR/dd11kIvPpURNlwqlUqlQKLgnpwrHIVUHrB9l9jwRFkAJqw6gI2gV1KpVctUCAVY32HF0ZbEMjE+lnfV2L69u3g7QoalS5ubqstOleS0uJWn2m9ClEXJuXdU4os5aIPmxfJQSi38TdFYNUSo5lo968Tj+pPhOeiw1gG06pgVNXyNlq7YDNSL6AAdPdY/aYeNYxQZK2LF8lHSLVw/65MOpOkD8nKr6a94a/EiKx0qJpkYZlQqTqgOP79z6BN5jhics40dWdSCygOWk6sCoBSwf0jvAbqHWFcn4QysmNO7wQm2Fn/32xLuwWqRVB0Kj+mGpBCOOJ7qJoWSEj+r8XVQxPJyXZN3lm0vHXK0/CXhaCLyR3vkMZOQLyjF8/H7e+RxWdSD6jdyjvrE7FWd81Dd2O8L3x686cDcFLAXDdPKCuonVMoGXqIDlo3tBHT7VH151wKSpBOILAsLH7bD8g8hxRSojpb2K9F0Hjv/8WFUHItR61LsGfrneU0INgDGyWsYWnmB83/uOQdMS7hhiFrAUdgy3fZdAnHFpVYF4b0Vw4j9qWNUBvG7wDwuvvP0V4nryaxFWxr+Wovi7dSwV8A/vjxNXkftr4hWMf030UE0YVyTjckrSriuJf9QQojW/d8zV+pOAB5R7qK4KJMrxZ/s5I6sOhHqBY71rIJaXWur65qoODPdSy4mOWXUgVDE8gBhDZGXjMVfrE3i3ggd+LTy6jIf4z6X+8V/31uARjDIthlSYuJIetlqfwHuc8O6C9x6wK2nEqL8ePh4rvn/bt0gZwkej3iLFW8uxQiiP6R1g963WBQYdN6vlF8MTDIBxs1qSR/VHDeXHGo+6aYRUhVGqDoCHmq7KE52w6sCjVetPAh4IgfdA3/msDSU6QdUBSX5B1Lg0vyCk6sDw/AN5r/Cacfkbu32pcN+upGSp4rdNVx1ztT6B95jh/TTe+zWp4rKsAHlUn0hGRSYEmaoDCh/fF/MLBMnqxv8ViThk8gvErABpKkMgv2CkqgMPSu8NV9ZPzmoZW3ihxve97Bhu5Uqi+wiB6CGv1ZVG3WNF9WNF/eM/dFj+wYipDFzVAYXLCpBE/RXvh1WYUD0X9ZeOC/kHnt7zx1XZuJv4obD5BYFHpXFZN0q0Qol2KNETo+zRw+NV2vCqA8rj83OOGPVnvMCxov5DvNSx8hNEL3XUgTrRSz2aYhg9vicI/tvGGOK9b30S33vy8GTjDw4eXcaaFuIRZYwyxzfKhvnPtTCj7Kef3xOkxv1VHfiJ29nJAbcJvEcFTw3AUwXysdGlUngR41joBYwyVQ1IOvH9e6qQ9BnyKCnRtPwN7v1/WXKPyRk66lYAAAAASUVORK5CYII="
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
