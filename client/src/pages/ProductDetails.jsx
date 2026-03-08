import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import Button from "../components/Button";
import { getProduct } from "../features/product/productSlice";
import { addToCart, getCart, resetCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.products,
  );

  const {
    isLoading: cartLoading,
    isSuccess,
    isError: cartError,
    message: cartMessage,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(getProduct(id));
    }
    // Reset cart state on component unmount
    return () => {
      dispatch(resetCart());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.product?.image?.length > 0) {
      setActiveImage(product.product.image[0]);
    }
  }, [product]);

  // Handle cart success/error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product added to cart successfully!", {
        icon: "🛒",
        duration: 3000,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
      dispatch(resetCart());
      dispatch(getCart());
    }
    if (cartError) {
      toast.error(cartMessage || "Failed to add to cart", {
        duration: 4000,
      });
      dispatch(resetCart());
    }
  }, [isSuccess, cartError, cartMessage, dispatch]);

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to add items to cart", {
        icon: "🔒",
        duration: 3000,
      });
      navigate("/login");
      return;
    }

    // Check if size is selected (if sizes exist)
    if (productData.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size", {
        icon: "📏",
        duration: 3000,
      });
      return;
    }

    // Check stock
    if (quantity > productData.countInStock) {
      toast.error(`Only ${productData.countInStock} items available in stock`, {
        duration: 3000,
      });
      return;
    }

    const cartData = {
      productId: productData._id,
      quantity: quantity,
      // You can add size if your backend supports it
      // size: selectedSize,
    };

    dispatch(addToCart(cartData));
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to continue", {
        icon: "🔒",
        duration: 3000,
      });
      navigate("/login");
      return;
    }

    // First add to cart, then navigate to checkout
    handleAddToCart();
    // Navigate to checkout after successful add
    setTimeout(() => {
      if (isSuccess) {
        navigate("/checkout");
      }
    }, 1500);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {message || "Failed to load product"}
          </p>
          <Link
            to="/shop"
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors inline-block"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // No product found
  if (!product?.product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link
            to="/shop"
            className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors inline-block"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productData = product.product;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{productData.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50 relative">
              <img
                src={
                  activeImage ||
                  productData.image?.[0] ||
                  "https://via.placeholder.com/600x600"
                }
                alt={productData.name}
                className="w-full h-full object-cover"
              />
              {addedToCart && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Check size={16} />
                  Added to Cart
                </div>
              )}
            </div>
            {productData.image?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productData.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square overflow-hidden rounded-lg bg-gray-50 transition-all ${
                      activeImage === img
                        ? "ring-2 ring-gray-900 ring-offset-2"
                        : "hover:opacity-75"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {productData.category} | {productData.brand}
              </p>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(productData.rating || 0)
                          ? "fill-gray-900 text-gray-900"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {productData?.rating || 0} reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-light text-gray-900">
                ₹{productData.discountPrice || productData.price}
              </span>
              {productData.price && productData.discountPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{productData.price}
                </span>
              )}
              {productData.discountPercentage > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  {productData.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {productData.description}
            </p>

            {/* Sizes */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2 text-sm rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1 || cartLoading}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={
                      quantity >= (productData.countInStock || 10) ||
                      cartLoading
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={
                    (!selectedSize && productData.sizes?.length > 0) ||
                    cartLoading ||
                    productData.countInStock === 0
                  }
                  onClick={handleAddToCart}
                >
                  {cartLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <ShoppingCart size={18} className="mr-2" />
                  )}
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </Button>
              </div>

              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={handleBuyNow}
                disabled={cartLoading || productData.countInStock === 0}
              >
                Buy Now
              </Button>

              {/* Stock status */}
              {/* {productData.countInStock !== undefined && (
                <p
                  className={`text-sm text-center ${productData.countInStock > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {productData.countInStock > 0
                    ? `${productData.countInStock} items in stock`
                    : "Out of stock"}
                </p>
              )} */}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500">On COD</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">10-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500">100% secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
