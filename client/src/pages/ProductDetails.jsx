import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { products, reviews } from "../data/mockData";
import Button from "../components/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Mock colors - replace with actual product data
  const colors = ["Black", "White", "Gray", "Navy"];

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
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map(
                (img, index) => (
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
                ),
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-gray-900 text-gray-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">124 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-light text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {colors && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm rounded-full border transition-all ${
                        selectedColor === color
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
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

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={!selectedSize || !selectedColor}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>

                {/* <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsWishliste
                  d(!isWishlisted)}
                  className={`!p-3 ${isWishlisted ? "text-red-500" : ""}`}
                >
                  <Heart
                    size={18}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </Button> */}
              </div>

              <Button variant="secondary" size="lg" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
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

        {/* Reviews Section */}
        <div className="border-t border-gray-100 pt-16 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-light text-gray-900">
              Customer Reviews
            </h2>
            <Button variant="secondary" size="md">
              Write a Review
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <span className="text-5xl font-light text-gray-900">4.8</span>
                  <div className="flex items-center justify-center gap-0.5 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-gray-900 text-gray-900"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Based on 124 reviews</p>
                </div>

                {/* Rating Bars */}
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center gap-2 text-sm mb-2"
                  >
                    <span className="text-gray-600 w-8">{rating} stars</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900 rounded-full"
                        style={{ width: `${rating * 20}%` }}
                      />
                    </div>
                    <span className="text-gray-400 w-8">{rating * 20}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-medium text-gray-600">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-gray-900 text-gray-900"
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}

              <Button variant="secondary" size="md" className="w-full">
                Load More Reviews
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
