import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DEERIO</h3>
            <p className="text-gray-600 text-sm">
              Premium fashion for the modern wardrobe. Elevate your style with
              our curated collection.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/shop?category=t-shirt"
                  className="hover:text-black transition-colors"
                >
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=shirt"
                  className="hover:text-black transition-colors"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=jeans"
                  className="hover:text-black transition-colors"
                >
                  Jeans
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=hoodie"
                  className="hover:text-black transition-colors"
                >
                  Hoodies
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=jacket"
                  className="hover:text-black transition-colors"
                >
                  Jackets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-black transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-black transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-black transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Subscribe to our newsletter for exclusive offers.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 DEERIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
