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
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      "firstName", "lastName", "email", "phone", 
      "address", "city", "state", "zipCode"
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
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
      if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setCheckoutStep(0)}
            className="text-amber-600 hover:text-amber-800 mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className={`flex flex-col items-center ${checkoutStep >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-amber-100' : 'bg-gray-100'}`}>
                {checkoutStep >= 1 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className="text-xs mt-1">Details</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${checkoutStep >= 2 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${checkoutStep >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-amber-100' : 'bg-gray-100'}`}>
                {checkoutStep >= 3 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>2</span>
                )}
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${checkoutStep >= 3 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${checkoutStep >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-amber-100' : 'bg-gray-100'}`}>
                <span>3</span>
              </div>
              <span className="text-xs mt-1">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Customer Details */}
        {checkoutStep === 1 && (
          <form onSubmit={handleSubmitDetails}>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
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
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
              
              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-4">Shipping Address</h3>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
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
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
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
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
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
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
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
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-800">Payment Method</h3>
              
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
                  <label htmlFor="creditCard" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit Card
                  </label>
                </div>
                
                {paymentMethod === "creditCard" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
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
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
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
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
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
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
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
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" className="h-8" alt="Visa" />
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" className="h-8" alt="Mastercard" />
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" className="h-8" alt="Apple Pay" />
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="h-8" alt="Google Pay" />
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
                  <label htmlFor="debitCard" className="ml-3 block text-sm font-medium text-gray-700">
                    Debit Card
                  </label>
                </div>
                
                {paymentMethod === "debitCard" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
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
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
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
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
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
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
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
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" className="h-8" alt="Visa" />
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" className="h-8" alt="Mastercard" />
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg" className="h-8" alt="Amazon Pay" />
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
                  <label htmlFor="upi" className="ml-3 block text-sm font-medium text-gray-700">
                    UPI Payment
                  </label>
                </div>
                
                {paymentMethod === "upi" && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
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
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Pay_%28GPay%29_Logo.svg/1200px-Google_Pay_%28GPay%29_Logo.svg.png" className="h-8" alt="Google Pay" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" className="h-8" alt="PhonePe" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Paytm_Logo.png/800px-Paytm_Logo.png" className="h-8" alt="Paytm" />
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
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
                
                {paymentMethod === "paypal" && (
                  <div className="ml-7">
                    <p className="text-sm text-gray-500">You will be redirected to PayPal to complete your payment</p>
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
          <div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Order ready for confirmation</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Please review your order details below before proceeding.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                    <p className="mt-2">{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Payment Method</h3>
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
                    <p>You'll be redirected to PayPal to complete payment</p>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Order Items</h3>
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
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
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
            <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-amber-600">${calculateTotal().toFixed(2)}</span>
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
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)};

return (
  <div className="font-jost min-h-screen bg-gray-50">
    {/* Hero Section */}
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16 flex items-center justify-center flex-col text-white">
      <h1 className="text-4xl font-bold mb-4">
        {checkoutStep === 0 ? "Your Shopping Cart" : "Checkout"}
      </h1>
      <div className="flex items-center text-amber-100">
        <Link to="/home" className="hover:text-white transition-colors border-r border-amber-300 pr-3">
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