import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Trash2,
  ShoppingBag,
  ChevronRight,
  Minus,
  Plus,
  Tag,
  Truck,
  Shield,
  Loader,
} from "lucide-react";
import Button from "../components/Button";
import {
  getCart,
  updateCart,
  removeCart,
  resetCart,
} from "../features/cart/cartSlice";

const MyCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.cart,
  );
  const { user } = useSelector((state) => state.auth);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch cart on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(getCart());

    return () => {
      dispatch(resetCart());
    };
  }, [dispatch, user, navigate]);

  // Handle API responses
  useEffect(() => {
    if (isSuccess) {
      toast.success("Cart updated successfully!", {
        duration: 2000,
      });
      dispatch(resetCart());
    }
    if (isError) {
      toast.error(message || "Failed to update cart", {
        duration: 3000,
      });
      dispatch(resetCart());
    }
  }, [isSuccess, isError, message, dispatch]);

  const updateQuantity = async (itemId, productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Find the cart item
    const cartItem = cart?.cartItems?.find((item) => item._id === itemId);
    if (!cartItem) return;

    // Check stock limit
    if (newQuantity > cartItem.product.countInStock) {
      toast.error(`Only ${cartItem.product.countInStock} items available`, {
        duration: 3000,
      });
      return;
    }

    // Set updating state for this item
    setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));

    // API expects productId, not cartId
    const updateData = {
      productId: productId, // Send productId instead of cartId
      quantity: newQuantity,
    };

    const result = await dispatch(updateCart(updateData));

    if (!result.error) {
      // Refresh cart after successful update
      dispatch(getCart());
    }

    // Remove updating state
    setUpdatingItems((prev) => ({ ...prev, [itemId]: false }));
  };

  const removeItem = async (itemId, productId) => {
    // Show confirmation toast
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm">Remove this item from cart?</p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              onClick={async () => {
                toast.dismiss(t.id);
                setUpdatingItems((prev) => ({ ...prev, [itemId]: true }));

                // API expects productId in the body
                const deleteData = {
                  productId: productId, // Send productId instead of cartId
                };

                const result = await dispatch(removeCart(deleteData));

                if (!result.error) {
                  // Refresh cart after successful deletion
                  dispatch(getCart());
                  toast.success("Item removed from cart");
                }

                setUpdatingItems((prev) => ({ ...prev, [itemId]: false }));
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      },
    );
  };

  const handlePromoApply = () => {
    if (!promoCode) {
      toast.error("Please enter a promo code");
      return;
    }
    // Implement promo code logic here
    setIsPromoApplied(true);
    toast.success("Promo code applied successfully!");
  };

  // Loading state
  if (isLoading && !cart) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="animate-spin text-gray-900 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Check if cart is empty
  const cartItems = cart?.cartItems || [];
  const subtotal = cart?.subtotal || 0;
  const itemCount = cart?.count || 0;

  if (!cartItems.length) {
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

  // Calculate totals
  const shipping = subtotal > 2000 ? 0 : 50; // ₹50 shipping if subtotal < ₹2000
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-gray-900">Shopping Cart</h1>
          <span className="text-sm text-gray-500">
            {itemCount} {itemCount === 1 ? "item" : "items"}
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
            {cartItems.map((item) => {
              const product = item.product;
              const isUpdating = updatingItems[item._id];

              return (
                <div
                  key={item._id}
                  className={`flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors ${
                    isUpdating ? "opacity-60" : ""
                  }`}
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={
                          product.image?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${product._id}`}
                          className="text-base font-medium text-gray-900 hover:text-gray-600 transition-colors line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span className="text-gray-500">
                            {product.category}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-500">
                            Brand: {product.brand}
                          </span>
                        </div>
                        {product.countInStock > 0 ? (
                          <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-600">
                            <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                            {product.countInStock} in stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 mt-2 text-xs text-red-600">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item._id, product._id)}
                        disabled={isUpdating}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors group disabled:opacity-50"
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
                            updateQuantity(
                              item._id,
                              product._id,
                              item.quantity - 1,
                            )
                          }
                          className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1 || isUpdating}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {isUpdating ? (
                            <Loader
                              size={12}
                              className="animate-spin mx-auto"
                            />
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              product._id,
                              item.quantity + 1,
                            )
                          }
                          className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                          disabled={
                            item.quantity >= product.countInStock || isUpdating
                          }
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-medium text-gray-900">
                          ₹
                          {(
                            (product.discountPrice || product.price) *
                            item.quantity
                          ).toFixed(2)}
                        </div>
                        {product.price && product.discountPrice && (
                          <div className="text-xs text-gray-400 line-through">
                            ₹{(product.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

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
                    onClick={handlePromoApply}
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
                  <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="text-gray-900">
                      ₹{shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-light text-gray-900">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including ₹{tax.toFixed(2)} in taxes
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader size={18} className="animate-spin mr-2" />
                  ) : null}
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
                  <span>Free shipping on orders over ₹2000</span>
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
