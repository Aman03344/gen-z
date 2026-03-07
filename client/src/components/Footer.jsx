import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Heart,
  ArrowRight,
  X,
  Shield,
  FileText,
  Cookie,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'privacy', 'terms', 'cookie', or null

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  // Modal content based on type
  const getModalContent = () => {
    switch (activeModal) {
      case "privacy":
        return {
          title: "Privacy Policy",
          icon: <Shield size={24} className="text-gray-500" />,
          lastUpdated: "January 1, 2024",
          content: [
            {
              heading: "Information We Collect",
              text: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, shipping address, and payment information.",
            },
            {
              heading: "How We Use Your Information",
              text: "We use the information we collect to process your orders, communicate with you about your purchases, send you promotional offers (with your consent), and improve our services.",
            },
            {
              heading: "Information Sharing",
              text: "We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving you.",
            },
            {
              heading: "Data Security",
              text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
            },
            {
              heading: "Your Rights",
              text: "You have the right to access, correct, or delete your personal information. You may also opt out of receiving marketing communications at any time.",
            },
          ],
        };
      case "terms":
        return {
          title: "Terms of Service",
          icon: <FileText size={24} className="text-gray-500" />,
          lastUpdated: "January 1, 2024",
          content: [
            {
              heading: "Acceptance of Terms",
              text: "By accessing or using the AARUNYA website, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
            },
            {
              heading: "Account Registration",
              text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
            },
            {
              heading: "Product Information",
              text: "We strive to display our products accurately. However, we do not warrant that product descriptions, colors, or other content are accurate, complete, or error-free.",
            },
            {
              heading: "Pricing and Payments",
              text: "All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time.",
            },
            {
              heading: "Shipping and Returns",
              text: "Please review our Shipping and Returns policy for information about delivery times, costs, and return procedures.",
            },
            {
              heading: "Intellectual Property",
              text: "All content on this site, including text, graphics, logos, and images, is the property of AARUNYA and protected by copyright laws.",
            },
          ],
        };
      case "cookie":
        return {
          title: "Cookie Policy",
          icon: <Cookie size={24} className="text-gray-500" />,
          lastUpdated: "January 1, 2024",
          content: [
            {
              heading: "What Are Cookies",
              text: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how you use our site.",
            },
            {
              heading: "Types of Cookies We Use",
              text: "We use essential cookies for site functionality, analytics cookies to understand how visitors interact with our site, and marketing cookies to personalize your experience.",
            },
            {
              heading: "Essential Cookies",
              text: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.",
            },
            {
              heading: "Analytics Cookies",
              text: "We use analytics cookies to collect information about how visitors use our site, which helps us improve our website and your shopping experience.",
            },
            {
              heading: "Managing Cookies",
              text: "You can control and manage cookies in your browser settings. Please note that disabling certain cookies may affect your experience on our website.",
            },
          ],
        };
      default:
        return null;
    }
  };

  const modalData = getModalContent();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                Join the <span className="font-medium">AARUNYA</span> community
              </h3>
              <p className="text-gray-500">
                Subscribe to get special offers, free giveaways, and exclusive
                deals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-80 pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  Subscribe
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-light text-gray-900 tracking-tight">
                AARUNYA
              </h3>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium fashion for the modern wardrobe. Elevate your style with
              our curated collection of timeless pieces.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook
                  size={18}
                  className="text-gray-600 group-hover:text-gray-900"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram
                  size={18}
                  className="text-gray-600 group-hover:text-gray-900"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter
                  size={18}
                  className="text-gray-600 group-hover:text-gray-900"
                />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Shop</h4>
            <ul className="space-y-3">
              {["T-Shirts", "Shirts", "Jeans", "Hoodies", "Jackets"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/shop?category=${item.toLowerCase()}`}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-900 transition-colors" />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Careers", path: "#" },
                { name: "Privacy Policy", path: "#", modal: "privacy" },
                { name: "Terms & Conditions", path: "#", modal: "terms" },
              ].map((item) => (
                <li key={item.name}>
                  {item.modal ? (
                    <button
                      onClick={() => openModal(item.modal)}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group w-full text-left"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-900 transition-colors" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-gray-900 transition-colors" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-medium mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <span className="text-gray-400">
                  45 Karol Bagh Markett New Delhi, DL 110005
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400"></span>
              </li>
              <li className="flex items-start gap-3">
                <a
                  href="mailto:hello@aarunya.com"
                  className="hover:text-gray-900 transition-colors"
                >
                  hello@aarunya.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <a
                  href="tel:+1234567890"
                  className="hover:text-gray-900 transition-colors"
                >
                  +91 (934) 567-8900
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; 2023 AARUNYA. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => openModal("privacy")}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                Return Policy
              </button>
              <button
                onClick={() => openModal("terms")}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => openModal("cookie")}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Made with</span>
              <Heart size={12} className="text-red-500 fill-current" />
              <span>by AARUNYA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {activeModal && modalData && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-xl border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {modalData.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">
                      {modalData.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Last updated: {modalData.lastUpdated}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {modalData.content.map((section, index) => (
                    <div key={index}>
                      <h4 className="text-gray-900 font-medium mb-2">
                        {section.heading}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
