import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  CreditCard,
  Truck,
  Shield,
  Lock,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  Edit,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",

    // Billing Information
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "US",

    // Payment Information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Cart items (mock data)
  const [cartItems] = useState([
    {
      id: 1,
      name: "Oversized Cotton Sweater",
      price: 89.99,
      quantity: 1,
      size: "M",
      color: "Heather Gray",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      price: 79.99,
      quantity: 1,
      size: "32",
      color: "Medium Wash",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, name: "Shipping", icon: <Truck size={18} /> },
    { number: 2, name: "Payment", icon: <CreditCard size={18} /> },
    { number: 3, name: "Review", icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-light text-gray-900">
              AARUNYA
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/mycart" className="hover:text-gray-900">
                Cart
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">Checkout</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > step.number
                      ? "bg-green-500 text-white"
                      : currentStep === step.number
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="hidden sm:block ml-2">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-0.5 mx-2 ${
                    currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                    1
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Shipping Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="+91 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="ZIP code"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      >
                        <option value="IN">India</option>
                        {/* <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                    2
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "card"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard
                        size={24}
                        className={
                          paymentMethod === "card"
                            ? "text-gray-900"
                            : "text-gray-400"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === "card"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Credit Card
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "paypal"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl font-bold text-blue-600">
                        P
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === "paypal"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        PayPal
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "cod"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-xl">💵</span>
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === "cod"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Cash on Delivery
                      </span>
                    </button>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pl-12"
                          />
                          <CreditCard
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pl-12"
                            />
                            <Calendar
                              size={18}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">
                        Billing Address
                      </h3>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={sameAsBilling}
                          onChange={(e) => setSameAsBilling(e.target.checked)}
                          className="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
                        />
                        <span className="text-sm text-gray-600">
                          Same as shipping
                        </span>
                      </label>
                    </div>

                    {!sameAsBilling && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Address"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Order Review */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                    3
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Review Your Order
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Shipping Address */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        Shipping Address
                      </h3>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      John Doe
                      <br />
                      123 Main Street, Apt 4B
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        Payment Method
                      </h3>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Credit Card ending in 3456
                      <br />
                      Expires 12/25
                    </p>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {item.color} / Size: {item.size} / Qty:{" "}
                              {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Place Order • ₹{total.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div> */}

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">₹5</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Secure Checkout
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Your information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
