import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./Card";

const ProductCard = ({ product }) => {
  return (
    <Card hover className="overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick view indicator */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white text-sm font-medium block text-center">
              View Details
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">
            {product.category}
          </p>
          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xl font-semibold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
