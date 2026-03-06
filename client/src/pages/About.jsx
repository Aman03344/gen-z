import {
  Award,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Leaf,
  Star,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-light mb-6">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-light mb-4">
              About <span className="font-medium">AARUNYA</span>
            </h1>
            <p className="text-xl text-white/90 font-light max-w-lg">
              Redefining premium fashion through quality, sustainability, and
              timeless design.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">
              Since 2020
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Our <span className="font-medium">Story</span>
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2020, AARUNYA emerged from a simple belief: fashion
                should be both premium and accessible. We set out to create a
                brand that celebrates individuality while maintaining the
                highest standards of quality and craftsmanship.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to offer a carefully curated collection that
                blends timeless elegance with contemporary style, serving
                fashion-forward individuals who refuse to compromise on quality.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">10,000+</span>{" "}
                happy customers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Fashion design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Sustainable materials"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/9558797/pexels-photo-9558797.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5650017/pexels-photo-5650017.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Quality check"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6">
              <Star size={28} />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              To empower individuals through exceptional clothing that combines
              premium quality, sustainable practices, and timeless design. We
              believe that great fashion should be an investment in yourself and
              the planet.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the global leader in premium sustainable fashion,
              setting new standards for quality, ethics, and style. We envision
              a world where fashion elevates both people and the environment.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 block">
            What We Stand For
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Our Core <span className="font-medium">Values</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <h4 className="font-medium text-lg text-gray-900 mb-2">
              Premium Quality
            </h4>
            <p className="text-sm text-gray-500">
              Finest materials and expert craftsmanship in every piece
            </p>
          </div>

          <div className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Leaf size={24} />
            </div>
            <h4 className="font-medium text-lg text-gray-900 mb-2">
              Sustainable
            </h4>
            <p className="text-sm text-gray-500">
              Eco-friendly materials and ethical production methods
            </p>
          </div>

          <div className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h4 className="font-medium text-lg text-gray-900 mb-2">
              Customer First
            </h4>
            <p className="text-sm text-gray-500">
              Your satisfaction and trust drive everything we do
            </p>
          </div>

          <div className="group p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart size={24} />
            </div>
            <h4 className="font-medium text-lg text-gray-900 mb-2">Passion</h4>
            <p className="text-sm text-gray-500">
              Love for fashion and dedication to excellence
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-900 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3 block">
                Why Choose Us
              </span>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-8">
                The AARUNYA <span className="font-medium">Difference</span>
              </h3>

              <div className="space-y-5">
                {[
                  "Ethically sourced materials from sustainable suppliers",
                  "Handcrafted with attention to every detail",
                  "Timeless designs that transcend seasonal trends",
                  "Fair labor practices throughout our supply chain",
                  "Exceptional customer service and support",
                  "Carbon-neutral shipping on all orders",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-gray-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-64 lg:h-auto bg-gray-800">
              <img
                src="https://images.pexels.com/photos/4467889/pexels-photo-4467889.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sustainable fashion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-gray-900 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          <div className="text-center">
            <div className="text-4xl font-light text-gray-900 mb-2">10k+</div>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-gray-900 mb-2">500+</div>
            <p className="text-sm text-gray-500">Products</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-gray-900 mb-2">4.9</div>
            <p className="text-sm text-gray-500">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-gray-900 mb-2">15+</div>
            <p className="text-sm text-gray-500">Countries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
