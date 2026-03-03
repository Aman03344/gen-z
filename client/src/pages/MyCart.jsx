import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  ChevronRight,
  Minus,
  Plus,
  X,
  Tag,
  Truck,
  Shield,
} from "lucide-react";
import Button from "../components/Button";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Oversized Cotton Sweater",
      price: 89.99,
      originalPrice: 129.99,
      quantity: 1,
      size: "M",
      color: "Heather Gray",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
      inStock: true,
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
      inStock: true,
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      price: 129.99,
      quantity: 1,
      size: "One Size",
      color: "Black",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
      inStock: true,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-light text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-gray-900">Shopping Cart</h1>
          <span className="text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/shop" className="hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900">Cart</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
              >
                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-gray-500">{item.color}</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">Size: {item.size}</span>
                      </div>
                      {item.inStock ? (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-600">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-red-600">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors group"
                      aria-label="Remove item"
                    >
                      <Trash2
                        size={18}
                        className="text-gray-400 group-hover:text-red-500 transition-colors"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      {item.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping Link */}
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
              >
                <ChevronRight
                  size={16}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform"
                />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                  <button
                    onClick={() => setIsPromoApplied(true)}
                    disabled={!promoCode || isPromoApplied}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {isPromoApplied && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                    <Tag size={12} />
                    <span>Promo code applied successfully!</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="text-gray-900">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-light text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including ${tax.toFixed(2)} in taxes
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to={"/checkout"}>
                <Button variant="primary" size="lg" className="w-full mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-5 bg-gray-200 rounded" />
                <div className="w-8 h-5 bg-gray-200 rounded" />
                <div className="w-8 h-5 bg-gray-200 rounded" />
                <div className="w-8 h-5 bg-gray-200 rounded" />
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Truck size={16} className="text-gray-400" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <Shield size={16} className="text-gray-400" />
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
