import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Award,
  Truck,
  Sparkles,
  Shield,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/mockData";

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] min-h-[600px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-light mb-6">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Elevate Your
              <span className="block font-medium">Everyday Style</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 font-light max-w-lg">
              Discover premium fashion pieces crafted for the modern wardrobe.
              Where quality meets contemporary design.
            </p>
            <Link to="/shop">
              <button className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
                Shop Collection
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck size={28} />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over $50</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award size={28} />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-sm text-gray-500">Carefully curated</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Latest Trends</h3>
              <p className="text-sm text-gray-500">Always on-trend</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-500">100% protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                Curated Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Featured <span className="font-medium">Products</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-4 md:mt-0"
            >
              <span className="text-sm font-medium">View All Products</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 block">
              Shop by Category
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Explore Our <span className="font-medium">Collections</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded mb-3 aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-center text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                Customer Favorites
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Best <span className="font-medium">Sellers</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-4 md:mt-0"
            >
              <span className="text-sm font-medium">Shop Best Sellers</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative h-[500px] bg-gray-100 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Promo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-light mb-6">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                New Season <span className="font-medium">Sale</span>
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Up to 40% off on selected items. Don't miss out on the latest
                styles.
              </p>
              <Link to="/shop">
                <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all inline-flex items-center gap-2 shadow-lg">
                  Shop Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles size={32} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Join Our <span className="font-medium">Newsletter</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
