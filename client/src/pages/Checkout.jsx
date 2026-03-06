import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  ChevronRight,
  CreditCard,
  Truck,
  Shield,
  Lock,
  Calendar,
  Edit,
  CheckCircle,
  Loader,
  IndianRupee,
} from "lucide-react";
import { placeOrder, resetOrder } from "../features/order/orderSlice";
import { getCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { isLoading, isSuccess, isError, message, order } = useSelector(
    (state) => state.order
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Form state - Updated to match schema field names
  const [formData, setFormData] = useState({
    // Shipping Information - matching schema field names
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "", // optional
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Fetch cart on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(getCart());
  }, [dispatch, user, navigate]);

  // Handle order placement response
  useEffect(() => {
    if (isSuccess && order) {
      toast.success("Order placed successfully!", {
        duration: 5000,
        icon: '🎉',
      });
      // Clear cart and redirect to orders page
      setTimeout(() => {
        navigate("/profile?tab=orders");
        dispatch(resetOrder());
      }, 2000);
    }
    if (isError) {
      toast.error(message || "Failed to place order", {
        duration: 4000,
      });
      dispatch(resetOrder());
    }
  }, [isSuccess, isError, message, order, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check all required fields
    if (!formData.fullName?.trim()) {
      toast.error("Please enter full name");
      return false;
    }
    if (!formData.mobile?.trim()) {
      toast.error("Please enter mobile number");
      return false;
    }
    // Validate Indian phone number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.mobile.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      return false;
    }
    if (!formData.addressLine1?.trim()) {
      toast.error("Please enter address");
      return false;
    }
    if (!formData.city?.trim()) {
      toast.error("Please enter city");
      return false;
    }
    if (!formData.state?.trim()) {
      toast.error("Please enter state");
      return false;
    }
    if (!formData.pincode?.trim()) {
      toast.error("Please enter pincode");
      return false;
    }
    // Validate pincode (6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (!validateForm()) {
      setCurrentStep(1);
      return;
    }

    // Check if cart is empty
    if (!cart?.cartItems || cart.cartItems.length === 0) {
      toast.error("Your cart is empty");
      navigate("/shop");
      return;
    }

    // Prepare order items - send only product ID and quantity
    const orderItems = cart.cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // Prepare shipping address - matching schema field names exactly
    const shippingAddress = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2 || "", // optional
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      country: formData.country,
    };

    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
    };

    console.log("Sending order data:", orderData); // For debugging
    await dispatch(placeOrder(orderData));
  };

  // Get cart items from Redux store
  const cartItems = cart?.cartItems || [];
  const subtotal = cart?.subtotal || 0;
  const deliveryCharge = 50; // Fixed delivery charge as per backend
  const total = subtotal + deliveryCharge;

  // For COD, advance payment is ₹30
  const advancePaid = paymentMethod === "COD" ? 30 : 0;
  const remainingAmount = total - advancePaid;

  const steps = [
    { number: 1, name: "Shipping", icon: <Truck size={18} /> },
    { number: 2, name: "Payment", icon: <CreditCard size={18} /> },
    { number: 3, name: "Review", icon: <CheckCircle size={18} /> },
  ];

  // Loading state
  if (!cart && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size={40} className="animate-spin text-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="9876543210"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="House/Flat No., Street, Area"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      placeholder="Landmark, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="6-digit pincode"
                        maxLength="6"
                        required
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
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        if (validateForm()) {
                          setCurrentStep(2);
                        }
                      }}
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
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod("COD")}
                      className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "COD"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl">💵</span>
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === "COD"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Cash on Delivery
                      </span>
                      <span className="text-xs text-gray-500">
                        Advance: ₹30
                      </span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("Online")}
                      className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === "Online"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      disabled
                    >
                      <CreditCard
                        size={24}
                        className={
                          paymentMethod === "Online"
                            ? "text-gray-900"
                            : "text-gray-400"
                        }
                      />
                      <span
                        className={`text-sm font-medium ${
                          paymentMethod === "Online"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        Online Payment
                      </span>
                      <span className="text-xs text-gray-500">
                        Coming Soon
                      </span>
                    </button>
                  </div>

                  {/* COD Information */}
                  {paymentMethod === "COD" && (
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h3 className="font-medium text-blue-900 mb-2">
                        Cash on Delivery Details
                      </h3>
                      <p className="text-sm text-blue-700">
                        • Advance payment of ₹30 required
                        <br />
                        • Pay remaining ₹{remainingAmount} at delivery
                        <br />
                        • Cash or UPI accepted at delivery
                      </p>
                    </div>
                  )}

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
                      <strong>{formData.fullName}</strong>
                      <br />
                      {formData.addressLine1}
                      {formData.addressLine2 && `, ${formData.addressLine2}`}
                      <br />
                      {formData.city}, {formData.state} - {formData.pincode}
                      <br />
                      {formData.country}
                      <br />
                      Mobile: {formData.mobile}
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
                      Cash on Delivery (Advance: ₹30)
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
                          key={item._id}
                          className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.product.image?.[0] || "https://via.placeholder.com/100"}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              ₹{(item.product.discountPrice || item.product.price) * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order • ₹{total}
                        {paymentMethod === "COD" && ` (Pay ₹30 now)`}
                      </>
                    )}
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

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="text-gray-900">₹50</span>
                </div>
                {paymentMethod === "COD" && (
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Advance Payment (COD)</span>
                    <span>-₹30</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total}</span>
                </div>
                {paymentMethod === "COD" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Pay ₹30 now, ₹{remainingAmount} at delivery
                  </p>
                )}
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