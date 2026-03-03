import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, Search, Tag } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-full py-2.5 bg-gray-900 text-white text-center text-sm font-light tracking-wide">
        <p className="flex items-center justify-center gap-2">
          <Tag size={14} className="text-gray-400" />
          <span>5% discount on online payments</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-light tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
          >
            AARUNYA
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-black transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={"/mycart"}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <span className="absolute top-1 right-0  bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              to="/profile"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-3"
            >
              <User size={20} />
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-black">
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:text-black"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-black"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-black"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block py-2 text-gray-700 hover:text-black"
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
