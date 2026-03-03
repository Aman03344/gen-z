import { Award, Users, TrendingUp, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-96 bg-gray-100 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1148960/pexels-photo-1148960.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About DEERIO
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Redefining Premium Fashion
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Founded in 2020, DEERIO emerged from a simple belief: fashion should
            be both premium and accessible. We set out to create a brand that
            celebrates individuality while maintaining the highest standards of
            quality and craftsmanship.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, we're proud to offer a carefully curated collection that
            blends timeless elegance with contemporary style, serving
            fashion-forward individuals who refuse to compromise on quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To empower individuals through exceptional clothing that combines
              premium quality, sustainable practices, and timeless design. We
              believe that great fashion should be an investment in yourself and
              the planet.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become the global leader in premium sustainable fashion,
              setting new standards for quality, ethics, and style. We envision
              a world where fashion elevates both people and the environment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={28} />
            </div>
            <h4 className="font-semibold text-lg mb-2">Premium Quality</h4>
            <p className="text-sm text-gray-600">
              Finest materials and craftsmanship
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={28} />
            </div>
            <h4 className="font-semibold text-lg mb-2">Sustainable</h4>
            <p className="text-sm text-gray-600">
              Eco-friendly production methods
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={28} />
            </div>
            <h4 className="font-semibold text-lg mb-2">Customer First</h4>
            <p className="text-sm text-gray-600">
              Your satisfaction is our priority
            </p>
          </div>
          <div className="text-center">
            <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={28} />
            </div>
            <h4 className="font-semibold text-lg mb-2">Innovation</h4>
            <p className="text-sm text-gray-600">
              Always evolving, always improving
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Why Choose DEERIO?
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <p className="text-gray-700">
                Ethically sourced materials from sustainable suppliers
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <p className="text-gray-700">
                Handcrafted with attention to every detail
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <p className="text-gray-700">
                Timeless designs that transcend seasonal trends
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <p className="text-gray-700">
                Fair labor practices throughout our supply chain
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
              <p className="text-gray-700">
                Exceptional customer service and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
