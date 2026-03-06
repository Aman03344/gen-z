import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./Card";

const ProductCard = ({ product }) => {
  // Handle both API and mock data structures
  const productId = product._id || product.id;
  const productImage =
    product.image?.[0] ||
    product.image ||
    "https://via.placeholder.com/300x400";
  const productName = product.name || "Product Name";
  const productCategory = product.category || "Category";
  const productPrice = product.discountPrice || product.price || 0;
  const originalPrice = product.price || product.originalPrice;

  // Calculate discount percentage if not provided
  const discountPercentage =
    product.discountPercentage ||
    (originalPrice && productPrice
      ? Math.round(((originalPrice - productPrice) / originalPrice) * 100)
      : null);

  return (
    <Card hover className="overflow-hidden group">
      <Link to={`/product/${productId}`}>
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x400";
            }}
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Wishlist button */}
          {/* <button
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic here
            }}
          >
            <Heart size={18} className="text-gray-600" />
          </button> */}

          {/* Quick view indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white text-sm font-medium block text-center">
              View Details
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/product/${productId}`} className="block">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">
            {productCategory}
          </p>
          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
            {productName}
          </h3>

          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xl font-semibold text-gray-900">
              ₹{productPrice}
            </span>
            {originalPrice && originalPrice > productPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Stock status */}
          {product.countInStock !== undefined && (
            <p
              className={`text-xs ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.countInStock > 0
                ? `${product.countInStock} in stock`
                : "Out of stock"}
            </p>
          )}
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
