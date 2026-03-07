import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Search,
  Tag,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";
import DicountMarque from "./DicountMarque";
import toast from "react-hot-toast";
import { getCart } from "../features/cart/cartSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  // Get user and token from Redux state
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Check if user is admin
  const isAdmin = user?.isAdmin === true;

  // Handle logout
  const handleLogout = () => {
    dispatch(logOutUser());
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* dicount marque */}
      <DicountMarque />

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

            {/* Admin Link - Only visible to admin users */}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon - Visible to all authenticated users */}
            {isAuthenticated && (
              <Link
                to="/mycart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span className="absolute top-1 right-0 bg-black text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cart?.count || "0"}
                </span>
              </Link>
            )}

            {/* User Menu - Different for authenticated vs non-authenticated */}
            {isAuthenticated ? (
              <>
                {/* Profile Link */}
                {user?.isAdmin ? (
                  <Link
                    to="/admin"
                    className="text-red-600 hover:text-red-800 transition-colors font-medium"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200 relative group"
                    title={user?.name}
                  >
                    <User size={20} />
                    {/* Optional: Show user name initial as badge */}
                    <span className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center uppercase">
                      {user?.user?.name || user?.name?.charAt(0) || "U"}
                    </span>
                  </Link>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                {/* Register Button */}
                <Link
                  to="/register"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Register
                </Link>

                {/* Login Button */}
                <Link
                  to="/login"
                  className="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Admin Link in Mobile - Only for admin */}
            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="block py-2 text-red-600 hover:text-red-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Mobile User Actions */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>Profile ({user?.name})</span>
                  </div>
                </Link>
                <Link
                  to="/mycart"
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} />
                    <span>Cart ({cart?.count || "0"})</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800"
                >
                  <div className="flex items-center gap-2">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>Login</span>
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>Register</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
