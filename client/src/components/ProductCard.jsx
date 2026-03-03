import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./Card";

const ProductCard = ({ product }) => {
  return (
    <Card hover className="overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </Link>
        <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
