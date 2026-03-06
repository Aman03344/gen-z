import { useEffect, useState } from "react";
import { ListFilter as Filter, ChevronDown, X, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products,
  );

  console.log(products);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedBrand && product.brand !== selectedBrand) return false;
    const productPrice = product.discountPrice || product.price;
    if (productPrice < priceRange[0] || productPrice > priceRange[1])
      return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    switch (sortBy) {
      case "price-low":
        return priceA - priceB;
      case "price-high":
        return priceB - priceA;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    priceRange[1] < 10000 ? "price" : null,
  ].filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading products</p>
          <button
            onClick={() => dispatch(getAllProducts())}
            className="text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-full transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-500">Discover our complete collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="text-gray-600" />
              <span className="text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">
                {sortedProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 cursor-pointer hover:border-gray-300 transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedBrand || priceRange[1] < 10000) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500 mr-2">Active filters:</span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-1 hover:text-gray-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {selectedBrand && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
                {selectedBrand}
                <button
                  onClick={() => setSelectedBrand("")}
                  className="ml-1 hover:text-gray-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            {priceRange[1] < 10000 && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm">
                Under ₹{priceRange[1]}
                <button
                  onClick={() => setPriceRange([0, 10000])}
                  className="ml-1 hover:text-gray-900"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedBrand("");
                setPriceRange([0, 10000]);
              }}
              className="text-sm text-gray-500 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-72 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-gray-900">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedBrand("");
                    setPriceRange([0, 10000]);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Reset all
                </button>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">₹0</span>
                      <span className="text-xs font-medium text-gray-900">
                        ₹{priceRange[1]}
                      </span>
                      <span className="text-xs text-gray-500">₹10000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              {brands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Brand
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand}
                          onChange={() => setSelectedBrand(brand)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-900 border-gray-300"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {sortedProducts.map((product) => {
                const isOnSale =
                  product.discountPrice && product.discountPercentage > 0;

                return (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Discount Badge */}
                        {isOnSale && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {product.discountPercentage}% OFF
                          </div>
                        )}

                        {/* Out of Stock Badge */}
                        {product.countInStock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Brand */}
                        <p className="text-xs text-gray-500 mb-1">
                          {product.brand}
                        </p>

                        {/* Product Name */}
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {product.name}
                        </h3>

                        {/* Price Section */}
                        <div className="flex items-baseline gap-2 mb-2">
                          {isOnSale ? (
                            <>
                              <span className="text-lg font-bold text-gray-900">
                                ₹{product.discountPrice}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ₹{product.price}
                              </span>
                              <span className="text-xs text-green-600 font-medium">
                                Save ₹{product.price - product.discountPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ₹{product.price}
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                size={16}
                                className={`${
                                  index < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({product.numReviews || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedBrand("");
                    setPriceRange([0, 10000]);
                  }}
                  className="text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-full transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
