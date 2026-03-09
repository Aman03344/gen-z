import { useEffect, useState, useRef } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Star,
  Search,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector(
    (state) => state.products,
  );

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedBrand && product.brand !== selectedBrand) return false;
    const productPrice = product.discountPrice || product.price;
    if (productPrice < priceRange[0] || productPrice > priceRange[1])
      return false;
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const activeFiltersCount = [
    selectedCategory,
    selectedBrand,
    priceRange[1] < 10000 ? "price" : null,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 10000]);
    setSearchQuery("");
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FAFAF8" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          .font-display { font-family: 'Cormorant Garamond', serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <div className="text-center font-body">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border border-stone-200"></div>
            <div className="absolute inset-0 rounded-full border-t border-stone-800 animate-spin"></div>
          </div>
          <p className="text-stone-400 text-sm tracking-widest uppercase">
            Curating collection
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FAFAF8" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
          .font-display { font-family: 'Cormorant Garamond', serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <div className="text-center font-body">
          <p className="text-stone-500 mb-4">Something went wrong</p>
          <button
            onClick={() => dispatch(getAllProducts())}
            className="text-sm tracking-widest uppercase text-stone-900 border border-stone-900 px-8 py-3 hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .shop-bg { background: #FAFAF8; }
        .card-hover { transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .card-hover:hover { transform: translateY(-6px); }

        .img-zoom { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .product-card:hover .img-zoom { transform: scale(1.07); }

        .filter-tag {
          background: #fff;
          border: 1px solid #E5E2DC;
          transition: all 0.2s ease;
        }
        .filter-tag:hover { border-color: #1C1C1A; }

        .radio-custom input[type="radio"] { display: none; }
        .radio-custom .radio-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.15s ease;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #6B6860;
        }
        .radio-custom .radio-label:hover { background: #F5F3EF; color: #1C1C1A; }
        .radio-custom input[type="radio"]:checked + .radio-label {
          background: #1C1C1A;
          color: #fff;
        }
        .radio-custom .radio-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .price-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #1C1C1A var(--val, 100%), #E5E2DC var(--val, 100%));
          outline: none;
        }
        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #1C1C1A;
          cursor: pointer;
          box-shadow: 0 0 0 4px #FAFAF8, 0 0 0 6px #1C1C1A;
        }

        .sort-select {
          appearance: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          background: #fff;
          border: 1px solid #E5E2DC;
          padding: 10px 36px 10px 14px;
          border-radius: 10px;
          color: #1C1C1A;
          cursor: pointer;
          transition: border-color 0.2s;
          outline: none;
        }
        .sort-select:hover, .sort-select:focus { border-color: #1C1C1A; }

        .search-bar {
          background: #fff;
          border: 1px solid #E5E2DC;
          border-radius: 12px;
          padding: 10px 14px 10px 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #1C1C1A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 220px;
        }
        .search-bar:focus {
          border-color: #1C1C1A;
          box-shadow: 0 0 0 3px rgba(28,28,26,0.06);
          width: 260px;
        }
        .search-bar::placeholder { color: #AAA8A3; }

        .badge-sale {
          background: linear-gradient(135deg, #DC2626, #EF4444);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: white;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stock-overlay {
          background: rgba(250,250,248,0.85);
          backdrop-filter: blur(4px);
        }

        .filter-btn-mobile {
          background: #fff;
          border: 1px solid #E5E2DC;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1C1C1A;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .filter-btn-mobile:hover { border-color: #1C1C1A; }

        .sidebar-section { border-bottom: 1px solid #EDEAE5; padding-bottom: 24px; margin-bottom: 24px; }
        .sidebar-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .product-name-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.5s ease both;
        }
        .fade-up-delay-1 { animation-delay: 0.05s; }
        .fade-up-delay-2 { animation-delay: 0.1s; }
        .fade-up-delay-3 { animation-delay: 0.15s; }

        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px 5px 12px;
          background: #1C1C1A;
          color: #fff;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
        }
        .filter-pill button {
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: opacity 0.15s;
        }
        .filter-pill button:hover { opacity: 1; }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #AAA8A3;
          margin-bottom: 14px;
        }

        .count-badge {
          min-width: 20px;
          height: 20px;
          background: #1C1C1A;
          color: #fff;
          border-radius: 100px;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
        }
      `}</style>

      <div className="shop-bg min-h-screen font-body">
        {/* ── Hero Header ── */}
        <div style={{ background: "#fff", borderBottom: "1px solid #EDEAE5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 fade-up">
            <p className="section-label" style={{ marginBottom: 8 }}>
              <Sparkles
                size={10}
                style={{ display: "inline", marginRight: 6 }}
              />
              New Season
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-stone-900 leading-tight mb-3">
              The Collection
            </h1>
            <p
              className="text-stone-400 text-sm"
              style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 300 }}
            >
              {products.length} carefully curated pieces
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Toolbar ── */}
          <div className="flex items-center justify-between mb-6 fade-up fade-up-delay-1">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                className="filter-btn-mobile lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="count-badge">{activeFiltersCount}</span>
                )}
              </button>

              {/* Search */}
              <div className="relative hidden sm:block">
                <Search
                  size={15}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#AAA8A3",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar"
                />
              </div>

              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 13,
                  color: "#AAA8A3",
                }}
              >
                <span style={{ color: "#1C1C1A", fontWeight: 500 }}>
                  {sortedProducts.length}
                </span>{" "}
                results
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={14} style={{ color: "#AAA8A3" }} />
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown
                  size={14}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#AAA8A3",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Active Filter Pills ── */}
          {(selectedCategory ||
            selectedBrand ||
            priceRange[1] < 10000 ||
            searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 fade-up">
              {selectedCategory && (
                <span className="filter-pill">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="filter-pill">
                  {selectedBrand}
                  <button onClick={() => setSelectedBrand("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {priceRange[1] < 10000 && (
                <span className="filter-pill">
                  Under ₹{priceRange[1]}
                  <button onClick={() => setPriceRange([0, 10000])}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-pill">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 12,
                  color: "#AAA8A3",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: "0 4px",
                }}
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-8">
            {/* ── Sidebar ── */}
            <aside
              className={`${showFilters ? "block" : "hidden"} lg:block`}
              style={{ width: 256, flexShrink: 0 }}
            >
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #EDEAE5",
                  borderRadius: 20,
                  padding: 24,
                  position: "sticky",
                  top: 96,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1C1C1A",
                    }}
                  >
                    Refine
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 12,
                        color: "#AAA8A3",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                      }}
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Category */}
                {categories.length > 0 && (
                  <div className="sidebar-section">
                    <p className="section-label">Category</p>
                    <div
                      className="radio-custom"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {categories.map((cat) => (
                        <label key={cat}>
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() =>
                              setSelectedCategory(
                                selectedCategory === cat ? "" : cat,
                              )
                            }
                          />
                          <span className="radio-label">
                            <span className="radio-dot"></span>
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="sidebar-section">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 16,
                    }}
                  >
                    <p className="section-label" style={{ marginBottom: 0 }}>
                      Price Range
                    </p>
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1C1C1A",
                      }}
                    >
                      ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value)])
                    }
                    className="price-slider"
                    style={{ "--val": `${(priceRange[1] / 10000) * 100}%` }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 11,
                        color: "#AAA8A3",
                      }}
                    >
                      ₹0
                    </span>
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: 11,
                        color: "#AAA8A3",
                      }}
                    >
                      ₹10,000+
                    </span>
                  </div>
                </div>

                {/* Brand */}
                {brands.length > 0 && (
                  <div>
                    <p className="section-label">Brand</p>
                    <div
                      className="radio-custom"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      {brands.map((brand) => (
                        <label key={brand}>
                          <input
                            type="radio"
                            name="brand"
                            checked={selectedBrand === brand}
                            onChange={() =>
                              setSelectedBrand(
                                selectedBrand === brand ? "" : brand,
                              )
                            }
                          />
                          <span className="radio-label">
                            <span className="radio-dot"></span>
                            {brand}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* ── Product Grid ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {sortedProducts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 24px",
                    background: "#fff",
                    borderRadius: 20,
                    border: "1px solid #EDEAE5",
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "#F5F3EF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <SlidersHorizontal size={24} style={{ color: "#C5C3BE" }} />
                  </div>
                  <p
                    className="font-display"
                    style={{ fontSize: 28, color: "#1C1C1A", marginBottom: 8 }}
                  >
                    Nothing found
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 13,
                      color: "#AAA8A3",
                      marginBottom: 24,
                    }}
                  >
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={clearAllFilters}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#fff",
                      background: "#1C1C1A",
                      border: "none",
                      padding: "12px 28px",
                      borderRadius: 100,
                      cursor: "pointer",
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 20,
                  }}
                >
                  {sortedProducts.map((product, idx) => {
                    const isOnSale =
                      product.discountPrice && product.discountPercentage > 0;
                    const isOOS = product.countInStock === 0;
                    const rating = product.rating || 0;

                    return (
                      <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="product-card card-hover"
                        style={{
                          display: "block",
                          textDecoration: "none",
                          borderRadius: 16,
                          overflow: "hidden",
                          background: "#fff",
                          border: "1px solid #EDEAE5",
                          boxShadow: "0 1px 3px rgba(28,28,26,0.04)",
                          animation: `fadeUp 0.4s ease both`,
                          animationDelay: `${Math.min(idx * 0.04, 0.3)}s`,
                          opacity: isOOS ? 0.75 : 1,
                        }}
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Image */}
                        <div
                          style={{
                            position: "relative",
                            aspectRatio: "3/4",
                            overflow: "hidden",
                            background: "#F5F3EF",
                          }}
                        >
                          <img
                            src={product.image?.[0]}
                            alt={product.name}
                            className="img-zoom"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />

                          {/* Top badges */}
                          <div
                            style={{
                              position: "absolute",
                              top: 12,
                              left: 12,
                              right: 12,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            {isOnSale && (
                              <span className="badge-sale">
                                -{product.discountPercentage}%
                              </span>
                            )}
                            {!isOnSale && <span />}
                            {product.isFeatured && (
                              <span
                                style={{
                                  background: "rgba(28,28,26,0.85)",
                                  color: "#fff",
                                  fontSize: 9,
                                  fontFamily: "DM Sans, sans-serif",
                                  fontWeight: 500,
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  padding: "3px 8px",
                                  borderRadius: 6,
                                  backdropFilter: "blur(4px)",
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>

                          {/* OOS overlay */}
                          {isOOS && (
                            <div
                              className="stock-overlay"
                              style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "DM Sans, sans-serif",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: "#1C1C1A",
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                  background: "#fff",
                                  padding: "8px 16px",
                                  borderRadius: 100,
                                  border: "1px solid #EDEAE5",
                                }}
                              >
                                Sold Out
                              </span>
                            </div>
                          )}

                          {/* Quick sizes on hover */}
                          {product.sizes?.length > 0 &&
                            hoveredProduct === product._id &&
                            !isOOS && (
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  background: "rgba(28,28,26,0.9)",
                                  backdropFilter: "blur(8px)",
                                  padding: "10px 12px",
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: 6,
                                  animation: "fadeUp 0.2s ease",
                                }}
                              >
                                {product.sizes.map((size) => (
                                  <span
                                    key={size}
                                    style={{
                                      fontFamily: "DM Sans, sans-serif",
                                      fontSize: 11,
                                      color: "rgba(255,255,255,0.8)",
                                      background: "rgba(255,255,255,0.12)",
                                      padding: "3px 8px",
                                      borderRadius: 4,
                                    }}
                                  >
                                    {size}
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Info */}
                        <div style={{ padding: "14px 16px 16px" }}>
                          {product.brand && (
                            <p
                              style={{
                                fontFamily: "DM Sans, sans-serif",
                                fontSize: 10,
                                fontWeight: 500,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#AAA8A3",
                                marginBottom: 5,
                              }}
                            >
                              {product.brand}
                            </p>
                          )}

                          <h3
                            className="product-name-clamp"
                            style={{
                              fontFamily: "Cormorant Garamond, serif",
                              fontSize: 17,
                              fontWeight: 400,
                              color: "#1C1C1A",
                              lineHeight: 1.35,
                              marginBottom: 10,
                            }}
                          >
                            {product.name}
                          </h3>

                          {/* Price */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 8,
                              marginBottom: 10,
                            }}
                          >
                            {isOnSale ? (
                              <>
                                <span
                                  style={{
                                    fontFamily: "DM Sans, sans-serif",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "#1C1C1A",
                                  }}
                                >
                                  ₹{product.discountPrice.toLocaleString()}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "DM Sans, sans-serif",
                                    fontSize: 13,
                                    color: "#C5C3BE",
                                    textDecoration: "line-through",
                                  }}
                                >
                                  ₹{product.price.toLocaleString()}
                                </span>
                              </>
                            ) : (
                              <span
                                style={{
                                  fontFamily: "DM Sans, sans-serif",
                                  fontSize: 16,
                                  fontWeight: 500,
                                  color: "#1C1C1A",
                                }}
                              >
                                ₹{product.price?.toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Rating */}
                          {rating > 0 && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                              }}
                            >
                              <div style={{ display: "flex", gap: 1 }}>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    style={{
                                      color:
                                        i < Math.floor(rating)
                                          ? "#D97706"
                                          : "#E5E2DC",
                                      fill:
                                        i < Math.floor(rating)
                                          ? "#D97706"
                                          : "none",
                                    }}
                                  />
                                ))}
                              </div>
                              <span
                                style={{
                                  fontFamily: "DM Sans, sans-serif",
                                  fontSize: 11,
                                  color: "#AAA8A3",
                                }}
                              >
                                {product.numReviews > 0
                                  ? `(${product.numReviews})`
                                  : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
