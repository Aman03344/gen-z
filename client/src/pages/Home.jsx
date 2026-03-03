import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Truck } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/mockData";

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gray-100 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Elevate Your Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Discover premium fashion for the modern wardrobe
            </p>
            <Link to="/shop">
              <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                Shop Collection
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Carefully curated products
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-black text-white p-3 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Latest Trends</h3>
              <p className="text-gray-600 text-sm">Always on-trend styles</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/shop"
              className="text-black hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/shop?category=${category.name.toLowerCase()}`}
              >
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                  </div>
                  <h3 className="text-center font-medium group-hover:underline">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <Link
            to="/shop"
            className="text-black hover:underline inline-flex items-center gap-1"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="relative h-96 bg-gray-100 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Promo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              New Season Sale
            </h2>
            <p className="text-xl mb-6">Up to 40% off on selected items</p>
            <Link to="/shop">
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
